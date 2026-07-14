'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Car, ShoppingCart, Cpu, ShieldPlus, HardHat, Briefcase } from 'lucide-react';
import styles from './Industries.module.css';

const INDUSTRIES = [
  { 
    id: 'automotive', 
    icon: Car, 
    title: 'Automotive', 
    headline: 'Just-In-Time means zero tolerance for damaged parts.', 
    body1: 'Engine blocks, transmission gears, and alternators. The components that feed assembly lines are heavy, irregularly shaped, and expensive to replace. Standard cardboard collapses under load and absorbs moisture, which corrodes metal surfaces in transit.', 
    body2: 'Our PP returnable crates are rated for these loads. Paired with custom die-cut dividers, they eliminate metal-on-metal contact and deliver consistent part presentation to robotic assembly systems.', 
    stat: '60 cycles', 
    statLabel: 'Typical RTP service life per unit',
    image: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80&w=1200'
  },
  { 
    id: 'ecommerce', 
    icon: ShoppingCart, 
    title: 'E-Commerce & Retail', 
    headline: 'Fulfillment centers run on space and speed.', 
    body1: "Every extra gram of packaging and every empty bin on the floor costs real money in high-velocity warehouses. Cardboard bins deform under conveyor stress and can't be reliably automated.", 
    body2: 'Our stack-and-nest PP bins reduce empty storage volume by up to 70%. They integrate directly with ASRS robotic retrieval systems and standard Euro pallet grids.', 
    stat: '70%', 
    statLabel: 'Floor space saved when empty bins are nested',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=1200'
  },
  { 
    id: 'electronics', 
    icon: Cpu, 
    title: 'Electronics & Semiconductor', 
    headline: 'One static discharge can write off a PCB worth thousands.', 
    body1: 'Cellulose fibres from cardboard shed particles that contaminate semiconductor cleanrooms. Standard plastics build up electrostatic charge that destroys sensitive circuitry.', 
    body2: 'Our ESD-safe packaging uses carbon-loaded PP to dissipate static charges. Sealed edges generate zero particulate matter, qualifying for ISO 5 cleanroom environments.', 
    stat: '10⁶–10⁸ Ω', 
    statLabel: 'Surface resistance of our ESD-safe PP sheet',
    image: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?auto=format&fit=crop&q=80&w=1200'
  },
  { 
    id: 'healthcare', 
    icon: ShieldPlus, 
    title: 'Healthcare & Pharma', 
    headline: 'Cold chain requires packaging that survives the freezer.', 
    body1: 'Traditional plastics crack at sub-zero temperatures. Paper absorbs moisture and harbors bacteria, creating hygiene risks in sterile medical supply chains.', 
    body2: 'Our food-grade PP boxes remain structurally sound from -20°C to +80°C. They withstand aggressive chemical wash-down and steam sanitization with no degradation or contamination risk.', 
    stat: '-20°C to +80°C', 
    statLabel: 'Operational temperature range, no degradation',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1200'
  },
  { 
    id: 'construction', 
    icon: HardHat, 
    title: 'Construction', 
    headline: 'Protect the surface, not just the component.', 
    body1: 'Marble, hardwood, epoxy resin — high-value floors get scratched by scaffolding feet and dropped tools before the client ever sets foot inside.', 
    body2: 'Our PP corrugated floor protection sheets absorb impact, spread load, and leave no marks. They cut easily on-site, lay flat without adhesive, and get reused across multiple projects.', 
    stat: '0 marks', 
    statLabel: 'Non-marking — tested on marble and hardwood',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200'
  },
  { 
    id: 'logistics', 
    icon: Briefcase, 
    title: 'Business Workflow', 
    headline: 'Returnable packaging is a system, not a product.', 
    body1: "The real saving isn't the crate itself. It's eliminating the procurement cycle that buys fresh cardboard every week. Companies that switch to RTP typically see packaging costs fall 30–40% in year one.", 
    body2: 'We design the full loop: outbound crate, return journey, wash cycle, redeployment. Collapsible designs cut return freight volumes by 80%. Custom printing enables fleet-wide asset tracking.', 
    stat: '30–40%', 
    statLabel: 'Typical packaging cost reduction in first year',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8ed74514f4?auto=format&fit=crop&q=80&w=1200'
  },
];

export default function IndustriesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <main className={styles.page}>
      
      {/* ── Hero ── */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroGridBackground} />
        <div className={styles.container}>
          <motion.span className={styles.eyebrow} 
            initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ delay: 0.1 }}>
            Industry Applications
          </motion.span>
          
          <motion.h1 className={styles.heroTitle} 
            initial={{ opacity: 0, y: 48 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} 
            transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.2 }}>
            Six sectors.<br />Zero single-use tolerance.
          </motion.h1>
          
          <motion.p className={styles.heroSub} 
            initial={{ opacity: 0, y: 24 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} 
            transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.34 }}>
            PP corrugated works across industries because the core problem is always the same: cardboard isn't built for the conditions your supply chain actually operates in.
          </motion.p>
        </div>
      </section>

      {/* ── Sticky Scroll Section ── */}
      <section className={styles.stickySection} ref={containerRef}>
        <div className={styles.stickyContainer}>
          
          {/* Left: Sticky Image Container */}
          <div className={styles.imageColumn}>
            <div className={styles.imageSticky}>
              {INDUSTRIES.map((ind, index) => {
                // Calculate the segment of scroll progress where this image should be visible
                const segmentSize = 1 / INDUSTRIES.length;
                const start = segmentSize * index;
                const end = segmentSize * (index + 1);
                
                // Opacity is 1 when within its segment, 0 otherwise
                const fade = 0.05;
                let input, output;
                
                if (index === 0) {
                  input = [0, end - fade, end];
                  output = [1, 1, 0];
                } else if (index === INDUSTRIES.length - 1) {
                  input = [start - fade, start, 1];
                  output = [0, 1, 1];
                } else {
                  input = [start - fade, start, end - fade, end];
                  output = [0, 1, 1, 0];
                }

                // eslint-disable-next-line react-hooks/rules-of-hooks
                const opacity = useTransform(scrollYProgress, input, output);

                // Add slight scale parallax
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const scale = useTransform(
                  scrollYProgress,
                  [start, end],
                  [1, 1.05]
                );

                return (
                  <motion.div 
                    key={`img-${ind.id}`}
                    className={styles.imageWrapper}
                    style={{ opacity, scale }}
                  >
                    <div className={styles.imageOverlay} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ind.image} alt={ind.title} className={styles.industryImage} />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: Scrolling Content Blocks */}
          <div className={styles.contentColumn}>
            {INDUSTRIES.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <div key={ind.id} className={styles.contentBlock}>
                  <div className={styles.blockInner}>
                    
                    <div className={styles.blockHeader}>
                      <div className={styles.blockTitleWrap}>
                        <Icon className={styles.blockIcon} size={24} strokeWidth={1.5} />
                        <h2 className={styles.blockTitle}>{ind.title}</h2>
                      </div>
                    </div>

                    <h3 className={styles.blockHeadline}>{ind.headline}</h3>
                    
                    <p className={styles.blockBody}>{ind.body1}</p>
                    <p className={styles.blockBody}>{ind.body2}</p>
                    
                    <div className={styles.statBox}>
                      <span className={styles.statVal}>{ind.stat}</span>
                      <span className={styles.statLabel}>{ind.statLabel}</span>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <h2 className={styles.ctaHeading}>Don't see your sector?</h2>
          <p className={styles.ctaSub}>If you move physical goods, we can likely improve how you pack them.</p>
          <Link href="/contact" className={styles.ctaBtn}>Talk to an engineer</Link>
        </div>
      </section>

    </main>
  );
}
