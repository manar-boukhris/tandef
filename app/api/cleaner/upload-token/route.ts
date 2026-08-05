import { NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { getCleanerSession } from '@/lib/session';

export async function POST(req: Request) {
  const session = await getCleanerSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const body = (await req.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'application/pdf'],
          maximumSizeInBytes: 10 * 1024 * 1024,
        };
      },
      // Pas de onUploadCompleted : on n'en a pas besoin, et sa présence
      // bloque/ralentit fortement les uploads en local (localhost n'a pas
      // d'URL publique pour le callback de Vercel).
    });
    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}