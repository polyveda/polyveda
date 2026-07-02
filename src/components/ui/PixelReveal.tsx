'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './PixelReveal.module.css';

export function PixelReveal() {
  const [grid, setGrid] = useState({ rows: 0, cols: 0 });
  const [isVisible, setIsVisible] = useState(true);

  // ~50px per pixel block ensures a good balance between the pixelated effect 
  // and browser animation performance.
  const pixelSize = 50; 

  useEffect(() => {
    const calculateGrid = () => {
      const cols = Math.ceil(window.innerWidth / pixelSize);
      const rows = Math.ceil(window.innerHeight / pixelSize);
      setGrid({ rows, cols });
    };

    calculateGrid();
    window.addEventListener('resize', calculateGrid);
    
    // Hide the container from the DOM entirely after the animation completes
    const timeout = setTimeout(() => setIsVisible(false), 2000);

    return () => {
      window.removeEventListener('resize', calculateGrid);
      clearTimeout(timeout);
    };
  }, []);

  if (!isVisible || grid.rows === 0) return null;

  const pixels = Array.from({ length: grid.rows * grid.cols });

  return (
    <div className={styles.container}>
      <div 
        className={styles.grid} 
        style={{ 
          gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
          gridTemplateRows: `repeat(${grid.rows}, 1fr)` 
        }}
      >
        {pixels.map((_, i) => {
          const r = Math.floor(i / grid.cols);
          const c = i % grid.cols;
          
          const centerRow = grid.rows / 2;
          const centerCol = grid.cols / 2;
          const dist = Math.sqrt(Math.pow(r - centerRow, 2) + Math.pow(c - centerCol, 2));
          const maxDist = Math.sqrt(Math.pow(centerRow, 2) + Math.pow(centerCol, 2));
          const normalizedDist = dist / maxDist;

          // Animates from center outwards
          const delay = normalizedDist * 0.4 + 0.1; 

          return (
            <motion.div
              key={i}
              className={styles.pixel}
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay }}
            />
          );
        })}
      </div>
    </div>
  );
}
