"use client";

import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { AutonomousDroidWithTrail } from "@/components/robot/AutonomousDroidWithTrail";
import { AdaptiveLab } from "@/components/environment/AdaptiveLab";
import type { PortalNode } from "@/data/portals";

type AutonomousPageLayoutProps = {
  nodes: PortalNode[];
  children?: React.ReactNode;
};

/**
 * AUTONOMOUS PAGE LAYOUT
 * 
 * Full-page layout where the droid can roam freely.
 * Content areas are positioned as waypoints for the droid to visit.
 */
export function AutonomousPageLayout({ nodes, children }: AutonomousPageLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Convert portal nodes to waypoints
  const waypoints = nodes.map((node) => ({
    x: node.position[0] * 2,
    z: node.position[2] * 2,
    id: node.id,
  }));

  // Extensive exploration waypoints - droid roams entire page
  const explorationWaypoints = [
    // Corners
    { x: -15, z: -15, id: "corner-tl" },
    { x: 15, z: -15, id: "corner-tr" },
    { x: 15, z: 15, id: "corner-br" },
    { x: -15, z: 15, id: "corner-bl" },
    
    // Edges
    { x: -12, z: -12, id: "edge-tl" },
    { x: 12, z: -12, id: "edge-tr" },
    { x: 12, z: 12, id: "edge-br" },
    { x: -12, z: 12, id: "edge-bl" },
    
    // Center area
    { x: 0, z: 0, id: "center" },
    { x: -8, z: -8, id: "center-tl" },
    { x: 8, z: -8, id: "center-tr" },
    { x: 8, z: 8, id: "center-br" },
    { x: -8, z: 8, id: "center-bl" },
    
    // Mid-points
    { x: -10, z: 0, id: "mid-left" },
    { x: 10, z: 0, id: "mid-right" },
    { x: 0, z: -10, id: "mid-top" },
    { x: 0, z: 10, id: "mid-bottom" },
    
    // Random exploration
    { x: -5, z: -12, id: "explore-1" },
    { x: 5, z: 12, id: "explore-2" },
    { x: -12, z: 5, id: "explore-3" },
    { x: 12, z: -5, id: "explore-4" },
  ];

  const allWaypoints = [...waypoints, ...explorationWaypoints];

  return (
    <div ref={containerRef} className="relative w-full">
      {/* 3D Scene - Fixed background, droid roams here */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center text-slate-400">
            Initializing autonomous droid...
          </div>
        }>
          <Canvas>
            <color attach="background" args={["#05060a"]} />
            <fog attach="fog" args={["#05060a", 15, 50]} />
            
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00D9FF" />
            <pointLight position={[-10, 5, -10]} intensity={0.8} color="#A855F7" />
            <directionalLight position={[0, 10, 0]} intensity={0.5} />

            {/* Camera - Isometric view for better droid visibility */}
            <PerspectiveCamera makeDefault position={[0, 8, 12]} fov={60} />
            <OrbitControls 
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              minDistance={8}
              maxDistance={25}
              target={[0, 0, 0]}
              autoRotate={false}
            />

            {/* Environment */}
            <AdaptiveLab zone="hub" intensity={1.0} />

            {/* Autonomous Droid - Roaming the page with trail */}
            <AutonomousDroidWithTrail waypoints={allWaypoints} speed={0.03} />
          </Canvas>
        </Suspense>
      </div>

      {/* Content Overlay - Positioned above 3D scene */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  );
}

