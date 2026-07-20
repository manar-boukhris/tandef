import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/session';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const bookings = await prisma.booking.findMany({
    include: {
      user: { select: { name: true } },
      cleaner: { include: { user: { select: { name: true } } } },
    },
    orderBy: { date: 'desc' },
    take: 100,
  });

  return NextResponse.json(bookings);
}