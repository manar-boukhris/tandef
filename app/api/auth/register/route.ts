import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, signSession } from '@/lib/auth';
import { CUSTOMER_SESSION_COOKIE, CLEANER_SESSION_COOKIE } from '@/lib/session';

export async function POST(req: Request) {
  const { firstName, lastName, email, password, gender, role, phone, address } = await req.json();

  if (!email || !password || !firstName || !lastName) {
    return NextResponse.json({ error: 'Alle Felder sind erforderlich.' }, { status: 400 });
  }

  const finalRole = role === 'cleaner' ? 'cleaner' : 'customer';

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'Diese E-Mail wird bereits verwendet.' }, { status: 409 });
  }

  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      name: `${firstName} ${lastName}`,
      role: finalRole,
      phone: phone || null, // ⭐ jdid
    },
  });

  if (address) {
    // ⭐ jdid
    await prisma.address.create({
      data: { label: 'Zuhause', street: address, city: '', zip: '', userId: user.id },
    });
  }

  if (finalRole === 'cleaner') {
    await prisma.cleaner.create({ data: { userId: user.id, status: 'pending' } });
  }

  const token = signSession({ userId: user.id, role: finalRole, email: user.email });
  const cookieName = finalRole === 'cleaner' ? CLEANER_SESSION_COOKIE : CUSTOMER_SESSION_COOKIE;

  const res = NextResponse.json({ ok: true, redirect: '/register-complete' });
  res.cookies.set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}