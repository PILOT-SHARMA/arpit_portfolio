"use client";

import { useRef, useState, useCallback, type MouseEvent } from "react";
import { motion } from "framer-motion";
import {
  FaJava,
  FaPython,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaGitAlt,
  FaGithub,
  FaProjectDiagram,
  FaBrain,
  FaCode,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiDjango,
  SiMysql,
  SiMongodb,
  SiTensorflow,
  SiPytorch,
  SiNumpy,
} from "react-icons/si";
import type { IconType } from "react-icons";

/* ------------------------------------------------------------------ */
/*  Icon map                                                          */
/* ------------------------------------------------------------------ */
const iconMap: Record<string, IconType> = {
  FaJava,
  FaPython,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaGitAlt,
  FaGithub,
  FaProjectDiagram,
  FaBrain,
  FaCode,
  SiCplusplus,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiDjango,
  SiMysql,
  SiMongodb,
  SiTensorflow,
  SiPytorch,
  SiNumpy,
};

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */
const skillCategories = [
  {
    title: "Languages",
    color: "from-violet-500 to-fuchsia-500",
    glowColor: "rgba(139,92,246,0.45)",
    skills: [
      { name: "Java", icon: "FaJava" },
      { name: "Python", icon: "FaPython" },
      { name: "C++", icon: "SiCplusplus" },
      { name: "JavaScript", icon: "SiJavascript" },
      { name: "TypeScript", icon: "SiTypescript" },
    ],
  },
  {
    title: "Frameworks",
    color: "from-cyan-500 to-blue-500",
    glowColor: "rgba(6,182,212,0.45)",
    skills: [
      { name: "React", icon: "FaReact" },
      { name: "Next.js", icon: "SiNextdotjs" },
      { name: "Node.js", icon: "FaNodeJs" },
      { name: "Django", icon: "SiDjango" },
      { name: "HTML/CSS", icon: "FaHtml5" },
    ],
  },
  {
    title: "Databases & Tools",
    color: "from-emerald-500 to-teal-500",
    glowColor: "rgba(16,185,129,0.45)",
    skills: [
      { name: "MySQL", icon: "SiMysql" },
      { name: "MongoDB", icon: "SiMongodb" },
      { name: "Git", icon: "FaGitAlt" },
      { name: "GitHub", icon: "FaGithub" },
      { name: "VS Code", icon: "FaCode" },
    ],
  },
  {
    title: "AI/ML & DSA",
    color: "from-amber-500 to-orange-500",
    glowColor: "rgba(245,158,11,0.45)",
    skills: [
      { name: "Machine Learning", icon: "SiTensorflow" },
      { name: "Deep Learning", icon: "SiPytorch" },
      { name: "Data Structures", icon: "FaProjectDiagram" },
      { name: "Algorithms", icon: "FaBrain" },
      { name: "Data Science", icon: "SiNumpy" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Variants                                                          */
/* ------------------------------------------------------------------ */
const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ------------------------------------------------------------------ */
/*  TiltCard                                                          */
/* ------------------------------------------------------------------ */
function TiltCard({
  skill,
  glowColor,
}: {
  skill: { name: string; icon: string };
  glowColor: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(600px) rotateX(0deg) rotateY(0deg)");

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setTransform(`perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(600px) rotateX(0deg) rotateY(0deg)");
  }, []);

  const IconComp = iconMap[skill.icon];

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
      className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-6 backdrop-blur-sm transition-all duration-300 ease-out hover:border-white/20 hover:shadow-[0_0_30px_-8px_var(--glow)]"
      // eslint-disable-next-line react/no-unknown-property
    >
      {/* glow spot */}
      <span
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glowColor}, transparent 70%)`,
        }}
      />

      {IconComp && (
        <IconComp
          className="relative z-10 text-white/80 transition-colors duration-300 group-hover:text-white"
          size={38}
        />
      )}
      <span className="relative z-10 text-sm font-medium text-neutral-300 transition-colors duration-300 group-hover:text-white">
        {skill.name}
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Skills Section                                                    */
/* ------------------------------------------------------------------ */
export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 px-6 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/3 h-80 w-80 rounded-full bg-cyan-600/8 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-violet-600/8 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Section heading */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Skills &amp; Technologies
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500" />
        </motion.div>

        {/* Categories */}
        <motion.div
          className="space-y-14"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skillCategories.map((cat) => (
            <motion.div key={cat.title} variants={categoryVariants}>
              {/* Category title */}
              <div className="mb-6 flex items-center gap-3">
                <div
                  className={`h-1 w-8 rounded-full bg-gradient-to-r ${cat.color}`}
                />
                <h3 className="text-xl font-semibold text-white">
                  {cat.title}
                </h3>
              </div>

              {/* Skill cards */}
              <motion.div
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5"
                variants={cardContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {cat.skills.map((skill) => (
                  <TiltCard
                    key={skill.name}
                    skill={skill}
                    glowColor={cat.glowColor}
                  />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
