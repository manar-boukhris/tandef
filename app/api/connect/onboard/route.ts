// app/api/connect/onboard/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { getCleanerSession } from '@/lib/session';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-07-29.dahlia' });

export async function POST() {
  const session = await getCleanerSession();
  if (!session) return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });

  const cleaner = await prisma.cleaner.findUnique({
    where: { userId: session.userId },
    include: { user: true },
  });
  if (!cleaner) return NextResponse.json({ error: 'Cleaner nicht gefunden.' }, { status: 404 });

  let stripeAccountId = cleaner.stripeAccountId;

  // إذا ما عندوش Stripe Account، نخلقولو وحد
  if (!stripeAccountId) {
    const account = await stripe.accounts.create({
      type: 'express',
      country: 'DE',
      email: cleaner.user.email,
      capabilities: {
        transfers: { requested: true },
      },
      business_type: 'individual',
    });
    stripeAccountId = account.id;

    await prisma.cleaner.update({
      where: { id: cleaner.id },
      data: { stripeAccountId },
    });
  }

  // نخلقو onboarding link (يوجهو لصفحة Stripe باش يدخل IBAN/هويته)
  const accountLink = await stripe.accountLinks.create({
    account: stripeAccountId,
    refresh_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cleaner-dashboard?stripe=refresh`,
    return_url:  `${process.env.NEXT_PUBLIC_BASE_URL}/cleaner-dashboard?stripe=success`,
    type: 'account_onboarding',
  });

  return NextResponse.json({ url: accountLink.url });
}