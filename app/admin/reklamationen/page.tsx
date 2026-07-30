// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminStyles from '../../AdminStyles';

function initials(name) {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function statusLabel(status) {
  if (status === 'new') return 'Neu';
  if (status === 'read') return 'Gelesen';
  if (status === 'resolved') return 'Erledigt';
  return status;
}

export default function AdminReklamationenPage() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    document.title = "Reklamationen — TANDEF Admin";
    loadMessages();
  }, []);

  function loadMessages() {
    setLoading(true);
    fetch('/api/admin/contact-messages')
      .then(r => r.json())
      .then(list => {
        setMessages(Array.isArray(list) ? list : []);
        setLoading(false);
        if (Array.isArray(list) && list.length > 0 && !selectedId) {
          setSelectedId(list[0].id);
        }
      });
  }

  async function updateStatus(id, status) {
    await fetch('/api/admin/contact-messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    loadMessages();
  }

  function selectMessage(m) {
    setSelectedId(m.id);
    if (m.status === 'new') updateStatus(m.id, 'read');
  }

  const filtered = messages.filter(m => filter === 'all' || m.status === filter);
  const selected = messages.find(m => m.id === selectedId);

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
        .admin-nav a{display:flex; align-items:center; gap:10px; padding:11px 12px; border-radius:10px; font-size:13.5px; font-weight:700; color:#C6BAEF; margin-bottom:3px; cursor:pointer;}
        .admin-nav a.active, .admin-nav a:hover{background:rgba(255,255,255,.1); color:#fff;}
        .admin-side-bottom{margin-top:auto; padding-top:16px; border-top:1px solid rgba(255,255,255,.12);}
        .admin-side-bottom a{display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:10px; font-size:13px; font-weight:700; color:#C6BAEF; cursor:pointer;}
        .admin-main{padding:30px 36px 80px; max-width:1200px;}
        .page-title{font-size:22px; font-weight:800; color:var(--violet-900); font-family:'Space Grotesk',sans-serif; margin-bottom:4px;}
        .page-sub{font-size:13px; color:var(--ink-soft); margin-bottom:20px;}
        .filter-row{display:flex; gap:8px; margin-bottom:18px;}
        .filter-chip{padding:7px 14px; border-radius:100px; font-size:12.5px; font-weight:700; border:1.5px solid var(--line); color:var(--ink-soft); cursor:pointer;}
        .filter-chip.active{background:var(--violet-700); color:#fff; border-color:var(--violet-700);}
        .rekla-grid{display:grid; grid-template-columns:.9fr 1.4fr; gap:22px; align-items:start;}
        .msg-list{background:#fff; border:1px solid var(--line); border-radius:16px; overflow:hidden;}
        .msg-row{display:flex; gap:12px; padding:16px; border-bottom:1px solid var(--line); cursor:pointer; align-items:flex-start;}
        .msg-row:last-child{border-bottom:none;}
        .msg-row:hover{background:var(--lavender-50);}
        .msg-row.selected{background:var(--lavender-50); border-left:3px solid var(--violet-700);}
        .msg-av{width:38px; height:38px; border-radius:10px; background:linear-gradient(135deg,var(--violet-300),var(--violet-500)); flex-shrink:0; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:800; font-size:12px;}
        .msg-row .nm{font-weight:800; font-size:13.5px;}
        .msg-row .snippet{font-size:12px; color:var(--ink-soft); margin-top:2px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;}
        .msg-row .dt{font-size:10.5px; color:#A79ACB; margin-top:4px;}
        .status-dot{width:8px; height:8px; border-radius:9999px; flex-shrink:0; margin-top:5px;}
        .status-dot.new{background:#E85D5D;}
        .status-dot.read{background:#F5B400;}
        .status-dot.resolved{background:#0F8F65;}
        .card{background:#fff; border:1px solid var(--line); border-radius:16px; padding:24px; margin-bottom:18px;}
        .card h3{font-size:14.5px; font-weight:800; color:var(--violet-900); margin-bottom:14px; font-family:'Space Grotesk',sans-serif;}
        .detail-row{display:flex; justify-content:space-between; padding:9px 0; border-bottom:1px solid var(--line); font-size:13px;}
        .detail-row:last-child{border-bottom:none;}
        .detail-row .k{color:var(--ink-soft); font-weight:600;}
        .detail-row .v{font-weight:700; color:var(--ink); text-align:right;}
        .msg-body{background:var(--lavender-50); border-radius:12px; padding:16px; font-size:13.5px; line-height:1.6; color:var(--ink); white-space:pre-wrap;}
        .account-badge{display:inline-flex; align-items:center; gap:6px; padding:4px 12px; border-radius:100px; font-size:11.5px; font-weight:800;}
        .account-badge.customer{background:var(--lavender-50); color:var(--violet-700);}
        .account-badge.cleaner{background:var(--mint-100); color:#0F8F65;}
        .account-badge.guest{background:#F1EFF6; color:var(--ink-soft);}
        .booking-mini{display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--line); font-size:12.5px;}
        .booking-mini:last-child{border-bottom:none;}
        .action-row{display:flex; gap:8px; margin-top:4px;}
        .action-btn{flex:1; padding:10px; border-radius:9px; font-size:12.5px; font-weight:700; border:1.5px solid var(--line); background:#fff; color:var(--ink); cursor:pointer;}
        .action-btn.primary{background:var(--violet-700); color:#fff; border-color:var(--violet-700);}
        .action-btn.mint{background:var(--mint-500); color:#fff; border-color:var(--mint-500);}
        .empty-state{text-align:center; padding:60px 20px; color:var(--ink-soft);}
      `}</style>

      <div className="admin-shell">
        <div className="admin-side">
          <div className="admin-brand">
            <svg viewBox="0 0 100 100"><path fill="#A895F0" d="M50 5 C60 25 60 45 50 55 C40 45 40 25 50 5Z" /><path fill="#fff" d="M50 55 C35 50 20 38 15 22 C35 20 48 32 50 55Z" /><path fill="#A895F0" d="M50 55 C65 50 80 38 85 22 C65 20 52 32 50 55Z" /></svg>
            TANDEF
          </div>
          <div className="admin-role">Admin-Panel</div>
          <div className="admin-nav">
            <a onClick={() => router.push('/admin')}>🧹 Reinigungskräfte</a>
            <a className="active">📩 Reklamationen{messages.filter(m => m.status === 'new').length > 0 && ` (${messages.filter(m => m.status === 'new').length})`}</a>
          </div>
          <div className="admin-side-bottom">
            <a onClick={() => router.push('/')}>🌐 Website ansehen</a>
          </div>
        </div>

        <div className="admin-main">
          <p className="page-title">Reklamationen &amp; Kontaktanfragen</p>
          <p className="page-sub">Alle Nachrichten aus dem Kontaktformular der Website.</p>

          <div className="filter-row">
            {['all', 'new', 'read', 'resolved'].map(f => (
              <span key={f} className={`filter-chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                {f === 'all' ? 'Alle' : statusLabel(f)}
              </span>
            ))}
          </div>

          {loading && <p style={{color: 'var(--ink-soft)'}}>Wird geladen...</p>}

          {!loading && filtered.length === 0 && (
            <div className="empty-state">Keine Nachrichten gefunden.</div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="rekla-grid">

              <div className="msg-list">
                {filtered.map(m => (
                  <div key={m.id} className={`msg-row ${selectedId === m.id ? 'selected' : ''}`} onClick={() => selectMessage(m)}>
                    <span className={`status-dot ${m.status}`}></span>
                    <div className="msg-av">{initials(m.name)}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="nm">{m.name}</div>
                      <div className="snippet">{m.subject || m.message}</div>
                      <div className="dt">{new Date(m.createdAt).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                    </div>
                  </div>
                ))}
              </div>

              {selected && (
                <div>
                  <div className="card">
                    <div className="flex items-center justify-between mb-4">
                      <h3 style={{ marginBottom: 0 }}>Nachricht</h3>
                      {selected.accountInfo ? (
                        <span className={`account-badge ${selected.accountInfo.role}`}>
                          {selected.accountInfo.role === 'cleaner' ? '🧹 Reinigungskraft' : '👤 Kunde'} — registriert
                        </span>
                      ) : (
                        <span className="account-badge guest">Gast (kein Konto)</span>
                      )}
                    </div>
                    <div className="detail-row"><span className="k">Name</span><span className="v">{selected.name}</span></div>
                    <div className="detail-row"><span className="k">E-Mail</span><span className="v">{selected.email}</span></div>
                    <div className="detail-row"><span className="k">Telefon</span><span className="v">{selected.phone || '—'}</span></div>
                    <div className="detail-row"><span className="k">Betreff</span><span className="v">{selected.subject || '—'}</span></div>
                    <div className="detail-row"><span className="k">Gesendet am</span><span className="v">{new Date(selected.createdAt).toLocaleString('de-DE')}</span></div>
                    <div style={{ marginTop: '14px' }}>
                      <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-soft)', marginBottom: '8px' }}>Nachricht</p>
                      <div className="msg-body">{selected.message}</div>
                    </div>
                  </div>

                  <div className="card">
                    <h3>Konto-Information</h3>
                    {!selected.accountInfo && (
                      <p style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>
                        Diese E-Mail-Adresse ist keinem TANDEF-Konto zugeordnet — die Anfrage kommt von einem Gast oder Interessenten.
                      </p>
                    )}
                    {selected.accountInfo && (
                      <>
                        <div className="detail-row"><span className="k">Rolle</span><span className="v">{selected.accountInfo.role === 'cleaner' ? 'Reinigungskraft' : 'Kunde'}</span></div>
                        <div className="detail-row"><span className="k">Registriert seit</span><span className="v">{new Date(selected.accountInfo.createdAt).toLocaleDateString('de-DE')}</span></div>
                        <div className="detail-row"><span className="k">Telefon (Konto)</span><span className="v">{selected.accountInfo.phone || '—'}</span></div>

                        {selected.accountInfo.role === 'cleaner' && (
                          <>
                            <div className="detail-row"><span className="k">Konto-Status</span><span className="v">{selected.accountInfo.cleanerStatus}</span></div>
                            <div className="detail-row"><span className="k">Bewerbungsstatus</span><span className="v">{selected.accountInfo.applicationStatus || '—'}</span></div>
                            <div className="detail-row"><span className="k">Bewertung</span><span className="v">{selected.accountInfo.avgReviewRating ? `${selected.accountInfo.avgReviewRating} ★` : '—'}</span></div>
                            <div className="detail-row"><span className="k">Abgeschlossene Aufträge</span><span className="v">{selected.accountInfo.totalBookings}</span></div>
                          </>
                        )}
                        {selected.accountInfo.role === 'customer' && (
                          <div className="detail-row"><span className="k">Anzahl Buchungen</span><span className="v">{selected.accountInfo.totalBookings}</span></div>
                        )}

                        {selected.accountInfo.recentBookings && selected.accountInfo.recentBookings.length > 0 && (
                          <div style={{ marginTop: '14px' }}>
                            <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink-soft)', marginBottom: '6px' }}>Letzte Buchungen</p>
                            {selected.accountInfo.recentBookings.map(b => (
                              <div key={b.id} className="booking-mini">
                                <span>{b.serviceType} — {new Date(b.date).toLocaleDateString('de-DE')}</span>
                                <span style={{ fontWeight: 700 }}>{b.price} € · {b.status}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div className="card">
                    <h3>Status</h3>
                    <div className="action-row">
                      <button className="action-btn" onClick={() => updateStatus(selected.id, 'new')}>Als neu markieren</button>
                      <button className="action-btn" onClick={() => updateStatus(selected.id, 'read')}>Gelesen</button>
                      <button className="action-btn mint" onClick={() => updateStatus(selected.id, 'resolved')}>✓ Erledigt</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </>
  );
}