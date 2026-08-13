// app/api/connect/webhook/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig  = req.headers.get('stripe-signature')!;

  let event: any;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_CONNECT_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // ── v1: account.updated ──────────────────────────────────────────
  if (event.type === 'account.updated') {
    const account = event.data.object as Stripe.Account;
    if (account.charges_enabled) {
      await prisma.cleaner.updateMany({
        where: { stripeAccountId: account.id },
        data:  { stripeOnboarded: true },
      });
    }
  }

  // ── v2: v2.core.account[...].updated ────────────────────────────
  if (event.type?.startsWith('v2.core.account')) {
    const accountId = event.data?.object?.id || event.related_object?.id;
    if (accountId) {
      await prisma.cleaner.updateMany({
        where: { stripeAccountId: accountId },
        data:  { stripeOnboarded: true },
      });
    }
  }

  return NextResponse.json({ received: true });
}