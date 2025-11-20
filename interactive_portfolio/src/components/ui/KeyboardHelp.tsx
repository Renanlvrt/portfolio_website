"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type KeyboardHelpProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function KeyboardHelp({ isOpen, onClose }: KeyboardHelpProps) {
  const shortcuts = [
    { key: "1-5", description: "Navigate to mission" },
    { key: "↑↓", description: "Select mission" },
    { key: "Enter", description: "Open selected mission" },
    { key: "Esc", description: "Return to hub" },
    { key: "? / H", description: "Toggle this help" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed left-1/2 top-1/2 z-[101] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/20 bg-slate-900/95 p-6 backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">Keyboard Shortcuts</h3>
              <button
                onClick={onClose}
                className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              {shortcuts.map((shortcut) => (
                <div key={shortcut.key} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3">
                  <span className="text-sm text-slate-300">{shortcut.description}</span>
                  <kbd className="rounded border border-white/20 bg-black/40 px-2 py-1 font-mono text-xs text-cyan-300">
                    {shortcut.key}
                  </kbd>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

