import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateResetToken } from '@/lib/auth';

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  // b sécurité: nrodou nafs el message ken el email mawjouda wala la (bech had ma yjarrebch ychouf emails valides)
  if (!user) {
    return NextResponse.json({ ok: true, message: 'Ida el E-Mail mawjouda, rasaltna beslaha.' });
  }

  const token = generateResetToken();
  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 30), // 30 minutes
    },
  });

  const resetLink = `http://localhost:3000/reset-password?token=${token}`;

  // TODO: hna lازem trasel email 7a9i9i (nodemailer/Resend/etc). Taw bark n-logiw el link fil terminal bech tnajjem tjarreb:
  console.log('🔗 Reset password link:', resetLink);

  return NextResponse.json({ ok: true, message: 'Ida el E-Mail mawjouda, rasaltna beslaha.' });
}