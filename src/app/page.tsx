'use client';

import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import GitHub from '@/components/GitHub';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <>
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      {loadingComplete && (
        <div className="relative z-0 min-h-screen">
          {/* Custom Cursor */}
          <CustomCursor />
          
          {/* Scroll Progress Bar */}
          <ScrollProgress />
          
          {/* Background Particles */}
          <div className="fixed inset-0 -z-10">
            <ParticleBackground />
          </div>

          {/* Sticky Navigation */}
          <Navbar />

          {/* Page content */}
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <GitHub />
            <Education />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  );
}
