import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const cleanerId = Number(new URL(req.url).searchParams.get('cleanerId'));
  const reviews = await prisma.review.findMany({ where: { cleanerId } });
  return NextResponse.json(reviews);
}