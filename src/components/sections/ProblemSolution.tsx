'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './ProblemSolution.module.css';

export function ProblemSolution() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] }
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.blueprintGrid} />
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        >
          <span className={styles.eyebrow}>The Polyveda Edge</span>
          <h2>Engineered for extreme demands.</h2>
          <p>Traditional cardboard absorbs moisture and collapses under weight. Wood is heavy, splinters, and requires heat treatment. We solved this.</p>
        </motion.div>
        
        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={itemVariants} className={styles.card}>
            <span className={styles.cardIndex}>01</span>
            <h3>Unmatched Durability</h3>
            <p>High strength-to-weight ratio. Stack higher and transport safer without the risk of collapse or bursting under heavy industrial loads.</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className={styles.card}>
            <span className={styles.cardIndex}>02</span>
            <h3>Cost Efficiency</h3>
            <p>A single PP box can handle 20 to 60 cycles. The total cost of ownership (TCO) plummets compared to single-use cardboard.</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className={styles.card}>
            <span className={styles.cardIndex}>03</span>
            <h3>100% Weatherproof</h3>
            <p>Zero moisture absorption. Perfect for humid storage, monsoon transport, and cold-chain logistics where paper-based packaging fails.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
