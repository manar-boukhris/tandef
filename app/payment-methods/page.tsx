// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useLogout } from '@/lib/useLogout';

export default function PaymentMethodsPage() {
  const logout = useLogout('customer');
  const [methods, setMethods] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [brand, setBrand] = useState('Visa');
  const [last4, setLast4] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');

  useEffect(() => {
    document.title = "TANDEF – Zahlungsmethoden";
    loadMethods();

    const menuBtn = document.getElementById('user-menu-btn');
    const menu = document.getElementById('user-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }
  }, []);

  function loadMethods() {
    fetch('/api/customer/payment-methods')
      .then(res => res.json())
      .then(data => setMethods(Array.isArray(data) ? data : []));
  }

  async function addMethod() {
    if (!last4 || !expMonth || !expYear) return;
    await fetch('/api/customer/payment-methods', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brand, last4, expMonth, expYear }),
    });
    setLast4(''); setExpMonth(''); setExpYear(''); setShowForm(false);
    loadMethods();
  }

  async function removeMethod(id: number) {
    await fetch('/api/customer/payment-methods', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    loadMethods();
  }

  return (
    <>
      <style jsx global>{`
        :root{
          --purple-900:#3B0A73;--purple-700:#5B21B6;--purple-600:#6D28D9;--purple-500:#7C3AED;
          --purple-100:#EDE9FE;--purple-50:#F5F3FF;--ink:#1F1339;--muted:#6B6478;
        }
                          body{
  font-family:'Inter',sans-serif;
  color:var(--ink);
  background-color:#F6F4FC;
  background-image:url('/images/account-bg.png');
  background-size:cover;
  background-position:top center;
  background-repeat:no-repeat;
  background-attachment:fixed;
  min-height:100vh;
}
        h1,h2,h3{font-family:'Poppins',sans-serif;}
        .page-bg{
          background-color:#F6F4FC;
          background-image:url('/images/account-bg.png');
          background-size:cover;background-position:top center;background-repeat:no-repeat;
          background-attachment:fixed;min-height:100vh;
        }
        .panel{background:#fff;border-radius:20px;box-shadow:0 20px 50px -30px rgba(76,29,149,.25);}
        .btn-gradient{background:linear-gradient(90deg,var(--purple-700),var(--purple-500));transition:.2s ease;}
        .btn-gradient:hover{filter:brightness(1.05);}
        .dropdown-menu{background:#fff;border-radius:14px;box-shadow:0 20px 45px -15px rgba(76,29,149,.3);}
        .dropdown-menu a{display:block;padding:.7rem 1.25rem;color:var(--ink);font-size:.9rem;}
        .dropdown-menu a:hover{background:var(--purple-50);}
        .chat-bubble{
          position:fixed;right:28px;bottom:28px;width:56px;height:56px;border-radius:9999px;
          background:linear-gradient(135deg,var(--purple-700),var(--purple-500));
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 12px 30px -8px rgba(76,29,149,.5);
        }
        .form-input{background:#F7F6FA;border:1px solid #ECE9F3;border-radius:10px;padding:.7rem 1rem;width:100%;outline:none;}
        .form-input:focus{border-color:var(--purple-600);}
      `}</style>

      <header className="relative bg-white border-b" style={{borderColor: '#EDE9F5'}}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <a href="/" className="font-bold text-lg" style={{color: 'var(--ink)'}}>Haushaltshilfe</a>
          <nav className="flex items-center gap-8 text-sm font-medium relative">
            <a href="/pro-werden" className="flex flex-col items-center gap-1 hover:opacity-70" style={{color: 'var(--purple-700)'}}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
              Pro werden
            </a>
            <a href="/magazin" className="flex flex-col items-center gap-1 hover:opacity-70" style={{color: 'var(--purple-700)'}}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
              Magazin
            </a>
            <div className="relative">
              <button id="user-menu-btn" className="flex items-center gap-2 hover:opacity-70" style={{color: 'var(--purple-700)'}}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{background: 'var(--purple-100)'}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
                </span>
                <span className="flex items-center gap-1">Konto
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                </span>
              </button>
              <div id="user-menu" className="dropdown-menu hidden absolute right-0 mt-3 w-64 py-2 z-20">
                <a href="/dashboard">Mein Kundenbereich</a>
                <a href="/sessions">Meine Sessions</a>
                <a href="/invoices">Historie und Rechnungen</a>
                <a href="/account">Mein Profil</a>
                <a href="/preferences">Meine Kommunikationspräferenzen</a>
                <a href="/payment-methods" className="font-semibold" style={{color: 'var(--purple-700)'}}>Zahlungsmethoden</a>
                <a href="#" onClick={(e) => { e.preventDefault(); logout(); }} className="border-t" style={{borderColor: '#EDE9F5'}}>Abmelden</a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <section className="relative max-w-4xl mx-auto px-6 pt-10 pb-8">
        <p className="text-sm mb-8" style={{color: 'var(--muted)'}}>
          Kundenbereich <span className="mx-1">›</span> <span className="font-semibold" style={{color: 'var(--purple-700)'}}>Zahlungsmethoden</span>
        </p>
        <h1 className="text-4xl font-extrabold mb-3 text-center flex items-center justify-center gap-3" style={{color: 'var(--purple-700)'}}>
          <span style={{color: '#C9BCEB'}}>✦</span>
          Zahlungsmethoden
          <span style={{color: '#C9BCEB'}}>✦</span>
        </h1>
        <p className="text-center" style={{color: 'var(--muted)'}}>Verwalte deine hinterlegten Zahlungsarten.</p>
      </section>

      <section className="relative max-w-2xl mx-auto px-6 pb-24">

        {methods.length === 0 && !showForm && (
          <p className="text-center mb-6" style={{color: 'var(--muted)'}}>Noch keine Zahlungsmethode hinterlegt.</p>
        )}

        {methods.map((m: any) => (
          <div key={m.id} className="panel p-6 mb-5 flex items-center gap-5">
            <div className="w-14 h-10 rounded-lg flex items-center justify-center shrink-0" style={{background: 'linear-gradient(135deg,#3B0A73,#7C3AED)'}}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
            </div>
            <div className="flex-1">
              <p className="font-bold" style={{color: 'var(--ink)'}}>{m.brand} •••• {m.last4}</p>
              <p className="text-sm" style={{color: 'var(--muted)'}}>Gültig bis {String(m.expMonth).padStart(2, '0')}/{String(m.expYear).slice(-2)}</p>
            </div>
            <button onClick={() => removeMethod(m.id)} className="text-sm font-semibold hover:opacity-70" style={{color: '#D14343'}}>Entfernen</button>
          </div>
        ))}

        {showForm ? (
          <div className="panel p-6 mb-5 space-y-3">
            <input className="form-input" placeholder="Kartenmarke (z. B. Visa)" value={brand} onChange={(e) => setBrand(e.target.value)} />
            <input className="form-input" placeholder="Letzte 4 Ziffern" maxLength={4} value={last4} onChange={(e) => setLast4(e.target.value)} />
            <div className="grid grid-cols-2 gap-3">
              <input className="form-input" placeholder="Monat (MM)" value={expMonth} onChange={(e) => setExpMonth(e.target.value)} />
              <input className="form-input" placeholder="Jahr (YYYY)" value={expYear} onChange={(e) => setExpYear(e.target.value)} />
            </div>
            <div className="flex gap-3">
              <button onClick={addMethod} className="btn-gradient flex-1 text-white font-semibold py-3 rounded-full">Speichern</button>
              <button onClick={() => setShowForm(false)} className="flex-1 font-semibold py-3 rounded-full border" style={{borderColor: '#ECE9F3', color: 'var(--muted)'}}>Abbrechen</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setShowForm(true)} className="btn-gradient w-full text-white font-semibold py-4 rounded-full inline-flex items-center justify-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
            Neue Zahlungsmethode hinzufügen
          </button>
        )}

        <p className="flex items-center justify-center gap-2 text-sm mt-6" style={{color: 'var(--muted)'}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>
          Deine Zahlungsdaten werden sicher und verschlüsselt gespeichert.
        </p>

      </section>

      <div className="chat-bubble">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
      </div>
    </>
  );
}