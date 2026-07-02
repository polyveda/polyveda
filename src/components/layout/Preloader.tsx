'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePreloader } from '@/context/PreloaderContext';
import { usePathname } from 'next/navigation';
import styles from './Preloader.module.css';

const LOGO_URL =
  'https://res.cloudinary.com/dzc0mfs9z/image/upload/v1782738371/08dd02e2-c75d-447f-bd54-8334f817857a_t9zcwj.png';

// Phase machine:
//  logo   → fly  (overlay fades out while logo springs to corner)
//  fly    → done (preloaderDone = true, component unmounts)
type Phase = 'logo' | 'fly' | 'done';

export function Preloader() {
  const { setPreloaderDone, loadProgress } = usePreloader();
  const [phase, setPhase] = useState<Phase>('logo');
  const pathname = usePathname();

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

  return (
    // Outer overlay — fades away during 'fly' phase
    <motion.div
      className={styles.overlay}
      animate={{ opacity: phase === 'fly' ? 0 : 1 }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* ── Logo: center reveal → unmounts during 'fly' so Navbar can take over ── */}
      <AnimatePresence>
        {phase === 'logo' && (
          <>
            <div className={styles.logoCenter}>
              <motion.img
                layoutId="site-logo"
                src={LOGO_URL}
                alt="Polyveda logo"
                className={styles.logoImg}
                draggable={false}
                initial={{ opacity: 0, scale: 0.55, filter: 'blur(24px)' }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px)',
                }}
                transition={{
                  duration: 1.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
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
