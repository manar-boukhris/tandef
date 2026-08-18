// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getDraft, updateDraft } from '@/lib/bookingDraft';

const PACKAGES = {
  wohnung: [
    { name: 'Basic',    desc: 'Für gelegentliche Reinigungen',  price: 24.90, fixed: false, features: ['Professionelle Reinigung', 'Flexible Buchung', 'Kurzfristige Termine (je nach Verfügbarkeit)'] },
    { name: 'Standard', desc: 'Für regelmäßige Reinigungen',    price: 27.90, fixed: false, popular: true, features: ['Alles aus Basic', 'Lieblings-Reinigungskraft speichern', 'Wiederkehrende Buchungen', 'Kostenlose Umbuchung bis 24 Std.'] },
    { name: 'Premium',  desc: 'Für maximale Flexibilität',       price: 29.90, fixed: false, features: ['Alles aus Standard', 'Individuelle Reinigungs-Checkliste', 'Kostenlose Umbuchung bis 12 Std.', 'Schlüsselservice (falls verfügbar)'] },
  ],
  firmen: [
    { name: 'Basic',    desc: 'Für gelegentliche Reinigungen',  price: 34.90, fixed: false, features: ['Professionelle Reinigung', 'Flexible Buchung', 'Kurzfristige Termine (je nach Verfügbarkeit)'] },
    { name: 'Standard', desc: 'Für regelmäßige Reinigungen',    price: 39.90, fixed: false, popular: true, features: ['Alles aus Basic', 'Feste Reinigungskraft', 'Wiederkehrende Buchungen', 'Kostenlose Umbuchung bis 24 Std.'] },
    { name: 'Premium',  desc: 'Für maximale Flexibilität',       price: 44.90, fixed: false, features: ['Alles aus Standard', 'Individueller Reinigungsplan', 'Kostenlose Umbuchung bis 12 Std.', 'Priorisierter Support'] },
  ],
  umzug: [
    { name: '1-Zimmer',     desc: 'bis 50 m²',   price: 300, fixed: true, features: ['Gründliche Endreinigung', 'Küche & Bad inklusive', 'Fensterreinigung inklusive'] },
    { name: '2-3-Zimmer',   desc: '51 – 80 m²',  price: 500, fixed: true, popular: true, features: ['Gründliche Endreinigung', 'Küche & Bad inklusive', 'Fensterreinigung inklusive'] },
    { name: '4plus-Zimmer', desc: 'ab 81 m²',     price: 700, fixed: true, features: ['Gründliche Endreinigung', 'Küche & Bad inklusive', 'Fensterreinigung inklusive'] },
  ],
};

const TYPE_LABELS = {
  wohnung: 'Wohnungsreinigung',
  firmen: 'Firmenreinigung',
  umzug: 'Umzugsreinigung',
};

const PACK_DISPLAY_NAMES = {
  '1-Zimmer':     '1-Zimmer Wohnung',
  '2-3-Zimmer':   '2–3 Zimmer Wohnung',
  '4plus-Zimmer': '4+ Zimmer Wohnung',
};

function displayName(name) {
  return PACK_DISPLAY_NAMES[name] || name;
}

export default function BookingPackagePage() {
  const router = useRouter();
  const [bookingType, setBookingType] = useState('wohnung');
  const [selected, setSelected] = useState('Basic');

  useEffect(() => {
    document.title = "TANDEF – Wähle deinen Pack";
    const draft = getDraft();
    const type = draft.bookingType || 'wohnung';
    setBookingType(type);
    setSelected(draft.packageName || PACKAGES[type][0].name);

    const menuBtn = document.getElementById('user-menu-btn');
    const menu = document.getElementById('user-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }
  }, []);

  const packages = PACKAGES[bookingType] || PACKAGES.wohnung;
  const selectedPackage = packages.find(p => p.name === selected) || packages[0];
  const isUmzug = bookingType === 'umzug';

  function handleNext() {
    updateDraft({
      packageName: selectedPackage.name,
      packageRate: selectedPackage.price,
      isFixedPrice: selectedPackage.fixed,
    });

    if (isUmzug) {
      // Umzug: Festpreis, pas de choix de service type ni d'heures ni d'extras → direct date/heure
      updateDraft({
        serviceType: 'Umzugsreinigung',
        hourlyRate: selectedPackage.price,
        hours: 1, // placeholder pour éviter null en base
        price: selectedPackage.price,
      });
      router.push('/booking-datetime');
    } else {
      router.push('/booking-service-type');
    }
  }

  return (
    <>
      <style jsx global>{`
        :root{--purple-900:#3B0A73;--purple-700:#5B21B6;--purple-600:#6D28D9;--purple-500:#7C3AED;--purple-100:#EDE9FE;--purple-50:#F5F3FF;--ink:#1F1339;--muted:#6B6478;}
        body{font-family:'Inter',sans-serif;color:var(--ink);background-color:#F6F4FC;background-image:url('/images/sessions-bg.png');background-size:cover;background-position:top center;background-repeat:no-repeat;background-attachment:fixed;min-height:100vh;}
        h1,h2,h3{font-family:'Poppins',sans-serif;}
        .pack-card{background:#fff;border:2px solid #ECE8F5;border-radius:18px;transition:.2s ease;cursor:pointer;position:relative;}
        .pack-card:hover{border-color:#C9B8EC;}
        .pack-card.selected{border-color:var(--purple-600);box-shadow:0 15px 35px -20px rgba(76,29,149,.35);}
        .checkbox-box{width:24px;height:24px;border-radius:8px;border:2px solid #D6CFE6;display:flex;align-items:center;justify-content:center;transition:.15s ease;flex-shrink:0;}
        .pack-card.selected .checkbox-box{background:var(--purple-600);border-color:var(--purple-600);}
        .badge-popular{position:absolute;top:-12px;left:24px;background:var(--purple-600);color:#fff;font-size:.7rem;font-weight:700;padding:.3rem .8rem;border-radius:9999px;}
        .btn-gradient{background:linear-gradient(90deg,var(--purple-700),var(--purple-500));transition:.2s ease;}
        .btn-gradient:hover{filter:brightness(1.05);}
        .progress-track{background:#E7E4EF;border-radius:9999px;height:6px;}
        .progress-fill{background:var(--purple-600);border-radius:9999px;height:6px;width:33%;}
        .dropdown-menu{background:#fff;border-radius:14px;box-shadow:0 20px 45px -15px rgba(76,29,149,.3);}
        .dropdown-menu a{display:block;padding:.7rem 1.25rem;color:var(--ink);font-size:.9rem;}
        .dropdown-menu a:hover{background:var(--purple-50);}
        .chat-bubble{position:fixed;right:28px;bottom:28px;width:56px;height:56px;border-radius:9999px;background:linear-gradient(135deg,var(--purple-700),var(--purple-500));display:flex;align-items:center;justify-content:center;box-shadow:0 12px 30px -8px rgba(76,29,149,.5);}
      `}</style>

      <div className="relative max-w-3xl mx-auto px-6 pt-8 flex items-center gap-4">
        <a href="/booking-type" className="text-gray-400 hover:text-gray-600">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
        </a>
        <div className="progress-track flex-1"><div className="progress-fill"></div></div>
      </div>

      <section className="relative max-w-3xl mx-auto px-6 pt-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <a href="/booking-type" className="flex items-center gap-2 font-semibold hover:opacity-70" style={{color: 'var(--purple-700)'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            Zurück
          </a>
          <p className="font-medium" style={{color: 'var(--ink)'}}>Hallo!</p>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 text-center" style={{color: 'var(--ink)'}}>Wähle deinen Pack</h1>
        <p className="mb-8 text-center" style={{color: 'var(--muted)'}}>
          {TYPE_LABELS[bookingType]} – {isUmzug ? 'wähle die passende Wohnungsgröße.' : 'wähle das passende Paket für dich.'}
        </p>

        <div className="space-y-5">
          {packages.map(pack => {
            const isSelected = selected === pack.name;
            return (
              <div key={pack.name} onClick={() => setSelected(pack.name)} className={`pack-card p-6 ${isSelected ? 'selected' : ''}`}>
                {pack.popular && <span className="badge-popular">★ Beliebt</span>}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="font-bold text-lg" style={{color: 'var(--ink)'}}>{displayName(pack.name)}</p>
                    <p className="text-sm" style={{color: 'var(--muted)'}}>{pack.desc}</p>
                  </div>
                  <span className="checkbox-box shrink-0">
                    {isSelected && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 12l5 5 9-9" /></svg>}
                  </span>
                </div>
                {pack.fixed
                  ? <p className="font-bold mb-3" style={{color: 'var(--purple-700)'}}>{pack.price} € <span className="font-normal text-sm" style={{color: 'var(--muted)'}}>Festpreis</span></p>
                  : <p className="font-bold mb-3" style={{color: 'var(--purple-700)'}}>{pack.price.toFixed(2).replace('.', ',')} € <span className="font-normal text-sm" style={{color: 'var(--muted)'}}>/ Std.</span></p>
                }
                <ul className="space-y-1.5 text-sm">
                  {pack.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2" style={{color: 'var(--ink)'}}>
                      <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--purple-600)" strokeWidth="2"><path d="M5 12l5 5 9-9" /></svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-10">
          <button onClick={handleNext} className="btn-gradient inline-flex items-center justify-center gap-2 text-white font-semibold px-12 py-4 rounded-full">
            Weiter
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </div>
      </section>

      <div className="chat-bubble">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
      </div>
    </>
  );
}