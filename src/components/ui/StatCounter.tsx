'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import styles from './StatCounter.module.css';

interface StatCounterProps {
  value: string;       // e.g. "50×" or "100%"
  label: string;
  note?: string;
}

export function StatCounter({ value, label, note }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isInView) setVisible(true);
  }, [isInView]);

  return (
    <div ref={ref} className={`${styles.stat} ${visible ? styles.visible : ''}`}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
      {note && <span className={styles.note}>{note}</span>}
    </div>
  );
}
