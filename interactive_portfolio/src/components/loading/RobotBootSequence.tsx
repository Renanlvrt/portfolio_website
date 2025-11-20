"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AutonomousDroid } from "@/components/robot/AutonomousDroid";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

type RobotBootSequenceProps = {
  onComplete: () => void;
};

const bootMessages = [
  "> INITIALIZING ROBOT OS...",
  "> LOADING AI MODULES...",
  "> CALIBRATING SENSORS...",
  "> COMPUTER VISION: ONLINE",
  "> NAVIGATION: READY",
  "> SYSTEM BOOT: COMPLETE",
];

/**
 * ROBOT-FIRST LOADING SCREEN
 * 
 * The robot appears IMMEDIATELY - first thing user sees.
 * Robot goes through awakening sequence:
 * 1. Wireframe (0-30%)
 * 2. Materialization (30-60%)
 * 3. Full model (60-90%)
 * 4. Power on (90-100%)
 */
export function RobotBootSequence({ onComplete }: RobotBootSequenceProps) {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [robotState, setRobotState] = useState<"wireframe" | "materializing" | "solid" | "powered">("wireframe");

  useEffect(() => {
    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2;
        
        // Update robot state based on progress
        if (newProgress >= 90 && robotState !== "powered") {
          setRobotState("powered");
        } else if (newProgress >= 60 && robotState !== "solid" && robotState !== "powered") {
          setRobotState("solid");
        } else if (newProgress >= 30 && robotState === "wireframe") {
          setRobotState("materializing");
        }

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onComplete();
          }, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    // Message progression
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => {
        if (prev < bootMessages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 600);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [onComplete, robotState]);

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black">
      {/* CRT Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 217, 255, 0.1) 2px, rgba(0, 217, 255, 0.1) 4px)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* 3D Robot - LARGE and CENTER */}
        <div className="h-[400px] w-[400px] md:h-[500px] md:w-[500px]">
          <Canvas camera={{ position: [0, 0.5, 4], fov: 50 }}>
            <PerspectiveCamera makeDefault position={[0, 0.5, 4]} />
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#00D9FF" />
            <pointLight position={[-5, 3, -5]} intensity={0.8} color="#00D9FF" />
            <spotLight position={[0, 5, 0]} intensity={2} angle={0.5} penumbra={1} color="#00D9FF" />
            
            <AutonomousDroid 
              waypoints={[]}
              speed={0}
            />
          </Canvas>
        </div>

        {/* Terminal Text - Below Robot */}
        <div className="font-mono text-green-400 text-sm space-y-2 text-center">
          {bootMessages.slice(0, currentMessage + 1).map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {msg}
              {idx === currentMessage && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="ml-2"
                >
                  ▊
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-64">
          <div className="h-1 w-full overflow-hidden rounded-full bg-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <motion.p
            className="mt-2 text-center text-xs text-slate-400 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {progress}%
          </motion.p>
        </div>

        {/* Skip Button */}
        <motion.button
          className="mt-4 text-xs text-slate-500 hover:text-cyan-400 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          onClick={onComplete}
        >
          SKIP BOOT SEQUENCE &gt;
        </motion.button>
      </div>
    </div>
  );
}
