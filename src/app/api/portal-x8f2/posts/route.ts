import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { Post } from '@/models/Post';
import slugify from 'slugify';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    // Check if we only want published posts (for frontend) or all (for admin)
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get('published') === 'true';
    
    const query = publishedOnly ? { published: true } : {};
    
    const posts = await Post.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Auto-generate slug if not provided
    if (!body.slug && body.title) {
      body.slug = slugify(body.title, { lower: true, strict: true });
    }

    const newPost = await Post.create(body);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'A post with this slug already exists. Please choose a different title or edit the slug.' }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
