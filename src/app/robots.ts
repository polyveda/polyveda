import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/portal-x8f2/', '/api/'],
    },
    sitemap: 'https://polyveda.com/sitemap.xml',
  };
}
