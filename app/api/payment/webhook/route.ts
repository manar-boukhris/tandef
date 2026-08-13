// app/api/payment/webhook/route.ts
// Stripe يبعث هنا كي الدفع ينجح أو يفشل
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig  = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent    = event.data.object as Stripe.PaymentIntent;
    const bookingId = parseInt(intent.metadata.bookingId);

    // نخزن الـ invoice ونبدل status الـ booking
    await prisma.booking.update({
      where: { id: bookingId },
      data:  { status: 'upcoming' }, // paid & confirmed
    });

    await prisma.invoice.upsert({
      where:  { bookingId },
      update: { status: 'paid' },
      create: {
        bookingId,
        amount:   intent.amount / 100,
        status:   'paid',
        issuedAt: new Date(),
      },
    });
  }

  if (event.type === 'payment_intent.payment_failed') {
    const intent    = event.data.object as Stripe.PaymentIntent;
    const bookingId = parseInt(intent.metadata.bookingId);
    await prisma.booking.update({
      where: { id: bookingId },
      data:  { status: 'cancelled' },
    });
  }

  return NextResponse.json({ received: true });
}