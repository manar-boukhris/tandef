import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCustomerSession } from '@/lib/session';

export async function GET() {
  const session = await getCustomerSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const methods = await prisma.paymentMethod.findMany({ where: { userId: session.userId } });
  return NextResponse.json(methods);
}

export async function POST(req: Request) {
  const session = await getCustomerSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const { brand, last4, expMonth, expYear } = await req.json();

  const method = await prisma.paymentMethod.create({
    data: { brand, last4, expMonth: Number(expMonth), expYear: Number(expYear), userId: session.userId },
  });

  return NextResponse.json(method);
}

export async function DELETE(req: Request) {
  const session = await getCustomerSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const { id } = await req.json();

  const method = await prisma.paymentMethod.findUnique({ where: { id } });
  if (!method || method.userId !== session.userId) {
    return NextResponse.json({ error: 'Nicht gefunden.' }, { status: 404 });
  }

  await prisma.paymentMethod.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}