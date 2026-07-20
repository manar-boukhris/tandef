import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/session';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const customers = await prisma.user.findMany({
    where: { role: 'customer' },
    include: { bookings: true },
    orderBy: { createdAt: 'desc' },
  });

  const result = customers.map(c => ({
    id: c.id,
    name: c.name,
    email: c.email,
    createdAt: c.createdAt,
    bookingsCount: c.bookings.length,
    totalSpent: c.bookings
      .filter(b => b.status === 'completed')
      .reduce((sum, b) => sum + b.price, 0),
  }));

  return NextResponse.json(result);
}