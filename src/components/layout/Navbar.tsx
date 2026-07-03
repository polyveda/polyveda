'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, LayoutGroup, Variants } from 'framer-motion';
import Image from 'next/image';
import { usePreloader } from '@/context/PreloaderContext';
import styles from './Navbar.module.css';

const navLinks = [
  { title: "Home", url: "/" },
  { title: "Products", url: "/products" },
  { title: "Industries", url: "/industries" },
  { title: "Capabilities", url: "/capabilities" },
  { title: "About", url: "/about" },
  { title: "Blog", url: "/blog" }
];

const footerLinks = [
  { title: "Request Quote", url: "/contact" },
  { title: "LinkedIn", url: "#" },
  { title: "Twitter", url: "#" },
  { title: "Contact", url: "/contact" }
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<number | null>(null);
  const [hoveredFooter, setHoveredFooter] = useState<number | null>(null);
  const [menuWidth, setMenuWidth] = useState(440);
  const [menuHeight, setMenuHeight] = useState(520);
  const [closedWidth, setClosedWidth] = useState(110);
  const [closedHeight, setClosedHeight] = useState(46);
  const [closedOffset, setClosedOffset] = useState(8);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const { preloaderDone } = usePreloader();

  // Compute safe menu dimensions on mount + resize
  useEffect(() => {
    const updateDimensions = () => {
      const vw = window.innerWidth;
      if (vw < 480) {
        setMenuWidth(vw - 32); // 16px margins on open
        setMenuHeight(500);
        setClosedWidth(96);
        setClosedHeight(40);
        setClosedOffset(4); // Menu background offset when closed
      } else {
        setMenuWidth(440);
        setMenuHeight(520);
        setClosedWidth(110);
        setClosedHeight(46);
        setClosedOffset(8); // Matches top: 8px, right: 8px in .menuToggleBtn
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Track if footer is in view
  useEffect(() => {
    const footerElement = document.getElementById('site-footer');
    if (!footerElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { rootMargin: '0px', threshold: 0 }
    );

    observer.observe(footerElement);
    return () => observer.disconnect();
  }, []);

  // Close menu on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (btnRef.current && btnRef.current.contains(e.target as Node)) {
        return;
      }
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const menuAnimation: Variants = {
    open: {
      width: `${menuWidth}px`,
      height: `${menuHeight}px`,
      top: "0px",
      right: "0px",
      borderRadius: "24px",
      transition: { type: "spring", stiffness: 60, damping: 14, mass: 1 }
    },
    closed: {
      width: `${closedWidth}px`,
      height: `${closedHeight}px`,
      top: `${closedOffset}px`,
      right: `${closedOffset}px`,
      borderRadius: "24px",
      transition: { type: "spring", stiffness: 60, damping: 14, mass: 1, delay: 0.2 }
    }
  };

  const perspectiveAnimation: Variants = {
    initial: { opacity: 0, rotateX: 100, translateY: 80 },
    enter: (i: number) => ({
      opacity: 1,
      rotateX: 0,
      translateY: 0,
      translateX: 0,
      transition: {
        delay: i * 0.03,
        type: "spring",
        stiffness: 80,
        damping: 15,
        mass: 0.8
      }
    }),
    exit: { opacity: 0, transition: { duration: 0.1 } }
  };

  const footerAnimation: Variants = {
    initial: { opacity: 0, y: 20 },
    enter: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        type: "spring",
        stiffness: 80,
        damping: 15,
        mass: 0.8
      }
    }),
    exit: { opacity: 0, transition: { duration: 0.1 } }
  };

  return (
    <LayoutGroup>
      {/* Floating Logo — fades out when footer is visible */}
      <AnimatePresence>
        {preloaderDone && !isFooterVisible && (
          <Link href="/" className={styles.logoLink}>
            <motion.div 
              className={styles.floatingLogo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                layoutId="site-logo"
                src="https://res.cloudinary.com/dzc0mfs9z/image/upload/v1782738371/08dd02e2-c75d-447f-bd54-8334f817857a_t9zcwj.png"
                alt="Polyveda"
                className={styles.logoImg}
                draggable={false}
                initial={false}
                transition={{ type: 'spring', stiffness: 70, damping: 18, mass: 0.8 }}
              />
            </motion.div>
          </Link>
        )}
      </AnimatePresence>

      {/* Floating Morphed Menu */}
      <div className={styles.floatingNavWrapper}>
        <motion.div 
          ref={menuRef}
          className={styles.morphedMenu}
          variants={menuAnimation}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
        >
          <div className={styles.navLinksWrapper}>
            <AnimatePresence>
              {isOpen && navLinks.map((link, i) => {
                const isHovered = hoveredNav === i;
                return (
                  <div key={i} className={styles.navItemContainer}>
                    <motion.div
                      custom={i}
                      variants={perspectiveAnimation}
                      initial="initial"
                      animate="enter"
                      exit="exit"
                      onMouseEnter={() => setHoveredNav(i)}
                      onMouseLeave={() => setHoveredNav(null)}
                      className={styles.navLinkRow}
                    >
                      <motion.div
                        animate={{ width: isHovered ? 48 : 0, marginRight: isHovered ? 12 : 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', flexShrink: 0 }}
                      >
                        <svg 
                          width="48" height="31" viewBox="0 0 105 62" fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ flexShrink: 0, minWidth: '48px' }}
                        >
                          <path d="M0 31H103M103 31L73.5 1.5M103 31L73.5 60.5" stroke="var(--color-text-light)" strokeWidth="4" vectorEffect="non-scaling-stroke"/>
                        </svg>
                      </motion.div>
                      
                      <Link href={link.url} className={styles.navLink} onClick={() => setIsOpen(false)}>
                        {link.title}
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className={styles.footerLinksWrapper}>
            <AnimatePresence>
              {isOpen && (
                <div className={styles.footerGrid}>
                  {footerLinks.map((link, i) => {
                    const isHovered = hoveredFooter === i;
                    return (
                      <motion.div
                        key={i}
                        custom={i}
                        variants={footerAnimation}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        onMouseEnter={() => setHoveredFooter(i)}
                        onMouseLeave={() => setHoveredFooter(null)}
                        className={styles.footerLinkContainer}
                      >
                        <Link href={link.url} className={styles.footerLink} onClick={() => setIsOpen(false)}>
                          {link.title}
                        </Link>
                        <motion.div 
                          className={styles.footerHoverLine}
                          animate={{ width: isHovered ? "100%" : "0%" }}
                          initial={{ width: "0%" }}
                          transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <button 
          ref={btnRef}
          className={styles.menuToggleBtn}
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <motion.div 
            animate={{ y: isOpen ? "-100%" : "0%" }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className={styles.btnSlider}
          >
            <div className={styles.btnFaceWrapper}>
              <div className={styles.btnTextOpen}>MENU</div>
            </div>
            
            <div className={styles.btnFaceWrapper}>
              <div className={styles.btnTextClose}>CLOSE</div>
            </div>
          </motion.div>
        </button>
      </div>
    </LayoutGroup>
  );
}
