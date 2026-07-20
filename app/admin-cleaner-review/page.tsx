// @ts-nocheck
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AdminStyles from '../AdminStyles';

const DOC_TYPES = [
  { key: 'id', label: 'Personalausweis oder Reisepass' },
  { key: 'address', label: 'Adressnachweis' },
  { key: 'criminal', label: 'Führungszeugnis' },
];

function initials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function maskIban(iban) {
  if (!iban || iban.length < 8) return iban;
  const clean = iban.replace(/\s/g, '');
  return clean.slice(0, 8) + ' **** **** ' + clean.slice(-4);
}

function ReviewInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const appId = searchParams.get('id');

  const [app, setApp] = useState(null);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [docBusy, setDocBusy] = useState(null);

  useEffect(() => {
    document.title = "Antrag prüfen — TANDEF Admin";
    loadApp();
  }, [appId]);

  function loadApp() {
    fetch('/api/cleaner-applications')
      .then(r => r.json())
      .then(list => {
        const found = Array.isArray(list) ? list.find(a => String(a.id) === appId) : null;
        setApp(found || null);
        if (found && found.rejectionNote) setNote(found.rejectionNote);
      });
  }

  async function decide(status) {
    if (!app) return;
    setLoading(true);
    await fetch('/api/cleaner-applications', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: app.id, status, rejectionNote: status === 'rejected' ? note : null }),
    });
    setLoading(false);
    router.push('/admin');
  }

  async function decideDoc(docType, status) {
    if (!app) return;
    setDocBusy(docType);
    const res = await fetch('/api/admin/cleaner-applications/document', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ applicationId: app.id, docType, status }),
    });
    const data = await res.json();
    setDocBusy(null);
    if (res.ok) {
      setApp(prev => ({ ...prev, documents: JSON.stringify(data.documents) }));
    }
  }

  const documents = app && app.documents ? JSON.parse(app.documents) : {};

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
        .admin-main{padding:30px 36px 80px; max-width:980px;}
        .breadcrumb{font-size:12.5px; color:var(--ink-soft); margin-bottom:10px;}
        .breadcrumb a{color:var(--violet-700); font-weight:700; cursor:pointer;}
        .review-grid{display:grid; grid-template-columns:1.1fr .9fr; gap:26px; align-items:start; margin-top:24px;}
        .card{background:#fff; border:1px solid var(--line); border-radius:16px; padding:24px; margin-bottom:20px;}
        .card h3{font-size:14.5px; font-weight:800; color:var(--violet-900); margin-bottom:16px; font-family:'Space Grotesk',sans-serif;}
        .applicant-row{display:flex; align-items:center; gap:14px; margin-bottom:18px;}
        .applicant-av{width:54px; height:54px; border-radius:14px; background:linear-gradient(135deg,var(--violet-300),var(--violet-500)); flex-shrink:0; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:800;}
        .applicant-row .nm{font-weight:800; font-size:16px;}
        .applicant-row .sub{font-size:12.5px; color:var(--ink-soft); margin-top:2px;}
        .detail-row{display:flex; justify-content:space-between; padding:9px 0; border-bottom:1px solid var(--line); font-size:13px;}
        .detail-row:last-child{border-bottom:none;}
        .detail-row .k{color:var(--ink-soft); font-weight:600;}
        .detail-row .v{font-weight:700; color:var(--ink); text-align:right;}
        .doc-item{border:1.5px solid var(--line); border-radius:14px; padding:16px; margin-bottom:12px;}
        .doc-item-top{display:flex; align-items:center; gap:10px;}
        .doc-item-top .ic{width:34px; height:34px; border-radius:10px; background:var(--lavender-50); color:var(--violet-700); display:flex; align-items:center; justify-content:center; flex-shrink:0;}
        .doc-item-top h5{font-size:13.5px; font-weight:800;}
        .doc-item-top a{font-size:12px; font-weight:700; color:var(--violet-700);}
        .doc-pill{font-size:11px; font-weight:800; padding:4px 10px; border-radius:100px; flex-shrink:0;}
        .doc-pill.approved{background:var(--mint-100); color:#0F8F65;}
        .doc-pill.rejected{background:#FBE7E7; color:#C0392B;}
        .doc-actions{display:flex; gap:6px; flex-shrink:0;}
        .doc-btn{width:32px; height:32px; border-radius:8px; border:none; cursor:pointer; font-weight:800; font-size:14px;}
        .doc-btn.approve{background:var(--mint-100); color:#0F8F65;}
        .doc-btn.approve:hover{background:#0F8F65; color:#fff;}
        .doc-btn.reject{background:#FBE7E7; color:#C0392B;}
        .doc-btn.reject:hover{background:#C0392B; color:#fff;}
        .decision-card{background:#fff; border:1px solid var(--line); border-radius:16px; padding:24px; position:sticky; top:30px;}
        .decision-card h3{font-size:14.5px; font-weight:800; color:var(--violet-900); margin-bottom:14px; font-family:'Space Grotesk',sans-serif;}
        .field{margin-bottom:14px;}
        .field label{display:block; font-size:12px; font-weight:700; margin-bottom:6px;}
        .field textarea{width:100%; min-height:70px; padding:10px 12px; border-radius:9px; border:1.5px solid var(--line); font-family:inherit; font-size:13px; resize:vertical;}
        .approve-btn{width:100%; padding:13px; border-radius:10px; background:var(--mint-500); color:#fff; font-weight:700; font-size:14px; border:none; cursor:pointer; margin-bottom:10px;}
        .reject-btn{width:100%; padding:13px; border-radius:10px; background:#fff; color:#C0392B; font-weight:700; font-size:14px; border:1.5px solid #E9A3A3; cursor:pointer;}
        .status-banner{background:#FFF3E0; border:1px solid #F5D9A8; border-radius:12px; padding:12px 14px; font-size:12.5px; color:#8A5B00; margin-bottom:20px;}
      `}</style>

      <div className="admin-shell">
        <div className="admin-side">
          <div className="admin-brand">
            <svg viewBox="0 0 100 100"><path fill="#A895F0" d="M50 5 C60 25 60 45 50 55 C40 45 40 25 50 5Z" /><path fill="#fff" d="M50 55 C35 50 20 38 15 22 C35 20 48 32 50 55Z" /><path fill="#A895F0" d="M50 55 C65 50 80 38 85 22 C65 20 52 32 50 55Z" /></svg>
            TANDEF
          </div>
          <div className="admin-role">Admin-Panel</div>
          <div className="admin-nav">
            <a onClick={() => router.push('/admin')} className="active">🧹 Reinigungskräfte</a>
          </div>
          <div className="admin-side-bottom">
            <a onClick={() => router.push('/')}>🌐 Website ansehen</a>
          </div>
        </div>

        <div className="admin-main">
          <div className="breadcrumb"><a onClick={() => router.push('/admin')}>Reinigungskräfte</a> / Antrag prüfen</div>

          {!app && <p style={{color: 'var(--ink-soft)'}}>Antrag wird geladen oder wurde nicht gefunden.</p>}

          {app && (
            <>
              {app.status === 'pending' && (
                <div className="status-banner">⏳ Dieses Konto ist inaktiv, bis du es unten freischaltest.</div>
              )}
              {app.status === 'rejected' && (
                <div className="status-banner" style={{background: '#FBE7E7', borderColor: '#E9A3A3', color: '#C0392B'}}>
                  ❌ Dieser Antrag wurde bereits abgelehnt.
                </div>
              )}
              {app.status === 'approved' && (
                <div className="status-banner" style={{background: 'var(--mint-100)', borderColor: 'var(--mint-500)', color: '#0F8F65'}}>
                  ✓ Dieser Antrag wurde bereits freigeschaltet.
                </div>
              )}

              <div className="review-grid">
                <div>
                  <div className="card">
                    <div className="applicant-row">
                      <div className="applicant-av">{initials(app.cleaner && app.cleaner.user ? app.cleaner.user.name : '?')}</div>
                      <div>
                        <div className="nm">{app.cleaner && app.cleaner.user ? app.cleaner.user.name : ''}</div>
                        <div className="sub">
                          {app.cleaner && app.cleaner.user ? app.cleaner.user.email : ''} · Beworben am {new Date(app.submittedAt).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                    <div className="detail-row"><span className="k">Telefon</span><span className="v">{app.phone || '—'}</span></div>
                    <div className="detail-row"><span className="k">Stadt / Einsatzgebiet</span><span className="v">{app.city || '—'}</span></div>
                    <div className="detail-row"><span className="k">Erfahrung</span><span className="v">{app.experience || '—'}</span></div>
                    <div className="detail-row"><span className="k">IBAN</span><span className="v display">{app.iban ? maskIban(app.iban) : '—'}</span></div>
                    <div className="detail-row"><span className="k">Kontoinhaber</span><span className="v">{app.accountHolder || '—'}</span></div>
                  </div>

                  <div className="card">
                    <h3>Hochgeladene Dokumente</h3>
                    {DOC_TYPES.map(({ key, label }) => {
                      const doc = documents[key];
                      return (
                        <div key={key} className="doc-item">
                          <div className="doc-item-top">
                            <div className="ic">📄</div>
                            <div style={{ flex: 1 }}>
                              <h5>{label}</h5>
                              {doc ? (
                                <a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.name}</a>
                              ) : (
                                <span style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>Nicht hochgeladen</span>
                              )}
                            </div>
                            {doc && doc.status === 'approved' && <span className="doc-pill approved">✓ Akzeptiert</span>}
                            {doc && doc.status === 'rejected' && <span className="doc-pill rejected">✗ Abgelehnt</span>}
                            {doc && doc.status === 'pending' && (
                              <div className="doc-actions">
                                <button className="doc-btn approve" onClick={() => decideDoc(key, 'approved')} disabled={docBusy === key}>✓</button>
                                <button className="doc-btn reject" onClick={() => decideDoc(key, 'rejected')} disabled={docBusy === key}>✗</button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="decision-card">
                  <h3>Freischaltungsentscheidung</h3>
                  <div className="field">
                    <label>Interner Vermerk / Ablehnungsgrund</label>
                    <textarea
                      placeholder="z. B. Dokumente unleserlich, bitte erneut hochladen."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                  <button className="approve-btn" onClick={() => decide('approved')} disabled={loading}>
                    {loading ? '...' : '✓ Konto freischalten'}
                  </button>
                  <button className="reject-btn" onClick={() => decide('rejected')} disabled={loading}>
                    {loading ? '...' : 'Antrag ablehnen'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default function AdminCleanerReviewPage() {
  return (
    <Suspense fallback={null}>
      <ReviewInner />
    </Suspense>
  );
}