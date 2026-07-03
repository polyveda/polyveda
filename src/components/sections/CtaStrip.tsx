'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import styles from './CtaStrip.module.css';

export function CtaStrip() {
  return (
    <div className={styles.ctaStrip}>
      <div className={styles.ctaCopy}>
        <h2>Ready to upgrade your packaging?</h2>
        <p>
          Custom-engineered PP corrugated solutions. From single-unit trays to
          high-volume returnable logistics systems, we build packaging that lasts.
        </p>
      </div>
      <div className={styles.ctaButtons}>
        <Link href="/contact">
          <Button variant="primary">Request Custom Quote</Button>
        </Link>
        <Link href="/capabilities">
          <Button variant="outline">View Capabilities</Button>
        </Link>
      </div>
    </div>
  );
}
