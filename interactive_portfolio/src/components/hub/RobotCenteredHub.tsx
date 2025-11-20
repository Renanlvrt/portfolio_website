"use client";

import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { useRouter } from "next/navigation";
import type { PortalNode } from "@/data/portals";
import { InteractiveRobot } from "@/components/robot/InteractiveRobot";
import { AdaptiveLab } from "@/components/environment/AdaptiveLab";
import { ZoneCard } from "@/components/hub/ZoneCard";

type RobotCenteredHubProps = {
  nodes: PortalNode[];
};

/**
 * ROBOT-CENTERED HUB
 * 
 * The robot is the CENTERPIECE. No planetary system.
 * Robot is large, interactive, and guides navigation.
 * Zone cards are static around the robot.
 */
export function RobotCenteredHub({ nodes }: RobotCenteredHubProps) {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const router = useRouter();

  const handleZoneHover = (zoneId: string | null) => {
    setHoveredZone(zoneId);
  };

  const handleZoneClick = (zoneId: string) => {
    setSelectedZone(zoneId);
    // Navigate to zone
    router.push(`/missions/${zoneId}`);
  };

  return (
    <section className="relative min-h-[600px] w-full rounded-3xl border border-white/10 bg-black/60 overflow-hidden">
      {/* 3D Scene - Robot Center Stage */}
      <div className="absolute inset-0">
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center text-slate-400">
            Initializing robot...
          </div>
        }>
          <Canvas>
            <color attach="background" args={["#05060a"]} />
            <fog attach="fog" args={["#05060a", 10, 35]} />
            
            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#00D9FF" />
            <pointLight position={[-5, 3, -5]} intensity={0.8} color="#00D9FF" />
            <spotLight position={[0, 8, 0]} intensity={2} angle={0.6} penumbra={1} color="#00D9FF" />

            {/* Camera - Elevated angle looking at robot */}
            <PerspectiveCamera makeDefault position={[0, 2, 6]} fov={50} />
            <OrbitControls 
              enablePan={false} 
              enableZoom={true} 
              minDistance={4}
              maxDistance={10}
              autoRotate={false}
            />

            {/* Environment */}
            <AdaptiveLab zone="hub" intensity={1.0} />

            {/* Interactive Robot - CENTER STAGE */}
            <InteractiveRobot
              hoveredZone={hoveredZone}
              selectedZone={selectedZone}
              onZoneHover={handleZoneHover}
            />
          </Canvas>
        </Suspense>
      </div>

      {/* Zone Cards - Static positions around robot */}
      <div className="relative z-10 grid h-full grid-cols-3 grid-rows-3 gap-4 p-8 pointer-events-none">
        {/* Top Zone */}
        {nodes[0] && (
          <div className="col-start-2 row-start-1 pointer-events-auto">
            <ZoneCard
              node={nodes[0]}
              position="top"
              isHovered={hoveredZone === nodes[0].id}
              onClick={() => handleZoneClick(nodes[0].id)}
              onHover={() => handleZoneHover(nodes[0].id)}
              onLeave={() => handleZoneHover(null)}
            />
          </div>
        )}

        {/* Right Zone */}
        {nodes[1] && (
          <div className="col-start-3 row-start-2 pointer-events-auto">
            <ZoneCard
              node={nodes[1]}
              position="right"
              isHovered={hoveredZone === nodes[1].id}
              onClick={() => handleZoneClick(nodes[1].id)}
              onHover={() => handleZoneHover(nodes[1].id)}
              onLeave={() => handleZoneHover(null)}
            />
          </div>
        )}

        {/* Bottom Zone */}
        {nodes[2] && (
          <div className="col-start-2 row-start-3 pointer-events-auto">
            <ZoneCard
              node={nodes[2]}
              position="bottom"
              isHovered={hoveredZone === nodes[2].id}
              onClick={() => handleZoneClick(nodes[2].id)}
              onHover={() => handleZoneHover(nodes[2].id)}
              onLeave={() => handleZoneHover(null)}
            />
          </div>
        )}

        {/* Left Zone */}
        {nodes[3] && (
          <div className="col-start-1 row-start-2 pointer-events-auto">
            <ZoneCard
              node={nodes[3]}
              position="left"
              isHovered={hoveredZone === nodes[3].id}
              onClick={() => handleZoneClick(nodes[3].id)}
              onHover={() => handleZoneHover(nodes[3].id)}
              onLeave={() => handleZoneHover(null)}
            />
          </div>
        )}

        {/* Center - Robot space (empty, robot is in 3D scene) */}
        <div className="col-start-2 row-start-2" />
      </div>

      {/* Status Bar */}
      <div className="absolute inset-x-0 bottom-0 flex justify-between border-t border-white/5 bg-black/40 p-4 text-xs text-slate-300 z-20">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Robot Online
        </div>
        <span>Latency: 4.7ms</span>
      </div>
    </section>
  );
}

