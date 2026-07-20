import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCustomerSession, getCleanerSession } from '@/lib/session';

export async function PATCH(req: Request) {
  const customerSession = await getCustomerSession();
  const cleanerSession = await getCleanerSession();
  const session = customerSession || cleanerSession;

  if (!session) {
    return NextResponse.json({ error: 'Nicht angemeldet.' }, { status: 401 });
  }

  const { firstName, lastName, phone, address } = await req.json();

  const data: any = {};
  if (firstName && lastName) {
    data.name = `${firstName} ${lastName}`;
  }
  if (phone) {
    data.phone = phone; // ⭐ toua yet7attet fi User.phone
  }

  if (Object.keys(data).length > 0) {
    await prisma.user.update({
      where: { id: session.userId },
      data,
    });
  }

  if (address) {
    const existing = await prisma.address.findFirst({ where: { userId: session.userId } });
    if (existing) {
      await prisma.address.update({ where: { id: existing.id }, data: { street: address } });
    } else {
      await prisma.address.create({
        data: { label: 'Zuhause', street: address, city: '', zip: '', userId: session.userId },
      });
    }
  }

  const redirect = session.role === 'cleaner' ? '/cleaner-onboarding' : '/dashboard';
  return NextResponse.json({ ok: true, redirect });
}