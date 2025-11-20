"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { EasterEggId } from "@/lib/easterEggs/types";
import { useAudio } from "@/hooks/useAudio";

/**
 * Easter Egg Handler Component
 * 
 * Handles visual effects and UI responses to easter egg triggers.
 * Clean separation of concerns - manager handles logic, component handles UI.
 */
export function EasterEggHandler() {
  const [activeEgg, setActiveEgg] = useState<EasterEggId | null>(null);
  const [turboMode, setTurboMode] = useState(false);
  const { play } = useAudio();

  useEffect(() => {
    const handleEasterEgg = (event: CustomEvent<{ id: EasterEggId }>) => {
      const eggId = event.detail.id;
      setActiveEgg(eggId);

      // Play sound
      play("achievement");

      // Handle specific effects
      switch (eggId) {
        case "konami-code":
          // Confetti and robot dance
          triggerConfetti();
          break;
        case "click-counter":
          // Turbo mode
          setTurboMode(true);
          setTimeout(() => setTurboMode(false), 30000); // 30 seconds
          break;
        case "console-command":
          // Robot performs action
          break;
        case "time-based":
          // Night mode
          document.documentElement.classList.add("night-mode");
          break;
        case "cursor-hide":
          // Robot looks around
          break;
      }

      // Auto-hide after 5 seconds
      setTimeout(() => setActiveEgg(null), 5000);
    };

    window.addEventListener("easter-egg-triggered", handleEasterEgg as EventListener);

    return () => {
      window.removeEventListener("easter-egg-triggered", handleEasterEgg as EventListener);
    };
  }, [play]);

  // Apply turbo mode class
  useEffect(() => {
    if (turboMode) {
      document.documentElement.classList.add("turbo-mode");
    } else {
      document.documentElement.classList.remove("turbo-mode");
    }
  }, [turboMode]);

  return (
    <>
      {/* Easter Egg Notifications */}
      <AnimatePresence>
        {activeEgg && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed top-24 left-1/2 z-[10000] -translate-x-1/2"
          >
            <div className="rounded-2xl border border-cyan-300/50 bg-black/90 px-6 py-4 text-center backdrop-blur-xl">
              <p className="text-2xl font-bold text-cyan-300">
                🎉 SECRET UNLOCKED!
              </p>
              <p className="mt-2 text-sm text-slate-300">
                {getEasterEggMessage(activeEgg)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Turbo Mode Indicator */}
      {turboMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-4 right-4 z-50 rounded-full border border-yellow-400/50 bg-yellow-400/20 px-4 py-2 text-sm font-semibold text-yellow-300"
        >
          ⚡ TURBO MODE ACTIVE
        </motion.div>
      )}
    </>
  );
}

function getEasterEggMessage(id: EasterEggId): string {
  const messages: Record<EasterEggId, string> = {
    "konami-code": "You're a true gamer! Robot dance activated!",
    "click-counter": "Turbo mode unlocked! Everything moves faster now!",
    "console-command": "Developer mode activated! Robot responds to commands.",
    "time-based": "Night mode activated! The robot is getting sleepy...",
    "cursor-hide": "Robot detected your absence! Looking around...",
    "secret-zone": "Secret zone discovered!",
  };
  return messages[id] || "Easter egg activated!";
}

function triggerConfetti() {
  // Simple confetti effect
  const colors = ["#00D9FF", "#A855F7", "#22D3EE", "#10B981", "#F59E0B"];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "fixed";
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = "-10px";
    confetti.style.width = "10px";
    confetti.style.height = "10px";
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = "50%";
    confetti.style.pointerEvents = "none";
    confetti.style.zIndex = "10000";

    document.body.appendChild(confetti);

    const animation = confetti.animate(
      [
        { transform: "translateY(0) rotate(0deg)", opacity: 1 },
        {
          transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 3000 + Math.random() * 2000,
        easing: "cubic-bezier(0.5, 0, 0.5, 1)",
      }
    );

    animation.onfinish = () => confetti.remove();
  }
}

