"use client";

import { motion } from "framer-motion";
import type { MissionCard } from "@/data/portals";
import { BadgeCheck, RadioReceiver } from "lucide-react";

type MissionDeckProps = {
  missions: MissionCard[];
};

const statusStyles: Record<MissionCard["status"], string> = {
  active: "text-emerald-300 border-emerald-400/30 bg-emerald-400/5",
  standby: "text-sky-300 border-sky-400/30 bg-sky-400/5",
  prototype: "text-amber-300 border-amber-400/30 bg-amber-400/5",
};

export function MissionDeck({ missions }: MissionDeckProps) {
  return (
    <section className="rounded-3xl border border-white/5 bg-white/5 p-6 sm:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Mission Queue</p>
          <h2 className="text-2xl font-semibold text-white">Live briefs from every quadrant</h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-slate-200">
          <RadioReceiver className="h-4 w-4 text-cyan-300" />
          Real-time uplink stable
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {missions.map((mission, idx) => (
          <motion.article
            key={mission.id}
            className="flex h-full flex-col rounded-3xl border border-white/10 bg-slate-950/60 p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-slate-400">
              <span>{mission.quadrant}</span>
              <span className={`rounded-full border px-3 py-1 ${statusStyles[mission.status]}`}>{mission.status}</span>
            </div>

            <h3 className="mt-4 text-xl font-semibold text-white">{mission.headline}</h3>
            <p className="mt-2 text-sm text-slate-300 flex-1">{mission.description}</p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-200">
              {mission.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <BadgeCheck className="h-4 w-4 text-cyan-300" />
              Autonomous verification complete
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

