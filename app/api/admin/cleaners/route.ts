import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/session';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const cleaners = await prisma.cleaner.findMany({
    include: {
      user: { select: { name: true, email: true, createdAt: true } },
      application: true,
    },
    orderBy: { id: 'desc' },
  });

  return NextResponse.json(cleaners);
}

export async function PATCH(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const { cleanerId, status } = await req.json(); // status: 'active' | 'suspended'

  const cleaner = await prisma.cleaner.update({
    where: { id: cleanerId },
    data: { status },
  });

  const application = await prisma.cleanerApplication.findUnique({ where: { cleanerId } });

  if (application) {
    if (status === 'active') {
      await prisma.cleanerApplication.update({
        where: { cleanerId },
        data: { status: 'approved' },
      });
    } else if (status === 'suspended') {
      await prisma.cleanerApplication.update({
        where: { cleanerId },
        data: { status: 'rejected', rejectionNote: 'Konto wurde durch einen Administrator gesperrt.' },
      });
    }
  }

  return NextResponse.json(cleaner);
}