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

  const offers = await prisma.booking.findMany({
    where: { cleanerId: cleaner.id, offerStatus: 'pending' },
    include: { user: { select: { name: true } } },
    orderBy: { date: 'asc' },
  });

  return NextResponse.json(offers);
}

export async function PATCH(req: Request) {
    const session = await getCleanerSession();
    if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const cleaner = await prisma.cleaner.findUnique({ where: { userId: session.userId } });
  if (!cleaner) {
    return NextResponse.json({ error: 'Cleaner nicht gefunden.' }, { status: 404 });
  }

  const { bookingId, decision } = await req.json(); // decision: 'accepted' | 'declined'

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking || booking.cleanerId !== cleaner.id) {
    return NextResponse.json({ error: 'Buchung nicht gefunden.' }, { status: 404 });
  }

  if (decision === 'accepted') {
    await prisma.booking.update({
      where: { id: bookingId },
      data: { offerStatus: 'accepted', status: 'upcoming' },
    });
  } else if (decision === 'declined') {
    // ⭐ toua nkhalliw cleanerId ki howa (ma nمسحوهش) bech tبقى تبان fi "Storniert"
    await prisma.booking.update({
      where: { id: bookingId },
      data: { offerStatus: 'declined', status: 'cancelled' },
    });
  } else {
    return NextResponse.json({ error: 'Ungültige Entscheidung.' }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}