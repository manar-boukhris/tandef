/*import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, signSession } from '@/lib/auth';
import { CUSTOMER_SESSION_COOKIE, CLEANER_SESSION_COOKIE } from '@/lib/session';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'E-Mail oder Passwort ist falsch.' }, { status: 401 });
  }

  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: 'E-Mail oder Passwort ist falsch.' }, { status: 401 });
  }

  const token = signSession({ userId: user.id, role: user.role, email: user.email });
  const redirect = user.role === 'cleaner' ? '/cleaner-dashboard' : '/dashboard';
  const cookieName = user.role === 'cleaner' ? CLEANER_SESSION_COOKIE : CUSTOMER_SESSION_COOKIE;

  const res = NextResponse.json({ ok: true, redirect });
  res.cookies.set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}*/
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, signSession } from '@/lib/auth';
import { CUSTOMER_SESSION_COOKIE, CLEANER_SESSION_COOKIE } from '@/lib/session';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'E-Mail oder Passwort ist falsch.' }, { status: 401 });
  }

  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    return NextResponse.json({ error: 'E-Mail oder Passwort ist falsch.' }, { status: 401 });
  }

  const role = user.role as 'cleaner' | 'customer';
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