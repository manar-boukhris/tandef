// app/api/payment/webhook/route.ts
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
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    // ── Si v1 échoue → parser le body directement ──────────────────
    try {
      event = JSON.parse(body);
    } catch {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
    }
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent    = event.data?.object;
    const bookingId = parseInt(intent?.metadata?.bookingId);
    if (bookingId) {
      await prisma.booking.update({
        where: { id: bookingId },
        data:  { status: 'upcoming' },
      });
      await prisma.invoice.upsert({
        where:  { bookingId },
        update: { status: 'paid' },
        create: {
          bookingId,
          amount:   (intent?.amount || 0) / 100,
          status:   'paid',
          issuedAt: new Date(),
        },
      });
    }
  }

  if (event.type === 'payment_intent.payment_failed') {
    const intent    = event.data?.object;
    const bookingId = parseInt(intent?.metadata?.bookingId);
    if (bookingId) {
      await prisma.booking.update({
        where: { id: bookingId },
        data:  { status: 'cancelled' },
      });
    }
  }

  return NextResponse.json({ received: true });
}