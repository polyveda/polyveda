'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePreloader } from '@/context/PreloaderContext';
import styles from './Preloader.module.css';

const LOGO_URL =
  'https://res.cloudinary.com/dzc0mfs9z/image/upload/v1782738371/08dd02e2-c75d-447f-bd54-8334f817857a_t9zcwj.png';

// Phase machine:
//  logo   → fly  (overlay fades out while logo springs to corner)
//  fly    → done (preloaderDone = true, component unmounts)
type Phase = 'logo' | 'fly' | 'done';

export function Preloader() {
  const { setPreloaderDone } = usePreloader();
  const [phase, setPhase] = useState<Phase>('logo');

  useEffect(() => {
    let isMounted = true;
    
    const runSequence = async () => {
      // Step 1: Wait for logo to bloom in + dramatic hold
      await new Promise(r => setTimeout(r, 1400));
      if (!isMounted) return;
      
      // Step 2: overlay exit starts — logo "belongs" to nav now
      setPreloaderDone(true); // Tell navbar to mount its logo NOW
      setPhase('fly');
      
      // Wait for fade-out transition to finish
      await new Promise(r => setTimeout(r, 900));
      if (!isMounted) return;
      
      // Step 3: signal rest of app, then unmount
      setPhase('done');
    };

    runSequence();
    
    return () => {
      isMounted = false;
    };
  }, [setPreloaderDone]);

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
        )}
      </AnimatePresence>
    </motion.div>
  );
}
