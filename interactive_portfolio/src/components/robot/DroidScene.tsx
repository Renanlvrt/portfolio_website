"use client";

import { AutonomousDroid } from "./AutonomousDroid";

type DroidSceneProps = {
  waypoints: Array<{ x: number; z: number; id?: string }>;
  speed?: number;
};

/**
 * Droid Scene
 * 
 * Simple wrapper for the autonomous droid.
 * Trail is handled internally by the droid component.
 */
export function DroidScene({ waypoints, speed = 0.03 }: DroidSceneProps) {
  return <AutonomousDroid waypoints={waypoints} speed={speed} />;
}

