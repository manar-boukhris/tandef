// app/api/cleaner/photo/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const blobUrl = url.searchParams.get('url');
  if (!blobUrl) return new NextResponse('Missing url', { status: 400 });

  try {
    const res = await fetch(blobUrl, {
      headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` }
    });

    if (!res.ok) return new NextResponse('Not found', { status: 404 });

    const buffer = await res.arrayBuffer();
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': res.headers.get('Content-Type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=3600',
      }
    });
  } catch {
    return new NextResponse('Error', { status: 500 });
  }
}