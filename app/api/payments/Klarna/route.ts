import { NextResponse } from 'next/server';

// TODO: kи يوصلك API keys ta3 Klarna Business, 7ott hedhom fi .env:
// KLARNA_USERNAME=...
// KLARNA_PASSWORD=...
// KLARNA_API_URL=https://api.playground.klarna.com (test) wla https://api.klarna.com (production)

export async function POST(req: Request) {
  const klarnaUsername = process.env.KLARNA_USERNAME;
  const klarnaPassword = process.env.KLARNA_PASSWORD;

  if (!klarnaUsername || !klarnaPassword) {
    return NextResponse.json(
      { error: 'Klarna ist noch nicht konfiguriert. Bitte KLARNA_USERNAME und KLARNA_PASSWORD in .env setzen.' },
      { status: 501 }
    );
  }

  // Ki l API keys ykounou mawjoudin, hnaya nzidou el appel real l Klarna Payments API:
  //
  // const auth = Buffer.from(`${klarnaUsername}:${klarnaPassword}`).toString('base64');
  // const res = await fetch(`${process.env.KLARNA_API_URL}/payments/v1/sessions`, {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': `Basic ${auth}`,
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     purchase_country: 'DE',
  //     purchase_currency: 'EUR',
  //     locale: 'de-DE',
  //     order_amount: ..., // fi cents
  //     order_lines: [...],
  //   }),
  // });
  // const data = await res.json();
  // return NextResponse.json(data);

  return NextResponse.json({ error: 'Klarna-Integration noch nicht abgeschlossen.' }, { status: 501 });
}