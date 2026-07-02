import mongoose from 'mongoose';

export interface IPost extends mongoose.Document {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string; // HTML content from WYSIWYG
  coverImage?: string; // Cloudinary URL or public ID
  metaTitle: string;
  metaDescription: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Please provide a slug'],
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
    },
    excerpt: {
      type: String,
      required: [true, 'Please provide an excerpt'],
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    coverImage: {
      type: String,
      default: '',
    },
    metaTitle: {
      type: String,
      required: [true, 'Please provide a meta title for SEO'],
    },
    metaDescription: {
      type: String,
      required: [true, 'Please provide a meta description for SEO'],
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// If the model exists, use it, otherwise create a new one
export const Post = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
