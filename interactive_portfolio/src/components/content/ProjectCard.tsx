"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PortalNode } from "@/data/portals";
import { projectDetails } from "@/data/projects";
import { HolographicCard } from "@/components/ui/HolographicCard";

type ProjectCardProps = {
  node: PortalNode;
  index: number;
};

/**
 * Creative Project Card
 * 
 * Unique card design with images, hover effects, and creative layout.
 * Each card is a destination the droid can visit.
 */
export function ProjectCard({ node, index }: ProjectCardProps) {
  const project = projectDetails[node.id];
  const images = project?.images || [];
  const primaryImage = images[0] || "/images/profile-portrait.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group"
    >
      <Link href={`/missions/${node.id}`}>
        <HolographicCard glowColor={node.color} className="overflow-hidden h-full cursor-pointer">
          {/* Image Section - Creative Overlay */}
          <div className="relative h-64 w-full overflow-hidden bg-slate-900">
            {primaryImage ? (
              <Image
                src={primaryImage}
                alt={node.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl">🤖</div>
              </div>
            )}
            {/* Gradient Overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
              style={{ background: `linear-gradient(to top, ${node.color}40, transparent)` }}
            />
            {/* Floating Badge */}
            <div className="absolute top-4 right-4">
              <div 
                className="rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-xl"
                style={{ 
                  backgroundColor: `${node.color}20`,
                  borderColor: `${node.color}50`,
                  color: node.color
                }}
              >
                {node.label}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">{node.title}</h3>
              <p className="text-sm text-slate-300 line-clamp-2">{node.summary}</p>
            </div>

            {/* Metrics */}
            <div className="flex flex-wrap gap-2">
              {node.metrics.slice(0, 2).map((metric) => (
                <span
                  key={metric.label}
                  className="rounded-full border px-3 py-1 text-xs"
                  style={{
                    borderColor: `${node.color}30`,
                    backgroundColor: `${node.color}10`,
                    color: `${node.color}CC`,
                  }}
                >
                  {metric.value} · {metric.label}
                </span>
              ))}
            </div>

            {/* Action */}
            <div className="flex items-center gap-2 text-sm font-medium pt-2">
              <span style={{ color: node.color }}>Explore Mission</span>
              <ArrowUpRight 
                className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                style={{ color: node.color }}
              />
            </div>
          </div>
        </HolographicCard>
      </Link>
    </motion.div>
  );
}

