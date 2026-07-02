'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import styles from './FeatureFlipper.module.css';

export interface FlipperItem {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  imageSrc: string;
}

interface FeatureFlipperProps {
  item1: FlipperItem;
  item2: FlipperItem;
}

export function FeatureFlipper({ item1, item2 }: FeatureFlipperProps) {
  // null = neutral (50/50), 0 = item1 expanded, 1 = item2 expanded
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const items = [item1, item2];

  return (
    <div 
      className={styles.container}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {items.map((item, index) => {
        const isHovered = hoveredIndex === index;
        const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;
        
        // When one is hovered, it gets flex 3 (75%), the other gets flex 1 (25%).
        // When neutral, both get flex 2 (50%).
        const flexValue = isHovered ? 3 : isOtherHovered ? 1 : 2;

        return (
          <motion.div
            key={item.id}
            className={`${styles.card} ${isHovered ? styles.active : ''}`}
            onMouseEnter={() => setHoveredIndex(index)}
            // onClick for mobile tap support
            onClick={() => setHoveredIndex(isHovered ? null : index)}
            animate={{ flex: flexValue }}
            transition={{ type: 'spring', stiffness: 180, damping: 22, mass: 0.8 }}
          >
            {/* Background Image Reveal */}
            <motion.div 
              className={styles.bgImage}
              initial={false}
              animate={{ 
                opacity: isHovered ? 0.35 : 0,
                scale: isHovered ? 1 : 1.15
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ backgroundImage: `url(${item.imageSrc})` }}
            />
            
            <div className={styles.bgGradient} />

            <div className={styles.cardInner}>
              <div className={styles.topRow}>
                <motion.span 
                  className={styles.eyebrow}
                  animate={{ opacity: isOtherHovered ? 0 : 1 }}
                >
                  {item.eyebrow}
                </motion.span>
                <motion.div 
                  className={styles.iconWrapper}
                  animate={{ 
                    backgroundColor: isHovered ? 'var(--color-accent)' : 'rgba(255, 255, 255, 0.05)',
                    borderColor: isHovered ? 'var(--color-accent)' : 'rgba(255, 255, 255, 0.1)',
                    color: isHovered ? 'var(--color-bg-dark)' : 'var(--color-bg-light)'
                  }}
                >
                  <item.icon size={20} strokeWidth={isHovered ? 2 : 1.5} />
                </motion.div>
              </div>

              <div className={styles.bottomContent}>
                <h3 className={styles.title}>{item.title}</h3>
                
                {/* Description Reveal */}
                <AnimatePresence mode="wait">
                  {isHovered && (
                    <motion.div
                      className={styles.descriptionWrapper}
                      initial={{ opacity: 0, height: 0, y: 10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: 10 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <p className={styles.description}>
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
