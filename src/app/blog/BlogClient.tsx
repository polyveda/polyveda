'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './page.module.css';

const CATEGORIES = ['All', 'Sustainability', 'Engineering', 'Logistics'];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 18, delay: i * 0.07 } })
};

export default function BlogPage({ posts }: { posts: any[] }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  const featured = posts.length > 0 ? posts[0] : null;
  const rest = featured ? filtered.filter(p => p.slug !== featured.slug) : filtered;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'Insights & Engineering | Polyveda',
    'publisher': { '@type': 'Organization', 'name': 'Polyveda' }
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Page header ── */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <motion.span className={styles.eyebrow}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            Insights &amp; Engineering
          </motion.span>
          <motion.h1 className={styles.title}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.2 }}>
            Ideas from the factory floor.
          </motion.h1>
          <motion.div className={styles.subtitle}
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 70, damping: 16, delay: 0.34 }}>
            Technical perspectives on industrial packaging, supply chain durability, and the shift to returnable logistics.
          </motion.div>
        </div>
      </header>

      {/* ── Featured post ── */}
      {featured && (
        <section className={styles.featuredSection}>
          <div className={styles.container}>
            <Link href={`/blog/${featured.slug}`} className={styles.featuredCard}>
              <div className={styles.featuredContent}>
                <span className={styles.featuredEyebrow}>{featured.category}</span>
                <h2 className={styles.featuredTitle}>{featured.title}</h2>
                <p className={styles.featuredExcerpt}>{featured.excerpt}</p>
                <div className={styles.readMore}>
                  <span>Read article</span>
                  <ArrowRight size={16} />
                </div>
              </div>
              {featured.coverImage && (
                <div className={styles.featuredImage}>
                  <img
                    src={featured.coverImage}
                    alt={featured.title}
                    style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '4px' }}
                  />
                </div>
              )}
            </Link>
          </div>
        </section>
      )}

      {/* ── Category filter + grid ── */}
      <section className={styles.listSection}>
        <div className={styles.container}>
          <div className={styles.filterRow}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── Post list ── */}
          <motion.div className={styles.grid} initial="hidden" animate="visible">
            {rest.map((post, i) => (
              <motion.div key={post.slug} variants={fadeUp} custom={i}>
                <Link href={`/blog/${post.slug}`} className={styles.card}>
                  {post.coverImage && (
                    <div className={styles.cardImage}>
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    </div>
                  )}
                  <article className={styles.cardContent}>
                    <div className={styles.meta}>
                      <span className={styles.category}>{post.category}</span>
                      <span className={styles.date}>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h2 className={styles.postTitle}>{post.title}</h2>
                    <p className={styles.excerpt}>{post.excerpt}</p>
                    <div className={styles.readMore}>
                      <span>Read article</span>
                      <ArrowRight size={16} />
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
