"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useCursor } from "@react-three/drei";
import Link from "next/link";
import type { PortalNode } from "@/data/portals";
import { ArrowUpRight, MapPinned } from "lucide-react";
import { ProceduralRobot } from "@/components/robot/ProceduralRobot";
import { AdaptiveLab } from "@/components/environment/AdaptiveLab";
import * as THREE from "three";

type AutonomyHubProps = {
  nodes: PortalNode[];
};

export function AutonomyHub({ nodes }: AutonomyHubProps) {
  const [activeNode, setActiveNode] = useState(nodes[0]);

  return (
    <section className="grid gap-8 rounded-3xl border border-white/10 bg-black/60 p-6 sm:p-10 lg:grid-cols-[420px_minmax(0,1fr)]">
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.65rem] uppercase tracking-[0.4em] text-cyan-200">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse" />
          Mission Hub
        </div>
        <h2 className="text-3xl font-semibold text-white">Autonomous Navigation Core</h2>
        <p className="text-sm text-slate-300">
          Select a portal to let the AI scout dive into that mission quadrant. The hub renders a live path-planning preview,
          field telemetry, and priority metrics before you even click into the case study.
        </p>

        <div className="space-y-4">
          {nodes.map((node) => (
            <Link
              key={node.id}
              href={`/missions/${node.id}`}
              onClick={() => setActiveNode(node)}
              className={`block w-full rounded-2xl border px-4 py-4 text-left transition ${
                activeNode.id === node.id
                  ? "border-cyan-300/50 bg-cyan-300/5"
                  : "border-white/5 bg-white/2 hover:border-white/20"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{node.label}</p>
              <div className="mt-1 flex items-center justify-between gap-2">
                <p className="text-lg font-semibold text-white">{node.title}</p>
                <ArrowUpRight className="h-4 w-4 text-cyan-200" />
              </div>
              <p className="mt-2 text-sm text-slate-300">{node.summary}</p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-cyan-200">
                {node.metrics.map((metric) => (
                  <span key={metric.label} className="rounded-full border border-cyan-300/30 px-3 py-1">
                    {metric.value} · {metric.label}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Active Selection</p>
          <p className="mt-2 text-lg font-semibold text-white">{activeNode.title}</p>
          <p className="text-slate-300">{activeNode.summary}</p>
        </div>
      </div>

      <div className="relative min-h-[520px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-x-0 top-4 flex justify-center text-xs uppercase tracking-[0.4em] text-slate-500">
          Autonomous Sensor Array
        </div>
        <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-slate-400">Calibrating sensors...</div>}>
          <Canvas className="h-full w-full">
            <color attach="background" args={["#05060a"]} />
            <fog attach="fog" args={["#05060a", 10, 35]} />
            <ambientLight intensity={0.2} />
            <pointLight position={[0, 4, 4]} intensity={1} color="#8be9fd" />
            <pointLight position={[-6, -3, -4]} intensity={0.8} color="#f472b6" />

            <PerspectiveCamera makeDefault position={[0, 0, 12]} />
            <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.6} />

            <AdaptiveLab zone={activeNode.id} intensity={1.0} />
            <ProceduralRobot zone={activeNode.id} isActive={true} />
            <HubScene nodes={nodes} activeId={activeNode.id} />
          </Canvas>
        </Suspense>

        <div className="absolute inset-x-0 bottom-0 flex justify-between border-t border-white/5 bg-black/40 p-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <MapPinned className="h-4 w-4 text-cyan-300" />
            Path preview locked on {activeNode.label}
          </div>
          <span>Latency: 4.7ms</span>
        </div>
      </div>
    </section>
  );
}

type HubSceneProps = {
  nodes: PortalNode[];
  activeId: string;
};

function HubScene({ nodes, activeId }: HubSceneProps) {
  return (
    <group>
      <HeartCore />
      {nodes.map((node, index) => (
        <PortalNodeMesh key={node.id} node={node} index={index} active={activeId === node.id} />
      ))}
      <OrbitalParticles />
    </group>
  );
}

function HeartCore() {
  const coreRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group ref={coreRef}>
      <mesh scale={2.2}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#0ea5e9"
          emissiveIntensity={1.2}
          roughness={0.15}
          metalness={0.8}
        />
      </mesh>
      <mesh scale={2.6}>
        <torusGeometry args={[1.5, 0.08, 32, 200]} />
        <meshStandardMaterial color="#67e8f9" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

type PortalProps = {
  node: PortalNode;
  index: number;
  active: boolean;
};

function PortalNodeMesh({ node, index, active }: PortalProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const basePosition = node.position;
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() + index;
    const radius = 3.5;
    const x = Math.cos(t * 0.3) * radius + basePosition[0] * 0.4;
    const y = Math.sin(t * 0.4) * 1.2 + basePosition[1] * 0.2;
    const z = Math.sin(t * 0.25) * radius * 0.3 + basePosition[2] * 0.5;
    meshRef.current.position.set(x, y, z);
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.35, 32, 32]} />
      <meshStandardMaterial
        color={node.color}
        emissive={node.color}
        emissiveIntensity={active ? 1.5 : hovered ? 1 : 0.5}
        roughness={0.25}
        metalness={0.7}
      />
    </mesh>
  );
}

function OrbitalParticles() {
  const points = useMemo(() => {
    const vertices: number[] = [];
    const pseudoRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < 1200; i++) {
      const radius = 6 + pseudoRandom(i + 1) * 4;
      const theta = pseudoRandom(i + 11) * Math.PI * 2;
      const phi = pseudoRandom(i + 23) * Math.PI;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      vertices.push(x, y, z);
    }
    return new Float32Array(vertices);
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={points.length / 3} array={points} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#94a3b8" size={0.05} sizeAttenuation transparent opacity={0.35} />
    </points>
  );
}

