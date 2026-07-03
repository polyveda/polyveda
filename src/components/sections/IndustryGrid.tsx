'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from './IndustryGrid.module.css';
import { motion, useInView, useMotionValue, animate, useTransform, MotionValue } from 'framer-motion';
import { HardHat, Briefcase, Car, ShoppingCart, Cpu, ShieldPlus } from 'lucide-react';

const industries = [
  { id: 'automotive',   title: 'Automotive',       desc: 'Returnable packaging for just-in-time delivery systems.',            icon: Car },
  { id: 'ecommerce',    title: 'E-Commerce',        desc: 'Lightweight shipping containers reducing freight costs.',             icon: ShoppingCart },
  { id: 'electronics',  title: 'Electronics',       desc: 'ESD-safe conductive PP boxes and anti-static trays.',                icon: Cpu },
  { id: 'healthcare',   title: 'Healthcare',        desc: 'Food-grade PP boxes with water-resistant surfaces.',                 icon: ShieldPlus },
  { id: 'construction', title: 'Construction',      desc: 'Heavy-duty impact resistant corrugated sheets for site protection.', icon: HardHat },
  { id: 'logistics',    title: 'Business Workflow', desc: 'Streamlined B2B logistics and automated returnable supply chains.',  icon: Briefcase },
];

const TOTAL = industries.length;

// Cover Flow Mathematics
const TILT_DEG = 42;
const CENTER_GAP = 240; 
const OVERLAP = 110; 

// The individual 3D Card component
function CoverFlowCard({ 
  absIndex, 
  rawActive, 
  ind, 
  realIndex,
  isDragging,
  onClick,
  isActive
}: { 
  absIndex: number, 
  rawActive: MotionValue<number>, 
  ind: typeof industries[0], 
  realIndex: number,
  isDragging: React.MutableRefObject<boolean>,
  onClick: () => void,
  isActive: boolean
}) {
  const Icon = ind.icon;
  const indexStr = String(realIndex + 1).padStart(2, '0');

  // Continuous offset calculation
  const offsetValue = useTransform(rawActive, (currentActive) => absIndex - currentActive);

  // X Translation: center gap for the first card, then smaller overlap for subsequent cards
  const x = useTransform(offsetValue, (offset) => {
    const absOffset = Math.abs(offset);
    const sign = Math.sign(offset);
    let dist = 0;
    if (absOffset <= 1) {
      dist = absOffset * CENTER_GAP;
    } else {
      dist = CENTER_GAP + (absOffset - 1) * OVERLAP;
    }
    return sign * dist;
  });

  // Y-Rotation: fold inwards
  const rotateY = useTransform(offsetValue, (offset) => {
    const sign = Math.sign(offset);
    const clamped = Math.min(Math.abs(offset), 1);
    return -sign * clamped * TILT_DEG;
  });

  // Scale: Active is 1, inactive shrinks to 0.75
  const scale = useTransform(offsetValue, (offset) => {
    const clamped = Math.min(Math.abs(offset), 1);
    return 1 - (clamped * 0.25);
  });
  
  // Z-Index: Highest in the center
  const zIndex = useTransform(offsetValue, (offset) => {
    return 50 - Math.round(Math.abs(offset) * 10);
  });

  // Opacity: Fully opaque for the center and immediate sides, fade out at the edges
  const opacity = useTransform(offsetValue, (offset) => {
    const abs = Math.abs(offset);
    if (abs <= 2) return 1;
    return Math.max(0, 1 - (abs - 2)); // Fades out between offset 2 and 3
  });

  // Derive an active state boolean strictly for styling the gradient vs translucent glass
  const [isActiveState, setIsActiveState] = useState(false);
  useEffect(() => {
    return offsetValue.on("change", (v) => {
      setIsActiveState(Math.abs(v) < 0.5);
    });
  }, [offsetValue]);

  return (
    <motion.div
      className={`${styles.card3d} ${isActiveState ? styles.cardActive : styles.cardInactive}`}
      style={{ x, rotateY, scale, zIndex, opacity }}
      onClick={() => {
        if (!isDragging.current && !isActive) {
          onClick();
        }
      }}
    >
      <div
        className={styles.cardInner}
      >
        <span className={styles.ghostIndex} aria-hidden>{indexStr}</span>

        <div className={styles.cardTop}>
          <div className={styles.iconWrapper}>
            <Icon size={22} strokeWidth={1.5} className={styles.vectorIcon} />
          </div>
          <span className={styles.indexLabel}>{indexStr}</span>
        </div>

        <div className={styles.cardBody}>
          <h3 className={styles.cardTitle}>{ind.title}</h3>
          <p className={styles.cardDesc}>{ind.desc}</p>
        </div>

        <div className={styles.accentLine} aria-hidden />
      </div>
    </motion.div>
  );
}


export function IndustryGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  // Infinite Loop logic: Start at a high multiple of TOTAL
  const START_INDEX = 1000 * TOTAL;
  const [active, setActive] = useState(START_INDEX);
  
  // Spring drives the fluid drag and snap animations
  const rawActive = useMotionValue(START_INDEX);

  const dragStartX = useRef(0);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);

  const goTo = useCallback((newActive: number) => {
    setActive(newActive);
    animate(rawActive, newActive, { type: 'spring', stiffness: 180, damping: 24, mass: 0.8 });
  }, [rawActive]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    hasDragged.current = false;
    dragStartX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - dragStartX.current;
    if (Math.abs(deltaX) > 5) {
      hasDragged.current = true; // Mark as dragged if moved more than 5px
    }
    // Fluid 1:1 drag tracking (1 card per 150px)
    rawActive.set(active - deltaX / 150);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const deltaX = e.clientX - dragStartX.current;
    const swipeThreshold = 40;
    
    if (deltaX < -swipeThreshold) {
      goTo(active + 1);
    } else if (deltaX > swipeThreshold) {
      goTo(active - 1);
    } else {
      goTo(active); // Snap back to current if threshold not met
    }
  };

  // Generate a rendering window around the active card (e.g., -3 to +3)
  const visibleIndices = Array.from({ length: 7 }, (_, i) => active - 3 + i);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>

        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.eyebrow}>Industry Applications</span>
          <h2 className={styles.heading}>Built for the sectors<br />that can't afford failure.</h2>
        </motion.div>

        {/* 3D Cover Flow Stage */}
        <motion.div
          className={styles.carouselTrack}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
        >
          {visibleIndices.map(absIndex => {
            const realIndex = ((absIndex % TOTAL) + TOTAL) % TOTAL;
            const ind = industries[realIndex];
            
            return (
              <CoverFlowCard
                key={absIndex}
                absIndex={absIndex}
                rawActive={rawActive}
                ind={ind}
                realIndex={realIndex}
                isDragging={hasDragged} // Pass hasDragged to the card instead of isDragging
                onClick={() => goTo(absIndex)}
                isActive={active === absIndex}
              />
            );
          })}
        </motion.div>

        {/* Pagination dots */}
        <motion.div
          className={styles.dots}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          {industries.map((_, i) => {
            const currentRealActive = ((active % TOTAL) + TOTAL) % TOTAL;
            return (
              <button
                key={i}
                className={`${styles.dot} ${i === currentRealActive ? styles.dotActive : ''}`}
                onClick={() => {
                  // Calculate shortest path to the clicked dot
                  let diff = i - currentRealActive;
                  if (diff > TOTAL / 2) diff -= TOTAL;
                  if (diff < -TOTAL / 2) diff += TOTAL;
                  goTo(active + diff);
                }}
                aria-label={`Go to ${industries[i].title}`}
              />
            );
          })}
        </motion.div>

        {/* Global CTA for Industries */}
        <motion.div
          className={styles.globalCta}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <Link href="/industries">
            <Button variant="outline">View All Industries</Button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
