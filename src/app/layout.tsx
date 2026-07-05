import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { PreloaderProvider } from "@/context/PreloaderContext";
import { Preloader } from "@/components/layout/Preloader";
import { ClientLayout } from "@/components/layout/ClientLayout";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  metadataBase: new URL('https://polyveda.com'),
  title: "Polyveda | Industrial PP Corrugated Packaging",
  description: "Innovative Polypropylene (PP) Corrugated Packaging Solutions. We design, fabricate, and supply high-quality, sustainable alternatives.",
  openGraph: {
    title: 'Polyveda | Industrial PP Corrugated Packaging',
    description: 'Innovative Polypropylene (PP) Corrugated Packaging Solutions.',
    url: 'https://polyveda.com',
    siteName: 'Polyveda',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Polyveda - Engineered Packaging Solutions',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Polyveda | Industrial PP Corrugated Packaging',
    description: 'Innovative Polypropylene (PP) Corrugated Packaging Solutions.',
    images: ['/og-image.jpg'],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Polyveda",
  "image": "https://polyveda.com/og-image.jpg",
  "description": "Innovative Polypropylene (PP) Corrugated Packaging Solutions.",
  "url": "https://polyveda.com",
  "telephone": "+919876543210",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Industrial Tech Park, Building 4",
    "addressLocality": "Mumbai",
    "addressRegion": "MH",
    "postalCode": "400001",
    "addressCountry": "IN"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        {/* Preload first frames for LCP optimization */}
        <link rel="preload" as="image" href="/hero-sequence-new/frame_001.jpg" />
        <link rel="preload" as="image" href="/hero-sequence-mobile/frame_001.jpg" media="(max-width: 768px)" />
      </head>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PreloaderProvider>
          <Preloader />
          <ClientLayout>
            {children}
          </ClientLayout>
        </PreloaderProvider>
      </body>
    </html>
  );
}
