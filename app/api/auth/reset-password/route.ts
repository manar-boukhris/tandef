import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export async function POST(req: Request) {
  const { token, newPassword } = await req.json();

  const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } });

  if (!resetToken || resetToken.used || resetToken.expiresAt < new Date()) {
    return NextResponse.json({ error: 'Der Link ist ungültig oder abgelaufen.' }, { status: 400 });
  }

  const hashed = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: resetToken.userId },
    data: { password: hashed },
  });

  await prisma.passwordResetToken.update({
    where: { id: resetToken.id },
    data: { used: true },
  });

  return NextResponse.json({ ok: true });
}