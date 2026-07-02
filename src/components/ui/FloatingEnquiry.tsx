'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareText, X, CheckCircle2, Phone } from 'lucide-react';
import { Button } from './Button';
import styles from './FloatingEnquiry.module.css';

export function FloatingEnquiry() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Auto open randomly between 15 and 45 seconds after initial load
  useEffect(() => {
    const minDelay = 15000;
    const maxDelay = 45000;
    const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1) + minDelay);
    
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, randomDelay);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName'),
      companyName: formData.get('companyName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      industry: formData.get('industry'),
      projectDetails: formData.get('projectDetails'),
      source: 'FloatingWidget'
    };

    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        const errorData = await res.json();
        alert(errorData.error || 'Failed to submit. Please try again or contact via WhatsApp.');
        setStatus('idle');
      }
    } catch (error) {
      alert('Network error. Please check your connection.');
      setStatus('idle');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset status after a delay so it doesn't jump while animating out
    setTimeout(() => setStatus('idle'), 300);
  };

  return (
    <div className={styles.widgetContainer}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.popupCard}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className={styles.popupHeader}>
              <h3>Quick Enquiry</h3>
              <button onClick={handleClose} className={styles.closeBtn} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <div className={styles.formBody}>
              {status === 'success' ? (
                <motion.div 
                  className={styles.successState}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle2 size={48} className={styles.successIcon} />
                  <h4>Request Received</h4>
                  <p>Our engineering team will review your details and contact you shortly.</p>
                  <Button onClick={handleClose} variant="outline">Close Window</Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Full Name</label>
                      <input type="text" name="fullName" className={styles.input} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Company</label>
                      <input type="text" name="companyName" className={styles.input} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Work Email</label>
                      <input type="email" name="email" className={styles.input} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Phone</label>
                      <input type="tel" name="phone" className={styles.input} required />
                    </div>
                    
                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                      <label className={styles.label}>Industry</label>
                      <select name="industry" className={styles.select} required defaultValue="">
                        <option value="" disabled>Select your industry...</option>
                        <option value="automotive">Automotive</option>
                        <option value="ecommerce">E-Commerce</option>
                        <option value="electronics">Electronics</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="other">Other Heavy Industry</option>
                      </select>
                    </div>

                    <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                      <label className={styles.label}>Project Details</label>
                      <textarea 
                        name="projectDetails"
                        className={styles.textarea} 
                        placeholder="Briefly describe your requirements..."
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={status === 'submitting'} className={styles.submitBtn}>
                    {status === 'submitting' ? 'Submitting...' : 'Send Enquiry'}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.fabContainer} style={{ display: isOpen ? 'none' : 'flex' }}>
        <a 
          href="https://wa.me/919876543210" 
          target="_blank" 
          rel="noopener noreferrer"
          className={`${styles.fab} ${styles.fabWhatsapp}`}
          aria-label="Chat on WhatsApp"
        >
          <Phone size={24} />
        </a>

        <motion.button
          className={styles.fab}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open Enquiry Form"
        >
          <MessageSquareText size={24} />
        </motion.button>
      </div>
    </div>
  );
}
