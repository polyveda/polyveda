'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface BlockRevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number;
  blockColor?: string;
}

export function BlockReveal({ 
  children, 
  width = 'fit-content', 
  delay = 0,
  blockColor = 'var(--color-accent)'
}: BlockRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <div ref={ref} style={{ position: 'relative', width, overflow: 'hidden', display: width === 'fit-content' ? 'inline-block' : 'block' }}>
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.1, delay: delay + 0.3 }}
      >
        {children}
      </motion.div>
      
      <motion.div
        variants={{
          hidden: { x: '-100%' },
          visible: { x: '100%' }
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.8, ease: "easeInOut", delay: delay }}
        style={{
          position: 'absolute',
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          background: blockColor,
          zIndex: 20,
        }}
      />
    </div>
  );
}
