// @ts-nocheck
'use client';

import { useEffect } from 'react';

export default function CleanerPendingPage() {

  useEffect(() => {
    document.title = "TANDEF – Dein Antrag wird geprüft";
  }, []);

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
          h1,h2,h3{font-family:'Poppins',sans-serif;}
          
          .panel{background:#fff;border-radius:20px;box-shadow:0 20px 50px -30px rgba(76,29,149,.25);}
          .icon-ring{
            width:96px;height:96px;border-radius:9999px;background:var(--purple-50);
            display:flex;align-items:center;justify-content:center;margin:0 auto;position:relative;
          }
          .icon-ring::before{
            content:'';position:absolute;inset:-8px;border-radius:9999px;border:2px dashed #D9CFEF;
            animation:spin 12s linear infinite;
          }
          @keyframes spin{to{transform:rotate(360deg);}}
          .step-row{display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid #F0ECF8;}
          .step-row:last-child{border-bottom:none;}
          .step-icon{width:34px;height:34px;border-radius:9999px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
          .btn-gradient{background:linear-gradient(90deg,var(--purple-700),var(--purple-500));transition:.2s ease;}
          .btn-gradient:hover{filter:brightness(1.05);}
      `}</style>
      <header className="relative bg-white border-b" style={{borderColor: '#EDE9F5'}}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <a href="/" className="font-bold text-lg" style={{color: 'var(--ink)'}}>Haushaltshilfe</a>
          <p className="text-sm font-medium" style={{color: 'var(--muted)'}}>Registrierung als Reinigungskraft</p>
        </div>
      </header>

      <section className="relative max-w-xl mx-auto px-6 pt-16 pb-24 text-center">

        <div className="icon-ring mb-8">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>
        </div>

        <h1 className="text-3xl font-extrabold mb-3" style={{color: 'var(--ink)'}}>Dein Antrag wird geprüft</h1>
        <p className="mb-10" style={{color: 'var(--muted)'}}>
          Danke, Anna! Wir haben deine Angaben und Dokumente erhalten. Unser Team prüft alles sorgfältig – das dauert in der Regel 1–2 Werktage. Du erhältst eine E-Mail, sobald dein Konto freigeschaltet ist.
        </p>

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

        <a href="/cleaner-dashboard" className="btn-gradient block w-full text-white font-semibold py-3.5 rounded-xl mb-3 text-center">
            Zu meinem Cleaner-Bereich
          </a>
          <a href="/cleaner-profile" className="btn-outline block w-full font-semibold py-3.5 rounded-xl text-center">
            Status meines Antrags ansehen
          </a>

      </section>
    </>
  );
}
