import React from 'react';
import styles from './ProblemSolution.module.css';

export function ProblemSolution() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Engineered for extreme demands.</h2>
          <p>Traditional cardboard absorbs moisture and collapses under weight. Wood is heavy, splinters, and requires heat treatment. We solved this.</p>
        </div>
        
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Unmatched Durability</h3>
            <p>High strength-to-weight ratio. Stack higher and transport safer without the risk of collapse or bursting under heavy industrial loads.</p>
          </div>
          
          <div className={styles.card}>
            <h3>Cost Efficiency</h3>
            <p>A single PP box can handle 20 to 60 cycles. The total cost of ownership (TCO) plummets compared to single-use cardboard.</p>
          </div>
          
          <div className={styles.card}>
            <h3>100% Weatherproof</h3>
            <p>Zero moisture absorption. Perfect for humid storage, monsoon transport, and cold-chain logistics where paper-based packaging fails.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
