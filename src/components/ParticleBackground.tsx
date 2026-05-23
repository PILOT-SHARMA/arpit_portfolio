'use client';

import { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationIdRef = useRef<number>(0);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const getParticleCount = useCallback(() => {
    if (typeof window === 'undefined') return 60;
    return window.innerWidth < 768 ? 40 : 80;
  }, []);

  const createParticle = useCallback((width: number, height: number): Particle => {
    const colors = [
      'rgba(139, 92, 246,',  // violet-500
      'rgba(124, 58, 237,',  // violet-600
      'rgba(6, 182, 212,',   // cyan-500
      'rgba(34, 211, 238,',  // cyan-400
      'rgba(168, 85, 247,',  // purple-500
    ];
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.3 - 0.1, // float upward
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  }, []);

  const initParticles = useCallback((width: number, height: number) => {
    const count = getParticleCount();
    particlesRef.current = Array.from({ length: count }, () =>
      createParticle(width, height)
    );
  }, [getParticleCount, createParticle]);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    const { width, height } = dimensionsRef.current;
    const particles = particlesRef.current;
    const connectionDistance = 150;

    ctx.clearRect(0, 0, width, height);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distSq = dx * dx + dy * dy;
        const maxDistSq = connectionDistance * connectionDistance;

        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          const opacity = (1 - dist / connectionDistance) * 0.15;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Update and draw particles
    for (const particle of particles) {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around edges
      if (particle.y < -10) {
        particle.y = height + 10;
        particle.x = Math.random() * width;
      }
      if (particle.x < -10) particle.x = width + 10;
      if (particle.x > width + 10) particle.x = -10;

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${particle.color} ${particle.opacity})`;
      ctx.fill();
    }
  }, []);

  const animate = useCallback((ctx: CanvasRenderingContext2D) => {
    drawParticles(ctx);
    animationIdRef.current = requestAnimationFrame(() => animate(ctx));
  }, [drawParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const parent = canvas.parentElement;
      const width = parent?.clientWidth || window.innerWidth;
      const height = parent?.clientHeight || window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      dimensionsRef.current = { width, height };
      initParticles(width, height);
    };

    handleResize();
    animate(ctx);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationIdRef.current);
    };
  }, [initParticles, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
}
