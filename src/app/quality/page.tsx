import React from 'react';
import { Metadata } from 'next';
import QualityClient from './QualityClient';

export const metadata: Metadata = {
  title: 'Quality & Compliance | Polyveda',
  description: 'Learn about Polyveda\'s rigorous ISO-certified manufacturing standards, ESD-safe testing, and QA processes for PP corrugated packaging.',
};

export default function QualityPage() {
  return <QualityClient />;
}
