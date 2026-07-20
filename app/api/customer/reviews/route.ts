import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCustomerSession } from '@/lib/session';

export async function POST(req: Request) {
  const session = await getCustomerSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const { bookingId, rating, comment } = await req.json();

  if (!bookingId || !rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Ungültige Bewertung.' }, { status: 400 });
  }

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking || booking.userId !== session.userId) {
    return NextResponse.json({ error: 'Buchung nicht gefunden.' }, { status: 404 });
  }
  if (booking.status !== 'completed') {
    return NextResponse.json({ error: 'Nur abgeschlossene Buchungen können bewertet werden.' }, { status: 400 });
  }
  if (!booking.cleanerId) {
    return NextResponse.json({ error: 'Keine Reinigungskraft zugeordnet.' }, { status: 400 });
  }

  const existing = await prisma.review.findUnique({ where: { bookingId } });
  if (existing) {
    return NextResponse.json({ error: 'Diese Buchung wurde bereits bewertet.' }, { status: 409 });
  }

  const review = await prisma.review.create({
    data: {
      cleanerId: booking.cleanerId,
      bookingId,
      rating,
      comment: comment || null,
    },
  });

  const allReviews = await prisma.review.findMany({ where: { cleanerId: booking.cleanerId } });
  const avg = allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length;
  await prisma.cleaner.update({ where: { id: booking.cleanerId }, data: { rating: avg } });

  return NextResponse.json({ ok: true, review });
}