'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'Machine Learning Intern',
    organization: 'Tech Startup Inc.',
    period: 'Summer 2025',
    description:
      'Worked on developing ML models for predictive analytics. Improved model accuracy by 15%.',
    type: 'internship',
    icon: '💼',
  },
  {
    title: 'AWS Cloud Practitioner',
    organization: 'Amazon Web Services',
    period: '2024',
    description:
      'Certified in cloud computing fundamentals, architecture, and AWS services.',
    type: 'certification',
    icon: '📜',
  },
  {
    title: 'Smart India Hackathon',
    organization: 'Government of India',
    period: '2024',
    description:
      'Participated in national-level hackathon. Built an AI-powered solution for healthcare.',
    type: 'hackathon',
    icon: '🏆',
  },
  {
    title: 'LeetCode Problem Solver',
    organization: 'LeetCode',
    period: 'Ongoing',
    description:
      '300+ problems solved. Rated in top 20% globally. Strong in DP and Graph algorithms.',
    type: 'coding',
    icon: '💻',
  },
  {
    title: 'Open Source Contributor',
    organization: 'Various Projects',
    period: 'Ongoing',
    description:
      'Active contributor to multiple open source projects. Merged 10+ pull requests.',
    type: 'opensource',
    icon: '🌟',
  },
];

const typeConfig: Record<
  string,
  { label: string; badgeClass: string; glowColor: string }
> = {
  internship: {
    label: 'Internship',
    badgeClass: 'bg-violet-500/10 text-violet-300 border-violet-500/30',
    glowColor: 'from-violet-600/50 to-purple-600/50',
  },
  certification: {
    label: 'Certification',
    badgeClass: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    glowColor: 'from-cyan-600/50 to-blue-600/50',
  },
  hackathon: {
    label: 'Hackathon',
    badgeClass: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    glowColor: 'from-amber-600/50 to-yellow-600/50',
  },
  coding: {
    label: 'Competitive Coding',
    badgeClass: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    glowColor: 'from-emerald-600/50 to-green-600/50',
  },
  opensource: {
    label: 'Open Source',
    badgeClass: 'bg-pink-500/10 text-pink-300 border-pink-500/30',
    glowColor: 'from-pink-600/50 to-rose-600/50',
  },
};

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 px-4 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 h-96 w-96 rounded-full bg-purple-600/10 blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/3 h-96 w-96 rounded-full bg-cyan-600/10 blur-[128px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold md:text-5xl">
            <span className="text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text">
              Experience &amp; Achievements
            </span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" />
          <p className="mt-4 text-gray-400">
            Professional milestones and accomplishments
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp, index) => {
            const config = typeConfig[exp.type];
            return (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative"
              >
                {/* Hover glow */}
                <div
                  className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${config.glowColor} opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-60`}
                />

                {/* Card */}
                <div className="relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]">
                  {/* Type Badge */}
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${config.badgeClass}`}
                    >
                      {config.label}
                    </span>
                    <span className="text-2xl">{exp.icon}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white">{exp.title}</h3>

                  {/* Organization */}
                  <p className="mt-1 text-sm font-medium text-transparent bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text">
                    {exp.organization}
                  </p>

                  {/* Period */}
                  <p className="mt-1 text-xs text-gray-500">{exp.period}</p>

                  {/* Description */}
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-400">
                    {exp.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="mt-4 h-0.5 w-0 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
