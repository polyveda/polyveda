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

  // Smooth progress for canvas (heavier mass and lower stiffness makes the sequence glide beautifully during fast scrolls)
  const smoothProgress = useSpring(canvasProgress, {
    stiffness: 150,
    damping: 50,
    mass: 0.4,
  });

  // Determine mobile vs desktop frames
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile(); // Check immediately on mount
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const frameCount = isMobile ? 175 : 160;
  const imagePathPrefix = isMobile ? '/hero-sequence-mobile' : '/hero-sequence-new';

  // Center overlay: visible at start, fades out by 15% scroll
  const centerOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // Glow fades out early — gone by 10% scroll
  const glowOpacity  = useTransform(scrollYProgress, [0, 0.10], [1, 0]);

  // Reticles fade a little slower
  const reticleOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  return (
    <>
      {/* ── 400vh scroll container ── */}
      <section ref={heroRef} className={styles.heroSequenceContainer}>
        <div className={styles.stickyWrapper}>

          {/* Ambient colour glow – visible on load, fades on scroll */}
          <motion.div className={styles.glowOverlay} style={{ opacity: glowOpacity }} />

          {/* Canvas */}
          <div className={styles.canvasContainer}>
            <ScrollSequenceCanvas 
              frameCount={frameCount} 
              progress={isMobile ? canvasProgress : smoothProgress} 
              imagePathPrefix={imagePathPrefix}
            />
          </div>

          {/* Frame / scan label */}
          <motion.div className={styles.frameLabel} style={{ opacity: reticleOpacity }}>
            PP CORRUGATED · SCROLL TO EXPLORE
          </motion.div>

          {/* ── CENTER INTRO OVERLAY ── fades as you scroll */}
          <motion.div
            className={styles.centerOverlay}
            style={{ opacity: centerOpacity }}
          >
            <div className={styles.hudLineTop} />
            <span className={styles.centerEyebrow}>Polyveda</span>
            <h1 className={styles.centerTitle}>
              Engineered to endure.
              <span className={styles.centerTitleAccent}>Designed to reuse.</span>
            </h1>
            <div className={styles.hudLineBottom} />
            <div className={styles.mobileScrollPrompt}>
              ↓ Keep Scrolling
            </div>
          </motion.div>

          {/* ── TOP-LEFT ANCHOR — always visible ── */}
          <div className={styles.topLeftAnchor}>
            <span className={styles.anchorLabel}>Product Range</span>
            <p className={styles.anchorTitle}>
              Engineered for<br />
              <span className={styles.anchorAccent}>industrial demands.</span>
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
