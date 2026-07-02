import React from 'react';
import { Metadata } from 'next';
import SustainabilityClient from './SustainabilityClient';

export const metadata: Metadata = {
  title: 'Sustainability | Polyveda',
  description: 'Learn how Polyveda\'s returnable PP corrugated packaging reduces carbon footprint, eliminates single-use cardboard, and drives the circular economy.',
};

export default function SustainabilityPage() {
  return <SustainabilityClient />;
}
