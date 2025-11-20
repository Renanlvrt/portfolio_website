import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Github,
  ExternalLink,
  CheckCircle2,
  Bot,
  Code,
  BookOpen,
  Cpu,
} from "lucide-react";
import { type Project } from "@/lib/projects";
import { formatDateRange } from "@/lib/utils";

const categoryIcons = {
  robotics: Bot,
  web: Code,
  research: BookOpen,
  "low-level": Cpu,
};

const categoryLabels = {
  web: "Web Development",
  robotics: "Robotics",
  research: "Research",
  "low-level": "Low-Level Programming",
};

interface ProjectContentProps {
  project: Project;
}

export default function ProjectContent({ project }: ProjectContentProps) {
  const Icon = categoryIcons[project.category];

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
              <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <span className="px-4 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-medium text-slate-600 dark:text-slate-400">
              {categoryLabels[project.category]}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            {project.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formatDateRange(project.startDate, project.endDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{project.duration}</span>
            </div>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>Code</span>
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Cinematic media area */}
        {project.video && (
          <div className="relative mb-12 overflow-hidden rounded-3xl border border-slate-200/40 dark:border-slate-800 shadow-[0_20px_80px_rgba(15,23,42,0.35)]">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={project.image}
              className="absolute inset-0 h-full w-full object-cover blur-[1.5px] brightness-75"
            >
              <source src={project.video} type="video/quicktime" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-slate-900/50" />
            <div className="relative z-10 px-8 py-10 lg:px-12 lg:py-14 space-y-6 text-slate-100">
              <p className="text-lg md:text-xl text-slate-200 max-w-3xl">{project.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-200/80">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDateRange(project.startDate, project.endDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{project.duration}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">{project.fullDescription}</p>
        </div>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {project.highlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl p-6 border border-primary-200 dark:border-primary-800"
              >
                <div className="text-3xl font-bold font-display gradient-text mb-1">{highlight.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{highlight.title}</div>
              </div>
            ))}
          </div>
        )}

        {/* Technologies */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <ul className="space-y-3">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Achievements */}
        {project.achievements && project.achievements.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Achievements</h2>
            <ul className="space-y-3">
              {project.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent-600 dark:text-accent-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Project-Specific Content */}
        {project.id === "robotics" && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Technical Deep Dive</h2>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Sensor Integration</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Integrated servo motor controlled sensors that achieve real-time scanning of a 180-degree field,
                  improving movement precision and environmental awareness. The system uses multiple ultrasonic sensors
                  mounted on a servo motor that rotates to scan the environment.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Testing & Optimization</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Conducted more than 50 tests across various scenarios to optimize performance and reliability.
                  Each test focused on different aspects: obstacle detection accuracy, response time, navigation
                  efficiency, and edge case handling.
                </p>
              </div>
            </div>
          </div>
        )}

        {project.id === "track-field" && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Technical Implementation</h2>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">RESTful API Integration</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Designed robust GET/POST requests and implemented systematic API testing, reducing server-side bugs
                  by 85%. The application handles real-time data retrieval efficiently while maintaining security
                  for user submissions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Responsive Design</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Built with a mobile-first approach, ensuring seamless functionality across mobile and laptop devices.
                  The interface adapts dynamically to different screen sizes while maintaining optimal user experience.
                </p>
              </div>
            </div>
          </div>
        )}

        {project.id === "discrete-math" && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Research Methodology</h2>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Collaborative Approach</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Worked with a team of 5 mathematicians to conduct rigorous analysis on mathematical partitions.
                  Each team member contributed unique perspectives and expertise, leading to comprehensive theorem
                  proofs and formula derivations.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Documentation</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Produced a detailed 10-page report documenting proof strategies and outcomes, illustrating strong
                  research capabilities while adhering to strict project timelines. The report includes mathematical
                  proofs, derivations, and comprehensive analysis.
                </p>
              </div>
            </div>
          </div>
        )}

        {project.id === "lmc-assembly" && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Memory Management</h2>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Efficient Resource Usage</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Showcased efficient memory management by employing only 27 memory mailboxes out of 100, resulting
                  in faster program performance. This optimization demonstrates deep understanding of resource
                  allocation and algorithm efficiency.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Edge Case Handling</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Implemented comprehensive edge case handling, reducing vulnerability to unexpected inputs or errors.
                  The program gracefully handles various input scenarios while maintaining optimal performance.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

