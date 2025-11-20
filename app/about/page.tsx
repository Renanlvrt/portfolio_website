"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, User, Trophy, Code, Palette, Languages, MapPin } from "lucide-react";

const education = [
  {
    institution: "University of Durham",
    degree: "MEng Computer Science",
    period: "2024 - 2028",
    location: "Durham, UK",
    achievements: ["First-class honours (79% average) in Level 1"],
    modules: ["AI", "Software Engineering", "Programming Paradigms", "Theory of Computation"],
  },
  {
    institution: "Louis de Broglie",
    degree: "High School",
    period: "2021 - 2024",
    location: "France",
    achievements: ["Highest honours (Mention Très Bien)"],
    subjects: ["Maths", "Physics", "Chemistry", "Further Maths"],
  },
];

const positions = [
  {
    title: "Track & Field Team Captain",
    organization: "University of Durham",
    period: "Sept 2025 - Present",
    achievements: [
      "Led a team of 20 high-level athletes",
      "Competed across England against other universities (BUCS)",
      "Increased the number of athletes by 20% compared to last year",
    ],
    icon: Trophy,
  },
  {
    title: "Durjam Executive Committee Member",
    organization: "Game Development Society",
    period: "March 2025 - Present",
    achievements: [
      "Organized large-scale community events",
      "Coordinated yearly hackathon with over 200 participants",
      "Enhanced team collaboration and student involvement",
    ],
    icon: User,
  },
];

const programmingSkills = [
  { name: "JavaScript", level: 90, description: "Including REST API development" },
  { name: "Python", level: 85, description: "Robotics and research applications" },
  { name: "Assembly", level: 75, description: "Little Man Computer" },
  { name: "TypeScript", level: 80, description: "Type-safe development" },
  { name: "React", level: 85, description: "Frontend development" },
  { name: "Node.js", level: 80, description: "Backend development" },
];

const creativeSkills = [
  { name: "Adobe Photoshop", level: 80 },
  { name: "After Effects", level: 75 },
  { name: "Blender", level: 70 },
  { name: "3D Modeling", level: 75 },
];

const languages = [
  { name: "English", level: "Fluent" },
  { name: "French", level: "Fluent" },
  { name: "Japanese", level: "Business Level" },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
            About Me
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Collaborative and effective leader, demonstrated by captaincy of a 20-athlete Track & Field team
            and successful coordination of multi-member projects, including discrete math research and software development.
          </p>
        </motion.div>

        {/* Personal Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl p-8 mb-12 border border-primary-200 dark:border-primary-800"
        >
          <div className="flex items-center gap-4 mb-4">
            <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <span className="text-slate-700 dark:text-slate-300 font-medium">Based in Durham, UK</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Currently pursuing an MEng in Computer Science at the University of Durham, I combine technical
            expertise with leadership skills. My passion lies in building innovative solutions through code,
            whether it's autonomous robotics, full-stack web applications, or low-level programming challenges.
          </p>
        </motion.div>

        {/* Education */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold font-display mb-6 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            Education
          </h2>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{edu.institution}</h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium">{edu.degree}</p>
                  </div>
                  <div className="text-right mt-2 md:mt-0">
                    <p className="text-slate-600 dark:text-slate-400">{edu.period}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500">{edu.location}</p>
                  </div>
                </div>
                {edu.achievements && (
                  <div className="mb-3">
                    {edu.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <Award className="w-4 h-4 text-accent-600 dark:text-accent-400" />
                        <span className="text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                    {edu.modules ? "Key Modules:" : "Subjects:"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(edu.modules || edu.subjects || []).map((item, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-sm text-slate-700 dark:text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Positions of Responsibility */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold font-display mb-6 flex items-center gap-3">
            <User className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            Leadership & Experience
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {positions.map((position, index) => {
              const Icon = position.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                      <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold mb-1">{position.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{position.organization}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">{position.period}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {position.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold font-display mb-6 flex items-center gap-3">
            <Code className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            Skills
          </h2>

          {/* Programming Skills */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Programming Languages</h3>
            <div className="space-y-4">
              {programmingSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="font-medium text-slate-900 dark:text-slate-100">{skill.name}</span>
                      {skill.description && (
                        <span className="text-sm text-slate-500 dark:text-slate-500 ml-2">
                          ({skill.description})
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="bg-gradient-to-r from-primary-600 to-primary-400 h-2.5 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Creative Design Skills */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              Creative Design
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {creativeSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-slate-900 dark:text-slate-100">{skill.name}</span>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="bg-gradient-to-r from-accent-600 to-accent-400 h-2 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-4">
              Designed the high school logo, proving proficiency in graphics and knowledge of Adobe Photoshop,
              After Effects, and Blender animation, building several 3D modeling projects.
            </p>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Languages className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              Languages
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {languages.map((lang, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700 text-center"
                >
                  <div className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{lang.name}</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{lang.level}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

