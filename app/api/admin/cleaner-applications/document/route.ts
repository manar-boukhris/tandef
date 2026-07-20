/*import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/session';

export async function PATCH(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const { applicationId, docType, status } = await req.json();

  const app = await prisma.cleanerApplication.findUnique({ where: { id: applicationId } });
  if (!app) {
    return NextResponse.json({ error: 'Antrag nicht gefunden.' }, { status: 404 });
  }

  let docs = {};
  try { docs = JSON.parse(app.documents || '{}'); } catch { docs = {}; }

  if (!docs[docType]) {
    return NextResponse.json({ error: 'Dokument nicht gefunden.' }, { status: 404 });
  }

  docs[docType].status = status;
  docs[docType].note = status === 'rejected' ? 'Bitte erneut hochladen.' : null;

  await prisma.cleanerApplication.update({
    where: { id: applicationId },
    data: { documents: JSON.stringify(docs) },
  });

  return NextResponse.json({ ok: true, documents: docs });
}*/

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/session';

export async function PATCH(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const { applicationId, docType, status } = await req.json();

  const app = await prisma.cleanerApplication.findUnique({ where: { id: applicationId } });
  if (!app) {
    return NextResponse.json({ error: 'Antrag nicht gefunden.' }, { status: 404 });
  }

  let docs: Record<string, any> = {};
  try { docs = JSON.parse(app.documents || '{}'); } catch { docs = {}; }

  if (!docs[docType]) {
    return NextResponse.json({ error: 'Dokument nicht gefunden.' }, { status: 404 });
  }

  docs[docType].status = status;
  docs[docType].note = status === 'rejected' ? 'Bitte erneut hochladen.' : null;

  await prisma.cleanerApplication.update({
    where: { id: applicationId },
    data: { documents: JSON.stringify(docs) },
  });

  return NextResponse.json({ ok: true, documents: docs });
}