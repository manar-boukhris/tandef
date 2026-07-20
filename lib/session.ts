import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { verifySession, SessionPayload } from './auth';

export const CUSTOMER_SESSION_COOKIE = 'tandef_customer_session';
export const CLEANER_SESSION_COOKIE = 'tandef_cleaner_session';
export const ADMIN_SESSION_COOKIE = 'tandef_admin_session';

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function getCustomerSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(CUSTOMER_SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = verifySession(token);
  if (!session || session.role !== 'customer') return null;
  return session;
}

export async function getCleanerSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(CLEANER_SESSION_COOKIE)?.value;
  if (!token) return null;
  const session = verifySession(token);
  if (!session || session.role !== 'cleaner') return null;
  return session;
}

export type AdminSessionPayload = { adminId: number; email: string };

export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as AdminSessionPayload;
  } catch {
    return null;
  }
}