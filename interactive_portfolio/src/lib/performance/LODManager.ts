/**
 * Level of Detail (LOD) Manager
 * 
 * Performance optimization system that adjusts 3D model complexity
 * based on distance and device capabilities.
 */

export type DeviceTier = "high" | "medium" | "low" | "mobile";

export interface LODConfig {
  distance: number;
  polyCount: number;
  textureResolution: number;
  particleCount: number;
}

const LOD_CONFIGS: Record<DeviceTier, LODConfig> = {
  high: {
    distance: 50,
    polyCount: 50000,
    textureResolution: 2048,
    particleCount: 2000,
  },
  medium: {
    distance: 30,
    polyCount: 20000,
    textureResolution: 1024,
    particleCount: 1000,
  },
  low: {
    distance: 20,
    polyCount: 5000,
    textureResolution: 512,
    particleCount: 500,
  },
  mobile: {
    distance: 15,
    polyCount: 2000,
    textureResolution: 256,
    particleCount: 200,
  },
};

class LODManager {
  private deviceTier: DeviceTier = "medium";
  private currentConfig: LODConfig = LOD_CONFIGS.medium;

  constructor() {
    if (typeof window !== "undefined") {
      this.detectDeviceTier();
    }
  }

  private detectDeviceTier(): void {
    const gpu = this.getGPUTier();
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    const isLowEnd = navigator.hardwareConcurrency <= 4;

    if (isMobile || isLowEnd) {
      this.deviceTier = "mobile";
    } else if (gpu === "high") {
      this.deviceTier = "high";
    } else if (gpu === "low") {
      this.deviceTier = "low";
    } else {
      this.deviceTier = "medium";
    }

    this.currentConfig = LOD_CONFIGS[this.deviceTier];
  }

  private getGPUTier(): "high" | "medium" | "low" {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("webgl2");

    if (!gl) return "low";

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (!debugInfo) return "medium";

    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    
    // Detect high-end GPUs
    if (renderer.includes("NVIDIA") || renderer.includes("AMD") || renderer.includes("RTX")) {
      return "high";
    }
    
    // Detect low-end GPUs
    if (renderer.includes("Intel HD") || renderer.includes("Mali")) {
      return "low";
    }

    return "medium";
  }

  getConfig(): LODConfig {
    return this.currentConfig;
  }

  getDeviceTier(): DeviceTier {
    return this.deviceTier;
  }

  shouldUseLOD(distance: number): boolean {
    return distance > this.currentConfig.distance;
  }

  getPolyCountLimit(): number {
    return this.currentConfig.polyCount;
  }

  getParticleCountLimit(): number {
    return this.currentConfig.particleCount;
  }
}

// Singleton instance
let lodManagerInstance: LODManager | null = null;

export function getLODManager(): LODManager {
  if (!lodManagerInstance) {
    lodManagerInstance = new LODManager();
  }
  return lodManagerInstance;
}

