'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  subtext?: string;
  align?: 'left' | 'center';
  light?: boolean; // true = light text (on dark bg)
  delay?: number;
}

export function SectionHeader({ eyebrow, heading, subtext, align = 'left', light = false, delay = 0 }: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className={`${styles.wrapper} ${align === 'center' ? styles.centered : ''} ${light ? styles.light : ''}`}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 80, damping: 18, delay }}
    >
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={styles.heading} dangerouslySetInnerHTML={{ __html: heading }} />
      {subtext && <p className={styles.subtext}>{subtext}</p>}
    </motion.div>
  );
}
