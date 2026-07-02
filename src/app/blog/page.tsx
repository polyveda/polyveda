import type { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Engineering Insights & Blog | Polyveda',
  description: 'Technical perspectives on industrial packaging, supply chain durability, and the shift to returnable logistics.',
  openGraph: {
    title: 'Engineering Insights & Blog | Polyveda',
    description: 'Technical perspectives on industrial packaging, supply chain durability, and the shift to returnable logistics.',
    url: 'https://polyveda.com/blog',
  },
};

import dbConnect from '@/lib/mongoose';
import { Post } from '@/models/Post';

export default async function BlogPage() {
  await dbConnect();
  // Fetch published posts and convert to POJOs with lean()
  // We stringify and parse to strip complex Mongoose object properties and Dates 
  // since Next.js expects plain JSON props from Server to Client components.
  const rawPosts = await Post.find({ published: true }).sort({ createdAt: -1 }).lean();
  const posts = JSON.parse(JSON.stringify(rawPosts));

  return <BlogClient posts={posts} />;
}
