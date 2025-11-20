/**
 * Audio Manager
 * 
 * Centralized audio management system with:
 * - Master volume control
 * - Category-based volume control
 * - Spatial audio support
 * - Sound pooling for performance
 * - Clean, extensible architecture
 */

import type { 
  SoundId, 
  SoundCategory, 
  SoundConfig, 
  AudioManager as AudioManagerType 
} from "./types";

// Sound definitions - easily extensible
const SOUND_DEFINITIONS: Record<SoundId, Omit<SoundConfig, "id">> = {
  // Ambient sounds
  "mechanical-hum": {
    category: "ambient",
    volume: 0.3,
    loop: true,
  },
  "lab-ambience": {
    category: "ambient",
    volume: 0.2,
    loop: true,
  },
  // UI sounds
  "click": {
    category: "ui",
    volume: 0.5,
  },
  "hover": {
    category: "ui",
    volume: 0.3,
  },
  "select": {
    category: "ui",
    volume: 0.6,
  },
  "error": {
    category: "ui",
    volume: 0.7,
  },
  // Robot sounds
  "robot-move": {
    category: "robot",
    volume: 0.4,
    spatial: true,
  },
  "robot-scan": {
    category: "robot",
    volume: 0.5,
  },
  "robot-boot": {
    category: "robot",
    volume: 0.6,
  },
  "servo-motor": {
    category: "robot",
    volume: 0.3,
    spatial: true,
  },
  // Transition sounds
  "zone-enter": {
    category: "transition",
    volume: 0.7,
  },
  "zone-exit": {
    category: "transition",
    volume: 0.5,
  },
  "portal-whoosh": {
    category: "transition",
    volume: 0.8,
  },
  // Music
  "background-theme": {
    category: "music",
    volume: 0.2,
    loop: true,
  },
  // Effects
  "achievement": {
    category: "effect",
    volume: 0.8,
  },
  "notification": {
    category: "effect",
    volume: 0.6,
  },
};

class AudioManagerImpl implements AudioManagerType {
  masterVolume = 1.0;
  categoryVolumes: Record<SoundCategory, number> = {
    ambient: 1.0,
    ui: 1.0,
    robot: 1.0,
    transition: 1.0,
    music: 1.0,
    effect: 1.0,
  };
  muted = false;
  sounds = new Map<SoundId, HTMLAudioElement>();
  spatialAudioEnabled = true;

  private audioContext: AudioContext | null = null;
  private soundPool: Map<SoundId, HTMLAudioElement[]> = new Map();
  private readonly POOL_SIZE = 3; // Number of audio instances per sound for overlapping

  constructor() {
    if (typeof window !== "undefined") {
      this.initializeAudioContext();
      this.loadSounds();
    }
  }

  private initializeAudioContext() {
    try {
      const AudioContextClass = window.AudioContext || (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioContext = new AudioContextClass();
      }
    } catch (e) {
      console.warn("Web Audio API not supported:", e);
    }
  }

  private async loadSounds() {
    // In a real implementation, you would load actual audio files
    // For now, we'll create placeholder audio elements
    // This architecture allows easy replacement with actual files
    
    const soundIds = Object.keys(SOUND_DEFINITIONS) as SoundId[];
    
    for (const soundId of soundIds) {
      // Create audio pool for this sound
      const pool: HTMLAudioElement[] = [];
      
      for (let i = 0; i < this.POOL_SIZE; i++) {
        const audio = new Audio();
        audio.preload = "auto";
        // In production, set audio.src to actual file path
        // audio.src = `/sounds/${soundId}.mp3`;
        pool.push(audio);
      }
      
      this.soundPool.set(soundId, pool);
      this.sounds.set(soundId, pool[0]); // Store first instance as primary
    }
  }

  async play(soundId: SoundId, options?: Partial<SoundConfig>): Promise<void> {
    if (this.muted) return;

    const definition = SOUND_DEFINITIONS[soundId];
    if (!definition) {
      console.warn(`Sound ${soundId} not found`);
      return;
    }

    const config = { ...definition, ...options };
    const pool = this.soundPool.get(soundId);
    if (!pool) return;

    // Find available audio instance from pool
    let audio = pool.find((a) => a.paused || a.ended);
    if (!audio) {
      // All instances playing, use first one (will interrupt)
      audio = pool[0];
    }

    // Configure audio
    const categoryVolume = this.categoryVolumes[config.category];
    audio.volume = config.volume * categoryVolume * this.masterVolume;
    audio.loop = config.loop || false;

    // Handle spatial audio
    if (config.spatial && this.spatialAudioEnabled && config.position) {
      this.applySpatialAudio(audio, config.position, config.falloffDistance || 10);
    }

    try {
      await audio.play();
    } catch (e) {
      // User interaction required for audio in some browsers
      console.debug(`Could not play sound ${soundId}:`, e);
    }
  }

  stop(soundId: SoundId): void {
    const pool = this.soundPool.get(soundId);
    if (!pool) return;

    pool.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  }

  pause(soundId: SoundId): void {
    const pool = this.soundPool.get(soundId);
    if (!pool) return;

    pool.forEach((audio) => audio.pause());
  }

  setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    this.updateAllVolumes();
  }

  setCategoryVolume(category: SoundCategory, volume: number): void {
    this.categoryVolumes[category] = Math.max(0, Math.min(1, volume));
    this.updateAllVolumes();
  }

  toggleMute(): void {
    this.muted = !this.muted;
    if (this.muted) {
      // Pause all sounds
      this.sounds.forEach((audio) => audio.pause());
    }
  }

  updateSpatialPosition(soundId: SoundId, position: [number, number, number]): void {
    const pool = this.soundPool.get(soundId);
    if (!pool) return;

    const definition = SOUND_DEFINITIONS[soundId];
    if (!definition.spatial) return;

    pool.forEach((audio) => {
      if (!audio.paused) {
        this.applySpatialAudio(audio, position, definition.falloffDistance || 10);
      }
    });
  }

  private applySpatialAudio(
    audio: HTMLAudioElement,
    position: [number, number, number],
    falloffDistance: number
  ): void {
    if (!this.audioContext) return;

    // Create panner node for 3D audio
    const panner = this.audioContext.createPanner();
    panner.panningModel = "HRTF";
    panner.distanceModel = "inverse";
    panner.refDistance = 1;
    panner.maxDistance = falloffDistance;
    panner.rolloffFactor = 1;
    panner.coneInnerAngle = 360;
    panner.coneOuterAngle = 0;
    panner.coneOuterGain = 0;

    // Set position
    panner.positionX.value = position[0];
    panner.positionY.value = position[1];
    panner.positionZ.value = position[2];

    // Connect audio source to panner
    const source = this.audioContext.createMediaElementSource(audio);
    source.connect(panner);
    panner.connect(this.audioContext.destination);
  }

  private updateAllVolumes(): void {
    // Update volumes of all currently playing sounds
    this.sounds.forEach((audio, soundId) => {
      if (!audio.paused) {
        const definition = SOUND_DEFINITIONS[soundId];
        const categoryVolume = this.categoryVolumes[definition.category];
        audio.volume = definition.volume * categoryVolume * this.masterVolume;
      }
    });
  }
}

// Singleton instance
let audioManagerInstance: AudioManagerImpl | null = null;

export function getAudioManager(): AudioManagerType {
  if (!audioManagerInstance) {
    audioManagerInstance = new AudioManagerImpl();
  }
  return audioManagerInstance;
}

