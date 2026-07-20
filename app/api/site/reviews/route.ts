import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit')) || 3;

  const reviews = await prisma.review.findMany({
    where: { rating: { gte: 4 } }, // bark el reviews el bahyin (4-5 nujum) yban3 fil marketing pages
    include: { booking: { include: { user: { select: { name: true } } } } },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });

  const result = reviews.map(r => ({
    id: r.id,
    rating: r.rating,
    comment: r.comment,
    createdAt: r.createdAt,
    customerName: r.booking?.user?.name || 'Kunde',
  }));

  return NextResponse.json(result);
}