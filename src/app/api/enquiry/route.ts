import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { Enquiry } from '@/models/Enquiry';

// Basic in-memory rate limiter for serverless environment
// Maps IP to { count, resetTime }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const MAX_REQUESTS = 5;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function getRateLimitStatus(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + ONE_DAY_MS });
    return true; // Allowed
  }

  // If time has passed, reset
  if (now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + ONE_DAY_MS });
    return true; // Allowed
  }

  // If still in the same day and under limit
  if (record.count < MAX_REQUESTS) {
    record.count += 1;
    return true; // Allowed
  }

  return false; // Rate limited
}

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting Check
    // In Next.js App Router, extracting IP depends on hosting. Vercel uses x-forwarded-for.
    const ip = req.headers.get('x-forwarded-for') || 'unknown-ip';
    const isAllowed = getRateLimitStatus(ip);

    if (!isAllowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again tomorrow or contact us on WhatsApp.' },
        { status: 429 }
      );
    }

    // 2. Parse Data
    const body = await req.json();
    const { fullName, companyName, email, phone, industry, projectDetails, source } = body;

    if (!fullName || !companyName || !email || !phone || !projectDetails) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 3. Save to DB
    const conn = await dbConnect();
    
    if (!conn) {
      // If MongoDB is not running locally/connected, just simulate success so UI works for the demo
      console.warn("DB not connected. Mocking successful submission.");
      return NextResponse.json({ success: true, mocked: true });
    }

    const newEnquiry = await Enquiry.create({
      fullName,
      companyName,
      email,
      phone,
      industry: industry || 'Other',
      projectDetails,
      source: source || 'ContactPage',
    });

    return NextResponse.json({ success: true, data: newEnquiry }, { status: 201 });
  } catch (error: any) {
    console.error('Enquiry API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
