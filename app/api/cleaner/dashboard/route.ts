import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCleanerSession } from '@/lib/session';  

export async function GET() {
    const session = await getCleanerSession();
    if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
  }

  const cleaner = await prisma.cleaner.findUnique({
    where: { userId: session.userId },
    include: {
      user: { select: { name: true } },
      bookings: {
        include: { user: { select: { name: true } } },
        orderBy: { date: 'asc' },
      },
      reviews: true,
    },
  });

  if (!cleaner) {
    return NextResponse.json({ error: 'Cleaner nicht gefunden.' }, { status: 404 });
  }

  const now = new Date();

  // Prochaine session (upcoming, date future la plus proche)
  const nextBooking = cleaner.bookings.find(b => b.status === 'upcoming' && new Date(b.date) >= now) || null;

  // Sessions abgeschlossen
  const completedCount = cleaner.bookings.filter(b => b.status === 'completed').length;

  // Guthaben: somme du prix des bookings completed
  const guthaben = cleaner.bookings
    .filter(b => b.status === 'completed')
    .reduce((sum, b) => sum + b.price, 0);

  // Disponibilité cette semaine
  const startOfWeek = new Date(now);
  startOfWeek.setHours(0, 0, 0, 0);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1); // lundi
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  const availableDaysThisWeek = await prisma.availability.count({
    where: {
      cleanerId: cleaner.id,
      isAvailable: true,
      date: { gte: startOfWeek, lt: endOfWeek },
    },
  });
  const availableHoursThisWeek = availableDaysThisWeek * 8; // approximation: 8h/jour dispo

  return NextResponse.json({
    name: cleaner.user.name,
    rating: cleaner.rating,
    completedCount,
    guthaben,
    availableHoursThisWeek,
    nextBooking: nextBooking ? {
      serviceType: nextBooking.serviceType,
      date: nextBooking.date,
      hours: nextBooking.hours,
      address: nextBooking.address,
      customerName: nextBooking.user.name,
    } : null,
  });
}