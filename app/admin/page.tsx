// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminStyles from '../AdminStyles';

function initials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function AdminPage() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [cleaners, setCleaners] = useState([]);
  const [clients, setClients] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [cleanerTab, setCleanerTab] = useState('pending');
  const [bookingTab, setBookingTab] = useState('all');

  useEffect(() => {
    document.title = "Admin — TANDEF";
    loadAll();
  }, []);

  function loadAll() {
    fetch('/api/admin/stats').then(r => r.json()).then(setStats);
    fetch('/api/admin/cleaners').then(r => r.json()).then(data => setCleaners(Array.isArray(data) ? data : []));
    fetch('/api/admin/clients').then(r => r.json()).then(data => setClients(Array.isArray(data) ? data : []));
    fetch('/api/admin/bookings').then(r => r.json()).then(data => setBookings(Array.isArray(data) ? data : []));
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin-login');
  }

  async function toggleCleanerStatus(cleanerId, newStatus) {
    await fetch('/api/admin/cleaners', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cleanerId, status: newStatus }),
    });
    loadAll();
  }

  const filteredCleaners = cleaners.filter(c => {
    if (cleanerTab === 'pending') return c.status !== 'active' && c.status !== 'suspended' && c.application?.status === 'pending';
    return c.status === cleanerTab;
  });

  const filteredBookings = bookingTab === 'all' ? bookings : bookings.filter(b => b.status === bookingTab);

  const pendingCount = cleaners.filter(c => c.application?.status === 'pending' && c.status !== 'active' && c.status !== 'suspended').length;
  const activeCount = cleaners.filter(c => c.status === 'active').length;
  const suspendedCount = cleaners.filter(c => c.status === 'suspended').length;

  return (
    <>
      <AdminStyles />
      <style jsx global>{`
        body{background:#F7F6FB;}
        .admin-shell{display:grid; grid-template-columns:240px 1fr; min-height:100vh;}
        .admin-side{background:var(--violet-900); color:#fff; padding:24px 18px; position:sticky; top:0; height:100vh; display:flex; flex-direction:column;}
        .admin-brand{display:flex; align-items:center; gap:10px; font-weight:800; font-size:18px; font-family:'Space Grotesk',sans-serif; margin-bottom:8px; padding:0 8px;}
        .admin-brand svg{width:26px; height:26px;}
        .admin-role{font-size:11px; color:#B7A9EA; padding:0 8px; margin-bottom:28px;}
        .admin-nav a{display:flex; align-items:center; justify-content:space-between; gap:10px; padding:11px 12px; border-radius:10px; font-size:13.5px; font-weight:700; color:#C6BAEF; margin-bottom:3px; cursor:pointer;}
        .admin-nav a .cnt{background:rgba(255,255,255,.12); font-size:10.5px; padding:2px 8px; border-radius:100px;}
        .admin-nav a.alert .cnt{background:#F5A623; color:#2C1B6B;}
        .admin-nav a.active, .admin-nav a:hover{background:rgba(255,255,255,.1); color:#fff;}
        .admin-side-bottom{margin-top:auto; padding-top:16px; border-top:1px solid rgba(255,255,255,.12);}
        .admin-side-bottom a{display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:10px; font-size:13px; font-weight:700; color:#C6BAEF; cursor:pointer;}
        .admin-side-bottom a:hover{background:rgba(255,255,255,.1); color:#fff;}
        .admin-main{padding:30px 36px 80px; scroll-behavior:smooth;}
        .admin-top{display:flex; align-items:center; justify-content:space-between; margin-bottom:30px; scroll-margin-top:20px;}
        .admin-top h1{font-size:23px; font-weight:800; color:var(--violet-900); font-family:'Space Grotesk',sans-serif;}
        .admin-top .who{display:flex; align-items:center; gap:10px;}
        .admin-avatar{width:36px; height:36px; border-radius:50%; background:linear-gradient(135deg,var(--violet-300),var(--violet-700));}
        .kpi-row{display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:40px;}
        .kpi{background:#fff; border:1px solid var(--line); border-radius:14px; padding:16px;}
        .kpi .num{font-family:'Space Grotesk',sans-serif; font-weight:800; font-size:22px; color:var(--violet-700);}
        .kpi .lbl{font-size:11.5px; color:var(--ink-soft); font-weight:600; margin-top:4px;}
        .kpi.warn .num{color:var(--gold);}
        .admin-section{margin-bottom:52px; scroll-margin-top:20px;}
        .sec-top{display:flex; align-items:center; justify-content:space-between; margin-bottom:18px;}
        .sec-top h2{font-size:17px; font-weight:800; color:var(--violet-900); font-family:'Space Grotesk',sans-serif;}
        .sec-tabs{display:flex; gap:8px;}
        .sec-tab{padding:7px 16px; border-radius:100px; font-size:12.5px; font-weight:700; color:var(--ink-soft); border:1.5px solid var(--line); cursor:pointer;}
        .sec-tab.active{background:var(--violet-700); border-color:var(--violet-700); color:#fff;}
        table{width:100%; border-collapse:collapse; background:#fff; border:1px solid var(--line); border-radius:14px; overflow:hidden;}
        thead th{text-align:left; font-size:11px; text-transform:uppercase; letter-spacing:.4px; color:var(--ink-soft); font-weight:800; padding:12px 16px; background:#FAFAFD; border-bottom:1px solid var(--line);}
        tbody td{padding:13px 16px; font-size:13.5px; border-bottom:1px solid var(--line); vertical-align:middle;}
        tbody tr:last-child td{border-bottom:none;}
        .who-cell{display:flex; align-items:center; gap:10px;}
        .mini-av{width:34px; height:34px; border-radius:10px; background:linear-gradient(135deg,var(--violet-300),var(--violet-500)); flex-shrink:0; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:12px;}
        .who-cell .nm{font-weight:700; color:var(--ink);}
        .who-cell .sub{font-size:11.5px; color:var(--ink-soft);}
        .pill{font-size:11px; font-weight:800; padding:4px 11px; border-radius:100px; display:inline-block;}
        .pill.pending{background:#FFF3E0; color:#B4770B;}
        .pill.active{background:var(--mint-100); color:#0F8F65;}
        .pill.suspended{background:#F4F2FA; color:var(--ink-soft);}
        .pill.completed{background:var(--mint-100); color:#0F8F65;}
        .pill.upcoming{background:var(--lavender-50); color:var(--violet-700);}
        .pill.cancelled{background:#FBE7E7; color:#C0392B;}
        .row-btn{font-size:12px; font-weight:700; color:var(--violet-700); padding:6px 12px; border-radius:8px; border:1.5px solid var(--violet-300); background:#fff; cursor:pointer;}
        .row-btn.primary{background:var(--violet-700); color:#fff; border-color:var(--violet-700);}
        .row-btns{display:flex; gap:6px;}
        @media(max-width:1100px){ .kpi-row{grid-template-columns:repeat(2,1fr);} }
      `}</style>

      <div className="admin-shell">
        <div className="admin-side">
          <div className="admin-brand">
            <svg viewBox="0 0 100 100"><path fill="#A895F0" d="M50 5 C60 25 60 45 50 55 C40 45 40 25 50 5Z" /><path fill="#fff" d="M50 55 C35 50 20 38 15 22 C35 20 48 32 50 55Z" /><path fill="#A895F0" d="M50 55 C65 50 80 38 85 22 C65 20 52 32 50 55Z" /></svg>
            TANDEF
          </div>
          <div className="admin-role">Admin-Panel</div>
          <div className="admin-nav">
            <a onClick={() => scrollToSection('section-overview')}>📊 Übersicht</a>
            <a className={pendingCount > 0 ? 'alert' : ''} onClick={() => scrollToSection('section-cleaners')}>
              🧹 Reinigungskräfte {pendingCount > 0 && <span className="cnt">{pendingCount} ausstehend</span>}
            </a>
            <a onClick={() => scrollToSection('section-clients')}>👥 Kunden</a>
            <a onClick={() => scrollToSection('section-bookings')}>📅 Buchungen</a>
          </div>
          <div className="admin-side-bottom">
            <a onClick={() => router.push('/')}>🌐 Website ansehen</a>
            <a onClick={logout}>↩ Abmelden</a>
          </div>
        </div>

        <div className="admin-main">
          <div className="admin-top" id="section-overview">
            <h1>Admin-Übersicht</h1>
            <div className="who">
              <span style={{fontSize: '13px', fontWeight: 700, color: 'var(--ink-soft)'}}>Admin</span>
              <div className="admin-avatar"></div>
            </div>
          </div>

          <div className="kpi-row">
            <div className="kpi"><div className="num display">{stats?.activeCustomers ?? '—'}</div><div className="lbl">Registrierte Kunden</div></div>
            <div className="kpi"><div className="num display">{stats?.activeCleaners ?? '—'}</div><div className="lbl">Aktive Reinigungskräfte</div></div>
            <div className="kpi warn"><div className="num display">{stats?.pendingApplications ?? '—'}</div><div className="lbl">Ausstehende Freischaltungen</div></div>
            <div className="kpi"><div className="num display">{stats?.bookingsThisMonth ?? '—'}</div><div className="lbl">Buchungen diesen Monat</div></div>
          </div>

          {/* CLEANERS */}
          <div className="admin-section" id="section-cleaners">
            <div className="sec-top">
              <h2>Reinigungskräfte</h2>
              <div className="sec-tabs">
                <div className={`sec-tab ${cleanerTab === 'pending' ? 'active' : ''}`} onClick={() => setCleanerTab('pending')}>Ausstehend ({pendingCount})</div>
                <div className={`sec-tab ${cleanerTab === 'active' ? 'active' : ''}`} onClick={() => setCleanerTab('active')}>Aktiv ({activeCount})</div>
                <div className={`sec-tab ${cleanerTab === 'suspended' ? 'active' : ''}`} onClick={() => setCleanerTab('suspended')}>Gesperrt ({suspendedCount})</div>
              </div>
            </div>
            <table>
              <thead><tr><th>Antragsteller</th><th>Beworben am</th><th>Dokumente</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {filteredCleaners.length === 0 && (
                  <tr><td colSpan={5} style={{textAlign: 'center', color: 'var(--ink-soft)'}}>Keine Einträge.</td></tr>
                )}
                {filteredCleaners.map(c => {
                  const docsCount = c.application?.documents ? JSON.parse(c.application.documents).length : 0;
                  return (
                    <tr key={c.id}>
                      <td>
                        <div className="who-cell">
                          <div className="mini-av">{initials(c.user.name)}</div>
                          <div><div className="nm">{c.user.name}</div><div className="sub">{c.user.email}</div></div>
                        </div>
                      </td>
                      <td>{c.application?.submittedAt ? new Date(c.application.submittedAt).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}</td>
                      <td>{docsCount}/3 hochgeladen</td>
                      <td><span className={`pill ${c.status === 'active' ? 'active' : c.status === 'suspended' ? 'suspended' : 'pending'}`}>
                        {c.status === 'active' ? 'Aktiv' : c.status === 'suspended' ? 'Gesperrt' : 'Prüfung ausstehend'}
                      </span></td>
                      <td>
                        {cleanerTab === 'pending' ? (
                          <button className="row-btn primary" onClick={() => router.push('/admin-cleaner-review?id=' + c.application?.id)}>Prüfen</button>
                        ) : cleanerTab === 'active' ? (
                          <button className="row-btn" onClick={() => toggleCleanerStatus(c.id, 'suspended')}>Sperren</button>
                        ) : (
                          <button className="row-btn" onClick={() => toggleCleanerStatus(c.id, 'active')}>Entsperren</button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* CLIENTS */}
          <div className="admin-section" id="section-clients">
            <div className="sec-top"><h2>Kunden</h2></div>
            <table>
              <thead><tr><th>Kunde</th><th>Registriert</th><th>Buchungen</th><th>Gesamtausgaben</th></tr></thead>
              <tbody>
                {clients.length === 0 && (
                  <tr><td colSpan={4} style={{textAlign: 'center', color: 'var(--ink-soft)'}}>Keine Kunden.</td></tr>
                )}
                {clients.map(c => (
                  <tr key={c.id}>
                    <td>
                      <div className="who-cell">
                        <div className="mini-av">{initials(c.name)}</div>
                        <div><div className="nm">{c.name}</div><div className="sub">{c.email}</div></div>
                      </div>
                    </td>
                    <td>{new Date(c.createdAt).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                    <td>{c.bookingsCount}</td>
                    <td className="display">{c.totalSpent.toFixed(2)} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* BOOKINGS */}
          <div className="admin-section" id="section-bookings">
            <div className="sec-top">
              <h2>Buchungen</h2>
              <div className="sec-tabs">
                <div className={`sec-tab ${bookingTab === 'all' ? 'active' : ''}`} onClick={() => setBookingTab('all')}>Alle</div>
                <div className={`sec-tab ${bookingTab === 'upcoming' ? 'active' : ''}`} onClick={() => setBookingTab('upcoming')}>Bevorstehend</div>
                <div className={`sec-tab ${bookingTab === 'completed' ? 'active' : ''}`} onClick={() => setBookingTab('completed')}>Abgeschlossen</div>
                <div className={`sec-tab ${bookingTab === 'cancelled' ? 'active' : ''}`} onClick={() => setBookingTab('cancelled')}>Storniert</div>
              </div>
            </div>
            <table>
              <thead><tr><th>ID</th><th>Kunde</th><th>Reinigungskraft</th><th>Datum</th><th>Betrag</th><th>Status</th></tr></thead>
              <tbody>
                {filteredBookings.length === 0 && (
                  <tr><td colSpan={6} style={{textAlign: 'center', color: 'var(--ink-soft)'}}>Keine Buchungen.</td></tr>
                )}
                {filteredBookings.map(b => (
                  <tr key={b.id}>
                    <td className="display">TND-{String(b.id).padStart(3, '0')}</td>
                    <td>{b.user?.name || '—'}</td>
                    <td>{b.cleaner?.user?.name || '—'}</td>
                    <td>{new Date(b.date).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' })} · {new Date(b.date).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</td>
                    <td className="display">{b.status === 'cancelled' ? '—' : `${b.price} €`}</td>
                    <td><span className={`pill ${b.status}`}>
                      {b.status === 'upcoming' ? 'Bevorstehend' : b.status === 'completed' ? 'Abgeschlossen' : 'Storniert'}
                    </span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  );
}