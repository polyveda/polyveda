'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import styles from './CookieBanner.module.css';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('polyveda_cookie_consent');
    if (!hasConsented) {
      // Small delay so it doesn't instantly jump scare the user
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('polyveda_cookie_consent', 'accepted');
    setShowBanner(false);
    
    // Here you would typically initialize Google Analytics or other tracking scripts
    // window.gtag('consent', 'update', { 'analytics_storage': 'granted' });
  };

  const handleDecline = () => {
    localStorage.setItem('polyveda_cookie_consent', 'declined');
    setShowBanner(false);
    // Analytics remain disabled
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          className={styles.bannerContainer}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        >
          <div className={styles.content}>
            <h4>We value your privacy</h4>
            <p>
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of cookies. 
              Read our <Link href="/cookies-policy">Cookies Policy</Link> and <Link href="/privacy-policy">Privacy Policy</Link> for more information.
            </p>
          </div>
          <div className={styles.actions}>
            <Button variant="outline" onClick={handleDecline}>Decline All</Button>
            <Button onClick={handleAccept}>Accept All</Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
