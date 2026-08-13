// app/api/connect/webhook/route.ts
// Stripe يبعث هنا كي الـ cleaner يكمل onboarding
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });

export async function POST(req: Request) {
  const body = await req.text();
  const sig  = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_CONNECT_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'account.updated') {
    const account = event.data.object as Stripe.Account;

    // الـ cleaner أكمل onboarding إذا charges_enabled = true
    if (account.charges_enabled) {
      await prisma.cleaner.updateMany({
        where: { stripeAccountId: account.id },
        data:  { stripeOnboarded: true },
      });
    }
  }

  return NextResponse.json({ received: true });
}