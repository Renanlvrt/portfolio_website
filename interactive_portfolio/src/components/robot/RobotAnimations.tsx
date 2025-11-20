"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type RobotAnimationState = 
  | "idle"
  | "walking"
  | "pointing"
  | "waving"
  | "dancing"
  | "scanning";

interface RobotAnimationProps {
  state: RobotAnimationState;
  targetPosition?: [number, number, number];
  speed?: number;
}

/**
 * Enhanced Robot Animation System
 * 
 * Handles complex robot animations:
 * - Walking/rolling to target positions
 * - Gesture animations (pointing, waving)
 * - Dance sequences
 * - Scanning behaviors
 * 
 * Clean, extensible architecture for adding new animations.
 */
export function useRobotAnimations(
  robotRef: React.RefObject<THREE.Group>,
  props: RobotAnimationProps
) {
  const animationState = useRef<RobotAnimationState>(props.state);
  const animationTime = useRef(0);
  const targetPositionRef = useRef<[number, number, number] | null>(
    props.targetPosition || null
  );

  useFrame((_, delta) => {
    if (!robotRef.current) return;

    animationTime.current += delta;
    const time = animationTime.current;

    switch (props.state) {
      case "idle":
        handleIdleAnimation(robotRef.current, time);
        break;
      case "walking":
        handleWalkingAnimation(robotRef.current, time, targetPositionRef.current, props.speed || 1);
        break;
      case "pointing":
        handlePointingAnimation(robotRef.current, time);
        break;
      case "waving":
        handleWavingAnimation(robotRef.current, time);
        break;
      case "dancing":
        handleDancingAnimation(robotRef.current, time);
        break;
      case "scanning":
        handleScanningAnimation(robotRef.current, time);
        break;
    }
  });

  return {
    setState: (state: RobotAnimationState) => {
      animationState.current = state;
    },
    setTarget: (position: [number, number, number]) => {
      targetPositionRef.current = position;
    },
  };
}

function handleIdleAnimation(robot: THREE.Group, time: number) {
  // Gentle floating
  robot.position.y = Math.sin(time * 0.5) * 0.1;

  // Head rotation
  const head = robot.getObjectByName("head");
  if (head) {
    head.rotation.y = Math.sin(time * 0.3) * 0.2;
  }

  // Subtle arm movements
  const leftArm = robot.getObjectByName("leftArm");
  const rightArm = robot.getObjectByName("rightArm");
  if (leftArm) leftArm.rotation.z = Math.sin(time * 0.4) * 0.1 - 0.3;
  if (rightArm) rightArm.rotation.z = Math.sin(time * 0.4) * 0.1 + 0.3;
}

function handleWalkingAnimation(
  robot: THREE.Group,
  time: number,
  target: [number, number, number] | null,
  speed: number
) {
  if (target) {
    // Move towards target
    const direction = new THREE.Vector3(
      target[0] - robot.position.x,
      target[1] - robot.position.y,
      target[2] - robot.position.z
    );
    const distance = direction.length();

    if (distance > 0.1) {
      direction.normalize();
      robot.position.add(direction.multiplyScalar(speed * 0.02));
      robot.lookAt(target[0], robot.position.y, target[2]);
    }
  }

  // Walking animation - body bobbing
  robot.position.y = Math.sin(time * 4) * 0.05;

  // Arm swing
  const leftArm = robot.getObjectByName("leftArm");
  const rightArm = robot.getObjectByName("rightArm");
  if (leftArm) leftArm.rotation.z = Math.sin(time * 4) * 0.3 - 0.3;
  if (rightArm) rightArm.rotation.z = -Math.sin(time * 4) * 0.3 + 0.3;
}

function handlePointingAnimation(robot: THREE.Group, time: number) {
  const rightArm = robot.getObjectByName("rightArm");
  if (rightArm) {
    rightArm.rotation.z = -0.8 + Math.sin(time * 2) * 0.1;
    rightArm.rotation.x = -0.3;
  }
}

function handleWavingAnimation(robot: THREE.Group, time: number) {
  const rightArm = robot.getObjectByName("rightArm");
  if (rightArm) {
    rightArm.rotation.z = -0.5 + Math.sin(time * 6) * 0.3;
  }
}

function handleDancingAnimation(robot: THREE.Group, time: number) {
  // Fun dance sequence
  robot.rotation.y = Math.sin(time * 2) * 0.5;
  robot.position.y = Math.abs(Math.sin(time * 4)) * 0.2;

  const leftArm = robot.getObjectByName("leftArm");
  const rightArm = robot.getObjectByName("rightArm");
  if (leftArm) leftArm.rotation.z = Math.sin(time * 4) * 0.8;
  if (rightArm) rightArm.rotation.z = -Math.sin(time * 4) * 0.8;
}

function handleScanningAnimation(robot: THREE.Group, time: number) {
  const head = robot.getObjectByName("head");
  if (head) {
    head.rotation.y = Math.sin(time * 0.5) * Math.PI; // Full 180° scan
  }
}

