"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Particle = {
  x: number;
  y: number;
  id: number;
};

export function ParticleTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setParticles((prev) => {
        const newParticles = [
          ...prev,
          {
            x: e.clientX,
            y: e.clientY,
            id: particleIdRef.current++,
          },
        ];

        // Limit particles
        if (newParticles.length > 15) {
          return newParticles.slice(-15);
        }
        return newParticles;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9998]">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute h-1 w-1 rounded-full bg-cyan-300"
          style={{
            left: particle.x,
            top: particle.y,
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.8 }}
        />
      ))}
    </div>
  );
}

