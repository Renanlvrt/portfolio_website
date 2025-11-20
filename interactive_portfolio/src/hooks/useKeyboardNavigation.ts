"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { portalNodes } from "@/data/portals";

export function useKeyboardNavigation() {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Toggle help with '?' or 'H'
      if (e.key === "?" || e.key === "h" || e.key === "H") {
        setShowHelp((prev) => !prev);
        return;
      }

      // Number keys 1-5 to navigate to missions
      if (e.key >= "1" && e.key <= "5") {
        const index = parseInt(e.key) - 1;
        if (index < portalNodes.length) {
          router.push(`/missions/${portalNodes[index].id}`);
        }
        return;
      }

      // Arrow keys for selection
      if (e.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev + 1) % portalNodes.length);
        return;
      }
      if (e.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev - 1 + portalNodes.length) % portalNodes.length);
        return;
      }

      // Enter to navigate to selected
      if (e.key === "Enter") {
        router.push(`/missions/${portalNodes[selectedIndex].id}`);
        return;
      }

      // Escape to go home
      if (e.key === "Escape") {
        router.push("/");
        return;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [router, selectedIndex]);

  return { selectedIndex, showHelp, setShowHelp };
}

