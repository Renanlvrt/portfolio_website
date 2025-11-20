"use client";

import { motion } from "framer-motion";
import { Radio, Wifi, Battery } from "lucide-react";

export function HUDOverlay() {
  return (
    <>
      {/* Top HUD Bar */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/60 px-6 py-3 backdrop-blur-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-cyan-300">
            <Radio className="h-3 w-3" />
            <span className="uppercase tracking-wider">Uplink Active</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Wifi className="h-3 w-3" />
            <span>Signal: 100%</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Battery className="h-3 w-3" />
            <span>Power: 100%</span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="text-xs text-slate-400">
            <span className="font-mono">AI-SCOUT v2.1</span>
          </div>
        </div>
      </motion.div>

      {/* Corner Indicators */}
      <motion.div
        className="fixed bottom-4 left-4 z-50 flex flex-col gap-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-slate-300 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse" />
            <span>Navigation Ready</span>
          </div>
        </div>
      </motion.div>

      {/* Right Side Status */}
      <motion.div
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-slate-300 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
            <span>Systems Nominal</span>
          </div>
        </div>
      </motion.div>
    </>
  );
}

