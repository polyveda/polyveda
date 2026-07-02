import type { Metadata } from 'next';
import CapabilitiesClient from './CapabilitiesClient';

export const metadata: Metadata = {
  title: 'PP Corrugated Manufacturing Capabilities | CAD, Die-Cutting & Welding | Polyveda',
  description: 'Explore Polyveda\'s PP corrugated manufacturing capabilities. CNC die-cutting, ultrasonic welding, screen printing, and CAD prototyping for custom reusable packaging in India.',
  openGraph: {
    title: 'PP Corrugated Manufacturing Capabilities | Polyveda',
    description: 'Four specialized manufacturing processes for custom PP corrugated packaging. CAD design to factory floor in days.',
    url: 'https://polyveda.com/capabilities',
  },
};

export default function CapabilitiesPage() {
  return <CapabilitiesClient />;
}
