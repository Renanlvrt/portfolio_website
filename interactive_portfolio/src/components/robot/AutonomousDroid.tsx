"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useAudio } from "@/hooks/useAudio";
import { DroidScanBeam } from "./DroidScanBeam";
import * as THREE from "three";

type AutonomousDroidProps = {
  waypoints?: Array<{ x: number; z: number; id?: string }>;
  speed?: number;
};

type DroidState = "idle" | "moving" | "scanning" | "exploring";

/**
 * AUTONOMOUS WHEELED DROID
 * 
 * Star Wars-style droid that:
 * - Has wheels and moves autonomously
 * - Scans the environment
 * - Navigates to waypoints
 * - Explores the page independently
 * - Behaves like R2-D2/BB-8
 */
export function AutonomousDroid({ 
  waypoints = [],
  speed = 0.02 
}: AutonomousDroidProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const leftWheelRef = useRef<THREE.Mesh>(null);
  const rightWheelRef = useRef<THREE.Mesh>(null);
  const scannerRef = useRef<THREE.Mesh>(null);
  const domeRef = useRef<THREE.Mesh>(null);
  const eyeRef = useRef<THREE.Mesh>(null);

  const [state, setState] = useState<DroidState>("exploring");
  const [currentWaypoint, setCurrentWaypoint] = useState<number>(0);
  const [targetPosition, setTargetPosition] = useState<[number, number, number]>([0, 0, 0]);
  const [isRotating, setIsRotating] = useState(false);
  const { play } = useAudio();

  // Generate waypoints if none provided (explore the page)
  const explorationWaypoints = waypoints.length > 0 
    ? waypoints 
    : generateExplorationWaypoints();

  // Autonomous navigation - continuously explore
  useEffect(() => {
    if (explorationWaypoints.length === 0) return;

    // Start exploring immediately
    if (state === "exploring") {
      const exploreTimer = setTimeout(() => {
        // Randomly select next waypoint for organic movement
        const randomIndex = Math.floor(Math.random() * explorationWaypoints.length);
        const waypoint = explorationWaypoints[randomIndex];
        setTargetPosition([waypoint.x, 0, waypoint.z]);
        setState("moving");
        setIsRotating(true);
        play("robot-move");
      }, 500);

      return () => clearTimeout(exploreTimer);
    }

    // After scanning, continue exploring
    if (state === "scanning") {
      const scanTimer = setTimeout(() => {
        setState("exploring");
        setCurrentWaypoint((prev) => (prev + 1) % explorationWaypoints.length);
      }, 3000);
      return () => clearTimeout(scanTimer);
    }
  }, [state, explorationWaypoints, currentWaypoint, play]);

  // Autonomous movement animation
  useFrame((_, delta) => {
    if (!groupRef.current || !bodyRef.current) return;

    const t = performance.now() * 0.001;

    // Wheel rotation when moving
    if (state === "moving" && leftWheelRef.current && rightWheelRef.current) {
      const wheelSpeed = speed * 50;
      leftWheelRef.current.rotation.x += wheelSpeed * delta;
      rightWheelRef.current.rotation.x += wheelSpeed * delta;
    }

    // Move towards target
    if (state === "moving") {
      const currentPos = groupRef.current.position;
      const target = new THREE.Vector3(...targetPosition);
      const direction = target.clone().sub(currentPos);
      const distance = direction.length();

      if (distance > 0.15) {
        // Rotate towards target
        const targetAngle = Math.atan2(direction.x, direction.z);
        const currentAngle = groupRef.current.rotation.y;
        let angleDiff = targetAngle - currentAngle;

        // Normalize angle difference
        while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

        // Smooth rotation (only rotate if angle difference is significant)
        if (Math.abs(angleDiff) > 0.1) {
          groupRef.current.rotation.y += angleDiff * 0.15;
          setIsRotating(true);
        } else {
          setIsRotating(false);
        }

        // Move forward only if facing roughly the right direction
        if (Math.abs(angleDiff) < 0.5) {
          const moveSpeed = speed * delta * 60;
          groupRef.current.position.x += Math.sin(groupRef.current.rotation.y) * moveSpeed;
          groupRef.current.position.z += Math.cos(groupRef.current.rotation.y) * moveSpeed;
        }
      } else {
        // Reached waypoint - scan it
        setState("scanning");
        setIsRotating(false);
        play("robot-scan");
      }
    }

    // Scanning animation
    if (state === "scanning" && scannerRef.current) {
      scannerRef.current.rotation.y += delta * 2; // Rotating scanner
      if (domeRef.current) {
        domeRef.current.rotation.y = Math.sin(t * 2) * 0.1; // Slight dome rotation
      }
    }

    // Idle behaviors
    if (state === "idle" || state === "exploring") {
      // Gentle bobbing
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.05;
      
      // Dome rotation
      if (domeRef.current) {
        domeRef.current.rotation.y += delta * 0.2;
      }

      // Occasional beep (eye flash)
      if (eyeRef.current) {
        const flash = Math.sin(t * 3) > 0.8 ? 2.0 : 1.0;
        (eyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = flash;
      }
    }

    // Body tilt when turning
    if (isRotating && bodyRef.current) {
      const tilt = Math.sin(t * 5) * 0.05;
      bodyRef.current.rotation.z = tilt;
    } else if (bodyRef.current) {
      bodyRef.current.rotation.z *= 0.9; // Smooth return to neutral
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1.2} userData={{ isDroid: true }}>
      {/* Main Body (Cylindrical like R2-D2) */}
      <mesh ref={bodyRef} position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.6, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.8}
          roughness={0.2}
          emissive="#00D9FF"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Dome Head */}
      <mesh ref={domeRef} position={[0, 0.65, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.9}
          roughness={0.1}
          emissive="#00D9FF"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Eye/Sensor */}
      <mesh ref={eyeRef} position={[0, 0.7, 0.32]}>
        <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
        <meshStandardMaterial
          color="#00D9FF"
          emissive="#00D9FF"
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* Scanning Sensor (rotates when scanning) */}
      <group ref={scannerRef} position={[0, 0.6, 0.35]}>
        <mesh>
          <boxGeometry args={[0.1, 0.05, 0.15]} />
          <meshStandardMaterial
            color="#A855F7"
            emissive="#A855F7"
            emissiveIntensity={state === "scanning" ? 2.0 : 0.5}
          />
        </mesh>
      </group>

      {/* Left Wheel */}
      <mesh ref={leftWheelRef} position={[-0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.15, 32]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Right Wheel */}
      <mesh ref={rightWheelRef} position={[0.35, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.2, 0.2, 0.15, 32]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Status Indicator (changes color based on state) */}
      <mesh position={[0, 0.2, 0.41]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial
          color={
            state === "moving" ? "#10B981" :
            state === "scanning" ? "#F59E0B" :
            "#00D9FF"
          }
          emissive={
            state === "moving" ? "#10B981" :
            state === "scanning" ? "#F59E0B" :
            "#00D9FF"
          }
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* Scanning Beam Effect */}
      <DroidScanBeam isScanning={state === "scanning"} color="#A855F7" />
    </group>
  );
}

// Generate exploration waypoints across the page
function generateExplorationWaypoints(): Array<{ x: number; z: number; id?: string }> {
  // Extensive waypoint network for full page exploration
  return [
    // Corners
    { x: -10, z: -10, id: "corner-tl" },
    { x: 10, z: -10, id: "corner-tr" },
    { x: 10, z: 10, id: "corner-br" },
    { x: -10, z: 10, id: "corner-bl" },
    
    // Edges
    { x: -8, z: -8, id: "edge-tl" },
    { x: 8, z: -8, id: "edge-tr" },
    { x: 8, z: 8, id: "edge-br" },
    { x: -8, z: 8, id: "edge-bl" },
    
    // Center area
    { x: 0, z: 0, id: "center" },
    { x: -5, z: -5, id: "center-tl" },
    { x: 5, z: -5, id: "center-tr" },
    { x: 5, z: 5, id: "center-br" },
    { x: -5, z: 5, id: "center-bl" },
    
    // Mid-points
    { x: -3, z: 0, id: "mid-left" },
    { x: 3, z: 0, id: "mid-right" },
    { x: 0, z: -3, id: "mid-top" },
    { x: 0, z: 3, id: "mid-bottom" },
    
    // Random exploration points
    { x: -7, z: 2, id: "explore-1" },
    { x: 7, z: -2, id: "explore-2" },
    { x: -2, z: -7, id: "explore-3" },
    { x: 2, z: 7, id: "explore-4" },
  ];
}

