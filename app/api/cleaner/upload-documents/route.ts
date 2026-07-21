import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCleanerSession } from '@/lib/session';
import { put } from '@vercel/blob';

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

  const formData = await req.formData();
  const idFile = formData.get('idDoc') as File | null;
  const addressFile = formData.get('addressDoc') as File | null;
  const criminalFile = formData.get('criminalDoc') as File | null;
  const photo = formData.get('photo') as File | null;
  const phone = formData.get('phone') as string | null;
  const city = formData.get('city') as string | null;
  const experience = formData.get('experience') as string | null;
  const services = formData.get('services') as string | null;
  const iban = formData.get('iban') as string | null;
  const accountHolder = formData.get('accountHolder') as string | null;

  async function saveFile(file: File, prefix: string) {
    const safeName = `cleaner-${cleanerId}/${prefix}-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')}`;
    const blob = await put(safeName, file, { access: 'public' });
    return { name: file.name, url: blob.url };
  }

  const existingApp = await prisma.cleanerApplication.findUnique({ where: { cleanerId } });
  let docs: Record<string, any> = {};
  if (existingApp && existingApp.documents) {
    try { docs = JSON.parse(existingApp.documents); } catch { docs = {}; }
  }

  if (idFile && idFile.size > 0) {
    const saved = await saveFile(idFile, 'id');
    docs.id = { name: saved.name, url: saved.url, status: 'pending', note: null };
  }
  if (addressFile && addressFile.size > 0) {
    const saved = await saveFile(addressFile, 'address');
    docs.address = { name: saved.name, url: saved.url, status: 'pending', note: null };
  }
  if (criminalFile && criminalFile.size > 0) {
    const saved = await saveFile(criminalFile, 'criminal');
    docs.criminal = { name: saved.name, url: saved.url, status: 'pending', note: null };
  }

  if (!docs.id || !docs.address || !docs.criminal) {
    return NextResponse.json({ error: 'Bitte lade alle 3 Dokumente hoch.' }, { status: 400 });
  }

  let photoUrl: string | undefined;
  if (photo && photo.size > 0) {
    const saved = await saveFile(photo, 'profile');
    photoUrl = saved.url;
  }

  await prisma.cleanerApplication.upsert({
    where: { cleanerId },
    update: {
      documents: JSON.stringify(docs),
      status: 'pending',
      phone: phone || null,
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
      phone: phone || null,
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