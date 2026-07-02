import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h2 className={styles.logo}>Polyveda</h2>
          <p className={styles.desc}>
            Innovative Polypropylene (PP) Corrugated Packaging Solutions.
          </p>
        </div>
        <div className={styles.links}>
          <div className={styles.column}>
            <h3>Products</h3>
            <Link href="/products">Packaging Solutions</Link>
            <Link href="/products">Protection & Construction</Link>
            <Link href="/products">Display & Marketing</Link>
          </div>
          <div className={styles.column}>
            <h3>Industries</h3>
            <Link href="/industries">Automotive</Link>
            <Link href="/industries">E-Commerce</Link>
            <Link href="/industries">Logistics</Link>
          </div>
          <div className={styles.column}>
            <h3>Company</h3>
            <Link href="/about">About Us</Link>
            <Link href="/capabilities">Capabilities</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Polyveda. All rights reserved.</p>
        <div className={styles.legal}>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
