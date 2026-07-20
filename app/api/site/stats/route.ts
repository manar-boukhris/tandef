import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const [customers, cleanings, reviews] = await Promise.all([
    prisma.user.count({ where: { role: 'customer' } }),
    prisma.booking.count({ where: { status: 'completed' } }),
    prisma.review.findMany({ select: { rating: true } }),
  ]);

  const avgRating = reviews.length > 0
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 4.9;

  const recommendPct = reviews.length > 0
    ? Math.round((reviews.filter(r => r.rating >= 4).length / reviews.length) * 100)
    : 98;

  return NextResponse.json({
    customers,
    cleanings,
    avgRating: Math.round(avgRating * 10) / 10,
    recommendPct,
  });
}