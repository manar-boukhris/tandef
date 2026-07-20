import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCustomerSession, getCleanerSession } from '@/lib/session';

export async function GET() {
  const customerSession = await getCustomerSession();
  const cleanerSession = await getCleanerSession();
  const session = customerSession || cleanerSession;

  if (!session) {
    return NextResponse.json({ error: 'Nicht angemeldet.' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      name: true,
      email: true,
      role: true,
      phone: true,
      addresses: { select: { street: true }, take: 1 },
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'Benutzer nicht gefunden.' }, { status: 404 });
  }

  return NextResponse.json({
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone || '',
    address: user.addresses[0]?.street || '',
  });
}