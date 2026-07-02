'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import styles from './Products.module.css';
import { productsData } from '@/data/products';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 18, delay: i * 0.1 }
  })
};

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} className={className} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
      {children}
    </motion.div>
  );
}

export default function ProductsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <main className={styles.page}>
      {/* ── Hero ── */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.container}>
          <motion.span className={styles.eyebrow}
            initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}>
            Product Catalogue
          </motion.span>
          <motion.h1 className={styles.heroTitle}
            initial={{ opacity: 0, y: 48 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.2 }}>
            PP Corrugated Boxes, Trays<br />& Reusable Packaging.
          </motion.h1>
          <motion.p className={styles.heroSub}
            initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.34 }}>
            From high-volume logistics and cleanroom environments to heavy construction and retail. We manufacture precision PP corrugated solutions designed to outlast, outperform, and protect.
          </motion.p>
        </div>
      </section>

      {/* ── Products Grid ── */}
      <section className={styles.productsSection}>
        <div className={styles.container}>
          <div className={styles.productsGrid}>
            {productsData.map((p, i) => (
              <Reveal key={p.id}>
                <Link href={`/products/${p.id}`} style={{ textDecoration: 'none' }}>
                  <motion.div className={styles.productCard} variants={fadeUp} custom={i % 2}>
                    
                    <div className={styles.imageWrapper}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.image} alt={p.name} className={styles.productImage} />
                    </div>

                    <div className={styles.cardContent}>
                      <div className={styles.cardHeader}>
                        <span className={styles.categoryPill}>{p.category}</span>
                      </div>
                      
                      <h2 className={styles.cardTitle}>{p.name}</h2>
                      <p className={styles.cardTagline}>{p.tagline}</p>
                      <p className={styles.cardDesc}>{p.description}</p>
                      
                      <div className={styles.viewDetailsBtn}>
                        View Product Details
                        <svg className={styles.btnArrow} width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>

                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Industries ── */}
      <section className={styles.relatedSection}>
        <div className={styles.container}>
          <h2 className={styles.relatedHeading}>Industries we serve</h2>
          <p className={styles.relatedSub}>Our PP corrugated packaging is used across six major industrial sectors in India.</p>
          <div className={styles.relatedGrid}>
            <Link href="/industries#automotive" className={styles.relatedCard}>Automotive</Link>
            <Link href="/industries#electronics" className={styles.relatedCard}>Electronics & Semiconductor</Link>
            <Link href="/industries#ecommerce" className={styles.relatedCard}>E-Commerce & Retail</Link>
            <Link href="/industries#healthcare" className={styles.relatedCard}>Healthcare & Pharma</Link>
            <Link href="/industries#construction" className={styles.relatedCard}>Construction</Link>
            <Link href="/industries#logistics" className={styles.relatedCard}>Business Logistics</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
