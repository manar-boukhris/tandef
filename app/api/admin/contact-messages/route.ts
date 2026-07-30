import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/session';

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Pour chaque message, on cherche si l'e-mail correspond à un compte existant
  // (client ou cleaner) et on récupère son activité sur la plateforme.
  const enriched = await Promise.all(
    messages.map(async (m) => {
      const user = await prisma.user.findUnique({
        where: { email: m.email },
        include: {
          bookings: {
            orderBy: { createdAt: 'desc' },
            select: { id: true, status: true, serviceType: true, date: true, price: true },
          },
          cleanerProfile: {
            include: {
              application: { select: { status: true } },
              bookings: {
                orderBy: { createdAt: 'desc' },
                select: { id: true, status: true, serviceType: true, date: true, price: true },
              },
              reviews: { select: { rating: true } },
            },
          },
        },
      });

      let accountInfo = null;
      if (user) {
        if (user.role === 'cleaner' && user.cleanerProfile) {
          const reviews = user.cleanerProfile.reviews || [];
          const avgRating = reviews.length
            ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
            : null;
          accountInfo = {
            role: 'cleaner',
            userId: user.id,
            name: user.name,
            phone: user.phone,
            createdAt: user.createdAt,
            cleanerStatus: user.cleanerProfile.status,
            applicationStatus: user.cleanerProfile.application?.status || null,
            rating: user.cleanerProfile.rating,
            avgReviewRating: avgRating,
            totalBookings: user.cleanerProfile.bookings.length,
            recentBookings: user.cleanerProfile.bookings.slice(0, 5),
          };
        } else {
          accountInfo = {
            role: 'customer',
            userId: user.id,
            name: user.name,
            phone: user.phone,
            createdAt: user.createdAt,
            totalBookings: user.bookings.length,
            recentBookings: user.bookings.slice(0, 5),
          };
        }
      }

      return { ...m, accountInfo };
    })
  );

  return NextResponse.json(enriched);
}

export async function PATCH(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const { id, status } = await req.json();
  if (!id || !['new', 'read', 'resolved'].includes(status)) {
    return NextResponse.json({ error: 'Ungültige Daten.' }, { status: 400 });
  }

  const updated = await prisma.contactMessage.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json(updated);
}