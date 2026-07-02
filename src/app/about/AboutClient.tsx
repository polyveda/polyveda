'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, Variants } from 'framer-motion';
import { StatCounter } from '@/components/ui/StatCounter';
import { FeatureFlipper } from '@/components/ui/FeatureFlipper';
import { Recycle, Factory } from 'lucide-react';
import styles from './About.module.css';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 18, delay: i * 0.08 }
  })
};

function AnimatedSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
}

import { ScrollTextFade } from '@/components/ui/ScrollTextFade';

const ABOUT_STATEMENTS = [
  {
    title: "No cardboard. No wood. No compromise.",
    subtitle: "Polyveda works exclusively in Polypropylene (PP) corrugated. We focus entirely on this one material because depth beats breadth in precision manufacturing."
  },
  {
    title: "The durability of industrial plastics.",
    subtitle: "PP corrugated gives you the form factor of traditional packaging with the resilience to survive supply chains that destroy cardboard in a single cycle."
  },
  {
    title: "Moisture and mold resistant.",
    subtitle: "It doesn't absorb moisture. It doesn't harbor mold. Whether in a freezer or on a humid shipping dock, the structural integrity remains perfectly intact."
  },
  {
    title: "Engineered around the load.",
    subtitle: "Our team understands the flute structure, weld behavior, and cutting tolerances of PP corrugated in ways that a generalist packaging supplier simply can't match."
  }
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <main className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.container}>
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            About Polyveda
          </motion.span>
          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 48 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.2 }}
          >
            We build packaging<br />that gets reused.
          </motion.h1>
          <motion.p
            className={styles.heroSub}
            initial={{ opacity: 0, y: 24 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.36 }}
          >
            Single-use cardboard works fine until it doesn't. Moisture, weight, and repeated handling cause cardboard to fail at exactly the moment your supply chain cannot afford it.
          </motion.p>
        </div>
      </section>

      {/* ── Mission Statements (ScrollTextFade) ── */}
      <ScrollTextFade items={ABOUT_STATEMENTS} />

      {/* ── Stats strip ── */}
      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <StatCounter
              value="50×"
              label="Average reuse cycles per unit"
              note="vs. 1–3 cycles for standard cardboard"
            />
            <StatCounter
              value="80%"
              label="Return freight volume saved"
              note="With our collapsible RTP designs"
            />
            <StatCounter
              value="100%"
              label="Recyclable at end of life"
              note="Category 5 PP — fully closed-loop"
            />
          </div>
        </div>
      </section>

      {/* ── PP Advantage ── */}
      <section className={styles.ppSection}>
        <div className={styles.container}>
          <AnimatedSection className={styles.ppGrid}>
            <motion.div variants={fadeUp} custom={0}>
              <span className={styles.sectionEyebrow}>Material science</span>
              <h2 className={styles.ppHeading}>Why PP corrugated wins where cardboard fails</h2>
            </motion.div>
            <div className={styles.ppCards}>
              {[
                { label: 'Moisture', body: 'PP absorbs zero moisture. Cardboard can absorb up to 30% of its own weight in water, which causes collapse, mold, and load damage. In humid shipping containers, this is a frequent source of costly claims.' },
                { label: 'International shipping', body: 'Wood packaging requires heat treatment and ISPM 15 certification for cross-border shipments. PP corrugated requires neither. No quarantine delays, no compliance paperwork, no fumigation costs.' },
                { label: 'Cleanroom compatibility', body: 'Open paper flutes shed cellulose particles that contaminate semiconductor and pharmaceutical environments. Our sealed-edge PP sheets generate zero particulate — fully cleanroom-compatible from day one.' },
                { label: 'Wash-down resistance', body: 'PP withstands aggressive chemical sanitization and high-temperature steam cleaning. Food-grade and pharma-grade applications can run the same crates through a full industrial wash cycle without degradation.' },
              ].map((item, i) => (
                <motion.div key={i} className={styles.ppCard} variants={fadeUp} custom={i + 1}>
                  <span className={styles.ppCardLabel}>{item.label}</span>
                  <p className={styles.ppCardBody}>{item.body}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Core Pillars (Feature Flipper) ── */}
      <section className={styles.ppSection} style={{ borderTop: 'none', paddingBottom: '120px' }}>
        <div className={styles.container}>
          <AnimatedSection>
            <FeatureFlipper 
              item1={{
                id: 'sustain',
                eyebrow: 'Sustainability',
                title: 'Zero to Landfill.',
                description: 'The most eco-friendly packaging is the one that doesn\'t get thrown away after a single use. Polypropylene is a Category 5 recyclable plastic. At the end of its working life, it gets ground down and remoulded into new products. This means no landfill and no incineration.',
                icon: Recycle,
                imageSrc: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1200&auto=format&fit=crop'
              }}
              item2={{
                id: 'engineer',
                eyebrow: 'Engineering',
                title: 'Built to Survive.',
                description: 'Cardboard fails when it gets wet or stacked too high. We engineer PP corrugated to survive aggressive chemical wash-downs, high-humidity cold chains, and cross-border transport without quarantine delays.',
                icon: Factory,
                imageSrc: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop'
              }}
            />
          </AnimatedSection>
        </div>
      </section>

      {/* ── Internal Links Strip ── */}
      <section className={styles.internalLinksSection}>
        <div className={styles.container}>
          <div className={styles.internalLinksGrid}>
            <Link href="/capabilities" className={styles.internalLinkCard}>
              <span className={styles.internalLinkLabel}>Manufacturing</span>
              <h3>See how we fabricate it →</h3>
              <p>CAD design, die-cutting, ultrasonic welding, and precision printing — our four core processes for PP corrugated.</p>
            </Link>
            <Link href="/products" className={styles.internalLinkCard}>
              <span className={styles.internalLinkLabel}>Product Range</span>
              <h3>Browse the full range →</h3>
              <p>PP corrugated boxes, custom trays, heavy-duty crates, floor protection sheets, and retail displays.</p>
            </Link>
            <Link href="/industries" className={styles.internalLinkCard}>
              <span className={styles.internalLinkLabel}>Industries</span>
              <h3>Find your sector →</h3>
              <p>Automotive, electronics, e-commerce, healthcare, construction, and business logistics.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <AnimatedSection className={styles.ctaInner}>
            <motion.h2 className={styles.ctaHeading} variants={fadeUp} custom={0}>
              Ready to stop buying boxes?
            </motion.h2>
            <motion.p className={styles.ctaSub} variants={fadeUp} custom={1}>
              Talk to our team about a returnable packaging system built around your load.
            </motion.p>
            <motion.div variants={fadeUp} custom={2}>
              <Link href="/contact" className={styles.ctaBtn}>Talk to an engineer</Link>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

    </main>
  );
}
