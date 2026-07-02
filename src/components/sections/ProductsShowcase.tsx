'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import styles from './ProductsShowcase.module.css';

const products = [
  {
    id: '01',
    slug: 'pp-corrugated-boxes',
    name: 'PP Corrugated Boxes',
    category: 'Packaging',
    tagline: 'Built to outlast cardboard by 50+ cycles.',
    description: 'Custom-designed from premium flute board. Moisture-resistant, superior strength-to-weight ratio, and fully collapsible for return logistics.',
    specs: ['2mm – 20mm Thickness', 'Custom Dimensions', 'Weatherproof'],
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="20" width="48" height="36" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 26L32 38L56 26" stroke="currentColor" strokeWidth="1.5" />
        <path d="M32 38V56" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 8L32 20L44 8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
        <path d="M8 20L20 8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M56 20L44 8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: '02',
    slug: 'custom-pp-trays',
    name: 'Custom PP Trays',
    category: 'Packaging',
    tagline: 'Zero movement. Zero damage.',
    description: 'Precision-engineered with CNC-cut custom cavities to cradle individual components. Available in ESD-safe conductive variants for electronics.',
    specs: ['CNC-Cut Cavities', 'ESD-Safe Options', 'Auto-line Ready'],
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="14" width="52" height="36" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <rect x="14" y="22" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="36" y="22" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <line x1="6" y1="42" x2="58" y2="42" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
        <circle cx="21" cy="29" r="4" stroke="currentColor" strokeWidth="1" />
        <circle cx="43" cy="29" r="4" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    id: '03',
    slug: 'pp-trunks-crates',
    name: 'PP Trunks & Crates',
    category: 'Heavy-Duty',
    tagline: 'Industrial strength. Reusable by design.',
    description: 'Collapsible heavy-duty trunks fitted with custom handles, lids, and EVA/EPE foam padding. Built for just-in-time automotive supply chains.',
    specs: ['Load-Bearing', 'Collapsible Design', 'Foam-Padded Interior'],
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="18" width="48" height="38" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="16" y="10" width="32" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <line x1="8" y1="30" x2="56" y2="30" stroke="currentColor" strokeWidth="1.5" />
        <line x1="20" y1="30" x2="20" y2="56" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="44" y1="30" x2="44" y2="56" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
        <rect x="26" y="38" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: '04',
    slug: 'floor-protection-sheets',
    name: 'Floor Protection Sheets',
    category: 'Construction',
    tagline: 'Protect marble, tile & granite during renovation.',
    description: 'High-quality corrugated PP sheets engineered to safeguard floors during heavy-duty construction and renovation. Impermeable to paint and adhesives.',
    specs: ['Impact-Resistant', 'Adhesive-Proof', 'Lightweight'],
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="40" width="52" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="6" y="30" width="52" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="6" y="22" width="52" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 10L32 4L46 10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 10L18 22" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M46 10L46 22" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M32 4L32 22" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    id: '05',
    slug: 'signage-retail-displays',
    name: 'Signage & Retail Displays',
    category: 'Display & Marketing',
    tagline: 'Printed. Weatherproof. Eye-catching.',
    description: 'Durable, weather-resistant PP signage for indoor and outdoor use. POS & POP display stands, and lightweight customizable exhibition stalls.',
    specs: ['Corona-Treated Print', 'Indoor / Outdoor', 'POS & POP Stands'],
    icon: (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="8" width="44" height="34" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <line x1="18" y1="18" x2="46" y2="18" stroke="currentColor" strokeWidth="1.5" />
        <line x1="18" y1="26" x2="38" y2="26" stroke="currentColor" strokeWidth="1" />
        <line x1="18" y1="32" x2="42" y2="32" stroke="currentColor" strokeWidth="1" />
        <line x1="32" y1="42" x2="32" y2="56" stroke="currentColor" strokeWidth="1.5" />
        <line x1="22" y1="56" x2="42" y2="56" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

const containerVariants: any = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

export function ProductsShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.gridBackground} />

      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.sectionLabel}>
            <span className={styles.labelLine} />
            PRODUCT CATALOGUE
            <span className={styles.labelLine} />
          </div>
          <h2 className={styles.heading}>
            What we <span className={styles.accent}>fabricate.</span>
          </h2>
          <p className={styles.subheading}>
            Every product is custom-engineered to your load requirements, industry standards, and dimensional specifications.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className={styles.card}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardNumber}>{product.id}</div>
                <div className={styles.categoryPill}>{product.category}</div>
              </div>

              <div className={styles.iconWrapper}>
                {product.icon}
              </div>

              <div className={styles.cardBody}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.tagline}>{product.tagline}</p>
                <p className={styles.description}>{product.description}</p>
              </div>

              <div className={styles.specsRow}>
                {product.specs.map((spec, i) => (
                  <span key={i} className={styles.specTag}>{spec}</span>
                ))}
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.footerLine} />
                <Link href={`/products/${product.slug}`} className={styles.learnMore}>
                  View Spec Sheet →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className={styles.ctaRow}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Link href="/products" className={styles.ctaButton}>
            Explore Full Catalogue
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
