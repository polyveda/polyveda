'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingEnquiry } from '@/components/ui/FloatingEnquiry';
import { CookieBanner } from '@/components/ui/CookieBanner';
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/portal-x8f2');

  if (isAdmin) {
    return <main>{children}</main>;
  }

  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingEnquiry />
      <CookieBanner />
    </>
  );
}
