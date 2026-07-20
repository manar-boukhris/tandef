import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCleanerSession} from '@/lib/session';      

export async function GET() {
    const session = await getCleanerSession();
    if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const cleaner = await prisma.cleaner.findUnique({ where: { userId: session.userId } });
  if (!cleaner) {
    return NextResponse.json({ error: 'Cleaner nicht gefunden.' }, { status: 404 });
  }

  const bookings = await prisma.booking.findMany({
    where: { cleanerId: cleaner.id },
    include: { user: { select: { name: true } } },
    orderBy: { date: 'desc' },
  });

  return NextResponse.json(bookings);
}