"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type DroidTrailProps = {
  droidGroupRef: React.RefObject<THREE.Group>;
  enabled?: boolean;
};

/**
 * Droid Movement Trail
 * 
 * Visual trail that follows the droid as it moves.
 * Like a Star Wars droid leaving a path.
 */
export function DroidTrail({ droidGroupRef, enabled = true }: DroidTrailProps) {
  const trailRef = useRef<THREE.Points>(null);
  const positionsRef = useRef<Float32Array>(new Float32Array(300)); // 100 points * 3 coords
  const currentIndex = useRef(0);
  const lastPosition = useRef<[number, number, number]>([0, 0, 0]);
  
  // Initialize positions array (not accessing ref.current during render)
  const initialPositions = new Float32Array(300);

  useFrame(() => {
    if (!trailRef.current || !enabled || !droidGroupRef.current) return;

    const droidPos = droidGroupRef.current.position;
    const x = droidPos.x;
    const y = droidPos.y;
    const z = droidPos.z;
    const [lastX, lastY, lastZ] = lastPosition.current;

    // Only add point if moved significantly
    const distance = Math.sqrt(
      Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2) + Math.pow(z - lastZ, 2)
    );

    if (distance > 0.15) {
      const idx = currentIndex.current * 3;
      positionsRef.current[idx] = x;
      positionsRef.current[idx + 1] = y + 0.1; // Slightly above ground
      positionsRef.current[idx + 2] = z;

      currentIndex.current = (currentIndex.current + 1) % 100;
      lastPosition.current = [x, y, z];

      // Update geometry
      const geometry = trailRef.current.geometry;
      if (geometry.attributes.position) {
        const attr = geometry.attributes.position as THREE.BufferAttribute;
        attr.array = positionsRef.current;
        attr.needsUpdate = true;
      }
    }
  });

  if (!enabled) return null;

  return (
    <points ref={trailRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={100}
          array={initialPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00D9FF"
        size={0.08}
        sizeAttenuation
        transparent
        opacity={0.3}
      />
    </points>
  );
}

