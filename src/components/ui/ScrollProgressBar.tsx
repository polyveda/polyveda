'use client';

import { motion, useScroll, useReducedMotion } from 'framer-motion';

// Thin teal progress bar at the very top of the viewport that fills as the user scrolls.
// Respects prefers-reduced-motion — hidden completely if reduced motion is preferred.
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'var(--color-accent)',
        transformOrigin: 'left center',
        zIndex: 9999,
        boxShadow: '0 0 8px var(--color-accent)',
      }}
    />
  );
}
