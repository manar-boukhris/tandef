// app/api/connect/onboard/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { getCleanerSession } from '@/lib/session';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  try {
    const session = await getCleanerSession();
    if (!session) return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });

    const cleaner = await prisma.cleaner.findUnique({
      where: { userId: session.userId },
      include: { user: true },
    });
    if (!cleaner) return NextResponse.json({ error: 'Cleaner nicht gefunden.' }, { status: 404 });

    let stripeAccountId = cleaner.stripeAccountId;

    if (!stripeAccountId) {
      const account = await stripe.accounts.create({
        type: 'express',
        country: 'DE',
        email: cleaner.user.email,
        capabilities: { transfers: { requested: true } },
        business_type: 'individual',
      });
      stripeAccountId = account.id;
      await prisma.cleaner.update({
        where: { id: cleaner.id },
        data: { stripeAccountId },
      });
    }

    const accountLink = await stripe.accountLinks.create({
      account: stripeAccountId,
      refresh_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cleaner-dashboard?stripe=refresh`,
      return_url:  `${process.env.NEXT_PUBLIC_BASE_URL}/cleaner-dashboard?stripe=success`,
      type: 'account_onboarding',
    });

    return NextResponse.json({ url: accountLink.url });

  } catch (err: any) {
    console.error('STRIPE ONBOARD ERROR:', err?.message || err);
    return NextResponse.json({ 
      error: 'Internal error', 
      detail: err?.message || String(err) 
    }, { status: 500 });
  }
}