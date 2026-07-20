import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCustomerSession } from '@/lib/session';

export async function GET() {
    const session = await getCustomerSession();
    if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const invoices = await prisma.invoice.findMany({
    where: { booking: { userId: session.userId } },
    include: { booking: { include: { cleaner: { include: { user: true } } } } },
    orderBy: { issuedAt: 'desc' },
  });

  return NextResponse.json(invoices);
}