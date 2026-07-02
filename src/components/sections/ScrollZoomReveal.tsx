'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import styles from './ScrollZoomReveal.module.css';
import { Play } from 'lucide-react';

export function ScrollZoomReveal() {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 90, 
    damping: 25, 
    mass: 0.6 
  });

  // Core Zoom Animations
  const width = useTransform(smoothProgress, [0.1, 0.7], ["15vw", "100vw"]);
  const height = useTransform(smoothProgress, [0.1, 0.7], ["25vh", "100vh"]);
  const borderRadius = useTransform(smoothProgress, [0.1, 0.7], ["24px", "0px"]);

  // Crossfade side texts out
  const textOpacity = useTransform(smoothProgress, [0.2, 0.4], [1, 0]);

  // Fade button in towards the end of the zoom
  const buttonOpacity = useTransform(smoothProgress, [0.5, 0.8], [0, 1]);
  const buttonY = useTransform(smoothProgress, [0.5, 0.8], [60, 0]);

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.gridBackground} />
      
      {/* Decorative HUD Elements */}
      <div className={styles.reticleTopLeft} />
      <div className={styles.reticleTopRight} />
      <div className={styles.reticleBottomLeft} />
      <div className={styles.reticleBottomRight} />
      
      <div className={styles.stickyContainer}>
        {/* Left Text */}
        <motion.div className={styles.sideTextContainer} style={{ opacity: textOpacity, textAlign: 'right' }}>
          <div className={styles.technicalFrame}>
            <span className={styles.bracket}>[</span> Est. 2026 <span className={styles.bracket}>]</span>
          </div>
          
          <div className={styles.rotatingBadge}>
            <svg viewBox="0 0 100 100" className={styles.badgeSvg}>
              <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="none" />
              <text>
                <textPath href="#circlePath" startOffset="0%" className={styles.badgeText}>
                  POLYVEDA ◆ SINCE 2026 ◆ ENGINEERED ◆
                </textPath>
              </text>
            </svg>
            <div className={styles.badgeCenter}></div>
          </div>
        </motion.div>

        {/* Zooming Image Container */}
        <motion.div 
          className={styles.imageContainer}
          style={{ width, height, borderRadius }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=2000&q=80" 
            alt="Polyveda Manufacturing Process" 
            className={styles.image}
          />
          
          <motion.a 
            href="#" 
            className={styles.playButton}
            style={{ opacity: buttonOpacity, y: buttonY }}
          >
            Play Showreel
            <div className={styles.iconCircle}>
              <Play size={16} fill="var(--color-bg-dark)" stroke="none" />
            </div>
          </motion.a>
        </motion.div>

        {/* Right Text */}
        <motion.div className={styles.sideTextContainer} style={{ opacity: textOpacity, textAlign: 'left' }}>
          <div className={styles.technicalFrame}>
            <span className={styles.bracket}>[</span> Capabilities <span className={styles.bracket}>]</span>
          </div>
          
          {/* Data Points */}
          <div className={styles.dataPoints}>
            <div className={styles.dataPoint}>
              <span className={styles.dataLabel}>01 // </span>
              <span className={styles.dataValue}>PROCESS</span>
            </div>
            <div className={styles.dataPoint}>
              <span className={styles.dataLabel}>02 // </span>
              <span className={styles.dataValue}>OUTPUT</span>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div className={styles.scrollIndicator} style={{ opacity: textOpacity }}>
          <span className={styles.scrollText}>Keep on scrolling</span>
          <div className={styles.scrollLine} />
        </motion.div>
      </div>
    </section>
  );
}
