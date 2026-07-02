import type { Metadata } from 'next';
import IndustriesClient from './IndustriesClient';

export const metadata: Metadata = {
  title: 'Industries We Serve | PP Packaging for Automotive, Electronics & More | Polyveda',
  description: 'Polyveda supplies reusable PP corrugated packaging to automotive, electronics, e-commerce, healthcare, construction, and logistics industries across India.',
  openGraph: {
    title: 'Industries We Serve | PP Packaging for Automotive, Electronics & More',
    description: 'Six industrial sectors. One material. PP corrugated packaging built for real supply chain conditions.',
    url: 'https://polyveda.com/industries',
  },
};

export default function IndustriesPage() {
  return <IndustriesClient />;
}
