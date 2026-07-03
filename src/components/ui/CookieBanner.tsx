'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import styles from './CookieBanner.module.css';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  
  // Toggles state
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(true);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('polyveda_cookie_consent');
    if (!hasConsented) {
      // Small delay so it doesn't instantly jump scare the user
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const savePreferences = (preferences: { analytics: boolean; marketing: boolean }) => {
    localStorage.setItem('polyveda_cookie_consent', JSON.stringify(preferences));
    setShowBanner(false);
    
    // Here you would typically initialize Google Analytics or other tracking scripts based on preferences
    /*
    window.gtag('consent', 'update', { 
      'analytics_storage': preferences.analytics ? 'granted' : 'denied',
      'ad_storage': preferences.marketing ? 'granted' : 'denied'
    });
    */
  };

  const handleAcceptAll = () => {
    savePreferences({ analytics: true, marketing: true });
  };

  const handleSaveCustom = () => {
    savePreferences({ analytics: analyticsEnabled, marketing: marketingEnabled });
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
          {!showCustomize ? (
            <div className={styles.mainView}>
              <div className={styles.content}>
                <h4>We value your privacy</h4>
                <p>
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                  By clicking "Accept All", you consent to our use of cookies. 
                  Read our <Link href="/cookies-policy">Cookies Policy</Link> and <Link href="/privacy-policy">Privacy Policy</Link> for more information.
                </p>
              </div>
              <div className={styles.actions}>
                <Button variant="outline" onClick={() => setShowCustomize(true)}>Customize</Button>
                <Button onClick={handleAcceptAll}>Accept All</Button>
              </div>
            </div>
          ) : (
            <div className={styles.customizeView}>
              <div className={styles.customizeHeader}>
                <h4>Customize Preferences</h4>
                <button className={styles.backBtn} onClick={() => setShowCustomize(false)}>Back</button>
              </div>
              
              <div className={styles.togglesList}>
                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <h5>Essential Cookies</h5>
                    <p>Required for the website to function properly. Cannot be disabled.</p>
                  </div>
                  <div className={styles.toggleSwitchDisabled}>
                    <div className={`${styles.toggleKnob} ${styles.knobActive}`} />
                  </div>
                </div>

                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <h5>Analytics Cookies</h5>
                    <p>Help us understand how visitors interact with the website by collecting reporting information anonymously.</p>
                  </div>
                  <button 
                    className={`${styles.toggleSwitch} ${analyticsEnabled ? styles.switchActive : ''}`} 
                    onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                    aria-pressed={analyticsEnabled}
                  >
                    <div className={`${styles.toggleKnob} ${analyticsEnabled ? styles.knobActive : ''}`} />
                  </button>
                </div>

                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <h5>Marketing Cookies</h5>
                    <p>Used to track visitors across websites to display relevant advertisements.</p>
                  </div>
                  <button 
                    className={`${styles.toggleSwitch} ${marketingEnabled ? styles.switchActive : ''}`} 
                    onClick={() => setMarketingEnabled(!marketingEnabled)}
                    aria-pressed={marketingEnabled}
                  >
                    <div className={`${styles.toggleKnob} ${marketingEnabled ? styles.knobActive : ''}`} />
                  </button>
                </div>
              </div>

              <div className={styles.customizeActions}>
                <Button variant="outline" onClick={handleAcceptAll}>Accept All</Button>
                <Button onClick={handleSaveCustom}>Save Preferences</Button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
