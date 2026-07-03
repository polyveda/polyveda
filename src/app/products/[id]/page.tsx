import { productsData } from '@/data/products';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import styles from './ProductDetail.module.css';

// Generate static params for the products
export function generateStaticParams() {
  return productsData.map((product) => ({
    id: product.slug,
  }));
}

// Dynamic per-product SEO metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = productsData.find((p) => p.slug === resolvedParams.id);
  if (!product) return { title: 'Product Not Found | Polyveda' };

  return {
    title: product.metaTitle,
    description: product.metaDescription,
    openGraph: {
      title: product.metaTitle,
      description: product.metaDescription,
      url: `https://polyveda.com/products/${product.slug}`,
    },
  };
}

const INDUSTRY_NAMES: Record<string, string> = {
  automotive: 'Automotive',
  ecommerce: 'E-Commerce & Retail',
  electronics: 'Electronics & Semiconductor',
  healthcare: 'Healthcare & Pharma',
  construction: 'Construction',
  logistics: 'Business Logistics',
};

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = productsData.find((p) => p.slug === resolvedParams.id || p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = productsData.filter((p) => product.relatedProducts.includes(p.slug));

  // JSON-LD Product Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.metaDescription,
    "image": `https://polyveda.com${product.image}`,
    "brand": {
      "@type": "Brand",
      "name": "Polyveda"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Polyveda",
      "url": "https://polyveda.com"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "INR",
      "seller": {
        "@type": "Organization",
        "name": "Polyveda"
      }
    }
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Breadcrumb Navigation ── */}
      <div className={styles.breadcrumbContainer}>
        <div className={styles.container}>
          <nav aria-label="breadcrumb" className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <Link href="/products" className={styles.breadcrumbLink}>Products</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Product Hero ── */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            
            {/* Left: Image */}
            <div className={styles.imageCol}>
              <div className={styles.imageWrapper}>
                <div className={styles.hudOverlay} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.image} alt={`${product.name} - Reusable PP Corrugated Packaging by Polyveda`} className={styles.mainImage} />
              </div>
            </div>

            {/* Right: Content */}
            <div className={styles.contentCol}>
              <span className={styles.categoryPill}>{product.category}</span>
              <h1 className={styles.title}>{product.name}</h1>
              <p className={styles.tagline}>{product.tagline}</p>
              
              <div className={styles.divider} />
              
              <p className={styles.longDesc}>{product.longDescription}</p>

              {/* Ideal For Industries */}
              {product.industries.length > 0 && (
                <div className={styles.idealFor}>
                  <span className={styles.idealForLabel}>Ideal for:</span>
                  <div className={styles.idealForTags}>
                    {product.industries.map((ind) => (
                      <Link key={ind} href={`/industries#${ind}`} className={styles.industryTag}>
                        {INDUSTRY_NAMES[ind] || ind}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              <div className={styles.actionRow}>
                <Link href={`/contact?product=${product.slug}`} className={styles.inquireBtn}>
                  Request a Quote
                </Link>
                <Link href="/capabilities" className={styles.capLink}>
                  How we manufacture this →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Technical Details ── */}
      <section className={styles.detailsSection}>
        <div className={styles.container}>
          <div className={styles.detailsGrid}>
            
            {/* Specs Table */}
            <div className={styles.specsWrapper}>
              <h2 className={styles.sectionHeading}>Technical Specifications</h2>
              <table className={styles.specTable}>
                <tbody>
                  {product.specs.map((spec, i) => (
                    <tr key={i}>
                      <td className={styles.specLabel}>{spec.label}</td>
                      <td className={styles.specValue}>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Features List */}
            <div className={styles.featuresWrapper}>
              <h2 className={styles.sectionHeading}>Key Engineering Features</h2>
              <ul className={styles.featureList}>
                {product.features.map((feature, i) => (
                  <li key={i} className={styles.featureItem}>
                    <div className={styles.bulletPoint} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
          </div>
        </div>
      </section>

      {/* ── Related Products ── */}
      {relatedProducts.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.container}>
            <h2 className={styles.relatedHeading}>Related Products</h2>
            <p className={styles.relatedSub}>Other PP corrugated packaging solutions from Polyveda</p>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((rp) => (
                <Link key={rp.slug} href={`/products/${rp.slug}`} className={styles.relatedCard}>
                  <span className={styles.relatedCardCategory}>{rp.category}</span>
                  <h3 className={styles.relatedCardTitle}>{rp.name}</h3>
                  <p className={styles.relatedCardTagline}>{rp.tagline}</p>
                  <span className={styles.relatedCardCta}>View product →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
