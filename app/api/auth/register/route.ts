import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, signSession } from '@/lib/auth';
import { CUSTOMER_SESSION_COOKIE, CLEANER_SESSION_COOKIE } from '@/lib/session';
import { sendMail } from '@/lib/mailer';

export async function POST(req: Request) {
  const { firstName, lastName, email, password, gender, role, phone, street, zip, city } = await req.json();

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
      phone: phone || null,
    },
  });

  if (street || zip || city) {
    await prisma.address.create({
      data: {
        label: 'Zuhause',
        street: street || '',
        zip: zip || '',
        city: city || '',
        userId: user.id,
      },
    });
  }

  if (finalRole === 'cleaner') {
    await prisma.cleaner.create({ data: { userId: user.id, status: 'pending' } });

    // ⭐ Email an Reinigungskraft mit Link zu /cleaner-login
    const cleanerLoginUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/cleaner-login`;
    await sendMail({
      to: email,
      subject: 'TANDEF – Willkommen als Reinigungskraft!',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;padding:24px;">
          <h2 style="color:#5B21B6;">Willkommen bei TANDEF, ${firstName}!</h2>
          <p>Vielen Dank für deine Registrierung als Reinigungskraft. Dein Konto wurde erfolgreich erstellt und wird derzeit geprüft.</p>
          <p>Sobald dein Konto freigegeben ist, kannst du dich über folgenden Link einloggen:</p>
          <p style="margin:28px 0;">
            <a href="${cleanerLoginUrl}"
               style="background:#5B21B6;color:#fff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:bold;font-size:15px;">
              Als Reinigungskraft einloggen
            </a>
          </p>
          <p style="color:#6B6478;font-size:13px;">
            Bitte nutze immer diesen Link, um dich als Reinigungskraft anzumelden — nicht den normalen Kunden-Login.
          </p>
          <p style="color:#6B6478;font-size:13px;">
            Bei Fragen erreichst du uns unter support@tandef.de
          </p>
          <hr style="border:none;border-top:1px solid #EDE9F5;margin:24px 0;" />
          <p style="color:#9C96A8;font-size:12px;">TANDEF – Zuverlässige Reinigung in Deutschland</p>
        </div>
      `,
    });
  }

  const token = signSession({ userId: user.id, role: finalRole, email: user.email });
  const cookieName = finalRole === 'cleaner' ? CLEANER_SESSION_COOKIE : CUSTOMER_SESSION_COOKIE;

  const redirect = finalRole === 'cleaner' ? '/cleaner-onboarding' : '/register-complete';
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