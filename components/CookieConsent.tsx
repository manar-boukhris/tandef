// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';

const CONSENT_KEY = 'tandef_cookie_consent';

const DETAIL_CATEGORIES = [
  { key: 'necessary', label: 'Notwendig', count: 14, locked: true, desc: 'Notwendige Cookies tragen dazu bei, eine Website nutzbar zu machen, indem sie grundlegende Funktionen wie die Seitennavigation und den Zugang zu sicheren Bereichen der Website ermöglichen. Ohne diese Cookies kann die Website nicht richtig funktionieren.' },
  { key: 'preferences', label: 'Präferenzen', count: 6, locked: false, desc: 'Mit Hilfe von Präferenz-Cookies kann sich eine Website Informationen merken, die das Verhalten oder Aussehen der Website verändern, z. B. die bevorzugte Sprache oder die Region, in der du dich befindest.' },
  { key: 'statistics', label: 'Statistiken', count: 21, locked: false, desc: 'Statistik-Cookies helfen Website-Betreibern zu verstehen, wie Nutzer mit Websites interagieren, indem sie Informationen anonym sammeln und melden.' },
  { key: 'marketing', label: 'Marketing', count: 36, locked: false, desc: 'Marketing-Cookies werden verwendet, um Nutzer auf verschiedenen Websites zu tracken. Ziel ist es, Anzeigen zu schalten, die für den einzelnen Nutzer relevant und ansprechend sind und somit für Publisher und Werbetreibende wertvoller sind.' },
  { key: 'unclassified', label: 'Nicht klassifiziert', count: 13, locked: false, desc: 'Nicht klassifizierte Cookies sind Cookies, die wir zusammen mit den Anbietern der einzelnen Cookies noch klassifizieren müssen.' },
];

const DETAIL_ICONS = {
  necessary: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z" /><path d="M9 12l2 2 4-4" /></svg>,
  preferences: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M4 6h10M4 12h16M4 18h7" /><circle cx="17" cy="6" r="2" /><circle cx="10" cy="18" r="2" /></svg>,
  statistics: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="4" y="12" width="4" height="8" /><rect x="10" y="8" width="4" height="12" /><rect x="16" y="4" width="4" height="16" /></svg>,
  marketing: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M3 11l18-7-7 18-2-8-9-3z" /></svg>,
  unclassified: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.5 9a2.5 2.5 0 015 .5c0 1.5-2 2-2 3.5" /><circle cx="12" cy="17" r="0.5" fill="#5B21B6" /></svg>,
};

const CONSENT_CARDS = [
  { key: 'necessary', label: 'Notwendig', locked: true, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z" /></svg>, desc: 'Diese Cookies sind für den Betrieb der Website erforderlich und können nicht deaktiviert werden.' },
  { key: 'preferences', label: 'Funktional', locked: false, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><path d="M4 6h10M4 12h16M4 18h7" /><circle cx="17" cy="6" r="2" /><circle cx="10" cy="18" r="2" /></svg>, desc: 'Diese Cookies ermöglichen zusätzliche Funktionen und speichern Ihre Einstellungen.' },
  { key: 'statsMarketing', label: 'Statistik & Marketing', locked: false, icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><rect x="4" y="12" width="4" height="8" /><rect x="10" y="8" width="4" height="12" /><rect x="16" y="4" width="4" height="16" /></svg>, desc: 'Diese Cookies helfen uns zu verstehen, wie unsere Website genutzt wird und Ihnen relevante Inhalte anzuzeigen.' },
];

function defaultPrefs() {
  return { necessary: true, preferences: false, statistics: false, marketing: false, unclassified: false };
}

function allTruePrefs() {
  return { necessary: true, preferences: true, statistics: true, marketing: true, unclassified: true };
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState('consent'); // 'consent' | 'details' | 'about'
  const [prefs, setPrefs] = useState(defaultPrefs());
  const [openCategory, setOpenCategory] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CONSENT_KEY);
      if (!saved) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function saveConsent(consentPrefs) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ prefs: consentPrefs, date: new Date().toISOString() }));
    } catch {}
    setVisible(false);
  }

  function acceptAll() {
    saveConsent(allTruePrefs());
  }

  function rejectAll() {
    saveConsent(defaultPrefs());
  }

  function saveSelection() {
    saveConsent(prefs);
  }

  function toggleConsentCard(key) {
    if (key === 'necessary') return;
    if (key === 'statsMarketing') {
      setPrefs(p => {
        const newVal = !(p.statistics && p.marketing);
        return { ...p, statistics: newVal, marketing: newVal };
      });
      return;
    }
    setPrefs(p => ({ ...p, [key]: !p[key] }));
  }

  function toggleDetailCategory(key) {
    if (key === 'necessary') return;
    setPrefs(p => ({ ...p, [key]: !p[key] }));
  }

  if (!visible) return null;

  return (
    <>
      <style jsx global>{`
        .cc-overlay{position:fixed;inset:0;background:rgba(31,19,57,.55);backdrop-filter:blur(2px);z-index:100;display:flex;align-items:center;justify-content:center;padding:20px;}
        .cc-modal{background:#fff;border-radius:24px;max-width:900px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 40px 80px -20px rgba(31,19,57,.4);}
        .cc-header{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;padding:32px 32px 0 32px;}
        .cc-logo{display:flex;align-items:center;gap:10px;}
        .cc-close{width:32px;height:32px;border-radius:9999px;display:flex;align-items:center;justify-content:center;border:1.5px solid #ECE8F5;color:#6B6478;cursor:pointer;flex-shrink:0;background:#fff;}
        .cc-close:hover{background:#F5F3FF;}
        .cc-tabs{display:flex;gap:0;margin:24px 32px 0 32px;border-bottom:1px solid #ECE8F5;}
        .cc-tab{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;padding:14px 8px;font-weight:600;font-size:.9rem;color:#6B6478;cursor:pointer;border-bottom:2px solid transparent;background:none;border-left:none;border-right:none;border-top:none;}
        .cc-tab.active{color:#5B21B6;border-bottom-color:#5B21B6;}
        .cc-body{padding:28px 32px;}
        .cc-card{background:#fff;border:1px solid #ECE8F5;border-radius:16px;padding:20px;}
        .cc-card-icon{width:44px;height:44px;border-radius:9999px;background:#EDE9FE;display:flex;align-items:center;justify-content:center;margin-bottom:14px;}
        .cc-toggle{width:44px;height:25px;border-radius:9999px;background:#DDD6EC;position:relative;cursor:pointer;transition:.2s ease;flex-shrink:0;border:none;}
        .cc-toggle::after{content:'';position:absolute;top:3px;left:3px;width:19px;height:19px;border-radius:9999px;background:#fff;box-shadow:0 2px 5px rgba(0,0,0,.15);transition:.2s ease;}
        .cc-toggle.on{background:#5B21B6;}
        .cc-toggle.on::after{left:22px;}
        .cc-toggle:disabled{opacity:.6;cursor:not-allowed;}
        .cc-detail-row{border-bottom:1px solid #ECE8F5;padding:16px 0;}
        .cc-detail-row:last-child{border-bottom:none;}
        .cc-count{background:#EDE9FE;color:#5B21B6;font-size:.7rem;font-weight:700;padding:.15rem .55rem;border-radius:9999px;margin-left:.5rem;}
        .cc-chevron{transition:transform .2s ease;}
        .cc-chevron.open{transform:rotate(180deg);}
        .cc-btn{padding:12px 20px;border-radius:12px;font-weight:600;font-size:.9rem;display:inline-flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;border:1.5px solid #5B21B6;color:#5B21B6;background:#fff;transition:.15s ease;}
        .cc-btn:hover{background:#F5F3FF;}
        .cc-btn.filled{background:#5B21B6;color:#fff;}
        .cc-btn.filled:hover{background:#4C1D95;}
        .cc-footnote{display:flex;align-items:center;gap:8px;font-size:.8rem;color:#6B6478;}
      `}</style>

      <div className="cc-overlay">
        <div className="cc-modal">

          <div className="cc-header">
            <div>
              <div className="cc-logo">
                <img src="/images/logo.png" alt="TANDEF" style={{ height: '40px', width: 'auto' }} />
              </div>
              <h2 className="text-2xl font-extrabold mt-4" style={{ color: '#1F1339', fontFamily: 'Poppins, sans-serif' }}>
                {tab === 'consent' && 'Ihre Cookie-Einstellungen'}
                {tab === 'details' && 'Ihre Cookie-Einstellungen'}
                {tab === 'about' && 'Über Cookies'}
              </h2>
              <p className="text-sm mt-2 max-w-md" style={{ color: '#6B6478' }}>
                {tab === 'about'
                  ? 'Cookies helfen uns, unsere Website zu verbessern, Ihnen relevante Inhalte anzuzeigen und Ihnen die bestmögliche Nutzung zu ermöglichen.'
                  : 'Wir verwenden Cookies, um unsere Website zu verbessern und Ihnen das bestmögliche Erlebnis zu bieten.'}
              </p>
            </div>
            <button className="cc-close" onClick={() => saveConsent(prefs)} aria-label="Schließen">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="cc-tabs">
            <button className={`cc-tab ${tab === 'consent' ? 'active' : ''}`} onClick={() => setTab('consent')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-4z" /><path d="M9 12l2 2 4-4" /></svg>
              Zustimmung
            </button>
            <button className={`cc-tab ${tab === 'details' ? 'active' : ''}`} onClick={() => setTab('details')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 00.34 1.87l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.7 1.7 0 00-1.87-.34 1.7 1.7 0 00-1 1.55V21a2 2 0 11-4 0v-.09A1.7 1.7 0 009 19.4a1.7 1.7 0 00-1.87.34l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.7 1.7 0 004.6 15a1.7 1.7 0 00-1.55-1H3a2 2 0 110-4h.09A1.7 1.7 0 004.6 9a1.7 1.7 0 00-.34-1.87l-.06-.06a2 2 0 112.83-2.83l.06.06A1.7 1.7 0 009 4.6a1.7 1.7 0 001-1.55V3a2 2 0 114 0v.09a1.7 1.7 0 001 1.55 1.7 1.7 0 001.87-.34l.06-.06a2 2 0 112.83 2.83l-.06.06A1.7 1.7 0 0019.4 9a1.7 1.7 0 001.55 1H21a2 2 0 110 4h-.09a1.7 1.7 0 00-1.55 1z" /></svg>
              Details
            </button>
            <button className={`cc-tab ${tab === 'about' ? 'active' : ''}`} onClick={() => setTab('about')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
              Über Cookies
            </button>
          </div>

          <div className="cc-body">

            {tab === 'consent' && (
              <>
                <div className="grid sm:grid-cols-3 gap-5 mb-6">
                  {CONSENT_CARDS.map(card => {
                    const isOn = card.key === 'statsMarketing' ? (prefs.statistics && prefs.marketing) : prefs[card.key];
                    return (
                      <div key={card.key} className="cc-card">
                        <div className="cc-card-icon">{card.icon}</div>
                        <p className="font-bold mb-1.5" style={{ color: '#1F1339' }}>{card.label}</p>
                        <p className="text-sm mb-5" style={{ color: '#6B6478' }}>{card.desc}</p>
                        <button
                          className={`cc-toggle ${isOn ? 'on' : ''}`}
                          disabled={card.locked}
                          onClick={() => toggleConsentCard(card.key)}
                          aria-label={card.label}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-3 mb-4">
                  <button className="cc-btn" onClick={rejectAll}>Nur notwendige Cookies</button>
                  <button className="cc-btn" onClick={saveSelection}>Auswahl speichern</button>
                  <button className="cc-btn filled flex-1" onClick={acceptAll}>Alle Cookies akzeptieren</button>
                </div>
                <p className="cc-footnote">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg>
                  Sie können Ihre Auswahl jederzeit in den Cookie-Einstellungen ändern.
                  <a href="/datenschutz" className="font-semibold underline" style={{ color: '#5B21B6' }}>Mehr erfahren →</a>
                </p>
              </>
            )}

            {tab === 'details' && (
              <>
                <div className="border rounded-2xl mb-5" style={{ borderColor: '#ECE8F5' }}>
                  <div className="px-5">
                    {DETAIL_CATEGORIES.map(cat => (
                      <div key={cat.key} className="cc-detail-row">
                        <div className="flex items-center justify-between gap-4">
                          <button
                            className="flex items-center gap-3 flex-1 text-left"
                            onClick={() => setOpenCategory(openCategory === cat.key ? null : cat.key)}
                          >
                            <svg className={`cc-chevron shrink-0 ${openCategory === cat.key ? 'open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9C96A8" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                            <span className="cc-card-icon" style={{ width: '38px', height: '38px', margin: 0 }}>{DETAIL_ICONS[cat.key]}</span>
                            <span>
                              <span className="font-bold" style={{ color: '#1F1339' }}>{cat.label}</span>
                              <span className="cc-count">{cat.count}</span>
                            </span>
                          </button>
                          <button
                            className={`cc-toggle ${prefs[cat.key] ? 'on' : ''}`}
                            disabled={cat.locked}
                            onClick={() => toggleDetailCategory(cat.key)}
                            aria-label={cat.label}
                          />
                        </div>
                        {openCategory === cat.key && (
                          <p className="text-sm mt-3 pl-12" style={{ color: '#6B6478' }}>{cat.desc}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm mb-5 px-1" style={{ color: '#6B6478' }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg>
                  Die Cookie-Erklärung wurde zuletzt am {new Date().toLocaleDateString('de-DE')} aktualisiert.
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="cc-btn" onClick={rejectAll}>Ablehnen</button>
                  <button className="cc-btn" onClick={saveSelection}>Auswahl erlauben</button>
                  <button className="cc-btn filled flex-1" onClick={acceptAll}>Zustimmen</button>
                </div>
              </>
            )}

            {tab === 'about' && (
              <>
                <div className="space-y-5 mb-6">
                  <div className="flex gap-4 pb-5" style={{ borderBottom: '1px solid #ECE8F5' }}>
                    <span className="cc-card-icon" style={{ margin: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><circle cx="9" cy="9" r="1.5" fill="#5B21B6" stroke="none" /><circle cx="15" cy="13" r="1" fill="#5B21B6" stroke="none" /><circle cx="10" cy="16" r="1" fill="#5B21B6" stroke="none" /><path d="M12 2a10 10 0 100 20 10 10 0 000-20z" /></svg>
                    </span>
                    <p className="text-sm" style={{ color: '#1F1339' }}>
                      Cookies sind kleine Textdateien, die von Websites verwendet werden können, um die Nutzer-Erfahrung effizienter zu gestalten. Das Gesetz besagt, dass wir Cookies auf deinem Gerät speichern dürfen, wenn sie für den Betrieb dieser Website unbedingt erforderlich sind. Für alle anderen Arten von Cookies benötigen wir deine Zustimmung.
                    </p>
                  </div>
                  <div className="flex gap-4 pb-5" style={{ borderBottom: '1px solid #ECE8F5' }}>
                    <span className="cc-card-icon" style={{ margin: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><circle cx="9" cy="7" r="3" /><circle cx="16" cy="8" r="2.5" /><path d="M2 21c0-4 3-6 7-6s7 2 7 6" /></svg>
                    </span>
                    <p className="text-sm" style={{ color: '#1F1339' }}>
                      Diese Website verwendet verschiedene Arten von Cookies. Einige Cookies werden von Drittanbietern gesetzt, die auf unseren Seiten erscheinen. Du kannst deine Zustimmung jederzeit in der Cookie-Erklärung auf unserer Website ändern oder zurückziehen.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <span className="cc-card-icon" style={{ margin: 0 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>
                    </span>
                    <p className="text-sm" style={{ color: '#1F1339' }}>
                      Weitere Informationen darüber, wer wir sind, wie du uns kontaktieren kannst und wie wir personenbezogene Daten verarbeiten, findest du in unserer Datenschutzrichtlinie. Bitte gib dein Consent-ID und das Datum an, wenn du uns bezüglich deiner Einwilligung kontaktierst.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="cc-footnote max-w-xs">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg>
                    Du kannst deine Auswahl jederzeit in den Cookie-Einstellungen ändern.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button className="cc-btn" onClick={rejectAll}>Ablehnen</button>
                    <button className="cc-btn" onClick={() => setTab('consent')}>Anpassen</button>
                    <button className="cc-btn filled" onClick={acceptAll}>Zustimmen</button>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
}