import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCleanerSession } from '@/lib/session';

export async function GET() {
  const session = await getCleanerSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const cleaner = await prisma.cleaner.findUnique({
    where: { userId: session.userId },
    include: {
      user: { select: { name: true, email: true } },
      application: true,
    },
  });

  if (!cleaner) {
    return NextResponse.json({ error: 'Cleaner nicht gefunden.' }, { status: 404 });
  }

  const accountStatus = cleaner.application
    ? cleaner.application.status
    : 'no_application';

  return NextResponse.json({ ...cleaner, accountStatus });
}