'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareText, X, Phone } from 'lucide-react';
import { MultiStepForm } from '@/components/ui/MultiStepForm';
import styles from './FloatingEnquiry.module.css';

export function FloatingEnquiry() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
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
              <MultiStepForm source="FloatingWidget" theme="dark" onSuccess={handleClose} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.fabContainer} style={{ display: isOpen ? 'none' : 'flex' }}>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className={styles.fabMenu}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <button
                className={`${styles.fabSmall} ${styles.fabForm}`}
                onClick={() => { setIsOpen(true); setIsMenuOpen(false); }}
                aria-label="Open Enquiry Form"
                title="Send Enquiry"
              >
                <MessageSquareText size={20} />
              </button>
              
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${styles.fabSmall} ${styles.fabWhatsapp}`}
                aria-label="Chat on WhatsApp"
                title="Chat on WhatsApp"
              >
                <Phone size={20} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          className={styles.fabMain}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle Contact Menu"
        >
          <motion.div animate={{ rotate: isMenuOpen ? 90 : 0 }}>
            {isMenuOpen ? <X size={24} /> : <MessageSquareText size={24} />}
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}
