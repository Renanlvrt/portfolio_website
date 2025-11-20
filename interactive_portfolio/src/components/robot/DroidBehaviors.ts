/**
 * Droid Behavior System
 * 
 * Defines autonomous behaviors for the droid.
 * Star Wars droid-style behaviors: scanning, exploring, investigating.
 */

export type DroidBehavior = 
  | "idle"
  | "exploring"
  | "scanning"
  | "investigating"
  | "returning"
  | "patrolling";

export interface BehaviorConfig {
  name: DroidBehavior;
  duration: number; // milliseconds
  priority: number; // 1-10, higher = more important
  canInterrupt: boolean;
  actions: string[];
}

export const BEHAVIORS: Record<DroidBehavior, BehaviorConfig> = {
  idle: {
    name: "idle",
    duration: 3000,
    priority: 1,
    canInterrupt: true,
    actions: ["beep", "look_around", "adjust_position"],
  },
  exploring: {
    name: "exploring",
    duration: 10000,
    priority: 5,
    canInterrupt: true,
    actions: ["move_to_waypoint", "scan_area", "avoid_obstacles"],
  },
  scanning: {
    name: "scanning",
    duration: 4000,
    priority: 7,
    canInterrupt: false,
    actions: ["rotate_scanner", "emit_scan_beam", "analyze_data"],
  },
  investigating: {
    name: "investigating",
    duration: 6000,
    priority: 8,
    canInterrupt: false,
    actions: ["approach_target", "deep_scan", "record_data"],
  },
  returning: {
    name: "returning",
    duration: 8000,
    priority: 6,
    canInterrupt: true,
    actions: ["navigate_home", "follow_path"],
  },
  patrolling: {
    name: "patrolling",
    duration: 15000,
    priority: 4,
    canInterrupt: true,
    actions: ["follow_route", "check_waypoints", "report_status"],
  },
};

/**
 * Decision tree for autonomous behavior selection
 */
export function selectBehavior(
  currentState: DroidBehavior,
  timeSinceLastAction: number,
  hasTarget: boolean,
  nearWaypoint: boolean
): DroidBehavior {
  // If near waypoint and not scanning, scan it
  if (nearWaypoint && currentState !== "scanning") {
    return "scanning";
  }

  // If has target and not investigating, investigate
  if (hasTarget && currentState !== "investigating") {
    return "investigating";
  }

  // If idle too long, start exploring
  if (currentState === "idle" && timeSinceLastAction > 5000) {
    return "exploring";
  }

  // Default: continue current behavior or explore
  return currentState === "idle" ? "exploring" : currentState;
}

