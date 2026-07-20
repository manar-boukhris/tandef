import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCleanerSession } from '@/lib/session';

export async function GET(req: Request) {
  const session = await getCleanerSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const year = parseInt(searchParams.get('year') || '') || new Date().getFullYear();
  const month = parseInt(searchParams.get('month') || '') || new Date().getMonth() + 1;

  const cleaner = await prisma.cleaner.findUnique({ where: { userId: session.userId } });
  if (!cleaner) {
    return NextResponse.json({ error: 'Cleaner nicht gefunden.' }, { status: 404 });
  }

  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 1);

  const slots = await prisma.availability.findMany({
    where: {
      cleanerId: cleaner.id,
      isAvailable: true,
      date: { gte: startOfMonth, lt: endOfMonth },
    },
  });

  const availableDays = slots.map(s => new Date(s.date).getDate());

  return NextResponse.json({ availableDays, daysInMonth: endOfMonth.getDate() - 0 });
}

export async function POST(req: Request) {
  const session = await getCleanerSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const { year, month, days } = await req.json();

  const cleaner = await prisma.cleaner.findUnique({ where: { userId: session.userId } });
  if (!cleaner) {
    return NextResponse.json({ error: 'Cleaner nicht gefunden.' }, { status: 404 });
  }

  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 1);

  await prisma.availability.deleteMany({
    where: { cleanerId: cleaner.id, date: { gte: startOfMonth, lt: endOfMonth } },
  });

  await prisma.availability.createMany({
    data: days.map((day: number) => ({
      cleanerId: cleaner.id,
      date: new Date(year, month - 1, day),
      isAvailable: true,
    })),
  });

  return NextResponse.json({ ok: true });
}