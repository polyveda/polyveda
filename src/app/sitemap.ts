import { MetadataRoute } from 'next';
import { productsData } from '@/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://polyveda.com';

  // Core static routes
  const staticRoutes = [
    '',
    '/about',
    '/capabilities',
    '/contact',
    '/industries',
    '/products',
    '/blog',
    '/privacy-policy',
    '/terms',
    '/cookies-policy'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic product routes
  const dynamicProductRoutes = productsData.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blog article routes
  const blogArticleRoutes = [
    'sustainability-in-supply-chain',
    'esd-packaging-electronics',
    'ecommerce-returnable-logistics',
    'pp-corrugated-vs-wood-crates-heavy-industry',
    'cleanroom-packaging-pharma',
  ].map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }));

  return [...staticRoutes, ...dynamicProductRoutes, ...blogArticleRoutes];
}
