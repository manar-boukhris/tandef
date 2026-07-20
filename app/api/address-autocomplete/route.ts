import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');

  if (!q || q.length < 3) {
    return NextResponse.json([]);
  }

  const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=de&addressdetails=1&limit=5&q=${encodeURIComponent(q)}`;

  const res = await fetch(url, {
    headers: { 'User-Agent': 'TANDEF-App/1.0' },
  });

  if (!res.ok) {
    return NextResponse.json([]);
  }

  const data = await res.json();

  const suggestions = data.map((item: any) => ({
    label: item.display_name,
    street: item.address?.road ? `${item.address.road}${item.address.house_number ? ' ' + item.address.house_number : ''}` : '',
    city: item.address?.city || item.address?.town || item.address?.village || '',
    zip: item.address?.postcode || '',
  }));

  return NextResponse.json(suggestions);
}