import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/session';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const [activeCustomers, activeCleaners, pendingApplications, bookingsThisMonth] = await Promise.all([
    prisma.user.count({ where: { role: 'customer' } }),
    prisma.cleaner.count({ where: { status: 'active' } }),
    prisma.cleanerApplication.count({ where: { status: 'pending' } }),
    prisma.booking.count({
      where: {
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    }),
  ]);

  return NextResponse.json({ activeCustomers, activeCleaners, pendingApplications, bookingsThisMonth });
}