import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit')) || 6;

  const cleaners = await prisma.cleaner.findMany({
    where: { status: 'active' },
    include: { user: { select: { name: true } }, reviews: true },
    take: limit,
    orderBy: { rating: 'desc' },
  });

  const result = cleaners.map(c => {
    const total = c.reviews.length;
    const avg = total > 0 ? c.reviews.reduce((s, r) => s + r.rating, 0) / total : c.rating;
    return {
      id: c.id,
      name: c.user.name,
      rating: avg,
      photoUrl: c.photoUrl || null,
    };
  });

  return NextResponse.json(result);
}