import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const bookings = await prisma.booking.findMany({
    include: { cleaner: { include: { user: true } }, invoice: true },
    orderBy: { date: 'desc' },
  });
  return NextResponse.json(bookings);
}

export async function POST(req: Request) {
  const data = await req.json();
  const booking = await prisma.booking.create({ data });
  return NextResponse.json(booking);
}