// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDraft, clearDraft } from '@/lib/bookingDraft';

const FREQUENCY_RATES: Record<string, number> = {
  'Wöchentlich': 14.90,
  'Alle zwei Wochen': 16.90,
  'Einmalig': 19.90,
};

export default function CheckoutPage() {
  const router = useRouter();
  const [draft, setDraft] = useState<any>({});
  const [payMethod, setPayMethod] = useState<'card' | 'apple_pay' | 'klarna'>('card');
  const [savedCards, setSavedCards] = useState<any[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<number | 'new' | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpMonth, setCardExpMonth] = useState('');
  const [cardExpYear, setCardExpYear] = useState('');
  const [cardName, setCardName] = useState('');
  const [saveCard, setSaveCard] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = "TANDEF – Zahlung";
    setDraft(getDraft());

    fetch('/api/customer/payment-methods')
      .then(res => res.json())
      .then(data => {
        const cards = Array.isArray(data) ? data : [];
        setSavedCards(cards);
        setSelectedCardId(cards.length > 0 ? cards[0].id : 'new');
      });

    const menuBtn = document.getElementById('user-menu-btn');
    const menu = document.getElementById('user-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }
  }, []);

  const rate = FREQUENCY_RATES[draft.frequency] || 19.90;
  const extrasCost = (draft.extras || []).reduce((s: number, id: string) => s + (id === 'ironing' ? 2 : id === 'product' ? 3 : 0), 0);
  const hours = draft.hours || 3;
  const total = ((rate + extrasCost) * hours).toFixed(2).replace('.', ',');
  const dateLabel = draft.date ? new Date(draft.date).toLocaleDateString('de-DE', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }) : '';

  async function finalizeBooking(paymentMethod: string) {
    const res = await fetch('/api/customer/create-booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...draft, paymentMethod }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || 'Ein Fehler ist aufgetreten.');
      return false;
    }
    clearDraft();
    router.push('/confirmation');
    return true;
  }

  async function handleCardConfirm() {
    setError('');

    if (selectedCardId === 'new') {
      if (!cardNumber || !cardExpMonth || !cardExpYear || !cardName) {
        setError('Bitte fülle alle Kartenfelder aus.');
        return;
      }
      setLoading(true);

      if (saveCard) {
        const last4 = cardNumber.replace(/\s/g, '').slice(-4);
        await fetch('/api/customer/payment-methods', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ brand: 'Karte', last4, expMonth: cardExpMonth, expYear: cardExpYear }),
        });
      }
    } else {
      setLoading(true);
    }

    await finalizeBooking('card');
    setLoading(false);
  }

  async function handleApplePay() {
    setError('');
    // ⚠️ Apple Pay ye7taj domaine réel HTTPS + Apple Merchant Certificate.
    // Ma yekhdemch fi localhost. Ki el domaine w certificate ykounou jahzin,
    // hnaya nzidou ApplePaySession w validateMerchant flow réel.
    if (typeof window !== 'undefined' && !(window as any).ApplePaySession) {
      setError('Apple Pay ist auf diesem Gerät/Browser nicht verfügbar. (Erfordert Safari auf iOS/macOS + konfigurierte Domain)');
      return;
    }
    setError('Apple Pay ist noch nicht vollständig konfiguriert (Merchant-Zertifikat erforderlich).');
  }

  async function handleKlarna() {
    setError('');
    setLoading(true);
    const res = await fetch('/api/payments/klarna', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(draft),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Klarna ist aktuell nicht verfügbar.');
      return;
    }
    // Ki Klarna tkoun configurée, hnaya el redirect l Klarna checkout session
  }

  return (
    <>
      <style jsx global>{`
        :root{--purple-900:#3B0A73;--purple-700:#5B21B6;--purple-600:#6D28D9;--purple-500:#7C3AED;--purple-100:#EDE9FE;--purple-50:#F5F3FF;--ink:#1F1339;--muted:#6B6478;}
                          body{
  font-family:'Inter',sans-serif;
  color:var(--ink);
  background-color:#F6F4FC;
  background-image:url('/images/sessions-bg.png');
  background-size:cover;
  background-position:top center;
  background-repeat:no-repeat;
  background-attachment:fixed;
  min-height:100vh;
}
        h1,h2,h3{font-family:'Poppins',sans-serif;}
        .page-bg{background-color:#F6F4FC;background-image:url('/images/sessions-bg.png');background-size:cover;background-position:top center;background-repeat:no-repeat;background-attachment:fixed;min-height:100vh;}
        .panel{background:#fff;border-radius:20px;box-shadow:0 20px 50px -30px rgba(76,29,149,.25);}
        .pay-option{border:2px solid #ECE8F5;border-radius:14px;transition:.15s ease;cursor:pointer;background:#fff;}
        .pay-option:hover{border-color:#C9B8EC;}
        .pay-option.selected{border-color:var(--purple-600);background:var(--purple-50);}
        .pay-option.selected .check-dot{background:var(--purple-600);border-color:var(--purple-600);}
        .check-dot{width:20px;height:20px;border-radius:9999px;border:2px solid #D6CFE6;display:flex;align-items:center;justify-content:center;transition:.15s ease;}
        .field{background:#F7F6FA;border:1px solid #ECE9F3;border-radius:12px;transition:.15s ease;}
        .field:focus-within{border-color:var(--purple-600);background:#fff;}
        .field input{background:transparent;outline:none;width:100%;}
        .field input::placeholder{color:#9C96A8;}
        .btn-gradient{background:linear-gradient(90deg,var(--purple-700),var(--purple-500));transition:.2s ease;}
        .btn-gradient:hover{filter:brightness(1.05);}
        .progress-track{background:#E7E4EF;border-radius:9999px;height:6px;}
        .progress-fill{background:var(--purple-600);border-radius:9999px;height:6px;width:97%;}
        .dropdown-menu{background:#fff;border-radius:14px;box-shadow:0 20px 45px -15px rgba(76,29,149,.3);}
        .dropdown-menu a{display:block;padding:.7rem 1.25rem;color:var(--ink);font-size:.9rem;}
        .dropdown-menu a:hover{background:var(--purple-50);}
        .chat-bubble{position:fixed;right:28px;bottom:28px;width:56px;height:56px;border-radius:9999px;background:linear-gradient(135deg,var(--purple-700),var(--purple-500));display:flex;align-items:center;justify-content:center;box-shadow:0 12px 30px -8px rgba(76,29,149,.5);}
        .saved-card-row{border:1.5px solid #ECE8F5;border-radius:12px;transition:.15s ease;cursor:pointer;}
        .saved-card-row.selected{border-color:var(--purple-600);background:var(--purple-50);}
        .apple-pay-btn{background:#000;color:#fff;font-weight:600;transition:.2s ease;}
        .apple-pay-btn:hover{background:#1a1a1a;}
        .klarna-btn{background:#FFB3C7;color:#17120F;font-weight:700;transition:.2s ease;}
        .klarna-btn:hover{filter:brightness(0.97);}
      `}</style>

      <header className="relative bg-white border-b" style={{borderColor: '#EDE9F5'}}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <a href="/" className="font-bold text-lg" style={{color: 'var(--ink)'}}>Haushaltshilfe</a>
          <nav className="flex items-center gap-8 text-sm font-medium relative">
            <a href="/pro-werden" style={{color: 'var(--purple-700)'}}>Pro werden</a>
            <a href="/magazin" style={{color: 'var(--purple-700)'}}>Magazin</a>
            <div className="relative">
              <button id="user-menu-btn" style={{color: 'var(--purple-700)'}}>Konto</button>
              <div id="user-menu" className="dropdown-menu hidden absolute right-0 mt-3 w-64 py-2 z-20">
                <a href="/dashboard">Mein Kundenbereich</a>
                <a href="/sessions">Meine Sessions</a>
                <a href="/invoices">Historie und Rechnungen</a>
                <a href="/account">Mein Profil</a>
                <a href="/preferences">Meine Kommunikationspräferenzen</a>
                <a href="/payment-methods">Zahlungsmethoden</a>
                <a href="#" className="border-t" style={{borderColor: '#EDE9F5'}}>Abmelden</a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <div className="relative max-w-5xl mx-auto px-6 pt-8 flex items-center gap-4">
        <a href="/booking-cleaner" className="text-gray-400 hover:text-gray-600">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </a>
        <div className="progress-track flex-1"><div className="progress-fill"></div></div>
      </div>

      <section className="relative max-w-5xl mx-auto px-6 pt-10 pb-24">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 text-center" style={{color: 'var(--purple-700)'}}>Fast geschafft!</h1>
        <p className="mb-10 text-center" style={{color: 'var(--muted)'}}>Wähle deine Zahlungsmethode und bestätige die Buchung.</p>

        {error && <p className="text-center text-sm mb-6" style={{color: '#C0392B'}}>{error}</p>}

        <div className="grid lg:grid-cols-5 gap-8">

          <div className="lg:col-span-3 space-y-4">

            {/* Apple Pay */}
            <button
              onClick={handleApplePay}
              className="apple-pay-btn w-full py-4 rounded-xl flex items-center justify-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M16.5 2c-1.2.1-2.6.8-3.4 1.7-.7.8-1.3 2-1.1 3.1 1.3.1 2.6-.7 3.4-1.6.8-.9 1.3-2.1 1.1-3.2zM19.7 8.4c-1.9-.1-3.5 1.1-4.4 1.1-.9 0-2.3-1-3.8-1-1.9 0-3.7 1.1-4.7 2.9-2 3.5-.5 8.6 1.4 11.4.9 1.4 2 2.9 3.5 2.9 1.4-.1 1.9-.9 3.6-.9s2.1.9 3.6.9c1.5 0 2.5-1.4 3.4-2.7.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.6-1-2.6-3.9 0-2.5 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.4-2.1z" /></svg>
              Mit Apple Pay bezahlen
            </button>

            {/* Klarna */}
            <button
              onClick={handleKlarna}
              disabled={loading}
              className="klarna-btn w-full py-4 rounded-xl flex items-center justify-center gap-2"
            >
              Mit <strong>Klarna.</strong> bezahlen — später buchen, jetzt reservieren
            </button>

            <div className="flex items-center gap-4 my-2">
              <span className="flex-1 h-px" style={{background: '#EDE9F5'}}></span>
              <span className="text-sm" style={{color: 'var(--muted)'}}>Oder mit Karte</span>
              <span className="flex-1 h-px" style={{background: '#EDE9F5'}}></span>
            </div>

            {savedCards.map(card => (
              <div
                key={card.id}
                onClick={() => setSelectedCardId(card.id)}
                className={`saved-card-row p-4 flex items-center gap-4 ${selectedCardId === card.id ? 'selected' : ''}`}
              >
                <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{background: 'var(--purple-100)'}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm" style={{color: 'var(--ink)'}}>{card.brand} •••• {card.last4}</p>
                  <p className="text-xs" style={{color: 'var(--muted)'}}>Gültig bis {String(card.expMonth).padStart(2, '0')}/{String(card.expYear).slice(-2)}</p>
                </div>
                <span className="check-dot shrink-0">{selectedCardId === card.id && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 12l5 5 9-9" /></svg>}</span>
              </div>
            ))}

            <div
              onClick={() => setSelectedCardId('new')}
              className={`saved-card-row p-4 flex items-center gap-4 ${selectedCardId === 'new' ? 'selected' : ''}`}
            >
              <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0" style={{background: 'var(--purple-100)'}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
              </div>
              <p className="flex-1 font-semibold text-sm" style={{color: 'var(--ink)'}}>Neue Karte verwenden</p>
              <span className="check-dot shrink-0">{selectedCardId === 'new' && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 12l5 5 9-9" /></svg>}</span>
            </div>

            {selectedCardId === 'new' && (
              <div className="panel p-6 space-y-4">
                <div className="field flex items-center gap-3 px-4 py-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /></svg>
                  <input type="text" placeholder="Kartennummer" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} maxLength={19} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="field px-4 py-3"><input type="text" placeholder="Monat (MM)" value={cardExpMonth} onChange={(e) => setCardExpMonth(e.target.value)} maxLength={2} /></div>
                  <div className="field px-4 py-3"><input type="text" placeholder="Jahr (YYYY)" value={cardExpYear} onChange={(e) => setCardExpYear(e.target.value)} maxLength={4} /></div>
                </div>
                <div className="field px-4 py-3"><input type="text" placeholder="Name auf der Karte" value={cardName} onChange={(e) => setCardName(e.target.value)} /></div>
                <label className="flex items-center gap-2 text-sm" style={{color: 'var(--muted)'}}>
                  <input type="checkbox" checked={saveCard} onChange={(e) => setSaveCard(e.target.checked)} className="accent-purple-700" />
                  Diese Karte für zukünftige Zahlungen speichern
                </label>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="panel p-7 sticky top-6">
              <h3 className="font-bold text-lg mb-6" style={{color: 'var(--ink)'}}>Deine Buchung</h3>
              <div className="space-y-4 text-sm mb-6">
                <div className="flex items-start gap-3">
                  <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z" /></svg>
                  <p style={{color: 'var(--muted)'}}>{draft.address || '–'}</p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /></svg>
                  <p style={{color: 'var(--muted)'}}>{dateLabel} · {draft.time || '–'} Uhr</p>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><circle cx="12" cy="12" r="9" /></svg>
                  <p style={{color: 'var(--muted)'}}>{hours} Stunden · {draft.frequency || '–'}</p>
                </div>
              </div>
              <div className="border-t pt-4 space-y-2 text-sm" style={{borderColor: '#EFEAF6'}}>
                <div className="flex justify-between"><span style={{color: 'var(--muted)'}}>{rate.toFixed(2).replace('.', ',')} € × {hours} Std.</span><span>{(rate * hours).toFixed(2).replace('.', ',')} €</span></div>
                <div className="flex justify-between font-bold text-base pt-2" style={{color: 'var(--ink)'}}>
                  <span>Gesamt</span><span style={{color: 'var(--purple-700)'}}>{total} €</span>
                </div>
              </div>
              <button onClick={handleCardConfirm} disabled={loading} className="btn-gradient w-full mt-6 text-white font-semibold py-4 rounded-full inline-flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="10" width="16" height="10" rx="2" /></svg>
                {loading ? 'Wird gebucht...' : 'Jetzt buchen'}
              </button>
              <p className="text-xs text-center mt-4" style={{color: 'var(--muted)'}}>Bezahlt wird erst nach der Reinigung.</p>
            </div>
          </div>

        </div>
      </section>

      <div className="chat-bubble">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
      </div>
    </>
  );
}