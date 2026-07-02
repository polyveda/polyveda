'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Quality.module.css';

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function QualityClient() {
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
            Quality & Compliance
          </motion.span>
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 48 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.2 }}
          >
            Zero tolerance <br />for failure.
          </motion.h1>
          <motion.p 
            className={styles.heroSub}
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.34 }}
          >
            From raw resin inspection to CNC precision cutting and electrostatic discharge (ESD) testing, our manufacturing process adheres to the strictest global standards.
          </motion.p>
        </div>
      </section>

      {/* ── Certifications & Standards ── */}
      <section className={styles.standardsSection} ref={contentRef}>
        <div className={styles.gridBackground} />
        <div className={styles.container}>
          <div className={styles.grid}>
            
            <motion.div className={styles.card} variants={fadeUp} initial="hidden" animate={contentInView ? "visible" : "hidden"} transition={{ delay: 0.1 }}>
              <div className={styles.iconWrapper}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h2 className={styles.cardTitle}>ISO 9001 Certified</h2>
              <p className={styles.cardText}>
                Our facilities operate under a rigorous ISO 9001 Quality Management System, ensuring every batch of PP corrugated material meets exact dimensional and tensile tolerances.
              </p>
            </motion.div>

            <motion.div className={styles.card} variants={fadeUp} initial="hidden" animate={contentInView ? "visible" : "hidden"} transition={{ delay: 0.2 }}>
              <div className={styles.iconWrapper}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <h2 className={styles.cardTitle}>ESD-Safe Manufacturing</h2>
              <p className={styles.cardText}>
                For electronics and semiconductor clients, we manufacture conductive and anti-static (ESD) PP packaging. Every batch is tested for surface resistivity to guarantee component protection.
              </p>
            </motion.div>

            <motion.div className={styles.card} variants={fadeUp} initial="hidden" animate={contentInView ? "visible" : "hidden"} transition={{ delay: 0.3 }}>
              <div className={styles.iconWrapper}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>
              <h2 className={styles.cardTitle}>CNC Precision Cutting</h2>
              <p className={styles.cardText}>
                We do not rely on manual cutting. Our custom trays and complex die-cuts are executed using automated CNC machinery, ensuring sub-millimeter accuracy for auto-assembly lines.
              </p>
            </motion.div>

            <motion.div className={styles.card} variants={fadeUp} initial="hidden" animate={contentInView ? "visible" : "hidden"} transition={{ delay: 0.4 }}>
              <div className={styles.iconWrapper}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                  <path d="M22 12A10 10 0 0 0 12 2v10z" />
                </svg>
              </div>
              <h2 className={styles.cardTitle}>In-House Lab Testing</h2>
              <p className={styles.cardText}>
                Our in-house QA lab performs edge crush tests (ECT), flat crush tests (FCT), and dynamic drop testing to validate the structural integrity of every prototype before mass production.
              </p>
            </motion.div>

          </div>
        </div>
      </section>
      
      {/* ── Closing CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Require specialized compliance?</h2>
          <p className={styles.ctaText}>Whether you need food-grade materials or specialized military-spec packaging, our engineers can formulate the exact PP blend you need.</p>
          <a href="/contact" className={styles.ctaButton}>Speak with an Engineer</a>
        </div>
      </section>
    </main>
  );
}
