'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaStar, FaCodeBranch, FaUsers, FaCode } from 'react-icons/fa';

function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const start = () => {
    if (hasStarted) return;
    setHasStarted(true);
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  return { count, start };
}

const stats = [
  { label: 'Repositories', target: 25, suffix: '+', icon: FaCodeBranch, color: 'from-violet-500 to-purple-600' },
  { label: 'Stars', target: 50, suffix: '+', icon: FaStar, color: 'from-amber-400 to-yellow-500' },
  { label: 'Contributions', target: 500, suffix: '+', icon: FaCode, color: 'from-cyan-400 to-blue-500' },
  { label: 'Followers', target: 100, suffix: '+', icon: FaUsers, color: 'from-emerald-400 to-green-500' },
];

function CounterCard({
  label,
  target,
  suffix,
  icon: Icon,
  color,
  index,
}: {
  label: string;
  target: number;
  suffix: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { count, start } = useCountUp(target, 2000);

  if (isInView) start();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative"
    >
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-60"
        style={{
          backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
        }}
      />
      <div className="relative flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-lg`}>
          <Icon className="text-xl text-white" />
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-white md:text-4xl">
            {count}
            <span className="text-transparent bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text">
              {suffix}
            </span>
          </p>
          <p className="mt-1 text-sm text-gray-400">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function GitHub() {
  const githubCards = [
    {
      title: 'GitHub Stats',
      url: 'https://github-readme-stats.vercel.app/api?username=PILOT-SHARMA&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0D1117',
    },
    {
      title: 'Top Languages',
      url: 'https://github-readme-stats.vercel.app/api/top-langs/?username=PILOT-SHARMA&layout=compact&theme=tokyonight&hide_border=true&bg_color=0D1117',
    },
    {
      title: 'Streak Stats',
      url: 'https://github-readme-streak-stats.herokuapp.com/?user=PILOT-SHARMA&theme=tokyonight&hide_border=true&background=0D1117',
    },
  ];

  return (
    <section id="github" className="relative py-24 px-4 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-violet-600/10 blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyan-600/10 blur-[128px]" />
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
              GitHub Activity
            </span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500" />
          <p className="mt-4 text-gray-400">
            My open source journey and contributions
          </p>
        </motion.div>

        {/* Animated Counters */}
        <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((stat, index) => (
            <CounterCard key={stat.label} {...stat} index={index} />
          ))}
        </div>

        {/* GitHub Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {githubCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-violet-600/50 to-cyan-600/50 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-60" />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]">
                <h3 className="mb-3 text-sm font-semibold text-gray-300 uppercase tracking-wider">
                  {card.title}
                </h3>
                <img
                  src={card.url}
                  alt={card.title}
                  className="w-full rounded-lg"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
