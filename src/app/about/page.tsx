import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Polyveda | PP Corrugated Packaging Manufacturer India',
  description: 'Learn about Polyveda — a specialist PP corrugated packaging manufacturer in India. We engineer reusable, moisture-proof, and sustainable packaging solutions for industrial supply chains.',
  openGraph: {
    title: 'About Polyveda | PP Corrugated Packaging Manufacturer India',
    description: 'Specialist manufacturer of reusable PP corrugated packaging. Built for industrial durability, sustainability, and closed-loop logistics.',
    url: 'https://polyveda.com/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
