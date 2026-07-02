'use client';

import React from 'react';
import { PixelReveal } from '@/components/ui/PixelReveal';

// Next.js triggers the Template component to remount on every route change,
// making it perfect for our SwissPixelReveal page transition effect.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PixelReveal />
      {children}
    </>
  );
}
