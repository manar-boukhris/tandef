// component لتضيفيه في صفحة cleaner-onboarding أو cleaner-dashboard
// @ts-nocheck
'use client';

import { useState } from 'react';

export function StripeConnectButton({ isOnboarded }: { isOnboarded: boolean }) {
  const [loading, setLoading] = useState(false);

  async function handleConnect() {
    setLoading(true);
    const res  = await fetch('/api/connect/onboard', { method: 'POST' });
    const data = await res.json();
    if (data.url) window.location.href = data.url; // redirect لـ Stripe
    else setLoading(false);
  }

  if (isOnboarded) {
    return (
      <div className="flex items-center gap-2 text-sm font-semibold" style={{color: '#15803D'}}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12l5 5 9-9"/></svg>
        Bankkonto verbunden ✓
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl"
      style={{background: 'linear-gradient(90deg,#5B21B6,#7C3AED)'}}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>
      {loading ? 'Wird geladen...' : 'Bankkonto verbinden (IBAN)'}
    </button>
  );
}