/**
 * Waypoint Navigation System
 * 
 * Manages waypoints for autonomous robot navigation.
 * Handles pathfinding, obstacle avoidance, and route planning.
 */

export interface Waypoint {
  id: string;
  x: number;
  z: number;
  y?: number;
  label?: string;
  type?: "content" | "exploration" | "zone";
  metadata?: Record<string, unknown>;
}

export class WaypointSystem {
  private waypoints: Waypoint[] = [];
  private currentIndex = 0;
  private visited: Set<string> = new Set();

  constructor(initialWaypoints?: Waypoint[]) {
    if (initialWaypoints) {
      this.waypoints = initialWaypoints;
    }
  }

  addWaypoint(waypoint: Waypoint): void {
    this.waypoints.push(waypoint);
  }

  getNextWaypoint(): Waypoint | null {
    if (this.waypoints.length === 0) return null;

    // Find next unvisited waypoint
    let attempts = 0;
    while (attempts < this.waypoints.length) {
      const waypoint = this.waypoints[this.currentIndex % this.waypoints.length];
      this.currentIndex++;

      if (!this.visited.has(waypoint.id)) {
        return waypoint;
      }
      attempts++;
    }

    // All visited, reset and start over
    this.visited.clear();
    this.currentIndex = 0;
    return this.waypoints[0];
  }

  markVisited(waypointId: string): void {
    this.visited.add(waypointId);
  }

  getWaypointById(id: string): Waypoint | undefined {
    return this.waypoints.find((w) => w.id === id);
  }

  getAllWaypoints(): Waypoint[] {
    return [...this.waypoints];
  }

  clear(): void {
    this.waypoints = [];
    this.visited.clear();
    this.currentIndex = 0;
  }

  // Calculate distance between two waypoints
  static distance(w1: Waypoint, w2: Waypoint): number {
    const dx = w2.x - w1.x;
    const dz = (w2.z || 0) - (w1.z || 0);
    return Math.sqrt(dx * dx + dz * dz);
  }

  // Find nearest waypoint to a position
  findNearest(x: number, z: number): Waypoint | null {
    if (this.waypoints.length === 0) return null;

    let nearest = this.waypoints[0];
    let minDistance = Infinity;

    for (const waypoint of this.waypoints) {
      const distance = Math.sqrt(
        Math.pow(waypoint.x - x, 2) + Math.pow((waypoint.z || 0) - z, 2)
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearest = waypoint;
      }
    }

    return nearest;
  }
}

