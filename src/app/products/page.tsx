import type { Metadata } from 'next';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'PP Corrugated Boxes, Trays & Reusable Packaging | Polyveda India',
  description: 'Browse Polyveda\'s full range of PP corrugated packaging. Boxes, custom trays, heavy-duty crates, floor protection sheets, and retail displays. Custom-engineered in India.',
  openGraph: {
    title: 'PP Corrugated Boxes, Trays & Reusable Packaging | Polyveda India',
    description: 'Custom PP corrugated packaging solutions for industrial, logistics, electronics, construction and retail. Reusable, moisture-proof, and built to last.',
    url: 'https://polyveda.com/products',
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
