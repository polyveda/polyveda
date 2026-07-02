'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { usePreloader } from '@/context/PreloaderContext';
import { usePathname } from 'next/navigation';
import styles from './Preloader.module.css';

// Use the colour logo placed in /public as icon.png
const LOGO_URL = '/icon.png';

// Phase machine:
//  logo   → fly  (overlay fades out while logo springs to corner)
//  fly    → done (preloaderDone = true, component unmounts)
type Phase = 'logo' | 'fly' | 'done';

export function Preloader() {
  const { setPreloaderDone, loadProgress } = usePreloader();
  const [phase, setPhase] = useState<Phase>('logo');
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Only run the sequence if we are in the initial 'logo' phase.
    // This prevents the preloader from resurrecting and blinking on subsequent route changes.
    if (phase !== 'logo') return;

    // If not on the homepage, just finish quickly
    if (pathname !== '/') {
      const timer = setTimeout(() => {
        setPreloaderDone(true);
        setPhase('fly');
        setTimeout(() => setPhase('done'), 900);
      }, 500);
      return () => clearTimeout(timer);
    }

    // On homepage, wait for loadProgress to hit 100%
    if (loadProgress >= 100) {
      // Add a slight dramatic pause after hitting 100% before flying
      const timer = setTimeout(() => {
        setPreloaderDone(true);
        setPhase('fly');
        setTimeout(() => setPhase('done'), 900);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [loadProgress, phase, pathname, setPreloaderDone]);

  if (phase === 'done') return null;

  const BLUR_ANIM = shouldReduceMotion ? 'blur(0px)' : 'blur(24px)';
  const DURATION = shouldReduceMotion ? 0.01 : 1.1;

  return (
    <motion.div
      className={styles.overlay}
      animate={{ opacity: phase === 'fly' ? 0 : 1 }}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.85, ease: [0.76, 0, 0.24, 1] }}
    >
      <AnimatePresence>
        {phase === 'logo' && (
          <>
            {/* Pulsing rings behind the logo */}
            {!shouldReduceMotion && (
              <>
                <motion.div
                  className={styles.ring}
                  initial={{ scale: 0.6, opacity: 0.6 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut', delay: 0 }}
                />
                <motion.div
                  className={styles.ring}
                  initial={{ scale: 0.6, opacity: 0.5 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut', delay: 0.8 }}
                />
              </>
            )}

            <div className={styles.logoCenter}>
              <motion.img
                layoutId="site-logo"
                src={LOGO_URL}
                alt="Polyveda logo"
                className={styles.logoImg}
                draggable={false}
                initial={{ opacity: 0, scale: 0.55, filter: BLUR_ANIM }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px)',
                }}
                transition={{
                  duration: DURATION,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className={styles.loadingText}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              INITIALIZING...
            </motion.div>
            
            <motion.div 
              className={styles.progressContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div 
                className={styles.progressFill} 
                style={{ width: `${pathname === '/' ? loadProgress : 100}%` }} 
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
