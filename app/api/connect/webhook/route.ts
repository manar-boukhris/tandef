// app/api/connect/webhook/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig  = req.headers.get('stripe-signature')!;

  let event: any;

  // ── Essayer v1 constructEvent ────────────────────────────────────
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_CONNECT_WEBHOOK_SECRET!);
  } catch {
    // ── Si v1 échoue → parser le body directement (v2 events) ──────
    try {
      event = JSON.parse(body);
    } catch {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
    }
  }

  // ── v1: account.updated ──────────────────────────────────────────
  if (event.type === 'account.updated') {
    const account = event.data?.object;
    if (account?.charges_enabled) {
      await prisma.cleaner.updateMany({
        where: { stripeAccountId: account.id },
        data:  { stripeOnboarded: true },
      });
    }
  }

  // ── v2: tout event v2.core.account.* ────────────────────────────
  if (event.object === 'v2.core.event' || event.type?.startsWith('v2.core.account')) {
    const accountId = event.related_object?.id;
    if (accountId) {
      await prisma.cleaner.updateMany({
        where: { stripeAccountId: accountId },
        data:  { stripeOnboarded: true },
      });
    }
  }

  return NextResponse.json({ received: true });
}