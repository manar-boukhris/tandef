import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const password = await bcrypt.hash('password123', 10);

  const customer = await prisma.user.create({
    data: { email: 'walid@tandef.de', password, name: 'Walid', role: 'customer' },
  });

  const cleanerUser = await prisma.user.create({
    data: { email: 'sara@tandef.de', password, name: 'Sara', role: 'cleaner' },
  });
  const cleaner = await prisma.cleaner.create({
    data: { userId: cleanerUser.id, rating: 4.8, status: 'active' },
  });

  await prisma.booking.createMany({
    data: [
      { userId: customer.id, cleanerId: cleaner.id, status: 'upcoming', serviceType: 'Grundreinigung', date: new Date(), hours: 3, price: 44.7, address: 'Köln' },
      { userId: customer.id, cleanerId: cleaner.id, status: 'completed', serviceType: 'Fensterreinigung', date: new Date(Date.now() - 86400000 * 5), hours: 2, price: 29.8, address: 'Köln' },
      { userId: customer.id, cleanerId: cleaner.id, status: 'cancelled', serviceType: 'Umzugsreinigung', date: new Date(Date.now() - 86400000 * 2), hours: 4, price: 59.6, address: 'Köln' },
    ],
  });

  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.adminUser.create({
    data: { email: 'admin@tandef.de', password: adminPassword, name: 'Admin' },
  });


  const bookings = await prisma.booking.findMany({ where: { status: 'completed' } });
  for (const b of bookings) {
    await prisma.invoice.create({
      data: { bookingId: b.id, amount: b.price, status: 'paid' },
    });
  }

  await prisma.review.create({
    data: { cleanerId: cleaner.id, rating: 5, comment: 'Super Arbeit!' },
  });

  await prisma.cleanerApplication.create({
    data: { cleanerId: cleaner.id, status: 'pending' },
  });
}

main().finally(() => process.exit());