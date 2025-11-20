"use client";

import { useState, useEffect, useCallback } from "react";

type RobotPersonalityState = {
  explorationCount: number;
  zonesVisited: Set<string>;
  timeSpent: Record<string, number>;
  interactions: number;
  lastInteraction: Date | null;
};

/**
 * UNIQUE FEATURE: Robot Personality & Learning System
 * 
 * The robot "learns" from user behavior and adapts:
 * - Remembers which zones you visit most
 * - Adapts suggestions based on exploration patterns
 * - Develops "personality" traits based on interaction
 * - Provides personalized guidance
 * 
 * This creates a truly unique, adaptive experience that no other portfolio has.
 */
// Initialize state from localStorage
function getInitialPersonality(): RobotPersonalityState {
  if (typeof window === "undefined") {
    return {
      explorationCount: 0,
      zonesVisited: new Set(),
      timeSpent: {},
      interactions: 0,
      lastInteraction: null,
    };
  }

  const saved = localStorage.getItem("robotPersonality");
  if (!saved) {
    return {
      explorationCount: 0,
      zonesVisited: new Set(),
      timeSpent: {},
      interactions: 0,
      lastInteraction: null,
    };
  }

  try {
    const parsed = JSON.parse(saved);
    return {
      ...parsed,
      zonesVisited: new Set(parsed.zonesVisited || []),
      lastInteraction: parsed.lastInteraction ? new Date(parsed.lastInteraction) : null,
    };
  } catch (e) {
    console.error("Failed to load robot personality:", e);
    return {
      explorationCount: 0,
      zonesVisited: new Set(),
      timeSpent: {},
      interactions: 0,
      lastInteraction: null,
    };
  }
}

export function useRobotPersonality() {
  const [personality, setPersonality] = useState<RobotPersonalityState>(getInitialPersonality);

  // Save to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem(
      "robotPersonality",
      JSON.stringify({
        ...personality,
        zonesVisited: Array.from(personality.zonesVisited),
        lastInteraction: personality.lastInteraction?.toISOString() || null,
      })
    );
  }, [personality]);

  const visitZone = useCallback((zoneId: string) => {
    setPersonality((prev) => {
      const newZones = new Set(prev.zonesVisited);
      newZones.add(zoneId);

      return {
        ...prev,
        explorationCount: prev.explorationCount + 1,
        zonesVisited: newZones,
        timeSpent: {
          ...prev.timeSpent,
          [zoneId]: (prev.timeSpent[zoneId] || 0) + 1,
        },
      };
    });
  }, []);

  const recordInteraction = useCallback(() => {
    setPersonality((prev) => ({
      ...prev,
      interactions: prev.interactions + 1,
      lastInteraction: new Date(),
    }));
  }, []);

  const getFavoriteZone = useCallback((): string | null => {
    const entries = Object.entries(personality.timeSpent);
    if (entries.length === 0) return null;

    const favorite = entries.reduce((max, [zone, time]) => {
      return time > max[1] ? [zone, time] : max;
    }, entries[0]);

    return favorite[0];
  }, [personality.timeSpent]);

  const getPersonalityTrait = useCallback((): string => {
    const { explorationCount, interactions, zonesVisited } = personality;

    if (explorationCount === 0) return "curious";
    if (zonesVisited.size >= 4) return "explorer";
    if (interactions > 20) return "social";
    if (explorationCount > 10) return "experienced";
    return "friendly";
  }, [personality]);

  const getSuggestion = useCallback((): string | null => {
    const favorite = getFavoriteZone();
    const visited = personality.zonesVisited.size;
    const total = 5; // Total zones

    if (visited === 0) {
      return "Start by exploring the Medical Tech zone to see life-saving innovations!";
    }
    if (visited < total) {
      const unvisited = ["medical", "vr-ai", "robotics", "web", "about"].filter(
        (z) => !personality.zonesVisited.has(z)
      );
      if (unvisited.length > 0) {
        return `You haven't visited the ${unvisited[0]} zone yet. Want to explore it?`;
      }
    }
    if (favorite) {
      return `You seem interested in ${favorite}. Want to dive deeper?`;
    }
    return null;
  }, [personality, getFavoriteZone]);

  return {
    personality,
    visitZone,
    recordInteraction,
    getFavoriteZone,
    getPersonalityTrait,
    getSuggestion,
  };
}

