'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import styles from './Capabilities.module.css';

const STEPS = [
  { 
    num: '01', 
    title: 'CAD Design & Prototyping', 
    body: 'Bring us your heaviest, most awkward component. Our engineers model a custom solution around it using CAD software and digital cutting tables. You get a fully functional physical prototype within days, well before we touch production tooling.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200'
  },
  { 
    num: '02', 
    title: 'Custom Die-Cutting', 
    body: 'Flatbed and rotary die-cutting machines hold exact tolerances for complex shapes. Intricate folds, precision locking tabs, custom internal dividers — every cut is engineered around the flute orientation to preserve structural integrity.',
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80&w=1200'
  },
  { 
    num: '03', 
    title: 'Ultrasonic Welding & Edge Sealing', 
    body: 'We fuse PP sheets at the molecular level using ultrasonic welding. It is stronger than any adhesive and cleaner than any staple. Edge-sealing closes open flutes completely, blocking moisture, bacteria, and dust. Required for food, pharma, and semiconductor environments.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1200'
  },
  { 
    num: '04', 
    title: 'Screen & Digital Printing', 
    body: 'Multi-color screen printing for high-volume runs, high-resolution digital printing for complex graphics or serialized data. UV-cured inks bond directly to the PP substrate and remain legible after years of industrial washing and harsh handling.',
    image: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?auto=format&fit=crop&q=80&w=1200'
  },
];

function TimelineItem({ step, i }: { step: typeof STEPS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const isEven = i % 2 === 0;

  return (
    <motion.div ref={ref} className={`${styles.timelineItem} ${isEven ? '' : styles.timelineReversed}`}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', stiffness: 60, damping: 20 }}>
      
      {/* Number Node */}
      <div className={styles.timelineNodeWrapper}>
        <div className={styles.timelineNode}>{step.num}</div>
      </div>

      <div className={styles.timelineContent}>
        {/* Text */}
        <div className={styles.textContent}>
          <h2 className={styles.stepTitle}>{step.title}</h2>
          <p className={styles.stepBody}>{step.body}</p>
        </div>
        
        {/* Image */}
        <div className={styles.imageContent}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={step.image} alt={step.title} className={styles.stepImage} />
          <div className={styles.imageHud} />
        </div>
      </div>

    </motion.div>
  );
}

export default function CapabilitiesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const specsRef = useRef<HTMLDivElement>(null);
  const specsInView = useInView(specsRef, { once: true, margin: '-60px' });

  return (
    <main className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroGridBackground} />
        <div className={styles.container}>
          <motion.span className={styles.eyebrow} initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}>Conversion Capabilities</motion.span>
          <motion.h1 className={styles.heroTitle} initial={{ opacity: 0, y: 48 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.2 }}>
            From CAD file<br />to factory floor.
          </motion.h1>
          <motion.p className={styles.heroSub} initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.34 }}>
            Four core manufacturing processes. Each one optimized specifically for Polypropylene corrugated. We do not adapt methods from generalist sheet-metal or cardboard operations.
          </motion.p>
        </div>
      </section>

      {/* ── Tolerance Banner ── */}
      <section className={styles.toleranceBanner}>
        <div className={styles.container}>
          <div className={styles.toleranceContent}>
            <div className={styles.tolStat}>±0.5<span className={styles.tolUnit}>mm</span></div>
            <div className={styles.tolText}>
              <h3>Cutting tolerance. Every run. No exceptions.</h3>
              <p>Precision matters when your packaging has to interface with automated conveyors, robotic pick stations, and load-rated pallet systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className={styles.timelineSection}>
        <div className={styles.container}>
          <div className={styles.timelineWrapper}>
            <div className={styles.centerLine} />
            {STEPS.map((step, i) => <TimelineItem key={step.num} step={step} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── Customization Specs (Bento Grid) ── */}
      <section className={styles.specsSection} ref={specsRef}>
        <div className={styles.container}>
          <motion.h2 className={styles.sectionTitle} 
            initial={{ opacity: 0, y: 20 }} animate={specsInView ? { opacity: 1, y: 0 } : {}}>
            Technical Customizations
          </motion.h2>
          
          <div className={styles.bentoGrid}>
            
            <motion.div className={styles.bentoCard}
              initial={{ opacity: 0, scale: 0.95 }} animate={specsInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.1 }}>
              <div className={styles.bentoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
              </div>
              <h3>Thickness Range</h3>
              <p className={styles.bentoLargeText}>2mm - 20mm</p>
              <p>Available in various grammages (GSM) to balance structural integrity with overall tare weight.</p>
            </motion.div>

            <motion.div className={`${styles.bentoCard} ${styles.bentoCardDark}`}
              initial={{ opacity: 0, scale: 0.95 }} animate={specsInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.2 }}>
              <h3>Color Systems</h3>
              <div className={styles.colorSwatches}>
                <div className={styles.swatch} style={{ backgroundColor: '#1A365D' }} title="Blue" />
                <div className={styles.swatch} style={{ backgroundColor: '#171923' }} title="Black" />
                <div className={styles.swatch} style={{ backgroundColor: '#718096' }} title="Grey" />
                <div className={styles.swatch} style={{ backgroundColor: '#C53030' }} title="Red" />
                <div className={styles.swatch} style={{ backgroundColor: '#F7FAFC' }} title="White" />
              </div>
              <p>Standard and custom pantone matching available for visual factory (5S) and brand compliance.</p>
            </motion.div>

            <motion.div className={styles.bentoCard}
              initial={{ opacity: 0, scale: 0.95 }} animate={specsInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.3 }}>
              <h3>Surface Treatment</h3>
              <p className={styles.bentoLargeText}>Corona Treated</p>
              <p>All sheets are electrically treated to increase surface energy, allowing screen and digital inks to bond permanently to the substrate.</p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Products We Make ── */}
      <section className={styles.productsWeSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Products we manufacture</h2>
          <div className={styles.productLinkGrid}>
            <Link href="/products/pp-corrugated-boxes" className={styles.productLink}>
              <span>PP Corrugated Boxes →</span>
            </Link>
            <Link href="/products/custom-pp-trays" className={styles.productLink}>
              <span>Custom PP Trays →</span>
            </Link>
            <Link href="/products/pp-trunks-crates" className={styles.productLink}>
              <span>PP Trunks & Crates →</span>
            </Link>
            <Link href="/products/floor-protection-sheets" className={styles.productLink}>
              <span>Floor Protection Sheets →</span>
            </Link>
            <Link href="/products/signage-retail-displays" className={styles.productLink}>
              <span>Signage & Retail Displays →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <h2 className={styles.ctaHeading}>Have a complex packaging challenge?</h2>
          <p className={styles.ctaSub}>Send us your component. We'll build a prototype that solves it.</p>
          <Link href="/contact" className={styles.ctaBtn}>Request a prototype</Link>
        </div>
      </section>

    </main>
  );
}
