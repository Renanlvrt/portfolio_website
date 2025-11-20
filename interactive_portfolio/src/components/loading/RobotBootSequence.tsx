"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProceduralRobot } from "@/components/robot/ProceduralRobot";
import { Canvas } from "@react-three/fiber";

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
 * UNIQUE FEATURE: Terminal-Style Boot Sequence with 3D Robot
 * 
 * Combines retro terminal aesthetic with modern 3D robot visualization.
 * The robot "awakens" as the system boots, creating a cinematic experience.
 */
export function RobotBootSequence({ onComplete }: RobotBootSequenceProps) {
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showRobot, setShowRobot] = useState(false);

  useEffect(() => {
    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            onComplete();
          }, 1000);
          return 100;
        }
        return prev + 2;
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

    // Show robot after first message
    setTimeout(() => setShowRobot(true), 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [onComplete]);

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
        {/* 3D Robot */}
        <div className="h-64 w-64">
          <AnimatePresence>
            {showRobot && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[5, 5, 5]} intensity={1} color="#00D9FF" />
                  <pointLight position={[-5, -5, -5]} intensity={0.5} color="#00D9FF" />
                  <ProceduralRobot zone="hub" isActive={true} />
                </Canvas>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Terminal Text */}
        <div className="font-mono text-green-400 text-sm space-y-2">
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

