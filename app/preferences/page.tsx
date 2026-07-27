// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';

const FREQUENCIES = [
  { value: 'instant', title: 'Sofort', desc: 'Ich möchte alle wichtigen Infos sofort erhalten.', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 01-3.4 0" /></svg> },
  { value: 'daily', title: 'Täglich', desc: 'Ich möchte eine tägliche Zusammenfassung erhalten.', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="M12 14h.01" /></svg> },
  { value: 'weekly', title: 'Wöchentlich', desc: 'Ich möchte eine wöchentliche Zusammenfassung erhalten.', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg> },
];

export default function PreferencesPage() {
  const [userName, setUserName] = useState('');
  const [emailOptIn, setEmailOptIn] = useState(true);
  const [smsOptIn, setSmsOptIn] = useState(true);
  const [frequency, setFrequency] = useState('instant');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = "TANDEF – Kommunikationseinstellungen";

    const menuBtn = document.getElementById('user-menu-btn');
    const menu = document.getElementById('user-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }

    async function loadPreferences() {
      try {
        const res = await fetch('/api/customer/preferences');
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Fehler beim Laden.');
          return;
        }
        setUserName(data.name);
        setEmailOptIn(data.emailOptIn);
        setSmsOptIn(data.smsOptIn);
        setFrequency(data.notificationFrequency);
      } catch {
        setError('Fehler beim Laden deiner Einstellungen.');
      } finally {
        setLoading(false);
      }
    }
    loadPreferences();
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaveMsg('');
    setError('');
    try {
      const res = await fetch('/api/customer/preferences', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOptIn, smsOptIn, notificationFrequency: frequency }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Fehler beim Speichern.');
        return;
      }
      setSaveMsg('Änderungen gespeichert!');
      setTimeout(() => setSaveMsg(''), 3000);
    } catch {
      setError('Fehler beim Speichern. Bitte versuche es erneut.');
    } finally {
      setSaving(false);
    }
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
          .toggle{
            width:48px;height:27px;border-radius:9999px;background:#DDD6EC;
            position:relative;cursor:pointer;transition:.2s ease;flex-shrink:0;border:none;
          }
          .toggle::after{
            content:'';position:absolute;top:3px;left:3px;
            width:21px;height:21px;border-radius:9999px;background:#fff;
            box-shadow:0 2px 5px rgba(0,0,0,.15);transition:.2s ease;
          }
          .toggle.on{background:var(--purple-600);}
          .toggle.on::after{left:24px;}
          .btn-gradient{background:linear-gradient(90deg,var(--purple-700),var(--purple-500));transition:.2s ease;}
          .btn-gradient:hover{filter:brightness(1.05);}
          .btn-gradient:disabled{opacity:.6;cursor:not-allowed;}
          .icon-circle{
            width:44px;height:44px;border-radius:9999px;background:var(--purple-100);
            display:flex;align-items:center;justify-content:center;flex-shrink:0;
          }
          .freq-card{
            background:#fff;border:2px solid #ECE8F5;border-radius:16px;transition:.2s ease;cursor:pointer;
          }
          .freq-card:hover{border-color:#C9B8EC;}
          .freq-card.selected{border-color:var(--purple-600);background:var(--purple-50);}
          .freq-card.selected .radio-dot{border-color:var(--purple-600);}
          .freq-card.selected .radio-dot::after{transform:scale(1);}
          .radio-dot{
            width:20px;height:20px;border-radius:9999px;border:2px solid #D6CFE6;
            display:flex;align-items:center;justify-content:center;transition:.15s ease;flex-shrink:0;position:relative;
          }
          .radio-dot::after{
            content:'';width:10px;height:10px;border-radius:9999px;background:var(--purple-600);
            transform:scale(0);transition:.15s ease;
          }
          .dropdown-menu{background:#fff;border-radius:14px;box-shadow:0 20px 45px -15px rgba(76,29,149,.3);}
          .dropdown-menu a{display:block;padding:.7rem 1.25rem;color:var(--ink);font-size:.9rem;}
          .dropdown-menu a:hover{background:var(--purple-50);}
          .chat-bubble{
            position:fixed;right:28px;bottom:28px;width:56px;height:56px;border-radius:9999px;
            background:linear-gradient(135deg,var(--purple-700),var(--purple-500));
            display:flex;align-items:center;justify-content:center;
            box-shadow:0 12px 30px -8px rgba(76,29,149,.5);
          }
          .footer-dark{background:linear-gradient(120deg,var(--purple-900),var(--purple-600));}
          .social-icon-dark{
            width:38px;height:38px;border-radius:9999px;background:rgba(255,255,255,.12);
            display:flex;align-items:center;justify-content:center;color:#fff;transition:.15s ease;
          }
          .social-icon-dark:hover{background:rgba(255,255,255,.22);}
      `}</style>
      <header className="relative bg-white border-b" style={{borderColor: '#EDE9F5'}}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        <a href="/dashboard" className="flex items-center">
  <img src="/images/logo.png" alt="TANDEF" className="h-9 w-auto" />
</a>
          <nav className="flex items-center gap-8 text-sm font-medium relative">
            <a href="/pro-werden" className="flex flex-col items-center gap-1 hover:opacity-70" style={{color: 'var(--purple-700)'}}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
              Pro werden
            </a>
            <a href="#" className="flex flex-col items-center gap-1 hover:opacity-70" style={{color: 'var(--purple-700)'}}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
              Magazin
            </a>
            <div className="relative">
              <button id="user-menu-btn" className="flex items-center gap-2 hover:opacity-70" style={{color: 'var(--purple-700)'}}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{background: 'var(--purple-100)'}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
                </span>
                <span className="flex items-center gap-1">{loading ? '...' : userName}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                </span>
              </button>
              <div id="user-menu" className="dropdown-menu hidden absolute right-0 mt-3 w-64 py-2 z-20">
                <a href="/dashboard">Mein Kundenbereich</a>
                <a href="/sessions">Meine Sessions</a>
                <a href="/invoices">Historie und Rechnungen</a>
                <a href="/account">Mein Profil</a>
                <a href="/preferences" className="font-semibold" style={{color: 'var(--purple-700)'}}>Meine Kommunikationspräferenzen</a>
                <a href="/payment-methods">Zahlungsmethoden</a>
                <a href="#" className="border-t" style={{borderColor: '#EDE9F5'}}>Abmelden</a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <section className="relative max-w-4xl mx-auto px-6 pt-10 pb-4">
        <p className="text-sm mb-6" style={{color: 'var(--muted)'}}>
          Kundenbereich <span className="mx-1">›</span> <span className="font-semibold" style={{color: 'var(--purple-700)'}}>Meine Kommunikationseinstellungen</span>
        </p>
        <h1 className="text-4xl font-extrabold mb-2" style={{color: 'var(--purple-700)'}}>Kommunikationseinstellungen</h1>
        <p style={{color: 'var(--muted)'}}>Verwalte deine Benachrichtigungen und Angebote.</p>
      </section>

      <section className="relative max-w-4xl mx-auto px-6 pb-24">

        {error && (
          <p className="text-sm mb-4 font-medium" style={{color: '#C0392B'}}>{error}</p>
        )}

        <div className="panel p-8 mb-8">
          <div className="space-y-0">

            <div className="flex items-center gap-4 pb-6" style={{borderBottom: '1px solid #F0ECF8'}}>
              <div className="icon-circle">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 6l10 7 10-7" /></svg>
              </div>
              <div className="flex-1">
                <p className="font-bold" style={{color: 'var(--ink)'}}>Angebote und Neuigkeiten per E-Mail</p>
                <p className="text-sm" style={{color: 'var(--muted)'}}>Ich möchte Angebote und Neuigkeiten von TANDEF per E-Mail erhalten.</p>
              </div>
              <button
                type="button"
                className={`toggle ${emailOptIn ? 'on' : ''}`}
                onClick={() => setEmailOptIn(v => !v)}
                disabled={loading}
                aria-label="E-Mail Benachrichtigungen"
              />
            </div>

            <div className="flex items-center gap-4 pt-6">
              <div className="icon-circle">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>
              </div>
              <div className="flex-1">
                <p className="font-bold" style={{color: 'var(--ink)'}}>Angebote und Neuigkeiten per SMS</p>
                <p className="text-sm" style={{color: 'var(--muted)'}}>Ich möchte Angebote und Neuigkeiten von TANDEF per SMS erhalten.</p>
              </div>
              <button
                type="button"
                className={`toggle ${smsOptIn ? 'on' : ''}`}
                onClick={() => setSmsOptIn(v => !v)}
                disabled={loading}
                aria-label="SMS Benachrichtigungen"
              />
            </div>

          </div>

          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={handleSave}
              disabled={saving || loading}
              className="btn-gradient text-white font-semibold px-8 py-3.5 rounded-full inline-flex items-center gap-2"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" /><path d="M17 21v-8H7v8M7 3v5h8" /></svg>
              {saving ? 'Wird gespeichert...' : 'Änderungen speichern'}
            </button>
            {saveMsg && <span className="text-sm font-semibold" style={{color: 'var(--purple-700)'}}>{saveMsg}</span>}
          </div>
        </div>

        <div className="panel p-8">
          <h2 className="font-bold text-lg mb-1" style={{color: 'var(--ink)'}}>Benachrichtigungshäufigkeit</h2>
          <p className="text-sm mb-6" style={{color: 'var(--muted)'}}>Wähle, wie oft du Benachrichtigungen erhalten möchtest.</p>

          <div className="grid sm:grid-cols-3 gap-4">
            {FREQUENCIES.map(f => (
              <div
                key={f.value}
                onClick={() => setFrequency(f.value)}
                className={`freq-card p-5 ${frequency === f.value ? 'selected' : ''}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="radio-dot"></span>
                  {f.icon}
                  <p className="font-bold" style={{color: 'var(--ink)'}}>{f.title}</p>
                </div>
                <p className="text-sm" style={{color: 'var(--muted)'}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

    {/* Footer */}
    <footer className="footer-dark">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-6 gap-4 sm:gap-6 text-sm">
          <div className="col-span-2">
            <img src="/images/logo.png" alt="TANDEF" className="h-9 w-auto mb-3" />
            <p style={{color: '#D9CDF0'}}>Zuverlässige Reinigung in Deutschland – für Zuhause und Unternehmen.</p>
            <div className="flex gap-3 mt-5 text-white">
              <span>f</span><span>◎</span><span>w</span><span>✉</span>
            </div>
          </div>
          <div>
            <p className="font-semibold mb-3 text-white">Leistungen</p>
            <ul className="space-y-2" style={{color: '#D9CDF0'}}>
              <li><a href="/wohnungsreinigung" className="hover:text-white">Wohnungsreinigung</a></li>
              <li><a href="/bueroreinigung" className="hover:text-white">Büroreinigung</a></li>
              <li><a href="/umzugsreinigung" className="hover:text-white">Umzugsreinigung</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3 text-white">Unternehmen</p>
            <ul className="space-y-2" style={{color: '#D9CDF0'}}>
              <li><a href="/ueber-uns" className="hover:text-white">Über uns</a></li>
              <li><a href="/unser-team" className="hover:text-white">Unser Team</a></li>
              <li><a href="/karriere" className="hover:text-white">Karriere</a></li>
              <li><a href="/kontakt" className="hover:text-white">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3 text-white">Rechtliches</p>
            <ul className="space-y-2" style={{color: '#D9CDF0'}}>
              <li>AGB</li><li>Datenschutz</li><li>Impressum</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3 text-white">Kontakt</p>
            <ul className="space-y-3" style={{color: '#D9CDF0'}}>
              <li className="flex items-center gap-2">
                <svg className="shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.11 4.18 2 2 0 014.1 2h3a2 2 0 012 1.72c.12.9.33 1.77.63 2.6a2 2 0 01-.45 2.11L8.1 9.6a16 16 0 006.3 6.3l1.17-1.18a2 2 0 012.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0122 16.92z" /></svg>
                +4915214440144
              </li>
              <li className="flex items-center gap-2">
                <svg className="shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 6l10 7 10-7" /></svg>
                info@tandef.de
              </li>
              <li className="flex items-center gap-2">
                <svg className="shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                Deutschland
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs pb-8" style={{color: '#C9B8EC'}}>
          <span>© 2026 TANDEF. Alle Rechte vorbehalten.</span>
        </div>
      </footer>

      <div className="chat-bubble">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
      </div>
    </>
  );
}