"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { PortalNode } from "@/data/portals";
import { HolographicCard } from "@/components/ui/HolographicCard";

type ZoneCardProps = {
  node: PortalNode;
  position: "top" | "right" | "bottom" | "left";
  isHovered: boolean;
  onClick: () => void;
  onHover: () => void;
  onLeave: () => void;
};

/**
 * Static Zone Card
 * 
 * Positioned around robot in cardinal directions.
 * Glows when hovered, robot reacts to hover.
 */
export function ZoneCard({
  node,
  position,
  isHovered,
  onClick,
  onHover,
  onLeave,
}: ZoneCardProps) {
  const positionClasses = {
    top: "justify-center",
    right: "justify-end items-center",
    bottom: "justify-center",
    left: "justify-start items-center",
  };

  return (
    <motion.div
      className={`flex ${positionClasses[position]}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HolographicCard
        glowColor={node.color}
        className="w-64 cursor-pointer"
        delay={0.2}
      >
        <motion.div
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          onClick={onClick}
          className="p-6 space-y-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
              {node.label}
            </p>
            <ArrowUpRight 
              className={`h-4 w-4 transition-colors ${
                isHovered ? "text-cyan-300" : "text-slate-400"
              }`}
            />
          </div>
          
          <h3 className="text-xl font-semibold text-white">{node.title}</h3>
          
          <p className="text-sm text-slate-300 line-clamp-2">{node.summary}</p>
          
          <div className="flex flex-wrap gap-2 pt-2">
            {node.metrics.slice(0, 2).map((metric) => (
              <span
                key={metric.label}
                className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200"
              >
                {metric.value} · {metric.label}
              </span>
            ))}
          </div>
        </motion.div>
      </HolographicCard>
    </motion.div>
  );
}

