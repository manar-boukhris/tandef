import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCustomerSession } from '@/lib/session';

export async function PATCH(req: Request) {
    const session = await getCustomerSession();
    
    if (!session ) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const { bookingId, cleanerId } = await req.json();

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking || booking.userId !== session.userId) {
    return NextResponse.json({ error: 'Buchung nicht gefunden.' }, { status: 404 });
  }

  let finalCleanerId = cleanerId || null;
  if (!finalCleanerId) {
    const anyCleaner = await prisma.cleaner.findFirst({ where: { status: 'active' } });
    finalCleanerId = anyCleaner?.id || null;
  }

  const updated = await prisma.booking.update({
    where: { id: bookingId },
    data: {
      cleanerId: finalCleanerId,
      offerStatus: finalCleanerId ? 'pending' : 'none',
      status: 'upcoming',
    },
  });

  return NextResponse.json({ ok: true, booking: updated });
}