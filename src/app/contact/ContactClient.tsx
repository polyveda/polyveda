'use client';

import React from 'react';
import { MultiStepForm } from '@/components/ui/MultiStepForm';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <div className={styles.container}>
      <div className={styles.split}>
        <div className={styles.info}>
          <h1>Request a Custom Quote.</h1>
          <p>Tell us about your packaging challenges. Our engineering team will review your specifications and provide a detailed solution.</p>
          
          <div className={styles.contactDetails}>
            <div>
              <strong>Email</strong>
              <span>sales@polyveda.com</span>
            </div>
            <div>
              <strong>Phone</strong>
              <span>+1 (800) 123-4567</span>
            </div>
            <div>
              <strong>Headquarters</strong>
              <span>Industrial Tech Park, Building 4</span>
            </div>
          </div>
        </div>
        
        <div className={styles.formWrapper}>
          <MultiStepForm source="ContactPage" theme="light" />
        </div>
      </div>
    </div>
  );
}
