import React from 'react';
import styles from './Legal.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Polyveda',
  description: 'Polyveda Privacy Policy outlining how we collect, use, and protect your data.',
};

export default function PrivacyPolicy() {
  return (
    <div className={styles.legalPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last Updated: October 2026</p>

        <section className={styles.section}>
          <h2>1. Introduction</h2>
          <p>
            At Polyveda, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Information We Collect</h2>
          <p>
            <strong>Personal Data:</strong> We may collect personally identifiable information, such as your name, company name, email address, and telephone number when you voluntarily submit inquiries via our Contact Form or Enquiry Widget.
          </p>
          <p>
            <strong>Derivative Data:</strong> Our servers automatically collect information when you access the site, such as your IP address, browser type, operating system, and access times.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Use of Your Information</h2>
          <p>We may use the information we collect from you to:</p>
          <ul>
            <li>Respond to your customer service requests and business inquiries.</li>
            <li>Improve our website and B2B services.</li>
            <li>Monitor and analyze usage and trends to improve your experience with our site.</li>
            <li>Send you technical capability statements or quote estimates as requested.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Disclosure of Your Information</h2>
          <p>
            We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners and trusted affiliates.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Data Security</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at: <br />
            <strong>Email:</strong> legal@polyveda.com
          </p>
        </section>
      </div>
    </div>
  );
}
