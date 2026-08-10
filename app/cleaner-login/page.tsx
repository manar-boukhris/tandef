import { redirect } from 'next/navigation';
import { getCleanerSession } from '@/lib/session';
import CleanerLoginForm from './CleanerLoginForm';

export default async function CleanerLoginPage() {
  const session = await getCleanerSession();
  if (session) redirect('/cleaner-dashboard');
  return <CleanerLoginForm />;
}