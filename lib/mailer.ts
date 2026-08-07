import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.ionos.de',
  port: 587,
  secure: false, // STARTTLS
  auth: {
    user: process.env.EMAIL_USER,      // support@tandef.de
    pass: process.env.EMAIL_PASSWORD,  // الباسورد العادي متاع الإيميل (IONOS)
  },
});

export async function sendMail({ to, subject, html }: { to: string; subject: string; html: string }) {
  return transporter.sendMail({
    from: `"TANDEF Support" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}