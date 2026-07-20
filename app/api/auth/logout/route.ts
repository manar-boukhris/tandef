import { NextResponse } from 'next/server';
import { CUSTOMER_SESSION_COOKIE, CLEANER_SESSION_COOKIE } from '@/lib/session';

export async function POST(req: Request) {
  const { role } = await req.json().catch(() => ({ role: 'customer' }));
  const cookieName = role === 'cleaner' ? CLEANER_SESSION_COOKIE : CUSTOMER_SESSION_COOKIE;

  const res = NextResponse.json({ ok: true });
  res.cookies.set(cookieName, '', { path: '/', maxAge: 0 });
  return res;
}