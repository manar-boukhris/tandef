import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCleanerSession } from '@/lib/session';

export async function GET() {
  const session = await getCleanerSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const cleaner = await prisma.cleaner.findUnique({ where: { userId: session.userId } });
  if (!cleaner) {
    return NextResponse.json({ error: 'Cleaner nicht gefunden.' }, { status: 404 });
  }

  const reviews = await prisma.review.findMany({
    where: { cleanerId: cleaner.id },
    include: { booking: { include: { user: { select: { name: true } } } } },
    orderBy: { createdAt: 'desc' },
  });

  const total = reviews.length;
  const avg = total > 0 ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0;

  const distribution = [5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(r => r.rating === star).length;
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    return { star, count, pct };
  });

  return NextResponse.json({ reviews, total, avg, distribution });
}