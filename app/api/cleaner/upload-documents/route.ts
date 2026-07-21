import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCleanerSession } from '@/lib/session';

export async function POST(req: Request) {
  const session = await getCleanerSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const cleaner = await prisma.cleaner.findUnique({ where: { userId: session.userId } });
  if (!cleaner) {
    return NextResponse.json({ error: 'Cleaner-Profil nicht gefunden.' }, { status: 404 });
  }

  const cleanerId = cleaner.id;

  const {
    idUrl, idName, addressUrl, addressName, criminalUrl, criminalName,
    photoUrl, city, experience, services, iban, accountHolder,
  } = await req.json();

  if (!idUrl || !addressUrl || !criminalUrl) {
    return NextResponse.json({ error: 'Bitte lade alle 3 Dokumente hoch.' }, { status: 400 });
  }

  const existingApp = await prisma.cleanerApplication.findUnique({ where: { cleanerId } });
  let docs: Record<string, any> = {};
  if (existingApp && existingApp.documents) {
    try { docs = JSON.parse(existingApp.documents); } catch { docs = {}; }
  }

  docs.id = { name: idName, url: idUrl, status: 'pending', note: null };
  docs.address = { name: addressName, url: addressUrl, status: 'pending', note: null };
  docs.criminal = { name: criminalName, url: criminalUrl, status: 'pending', note: null };

  await prisma.cleanerApplication.upsert({
    where: { cleanerId },
    update: {
      documents: JSON.stringify(docs),
      status: 'pending',
      city: city || null,
      experience: experience || null,
      services: services || null,
      iban: iban || null,
      accountHolder: accountHolder || null,
      rejectionNote: null,
      submittedAt: new Date(),
    },
    create: {
      cleanerId,
      documents: JSON.stringify(docs),
      status: 'pending',
      city: city || null,
      experience: experience || null,
      services: services || null,
      iban: iban || null,
      accountHolder: accountHolder || null,
    },
  });

  await prisma.cleaner.update({
    where: { id: cleanerId },
    data: photoUrl ? { status: 'pending', photoUrl } : { status: 'pending' },
  });

  return NextResponse.json({ ok: true, redirect: '/cleaner-pending' });
}