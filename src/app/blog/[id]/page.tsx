import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './Article.module.css';
import dbConnect from '@/lib/mongoose';
import { Post } from '@/models/Post';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  await dbConnect();
  
  const post = await Post.findOne({ slug: id, published: true }).lean();
  
  if (!post) return { title: 'Article Not Found | Polyveda' };
  
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://polyveda.com/blog/${id}`,
      type: 'article',
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  
  // Fetch current post
  const rawPost = await Post.findOne({ slug: id, published: true }).lean();
  
  if (!rawPost) {
    notFound();
  }

  // Fetch more articles (excluding current)
  const moreRawPosts = await Post.find({ slug: { $ne: id }, published: true }).sort({ createdAt: -1 }).limit(3).lean();
  
  // Strip mongoose objects
  const post = JSON.parse(JSON.stringify(rawPost));
  const morePosts = JSON.parse(JSON.stringify(moreRawPosts));

  // Estimate read time (roughly 200 words per min)
  const wordCount = post.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200) + ' min read';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "datePublished": post.createdAt,
    "publisher": {
      "@type": "Organization",
      "name": "Polyveda",
      "url": "https://polyveda.com"
    },
    "description": post.metaDescription,
    "url": `https://polyveda.com/blog/${id}`,
  };

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <div className={styles.breadcrumbContainer}>
        <div className={styles.container}>
          <nav aria-label="breadcrumb" className={styles.breadcrumb}>
            <Link href="/" className={styles.breadcrumbLink}>Home</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <Link href="/blog" className={styles.breadcrumbLink}>Insights</Link>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbCurrent}>{post.category}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <header className={styles.articleHeader}>
        <div className={styles.container}>
          <div className={styles.metaRow}>
            <span className={styles.categoryBadge}>{post.category}</span>
            <span className={styles.dateLine}>{new Date(post.createdAt).toLocaleDateString()} · {readTime}</span>
          </div>
          <h1 className={styles.articleTitle}>{post.title}</h1>
        </div>
      </header>

      {/* Article Body */}
      <article className={styles.articleBody}>
        <div className={styles.container}>
          <div 
            className={styles.prose} 
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>
      </article>

      {/* More Articles */}
      <section className={styles.moreSection}>
        <div className={styles.container}>
          <h2 className={styles.moreHeading}>More from Polyveda Insights</h2>
          <div className={styles.moreGrid}>
            {morePosts.map((a: any) => (
              <Link key={a.slug} href={`/blog/${a.slug}`} className={styles.moreCard}>
                <span className={styles.moreCategory}>{a.category}</span>
                <h3 className={styles.moreTitle}>{a.title}</h3>
                <span className={styles.moreCta}>Read article →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
