import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const btnClass = `${styles.button} ${styles[variant]} ${className}`;
  
  return (
    <button className={btnClass} {...props}>
      {children}
    </button>
  );
}
