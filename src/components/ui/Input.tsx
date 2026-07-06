import React, { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  theme?: 'light' | 'dark';
}

export function Input({ label, error, className = '', id, theme = 'light', ...props }: InputProps) {
  const inputId = id || label.replace(/\s+/g, '-').toLowerCase();
  const themeClass = theme === 'dark' ? styles.themeDark : '';
  
  return (
    <div className={`${styles.container} ${themeClass} ${className}`}>
      <label htmlFor={inputId} className={styles.label}>{label}</label>
      <input id={inputId} className={`${styles.input} ${error ? styles.hasError : ''}`} {...props} />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}
