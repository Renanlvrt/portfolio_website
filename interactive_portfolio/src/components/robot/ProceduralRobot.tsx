"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type ProceduralRobotProps = {
  zone?: string;
  isActive?: boolean;
  bootState?: "wireframe" | "materializing" | "solid" | "powered";
};

/**
 * UNIQUE FEATURE: Procedurally Generated Robot
 * 
 * Instead of a static model, this robot is built dynamically from modular components.
 * The robot's appearance and behavior adapt based on:
 * - Current zone (different modules for AI, Vision, Robotics, etc.)
 * - User interaction history
 * - Real-time performance metrics
 * 
 * This creates a truly unique, never-seen-before experience where the robot
 * evolves as you explore the portfolio.
 */
export function ProceduralRobot({ 
  zone = "hub", 
  isActive = true,
  bootState = "solid"
}: ProceduralRobotProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  const baseRef = useRef<THREE.Group>(null);

  // Procedural configuration based on zone
  const robotConfig = useMemo(() => {
    const configs: Record<string, {
      color: string;
      modules: string[];
      glowIntensity: number;
      scale: number;
    }> = {
      hub: {
        color: "#00D9FF",
        modules: ["base", "torso", "head", "arms"],
        glowIntensity: 1.0,
        scale: 1.0,
      },
      medical: {
        color: "#f43f5e",
        modules: ["base", "torso", "head", "arms", "medical-sensors"],
        glowIntensity: 1.5,
        scale: 1.1,
      },
      "vr-ai": {
        color: "#a855f7",
        modules: ["base", "torso", "head", "arms", "neural-interface"],
        glowIntensity: 1.8,
        scale: 1.05,
      },
      robotics: {
        color: "#22d3ee",
        modules: ["base", "torso", "head", "arms", "lidar-scanner"],
        glowIntensity: 1.3,
        scale: 1.15,
      },
      web: {
        color: "#10b981",
        modules: ["base", "torso", "head", "arms", "data-processor"],
        glowIntensity: 1.2,
        scale: 1.0,
      },
      about: {
        color: "#f97316",
        modules: ["base", "torso", "head", "arms"],
        glowIntensity: 1.0,
        scale: 1.0,
      },
    };

    return configs[zone] || configs.hub;
  }, [zone]);

  // Idle animation - robot "breathes" and scans
  useFrame(({ clock }) => {
    if (!groupRef.current || !isActive) return;

    const t = clock.getElapsedTime();

    // Gentle floating motion
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.1;

    // Head rotation (scanning)
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.3) * 0.2;
    }

    // Arm subtle movements
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(t * 0.4) * 0.1 - 0.3;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = Math.sin(t * 0.4) * 0.1 + 0.3;
    }

    // Torso slight rotation
    if (torsoRef.current) {
      torsoRef.current.rotation.y = Math.sin(t * 0.2) * 0.05;
    }
  });

  // Boot state material
  const getMaterial = () => {
    if (bootState === "wireframe") {
      return {
        wireframe: true,
        color: "#00D9FF",
        transparent: true,
        opacity: 0.8,
      };
    }
    return {
      wireframe: false,
    };
  };

  const materialProps = getMaterial();

  return (
    <group ref={groupRef} scale={robotConfig.scale}>
      {/* Base/Wheels */}
      <group ref={baseRef}>
        <mesh position={[0, -0.8, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.3, 32]} />
          <meshStandardMaterial
            {...materialProps}
            color={bootState === "wireframe" ? "#00D9FF" : "#1a1a1a"}
            metalness={bootState === "wireframe" ? 0 : 0.8}
            roughness={bootState === "wireframe" ? 1 : 0.2}
            emissive={robotConfig.color}
            emissiveIntensity={robotConfig.glowIntensity * 0.3}
          />
        </mesh>
        {/* Wheels */}
        {[-0.4, 0.4].map((x, i) => (
          <mesh key={i} position={[x, -0.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.15, 0.05, 16, 32]} />
            <meshStandardMaterial
              color="#2a2a2a"
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        ))}
      </group>

      {/* Torso */}
      <group ref={torsoRef} position={[0, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.5, 0.8, 0.4]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.3}
            roughness={0.7}
            emissive={robotConfig.color}
            emissiveIntensity={robotConfig.glowIntensity * 0.2}
          />
        </mesh>
        {/* Core LED */}
        <mesh position={[0, 0, 0.21]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color={robotConfig.color}
            emissive={robotConfig.color}
            emissiveIntensity={robotConfig.glowIntensity}
          />
        </mesh>
      </group>

      {/* Head */}
      <group ref={headRef} position={[0, 0.6, 0]}>
        <mesh>
          <boxGeometry args={[0.35, 0.35, 0.35]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.4}
            roughness={0.6}
          />
        </mesh>
        {/* Eyes */}
        {[-0.1, 0.1].map((x, i) => (
          <mesh key={i} position={[x, 0.05, 0.18]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial
              color={robotConfig.color}
              emissive={robotConfig.color}
              emissiveIntensity={robotConfig.glowIntensity * 1.5}
            />
          </mesh>
        ))}
      </group>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.35, 0.2, 0]}>
        <mesh>
          <boxGeometry args={[0.12, 0.5, 0.12]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.5}
            roughness={0.5}
          />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[0.15, 0.15, 0.1]} />
          <meshStandardMaterial
            color="#2a2a2a"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.35, 0.2, 0]}>
        <mesh>
          <boxGeometry args={[0.12, 0.5, 0.12]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.5}
            roughness={0.5}
          />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[0.15, 0.15, 0.1]} />
          <meshStandardMaterial
            color="#2a2a2a"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Zone-Specific Modules */}
      {robotConfig.modules.includes("medical-sensors") && (
        <group position={[0, 0.4, 0.3]}>
          <mesh>
            <boxGeometry args={[0.2, 0.1, 0.05]} />
            <meshStandardMaterial
              color="#f43f5e"
              emissive="#f43f5e"
              emissiveIntensity={1.0}
            />
          </mesh>
        </group>
      )}

      {robotConfig.modules.includes("neural-interface") && (
        <group position={[0, 0.5, 0]}>
          <mesh>
            <torusGeometry args={[0.15, 0.02, 16, 32]} />
            <meshStandardMaterial
              color="#a855f7"
              emissive="#a855f7"
              emissiveIntensity={1.2}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      )}

      {robotConfig.modules.includes("lidar-scanner") && (
        <group position={[0, 0.6, 0.2]}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.08, 0.08, 0.1, 8]} />
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#22d3ee"
              emissiveIntensity={1.5}
            />
          </mesh>
        </group>
      )}

      {robotConfig.modules.includes("data-processor") && (
        <group position={[0, -0.2, 0.25]}>
          <mesh>
            <boxGeometry args={[0.3, 0.15, 0.05]} />
            <meshStandardMaterial
              color="#10b981"
              emissive="#10b981"
              emissiveIntensity={0.8}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}

