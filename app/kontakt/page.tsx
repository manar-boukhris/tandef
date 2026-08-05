// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';

function HeroImg({ src, height, position = 'center 30%' }) {
  return (
    <div style={{ height, borderRadius: '24px', overflow: 'hidden', position: 'relative' }}>
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: position, display: 'block' }} />
    </div>
  );
}

export default function KontaktPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.title = "TANDEF – Kontakt";

    const menuBtn = document.getElementById('about-menu-btn');
    const menu = document.getElementById('about-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!name || !email || !message || !agreed) return;

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject: topic, message }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
        return;
      }

      setSent(true);
    } catch {
      setError('Fehler beim Senden. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  }

  const faqs = [
    { q: 'Wie schnell erhalte ich ein Angebot?', a: 'In der Regel antworten wir innerhalb von 24 Stunden.' },
    { q: 'Wie kann ich eine Reinigung buchen?', a: 'Ganz einfach online über unser Buchungsformular in wenigen Minuten.' },
    { q: 'Kann ich einen Termin kurzfristig ändern oder stornieren?', a: 'Ja, Sie können Termine bis 24 Stunden vorher kostenlos ändern.' },
    { q: 'Welche Zahlungsarten akzeptieren Sie?', a: 'Kreditkarte, PayPal und SEPA-Lastschrift.' },
  ];

  return (
    <>
      <style jsx global>{`
        :root{--purple-900:#3B0A73;--purple-700:#5B21B6;--purple-600:#6D28D9;--purple-500:#7C3AED;--purple-100:#EDE9FE;--purple-50:#F5F3FF;--ink:#1F1339;--muted:#6B6478;}
        body{font-family:'Inter',sans-serif;color:var(--ink);}
        h1,h2,h3{font-family:'Poppins',sans-serif;}
        .btn-primary{background:var(--purple-700);transition:.2s ease;}
        .btn-primary:hover{background:var(--purple-900);}
        .btn-primary:disabled{opacity:.6;cursor:not-allowed;}
        .trust-item{text-align:left;}
        .icon-badge{width:44px;height:44px;border-radius:9999px;background:var(--purple-100);display:flex;align-items:center;justify-content:center;}
        .field{border:1.5px solid #ECE8F5;border-radius:10px;padding:.8rem 1rem;width:100%;outline:none;transition:.15s ease;}
        .field:focus{border-color:var(--purple-600);}
        .contact-card{border:1px solid #ECE8F5;border-radius:20px;}
        .faq-item{border-bottom:1px solid #ECE8F5;}
        .faq-question{cursor:pointer;display:flex;align-items:center;justify-content:space-between;padding:1rem 0;font-weight:600;}
        .faq-chevron{transition:transform .2s ease;}
        .faq-chevron.open{transform:rotate(180deg);}
        .why-card{border:1px solid #ECE8F5;border-radius:16px;text-align:center;}
        .why-icon{width:48px;height:48px;border-radius:9999px;background:var(--purple-100);display:flex;align-items:center;justify-content:center;margin:0 auto;}
        .dropdown-menu a{display:block;padding:.6rem 1.25rem;font-size:.9rem;}
        .dropdown-menu a:hover{background:var(--purple-50);}
        .social-icon{
          width:36px;height:36px;border-radius:9999px;
          background:var(--purple-100);
          display:flex;align-items:center;justify-content:center;
          color:var(--purple-700);transition:.15s ease;
        }
        .social-icon:hover{background:var(--purple-700);color:#fff;}
      `}</style>

      <header className="bg-white border-b" style={{borderColor: '#EDE9F5'}}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center gap-2"><img src="/images/logo.png" alt="TANDEF" className="h-9 w-auto" /></a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium relative" style={{color: 'var(--purple-700)'}}>
            <a href="/pro-werden" className="flex items-center gap-1.5 hover:opacity-70">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
              Für Helfer
            </a>
            <a href="/magazin" className="flex items-center gap-1.5 hover:opacity-70">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
              Magazin
            </a>
            <div className="relative">
              <button id="about-menu-btn" className="flex items-center gap-1.5" style={{color: 'var(--purple-700)'}}>
                Über uns
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
              </button>
              <div id="about-menu" className="dropdown-menu hidden absolute left-0 mt-3 w-56 py-2 z-30 bg-white rounded-xl" style={{boxShadow: '0 20px 45px -15px rgba(76,29,149,.3)'}}>
                <a href="/ueber-uns" style={{color: 'var(--ink)'}}>Über uns</a>
                <a href="/unser-team" style={{color: 'var(--ink)'}}>Unser Team</a>
                <a href="/karriere" style={{color: 'var(--ink)'}}>Karriere</a>
                <a href="/kontakt" style={{color: 'var(--ink)'}}>Kontakt</a>
              </div>
            </div>
            <a href="/login" className="flex items-center gap-1.5 hover:opacity-70">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /></svg>
              Login
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="/address" className="hidden md:inline-flex btn-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full items-center">Reinigung buchen</a>
            <button
              className="md:hidden flex items-center justify-center w-10 h-10"
              onClick={() => setMobileMenuOpen(v => !v)}
              aria-label="Menü öffnen"
              style={{color: 'var(--purple-700)'}}
            >
              {mobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
              )}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <nav className="md:hidden border-t px-6 py-4 flex flex-col gap-1 text-sm font-medium" style={{borderColor: '#EDE9F5', color: 'var(--ink)'}}>
            <a href="/pro-werden" className="py-3">Für Helfer</a>
            <a href="/magazin" className="py-3">Magazin</a>
            <a href="/ueber-uns" className="py-3">Über uns</a>
            <a href="/unser-team" className="py-3 pl-4 text-sm" style={{color: 'var(--muted)'}}>Unser Team</a>
            <a href="/karriere" className="py-3 pl-4 text-sm" style={{color: 'var(--muted)'}}>Karriere</a>
            <a href="/kontakt" className="py-3 pl-4 text-sm" style={{color: 'var(--muted)'}}>Kontakt</a>
            <a href="/login" className="py-3">Login</a>
            <a href="/address" className="btn-primary text-white text-sm font-semibold px-5 py-3 rounded-full text-center mt-2">Reinigung buchen</a>
          </nav>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-4 text-sm" style={{color: 'var(--muted)'}}>
        <a href="/" className="hover:opacity-70">Startseite</a> <span className="mx-1">›</span> <a href="/ueber-uns" className="hover:opacity-70">Über uns</a> <span className="mx-1">›</span> Kontakt
      </div>

      <section className="max-w-7xl mx-auto px-6 pt-8 pb-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-sm font-bold mb-3" style={{color: 'var(--purple-700)'}}>KONTAKT</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-5" style={{color: 'var(--ink)'}}>
            Wir sind für <span style={{color: 'var(--purple-700)'}}>Sie da.</span>
          </h1>
          <p className="text-base mb-8 max-w-md" style={{color: 'var(--muted)'}}>
            Haben Sie Fragen, Wünsche oder benötigen ein Angebot? Unser Team hilft Ihnen gerne weiter.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="trust-item"><p className="font-bold text-sm mb-1">Schnelle Antwort</p><p className="text-xs" style={{color: 'var(--muted)'}}>Wir antworten in der Regel innerhalb von 24 Stunden.</p></div>
            <div className="trust-item"><p className="font-bold text-sm mb-1">Persönlicher Service</p><p className="text-xs" style={{color: 'var(--muted)'}}>Persönliche Beratung und individuelle Lösungen.</p></div>
            <div className="trust-item"><p className="font-bold text-sm mb-1">Ihre Daten sind sicher</p><p className="text-xs" style={{color: 'var(--muted)'}}>Wir behandeln Ihre Anfrage vertraulich und DSGVO-konform.</p></div>
          </div>
        </div>
        <HeroImg src="/images/reception-desk.jpg" height="380px" />
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16 grid lg:grid-cols-2 gap-10">
        <div className="contact-card p-8">
          <h2 className="text-xl font-bold mb-6">Unsere <span style={{color: 'var(--purple-700)'}}>Kontaktdaten</span></h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="icon-badge shrink-0"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.11 4.18 2 2 0 014.1 2h3a2 2 0 012 1.72c.12.9.33 1.77.63 2.6a2 2 0 01-.45 2.11L8.1 9.6a16 16 0 006.3 6.3l1.17-1.18a2 2 0 012.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0122 16.92z" /></svg></div>
              <div><p className="font-bold text-sm">Telefon</p><p className="text-sm" style={{color: 'var(--purple-700)'}}>+49 15214440144</p><p className="text-xs" style={{color: 'var(--muted)'}}>Mo. – Fr. 08:00 – 18:00 Uhr</p></div>
            </div>
            <div className="flex gap-4">
              <div className="icon-badge shrink-0"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 6l10 7 10-7" /></svg></div>
              <div><p className="font-bold text-sm">E-Mail</p><p className="text-sm" style={{color: 'var(--purple-700)'}}>info@tandef.de</p><p className="text-xs" style={{color: 'var(--muted)'}}>Wir antworten so schnell wie möglich.</p></div>
            </div>
            <div className="flex gap-4">
              <div className="icon-badge shrink-0"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg></div>
              <div><p className="font-bold text-sm">Adresse</p><p className="text-sm" style={{color: 'var(--muted)'}}>TANDEF Reinigung<br />Köln<br />Deutschland</p></div>
            </div>
            <div className="flex gap-4">
              <div className="icon-badge shrink-0"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg></div>
              <div><p className="font-bold text-sm">Öffnungszeiten</p><p className="text-xs" style={{color: 'var(--muted)'}}>Montag – Freitag: 08:00 – 18:00 Uhr<br />Samstag: 09:00 – 14:00 Uhr<br />Sonntag: Geschlossen</p></div>
            </div>
            <div className="flex gap-4">
              <div className="icon-badge shrink-0"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" /></svg></div>
              <div><p className="font-bold text-sm mb-1">Folgen Sie uns</p>
                
                
                
              <div className="flex gap-3 mt-5">
              <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7C16.4 3.66 15.4 3.57 14.24 3.57c-2.4 0-4.05 1.47-4.05 4.16v2.17H7.5v3.1h2.7V21h3.3z"/></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg>
              </a>
              <a href="https://wa.me/4915214440144" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3C4.2 14.9 3.8 13.5 3.8 12c0-4.5 3.7-8.2 8.2-8.2s8.2 3.7 8.2 8.2-3.7 8.2-8.2 8.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.2.2-.4.1-.1 0-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.4 3.8 3.4.5.2.9.4 1.3.5.5.2 1 .1 1.3.1.4-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1-.1-.1-.2-.1-.4-.2z"/></svg>
              </a>
            </div>
                
                
                
              </div>
            </div>
          </div>
        </div>

        <div className="contact-card p-8">
          <h2 className="text-xl font-bold mb-6">Senden Sie uns eine <span style={{color: 'var(--purple-700)'}}>Nachricht</span></h2>
          {sent ? (
            <div className="rounded-xl p-6 text-center" style={{background: 'var(--purple-50)'}}>
              <p className="font-bold mb-2">Danke für Ihre Nachricht!</p>
              <p className="text-sm" style={{color: 'var(--muted)'}}>Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <p className="text-sm font-medium" style={{color: '#C0392B'}}>{error}</p>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                <input className="field" placeholder="Ihr Name *" value={name} onChange={e => setName(e.target.value)} required />
                <input className="field" type="email" placeholder="Ihre E-Mail *" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <input className="field" placeholder="Telefonnummer" value={phone} onChange={e => setPhone(e.target.value)} />
              <select className="field" value={topic} onChange={e => setTopic(e.target.value)} required>
                <option value="">Anliegen *: Bitte wählen</option>
                <option value="angebot">Angebot anfragen</option>
                <option value="frage">Allgemeine Frage</option>
                <option value="beschwerde">Beschwerde</option>
                <option value="sonstiges">Sonstiges</option>
              </select>
              <textarea className="field" rows={4} placeholder="Ihre Nachricht *" value={message} onChange={e => setMessage(e.target.value)} required />
              <label className="flex items-start gap-2 text-sm" style={{color: 'var(--muted)'}}>
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-1" required />
                Ich stimme der <a href="/datenschutz" className="underline" style={{color: 'var(--purple-700)'}}>Datenschutzerklärung</a> zu.*
              </label>
              <button type="submit" disabled={loading} className="btn-primary text-white font-semibold px-6 py-3 rounded-lg inline-flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                {loading ? 'Wird gesendet...' : 'Nachricht senden'}
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16 grid lg:grid-cols-2 gap-10">
        <div className="rounded-2xl overflow-hidden" style={{minHeight: '320px', border: '1px solid #ECE8F5'}}>
          <iframe
            src="https://www.google.com/maps?q=Hohenzollernring,+50672+K%C3%B6ln,+Deutschland&output=embed"
            width="100%"
            height="100%"
            style={{border: 0, minHeight: '320px', display: 'block'}}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="TANDEF Standort Köln"
          />
        </div>
        <div className="contact-card p-8">
          <h2 className="text-lg font-bold mb-5">Häufige Fragen</h2>
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <div className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{faq.q}</span>
                <svg className={`faq-chevron ${openFaq === i ? 'open' : ''} shrink-0`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
              </div>
              {openFaq === i && <p className="text-sm pb-4" style={{color: 'var(--muted)'}}>{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-extrabold text-center mb-10">Warum Kunden <span style={{color: 'var(--purple-700)'}}>uns kontaktieren</span></h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {[
            ['✨', 'Individuelle Beratung', 'Wir finden die passende Reinigungslösung für Ihre Bedürfnisse.'],
            ['📋', 'Kostenloses Angebot', 'Erhalten Sie ein transparentes und unverbindliches Angebot.'],
            ['📅', 'Flexible Termine', 'Wir richten uns nach Ihrem Zeitplan – auch kurzfristig.'],
            ['🎧', 'Freundlicher Support', 'Unser Team steht Ihnen jederzeit mit Rat und Tat zur Seite.'],
            ['🛡️', 'Zufriedenheit garantiert', 'Ihre Zufriedenheit ist unser höchstes Ziel.'],
          ].map(([emoji, t, d]) => (
            <div key={t} className="why-card p-6">
              <div className="why-icon mx-auto mb-3 text-xl">{emoji}</div>
              <p className="font-bold mb-1">{t}</p>
              <p className="text-sm" style={{color: 'var(--muted)'}}>{d}</p>
            </div>
          ))}
        </div>
      </section>

                   {/* Footer */}
         <footer className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-6 gap-8 text-sm">
          <div className="md:col-span-2">
            <img src="/images/logo.png" alt="TANDEF" className="h-9 w-auto mb-3" />
            <p style={{color: 'var(--muted)'}}>Zuverlässige Reinigung in Deutschland – für Zuhause und Unternehmen.</p>
            <div className="flex gap-3 mt-5">
              <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7C16.4 3.66 15.4 3.57 14.24 3.57c-2.4 0-4.05 1.47-4.05 4.16v2.17H7.5v3.1h2.7V21h3.3z"/></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg>
              </a>
              <a href="https://wa.me/4915214440144" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3.1 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3C4.2 14.9 3.8 13.5 3.8 12c0-4.5 3.7-8.2 8.2-8.2s8.2 3.7 8.2 8.2-3.7 8.2-8.2 8.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.2.2-.4.1-.1 0-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.4 3.8 3.4.5.2.9.4 1.3.5.5.2 1 .1 1.3.1.4-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1-.1-.1-.2-.1-.4-.2z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <p className="font-semibold mb-3" style={{color: 'var(--purple-900)'}}>Leistungen</p>
            <ul className="space-y-2" style={{color: 'var(--muted)'}}>
              <li><a href="/wohnungsreinigung" className="hover:opacity-70">Wohnungsreinigung</a></li>
              <li><a href="/bueroreinigung" className="hover:opacity-70">Büroreinigung</a></li>
              <li><a href="/umzugsreinigung" className="hover:opacity-70">Umzugsreinigung</a></li>
            
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3" style={{color: 'var(--purple-900)'}}>Unternehmen</p>
            <ul className="space-y-2" style={{color: 'var(--muted)'}}>
              <li> <a href="/ueber-uns" className="hover:opacity-70">Über uns</a></li>
              <li><a href="/unser-team" className="hover:opacity-70">Unser Team</a></li>
              <li><a href="/karriere" className="hover:opacity-70">Karriere</a></li>
              <li><a href="/kontakt" className="hover:opacity-70">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3" style={{color: 'var(--purple-900)'}}>Rechtliches</p>
            <ul className="space-y-2" style={{color: 'var(--muted)'}}>
            <li><a href="/agb" className="hover:opacity-70">AGB</a></li>
            <li><a href="/datenschutz" className="hover:opacity-70">Datenschutz</a></li>
            <li><a href="/impressum" className="hover:opacity-70">Impressum</a></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-3" style={{color: 'var(--purple-900)'}}>Kontakt</p>
            <ul className="space-y-3" style={{color: 'var(--muted)'}}>
              <li className="flex items-center gap-2">
                <svg className="shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.11 4.18 2 2 0 014.1 2h3a2 2 0 012 1.72c.12.9.33 1.77.63 2.6a2 2 0 01-.45 2.11L8.1 9.6a16 16 0 006.3 6.3l1.17-1.18a2 2 0 012.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0122 16.92z" /></svg>
                +4915214440144
              </li>
              <li className="flex items-center gap-2">
                <svg className="shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 6l10 7 10-7" /></svg>
                info@tandef.de
              </li>
              <li className="flex items-center gap-2">
                <svg className="shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                Deutschland
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs pb-8" style={{color: 'var(--muted)'}}>© 2026 Tandef. Alle Rechte vorbehalten.</div>
      </footer>
    </>
  );
}