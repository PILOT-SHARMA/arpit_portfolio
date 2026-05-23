'use client';

import { motion } from 'framer-motion';

const education = [
  {
    degree: 'B.Tech in Computer Science (AI/ML)',
    institution: 'GLA UNIVERSITY MATHURA',
    period: '2024 - 2028',
    description:
      'Specializing in Artificial Intelligence and Machine Learning. Active member of coding club and technical society.',
    grade: 'CGPA: 8.5/10',
    icon: '🎓',
  },
  {
    degree: 'Higher Secondary (12th)',
    institution: 'St. Andrews Public School',
    period: '2024',
    description:
      'Science stream with Computer Science. Focus on advanced mathematics, physics, and foundations of programming.',
    grade: 'Percentage: 81%',
    icon: '📚',
  },
  {
    degree: 'Secondary School (10th)',
    institution: 'St. Andrews Public School',
    period: '2022',
    description:
      'Developed early interest in software development, algorithmic thinking, and basic web technologies.',
    grade: 'Percentage: 89%',
    icon: '🏫',
  },
];

export default function Education() {
  return (
    <section id="education" className="relative py-24 px-4 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/3 h-96 w-96 rounded-full bg-violet-600/10 blur-[128px]" />
        <div className="absolute bottom-1/3 left-1/4 h-96 w-96 rounded-full bg-cyan-600/10 blur-[128px]" />
      </div>

      <div className="relative mx-auto max-w-4xl">
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
              Education
            </span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" />
          <p className="mt-4 text-gray-400">My academic journey and milestones</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 md:left-8">
            <div className="h-full w-full bg-gradient-to-b from-violet-500 via-purple-500 to-cyan-500 opacity-40" />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {education.map((item, index) => (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="relative pl-12 md:pl-20"
              >
                {/* Timeline Node */}
                <div className="absolute left-4 top-6 md:left-8 -translate-x-1/2">
                  {/* Glow ring */}
                  <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 opacity-40 blur-sm" />
                  {/* Dot */}
                  <div className="relative h-4 w-4 rounded-full border-2 border-violet-400 bg-[#0D1117]">
                    <div className="absolute inset-0.5 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
                  </div>
                </div>

                {/* Card */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-violet-600/40 to-cyan-600/40 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-60" />
                  <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]">
                    {/* Icon & Period */}
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-3xl">{item.icon}</span>
                      <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                        {item.period}
                      </span>
                    </div>

                    {/* Degree */}
                    <h3 className="text-xl font-bold text-white">{item.degree}</h3>

                    {/* Institution */}
                    <p className="mt-1 text-sm font-medium text-transparent bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text">
                      {item.institution}
                    </p>

                    {/* Description */}
                    <p className="mt-3 text-sm leading-relaxed text-gray-400">
                      {item.description}
                    </p>

                    {/* Grade Badge */}
                    <div className="mt-4">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 px-3 py-1.5 text-sm font-semibold text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        {item.grade}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
