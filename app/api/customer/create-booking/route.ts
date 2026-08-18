// app/api/customer/create-booking/route.ts
/*import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { getCustomerSession } from '@/lib/session';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// ⭐ Cleaner reçoit un tarif fixe/h selon le pack
const CLEANER_RATES: Record<string, Record<string, number>> = {
    wohnung: { Basic: 18, Standard: 19, Premium: 20 },
    firmen:  { Basic: 18, Standard: 19, Premium: 20 },
    umzug:   { default: 0 }, // 80% du total (20% TANDEF)
  };
  
  const bType    = draft.bookingType || 'wohnung';
  const pName    = draft.packageName  || 'Basic';
  const isUmzug  = bType === 'umzug';
  
  let platformFee: number;
  
  if (isUmzug) {
    // Umzug: TANDEF prend 20% du Festpreis
    platformFee = Math.round(amountCents * 0.20);
  } else {
    // Wohnung/Firmen: cleaner reçoit taux fixe × heures
    const cleanerRate   = CLEANER_RATES[bType]?.[pName] || 18;
    const cleanerAmount = cleanerRate * (isFixed ? 1 : nbHours);
    platformFee         = Math.max(0, amountCents - Math.round(cleanerAmount * 100));
  }

const EXTRAS: Record<string, number> = {
  ironing: 2,
  product: 3,
};

export async function POST(req: Request) {
  const session = await getCustomerSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const draft = await req.json();
  const {
    serviceType, frequency, frequencyNote,
    hours, extras, date, time,
    address, cleanerId, paymentMethod,
    bookingType, packageName,
    hourlyRate, isFixedPrice,
  } = draft;

  if (!serviceType || !date || !time || !address) {
    return NextResponse.json({ error: 'Buchungsdaten unvollständig.' }, { status: 400 });
  }

  // ── 1. Trouver le cleaner ────────────────────────────────────────────────
  let finalCleanerId: number | null = cleanerId || null;
  if (!finalCleanerId) {
    const anyCleaner = await prisma.cleaner.findFirst({ where: { status: 'active' } });
    finalCleanerId = anyCleaner?.id || null;
  }

  let cleanerStripeAccountId: string | null = null;
  let cleanerOnboarded = false;
  if (finalCleanerId) {
    const cleaner = await prisma.cleaner.findUnique({ where: { id: finalCleanerId } });
    cleanerStripeAccountId = cleaner?.stripeAccountId || null;
    cleanerOnboarded       = cleaner?.stripeOnboarded || false;
  }

  // ── 2. Calculer le prix ──────────────────────────────────────────────────
  const rate       = hourlyRate || 24.90;
  const isFixed    = isFixedPrice || false;
  const nbHours    = isFixed ? 1 : (hours || 3);
  const extrasCost = (extras || []).reduce(
    (sum: number, id: string) => sum + (EXTRAS[id] || 0) * (isFixed ? 1 : nbHours),
    0
  );
  const baseCost   = isFixed ? rate : rate * nbHours;
  const totalPrice = parseFloat((baseCost + extrasCost).toFixed(2));
  const amountCents = Math.round(totalPrice * 100);

  // ── 3. Parser la date + heure ────────────────────────────────────────────
  const [hh, mm] = (time as string).split(':').map(Number);
  const bookingDate = new Date(date as string);
  bookingDate.setHours(hh, mm, 0, 0);

  // ── 4. Créer le booking en base (status: pending) ────────────────────────
  const booking = await prisma.booking.create({
    data: {
      userId:        session.userId,
      cleanerId:     finalCleanerId || undefined,
      status:        'pending',
      offerStatus:   finalCleanerId ? 'pending' : 'none',
      bookingType:   bookingType   || 'wohnung',
      packageName:   packageName   || 'Basic',
      serviceType,
      date:          bookingDate,
      hours:         isFixed ? 1 : nbHours,
      price:         totalPrice,
      address,
      paymentMethod: paymentMethod || 'card',
      frequency:     frequency     || 'Einmalig',
      frequencyNote: frequencyNote || null,
      extras:        (extras || []).join(','),  // ⭐ jdid
    },
  });

  // ── 5. Créer le PaymentIntent Stripe ─────────────────────────────────────
  const intentData: Stripe.PaymentIntentCreateParams = {
    amount:   amountCents,
    currency: 'eur',
    metadata: {
      bookingId:  String(booking.id),
      customerId: String(session.userId),
    },
  };

  // Split automatique si le cleaner a un compte Stripe actif
  if (cleanerStripeAccountId && cleanerOnboarded) {
    intentData.application_fee_amount = platformFee;
    intentData.transfer_data          = { destination: cleanerStripeAccountId };
  }

  const paymentIntent = await stripe.paymentIntents.create(intentData);

  return NextResponse.json({
    ok:           true,
    clientSecret: paymentIntent.client_secret,
    bookingId:    booking.id,
  });
}*/
// app/api/customer/create-booking/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { getCustomerSession } from '@/lib/session';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const EXTRAS: Record<string, number> = {
  ironing: 2,
  product: 3,
};

// ⭐ Tarif fixe du cleaner selon le type et le pack
const CLEANER_RATES: Record<string, Record<string, number>> = {
  wohnung: { Basic: 18, Standard: 19, Premium: 20 },
  firmen:  { Basic: 18, Standard: 19, Premium: 20 },
};

export async function POST(req: Request) {
  const session = await getCustomerSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const draft = await req.json();
  const {
    serviceType, frequency, frequencyNote,
    hours, extras, date, time,
    address, cleanerId, paymentMethod,
    bookingType, packageName,
    hourlyRate, isFixedPrice,
  } = draft;

  if (!serviceType || !date || !time || !address) {
    return NextResponse.json({ error: 'Buchungsdaten unvollständig.' }, { status: 400 });
  }

  // ── 1. Trouver le cleaner ────────────────────────────────────────────────
  let finalCleanerId: number | null = cleanerId || null;
  if (!finalCleanerId) {
    const anyCleaner = await prisma.cleaner.findFirst({ where: { status: 'active' } });
    finalCleanerId = anyCleaner?.id || null;
  }

  let cleanerStripeAccountId: string | null = null;
  let cleanerOnboarded = false;
  if (finalCleanerId) {
    const cleaner = await prisma.cleaner.findUnique({ where: { id: finalCleanerId } });
    cleanerStripeAccountId = cleaner?.stripeAccountId || null;
    cleanerOnboarded       = cleaner?.stripeOnboarded || false;
  }

  // ── 2. Calculer le prix ──────────────────────────────────────────────────
  const rate       = hourlyRate || 24.90;
  const isFixed    = isFixedPrice || false;
  const nbHours    = isFixed ? 1 : (hours || 3);
  const extrasCost = (extras || []).reduce(
    (sum: number, id: string) => sum + (EXTRAS[id] || 0) * (isFixed ? 1 : nbHours),
    0
  );
  const baseCost    = isFixed ? rate : rate * nbHours;
  const totalPrice  = parseFloat((baseCost + extrasCost).toFixed(2));
  const amountCents = Math.round(totalPrice * 100);

  // ── 3. Calculer la plateforme fee ────────────────────────────────────────
  const bType   = bookingType || 'wohnung';
  const pName   = packageName || 'Basic';
  const isUmzug = bType === 'umzug';

  let platformFee: number;
  if (isUmzug) {
    // Umzug: TANDEF prend 20% du Festpreis
    platformFee = Math.round(amountCents * 0.20);
  } else {
    // Wohnung/Firmen: cleaner reçoit taux fixe × heures
    const cleanerRate   = CLEANER_RATES[bType]?.[pName] || 18;
    const cleanerAmount = cleanerRate * nbHours;
    platformFee         = Math.max(0, amountCents - Math.round(cleanerAmount * 100));
  }

  // ── 4. Parser la date + heure ────────────────────────────────────────────
  const [hh, mm] = (time as string).split(':').map(Number);
  const bookingDate = new Date(date as string);
  bookingDate.setHours(hh, mm, 0, 0);

  // ── 5. Créer le booking en base (status: pending) ────────────────────────
  const booking = await prisma.booking.create({
    data: {
      userId:        session.userId,
      cleanerId:     finalCleanerId || undefined,
      status:        'pending',
      offerStatus:   finalCleanerId ? 'pending' : 'none',
      bookingType:   bType,
      packageName:   pName,
      serviceType,
      date:          bookingDate,
      hours:         isFixed ? 1 : nbHours,
      price:         totalPrice,
      address,
      paymentMethod: paymentMethod || 'card',
      frequency:     frequency     || 'Einmalig',
      frequencyNote: frequencyNote || null,
      extras:        (extras || []).join(','),
    },
  });

  // ── 6. Créer le PaymentIntent Stripe ─────────────────────────────────────
  const intentData: Stripe.PaymentIntentCreateParams = {
    amount:   amountCents,
    currency: 'eur',
    metadata: {
      bookingId:  String(booking.id),
      customerId: String(session.userId),
    },
  };

  if (cleanerStripeAccountId && cleanerOnboarded) {
    intentData.application_fee_amount = platformFee;
    intentData.transfer_data          = { destination: cleanerStripeAccountId };
  }

  const paymentIntent = await stripe.paymentIntents.create(intentData);

  return NextResponse.json({
    ok:           true,
    clientSecret: paymentIntent.client_secret,
    bookingId:    booking.id,
  });
}