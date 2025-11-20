"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Bot } from "lucide-react";
import { useRobotPersonality } from "@/hooks/useRobotPersonality";
import { HolographicCard } from "@/components/ui/HolographicCard";

/**
 * UNIQUE FEATURE: AI Robot Companion Chat
 * 
 * An intelligent chatbot that:
 * - Learns from your exploration patterns
 * - Provides personalized suggestions
 * - Remembers your preferences
 * - Adapts responses based on personality traits
 */
export function RobotCompanion() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; from: "robot" | "user" }>>([]);
  const [hasInitialized, setHasInitialized] = useState(false);
  const { getPersonalityTrait, getSuggestion, recordInteraction } = useRobotPersonality();

  useEffect(() => {
    // Auto-suggest when companion opens (only once)
    if (isOpen && !hasInitialized) {
      const timer = setTimeout(() => {
        const suggestion = getSuggestion();
        if (suggestion) {
          setMessages([{ text: suggestion, from: "robot" }]);
        } else {
          setMessages([
            {
              text: `Hello! I'm your autonomous guide. I've noticed you're ${getPersonalityTrait()}. How can I help you explore?`,
              from: "robot",
            },
          ]);
        }
        recordInteraction();
        setHasInitialized(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, hasInitialized, getSuggestion, getPersonalityTrait, recordInteraction]);

  // Reset when closed - using setTimeout to avoid synchronous setState
  const prevIsOpenRef = useRef(isOpen);
  useEffect(() => {
    if (prevIsOpenRef.current && !isOpen) {
      // Was open, now closed - reset asynchronously
      setTimeout(() => {
        setHasInitialized(false);
      }, 0);
    }
    prevIsOpenRef.current = isOpen;
  }, [isOpen]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { text, from: "user" }]);
    recordInteraction();

    // Simple response logic (can be enhanced with AI)
    setTimeout(() => {
      const responses = [
        "That's interesting! Let me guide you to the relevant zone.",
        "Great question! Check out the mission details in that zone.",
        "I can help you navigate there. Would you like me to show you?",
        "Based on your exploration, I think you'd find that fascinating!",
      ];
      const response = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [...prev, { text: response, from: "robot" }]);
    }, 500);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/50 bg-black/80 backdrop-blur-xl shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-cyan-300" />
        ) : (
          <MessageCircle className="h-6 w-6 text-cyan-300" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <HolographicCard glowColor="#00D9FF" className="p-4">
              <div className="mb-4 flex items-center gap-2">
                <Bot className="h-5 w-5 text-cyan-300" />
                <h3 className="font-semibold text-white">Asterion Scout</h3>
                <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div className="mb-4 max-h-64 space-y-2 overflow-y-auto">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    className={`rounded-lg p-2 text-sm ${
                      msg.from === "robot"
                        ? "bg-cyan-500/20 text-cyan-200"
                        : "bg-white/10 text-white ml-auto text-right"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {msg.text}
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  className="flex-1 rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:border-cyan-300/50 focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                <button
                  onClick={() => {
                    const input = document.querySelector("input[type='text']") as HTMLInputElement;
                    if (input) {
                      handleSendMessage(input.value);
                      input.value = "";
                    }
                  }}
                  className="rounded-lg bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-300 hover:bg-cyan-500/30 transition-colors"
                >
                  Send
                </button>
              </div>
            </HolographicCard>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

