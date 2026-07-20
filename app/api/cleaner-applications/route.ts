import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/session';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const apps = await prisma.cleanerApplication.findMany({
    include: { cleaner: { include: { user: true } } },
    orderBy: { submittedAt: 'desc' },
  });
  return NextResponse.json(apps);
}

export async function PATCH(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const { id, status, rejectionNote } = await req.json();

  const app = await prisma.cleanerApplication.update({
    where: { id },
    data: { status, rejectionNote: rejectionNote || null },
  });

  if (status === 'approved') {
    await prisma.cleaner.update({ where: { id: app.cleanerId }, data: { status: 'active' } });
  }
  if (status === 'rejected') {
    await prisma.cleaner.update({ where: { id: app.cleanerId }, data: { status: 'suspended' } });
  }

  return NextResponse.json(app);
}