'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from 'framer-motion';
import styles from './KineticFlow.module.css';

// ─── Data ───────────────────────────────────────────────────────────────────
const CARDS = [
  { eyebrow: 'Material', number: '50×', title: 'Zero Landfill', desc: 'Category 5 PP corrugated designed for 50+ reuse cycles. At end of life, it becomes new product — not waste.' },
  { eyebrow: 'Compliance', number: '0%', title: 'No ISPM-15', desc: 'Export globally without heat treatment or quarantine delays. Eliminates cross-border friction entirely.' },
  { eyebrow: 'Resilience', number: '0%', title: 'Moisture Proof', desc: 'Maintains 100% structural integrity in cold-chain and humid dock conditions. Cardboard absorbs up to 30% its weight in water.' },
  { eyebrow: 'Sanitation', number: '100%', title: 'Washdown Ready', desc: 'Survives aggressive chemical sanitization and industrial high-heat steam cycles. Built for pharma and food grade.' },
  { eyebrow: 'Cleanroom', number: '0', title: 'Zero Particulate', desc: 'Sealed edge designs generate no cellulose or fibre particles — fully compatible with ISO Class 7 clean environments.' },
  { eyebrow: 'Engineering', number: '80%', title: 'Collapsed Volume', desc: 'Returnable Transit Packaging collapses flat for return freight, cutting backhaul costs by up to 80%.' },
];

// ─── Utility: Text scramble hook ─────────────────────────────────────────────
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@&';
function useScramble(target: string, trigger: boolean) {
  const [display, setDisplay] = useState(target);
  const frameRef = useRef(0);
  const iterRef = useRef(0);

  useEffect(() => {
    if (!trigger) { setDisplay(target); return; }
    iterRef.current = 0;
    const totalFrames = target.length * 3;
    const run = () => {
      setDisplay(
        target.split('').map((char, i) => {
          if (i < iterRef.current / 3) return char;
          return char === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('')
      );
      iterRef.current += 1;
      if (iterRef.current < totalFrames + 8) {
        frameRef.current = requestAnimationFrame(run);
      } else {
        setDisplay(target);
      }
    };
    frameRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(frameRef.current);
  }, [trigger, target]);

  return display;
}

// ─── Single Card Component (with 3D tilt + glow) ─────────────────────────────
function KineticCard({ card, index }: { card: typeof CARDS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position relative to card center
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], ['10deg', '-10deg']), springConfig);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], ['-10deg', '10deg']), springConfig);
  // Glow position as percentage strings for motion style
  const glowXPct = useSpring(useTransform(mx, [-0.5, 0.5], ['0%', '100%']), { stiffness: 100, damping: 20 });
  const glowYPct = useSpring(useTransform(my, [-0.5, 0.5], ['0%', '100%']), { stiffness: 100, damping: 20 });

  const scrambledTitle = useScramble(card.title, hovered);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(nx);
    my.set(ny);
  }, [mx, my]);

  const handleMouseLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
    setHovered(false);
  }, [mx, my]);

  return (
    <motion.div
      ref={cardRef}
      className={styles.card}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: (index % CARDS.length) * 0.08,
        type: 'spring',
        stiffness: 70,
        damping: 16,
      }}
    >
      {/* Dynamic spotlight that follows cursor — reactively via motion values */}
      <motion.div
        className={styles.cardGlow}
        style={{
          left: glowXPct,
          top: glowYPct,
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className={styles.cardInner}>
        {/* Eyebrow + Number */}
        <div className={styles.cardMeta}>
          <span className={styles.cardEyebrow}>{card.eyebrow}</span>
          <motion.span
            className={styles.cardNumber}
            animate={hovered ? { scale: 1.12, color: 'var(--color-accent)' } : { scale: 1, color: 'rgba(255,255,255,0.12)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {card.number}
          </motion.span>
        </div>

        {/* Title with scramble on hover */}
        <h3 className={styles.cardTitle}>{scrambledTitle}</h3>
        <p className={styles.cardDesc}>{card.desc}</p>


      </div>
    </motion.div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export function KineticFlow() {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: '-20%' });
  const [setWidth, setSetWidth] = useState(2000);

  // Global mouse parallax state for the whole section
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  // Subtle parallax on header and track from mouse position
  const headerX = useTransform(springX, [0, 1], [-12, 12]);
  const headerY = useTransform(springY, [0, 1], [-6, 6]);

  // Measure one loop's width
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const children = Array.from(trackRef.current.children) as HTMLElement[];
      const gap = window.innerWidth < 768 ? 16 : 24;
      let w = 0;
      for (let i = 0; i < CARDS.length; i++) {
        if (children[i]) w += children[i].offsetWidth + gap;
      }
      if (w > 0) setSetWidth(w);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Global mouse tracking for section parallax
  const handleSectionMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY]);

  // Auto-scroll with slow sinusoidal variation in speed (feels alive)
  const timeRef = useRef(0);
  useAnimationFrame((t, delta) => {
    timeRef.current += delta;
    if (!isDragging && isInView && setWidth > 0) {
      // Speed varies gently between 0.3 and 0.9 px/frame using a sine wave
      const speed = 0.5 + 0.25 * Math.sin(timeRef.current / 3000);
      const current = x.get();
      let next = current - speed * (delta / 16);
      if (next <= -setWidth) next += setWidth;
      x.set(next);
    }
  });

  // Handle wrap during drag
  const handleUpdate = useCallback((latest: Record<string, number | string>) => {
    if (isDragging && setWidth > 0) {
      const cx = parseFloat(String(latest.x));
      if (cx <= -setWidth) x.set(cx + setWidth);
      else if (cx >= 0) x.set(cx - setWidth);
    }
  }, [isDragging, setWidth, x]);

  // Section entrance animation variant
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <motion.section
      ref={sectionRef}
      className={styles.section}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      onMouseMove={handleSectionMouseMove}
    >
      {/* Ambient noise/grain layer */}
      <div className={styles.grainOverlay} />

      {/* Background accent orb that follows mouse faintly */}
      <motion.div
        className={styles.ambientOrb}
        style={{ x: springX, y: springY }}
      />

      {/* Header with mouse parallax */}
      <motion.div
        className={styles.header}
        style={{ x: headerX, y: headerY }}
      >


        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 60, damping: 14, delay: 0.2 }}
        >
          Six reasons cardboard<br />is the wrong choice.
        </motion.h2>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
        >
          Drag to explore
        </motion.p>
      </motion.div>

      {/* Kinetic draggable row */}
      <div className={styles.viewport}>
        <motion.div
          ref={trackRef}
          className={styles.track}
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -99999, right: 99999 }}
          dragElastic={0}
          dragMomentum={true}
          dragTransition={{ power: 0.15, timeConstant: 280 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          onUpdate={handleUpdate}
          whileTap={{ cursor: 'grabbing' }}
        >
          {[...CARDS, ...CARDS, ...CARDS].map((card, i) => (
            <KineticCard key={i} card={card} index={i} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
