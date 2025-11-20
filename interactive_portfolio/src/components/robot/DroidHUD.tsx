"use client";

import { motion } from "framer-motion";

type DroidHUDProps = {
  state: "idle" | "moving" | "scanning" | "exploring";
  currentWaypoint?: string;
};

/**
 * Droid HUD Overlay
 * 
 * Shows droid status and current activity.
 * Like a Star Wars droid status display.
 */
export function DroidHUD({ state, currentWaypoint }: DroidHUDProps) {
  const stateColors = {
    idle: "#00D9FF",
    moving: "#10B981",
    scanning: "#F59E0B",
    exploring: "#A855F7",
  };

  const stateLabels = {
    idle: "STANDBY",
    moving: "NAVIGATING",
    scanning: "SCANNING",
    exploring: "EXPLORING",
  };

  return (
    <motion.div
      className="fixed top-4 left-4 z-50 rounded-2xl border border-white/20 bg-black/80 backdrop-blur-xl px-4 py-3"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        boxShadow: `0 0 20px ${stateColors[state]}40`,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="h-3 w-3 rounded-full animate-pulse"
          style={{ backgroundColor: stateColors[state] }}
        />
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400">DROID STATUS</p>
          <p className="text-sm font-semibold" style={{ color: stateColors[state] }}>
            {stateLabels[state]}
          </p>
        </div>
        {currentWaypoint && (
          <div className="ml-4 border-l border-white/10 pl-4">
            <p className="text-xs text-slate-400">Waypoint</p>
            <p className="text-xs font-mono text-cyan-300">{currentWaypoint}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

