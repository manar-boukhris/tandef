// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useLogout } from '@/lib/useLogout';

export default function InvoicesPage() {
  const logout = useLogout('customer');
  const [invoices, setInvoices] = useState<any[]>([]);
  const [tab, setTab] = useState<'history' | 'invoices'>('history');

  useEffect(() => {
    document.title = "TANDEF – Historie und Rechnungen";

    fetch('/api/customer/invoices')
      .then(res => res.json())
      .then(data => setInvoices(Array.isArray(data) ? data : []));

    const menuBtn = document.getElementById('user-menu-btn');
    const menu = document.getElementById('user-menu');
    if (menuBtn && menu) {
      menuBtn.addEventListener('click', (e) => { e.stopPropagation(); menu.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!menu.contains(e.target)) menu.classList.add('hidden'); });
    }
  }, []);

  function downloadPdf(invoiceId: number) {
    window.open('/api/customer/invoices/' + invoiceId + '/pdf', '_blank');
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
        .tab-active{color:var(--purple-700);border-bottom:2px solid var(--purple-700);}
        .tab-inactive{color:#B0A9C2;}
        .dropdown-menu{background:#fff;border-radius:14px;box-shadow:0 20px 45px -15px rgba(76,29,149,.3);}
        .dropdown-menu a{display:block;padding:.7rem 1.25rem;color:var(--ink);font-size:.9rem;}
        .dropdown-menu a:hover{background:var(--purple-50);}
        .chat-bubble{
          position:fixed;right:28px;bottom:28px;width:56px;height:56px;border-radius:9999px;
          background:linear-gradient(135deg,var(--purple-700),var(--purple-500));
          display:flex;align-items:center;justify-content:center;
          box-shadow:0 12px 30px -8px rgba(76,29,149,.5);
        }
        .invoice-row{background:#fff;border-radius:16px;border:1px solid #ECE8F5;}
        .status-pill{font-size:.7rem;font-weight:700;padding:.25rem .7rem;border-radius:9999px;}
        .status-paid{background:#E7F7EE;color:#15803D;}
        .status-pending{background:#FEF3C7;color:#B7791F;}
        .pdf-btn{background:var(--purple-100);transition:.15s ease;border:none;cursor:pointer;}
        .pdf-btn:hover{background:var(--purple-600);}
        .pdf-btn:hover svg{stroke:#fff;}
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
                <a href="/invoices" className="font-semibold" style={{color: 'var(--purple-700)'}}>Historie und Rechnungen</a>
                <a href="/account">Mein Profil</a>
                <a href="/preferences">Meine Kommunikationspräferenzen</a>
                <a href="/payment-methods">Zahlungsmethoden</a>
                <a href="#" onClick={(e) => { e.preventDefault(); logout(); }} className="border-t" style={{borderColor: '#EDE9F5'}}>Abmelden</a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <section className="relative max-w-4xl mx-auto px-6 pt-10 pb-8">
        <p className="text-sm mb-8" style={{color: 'var(--muted)'}}>
          Kundenbereich <span className="mx-1">›</span> <span className="font-semibold" style={{color: 'var(--purple-700)'}}>Historie und Rechnungen</span>
        </p>
        <h1 className="text-4xl font-extrabold mb-3 text-center flex items-center justify-center gap-3" style={{color: 'var(--purple-700)'}}>
          <span style={{color: '#C9BCEB'}}>✦</span>
          Historie und Rechnungen
          <span style={{color: '#C9BCEB'}}>✦</span>
        </h1>
        <p className="text-center" style={{color: 'var(--muted)'}}>Alle deine Reinigungen und Rechnungen auf einen Blick.</p>
      </section>

      <section className="relative max-w-4xl mx-auto px-6 pb-24">
        <div className="panel p-8">

          <div className="flex gap-8 mb-8 border-b" style={{borderColor: '#EFEAF6'}}>
            <button onClick={() => setTab('history')} className={`pb-3 font-semibold text-sm ${tab === 'history' ? 'tab-active' : 'tab-inactive'}`}>Historie</button>
            <button onClick={() => setTab('invoices')} className={`pb-3 font-semibold text-sm ${tab === 'invoices' ? 'tab-active' : 'tab-inactive'}`}>Rechnungen</button>
          </div>

          {invoices.length === 0 ? (
            <div className="text-center py-10">
              <div className="relative w-44 h-44 mx-auto mb-6 flex items-center justify-center rounded-full" style={{background: 'var(--purple-50)'}}>
                <span className="absolute text-base" style={{top: '12px', right: '26px', color: '#C9BCEB'}}>✦</span>
                <span className="absolute text-sm" style={{bottom: '22px', left: '16px', color: '#C9BCEB'}}>✦</span>
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                  <rect x="24" y="14" width="52" height="68" rx="7" fill="#fff" stroke="#5B21B6" strokeWidth="3" />
                  <path d="M34 32h32M34 44h32M34 56h20" stroke="#C9B7ED" strokeWidth="3.5" strokeLinecap="round" />
                  <circle cx="68" cy="70" r="16" fill="#5B21B6" />
                  <path d="M68 63v9M68 77v.01" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{color: 'var(--ink)'}}>Noch keine Einträge</h3>
              <p className="text-sm mb-8" style={{color: 'var(--muted)'}}>Sobald deine erste Reinigung abgeschlossen ist, findest du hier deine Historie und Rechnungen.</p>
              <a href="/address" className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3.5 rounded-full" style={{background: 'linear-gradient(90deg,var(--purple-700),var(--purple-500))'}}>
                <span>✦</span> Erste Reinigung buchen
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              {invoices.map((inv) => (
                <div key={inv.id} className="invoice-row p-5 flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold" style={{color: 'var(--ink)'}}>{inv.booking.serviceType}</p>
                      <span className={`status-pill ${inv.status === 'paid' ? 'status-paid' : 'status-pending'}`}>
                        {inv.status === 'paid' ? 'Bezahlt' : 'Ausstehend'}
                      </span>
                    </div>
                    <p className="text-sm" style={{color: 'var(--muted)'}}>
                      {new Date(inv.issuedAt).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <p className="font-extrabold" style={{color: 'var(--purple-700)'}}>{inv.amount} €</p>
                  <button
                    onClick={() => downloadPdf(inv.id)}
                    className="pdf-btn w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    title="PDF herunterladen"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B21B6" strokeWidth="2"><path d="M12 16V4M12 16l-4-4M12 16l4-4" /><path d="M4 20h16" /></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="chat-bubble">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
      </div>
    </>
  );
}