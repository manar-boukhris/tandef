// app/api/connect/webhook/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const event = JSON.parse(body);

    // ── v1: account.updated ──────────────────────────────────────
    if (event.type === 'account.updated') {
      const account = event.data?.object;
      if (account?.charges_enabled && account?.id) {
        await prisma.cleaner.updateMany({
          where: { stripeAccountId: account.id },
          data:  { stripeOnboarded: true },
        });
      }
    }

    // ── v2: v2.core.account.* ────────────────────────────────────
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
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}