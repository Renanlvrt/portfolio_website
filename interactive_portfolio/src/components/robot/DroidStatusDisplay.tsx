"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type DroidStatusDisplayProps = {
  position: [number, number, number];
};

/**
 * 3D Status Display
 * 
 * Floating HUD that follows the droid in 3D space.
 */
export function DroidStatusDisplay({ position }: DroidStatusDisplayProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.set(...position);
      groupRef.current.position.y += 1.5; // Float above droid
    }
  });

  return (
    <group ref={groupRef}>
      {/* Status text sprite (simplified - could use Text3D from drei) */}
      <mesh>
        <planeGeometry args={[1, 0.3]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#00D9FF"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

