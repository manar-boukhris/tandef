// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';

export default function CleanerPendingPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    document.title = "TANDEF – Dein Antrag wird geprüft";
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.name) setName(data.name.split(' ')[0]);
        if (data.email) setEmail(data.email);
      });
  }, []);

  return (
    <>
      <style jsx global>{`
        :root{
          --purple-900:#3B0A73;--purple-700:#5B21B6;--purple-600:#6D28D9;--purple-500:#7C3AED;
          --purple-100:#EDE9FE;--purple-50:#F5F3FF;--ink:#1F1339;--muted:#6B6478;
        }
        body{
          font-family:'Inter',sans-serif;color:var(--ink);
          background-color:#F6F4FC;background-image:url('/images/account-bg.png');
          background-size:cover;background-position:top center;background-repeat:no-repeat;
          background-attachment:fixed;min-height:100vh;
        }
        h1,h2,h3{font-family:'Poppins',sans-serif;}
        .panel{background:#fff;border-radius:20px;box-shadow:0 20px 50px -30px rgba(76,29,149,.25);}
        .icon-ring{
          width:96px;height:96px;border-radius:9999px;background:var(--purple-50);
          display:flex;align-items:center;justify-content:center;margin:0 auto;position:relative;
        }
        .icon-ring::before{
          content:'';position:absolute;inset:-8px;border-radius:9999px;
          border:2px dashed #D9CFEF;animation:spin 12s linear infinite;
        }
        @keyframes spin{to{transform:rotate(360deg);}}
        .step-row{display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid #F0ECF8;}
        .step-row:last-child{border-bottom:none;}
        .step-icon{width:34px;height:34px;border-radius:9999px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
        .btn-gradient{background:linear-gradient(90deg,var(--purple-700),var(--purple-500));transition:.2s ease;}
        .btn-gradient:hover{filter:brightness(1.05);}
        .mail-banner{
          background:var(--purple-50);border:1px solid var(--purple-100);
          border-radius:14px;padding:16px 20px;
          display:flex;align-items:flex-start;gap:12px;margin-bottom:24px;text-align:left;
        }
      `}</style>

      <header className="relative bg-white border-b" style={{borderColor: '#EDE9F5'}}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center">
            <img src="/images/logo.png" alt="TANDEF" className="h-9 w-auto" />
          </a>
          <p className="text-sm font-medium" style={{color: 'var(--muted)'}}>Registrierung als Reinigungskraft</p>
        </div>
      </header>

      <section className="relative max-w-xl mx-auto px-6 pt-16 pb-24 text-center">

        <div className="icon-ring mb-8">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2">
            <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
          </svg>
        </div>

        <h1 className="text-3xl font-extrabold mb-3" style={{color: 'var(--ink)'}}>
          Dein Antrag wird geprüft{name ? `, ${name}` : ''}!
        </h1>
        <p className="mb-8" style={{color: 'var(--muted)'}}>
          Wir haben deine Angaben erhalten. Unser Team prüft alles sorgfältig – das dauert in der Regel 1–2 Werktage. Du erhältst eine E-Mail, sobald dein Konto freigeschaltet ist.
        </p>

        {/* Email info banner */}
        <div className="mail-banner">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2" className="shrink-0 mt-0.5">
            <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 6l10 7 10-7"/>
          </svg>
          <div>
            <p className="font-semibold text-sm mb-1" style={{color: 'var(--ink)'}}>
              Wir haben dir eine E-Mail geschickt{email ? ` an ${email}` : ''}
            </p>
            <p className="text-sm" style={{color: 'var(--muted)'}}>
              Die E-Mail enthält deinen persönlichen Login-Link für Reinigungskräfte. Nutze diesen Link jedes Mal, wenn du dich einloggen möchtest:
            </p>
            <a
              href="/cleaner-login"
              className="inline-flex items-center gap-1.5 mt-2 text-sm font-semibold"
              style={{color: 'var(--purple-700)'}}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              tandef.de/cleaner-login
            </a>
          </div>
        </div>

        <div className="panel p-7 text-left mb-8">
          <div className="step-row">
            <span className="step-icon" style={{background: '#E7F7EE'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2.5"><path d="M5 12l5 5 9-9" /></svg>
            </span>
            <div>
              <p className="font-semibold text-sm" style={{color: 'var(--ink)'}}>Profil &amp; Dokumente eingereicht</p>
              <p className="text-xs" style={{color: 'var(--muted)'}}>Soeben erledigt</p>
            </div>
          </div>
          <div className="step-row">
            <span className="step-icon" style={{background: 'var(--purple-100)'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
            </span>
            <div>
              <p className="font-semibold text-sm" style={{color: 'var(--ink)'}}>Prüfung durch unser Team</p>
              <p className="text-xs" style={{color: 'var(--muted)'}}>In der Regel 1–2 Werktage</p>
            </div>
          </div>
          <div className="step-row">
            <span className="step-icon" style={{background: '#F0ECF8'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z" /></svg>
            </span>
            <div>
              <p className="font-semibold text-sm" style={{color: 'var(--muted)'}}>Konto wird freigeschaltet</p>
              <p className="text-xs" style={{color: 'var(--muted)'}}>Du erhältst passende Aufträge in deiner Nähe</p>
            </div>
          </div>
        </div>

        <a href="/cleaner-login" className="btn-gradient block w-full text-white font-semibold py-3.5 rounded-xl text-center">
          Zum Reinigungskraft-Login
        </a>

      </section>
    </>
  );
}