"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { AutonomousDroidWithTrail } from "@/components/robot/AutonomousDroidWithTrail";
import { AdaptiveLab } from "@/components/environment/AdaptiveLab";
import type { PortalNode } from "@/data/portals";

type ScrollableContentLayoutProps = {
  nodes: PortalNode[];
  children: React.ReactNode;
};

/**
 * Scrollable Content Layout with Autonomous Droid
 * 
 * Creative layout where:
 * - 3D droid roams in fixed background
 * - Content scrolls normally
 * - Droid visible at all times
 * - No content clashing
 */
export function ScrollableContentLayout({ nodes, children }: ScrollableContentLayoutProps) {
  // Convert portal nodes to waypoints
  const waypoints = nodes.map((node) => ({
    x: node.position[0] * 3,
    z: node.position[2] * 3,
    id: node.id,
  }));

  // Extensive exploration waypoints
  const explorationWaypoints = [
    { x: -12, z: -12, id: "explore-1" },
    { x: 12, z: -12, id: "explore-2" },
    { x: 12, z: 12, id: "explore-3" },
    { x: -12, z: 12, id: "explore-4" },
    { x: 0, z: 0, id: "center" },
    { x: -8, z: 0, id: "left" },
    { x: 8, z: 0, id: "right" },
    { x: 0, z: -8, id: "top" },
    { x: 0, z: 8, id: "bottom" },
  ];

  const allWaypoints = [...waypoints, ...explorationWaypoints];

  return (
    <div className="relative w-full">
      {/* Fixed 3D Background - Droid's Playground */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Suspense fallback={null}>
          <Canvas>
            <color attach="background" args={["#05060a"]} />
            <fog attach="fog" args={["#05060a", 10, 40]} />
            
            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.2} color="#00D9FF" />
            <pointLight position={[-10, 5, -10]} intensity={0.9} color="#A855F7" />
            <directionalLight position={[0, 10, 5]} intensity={0.6} />

            {/* Camera - Isometric view to see droid clearly */}
            <PerspectiveCamera makeDefault position={[0, 4, 6]} fov={75} />
            <OrbitControls 
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              minDistance={5}
              maxDistance={15}
              target={[0, 0, 0]}
            />

            {/* Environment */}
            <AdaptiveLab zone="hub" intensity={1.0} />

            {/* Autonomous Droid - Always visible */}
            <AutonomousDroidWithTrail waypoints={allWaypoints} speed={0.025} />
          </Canvas>
        </Suspense>
      </div>

      {/* Scrollable Content - Above 3D scene */}
      <div className="relative z-10 bg-transparent min-h-screen">
        {children}
      </div>
    </div>
  );
}

