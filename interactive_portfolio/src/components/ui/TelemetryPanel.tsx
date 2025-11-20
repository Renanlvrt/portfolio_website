"use client";

import { motion } from "framer-motion";
import { Activity, Zap, Users, Target } from "lucide-react";

type TelemetryMetric = {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
};

const metrics: TelemetryMetric[] = [
  {
    label: "Active Missions",
    value: "5",
    icon: <Target className="h-4 w-4" />,
    color: "text-cyan-300",
  },
  {
    label: "System Status",
    value: "OPTIMAL",
    icon: <Activity className="h-4 w-4" />,
    color: "text-emerald-300",
  },
  {
    label: "Team Members",
    value: "40+",
    icon: <Users className="h-4 w-4" />,
    color: "text-purple-300",
  },
  {
    label: "Performance",
    value: "94%",
    icon: <Zap className="h-4 w-4" />,
    color: "text-amber-300",
  },
];

export function TelemetryPanel() {
  return (
    <motion.div
      className="rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="mb-3 flex items-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse" />
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Live Telemetry</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric, idx) => (
          <motion.div
            key={metric.label}
            className="rounded-lg border border-white/5 bg-white/5 p-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + idx * 0.1 }}
          >
            <div className={`mb-1 ${metric.color}`}>{metric.icon}</div>
            <p className="text-lg font-semibold text-white">{metric.value}</p>
            <p className="text-xs text-slate-400">{metric.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

