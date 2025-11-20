"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, HeartPulse, Shield, Zap } from "lucide-react";
import { HolographicCard } from "@/components/ui/HolographicCard";

const telemetryPills = [
  { label: "MEng CS · Durham", icon: Shield },
  { label: "Autonomous Robotics", icon: Cpu },
  { label: "Artificial Heart R&D", icon: HeartPulse },
  { label: "VR · AI Orchestration", icon: Zap },
];

const statBlocks = [
  { label: "Lives Impacted", value: "64M+", detail: "Heart replacement research" },
  { label: "Robotic Trials", value: "50+", detail: "Servo + LIDAR iterations" },
  { label: "Team Leadership", value: "40+", detail: "Engineers + athletes" },
];

export function RoboticHero() {
  return (
    <section className="relative isolate overflow-hidden border border-white/10 bg-slate-950/90 p-8 sm:p-12 lg:p-16 rounded-3xl shadow-[0_30px_120px_rgba(15,23,42,0.6)]">
      <div className="absolute inset-px bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_45%)] opacity-60 pointer-events-none" />

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 px-4 py-1 text-xs uppercase tracking-[0.35em] text-cyan-200/70">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Autonomy Uplink
          </div>
          <motion.h1
            className="text-4xl leading-tight font-semibold text-white md:text-5xl lg:text-6xl font-display"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Renan Lavirotte <br className="hidden sm:block" />
            <span className="text-cyan-300">Autonomous Systems Architect</span>
          </motion.h1>
          <p className="text-base md:text-lg text-slate-300">
            I design AI-first robots, VR learning engines, and artificial hearts that navigate the real world with the
            precision of mission-grade hardware. This console streams every project as if you were inside an autonomous
            scout—complete with telemetry, mission status, and live diagnostics.
          </p>

          <div className="flex flex-wrap gap-3">
            {telemetryPills.map((pill) => {
              const Icon = pill.icon;
              return (
                <span
                  key={pill.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                >
                  <Icon className="h-4 w-4 text-cyan-300" />
                  {pill.label}
                </span>
              );
            })}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {statBlocks.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/70 to-slate-900/30 p-4"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{stat.label}</p>
                <p className="mt-2 text-3xl font-semibold text-white">{stat.value}</p>
                <p className="text-xs text-slate-400">{stat.detail}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="group inline-flex items-center gap-2 rounded-full bg-cyan-500/20 px-6 py-3 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/30">
              Launch Autonomous Tour
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
            <button className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white">
              Download Tactical Brief
            </button>
          </div>
        </div>

        <HolographicCard glowColor="#00D9FF" className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-400">AI Navigator</p>
                <p className="text-lg font-semibold text-white">Asterion Scout v3.5</p>
              </div>
              <span className="rounded-full border border-emerald-400/40 px-3 py-1 text-xs text-emerald-300">
                ONLINE
              </span>
            </div>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-center justify-between">
                <span>Battery</span>
                <span className="font-semibold text-white">92%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" style={{ width: "92%" }} />
              </div>
              <div className="flex items-center justify-between">
                <span>Autonomy</span>
                <span className="font-semibold text-white">Level 5</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Sensors: LIDAR · IMU · Bio-telemetry</span>
                <span>Latency: 4.7ms</span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Mission Directive</p>
              <p className="mt-2 text-sm text-slate-200">
                “Guide every visitor through Renan’s key missions with autonomous clarity. Prioritize artificial heart R&D,
                robotics, and AI-driven education. Maintain cinematic composure.”
              </p>
            </div>
          </div>
        </HolographicCard>
      </div>
    </section>
  );
}

