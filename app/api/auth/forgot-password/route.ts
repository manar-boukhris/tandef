import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateResetToken } from '@/lib/auth';
import { sendMail } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Bitte gib deine E-Mail-Adresse ein.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    // ⚠️ Réponse identique que l'utilisateur existe ou non (sécurité : évite
    // de révéler quelles adresses sont enregistrées chez nous).
    if (!user) {
      return NextResponse.json({ ok: true });
    }

    const token = generateResetToken();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 heure

    await prisma.passwordResetToken.create({
      data: { token, userId: user.id, expiresAt },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

    await sendMail({
      to: user.email,
      subject: 'TANDEF – Passwort zurücksetzen',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;">
          <h2 style="color:#5B21B6;">Passwort zurücksetzen</h2>
          <p>Hallo ${user.name || ''},</p>
          <p>Du hast angefragt, dein Passwort zurückzusetzen. Klicke auf den folgenden Link, um ein neues Passwort festzulegen:</p>
          <p style="margin:24px 0;">
            <a href="${resetUrl}" style="background:#5B21B6;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">
              Passwort zurücksetzen
            </a>
          </p>
          <p style="color:#6B6478;font-size:13px;">Dieser Link ist 1 Stunde gültig. Falls du diese Anfrage nicht gestellt hast, kannst du diese E-Mail ignorieren.</p>
          <p style="color:#6B6478;font-size:13px;">TANDEF Support – support@tandef.de</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Forgot-password error:', err);
    return NextResponse.json({ error: 'Fehler beim Senden der E-Mail. Bitte versuche es erneut.' }, { status: 500 });
  }
}