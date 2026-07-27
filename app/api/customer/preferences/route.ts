import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCustomerSession } from '@/lib/session';

export async function GET() {
  const session = await getCustomerSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      name: true,
      preferences: {
        select: {
          emailEnabled: true,
          smsEnabled: true,
          frequency: true,
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'Benutzer nicht gefunden.' }, { status: 404 });
  }

  // Si l'utilisateur n'a pas encore de ligne UserPreferences, on renvoie les valeurs par défaut du schema
  const prefs = user.preferences ?? {
    emailEnabled: true,
    smsEnabled: false,
    frequency: 'weekly',
  };

  return NextResponse.json({
    name: user.name,
    emailOptIn: prefs.emailEnabled,
    smsOptIn: prefs.smsEnabled,
    notificationFrequency: prefs.frequency,
  });
}

export async function PATCH(req: Request) {
  const session = await getCustomerSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const { emailOptIn, smsOptIn, notificationFrequency } = await req.json();

  if (typeof emailOptIn !== 'boolean' || typeof smsOptIn !== 'boolean') {
    return NextResponse.json({ error: 'Ungültige Daten.' }, { status: 400 });
  }

  const validFrequencies = ['instant', 'daily', 'weekly'];
  if (!validFrequencies.includes(notificationFrequency)) {
    return NextResponse.json({ error: 'Ungültige Häufigkeit.' }, { status: 400 });
  }

  await prisma.userPreferences.upsert({
    where: { userId: session.userId },
    update: {
      emailEnabled: emailOptIn,
      smsEnabled: smsOptIn,
      frequency: notificationFrequency,
    },
    create: {
      userId: session.userId,
      emailEnabled: emailOptIn,
      smsEnabled: smsOptIn,
      frequency: notificationFrequency,
    },
  });

  return NextResponse.json({ ok: true });
}