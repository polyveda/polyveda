'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import styles from './ScrollTextFade.module.css';

export interface ScrollTextItem {
  title: string;
  subtitle?: string;
}

interface ScrollTextFadeProps {
  items: ScrollTextItem[];
}

export function ScrollTextFade({ items }: ScrollTextFadeProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const [viewportH, setViewportH] = useState(800);
  const [itemPositions, setItemPositions] = useState<{ top: number; height: number }[]>([]);

  // Track window height
  useEffect(() => {
    const update = () => setViewportH(window.innerHeight);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Measure heights and positions of each item for exact centering
  useEffect(() => {
    const measure = () => {
      if (!innerRef.current) return;
      const children = Array.from(innerRef.current.children) as HTMLElement[];
      const pos = children.map(c => ({ top: c.offsetTop, height: c.offsetHeight }));
      setItemPositions(pos);
    };
    
    measure();
    const obs = new ResizeObserver(measure);
    if (innerRef.current) obs.observe(innerRef.current);
    
    return () => obs.disconnect();
  }, [items]);

  // Framer Motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end']
  });

  const rawIndex = useTransform(scrollYProgress, [0, 1], [0, Math.max(0, items.length - 1)]);
  const activeIndex = useSpring(rawIndex, { damping: 40, stiffness: 250, mass: 0.5 });

  // Calculate the continuous Y translation required to keep the active index centered
  const yOffset = useTransform(activeIndex, (v) => {
    if (itemPositions.length !== items.length || items.length === 0) return viewportH / 2;
    
    const floorIdx = Math.min(Math.floor(v), items.length - 1);
    const ceilIdx = Math.min(floorIdx + 1, items.length - 1);
    const frac = v - floorIdx;
    
    const floorPos = itemPositions[floorIdx];
    const ceilPos = itemPositions[ceilIdx];
    
    const activeTop = floorPos.top + (ceilPos.top - floorPos.top) * frac;
    const activeH = floorPos.height + (ceilPos.height - floorPos.height) * frac;
    
    return viewportH / 2 - activeTop - activeH / 2;
  });

  return (
    <div ref={outerRef} className={styles.outer} style={{ height: `${items.length * 85}vh` }}>
      <div className={styles.sticky} style={{ height: viewportH }}>
        <motion.div ref={innerRef} className={styles.inner} style={{ y: yOffset }}>
          {items.map((item, i) => (
            <ScrollItem key={i} item={item} index={i} activeIndex={activeIndex} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ScrollItem({ item, index, activeIndex }: { item: ScrollTextItem, index: number, activeIndex: MotionValue<number> }) {
  const dist = useTransform(activeIndex, v => Math.abs(v - index));
  
  const opacity = useTransform(dist, v => Math.max(0.15, 1 - v * 0.85));
  const scale = useTransform(dist, v => Math.max(0.92, 1 - v * 0.04));
  
  // The accent underlines/glows only appear closely around distance = 0
  const accentProg = useTransform(dist, v => Math.max(0, 1 - v * 1.5));
  
  const lineWidth = useTransform(accentProg, v => `${v * 40}%`);
  const glowOpacity = useTransform(accentProg, v => v * 0.2);

  return (
    <motion.div className={styles.item} style={{ opacity, scale }}>
      <div className={styles.titleWrapper}>
        <motion.div className={styles.glow} style={{ opacity: glowOpacity }} />
        <h2 className={styles.title}>{item.title}</h2>
        <motion.div className={styles.line} style={{ width: lineWidth, opacity: accentProg }} />
      </div>
      {item.subtitle && <p className={styles.subtitle}>{item.subtitle}</p>}
    </motion.div>
  );
}
