import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCustomerSession } from '@/lib/session';

const FREQUENCY_RATES: Record<string, number> = {
  'Wöchentlich': 14.90,
  'Alle zwei Wochen': 16.90,
  'Einmalig': 19.90,
};

export async function POST(req: Request) {
  const session = await getCustomerSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const draft = await req.json();
  const {
    serviceType, frequency, hours, extras, date, time,
    address, cleanerId, paymentMethod,
  } = draft;

  if (!serviceType || !hours || !date || !time || !address) {
    return NextResponse.json({ error: 'Buchungsdaten unvollständig.' }, { status: 400 });
  }

  let finalCleanerId = cleanerId || null;
  if (!finalCleanerId) {
    const anyCleaner = await prisma.cleaner.findFirst({ where: { status: 'active' } });
    finalCleanerId = anyCleaner?.id || null;
  }

  const rate = FREQUENCY_RATES[frequency] || 19.90;
  const extrasCost = (extras || []).reduce((sum: number, id: string) => sum + (id === 'ironing' ? 2 : id === 'product' ? 3 : 0), 0);
  const price = Math.round((rate + extrasCost) * hours * 100) / 100;

  const [hh, mm] = time.split(':').map(Number);
  const bookingDate = new Date(date);
  bookingDate.setHours(hh, mm, 0, 0);

  const booking = await prisma.booking.create({
    data: {
      userId: session.userId,
      cleanerId: finalCleanerId,
      status: 'upcoming',
      offerStatus: finalCleanerId ? 'pending' : 'none',
      serviceType,
      date: bookingDate,
      hours,
      price,
      address,
      paymentMethod: paymentMethod || 'card',
    },
  });

  await prisma.invoice.create({
    data: {
      bookingId: booking.id,
      amount: price,
      status: 'pending',
    },
  });

  return NextResponse.json({ ok: true, bookingId: booking.id });
}