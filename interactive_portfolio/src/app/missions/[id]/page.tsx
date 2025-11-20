"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, Calendar, Clock, CheckCircle2, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { portalNodes } from "@/data/portals";
import { projectDetails } from "@/data/projects";

type MissionPageProps = {
  params: Promise<{ id: string }>;
};

export default function MissionPage({ params }: MissionPageProps) {
  const { id } = use(params);
  const node = portalNodes.find((n) => n.id === id);
  const project = projectDetails[id];

  if (!node) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Mission Not Found</h1>
          <Link href="/" className="mt-4 text-cyan-300 hover:underline">
            Return to Hub
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Hub
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.3em] text-cyan-200">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse" />
              {node.label}
            </div>
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">{node.title}</h1>
            <p className="mb-6 text-lg text-slate-300">{node.summary}</p>

            {/* Date and Duration */}
            {project && (
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(project.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    -{" "}
                    {new Date(project.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{project.duration}</span>
                </div>
              </div>
            )}
          </div>

          {/* Metrics Grid */}
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            {node.metrics.map((metric, idx) => (
              <motion.div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
              >
                <p className="mb-2 text-xs uppercase tracking-[0.3em] text-slate-400">{metric.label}</p>
                <p className="text-3xl font-bold text-white">{metric.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Project Images Gallery */}
          {project && project.images.length > 0 && (
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="mb-6 text-2xl font-semibold text-white">Mission Gallery</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {project.images.map((image, idx) => (
                  <motion.div
                    key={image}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={image}
                        alt={`${project.title} - Image ${idx + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Full Description */}
          {project && (
            <motion.section
              className="mb-12 rounded-3xl border border-white/10 bg-black/40 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="mb-4 text-2xl font-semibold text-white">Mission Briefing</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-slate-300">{project.fullDescription}</p>
              </div>
            </motion.section>
          )}

          {/* Highlights */}
          {project && project.highlights.length > 0 && (
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="mb-6 text-2xl font-semibold text-white">Key Highlights</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {project.highlights.map((highlight) => (
                  <div
                    key={highlight.title}
                    className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 p-6"
                  >
                    <div className="mb-2 text-3xl font-bold text-cyan-300">{highlight.value}</div>
                    <div className="text-sm text-slate-400">{highlight.title}</div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Technologies */}
          {project && project.technologies.length > 0 && (
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h2 className="mb-4 text-2xl font-semibold text-white">Technologies Used</h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.section>
          )}

          {/* Features */}
          {project && project.features.length > 0 && (
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <h2 className="mb-4 text-2xl font-semibold text-white">Key Features</h2>
              <ul className="space-y-3">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-300" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {/* Achievements */}
          {project && project.achievements.length > 0 && (
            <motion.section
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <h2 className="mb-4 text-2xl font-semibold text-white">Achievements</h2>
              <ul className="space-y-3">
                {project.achievements.map((achievement) => (
                  <li key={achievement} className="flex items-start gap-3">
                    <Zap className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-300" />
                    <span className="text-slate-300">{achievement}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {/* Action Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            {project?.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-white hover:bg-white/10 transition-colors"
              >
                <Github className="h-4 w-4" />
                Source Code
              </a>
            )}
            {project?.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/50 bg-cyan-300/10 px-6 py-3 text-cyan-300 hover:bg-cyan-300/20 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
