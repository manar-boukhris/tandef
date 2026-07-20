import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCustomerSession } from '@/lib/session';

export async function GET() {
  const session = await getCustomerSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { name: true },
  });

  const bookings = await prisma.booking.findMany({
    where: { userId: session.userId },
    include: { cleaner: { include: { user: true } } },
    orderBy: { date: 'asc' },
  });

  const now = new Date();
  const nextBooking = bookings.find(b => b.status === 'upcoming' && new Date(b.date) >= now) || null;

  return NextResponse.json({
    name: user?.name || '',
    totalBookings: bookings.length,
    nextBooking: nextBooking ? {
      serviceType: nextBooking.serviceType,
      date: nextBooking.date,
    } : null,
  });
}