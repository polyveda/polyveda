'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Sustainability.module.css';

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function SustainabilityClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, margin: '-10%' });

  return (
    <main className={styles.page}>
      {/* ── Hero ── */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroGridBackground} />
        <div className={styles.container}>
          <motion.span 
            className={styles.eyebrow}
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1 }}
          >
            Environmental Impact
          </motion.span>
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 48 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.2 }}
          >
            Engineered for the <br />circular economy.
          </motion.h1>
          <motion.p 
            className={styles.heroSub}
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.34 }}
          >
            Switching from single-use corrugated cardboard to Polyveda's Returnable Transit Packaging (RTP) eliminates tons of supply chain waste while dramatically lowering long-term packaging costs.
          </motion.p>
        </div>
      </section>

      {/* ── Core Principles ── */}
      <section className={styles.principlesSection} ref={contentRef}>
        <div className={styles.container}>
          <div className={styles.grid}>
            
            <motion.div className={styles.card} variants={fadeUp} initial="hidden" animate={contentInView ? "visible" : "hidden"} transition={{ delay: 0.1 }}>
              <div className={styles.cardNumber}>01</div>
              <h2 className={styles.cardTitle}>100% Recyclable</h2>
              <p className={styles.cardText}>
                Our polypropylene (PP) materials are 100% recyclable. At the end of their multi-year lifecycle, our boxes and trays can be ground down and re-extruded into new industrial products, ensuring zero landfill impact.
              </p>
            </motion.div>

            <motion.div className={styles.card} variants={fadeUp} initial="hidden" animate={contentInView ? "visible" : "hidden"} transition={{ delay: 0.2 }}>
              <div className={styles.cardNumber}>02</div>
              <h2 className={styles.cardTitle}>50x Lifespan</h2>
              <p className={styles.cardText}>
                A single Polyveda PP corrugated box replaces up to 50 single-use cardboard boxes. It resists moisture, oil, and impacts, surviving the harshest logistics loops without degrading or collapsing.
              </p>
            </motion.div>

            <motion.div className={styles.card} variants={fadeUp} initial="hidden" animate={contentInView ? "visible" : "hidden"} transition={{ delay: 0.3 }}>
              <div className={styles.cardNumber}>03</div>
              <h2 className={styles.cardTitle}>Lower Carbon Footprint</h2>
              <p className={styles.cardText}>
                Because our packaging is exceptionally lightweight yet strong, it reduces the overall payload weight in transit. This directly contributes to lower fuel consumption and reduced greenhouse gas emissions in your logistics network.
              </p>
            </motion.div>

            <motion.div className={styles.card} variants={fadeUp} initial="hidden" animate={contentInView ? "visible" : "hidden"} transition={{ delay: 0.4 }}>
              <div className={styles.cardNumber}>04</div>
              <h2 className={styles.cardTitle}>Cleanroom Safe</h2>
              <p className={styles.cardText}>
                Unlike paper cardboard which sheds dust and particulate matter, PP corrugated board is cleanroom-compatible. It ensures sterile, dust-free environments for pharmaceutical and electronic component manufacturing.
              </p>
            </motion.div>

          </div>
        </div>
      </section>
      
      {/* ── Closing CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Ready to audit your packaging waste?</h2>
          <p className={styles.ctaText}>Contact our engineering team to calculate the ROI and carbon reduction of switching your logistics loop to Polyveda RTP.</p>
          <a href="/contact" className={styles.ctaButton}>Request an Audit</a>
        </div>
      </section>
    </main>
  );
}
