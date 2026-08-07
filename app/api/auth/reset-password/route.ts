import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Das Passwort muss mindestens 8 Zeichen lang sein.' }, { status: 400 });
    }

    const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } });

    if (!resetToken || resetToken.used || resetToken.expiresAt < new Date()) {
      return NextResponse.json({ error: 'Dieser Link ist ungültig oder abgelaufen. Bitte fordere einen neuen Link an.' }, { status: 400 });
    }

    const hashed = await hashPassword(password);

    await prisma.$transaction([
      prisma.user.update({ where: { id: resetToken.userId }, data: { password: hashed } }),
      prisma.passwordResetToken.update({ where: { id: resetToken.id }, data: { used: true } }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Reset-password error:', err);
    return NextResponse.json({ error: 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.' }, { status: 500 });
  }
}