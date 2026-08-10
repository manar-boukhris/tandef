import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, signSession } from '@/lib/auth';
import { CUSTOMER_SESSION_COOKIE, CLEANER_SESSION_COOKIE } from '@/lib/session';

export async function POST(req: Request) {
  const { email, password, expectedRole } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'E-Mail oder Passwort ist falsch.' }, { status: 401 });
  }

  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: 'E-Mail oder Passwort ist falsch.' }, { status: 401 });
  }

  const role = user.role as 'cleaner' | 'customer';

  // Wenn cleaner versucht über /login (customer) einzuloggen → Fehler
  if (expectedRole === 'customer' && role === 'cleaner') {
    return NextResponse.json(
      { error: 'Dieses Konto gehört einer Reinigungskraft. Bitte nutze den Reinigungskraft-Login.' },
      { status: 403 }
    );
  }

  // Wenn customer versucht über /cleaner-login einzuloggen → Fehler
  if (expectedRole === 'cleaner' && role === 'customer') {
    return NextResponse.json(
      { error: 'Dieses Konto ist kein Reinigungskraft-Konto. Bitte nutze den Kunden-Login.' },
      { status: 403 }
    );
  }

  const token = signSession({ userId: user.id, role, email: user.email });
  const redirect = role === 'cleaner' ? '/cleaner-dashboard' : '/dashboard';
  const cookieName = role === 'cleaner' ? CLEANER_SESSION_COOKIE : CUSTOMER_SESSION_COOKIE;

  const res = NextResponse.json({ ok: true, redirect });
  res.cookies.set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}