"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type DroidScanBeamProps = {
  isScanning: boolean;
  color?: string;
};

/**
 * Scanning Beam Effect
 * 
 * Visual scanning beam that sweeps when droid is scanning.
 * Like R2-D2's scanner or BB-8's sensor sweep.
 */
export function DroidScanBeam({ isScanning, color = "#A855F7" }: DroidScanBeamProps) {
  const beamRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!beamRef.current) return;

    if (isScanning) {
      const t = clock.getElapsedTime();
      beamRef.current.rotation.y = t * 2; // Rotating scan beam
    } else {
      beamRef.current.rotation.y = 0;
    }
  });

  if (!isScanning) return null;

  return (
    <group ref={beamRef} position={[0, 0.6, 0]}>
      {/* Scanning cone */}
      <mesh rotation={[0, 0, 0]}>
        <coneGeometry args={[0.5, 2, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Scanning line */}
      <mesh rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 2, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.0}
        />
      </mesh>
    </group>
  );
}

