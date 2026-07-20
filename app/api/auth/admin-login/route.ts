import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword } from '@/lib/auth';
import jwt from 'jsonwebtoken';
import { ADMIN_SESSION_COOKIE } from '@/lib/session';

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) {
    return NextResponse.json({ error: 'Zugangsdaten ungültig.' }, { status: 401 });
  }

  const valid = await verifyPassword(password, admin.password);
  if (!valid) {
    return NextResponse.json({ error: 'Zugangsdaten ungültig.' }, { status: 401 });
  }

  const token = jwt.sign({ adminId: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '1d' });

  const res = NextResponse.json({ ok: true, redirect: '/admin' });
  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  });
  return res;
}