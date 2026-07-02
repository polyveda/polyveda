'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import styles from './Contact.module.css';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

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
      source: 'ContactPage'
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
          {status === 'success' ? (
            <div className={styles.successState}>
              <h2>Request Received</h2>
              <p>Thank you. Our engineering team is reviewing your details and will contact you within 24 hours.</p>
              <Button onClick={() => setStatus('idle')} variant="outline">Submit Another Request</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <Input name="fullName" label="Full Name" required />
                <Input name="companyName" label="Company Name" required />
              </div>
              
              <div className={styles.formRow}>
                <Input name="email" type="email" label="Work Email" required />
                <Input name="phone" type="tel" label="Phone Number" required />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Industry</label>
                <select name="industry" className={styles.select} required>
                  <option value="">Select your industry...</option>
                  <option value="automotive">Automotive</option>
                  <option value="ecommerce">E-Commerce</option>
                  <option value="electronics">Electronics</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="other">Other Heavy Industry</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Project Details</label>
                <textarea 
                  name="projectDetails"
                  className={styles.textarea} 
                  rows={5} 
                  placeholder="Describe your load requirements, dimensions, or current packaging pain points..."
                  required
                />
              </div>

              <Button type="submit" disabled={status === 'submitting'} className={styles.submitBtn}>
                {status === 'submitting' ? 'Submitting...' : 'Request Quote & Download Capability PDF'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
