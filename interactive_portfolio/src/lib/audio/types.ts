/**
 * Audio System Types
 * 
 * Clean, extensible type definitions for the audio system.
 * This architecture allows for easy addition of new sound types,
 * audio sources, and spatial positioning features.
 */

export type SoundCategory = 
  | "ambient"
  | "ui"
  | "robot"
  | "transition"
  | "music"
  | "effect";

export type SoundId = 
  // Ambient
  | "mechanical-hum"
  | "lab-ambience"
  // UI
  | "click"
  | "hover"
  | "select"
  | "error"
  // Robot
  | "robot-move"
  | "robot-scan"
  | "robot-boot"
  | "servo-motor"
  // Transition
  | "zone-enter"
  | "zone-exit"
  | "portal-whoosh"
  // Music
  | "background-theme"
  // Effects
  | "achievement"
  | "notification";

export interface SoundConfig {
  id: SoundId;
  category: SoundCategory;
  volume: number; // 0-1
  loop?: boolean;
  spatial?: boolean; // 3D spatial audio
  position?: [number, number, number]; // For spatial audio
  falloffDistance?: number; // For spatial audio
}

export interface AudioManagerState {
  masterVolume: number;
  categoryVolumes: Record<SoundCategory, number>;
  muted: boolean;
  sounds: Map<SoundId, HTMLAudioElement>;
  spatialAudioEnabled: boolean;
}

export interface AudioManagerActions {
  play: (soundId: SoundId, options?: Partial<SoundConfig>) => Promise<void>;
  stop: (soundId: SoundId) => void;
  pause: (soundId: SoundId) => void;
  setMasterVolume: (volume: number) => void;
  setCategoryVolume: (category: SoundCategory, volume: number) => void;
  toggleMute: () => void;
  updateSpatialPosition: (soundId: SoundId, position: [number, number, number]) => void;
}

export type AudioManager = AudioManagerState & AudioManagerActions;

