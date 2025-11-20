"use client";

import { motion } from "framer-motion";
import { HolographicCard } from "@/components/ui/HolographicCard";
import type { PortalNode } from "@/data/portals";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type ContentZoneProps = {
  node: PortalNode;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
};

/**
 * Content Zone
 * 
 * Interactive content areas that the droid can visit.
 * Positioned around the page as waypoints.
 */
export function ContentZone({ node, position }: ContentZoneProps) {
  const positionClasses = {
    "top-left": "top-32 left-32",
    "top-right": "top-32 right-32",
    "bottom-left": "bottom-32 left-32",
    "bottom-right": "bottom-32 right-32",
    "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} w-80`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <HolographicCard glowColor={node.color} className="cursor-pointer">
        <Link href={`/missions/${node.id}`}>
          <div className="p-6 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                {node.label}
              </p>
              <ArrowUpRight className="h-4 w-4 text-cyan-300" />
            </div>
            
            <h3 className="text-xl font-semibold text-white">{node.title}</h3>
            
            <p className="text-sm text-slate-300 line-clamp-3">{node.summary}</p>
            
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
          </div>
        </Link>
      </HolographicCard>
    </motion.div>
  );
}

