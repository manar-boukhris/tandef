import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const cleaners = await prisma.cleaner.findMany({
    where: { status: 'active' },
    include: { user: { select: { name: true } }, reviews: true },
  });

  const result = cleaners.map(c => {
    const total = c.reviews.length;
    const avg = total > 0 ? c.reviews.reduce((s, r) => s + r.rating, 0) / total : c.rating;
    return {
      id: c.id,
      name: c.user.name,
      rating: avg,
      reviewCount: total,
      photoUrl: c.photoUrl || null, // ⭐ jdid
    };
  });

  return NextResponse.json(result);
}