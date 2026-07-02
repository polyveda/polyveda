import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert file to buffer (useful later for Cloudinary)
    // const bytes = await file.arrayBuffer();
    // const buffer = Buffer.from(bytes);

    // MOCK CLOUDINARY UPLOAD
    // Currently returns a placeholder image so editing works before API keys are added.
    // When ready, you would use: cloudinary.uploader.upload_stream(...)
    
    // We'll generate a random uncomplic8/polyveda placeholder for now
    const mockUrl = `https://via.placeholder.com/800x400?text=Mock+Cloudinary+Upload`;

    return NextResponse.json({ url: mockUrl });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
