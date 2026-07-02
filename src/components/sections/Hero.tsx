'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { ScrollSequenceCanvas } from '../ui/ScrollSequenceCanvas';
import styles from './Hero.module.css';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Track scroll progress over the 400vh container
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress to finish animation early (at 80% scroll), so the final frame stays paused
  const canvasProgress = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  // Smooth progress for canvas
  const smoothProgress = useSpring(canvasProgress, {
    stiffness: 400,
    damping: 90,
    mass: 0.1,
  });

  // Determine mobile vs desktop frames
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile(); // Check immediately on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const frameCount = isMobile ? 175 : 169;
  const imagePathPrefix = isMobile ? '/hero-sequence-mobile' : '/hero-sequence-new';

  // Center overlay: visible at start, fades out by 15% scroll
  const centerOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const centerScale  = useTransform(scrollYProgress, [0, 0.12], [1, 0.94]);
  const centerY      = useTransform(scrollYProgress, [0, 0.12], [0, -30]);

  // Reticles fade a little slower
  const reticleOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  return (
    <>
      {/* ── 400vh scroll container ── */}
      <section ref={heroRef} className={styles.heroSequenceContainer}>
        <div className={styles.stickyWrapper}>

          {/* Canvas */}
          <div className={styles.canvasContainer}>
            <ScrollSequenceCanvas 
              frameCount={frameCount} 
              progress={smoothProgress} 
              imagePathPrefix={imagePathPrefix}
            />
          </div>

          {/* Corner HUD reticles */}
          {(['TL','TR','BL','BR'] as const).map((pos) => (
            <motion.div
              key={pos}
              className={`${styles.reticle} ${styles[`reticle${pos}`]}`}
              style={{ opacity: reticleOpacity }}
            />
          ))}

          {/* Frame / scan label */}
          <motion.div className={styles.frameLabel} style={{ opacity: reticleOpacity }}>
            PP CORRUGATED · SCROLL TO EXPLORE
          </motion.div>

          {/* ── CENTER INTRO OVERLAY ── fades as you scroll */}
          <motion.div
            className={styles.centerOverlay}
            style={{ opacity: centerOpacity, scale: centerScale, y: centerY }}
          >
            <div className={styles.hudLineTop} />
            <span className={styles.centerEyebrow}>Polyveda · Est. 2026</span>
            <h1 className={styles.centerTitle}>
              Engineered to endure.
              <span className={styles.centerTitleAccent}>Designed to return.</span>
            </h1>
            <div className={styles.hudLineBottom} />
            <motion.div 
              className={styles.mobileScrollPrompt}
              animate={{ y: [0, 8, 0] }} 
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              ↓ Keep Scrolling
            </motion.div>
          </motion.div>

          {/* ── BOTTOM-LEFT ANCHOR — always visible ── */}
          <div className={styles.bottomAnchor}>
            <span className={styles.anchorLabel}>Product Range</span>
            <p className={styles.anchorTitle}>
              Engineered for<br />
              <span className={styles.anchorAccent}>industrial demands.</span>
            </p>
          </div>

        </div>
      </section>

      {/* ── POST-HERO CTA STRIP — below the scroll area ── */}
      <div className={styles.heroCtaStrip}>
        <div className={styles.heroCtaCopy}>
          <h2>Ready to upgrade your packaging?</h2>
          <p>
            Custom-engineered PP corrugated solutions. From single-unit trays to
            high-volume returnable logistics systems, we build packaging that lasts.
          </p>
        </div>
        <div className={styles.heroCtaButtons}>
          <Link href="/contact">
            <Button variant="primary">Request Custom Quote</Button>
          </Link>
          <Link href="/capabilities">
            <Button variant="outline">View Capabilities</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
