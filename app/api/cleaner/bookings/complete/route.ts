import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCleanerSession } from '@/lib/session';

export async function PATCH(req: Request) {
  const session = await getCleanerSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const cleaner = await prisma.cleaner.findUnique({ where: { userId: session.userId } });
  if (!cleaner) {
    return NextResponse.json({ error: 'Cleaner nicht gefunden.' }, { status: 404 });
  }

  const { bookingId } = await req.json();

  const booking = await prisma.booking.findUnique({ where: { id: bookingId } });
  if (!booking || booking.cleanerId !== cleaner.id) {
    return NextResponse.json({ error: 'Buchung nicht gefunden.' }, { status: 404 });
  }

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: 'completed' },
  });

  const existingInvoice = await prisma.invoice.findUnique({ where: { bookingId } });
  if (existingInvoice) {
    await prisma.invoice.update({
      where: { bookingId },
      data: { status: 'paid' },
    });
  } else {
    await prisma.invoice.create({
      data: { bookingId, amount: booking.price, status: 'paid' },
    });
  }

  return NextResponse.json({ ok: true });
}