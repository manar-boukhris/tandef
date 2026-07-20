import { useRouter } from 'next/navigation';

export function useLogout(role: 'customer' | 'cleaner' = 'customer') {
  const router = useRouter();
  return async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    });
    router.push('/login');
  };
}