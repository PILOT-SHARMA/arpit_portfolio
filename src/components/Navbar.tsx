'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { BsSun, BsMoon } from 'react-icons/bs';
import { useTheme } from './ThemeProvider';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'GitHub', href: '#github' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { theme, toggleTheme } = useTheme();

  // Scroll detection for navbar opacity transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active section highlighting
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    const observerCallback = (id: string) => (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(id);
        }
      });
    };

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(observerCallback(id), {
          rootMargin: '-20% 0px -75% 0px',
          threshold: 0,
        });
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setIsOpen(false);
    },
    []
  );

  // Animation variants
  const mobileMenuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const menuItemVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.1 + i * 0.05,
        type: 'spring' as const,
        stiffness: 300,
        damping: 24,
      },
    }),
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  return (
    <>
      {/* ─── Main Navbar ─── */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          scrolled
            ? 'bg-black/30 dark:bg-black/50 shadow-lg shadow-black/5'
            : 'bg-black/10 dark:bg-black/20'
        } backdrop-blur-xl border-b border-white/5`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between md:h-18">
            {/* ─── Logo ─── */}
            <motion.a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="group relative flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                AS
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 rounded-full"
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            {/* ─── Desktop Navigation ─── */}
            <div className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="relative px-3 py-2 text-sm font-medium transition-colors duration-300 rounded-lg group"
                  >
                    <span
                      className={`relative z-10 transition-colors duration-300 ${
                        isActive
                          ? 'text-white'
                          : 'text-gray-400 group-hover:text-white'
                      }`}
                    >
                      {item.name}
                    </span>
                    {/* Active indicator pill */}
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 rounded-lg bg-white/10 border border-white/10"
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    {/* Hover glow */}
                    <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
                  </a>
                );
              })}

              {/* ─── Theme Toggle (Desktop) ─── */}
              <motion.button
                onClick={toggleTheme}
                className="ml-3 relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'dark' ? (
                    <motion.span
                      key="sun"
                      initial={{ rotate: -90, opacity: 0, scale: 0 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute"
                    >
                      <BsSun className="h-4 w-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon"
                      initial={{ rotate: 90, opacity: 0, scale: 0 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -90, opacity: 0, scale: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute"
                    >
                      <BsMoon className="h-4 w-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* ─── Mobile Controls ─── */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Theme Toggle (Mobile) */}
              <motion.button
                onClick={toggleTheme}
                className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all duration-300"
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'dark' ? (
                    <motion.span
                      key="sun-mobile"
                      initial={{ rotate: -90, opacity: 0, scale: 0 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute"
                    >
                      <BsSun className="h-4 w-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="moon-mobile"
                      initial={{ rotate: 90, opacity: 0, scale: 0 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -90, opacity: 0, scale: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute"
                    >
                      <BsMoon className="h-4 w-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Hamburger Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all duration-300"
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.span
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute"
                    >
                      <HiX className="h-5 w-5" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute"
                    >
                      <HiMenuAlt3 className="h-5 w-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ─── Mobile Menu Overlay ─── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              variants={backdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Slide-in Panel */}
            <motion.div
              key="mobile-menu"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 z-50 flex h-full w-72 flex-col bg-gray-950/95 backdrop-blur-2xl border-l border-white/5 md:hidden"
            >
              {/* Close button area */}
              <div className="flex h-16 items-center justify-between px-6">
                <span className="text-lg font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Menu
                </span>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close menu"
                >
                  <HiX className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Divider */}
              <div className="mx-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Nav Links */}
              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <ul className="space-y-1">
                  {navItems.map((item, i) => {
                    const isActive = activeSection === item.href.replace('#', '');
                    return (
                      <motion.li
                        key={item.name}
                        custom={i}
                        variants={menuItemVariants}
                        initial="closed"
                        animate="open"
                      >
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                            isActive
                              ? 'bg-white/10 text-white border border-white/10'
                              : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                          }`}
                        >
                          {/* Active dot indicator */}
                          <span
                            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                              isActive
                                ? 'bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg shadow-purple-500/50'
                                : 'bg-gray-600'
                            }`}
                          />
                          {item.name}
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Bottom gradient accent */}
              <div className="mx-6 mb-6">
                <div className="h-px bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-cyan-500/50" />
                <p className="mt-4 text-center text-xs text-gray-600">
                  © 2026 Arpit. All rights reserved.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
