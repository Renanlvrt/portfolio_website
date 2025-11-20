"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type LoadingScreenProps = {
  onComplete: () => void;
};

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing AI core...");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const statusMessages = [
      "Initializing AI core...",
      "Loading neural networks...",
      "Calibrating sensors...",
      "Establishing uplink...",
      "Mission protocols ready...",
    ];

    let statusIndex = 0;
    const statusInterval = setInterval(() => {
      if (statusIndex < statusMessages.length - 1) {
        statusIndex++;
        setStatus(statusMessages[statusIndex]);
      }
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(statusInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* EKG Line Animation */}
        <div className="mb-12 w-full max-w-2xl px-8">
          <svg viewBox="0 0 800 200" className="h-32 w-full">
            <motion.path
              d="M 0 100 Q 100 50, 200 100 T 400 100 T 600 100 T 800 100"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <motion.path
              d="M 0 100 L 50 100 L 60 80 L 70 100 L 80 120 L 90 100 L 150 100 L 160 80 L 170 100 L 180 120 L 190 100 L 250 100 L 260 80 L 270 100 L 280 120 L 290 100 L 350 100 L 360 80 L 370 100 L 380 120 L 390 100 L 450 100 L 460 80 L 470 100 L 480 120 L 490 100 L 550 100 L 560 80 L 570 100 L 580 120 L 590 100 L 650 100 L 660 80 L 670 100 L 680 120 L 690 100 L 750 100 L 760 80 L 770 100 L 780 120 L 790 100 L 800 100"
              fill="none"
              stroke="#22d3ee"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
            />
          </svg>
        </div>

        {/* Name Animation */}
        <motion.h1
          className="mb-4 text-5xl font-bold text-white md:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            RENAN
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            className="text-cyan-300"
          >
            LAVIROTTE
          </motion.span>
        </motion.h1>

        {/* Status Text */}
        <motion.p
          className="mb-8 text-sm uppercase tracking-[0.3em] text-cyan-200"
          key={status}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {status}
        </motion.p>

        {/* Progress Bar */}
        <div className="w-full max-w-md px-8">
          <div className="h-1 w-full overflow-hidden rounded-full bg-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <motion.p
            className="mt-2 text-center text-xs text-slate-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {progress}%
          </motion.p>
        </div>

        {/* Pulsing Indicator */}
        <motion.div
          className="mt-8 h-2 w-2 rounded-full bg-cyan-300"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

