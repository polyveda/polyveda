'use client';
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import styles from './ScrollSyncedText.module.css';

const items = [
  { word: "durability", desc: "Engineered for heavy loads and 50+ transit cycles." },
  { word: "sustainability", desc: "100% recyclable PP material replacing single-use waste." },
  { word: "efficiency", desc: "Collapsible designs saving up to 75% in return logistics." },
  { word: "protection", desc: "Moisture-proof and impact-resistant for sensitive goods." },
  { word: "performance", desc: "Custom cavities ensuring zero movement during transit." }
];

export function ScrollSyncedText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Compute the exact Y percentage based on the discrete active index.
  // This prevents the "slot machine" from stopping halfway between words.
  const targetY = `-${activeIndex * (100 / items.length)}%`;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map the 0-0.8 progress to an index 0-4
    const segment = 0.8 / items.length;
    let index = Math.floor(latest / segment);
    if (index >= items.length) index = items.length - 1;
    if (index < 0) index = 0;
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  return (
    <section ref={containerRef} className={styles.section}>
      <div className={styles.gridBackground} />
      
      {/* Decorative HUD Elements */}
      <div className={styles.reticleTopLeft} />
      <div className={styles.reticleTopRight} />
      <div className={styles.reticleBottomLeft} />
      <div className={styles.reticleBottomRight} />

      <div className={styles.ambientSpotlight} />

      <div className={styles.stickyContainer}>
        
        <div className={styles.contentWrapper}>
          <h2 className={styles.heading}>
            <span className={styles.prefix}>We engineer </span>
            <div className={styles.wordWindow}>
              <motion.ul 
                className={styles.wordList} 
                animate={{ y: targetY }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                {items.map((item, i) => (
                  <li key={i} className={styles.wordItem}>{item.word}.</li>
                ))}
              </motion.ul>
            </div>
          </h2>

          <div className={styles.microCopyContainer}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={styles.microCopy}
              >
                <div className={styles.specLabel}>SPEC // {(activeIndex + 1).toString().padStart(2, '0')}</div>
                <p>{items[activeIndex].desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
