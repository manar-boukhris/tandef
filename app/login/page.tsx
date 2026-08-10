import { redirect } from 'next/navigation';
import { getCustomerSession } from '@/lib/session';
import LoginForm from './LoginForm';

export default async function LoginPage() {
  const session = await getCustomerSession();
  if (session) redirect('/dashboard');
  return <LoginForm />;
}