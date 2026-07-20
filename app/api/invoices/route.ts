import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const invoices = await prisma.invoice.findMany({
    include: { booking: true },
    orderBy: { issuedAt: 'desc' },
  });
  return NextResponse.json(invoices);
}