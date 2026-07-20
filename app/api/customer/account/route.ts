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
    include: { addresses: true },
  });

  if (!user) {
    return NextResponse.json({ error: 'Benutzer nicht gefunden.' }, { status: 404 });
  }

  return NextResponse.json({
    name: user.name,
    email: user.email,
    address: user.addresses[0]?.street || '',
  });
}

export async function PATCH(req: Request) {
  const session = await getCustomerSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const { name, address } = await req.json();

  if (name) {
    await prisma.user.update({
      where: { id: session.userId },
      data: { name },
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

  return NextResponse.json({ ok: true });
}