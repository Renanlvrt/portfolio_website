/**
 * useAudio Hook
 * 
 * React hook for accessing the audio manager.
 * Provides clean, type-safe access to audio functionality.
 */

import { useEffect, useState, useCallback } from "react";
import { getAudioManager } from "@/lib/audio/AudioManager";
import type { SoundId, SoundCategory, SoundConfig } from "@/lib/audio/types";

export function useAudio() {
  const [manager] = useState(() => getAudioManager());
  const [masterVolume, setMasterVolumeState] = useState(manager.masterVolume);
  const [muted, setMutedState] = useState(manager.muted);
  const [categoryVolumes, setCategoryVolumesState] = useState(manager.categoryVolumes);

  // Sync state with manager
  useEffect(() => {
    // This could be enhanced with event listeners for real-time updates
    // For now, we'll use direct state updates
  }, []);

  const play = useCallback(
    async (soundId: SoundId, options?: Partial<SoundConfig>) => {
      await manager.play(soundId, options);
    },
    [manager]
  );

  const stop = useCallback(
    (soundId: SoundId) => {
      manager.stop(soundId);
    },
    [manager]
  );

  const pause = useCallback(
    (soundId: SoundId) => {
      manager.pause(soundId);
    },
    [manager]
  );

  const setMasterVolume = useCallback(
    (volume: number) => {
      manager.setMasterVolume(volume);
      setMasterVolumeState(volume);
    },
    [manager]
  );

  const setCategoryVolume = useCallback(
    (category: SoundCategory, volume: number) => {
      manager.setCategoryVolume(category, volume);
      setCategoryVolumesState((prev) => ({ ...prev, [category]: volume }));
    },
    [manager]
  );

  const toggleMute = useCallback(() => {
    manager.toggleMute();
    setMutedState(manager.muted);
  }, [manager]);

  const updateSpatialPosition = useCallback(
    (soundId: SoundId, position: [number, number, number]) => {
      manager.updateSpatialPosition(soundId, position);
    },
    [manager]
  );

  return {
    play,
    stop,
    pause,
    masterVolume,
    setMasterVolume,
    categoryVolumes,
    setCategoryVolume,
    muted,
    toggleMute,
    updateSpatialPosition,
  };
}

