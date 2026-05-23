'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasPointerFine, setHasPointerFine] = useState(false);

  // Motion values for the dot (tracks cursor exactly)
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Spring-based motion values for the ring (follows with delay)
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const ringX = useSpring(dotX, springConfig);
  const ringY = useSpring(dotY, springConfig);

  // Ring scale spring for hover effect
  const ringScale = useSpring(1, { damping: 20, stiffness: 300 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
      if (!isVisible) setIsVisible(true);
    },
    [dotX, dotY, isVisible]
  );

  const handleMouseEnterInteractive = useCallback(() => {
    setIsHovering(true);
    ringScale.set(1.8);
  }, [ringScale]);

  const handleMouseLeaveInteractive = useCallback(() => {
    setIsHovering(false);
    ringScale.set(1);
  }, [ringScale]);

  const handleMouseLeaveWindow = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnterWindow = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Check for fine pointer (non-touch devices)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setHasPointerFine(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setHasPointerFine(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!hasPointerFine) return;

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterInteractive);
      el.addEventListener('mouseleave', handleMouseLeaveInteractive);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };
  }, [hasPointerFine, handleMouseMove, handleMouseEnterInteractive, handleMouseLeaveInteractive, handleMouseLeaveWindow, handleMouseEnterWindow]);

  // Re-attach listeners when DOM changes (for dynamically added elements)
  useEffect(() => {
    if (!hasPointerFine) return;

    const observer = new MutationObserver(() => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnterInteractive);
        el.removeEventListener('mouseleave', handleMouseLeaveInteractive);
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [hasPointerFine, handleMouseEnterInteractive, handleMouseLeaveInteractive]);

  if (!hasPointerFine) return null;

  return (
    <>
      {/* Small dot - follows cursor exactly */}
      <motion.div
        className="fixed top-0 left-0 z-[999] pointer-events-none mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#fff',
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Larger ring - follows with spring delay */}
      <motion.div
        className="fixed top-0 left-0 z-[998] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          width: 36,
          height: 36,
          borderRadius: '50%',
          scale: ringScale,
          translateX: -14,
          translateY: -14,
          opacity: isVisible ? 1 : 0,
          border: '2px solid transparent',
          background: isHovering
            ? 'linear-gradient(#030014, #030014) padding-box, linear-gradient(135deg, #8b5cf6, #06b6d4) border-box'
            : 'linear-gradient(#030014, #030014) padding-box, linear-gradient(135deg, rgba(139,92,246,0.5), rgba(6,182,212,0.5)) border-box',
          transition: 'background 0.3s ease',
        }}
      />
    </>
  );
}
