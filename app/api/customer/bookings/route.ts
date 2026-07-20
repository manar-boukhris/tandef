import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCustomerSession } from '@/lib/session';

export async function GET() {
  const session = await getCustomerSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const bookings = await prisma.booking.findMany({
    where: { userId: session.userId },
    include: { cleaner: { include: { user: true } }, review: true },
    orderBy: { date: 'desc' },
  });

  return NextResponse.json(bookings);
}