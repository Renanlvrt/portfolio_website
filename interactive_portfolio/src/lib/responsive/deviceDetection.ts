/**
 * Device Detection System
 * 
 * Clean, extensible system for detecting device capabilities
 * and adapting UI/UX accordingly.
 */

export type DeviceType = "desktop" | "tablet" | "mobile";
export type InputMethod = "mouse" | "touch" | "keyboard";

export interface DeviceCapabilities {
  type: DeviceType;
  inputMethod: InputMethod;
  supports3D: boolean;
  supportsWebGL: boolean;
  supportsSpatialAudio: boolean;
  isLowEnd: boolean;
  screenWidth: number;
  screenHeight: number;
}

class DeviceDetector {
  private capabilities: DeviceCapabilities;

  constructor() {
    if (typeof window !== "undefined") {
      this.capabilities = this.detectCapabilities();
      this.setupResizeListener();
    } else {
      // Default for SSR
      this.capabilities = {
        type: "desktop",
        inputMethod: "mouse",
        supports3D: true,
        supportsWebGL: true,
        supportsSpatialAudio: false,
        isLowEnd: false,
        screenWidth: 1920,
        screenHeight: 1080,
      };
    }
  }

  private detectCapabilities(): DeviceCapabilities {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Device type
    let type: DeviceType = "desktop";
    if (width < 768) {
      type = "mobile";
    } else if (width < 1024) {
      type = "tablet";
    }

    // Input method
    let inputMethod: InputMethod = "mouse";
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      inputMethod = "touch";
    }

    // WebGL support
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("webgl2");
    const supportsWebGL = !!gl;

    // 3D support (WebGL + reasonable performance)
    const supports3D = supportsWebGL && width >= 768;

    // Spatial audio support
    const supportsSpatialAudio = 
      typeof window.AudioContext !== "undefined" ||
      typeof (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext !== "undefined";

    // Low-end detection
    const isLowEnd = 
      navigator.hardwareConcurrency <= 4 ||
      ((navigator as { deviceMemory?: number }).deviceMemory ?? 8) <= 4 ||
      width < 768;

    return {
      type,
      inputMethod,
      supports3D,
      supportsWebGL: supportsWebGL,
      supportsSpatialAudio,
      isLowEnd,
      screenWidth: width,
      screenHeight: height,
    };
  }

  private setupResizeListener(): void {
    if (typeof window === "undefined") return;

    let resizeTimer: NodeJS.Timeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.capabilities = this.detectCapabilities();
        // Dispatch event for components to react
        window.dispatchEvent(new CustomEvent("device-capabilities-changed"));
      }, 250);
    });
  }

  getCapabilities(): DeviceCapabilities {
    return { ...this.capabilities };
  }

  isMobile(): boolean {
    return this.capabilities.type === "mobile";
  }

  isTablet(): boolean {
    return this.capabilities.type === "tablet";
  }

  isDesktop(): boolean {
    return this.capabilities.type === "desktop";
  }

  shouldUse2DFallback(): boolean {
    return !this.capabilities.supports3D || this.capabilities.isLowEnd;
  }
}

// Singleton instance
let deviceDetectorInstance: DeviceDetector | null = null;

export function getDeviceDetector(): DeviceDetector {
  if (!deviceDetectorInstance) {
    deviceDetectorInstance = new DeviceDetector();
  }
  return deviceDetectorInstance;
}

