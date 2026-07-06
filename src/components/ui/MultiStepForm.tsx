'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { CheckCircle2 } from 'lucide-react';
import styles from './MultiStepForm.module.css';

type StepAnswers = {
  industry: string;
  customIndustry: string;
  primaryChallenge: string;
  customPrimaryChallenge: string;
  solutionType: string;
  estimatedVolume: string;
  projectDetails: string;
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
};

interface MultiStepFormProps {
  source: 'ContactPage' | 'FloatingWidget';
  theme?: 'light' | 'dark';
  onSuccess?: () => void;
}

export function MultiStepForm({ source, theme = 'light', onSuccess }: MultiStepFormProps) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  
  const [answers, setAnswers] = useState<StepAnswers>({
    industry: '',
    customIndustry: '',
    primaryChallenge: '',
    customPrimaryChallenge: '',
    solutionType: '',
    estimatedVolume: '',
    projectDetails: '',
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
  });

  const updateAnswer = (key: keyof StepAnswers, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleOptionSelect = (key: keyof StepAnswers, value: string) => {
    updateAnswer(key, value);
    if (value !== 'Other') {
      setTimeout(() => handleNext(), 300);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const finalIndustry = answers.industry === 'Other' ? answers.customIndustry : answers.industry;
    const finalChallenge = answers.primaryChallenge === 'Other' ? answers.customPrimaryChallenge : answers.primaryChallenge;

    const data = {
      fullName: answers.fullName,
      companyName: answers.companyName,
      email: answers.email,
      phone: answers.phone,
      industry: finalIndustry,
      primaryChallenge: finalChallenge,
      solutionType: answers.solutionType,
      estimatedVolume: answers.estimatedVolume,
      projectDetails: answers.projectDetails || 'No additional details provided.',
      source
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
        alert(errorData.error || 'Failed to submit. Please try again.');
        setStatus('idle');
      }
    } catch (error) {
      alert('Network error. Please check your connection.');
      setStatus('idle');
    }
  };

  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const themeClass = theme === 'dark' ? styles.themeDark : '';

  return (
    <div className={`${styles.multiStepContainer} ${themeClass}`}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className={styles.successState}
          >
            {theme === 'dark' && <CheckCircle2 size={48} color="var(--color-accent)" style={{marginBottom: '8px'}} />}
            <h2>Request Received</h2>
            <p>Thank you. Our engineering team is reviewing your details and will contact you within 24 hours.</p>
            {onSuccess ? (
              <Button onClick={onSuccess} variant={theme === 'dark' ? 'outline' : 'primary'} style={{marginTop: '16px'}}>Close Window</Button>
            ) : (
              <Button onClick={() => { setStatus('idle'); setStep(1); }} variant="outline" style={{marginTop: '16px'}}>Submit Another Request</Button>
            )}
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleSubmit} 
            className={styles.form}
          >
            <div className={styles.progressHeader}>
              <span className={styles.stepIndicator}>Step {step} of 6</span>
              {step > 1 && (
                <button type="button" onClick={handleBack} className={styles.backButton}>
                  &larr; Back
                </button>
              )}
            </div>

            <div className={styles.stepContainer}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className={styles.stepContent}>
                    <h3>What industry are you operating in?</h3>
                    <div className={styles.optionsGrid}>
                      {['Automotive', 'E-Commerce', 'Logistics', 'Healthcare', 'Heavy Industries', 'Electronics', 'Other'].map(opt => (
                        <button 
                          key={opt}
                          type="button" 
                          className={`${styles.optionTile} ${answers.industry === opt ? styles.activeTile : ''}`}
                          onClick={() => handleOptionSelect('industry', opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {answers.industry === 'Other' && (
                      <div className={styles.customInputWrapper}>
                        <Input 
                          name="customIndustry" 
                          label="Please specify your industry" 
                          value={answers.customIndustry}
                          onChange={(e) => updateAnswer('customIndustry', e.target.value)}
                          theme={theme}
                          required 
                        />
                        <Button type="button" onClick={handleNext} disabled={!answers.customIndustry}>Continue</Button>
                      </div>
                    )}
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className={styles.stepContent}>
                    <h3>What is your primary packaging challenge right now?</h3>
                    <div className={styles.optionsGrid}>
                      {['Moisture damage', 'High replacement costs (TCO)', 'Box collapsing/stacking', 'Inefficient storage space', 'Need ESD safe handling', 'Other'].map(opt => (
                        <button 
                          key={opt}
                          type="button" 
                          className={`${styles.optionTile} ${answers.primaryChallenge === opt ? styles.activeTile : ''}`}
                          onClick={() => handleOptionSelect('primaryChallenge', opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {answers.primaryChallenge === 'Other' && (
                      <div className={styles.customInputWrapper}>
                        <Input 
                          name="customPrimaryChallenge" 
                          label="Please specify your challenge" 
                          value={answers.customPrimaryChallenge}
                          onChange={(e) => updateAnswer('customPrimaryChallenge', e.target.value)}
                          theme={theme}
                          required 
                        />
                        <Button type="button" onClick={handleNext} disabled={!answers.customPrimaryChallenge}>Continue</Button>
                      </div>
                    )}
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className={styles.stepContent}>
                    <h3>Which type of PP Corrugated solution are you looking for?</h3>
                    <div className={styles.optionsGrid}>
                      {['Boxes & Bins', 'Custom Trays', 'Floor Protection Sheets', 'Display & Retail', 'Not Sure Yet'].map(opt => (
                        <button 
                          key={opt}
                          type="button" 
                          className={`${styles.optionTile} ${answers.solutionType === opt ? styles.activeTile : ''}`}
                          onClick={() => handleOptionSelect('solutionType', opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="step4" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className={styles.stepContent}>
                    <h3>What is your estimated volume requirement?</h3>
                    <div className={styles.optionsGrid}>
                      {['Sample/Prototype', 'Low Volume (< 1000)', 'Medium Volume (1000 - 5000)', 'High Volume (5000+)'].map(opt => (
                        <button 
                          key={opt}
                          type="button" 
                          className={`${styles.optionTile} ${answers.estimatedVolume === opt ? styles.activeTile : ''}`}
                          onClick={() => handleOptionSelect('estimatedVolume', opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div key="step5" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className={styles.stepContent}>
                    <h3>Any specific notes, dimensions, or custom requirements?</h3>
                    <div className={styles.formGroup}>
                      <textarea 
                        name="projectDetails"
                        className={styles.textarea} 
                        rows={5} 
                        placeholder="Describe your load requirements, dimensions, or current packaging pain points..."
                        value={answers.projectDetails}
                        onChange={(e) => updateAnswer('projectDetails', e.target.value)}
                      />
                    </div>
                    <Button type="button" onClick={handleNext} className={styles.nextBtn}>Continue</Button>
                  </motion.div>
                )}

                {step === 6 && (
                  <motion.div key="step6" variants={stepVariants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className={styles.stepContent}>
                    <h3>Where should we send your custom quote?</h3>
                    <div className={styles.formRow}>
                      <Input 
                        name="fullName" 
                        label="Full Name" 
                        value={answers.fullName}
                        onChange={(e) => updateAnswer('fullName', e.target.value)}
                        theme={theme}
                        required 
                      />
                      <Input 
                        name="companyName" 
                        label="Company Name" 
                        value={answers.companyName}
                        onChange={(e) => updateAnswer('companyName', e.target.value)}
                        theme={theme}
                        required 
                      />
                    </div>
                    <div className={styles.formRow}>
                      <Input 
                        name="email" 
                        type="email" 
                        label="Work Email" 
                        value={answers.email}
                        onChange={(e) => updateAnswer('email', e.target.value)}
                        theme={theme}
                        required 
                      />
                      <Input 
                        name="phone" 
                        type="tel" 
                        label="Phone Number" 
                        value={answers.phone}
                        onChange={(e) => updateAnswer('phone', e.target.value)}
                        theme={theme}
                        required 
                      />
                    </div>
                    <Button type="submit" disabled={status === 'submitting'} className={styles.submitBtn}>
                      {status === 'submitting' ? 'Submitting...' : 'Request Quote'}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
