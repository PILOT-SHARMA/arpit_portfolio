'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(onComplete, 500);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030014]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            {/* Pulsing rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-violet-500/30"
              style={{ width: 120, height: 120, top: -20, left: -20 }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-cyan-500/30"
              style={{ width: 120, height: 120, top: -20, left: -20 }}
              animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            {/* Initials */}
            <motion.div
              className="relative z-10 text-5xl font-bold bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              AS
            </motion.div>
          </div>
          {/* Loading bar */}
          <motion.div
            className="absolute bottom-20 h-0.5 bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 200 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
