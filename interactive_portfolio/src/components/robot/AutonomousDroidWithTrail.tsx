"use client";

import { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { AutonomousDroid } from "./AutonomousDroid";
import { DroidTrail } from "./DroidTrail";
import * as THREE from "three";

type AutonomousDroidWithTrailProps = {
  waypoints: Array<{ x: number; z: number; id?: string }>;
  speed?: number;
};

/**
 * Autonomous Droid with Trail
 * 
 * Wraps the droid and trail together.
 * Trail follows droid's position by finding it in the scene.
 */
export function AutonomousDroidWithTrail({ 
  waypoints, 
  speed = 0.03 
}: AutonomousDroidWithTrailProps) {
  const droidGroupRef = useRef<THREE.Group>(null);
  const { scene } = useThree();

  // Find droid in scene
  useEffect(() => {
    const findDroid = () => {
      scene.traverse((object) => {
        if (object.userData.isDroid && object instanceof THREE.Group) {
          droidGroupRef.current = object;
        }
      });
    };

    // Initial find
    findDroid();
    
    // Periodically update ref in case droid moves in scene tree
    const interval = setInterval(findDroid, 1000);
    return () => clearInterval(interval);
  }, [scene]);

  return (
    <>
      {/* Droid */}
      <AutonomousDroid waypoints={waypoints} speed={speed} />
      
      {/* Trail - follows droid by finding it in scene */}
      <DroidTrail droidGroupRef={droidGroupRef} enabled={true} />
    </>
  );
}

