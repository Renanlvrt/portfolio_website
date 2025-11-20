"use client";

import { useState } from "react";
import { Volume2, VolumeX, Music, Zap } from "lucide-react";
import { useAudio } from "@/hooks/useAudio";
import { HolographicCard } from "./HolographicCard";
import { motion, AnimatePresence } from "framer-motion";
import type { SoundCategory } from "@/lib/audio/types";

/**
 * Audio Controls Component
 * 
 * Clean, extensible audio control UI with:
 * - Master volume control
 * - Category-specific volume controls
 * - Mute toggle
 * - Expandable panel for advanced controls
 */
export function AudioControls() {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    masterVolume,
    setMasterVolume,
    categoryVolumes,
    setCategoryVolume,
    muted,
    toggleMute,
  } = useAudio();

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <HolographicCard glowColor="#00D9FF" className="p-3">
        <div className="flex items-center gap-3">
          {/* Mute Toggle */}
          <button
            onClick={toggleMute}
            className="rounded-lg p-2 transition-colors hover:bg-white/10"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <VolumeX className="h-5 w-5 text-slate-400" />
            ) : (
              <Volume2 className="h-5 w-5 text-cyan-300" />
            )}
          </button>

          {/* Master Volume Slider */}
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-slate-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={masterVolume}
              onChange={(e) => setMasterVolume(parseFloat(e.target.value))}
              className="w-24 accent-cyan-400"
              disabled={muted}
            />
            <span className="w-8 text-xs text-slate-400">
              {Math.round(masterVolume * 100)}%
            </span>
          </div>

          {/* Expand Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-lg p-2 transition-colors hover:bg-white/10"
            aria-label="Audio settings"
          >
            <Music className="h-5 w-5 text-slate-400" />
          </button>
        </div>

        {/* Expanded Controls */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-3 border-t border-white/10 pt-4"
            >
              {Object.entries(categoryVolumes).map(([category, volume]) => (
                <div key={category} className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-slate-400" />
                  <span className="w-20 text-xs capitalize text-slate-300">
                    {category}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) =>
                      setCategoryVolume(category as SoundCategory, parseFloat(e.target.value))
                    }
                    className="flex-1 accent-cyan-400"
                    disabled={muted}
                  />
                  <span className="w-8 text-xs text-slate-400">
                    {Math.round(volume * 100)}%
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </HolographicCard>
    </div>
  );
}

