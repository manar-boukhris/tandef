// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useLogout } from '@/lib/useLogout';

export default function AccountPage() {
  const logout = useLogout('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    document.title = "TANDEF – Mein Konto ansehen";

    fetch('/api/customer/account')
      .then(res => res.json())
      .then(data => {
        setName(data.name || '');
        setEmail(data.email || '');
        setAddress(data.address || '');
      });

    const menuBtn = document.getElementById('user-menu-btn');
    const menu = document.getElementById('user-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }
  }, []);

  async function handleSave() {
    setSaving(true);
    await fetch('/api/customer/account', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, address }),
    });
    setSaving(false);
    setSaved(true);
  }

  return (
    <>
      <style jsx global>{`
        :root{
          --purple-900:#3B0A73;
          --purple-700:#5B21B6;
          --purple-600:#6D28D9;
          --purple-500:#7C3AED;
          --purple-100:#EDE9FE;
          --purple-50:#F5F3FF;
          --ink:#1F1339;
          --muted:#6B6478;
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
        h1,h2,h3,.display{font-family:'Poppins',sans-serif;}
        .page-bg{
          background-color:#F6F4FC;
          background-image:url('/images/account-bg.png');
          background-size:cover;
          background-position:top center;
          background-repeat:no-repeat;
          background-attachment:fixed;
          position:relative;
        }
        .field-icon{
          width:44px;height:44px;border-radius:9999px;
          background:var(--purple-100);
          display:flex;align-items:center;justify-content:center;
          flex-shrink:0;
        }
        .field-input{background:#fff;border:1px solid #E7E2F2;border-radius:10px;color:var(--ink);}
        .field-input::placeholder{color:#B7B0C6;}
        .field-input:focus{outline:none;border-color:var(--purple-600);}
        .btn-gradient{background:linear-gradient(90deg,var(--purple-700),var(--purple-500));transition:.2s ease;}
        .btn-gradient:hover{filter:brightness(1.05);}
        .profile-card{background:#fff;border-radius:24px;box-shadow:0 20px 50px -25px rgba(76,29,149,.2);}
        .dropdown-menu{background:#fff;border-radius:14px;box-shadow:0 20px 45px -15px rgba(76,29,149,.3);}
        .dropdown-menu a{display:block;padding:.7rem 1.25rem;color:var(--ink);font-size:.9rem;}
        .dropdown-menu a:hover{background:var(--purple-50);}
        .chat-bubble{
          position:fixed;right:28px;bottom:28px;width:56px;height:56px;border-radius:9999px;
          background:linear-gradient(135deg,var(--purple-700),var(--purple-500));
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 12px 30px -8px rgba(76,29,149,.5);
        }
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
            <div id="user-menu-wrapper" className="relative">
              <button id="user-menu-btn" className="flex flex-col items-center gap-1 hover:opacity-70" style={{color: 'var(--purple-700)'}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M6.5 19a6 6 0 0111 0" /></svg>
                <span className="flex items-center gap-1">Konto
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                </span>
              </button>
              <div id="user-menu" className="dropdown-menu hidden absolute right-0 mt-3 w-64 py-2 z-20">
                <a href="/dashboard">Mein Kundenbereich</a>
                <a href="/sessions">Meine Sessions</a>
                <a href="/invoices">Historie und Rechnungen</a>
                <a href="/account" className="font-semibold" style={{color: 'var(--purple-700)'}}>Mein Profil</a>
                <a href="/preferences">Meine Kommunikationspräferenzen</a>
                <a href="/payment-methods">Zahlungsmethoden</a>
                <a href="#" onClick={(e) => { e.preventDefault(); logout(); }} className="border-t" style={{borderColor: '#EDE9F5'}}>Abmelden</a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <section className="relative max-w-5xl mx-auto px-6 pt-10 pb-8 text-center">
        <p className="text-sm mb-8 text-left" style={{color: 'var(--muted)'}}>
          Kundenbereich <span className="mx-1">›</span> <span className="font-semibold" style={{color: 'var(--purple-700)'}}>Mein Profil</span>
        </p>
        <h1 className="text-4xl font-extrabold mb-3 flex items-center justify-center gap-3" style={{color: 'var(--purple-700)'}}>
          <span style={{color: 'var(--purple-400)'}}>✦</span>
          Mein Konto ansehen
          <span style={{color: 'var(--purple-400)'}}>✦</span>
        </h1>
        <p className="text-base" style={{color: 'var(--muted)'}}>Verwalte deine persönlichen Daten und Einstellungen.</p>
      </section>

      <section className="relative max-w-3xl mx-auto px-6 pb-24">
        <div className="profile-card p-8 md:p-10">

          <div className="flex items-center gap-6 mb-6">
            <div className="field-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><circle cx="9" cy="8" r="3" /><path d="M2 20c0-3.3 3.1-6 7-6" /><circle cx="17" cy="9" r="2.5" /><path d="M14 20c0-2.4 2-4.3 5-4.3" /></svg>
            </div>
            <p className="w-32 font-semibold shrink-0" style={{color: 'var(--ink)'}}>Name</p>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="field-input flex-1 px-4 py-3" />
          </div>

          <div className="flex items-center gap-6 mb-6">
            <div className="field-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 6l10 7 10-7" /></svg>
            </div>
            <p className="w-32 font-semibold shrink-0" style={{color: 'var(--ink)'}}>E-Mail</p>
            <input type="text" value={email} readOnly className="field-input flex-1 px-4 py-3 opacity-60" />
          </div>

          <div className="flex items-center gap-6 mb-6">
            <div className="field-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>
            </div>
            <p className="w-32 font-semibold shrink-0" style={{color: 'var(--ink)'}}>Passwort</p>
            <input type="password" value="••••••••" readOnly className="field-input px-4 py-3" style={{width: '180px'}} />
            <a href="#" className="text-sm font-semibold whitespace-nowrap" style={{color: 'var(--purple-700)'}}>Mein Passwort ändern</a>
          </div>

          <div className="flex items-center gap-6 mb-8">
            <div className="field-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
            </div>
            <p className="w-32 font-semibold shrink-0" style={{color: 'var(--ink)'}}>Adresse</p>
            <input type="text" placeholder="–" value={address} onChange={(e) => setAddress(e.target.value)} className="field-input flex-1 px-4 py-3" />
          </div>

          <div className="text-center">
            <button onClick={handleSave} disabled={saving} className="btn-gradient text-white font-semibold px-10 py-3.5 rounded-full inline-flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 3l7 7-11 11H3v-7L14 3z" /></svg>
              {saving ? 'Wird gespeichert...' : saved ? 'Gespeichert ✓' : 'Ändern'}
            </button>
          </div>

        </div>
      </section>

      <div className="chat-bubble">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
      </div>
    </>
  );
}