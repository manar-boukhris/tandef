// app/checkout/page.tsx
// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { getDraft, clearDraft } from '@/lib/bookingDraft';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const EXTRAS: Record<string, { name: string; price: number }> = {
  ironing: { name: 'Bügeln', price: 2 },
  product: { name: 'Reinigungsmittel', price: 3 },
};

// ─── Stripe Payment Form ──────────────────────────────────────────────────────
function StripeForm({ bookingId }: { bookingId: number }) {
  const stripe   = useStripe();
  const elements = useElements();
  const router   = useRouter();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError('');

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/confirmation?bookingId=${bookingId}`,
      },
    });

    if (stripeError) {
      setError(stripeError.message || 'Zahlung fehlgeschlagen.');
      setLoading(false);
    }
    // Si succès → Stripe redirige vers return_url automatiquement
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement
        options={{
          layout: 'tabs',
          defaultValues: { billingDetails: { address: { country: 'DE' } } },
        }}
      />
      {error && <p className="text-sm font-medium" style={{color: '#C0392B'}}>{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="btn-gradient w-full text-white font-semibold py-4 rounded-full inline-flex items-center justify-center gap-2"
        style={{opacity: loading ? 0.7 : 1}}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/></svg>
        {loading ? 'Wird verarbeitet...' : 'Jetzt bezahlen'}
      </button>
      <div className="flex items-center justify-center gap-2">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/></svg>
        <p className="text-xs" style={{color: 'var(--muted)'}}>Gesichert durch Stripe · SSL-verschlüsselt</p>
      </div>
    </form>
  );
}

// ─── Main Checkout Page ───────────────────────────────────────────────────────
export default function CheckoutPage() {
  const router = useRouter();
  const [draft,        setDraft]        = useState<any>({});
  const [clientSecret, setClientSecret] = useState('');
  const [bookingId,    setBookingId]    = useState<number | null>(null);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState('');

  useEffect(() => {
    document.title = "TANDEF – Zahlung";
    const d = getDraft();
    setDraft(d);

    // Créer le booking + PaymentIntent dès l'arrivée sur la page
    fetch('/api/customer/create-booking', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(d),
    })
      .then(r => r.json())
      .then(data => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          setBookingId(data.bookingId);
        } else {
          setError(data.error || 'Fehler beim Laden der Zahlung.');
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Verbindungsfehler. Bitte versuche es erneut.');
        setLoading(false);
      });

    const menuBtn = document.getElementById('user-menu-btn');
    const menu    = document.getElementById('user-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }
  }, []);

  // Calcul du prix (identique à avant)
  const rate           = draft.hourlyRate || 24.90;
  const isFixedPrice   = draft.isFixedPrice || false;
  const hours          = draft.hours || 3;
  const selectedExtras = (draft.extras || []).map((id: string) => EXTRAS[id]).filter(Boolean);
  const baseCost       = isFixedPrice ? rate : rate * hours;
  const extrasCost     = selectedExtras.reduce((s: number, e: { price: number }) => s + e.price * hours, 0);
  const total          = (baseCost + extrasCost).toFixed(2).replace('.', ',');
  const dateLabel      = draft.date
    ? new Date(draft.date).toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })
    : '';

  return (
    <>
      <style jsx global>{`
        :root{--purple-900:#3B0A73;--purple-700:#5B21B6;--purple-600:#6D28D9;--purple-500:#7C3AED;--purple-100:#EDE9FE;--purple-50:#F5F3FF;--ink:#1F1339;--muted:#6B6478;}
        body{font-family:'Inter',sans-serif;color:var(--ink);background-color:#F6F4FC;background-image:url('/images/sessions-bg.png');background-size:cover;background-position:top center;background-repeat:no-repeat;background-attachment:fixed;min-height:100vh;}
        h1,h2,h3{font-family:'Poppins',sans-serif;}
        .panel{background:#fff;border-radius:20px;box-shadow:0 20px 50px -30px rgba(76,29,149,.25);}
        .btn-gradient{background:linear-gradient(90deg,var(--purple-700),var(--purple-500));transition:.2s ease;}
        .btn-gradient:hover{filter:brightness(1.05);}
        .progress-track{background:#E7E4EF;border-radius:9999px;height:6px;}
        .progress-fill{background:var(--purple-600);border-radius:9999px;height:6px;width:97%;}
        .dropdown-menu{background:#fff;border-radius:14px;box-shadow:0 20px 45px -15px rgba(76,29,149,.3);}
        .dropdown-menu a{display:block;padding:.7rem 1.25rem;color:var(--ink);font-size:.9rem;}
        .dropdown-menu a:hover{background:var(--purple-50);}
        .chat-bubble{position:fixed;right:28px;bottom:28px;width:56px;height:56px;border-radius:9999px;background:linear-gradient(135deg,var(--purple-700),var(--purple-500));display:flex;align-items:center;justify-content:center;box-shadow:0 12px 30px -8px rgba(76,29,149,.5);}
        /* Stripe Elements custom style */
        .StripeElement{padding:0;}
      `}</style>

      <div className="relative max-w-5xl mx-auto px-6 pt-8 flex items-center gap-4">
        <a href="/booking-cleaner" className="text-gray-400 hover:text-gray-600">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </a>
        <div className="progress-track flex-1"><div className="progress-fill"></div></div>
      </div>

      <section className="relative max-w-5xl mx-auto px-6 pt-10 pb-24">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-center" style={{color: 'var(--purple-700)'}}>Fast geschafft!</h1>
        <p className="mb-10 text-center" style={{color: 'var(--muted)'}}>Wähle deine Zahlungsmethode und bestätige die Buchung.</p>

        <div className="grid lg:grid-cols-5 gap-8">

          {/* ─── Left: Stripe Payment Form ─── */}
          <div className="lg:col-span-3">
            <div className="panel p-7">
              {loading ? (
                <div className="text-center py-12" style={{color: 'var(--muted)'}}>
                  <svg className="animate-spin mx-auto mb-4" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--purple-600)" strokeWidth="2"><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/></svg>
                  Zahlung wird vorbereitet...
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-sm font-medium mb-4" style={{color: '#C0392B'}}>{error}</p>
                  <button onClick={() => window.location.reload()} className="btn-gradient text-white font-semibold px-6 py-3 rounded-full text-sm">
                    Erneut versuchen
                  </button>
                </div>
              ) : clientSecret && bookingId ? (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    locale: 'de',
                    appearance: {
                      theme: 'stripe',
                      variables: {
                        colorPrimary: '#5B21B6',
                        colorBackground: '#ffffff',
                        colorText: '#1F1339',
                        fontFamily: 'Inter, sans-serif',
                        borderRadius: '12px',
                      },
                    },
                  }}
                >
                  <StripeForm bookingId={bookingId} />
                </Elements>
              ) : null}
            </div>
          </div>

          {/* ─── Right: Booking Summary ─── */}
          <div className="lg:col-span-2">
            <div className="panel p-7 sticky top-6">
              <h3 className="font-bold text-lg mb-6" style={{color: 'var(--ink)'}}>Deine Buchung</h3>
              <div className="space-y-4 text-sm mb-6">
                <div className="flex items-start gap-3">
                  <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                  <div>
                    <p className="font-semibold" style={{color: 'var(--ink)'}}>
                      {draft.bookingType === 'firmen' ? 'Firmenreinigung' : draft.bookingType === 'umzug' ? 'Umzugsreinigung' : 'Wohnungsreinigung'}
                      {draft.packageName ? ` · ${draft.packageName === '1-Zimmer' ? '1-Zimmer Wohnung' : draft.packageName === '2-3-Zimmer' ? '2–3 Zimmer Wohnung' : draft.packageName === '4plus-Zimmer' ? '4+ Zimmer Wohnung' : draft.packageName}` : ''}
                    </p>
                    {draft.serviceType && <p style={{color: 'var(--muted)'}}>{draft.serviceType}</p>}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z"/></svg>
                  <p style={{color: 'var(--muted)'}}>{draft.address || '–'}</p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/></svg>
                  <p style={{color: 'var(--muted)'}}>{dateLabel} · {draft.time || '–'} Uhr</p>
                </div>
                {!isFixedPrice && (
                  <div className="flex items-start gap-3">
                    <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
                    <p style={{color: 'var(--muted)'}}>{hours} Stunden · {draft.frequency || '–'}</p>
                  </div>
                )}
              </div>
              <div className="border-t pt-4 space-y-2 text-sm" style={{borderColor: '#EFEAF6'}}>
                {isFixedPrice ? (
                  <div className="flex justify-between">
                    <span style={{color: 'var(--muted)'}}>Festpreis</span>
                    <span>{baseCost.toFixed(2).replace('.', ',')} €</span>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span style={{color: 'var(--muted)'}}>{rate.toFixed(2).replace('.', ',')} € × {hours} Std.</span>
                    <span>{baseCost.toFixed(2).replace('.', ',')} €</span>
                  </div>
                )}
                {selectedExtras.map((e: { name: string; price: number }) => (
                  <div key={e.name} className="flex justify-between">
                    <span style={{color: 'var(--muted)'}}>{e.name} ({e.price.toFixed(2).replace('.', ',')} € × {hours} Std.)</span>
                    <span>+{(e.price * hours).toFixed(2).replace('.', ',')} €</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-base pt-2" style={{color: 'var(--ink)'}}>
                  <span>Gesamt</span>
                  <span style={{color: 'var(--purple-700)'}}>{total} €</span>
                </div>
              </div>
              <p className="text-xs text-center mt-4" style={{color: 'var(--muted)'}}>Bezahlt wird erst nach der Reinigung.</p>
            </div>
          </div>

        </div>
      </section>

      <div className="chat-bubble">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
      </div>
    </>
  );
}