"use client";

import { useEffect } from "react";
import { initializeConsoleCommands } from "@/lib/console/consoleCommands";

/**
 * Client Initializer
 * 
 * Handles client-side initialization that should only run in the browser.
 * Clean separation of client/server code.
 */
export function ClientInitializer() {
  useEffect(() => {
    // Initialize console commands
    initializeConsoleCommands();

    // Initialize device detection
    // (getDeviceDetector() is called lazily, so this just ensures it's initialized)
    if (typeof window !== "undefined") {
      import("@/lib/responsive/deviceDetection").then(({ getDeviceDetector }) => {
        getDeviceDetector();
      });
    }
  }, []);

  return null;
}

