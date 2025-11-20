/**
 * useDevice Hook
 * 
 * React hook for accessing device capabilities.
 * Automatically updates on resize.
 */

import { useState, useEffect } from "react";
import { getDeviceDetector } from "@/lib/responsive/deviceDetection";
import type { DeviceCapabilities } from "@/lib/responsive/deviceDetection";

export function useDevice(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState(() =>
    getDeviceDetector().getCapabilities()
  );

  useEffect(() => {
    const updateCapabilities = () => {
      setCapabilities(getDeviceDetector().getCapabilities());
    };

    // Initial update
    updateCapabilities();

    // Listen for changes
    window.addEventListener("device-capabilities-changed", updateCapabilities);

    return () => {
      window.removeEventListener("device-capabilities-changed", updateCapabilities);
    };
  }, []);

  return capabilities;
}

