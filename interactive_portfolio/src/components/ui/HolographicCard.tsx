"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type HolographicCardProps = {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  delay?: number;
};

/**
 * UNIQUE FEATURE: Holographic UI Elements
 * 
 * All UI elements appear as if they're floating holograms in 3D space.
 * Uses advanced CSS transforms and perspective to create depth.
 */
export function HolographicCard({
  children,
  className = "",
  glowColor = "#00D9FF",
  delay = 0,
}: HolographicCardProps) {
  return (
    <motion.div
      className={`relative rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl ${className}`}
      style={{
        boxShadow: `0 0 30px ${glowColor}40, inset 0 0 20px ${glowColor}10`,
      }}
      initial={{ opacity: 0, y: 20, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      whileHover={{
        scale: 1.02,
        rotateY: 2,
        boxShadow: `0 0 40px ${glowColor}60, inset 0 0 30px ${glowColor}20`,
      }}
    >
      {/* Holographic scan line effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-20"
        style={{
          background: `linear-gradient(
            180deg,
            transparent 0%,
            ${glowColor}40 50%,
            transparent 100%
          )`,
          animation: "scan 3s linear infinite",
        }}
      />
      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Corner accents */}
      <div
        className="absolute -top-px -left-px h-4 w-4 rounded-tl-2xl border-t-2 border-l-2"
        style={{ borderColor: glowColor }}
      />
      <div
        className="absolute -bottom-px -right-px h-4 w-4 rounded-br-2xl border-b-2 border-r-2"
        style={{ borderColor: glowColor }}
      />
    </motion.div>
  );
}

