import Image from "next/image";
import Link from "next/link";
import { projects, type Project } from "@/lib/projects";
import { Bot, Code, BookOpen, Cpu, ExternalLink, Calendar, Clock, Camera } from "lucide-react";
import { formatDateRange } from "@/lib/utils";

const categoryOrder: Project["category"][] = ["web", "robotics", "research", "low-level"];

const categoryMeta: Record<
  Project["category"],
  { title: string; description: string }
> = {
  web: {
    title: "Web Experiences",
    description:
      "Full-stack interfaces engineered for reliability, responsive design, and seamless data flow.",
  },
  robotics: {
    title: "Robotics & Automation",
    description:
      "Physical systems that sense, learn, and react to their environments with precision.",
  },
  research: {
    title: "Research & Theory",
    description: "Academic rigor meeting real-world curiosity—mathematical proofs and analytical breakthroughs.",
  },
  "low-level": {
    title: "Low-Level Systems",
    description: "Machine-level thinking focused on memory efficiency, algorithms, and resilience.",
  },
};

const categoryIcons = {
  robotics: Bot,
  web: Code,
  research: BookOpen,
  "low-level": Cpu,
};

const fallbackImage = "/images/photography.jpg";

const projectMedia = (project: Project) => ({
  image: project.image ?? fallbackImage,
  alt: `${project.title} showcase`,
});

const photographyGallery = [
  {
    src: "/images/photography.jpg",
    alt: "Long-exposure night trail",
    note: "Long-exposure studies inspired the glowing gradients you see across this portfolio.",
  },
  {
    src: "/images/photography-2.jpg",
    alt: "Architectural composition",
    note: "Architectural frames taught me to layer hierarchy, depth, and breathing room in UI layouts.",
  },
  {
    src: "/images/photography-3.jpg",
    alt: "On-track reportage",
    note: "Documenting teammates mid-race keeps my storytelling grounded in authentic human momentum.",
  },
];

const heroMedia = {
  video: "/images/robotic-project.mov",
  poster: "/images/profile-portrait.jpg",
  portrait: "/images/profile-portrait.jpg",
  leadership: "/images/track-and-field-2.jpg",
};

const volunteeringHighlight = {
  title: "Artificial Heart R&D Volunteer",
  period: "Oct 2025 – Present",
  summary:
    "Selected as one of 40 student engineers collaborating with clinicians and hardware specialists on Total Artificial Heart concepts ahead of the Vienna Finals hackathon.",
  bullets: [
    "Support CAD modelling, prototyping, and failure-mode analysis for ventricular pumping systems.",
    "Coordinate test protocols and documentation so surgeons can validate safety thresholds.",
    "Champion inclusive communication between biomedical researchers, software analysts, and patient advocates.",
  ],
  image: "/images/track-and-field-2.jpg",
};

export default function ProjectsPage() {
  const grouped = categoryOrder.map((category) => ({
    category,
    projects: projects.filter((project) => project.category === category),
  }));

  return (
    <div className="pt-24 pb-24 min-h-screen bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Hero with immersive video backdrop */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_120px_rgba(15,23,42,0.6)]">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={heroMedia.poster}
            className="absolute inset-0 h-full w-full object-cover brightness-50 blur-sm"
          >
            <source src={heroMedia.video} type="video/quicktime" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-950/80 to-slate-900/50" />
          <div className="relative z-10 grid gap-10 px-8 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-xs tracking-[0.3em] uppercase">
                Renan Lavirotte
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-display leading-tight">
                Creating responsive worlds where software, sensors, and people collaborate.
              </h1>
              <p className="text-base md:text-lg text-slate-200">
                This portfolio is rendered entirely on the server to keep performances deterministic while still
                embracing cinematic design. Immersive visuals and narrated case studies reveal how robotics, web apps,
                and mathematical research intertwine throughout my work.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="block w-2 h-2 rounded-full bg-cyan-400" />
                  Robotics & automation
                </div>
                <div className="flex items-center gap-2">
                  <span className="block w-2 h-2 rounded-full bg-emerald-400" />
                  Full-stack experiences
                </div>
                <div className="flex items-center gap-2">
                  <span className="block w-2 h-2 rounded-full bg-indigo-400" />
                  Rigorous research
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={heroMedia.portrait}
                  alt="Portrait of Renan Lavirotte"
                  width={480}
                  height={640}
                  className="h-full w-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-sm text-slate-100">
                  “Collaborative leadership is my favourite debugging tool—whether coordinating athletes or engineers.”
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={heroMedia.leadership}
                  alt="Track & Field executive moment"
                  width={480}
                  height={320}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]" />
                <div className="relative px-4 py-3 text-sm">
                  Leading Durham’s Track & Field squad (20 athletes) taught me to choreograph data, people, and time.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-3 text-sm text-slate-200">
          {categoryOrder.map((category) => (
            <a
              key={category}
              href={`#${category}`}
              className="px-4 py-2 rounded-full border border-white/10 hover:border-white/40 transition"
            >
              {categoryMeta[category].title}
            </a>
          ))}
        </nav>

        {/* Project clusters */}
        <div className="space-y-20">
          {grouped.map(({ category, projects }) => {
            const Icon = categoryIcons[category];
            const meta = categoryMeta[category];

            return (
              <section key={category} id={category} className="scroll-mt-24 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-white/5">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Chapter</p>
                    <h2 className="text-3xl font-bold font-display">{meta.title}</h2>
                    <p className="text-slate-300 text-sm md:text-base">{meta.description}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {projects.map((project) => {
                    const media = projectMedia(project);

                    return (
                      <article
                        key={project.id}
                        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
                      >
                        <div className="relative h-64 w-full overflow-hidden">
                          {project.video ? (
                            <video
                              autoPlay
                              muted
                              loop
                              playsInline
                              poster={project.image}
                              className="absolute inset-0 h-full w-full object-cover brightness-75 blur-[1px]"
                            >
                              <source src={project.video} type="video/quicktime" />
                            </video>
                          ) : (
                            <Image
                              src={media.image}
                              alt={media.alt}
                              width={720}
                              height={400}
                              className="h-full w-full object-cover"
                            />
                          )}
                          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]" />
                          <div className="relative z-10 flex h-full flex-col justify-between p-5 text-slate-100">
                            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-300">
                              <span>{categoryMeta[project.category].title}</span>
                              <span className="px-3 py-1 rounded-full bg-white/10 text-[0.6rem] tracking-[0.25em]">
                                {project.duration}
                              </span>
                            </div>
                            <div>
                              <h3 className="text-2xl font-semibold">{project.title}</h3>
                              <p className="text-sm text-slate-200/90 line-clamp-2 mt-1">{project.description}</p>
                            </div>
                            <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-slate-300">
                              <span>{formatDateRange(project.startDate, project.endDate)}</span>
                              <span>{project.technologies[0]}</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 space-y-4">
                          <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                            {project.technologies.map((tech) => (
                              <span key={tech} className="px-3 py-1 rounded-full border border-white/10">
                                {tech}
                              </span>
                            ))}
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-center text-xs text-slate-400">
                            {project.highlights.map((item) => (
                              <div key={item.title} className="rounded-2xl border border-white/5 px-2 py-2">
                                <div className="text-base font-semibold text-slate-100">{item.value}</div>
                                <div className="text-[0.65rem] uppercase tracking-wide">{item.title}</div>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center justify-between text-sm font-medium text-cyan-200">
                            <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-2">
                              Deep Dive
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                            <span className="text-slate-400">{project.achievements.length}+ highlights</span>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Volunteering */}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-rose-500/10 via-slate-950 to-rose-900/10 p-8 space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-rose-200">Volunteering Impact</p>
              <h2 className="text-3xl font-display font-semibold text-white">{volunteeringHighlight.title}</h2>
              <p className="text-sm text-rose-100">{volunteeringHighlight.period}</p>
              <p className="text-slate-100">{volunteeringHighlight.summary}</p>
              <ul className="space-y-2 text-sm text-rose-100">
                {volunteeringHighlight.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-300" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={volunteeringHighlight.image}
                alt="Artificial heart R&D team"
                width={720}
                height={480}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-sm text-slate-100">
                Engineering empathy into lifesaving hardware is my north star for every line of code.
              </div>
            </div>
          </div>
        </section>

        {/* Photography & hobbies */}
        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-6">
          <div className="flex items-center gap-4">
            <Camera className="w-8 h-8 text-white" />
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Passion Capsule</p>
              <h2 className="text-3xl font-display font-semibold text-white">Photography & Storytelling</h2>
            </div>
          </div>
          <p className="text-slate-200 max-w-4xl">
            Beyond code, I document motion, architecture, and community. The discipline of composing intentional frames
            directly influences how I structure layouts, gradients, and atmospheric lighting in my interfaces.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {photographyGallery.map((photo) => (
              <figure
                key={photo.src}
                className="relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900"
              >
                <Image src={photo.src} alt={photo.alt} width={480} height={320} className="h-60 w-full object-cover" />
                <figcaption className="p-4 text-sm text-slate-200">{photo.note}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

