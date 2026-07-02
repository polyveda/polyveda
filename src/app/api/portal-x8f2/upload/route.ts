import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Cloudinary automatically uses the CLOUDINARY_URL environment variable

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'polyveda_blog' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    // Cloudinary returns the secure_url.
    const url = (uploadResult as any).secure_url;
    
    // Inject f_auto,q_auto for optimal delivery inside rich-text editors
    const optimizedUrl = url.replace('/upload/', '/upload/f_auto,q_auto/');

    return NextResponse.json({ url: optimizedUrl, public_id: (uploadResult as any).public_id });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
