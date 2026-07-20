import { NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import { prisma } from '@/lib/prisma';
import { getCustomerSession } from '@/lib/session';
import { InvoicePDF } from '@/lib/InvoicePDF';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getCustomerSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const { id } = await params;
  const invoiceId = Number(id);

  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: {
      booking: {
        include: {
          user: { select: { name: true, email: true } },
          cleaner: { include: { user: { select: { name: true } } } },
        },
      },
    },
  });

  if (!invoice || invoice.booking.userId !== session.userId) {
    return NextResponse.json({ error: 'Rechnung nicht gefunden.' }, { status: 404 });
  }

  const logoUrl = `${req.headers.get('origin') || 'http://localhost:3000'}/images/logo.png`;

  const stream = await renderToStream(
    InvoicePDF({
      invoiceNumber: `TDF-${String(invoice.id).padStart(6, '0')}`,
      issuedAt: invoice.issuedAt.toISOString(),
      status: invoice.status as 'paid' | 'pending',
      amount: invoice.amount,
      customerName: invoice.booking.user.name,
      customerEmail: invoice.booking.user.email,
      booking: {
        serviceType: invoice.booking.serviceType,
        date: invoice.booking.date.toISOString(),
        hours: invoice.booking.hours,
        address: invoice.booking.address,
      },
      cleanerName: invoice.booking.cleaner?.user?.name,
      logoUrl,
    })
  );

  const chunks: Uint8Array[] = [];
  for await (const chunk of stream as any) {
    chunks.push(chunk);
  }
  const buffer = Buffer.concat(chunks);

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="TANDEF-Rechnung-${invoice.id}.pdf"`,
    },
  });
}