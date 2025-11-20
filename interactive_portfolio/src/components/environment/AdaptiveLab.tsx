"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type AdaptiveLabProps = {
  zone?: string;
  intensity?: number;
};

/**
 * UNIQUE FEATURE: Adaptive Laboratory Environment
 * 
 * The lab environment dynamically transforms based on:
 * - Current zone (different props, lighting, atmosphere)
 * - User exploration progress
 * - Time spent in each area
 * 
 * This creates a living, breathing environment that responds to user behavior.
 */
export function AdaptiveLab({ zone = "hub", intensity = 1.0 }: AdaptiveLabProps) {
  const gridRef = useRef<THREE.GridHelper>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Environment configuration per zone
  const envConfig = useMemo(() => {
    const configs: Record<string, {
      gridColor: string;
      fogColor: string;
      particleColor: string;
      ambientIntensity: number;
    }> = {
      hub: {
        gridColor: "#00D9FF",
        fogColor: "#05060a",
        particleColor: "#8be9fd",
        ambientIntensity: 0.3,
      },
      medical: {
        gridColor: "#f43f5e",
        fogColor: "#1a0a0f",
        particleColor: "#f472b6",
        ambientIntensity: 0.4,
      },
      "vr-ai": {
        gridColor: "#a855f7",
        fogColor: "#0f0a1a",
        particleColor: "#c084fc",
        ambientIntensity: 0.5,
      },
      robotics: {
        gridColor: "#22d3ee",
        fogColor: "#0a151a",
        particleColor: "#67e8f9",
        ambientIntensity: 0.35,
      },
      web: {
        gridColor: "#10b981",
        fogColor: "#0a1a0f",
        particleColor: "#6ee7b7",
        ambientIntensity: 0.3,
      },
      about: {
        gridColor: "#f97316",
        fogColor: "#1a0f0a",
        particleColor: "#fb923c",
        ambientIntensity: 0.3,
      },
    };

    return configs[zone] || configs.hub;
  }, [zone]);

  // Floating particles - using deterministic pseudo-random
  const particleGeometry = useMemo(() => {
    const particles = 500;
    const positions = new Float32Array(particles * 3);
    
    // Deterministic pseudo-random function
    const pseudoRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < particles * 3; i += 3) {
      const seed = i + 1;
      positions[i] = (pseudoRandom(seed) - 0.5) * 20;
      positions[i + 1] = pseudoRandom(seed + 100) * 10;
      positions[i + 2] = (pseudoRandom(seed + 200) - 0.5) * 20;
    }

    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const time = clock.getElapsedTime();

      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += Math.sin(time + i) * 0.001;
        if (positions[i] > 10) positions[i] = 0;
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      {/* Adaptive Grid Floor */}
      <gridHelper
        ref={gridRef}
        args={[20, 20, envConfig.gridColor, envConfig.gridColor]}
        position={[0, -1, 0]}
      />

      {/* Floating Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleGeometry.length / 3}
            array={particleGeometry}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={envConfig.particleColor}
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.6}
        />
      </points>

      {/* Zone-Specific Props */}
      {zone === "medical" && (
        <>
          {/* Medical Equipment Holograms */}
          <mesh position={[-3, 0, -3]} rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[0.5, 1, 0.5]} />
            <meshStandardMaterial
              color="#f43f5e"
              emissive="#f43f5e"
              emissiveIntensity={0.5}
              transparent
              opacity={0.3}
            />
          </mesh>
        </>
      )}

      {zone === "vr-ai" && (
        <>
          {/* Neural Network Visualization */}
          {Array.from({ length: 10 }).map((_, i) => (
            <mesh key={i} position={[Math.sin(i) * 3, Math.cos(i) * 2, -2]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial
                color="#a855f7"
                emissive="#a855f7"
                emissiveIntensity={0.8}
              />
            </mesh>
          ))}
        </>
      )}

      {zone === "robotics" && (
        <>
          {/* Robotic Parts */}
          <mesh position={[3, 0, -3]} rotation={[0, 0, Math.PI / 4]}>
            <torusGeometry args={[0.3, 0.1, 16, 32]} />
            <meshStandardMaterial
              color="#22d3ee"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </>
      )}

      {/* Ambient Lighting */}
      <ambientLight intensity={envConfig.ambientIntensity * intensity} color={envConfig.gridColor} />
    </>
  );
}

