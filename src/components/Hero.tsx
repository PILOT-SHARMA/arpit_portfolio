'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaDownload, FaArrowRight } from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi';
import { useState, useEffect } from 'react';

/* ───────────────────────── animation variants ───────────────────────── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

/* ───────────────── floating decorative dot component ────────────────── */

function FloatingDot({
  size,
  color,
  top,
  left,
  delay,
}: {
  size: number;
  color: string;
  top: string;
  left: string;
  delay: number;
}) {
  return (
    <motion.span
      className="absolute rounded-full pointer-events-none blur-[1px]"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: color,
      }}
      animate={{
        y: [0, -18, 0, 18, 0],
        x: [0, 12, 0, -12, 0],
        opacity: [0.45, 0.8, 0.45],
      }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}

/* ═══════════════════════════ HERO COMPONENT ═══════════════════════════ */

export default function Hero() {
  /* ── mouse-following spotlight ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  /* ── profile-image 3-D tilt ── */
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const handleProfileHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltX(y * -20);
    setTiltY(x * 20);
  };

  const resetTilt = () => {
    setTiltX(0);
    setTiltY(0);
  };

  /* ── decorative dots data ── */
  const dots = [
    { size: 6, color: '#8b5cf6', top: '12%', left: '8%', delay: 0 },
    { size: 8, color: '#06b6d4', top: '22%', left: '92%', delay: 1.2 },
    { size: 5, color: '#a78bfa', top: '70%', left: '5%', delay: 0.6 },
    { size: 7, color: '#22d3ee', top: '80%', left: '88%', delay: 1.8 },
    { size: 4, color: '#c084fc', top: '45%', left: '95%', delay: 2.4 },
    { size: 6, color: '#67e8f9', top: '55%', left: '3%', delay: 0.9 },
    { size: 5, color: '#7c3aed', top: '15%', left: '50%', delay: 1.5 },
    { size: 4, color: '#06b6d4', top: '88%', left: '45%', delay: 2.1 },
    { size: 7, color: '#a855f7', top: '35%', left: '15%', delay: 0.3 },
    { size: 5, color: '#22d3ee', top: '60%', left: '75%', delay: 1.1 },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── mouse-following radial gradient spotlight ── */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(650px circle at var(--mx) var(--my),
            rgba(139,92,246,0.08),
            rgba(6,182,212,0.04) 40%,
            transparent 70%)`,
          // @ts-expect-error CSS custom-property usage
          '--mx': springX,
          '--my': springY,
        }}
        /* Framer Motion will interpolate CSS vars automatically */
      />

      {/* ── floating decorative dots ── */}
      {dots.map((d, i) => (
        <FloatingDot key={i} {...d} />
      ))}

      {/* ── main content ── */}
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-12 px-6 py-20 md:flex-row md:gap-8 lg:px-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ─────────── LEFT: text block (60 %) ─────────── */}
        <div className="flex w-full flex-col items-center text-center md:w-[60%] md:items-start md:text-left">
          {/* greeting */}
          <motion.p
            variants={fadeRight}
            className="mb-2 text-lg font-medium tracking-wide text-gray-400 md:text-xl"
          >
            Hi, I&apos;m
          </motion.p>

          {/* name */}
          <motion.h1
            variants={fadeRight}
            className="mb-4 text-5xl font-bold leading-tight md:text-7xl lg:text-8xl"
          >
            <span className="bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              Arpit Sharma
            </span>
          </motion.h1>

          {/* role typewriter */}
          <motion.div
            variants={fadeUp}
            className="mb-8 h-10 text-xl font-semibold text-gray-300 md:text-2xl"
          >
            <TypeAnimation
              sequence={[
                'BTech CS(AIML) Student',
                2000,
                'AI/ML Enthusiast',
                2000,
                'Full Stack Developer',
                2000,
                'Open Source Contributor',
                2000,
              ]}
              wrapper="span"
              speed={45}
              repeat={Infinity}
              className="inline-block"
            />
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-4 md:justify-start"
          >
            {/* View Projects */}
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-shadow duration-300 hover:shadow-violet-500/40"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              {/* hover shimmer */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </a>

            {/* Download Resume */}
            <a
              href="/resume.pdf"
              download="Arpit_Sharma_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-semibold text-gray-200 backdrop-blur-md transition-all duration-300 hover:border-violet-500/50 hover:bg-white/10 hover:text-white"
            >
              <FaDownload className="text-violet-400" />
              Download Resume
            </a>

            {/* Contact Me */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-3 text-sm font-semibold text-gray-300 transition-all duration-300 hover:border-cyan-400/50 hover:text-cyan-300"
            >
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* ─────────── RIGHT: profile image area (40 %) ─────────── */}
        <motion.div
          variants={scaleIn}
          className="flex w-full items-center justify-center md:w-[40%]"
        >
          <div
            className="group relative"
            onMouseMove={handleProfileHover}
            onMouseLeave={resetTilt}
            style={{
              perspective: '800px',
            }}
          >
            {/* rotating gradient ring */}
            <div
              className="absolute -inset-[3px] rounded-full opacity-80 blur-[2px] transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  'conic-gradient(from var(--ring-angle,0deg), #8b5cf6, #06b6d4, #a855f7, #22d3ee, #7c3aed, #8b5cf6)',
                animation: 'spin-slow 4s linear infinite',
              }}
            />

            {/* outer glow */}
            <div className="absolute -inset-6 rounded-full bg-violet-500/10 blur-2xl transition-all duration-500 group-hover:bg-violet-500/20" />

            {/* profile circle */}
            <motion.div
              className="relative h-56 w-56 rounded-full border-2 border-white/10 bg-gray-900/80 shadow-2xl overflow-hidden backdrop-blur-sm sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80"
              style={{
                transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
            >
              {/* profile image */}
              <div className="relative h-full w-full overflow-hidden rounded-full">
                <img
                  src="/profile.jpg"
                  alt="Arpit Sharma"
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                {/* inner glow overlay */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600/10 via-transparent to-cyan-500/10 mix-blend-overlay" />
              </div>

              {/* subtle sparkle ring inside */}
              <div className="absolute inset-4 rounded-full border border-white/5 pointer-events-none" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── scroll indicator ── */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400 transition-colors hover:text-violet-400"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <HiChevronDown className="text-2xl" />
        </motion.span>
      </motion.a>

      {/* ── keyframe styles (injected once) ── */}
      <style jsx global>{`
        @keyframes spin-slow {
          to {
            --ring-angle: 360deg;
          }
        }

        @property --ring-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @property --mx {
          syntax: '<length>';
          initial-value: 50vw;
          inherits: true;
        }

        @property --my {
          syntax: '<length>';
          initial-value: 50vh;
          inherits: true;
        }
      `}</style>
    </section>
  );
}
