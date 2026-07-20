import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCleanerSession } from '@/lib/session';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  const session = await getCleanerSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const cleaner = await prisma.cleaner.findUnique({ where: { userId: session.userId } });
  if (!cleaner) {
    return NextResponse.json({ error: 'Cleaner-Profil nicht gefunden.' }, { status: 404 });
  }

  const formData = await req.formData();
  const idFile = formData.get('id');
  const addressFile = formData.get('address');
  const criminalFile = formData.get('criminal');
  const photo = formData.get('photo');
  const phone = formData.get('phone');
  const city = formData.get('city');
  const experience = formData.get('experience');
  const services = formData.get('services');
  const iban = formData.get('iban');
  const accountHolder = formData.get('accountHolder');

  const uploadDir = path.join(process.cwd(), 'public', 'uploads', `cleaner-${cleaner.id}`);
  await mkdir(uploadDir, { recursive: true });

  async function saveFile(file, prefix) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const safeName = `${prefix}-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')}`;
    const filePath = path.join(uploadDir, safeName);
    await writeFile(filePath, buffer);
    return { name: file.name, url: `/uploads/cleaner-${cleaner.id}/${safeName}` };
  }

  const existingApp = await prisma.cleanerApplication.findUnique({ where: { cleanerId: cleaner.id } });
  let docs = {};
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

  let photoUrl = undefined;
  if (photo && photo.size > 0) {
    const saved = await saveFile(photo, 'profile');
    photoUrl = saved.url;
  }

  await prisma.cleanerApplication.upsert({
    where: { cleanerId: cleaner.id },
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
      cleanerId: cleaner.id,
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
    where: { id: cleaner.id },
    data: photoUrl ? { status: 'pending', photoUrl } : { status: 'pending' },
  });

  return NextResponse.json({ ok: true, redirect: '/cleaner-pending' });
}