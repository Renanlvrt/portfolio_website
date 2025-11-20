"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useAudio } from "@/hooks/useAudio";
import * as THREE from "three";

type InteractiveRobotProps = {
  hoveredZone: string | null;
};

type RobotAnimationState = 
  | "idle"
  | "waving"
  | "pointing"
  | "reacting"
  | "walking";

/**
 * INTERACTIVE ROBOT - CENTERPIECE
 * 
 * The robot is ALWAYS animated and interactive.
 * - Idle behaviors (breathing, scanning, weight shifting)
 * - Responds to zone card hovers (turns head, points)
 * - Reacts to clicks
 * - Guides navigation
 */
export function InteractiveRobot({
  hoveredZone,
}: InteractiveRobotProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  const baseRef = useRef<THREE.Group>(null);
  const coreLEDRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);

  const [animationState, setAnimationState] = useState<RobotAnimationState>("idle");
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0]);
  const [hasWaved, setHasWaved] = useState(false);
  const { play } = useAudio();

  // Initial wave on mount
  useEffect(() => {
    if (!hasWaved) {
      setTimeout(() => {
        setAnimationState("waving");
        play("robot-boot");
        setTimeout(() => {
          setAnimationState("idle");
          setHasWaved(true);
        }, 2000);
      }, 1000);
    }
  }, [hasWaved, play]);

  // Track mouse for head following
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition([x, y]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // React to zone hover
  useEffect(() => {
    if (hoveredZone) {
      setTimeout(() => {
        setAnimationState("pointing");
        play("robot-scan");
      }, 0);
    } else if (animationState === "pointing") {
      setTimeout(() => {
        setAnimationState("idle");
      }, 0);
    }
  }, [hoveredZone, animationState, play]);

  // Handle robot click
  const handleClick = () => {
    setAnimationState("reacting");
    play("robot-boot");
    
    setTimeout(() => {
      setAnimationState("idle");
    }, 1500);
  };

  // Animation handlers (declared before useFrame)
  const handleIdleAnimation = (t: number) => {
    // Breathing effect
    if (torsoRef.current) {
      const scale = 1 + Math.sin(t * 0.8) * 0.02;
      torsoRef.current.scale.y = scale;
    }

    // Occasional head scan (every 8-10 seconds)
    if (headRef.current && Math.sin(t * 0.1) > 0.9) {
      headRef.current.rotation.y = Math.sin(t * 0.3) * 0.3;
    }

    // Weight shifting
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(t * 0.15) * 0.05;
    }

    // Subtle arm movements
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(t * 0.4) * 0.1 - 0.3;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = Math.sin(t * 0.4) * 0.1 + 0.3;
    }
  };

  const handleWavingAnimation = (t: number) => {
    if (rightArmRef.current) {
      const waveTime = t % 2;
      rightArmRef.current.rotation.z = -0.5 + Math.sin(waveTime * Math.PI * 3) * 0.5;
    }
  };

  const handlePointingAnimation = (t: number, zone: string | null) => {
    // Point toward zone
    if (rightArmRef.current && zone) {
      rightArmRef.current.rotation.z = -0.8;
      rightArmRef.current.rotation.x = -0.3;
    }
  };

  const handleReactingAnimation = (t: number) => {
    // Surprise reaction
    if (groupRef.current) {
      groupRef.current.position.y = Math.abs(Math.sin(t * 10)) * 0.2;
    }
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 20) * 0.2;
    }
  };

  const handleWalkingAnimation = (t: number) => {
    // Walking motion
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 4) * 0.1;
    }
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(t * 4) * 0.3 - 0.3;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -Math.sin(t * 4) * 0.3 + 0.3;
    }
  };

  // Animation loop
  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const t = clock.getElapsedTime();

    // Base floating motion (always active)
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.15;

    // Animation state handling
    switch (animationState) {
      case "idle":
        handleIdleAnimation(t);
        break;
      case "waving":
        handleWavingAnimation(t);
        break;
      case "pointing":
        handlePointingAnimation(t, hoveredZone);
        break;
      case "reacting":
        handleReactingAnimation(t);
        break;
      case "walking":
        handleWalkingAnimation(t);
        break;
    }

    // Head tracking mouse (when idle or pointing)
    if (headRef.current && (animationState === "idle" || animationState === "pointing")) {
      const [mx, my] = mousePosition;
      headRef.current.rotation.y = mx * 0.3;
      headRef.current.rotation.x = my * 0.2;
    }

    // LED breathing effect
    if (coreLEDRef.current) {
      const pulse = Math.sin(t * 2) * 0.5 + 0.5;
      const intensity = hoveredZone ? 2.0 : 1.0 + pulse * 0.5;
      (coreLEDRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }

    // Eye glow
    if (leftEyeRef.current && rightEyeRef.current) {
      const glow = hoveredZone ? 2.0 : 1.5 + Math.sin(t * 2) * 0.3;
      (leftEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = glow;
      (rightEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = glow;
    }
  });

  return (
    <group
      ref={groupRef}
      scale={2.5}
      position={[0, -0.5, 0]}
      onClick={handleClick}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
    >
      {/* Base/Wheels */}
      <group ref={baseRef}>
        <mesh position={[0, -0.8, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.3, 32]} />
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.8}
            roughness={0.2}
            emissive="#00D9FF"
            emissiveIntensity={0.3}
          />
        </mesh>
        {[-0.4, 0.4].map((x, i) => (
          <mesh key={i} position={[x, -0.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.15, 0.05, 16, 32]} />
            <meshStandardMaterial color="#2a2a2a" metalness={0.9} roughness={0.1} />
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
            emissive="#00D9FF"
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* Core LED */}
        <mesh ref={coreLEDRef} position={[0, 0, 0.21]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color={hoveredZone ? "#A855F7" : "#00D9FF"}
            emissive={hoveredZone ? "#A855F7" : "#00D9FF"}
            emissiveIntensity={1.0}
          />
        </mesh>
      </group>

      {/* Head */}
      <group ref={headRef} position={[0, 0.6, 0]}>
        <mesh>
          <boxGeometry args={[0.35, 0.35, 0.35]} />
          <meshStandardMaterial color="#ffffff" metalness={0.4} roughness={0.6} />
        </mesh>
        {/* Eyes */}
        {[-0.1, 0.1].map((x, i) => {
          const eyeRef = i === 0 ? leftEyeRef : rightEyeRef;
          return (
            <mesh key={i} ref={eyeRef} position={[x, 0.05, 0.18]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshStandardMaterial
                color="#00D9FF"
                emissive="#00D9FF"
                emissiveIntensity={1.5}
              />
            </mesh>
          );
        })}
      </group>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.35, 0.2, 0]}>
        <mesh>
          <boxGeometry args={[0.12, 0.5, 0.12]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[0.15, 0.15, 0.1]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.35, 0.2, 0]}>
        <mesh>
          <boxGeometry args={[0.12, 0.5, 0.12]} />
          <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.5} />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[0.15, 0.15, 0.1]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

