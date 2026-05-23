"use client";

import { motion } from "framer-motion";

const highlights = [
  {
    emoji: "🎯",
    title: "Career Goals",
    description: "Aspiring to build AI-powered solutions that make a real-world impact and push the boundaries of innovation.",
  },
  {
    emoji: "💡",
    title: "Problem Solver",
    description: "Love tackling complex algorithmic challenges and finding elegant, efficient solutions to difficult problems.",
  },
  {
    emoji: "🌐",
    title: "Open Source",
    description: "Active contributor to open source projects, believing in the power of community-driven development.",
  },
  {
    emoji: "🏆",
    title: "Hackathons",
    description: "Passionate about competitive programming and hackathons — thriving under pressure to build and ship fast.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 px-6 sm:px-8 lg:px-12 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 -left-32 h-72 w-72 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 h-72 w-72 rounded-full bg-cyan-600/10 blur-[120px]" />
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
            About Me
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500" />
        </motion.div>

        {/* Bio paragraph */}
        <motion.p
          className="mx-auto mb-16 max-w-3xl text-center text-lg leading-relaxed text-neutral-300 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const }}
        >
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text font-semibold text-transparent">
            Arpit Sharma
          </span>{" "}
          — a BTech Computer Science (AI&ML) student driven by a deep passion
          for artificial intelligence, machine learning, full-stack development,
          and open source. I love transforming ideas into elegant, performant
          software and am constantly exploring the intersection of cutting-edge
          AI research and practical web technologies.
        </motion.p>

        {/* Highlight cards */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {highlights.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.3)]"
            >
              {/* Hover glow overlay */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/0 to-cyan-600/0 opacity-0 transition-opacity duration-500 group-hover:from-violet-600/5 group-hover:to-cyan-600/5 group-hover:opacity-100" />

              <div className="relative z-10 flex items-start gap-4">
                <span className="text-4xl leading-none">{item.emoji}</span>
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-400">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
