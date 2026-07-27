// @ts-nocheck
'use client';

import { useState, useRef, useEffect } from 'react';

// ------- Base de connaissances locale (100% gratuite, aucune API) -------
const FAQ = [
  {
    keywords: ['preis', 'kosten', 'kostet', 'teuer', 'billig', 'stunde', 'euro', '€'],
    answer: 'Die genauen Preise hängen von der Art der Reinigung und der Häufigkeit ab (z. B. wöchentlich, alle zwei Wochen oder einmalig). Am schnellsten siehst du den genauen Preis, wenn du den Buchungsprozess startest – dort wird alles transparent angezeigt, bevor du bestätigst.',
  },
  {
    keywords: ['buchen', 'buchung', 'termin', 'reservieren', 'anmelden'],
    answer: 'Ganz einfach: Klicke auf "Reinigung buchen", gib deine Adresse ein, wähle die Art der Reinigung, den Rhythmus (wöchentlich, alle zwei Wochen oder einmalig) sowie Datum und Uhrzeit. Am Ende bestätigst du – fertig!',
  },
  {
    keywords: ['wohnung', 'wohnungsreinigung', 'haushalt'],
    answer: 'Die Wohnungsreinigung umfasst eine gründliche Reinigung deiner Wohnung – ideal für ein regelmäßig frisches Zuhause.',
  },
  {
    keywords: ['büro', 'buero', 'bueroreinigung', 'firma', 'unternehmen'],
    answer: 'Die Büroreinigung sorgt für saubere Arbeitsplätze – gut für Wohlbefinden und Produktivität im Team.',
  },
  {
    keywords: ['umzug', 'umzugsreinigung', 'auszug', 'einzug'],
    answer: 'Die Umzugsreinigung ist perfekt bei Ein- oder Auszug – die Wohnung wird besichtigungsbereit gemacht.',
  },
  {
    keywords: ['grundreinigung', 'tiefenreinigung', 'fenster', 'backofen'],
    answer: 'Die Grundreinigung ist eine Tiefenreinigung bis ins Detail – inklusive schwer erreichbarer Stellen wie Fenster und Backofen.',
  },
  {
    keywords: ['wöchentlich', 'woechentlich', 'oft', 'häufig', 'rhythmus', 'zwei wochen', 'einmalig', 'regelmäßig'],
    answer: 'Du kannst wöchentlich, alle zwei Wochen oder einmalig buchen. Du bist nicht gebunden – du kannst den Rhythmus jederzeit ändern oder pausieren.',
  },
  {
    keywords: ['kündigen', 'pausieren', 'stornieren', 'absagen', 'vertrag'],
    answer: 'Keine Sorge, es gibt keine feste Vertragsbindung. Du kannst jederzeit kostenlos kündigen oder pausieren.',
  },
  {
    keywords: ['zahlen', 'zahlung', 'bezahlen', 'kreditkarte', 'rechnung', 'iban'],
    answer: 'Die Zahlung erfolgt einfach und sicher online, direkt über die Plattform – erst wenn du mit der Reinigung zufrieden bist.',
  },
  {
    keywords: ['kontakt', 'telefon', 'nummer', 'email', 'e-mail', 'anrufen', 'erreichen'],
    answer: 'Du erreichst uns unter +49 152 14440144 oder per E-Mail an info@tandef.de.',
  },
  {
    keywords: ['wo', 'gebiet', 'stadt', 'deutschland', 'region', 'köln', 'koeln'],
    answer: 'Wir sind aktuell in Deutschland tätig. Gib bei der Buchung einfach deine Adresse ein – wir zeigen dir dann die Verfügbarkeit in deiner Nähe.',
  },
  {
    keywords: ['pro werden', 'helfer', 'arbeiten', 'job', 'karriere', 'bewerben', 'mitarbeiter', 'reinigungskraft'],
    answer: 'Super, dass du Interesse hast! Auf unserer Karriere-Seite findest du alle offenen Stellen und kannst dich direkt bewerben.',
  },
  {
    keywords: ['vertrauen', 'sicher', 'versichert', 'geprüft', 'background'],
    answer: 'Alle unsere Profis sind hintergrundgeprüft und versichert – deine Sicherheit und Zufriedenheit stehen an erster Stelle.',
  },
  {
    keywords: ['hallo', 'hi', 'hey', 'guten tag', 'moin', 'servus'],
    answer: 'Hallo! Schön, dass du da bist. Wie kann ich dir weiterhelfen? Du kannst mich zu Leistungen, Preisen, dem Buchungsablauf oder der Häufigkeit fragen.',
  },
  {
    keywords: ['danke', 'dankeschön', 'super', 'perfekt', 'top'],
    answer: 'Gerne! Falls du noch weitere Fragen hast, bin ich hier. 😊',
  },
];

const FALLBACK =
  'Das kann ich dir gerade leider nicht direkt beantworten. Am besten schaust du im Buchungsprozess nach oder kontaktierst uns unter info@tandef.de bzw. +49 152 14440144 – wir helfen dir gerne weiter!';

function getLocalReply(userText) {
  const text = userText.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  for (const entry of FAQ) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (text.includes(kw)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestMatch ? bestMatch.answer : FALLBACK;
}
// --------------------------------------------------------------------

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hallo! 👋 Ich bin der TANDEF-Assistent. Wie kann ich dir helfen? Du kannst mich zu Preisen, Terminen oder unseren Leistungen fragen.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  function sendMessage(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    // Petit délai simulé pour un rendu naturel (aucun appel réseau, 100% local)
    setTimeout(() => {
      const reply = getLocalReply(text);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      setLoading(false);
    }, 500);
  }

  return (
    <>
      <style jsx global>{`
        .cw-bubble{
          position:fixed;right:28px;bottom:28px;width:56px;height:56px;border-radius:9999px;
          background:linear-gradient(135deg,#5B21B6,#7C3AED);
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 12px 30px -8px rgba(76,29,149,.5);
          cursor:pointer;border:none;z-index:50;transition:.2s ease;
        }
        .cw-bubble:hover{transform:scale(1.06);}
        .cw-panel{
          position:fixed;right:28px;bottom:98px;width:360px;max-width:calc(100vw - 40px);
          height:500px;max-height:calc(100vh - 140px);
          background:#fff;border-radius:20px;box-shadow:0 25px 60px -15px rgba(76,29,149,.35);
          display:flex;flex-direction:column;overflow:hidden;z-index:50;
          animation:cwSlideUp .18s ease;
        }
        @keyframes cwSlideUp{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
        .cw-header{
          background:linear-gradient(90deg,#5B21B6,#7C3AED);color:#fff;
          padding:16px 18px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;
        }
        .cw-messages{flex:1;overflow-y:auto;padding:16px;background:#F9F8FD;}
        .cw-msg-row{display:flex;margin-bottom:12px;}
        .cw-msg{max-width:78%;padding:10px 14px;border-radius:14px;font-size:.88rem;line-height:1.4;white-space:pre-wrap;}
        .cw-msg.user{background:#5B21B6;color:#fff;border-bottom-right-radius:4px;}
        .cw-msg.assistant{background:#fff;color:#1F1339;border:1px solid #ECE8F5;border-bottom-left-radius:4px;}
        .cw-typing{display:inline-flex;gap:4px;padding:12px 14px;}
        .cw-dot{width:6px;height:6px;border-radius:9999px;background:#9C96A8;animation:cwBounce 1.2s infinite;}
        .cw-dot:nth-child(2){animation-delay:.15s;}
        .cw-dot:nth-child(3){animation-delay:.3s;}
        @keyframes cwBounce{0%,60%,100%{transform:translateY(0);opacity:.5;}30%{transform:translateY(-4px);opacity:1;}}
        .cw-form{display:flex;gap:8px;padding:12px;border-top:1px solid #ECE8F5;background:#fff;flex-shrink:0;}
        .cw-input{
          flex:1;border:1.5px solid #ECE8F5;border-radius:9999px;padding:10px 16px;font-size:.88rem;outline:none;
        }
        .cw-input:focus{border-color:#5B21B6;}
        .cw-send{
          width:38px;height:38px;border-radius:9999px;background:#5B21B6;color:#fff;
          display:flex;align-items:center;justify-content:center;flex-shrink:0;border:none;cursor:pointer;
        }
        .cw-send:disabled{opacity:.5;cursor:not-allowed;}
        .cw-close{background:none;border:none;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;}
      `}</style>

      {open && (
        <div className="cw-panel">
          <div className="cw-header">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
              <span className="font-semibold text-sm">TANDEF-Assistent</span>
            </div>
            <button className="cw-close" onClick={() => setOpen(false)} aria-label="Schließen">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="cw-messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className="cw-msg-row" style={{ justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div className={`cw-msg ${m.role}`}>{m.content}</div>
              </div>
            ))}
            {loading && (
              <div className="cw-msg-row" style={{ justifyContent: 'flex-start' }}>
                <div className="cw-msg assistant" style={{ padding: 0 }}>
                  <div className="cw-typing">
                    <span className="cw-dot" /><span className="cw-dot" /><span className="cw-dot" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <form className="cw-form" onSubmit={sendMessage}>
            <input
              className="cw-input"
              type="text"
              placeholder="Schreib deine Frage..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button type="submit" className="cw-send" disabled={loading || !input.trim()} aria-label="Senden">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
            </button>
          </form>
        </div>
      )}

      <button className="cw-bubble" onClick={() => setOpen(v => !v)} aria-label="Chat öffnen">
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
        )}
      </button>
    </>
  );
}