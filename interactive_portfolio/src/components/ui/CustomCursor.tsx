"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Use mouseover instead of mouseenter for better event delegation
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target;
      
      // Type guard: ensure target is an Element
      if (!target || !(target instanceof Element)) {
        setIsHovering(false);
        return;
      }

      // Check if target or any parent is a link or button
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null;

      setIsHovering(isInteractive);
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    // Add event listeners
    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver, true);
    document.addEventListener("mouseout", handleMouseOut, true);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver, true);
      document.removeEventListener("mouseout", handleMouseOut, true);
    };
  }, [cursorX, cursorY]);

  // Don't render on server (prevents hydration mismatch)
  if (typeof window === "undefined") {
    return null;
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <div className="relative">
          {/* Outer ring */}
          <motion.div
            className="absolute -left-4 -top-4 h-8 w-8 rounded-full border-2 border-cyan-300"
            animate={{
              scale: isHovering ? 1.5 : 1,
              opacity: isHovering ? 0.5 : 0.3,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
          />
          {/* Inner dot */}
          <motion.div
            className="h-2 w-2 rounded-full bg-cyan-300"
            animate={{
              scale: isClicking ? 0.5 : 1,
            }}
          />
          {/* Crosshair lines */}
          {isHovering && (
            <motion.div
              className="absolute -left-2 -top-2 h-4 w-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-cyan-300" />
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-cyan-300" />
            </motion.div>
          )}
        </div>
      </motion.div>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
