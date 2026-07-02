import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Polyveda | Request a Packaging Quote',
  description: 'Get in touch with Polyveda to discuss custom PP corrugated packaging, request prototypes, or get a quote for returnable industrial packaging.',
  openGraph: {
    title: 'Contact Polyveda | Request a Packaging Quote',
    description: 'Get in touch with Polyveda to discuss custom PP corrugated packaging.',
    url: 'https://polyveda.com/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
