import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandColumn}>
          <h2 className={styles.logo}>Polyveda</h2>
          <p className={styles.desc}>
            Innovative Polypropylene (PP) Corrugated Packaging Solutions.
          </p>
          <div className={styles.contactInfo}>
            <p>123 Industrial Tech Park<br />Mumbai, IN 400001</p>
            <a href="mailto:sales@polyveda.com" className={styles.contactLink}>sales@polyveda.com</a>
            <a href="tel:+919876543210" className={styles.contactLink}>+91 98765 43210</a>
          </div>
        </div>
        
        <div className={styles.links}>
          <div className={styles.column}>
            <h3>Products</h3>
            <Link href="/products/pp-corrugated-boxes">PP Corrugated Boxes</Link>
            <Link href="/products/custom-pp-trays">Custom PP Trays</Link>
            <Link href="/products/pp-trunks-crates">PP Trunks & Crates</Link>
            <Link href="/products/floor-protection-sheets">Floor Protection Sheets</Link>
            <Link href="/products/signage-retail-displays">Signage & Displays</Link>
          </div>
          
          <div className={styles.column}>
            <h3>Industries</h3>
            <Link href="/industries#automotive">Automotive</Link>
            <Link href="/industries#electronics">Electronics</Link>
            <Link href="/industries#ecommerce">E-Commerce & Retail</Link>
            <Link href="/industries#healthcare">Healthcare & Pharma</Link>
            <Link href="/industries#construction">Construction</Link>
            <Link href="/industries#logistics">Logistics</Link>
          </div>
          
          <div className={styles.column}>
            <h3>Company</h3>
            <Link href="/about">About Us</Link>
            <Link href="/capabilities">Capabilities</Link>
            <Link href="/sustainability">Sustainability</Link>
            <Link href="/quality">Quality & Compliance</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
      
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Polyveda. All rights reserved.</p>
        <div className={styles.legal}>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
          <Link href="/cookies-policy">Cookies Policy</Link>
        </div>
      </div>
    </footer>
  );
}
