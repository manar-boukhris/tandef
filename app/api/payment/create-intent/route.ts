// app/api/payment/create-intent/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { getCustomerSession } from '@/lib/session';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-07-29.dahlia' });

const PLATFORM_FEE_PERCENT = 0.20; // TANDEF prend 20% de commission

export async function POST(req: Request) {
  const session = await getCustomerSession();
  if (!session) return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });

  const { bookingId } = await req.json();

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { cleaner: true },
  });

  if (!booking) return NextResponse.json({ error: 'Buchung nicht gefunden.' }, { status: 404 });
  if (booking.userId !== session.userId) return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 403 });

  const cleaner = booking.cleaner;
  if (!cleaner?.stripeAccountId || !cleaner?.stripeOnboarded) {
    return NextResponse.json({ error: 'Reinigungskraft hat kein Stripe-Konto.' }, { status: 400 });
  }

  const amountInCents       = Math.round(booking.price * 100); // ex: 50€ → 5000
  const platformFeeInCents  = Math.round(amountInCents * PLATFORM_FEE_PERCENT); // 20% → 1000

  const paymentIntent = await stripe.paymentIntents.create({
    amount:   amountInCents,
    currency: 'eur',
    application_fee_amount: platformFeeInCents, // reste chez TANDEF
    transfer_data: {
      destination: cleaner.stripeAccountId, // va vers le cleaner
    },
    metadata: {
      bookingId: String(booking.id),
      customerId: String(session.userId),
    },
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}