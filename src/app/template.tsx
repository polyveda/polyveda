'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Smooth, premium page-entry transition. 
// Uses opacity + slight vertical shift for an editorial feel.
// Respects prefers-reduced-motion per WCAG guidelines.
export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.45,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
