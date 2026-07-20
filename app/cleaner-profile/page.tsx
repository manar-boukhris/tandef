// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';

const STATUS_LABELS = {
  no_application: { label: 'Antrag ausstehend', color: '#B7791F', bg: '#FEF3C7' },
  pending: { label: 'In Prüfung', color: '#B7791F', bg: '#FEF3C7' },
  approved: { label: 'Aktiv', color: '#15803D', bg: '#DCFCE7' },
  rejected: { label: 'Abgelehnt', color: '#C0392B', bg: '#FBE7E7' },
};

const DOC_LABELS = {
  id: 'Personalausweis oder Reisepass',
  address: 'Adressnachweis',
  criminal: 'Führungszeugnis',
};

const DOC_STATUS_META = {
  pending: { label: 'In Prüfung', color: '#B7791F', bg: '#FEF3C7' },
  approved: { label: 'Akzeptiert', color: '#15803D', bg: '#DCFCE7' },
  rejected: { label: 'Abgelehnt', color: '#C0392B', bg: '#FBE7E7' },
};

export default function CleanerProfilePage() {
  const [cleaner, setCleaner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'TANDEF – Mein Profil';
    fetch('/api/cleaner/status')
      .then(res => res.json())
      .then(data => {
        setCleaner(data);
        setLoading(false);
      });

    const menuBtn = document.getElementById('user-menu-btn');
    const menu = document.getElementById('user-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }
  }, []);

  let documents = {};
  if (cleaner?.application?.documents) {
    try {
      const parsed = JSON.parse(cleaner.application.documents);
      // ye3awen kif kif ken l'ancienne shape kenet array, w kif kif l'jdida object
      documents = Array.isArray(parsed) ? {} : parsed;
    } catch {
      documents = {};
    }
  }
  const docEntries = Object.entries(documents);

  const status = cleaner?.accountStatus || 'no_application';
  const statusMeta = STATUS_LABELS[status] || STATUS_LABELS.no_application;

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
  background-image:url('/images/sessions-bg.png');
  background-size:cover;
  background-position:top center;
  background-repeat:no-repeat;
  background-attachment:fixed;
  min-height:100vh;
}
        h1,h2,h3{font-family:'Poppins',sans-serif;}
        
        .panel{background:#fff;border-radius:20px;box-shadow:0 20px 50px -30px rgba(76,29,149,.2);}
        .dropdown-menu{background:#fff;border-radius:14px;box-shadow:0 20px 45px -15px rgba(76,29,149,.3);}
        .dropdown-menu a{display:block;padding:.7rem 1.25rem;color:var(--ink);font-size:.9rem;}
        .dropdown-menu a:hover{background:var(--purple-50);}
        .status-badge{
          display:inline-flex;align-items:center;gap:.5rem;padding:.5rem 1.2rem;border-radius:9999px;
          font-weight:700;font-size:.9rem;
        }
        .doc-row{
          display:flex;align-items:center;gap:.8rem;padding:1rem 1.2rem;border:1px solid #ECE8F5;border-radius:14px;
        }
        .doc-pill{
          font-size:.75rem;font-weight:800;padding:.3rem .8rem;border-radius:9999px;flex-shrink:0;
        }
        .icon-circle{
          width:40px;height:40px;border-radius:9999px;background:var(--purple-100);
          display:flex;align-items:center;justify-content:center;flex-shrink:0;
        }
        .btn-gradient{background:linear-gradient(90deg,var(--purple-700),var(--purple-500));transition:.2s ease;}
        .btn-gradient:hover{filter:brightness(1.05);}
      `}</style>

      <header className="relative bg-white border-b" style={{borderColor: '#EDE9F5'}}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <a href="/" className="font-bold text-lg" style={{color: 'var(--ink)'}}>Haushaltshilfe</a>
          <nav className="flex items-center gap-8 text-sm font-medium relative">
            <span className="rounded-full px-3 py-1 text-xs font-bold" style={{background: 'var(--purple-100)', color: 'var(--purple-700)'}}>Reinigungskraft</span>
            <div className="relative">
              <button id="user-menu-btn" className="flex items-center gap-2 hover:opacity-70" style={{color: 'var(--purple-700)'}}>
                <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{background: 'var(--purple-100)'}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
                </span>
                <span>{cleaner?.user?.name || '...'}</span>
              </button>
              <div id="user-menu" className="dropdown-menu hidden absolute right-0 mt-3 w-64 py-2 z-20">
                <a href="/cleaner-dashboard">Mein Cleaner-Bereich</a>
                <a href="/cleaner-availability">Meine Verfügbarkeit</a>
                <a href="/cleaner-bookings">Meine Buchungen</a>
                <a href="/cleaner-reviews">Meine Bewertungen</a>
                <a href="/cleaner-profile" className="font-semibold" style={{color: 'var(--purple-700)'}}>Mein Profil</a>
                <a href="#" className="border-t" style={{borderColor: '#EDE9F5'}}>Abmelden</a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <section className="relative max-w-3xl mx-auto px-6 pt-10 pb-24">
        <h1 className="text-4xl font-extrabold mb-2" style={{color: 'var(--purple-700)'}}>Mein Profil</h1>
        <p className="mb-8" style={{color: 'var(--muted)'}}>Status deines Kontos und eingereichte Dokumente.</p>

        {loading && <p style={{color: 'var(--muted)'}}>Wird geladen...</p>}

        {!loading && cleaner && (
          <>
            <div className="panel p-8 mb-6">
              <p className="text-sm font-semibold mb-3" style={{color: 'var(--muted)'}}>Kontostatus</p>
              <span className="status-badge" style={{background: statusMeta.bg, color: statusMeta.color}}>
                {statusMeta.label}
              </span>

              {status === 'no_application' && (
                <>
                  <p className="text-sm mt-4" style={{color: 'var(--muted)'}}>
                    Du hast deinen Antrag noch nicht abgeschlossen. Bitte reiche deine Unterlagen ein, damit wir dein Konto prüfen können.
                  </p>
                  <a href="/cleaner-onboarding" className="btn-gradient inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-full mt-4">
                    Antrag jetzt einreichen
                  </a>
                </>
              )}

              {status === 'pending' && (
                <p className="text-sm mt-4" style={{color: 'var(--muted)'}}>
                  Dein Antrag wird derzeit von unserem Team geprüft. Das dauert in der Regel 1–3 Werktage.
                </p>
              )}

              {status === 'approved' && (
                <p className="text-sm mt-4" style={{color: 'var(--muted)'}}>
                  Dein Konto ist freigeschaltet — du kannst jetzt Buchungen annehmen.
                </p>
              )}

              {status === 'rejected' && (
                <>
                  {cleaner?.application?.rejectionNote && (
                    <div className="rounded-xl p-4 mt-4" style={{background: '#FBE7E7'}}>
                      <p className="text-sm font-semibold mb-1" style={{color: '#C0392B'}}>Grund der Ablehnung:</p>
                      <p className="text-sm" style={{color: 'var(--ink)'}}>{cleaner.application.rejectionNote}</p>
                    </div>
                  )}
                  <a href="/cleaner-onboarding" className="btn-gradient inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-full mt-4">
                    Antrag erneut einreichen
                  </a>
                </>
              )}
            </div>

            <div className="panel p-8">
              <p className="text-sm font-semibold mb-4" style={{color: 'var(--muted)'}}>Eingereichte Dokumente</p>
              {docEntries.length === 0 && (
                <p className="text-sm" style={{color: 'var(--muted)'}}>Noch keine Dokumente hochgeladen.</p>
              )}
              <div className="space-y-3">
                {docEntries.map(([key, doc]) => {
                  const docStatusMeta = DOC_STATUS_META[doc?.status] || DOC_STATUS_META.pending;
                  return (
                    <div key={key} className="doc-row">
                      <div className="icon-circle">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /></svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm" style={{color: 'var(--ink)'}}>{DOC_LABELS[key] || key}</p>
                        <a href={doc?.url} target="_blank" rel="noopener noreferrer" className="text-xs" style={{color: 'var(--purple-700)'}}>
                          {doc?.name}
                        </a>
                        {doc?.status === 'rejected' && doc?.note && (
                          <p className="text-xs mt-1" style={{color: '#C0392B'}}>Grund: {doc.note}</p>
                        )}
                      </div>
                      <span className="doc-pill" style={{background: docStatusMeta.bg, color: docStatusMeta.color}}>
                        {docStatusMeta.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}