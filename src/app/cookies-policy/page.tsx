import React from 'react';
import styles from '../privacy-policy/Legal.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookies Policy | Polyveda',
  description: 'Learn how Polyveda uses cookies to improve your browsing experience.',
};

export default function CookiesPolicy() {
  return (
    <div className={styles.legalPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Cookies Policy</h1>
        <p className={styles.lastUpdated}>Last Updated: October 2026</p>

        <section className={styles.section}>
          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide reporting information.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. How We Use Cookies</h2>
          <p>We use cookies for the following purposes:</p>
          <ul>
            <li><strong>Essential Cookies:</strong> These are required for the operation of our website. They include, for example, cookies that enable you to securely submit inquiries.</li>
            <li><strong>Analytical/Performance Cookies:</strong> They allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it.</li>
            <li><strong>Functionality Cookies:</strong> These are used to recognize you when you return to our website (e.g., remembering if you have accepted our cookie banner).</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Managing Cookies</h2>
          <p>
            You can set your browser not to accept cookies. However, in a few cases, some of our website features may not function as a result. You can use our Cookie Consent Banner to explicitly manage your preferences regarding non-essential tracking cookies on this site.
          </p>
        </section>
      </div>
    </div>
  );
}
