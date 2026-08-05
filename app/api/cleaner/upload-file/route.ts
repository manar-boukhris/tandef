import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { getCleanerSession } from '@/lib/session';

export async function POST(req: Request) {
  const session = await getCleanerSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const prefix = (formData.get('prefix') as string) || 'uploads';

    if (!file) {
      return NextResponse.json({ error: 'Keine Datei erhalten.' }, { status: 400 });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Nur JPG, PNG oder PDF sind erlaubt.' }, { status: 400 });
    }

    const maxSize = 4 * 1024 * 1024; // 4 MB (limite du body des fonctions serverless Vercel)
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'Datei zu groß (max. 4 MB).' }, { status: 400 });
    }

    const filename = `${prefix}/${Date.now()}-${file.name}`;

    const blob = await put(filename, file, {
      access: 'private',
    });

    return NextResponse.json({ url: blob.url, name: file.name });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Fehler beim Hochladen der Datei.' }, { status: 500 });
  }
}