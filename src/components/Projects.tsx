"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */
const filters = ["All", "Web Dev", "AI/ML"] as const;
type Filter = (typeof filters)[number];

const projects = [
  {
    title: "Voice Control Assistant",
    description:
      "An intelligent desktop voice assistant that performs system tasks, automates web browsing, and processes spoken voice commands using natural language parsing.",
    techStack: ["Python", "Speech Recognition", "NLP", "API Integration"],
    category: "AI/ML",
    github: "https://github.com/PILOT-SHARMA/Voice-control-assistant",
    demo: "https://github.com/PILOT-SHARMA/Voice-control-assistant",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    title: "PyClimaExplorer",
    description:
      "A climate data exploration application providing interactive graphical representations, historic weather analysis, and real-time geographical climate information.",
    techStack: ["Python", "Tkinter", "Weather API", "Data Analysis"],
    category: "AI/ML",
    github: "https://github.com/PILOT-SHARMA/pyclimaexplorer",
    demo: "https://github.com/PILOT-SHARMA/pyclimaexplorer",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    title: "Netflix Clone",
    description:
      "A high-fidelity fully responsive front-end clone of Netflix featuring dynamic layouts, horizontal scrollable carousels, and modern hover effects.",
    techStack: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    category: "Web Dev",
    github: "https://github.com/PILOT-SHARMA/Netflix",
    demo: "https://github.com/PILOT-SHARMA/Netflix",
    gradient: "from-red-600 to-rose-600",
  },
];

/* ------------------------------------------------------------------ */
/*  Variants                                                          */
/* ------------------------------------------------------------------ */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.3 },
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
export default function Projects() {
  const [active, setActive] = useState<Filter>("All");

  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section
      id="projects"
      className="relative py-24 px-6 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 -left-40 h-96 w-96 rounded-full bg-fuchsia-600/8 blur-[160px]" />
        <div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-cyan-600/8 blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Featured Projects
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-500" />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="mb-12 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="relative rounded-full px-5 py-2 text-sm font-medium text-neutral-300 transition-colors duration-300 hover:text-white"
            >
              {active === f && (
                <motion.span
                  layoutId="projectFilterPill"
                  className="absolute inset-0 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{f}</span>
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                variants={cardVariants}
                whileHover={{ scale: 1.03, y: -6 }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_0_50px_-12px_rgba(139,92,246,0.35)]"
              >
                {/* Gradient top bar */}
                <div
                  className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`}
                />

                {/* Card body */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-neutral-400">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-xs font-medium text-neutral-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-neutral-300 transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:text-white"
                    >
                      <FiGithub size={15} />
                      GitHub
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r ${project.gradient} px-4 py-2 text-sm font-medium text-white shadow-lg transition-transform duration-300 hover:brightness-110`}
                    >
                      <FiExternalLink size={15} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
