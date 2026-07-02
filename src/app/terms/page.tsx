import React from 'react';
import styles from '../privacy-policy/Legal.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Polyveda',
  description: 'Terms and Conditions for Polyveda website usage and B2B packaging services.',
};

export default function Terms() {
  return (
    <div className={styles.legalPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Terms & Conditions</h1>
        <p className={styles.lastUpdated}>Last Updated: October 2026</p>

        <section className={styles.section}>
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing this website, you agree to be bound by these Terms and Conditions and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on Polyveda's website for personal, non-commercial transitory viewing only.
          </p>
          <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul>
            <li>Modify or copy the materials;</li>
            <li>Use the materials for any commercial purpose, or for any public display;</li>
            <li>Remove any copyright or other proprietary notations from the materials;</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. Disclaimer</h2>
          <p>
            The materials on Polyveda's website are provided on an 'as is' basis. Polyveda makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Limitations</h2>
          <p>
            In no event shall Polyveda or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Polyveda's website.
          </p>
        </section>
      </div>
    </div>
  );
}
