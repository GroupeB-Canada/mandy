'use client';
/**
 * DebugScreenshotWidget — GroupeB.ca
 * Compatible : Next.js 16 + React 19
 * Dépendances : aucune npm (html2canvas chargé via CDN au clic)
 *
 * Activation : NEXT_PUBLIC_DEBUG_ENABLED=true  OU  ?debug=1 dans l'URL
 * Usage      : <DebugScreenshotWidget siteId="monsite.groupeb.ca" />
 */

import { useState, useCallback, useEffect, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface DebugLog {
  id: string;
  ts: string;
  status: 'sending' | 'ok' | 'error';
  note: string;
  screenshotUrl?: string;
}

interface Props {
  /** Identifiant du site ex: "canagram.groupeb.ca" */
  siteId?: string;
  /** Position du bouton flottant */
  position?: 'bottom-left' | 'bottom-right';
}

// ─── Import dynamique html2canvas (bundlé npm, passe le CSP) ────────────────
type H2CFunc = (el: HTMLElement, opts?: Record<string, unknown>) => Promise<HTMLCanvasElement>;
let h2cCache: H2CFunc | null = null;

async function loadHtml2Canvas(): Promise<H2CFunc> {
  if (h2cCache) return h2cCache;
  const mod = await import('html2canvas');
  h2cCache = mod.default as H2CFunc;
  return h2cCache;
}

// ─── Composant principal ──────────────────────────────────────────────────────
export default function DebugScreenshotWidget({
  siteId = 'groupeb.ca',
  position = 'bottom-left',
}: Props) {
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [logs, setLogs] = useState<DebugLog[]>([]);
  const [showPanel, setShowPanel] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Activer si env var OU query param
  useEffect(() => {
    const envOn = process.env.NEXT_PUBLIC_DEBUG_ENABLED === 'true';
    const queryOn = new URLSearchParams(window.location.search).get('debug') === '1';
    setEnabled(envOn || queryOn);
  }, []);

  // Raccourci clavier Ctrl+Shift+D pour toggle
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setEnabled((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const capture = useCallback(async () => {
    if (status === 'sending') return;
    setStatus('sending');

    const entry: DebugLog = {
      id: crypto.randomUUID(),
      ts: new Date().toISOString(),
      status: 'sending',
      note: 'Capture en cours…',
    };

    try {
      // 1. Charger html2canvas + capturer le document entier
      const h2c = await loadHtml2Canvas();

      const canvas = await h2c(document.documentElement, {
        useCORS: true,
        scale: 1.5,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight,
      });

      const screenshotBase64 = canvas.toDataURL('image/png');

      // 2. Envoyer vers l'API route Next.js locale (pas besoin d'API Gateway)
      const res = await fetch('/api/debug/screenshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siteId,
          screenshotBase64,
          url: window.location.href,
          userAgent: navigator.userAgent,
          viewport: { w: window.innerWidth, h: window.innerHeight },
          timestamp: entry.ts,
          pageTitle: document.title,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
      const data: { debugId?: string; screenshotUrl?: string } = await res.json();

      entry.status = 'ok';
      entry.note = `✅ ID: ${data.debugId ?? '—'}`;
      entry.screenshotUrl = data.screenshotUrl;
      setStatus('ok');
    } catch (err) {
      entry.status = 'error';
      entry.note = err instanceof Error ? err.message : 'Erreur inconnue';
      setStatus('error');
    }

    setLogs((prev) => [entry, ...prev].slice(0, 30));
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setStatus('idle'), 3500);
  }, [status, siteId]);

  // Ne rien rendre si désactivé
  if (!enabled) return null;

  const posStyle =
    position === 'bottom-left'
      ? { left: '16px', bottom: '16px' }
      : { right: '16px', bottom: '16px' };

  const btnColors: Record<typeof status, string> = {
    idle: '#6366f1',
    sending: '#f59e0b',
    ok: '#10b981',
    error: '#ef4444',
  };

  const btnLabel: Record<typeof status, string> = {
    idle: '🐛',
    sending: '⏳',
    ok: '✅',
    error: '❌',
  };

  return (
    <>
      {/* ── Panneau de logs ── */}
      {showPanel && (
        <div
          style={{
            position: 'fixed',
            ...posStyle,
            bottom: '72px',
            width: '340px',
            maxHeight: '320px',
            overflowY: 'auto',
            background: '#0f172a',
            color: '#e2e8f0',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            zIndex: 999999,
            fontFamily: '"Fira Code", "Courier New", monospace',
            fontSize: '11px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 12px',
              background: '#1e293b',
              borderRadius: '12px 12px 0 0',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: '#94a3b8',
            }}
          >
            <span>🔍 DEBUG LOGS — {siteId}</span>
            <button
              onClick={() => setShowPanel(false)}
              style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '14px' }}
            >✕</button>
          </div>

          {logs.length === 0 ? (
            <p style={{ padding: '12px', color: '#475569', textAlign: 'center' }}>
              Aucune capture. Clique sur 🐛 pour commencer.
            </p>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                style={{
                  padding: '8px 12px',
                  borderBottom: '1px solid #1e293b',
                  borderLeft: `3px solid ${log.status === 'ok' ? '#10b981' : log.status === 'error' ? '#ef4444' : '#f59e0b'}`,
                }}
              >
                <div style={{ color: '#64748b', fontSize: '10px' }}>{log.ts}</div>
                <div style={{ color: '#cbd5e1', marginTop: '2px' }}>{log.note}</div>
                {log.screenshotUrl && (
                  <a
                    href={log.screenshotUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#38bdf8', fontSize: '10px' }}
                  >
                    🖼 Voir screenshot S3
                  </a>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* ── Boutons ── */}
      <div
        style={{
          position: 'fixed',
          ...posStyle,
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          zIndex: 999999,
          alignItems: position === 'bottom-left' ? 'flex-start' : 'flex-end',
        }}
      >
        {/* Badge nb logs */}
        {logs.length > 0 && (
          <button
            onClick={() => setShowPanel((v) => !v)}
            title="Voir les logs debug"
            style={{
              background: '#1e293b',
              color: '#94a3b8',
              border: '1px solid #334155',
              borderRadius: '8px',
              padding: '3px 8px',
              fontSize: '11px',
              cursor: 'pointer',
              fontFamily: 'monospace',
            }}
          >
            📋 {logs.length} log{logs.length > 1 ? 's' : ''}
          </button>
        )}

        {/* Bouton principal capture */}
        <button
          onClick={capture}
          disabled={status === 'sending'}
          title={`Debug Screenshot — ${siteId}\nCtrl+Shift+D pour masquer`}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.15)',
            background: btnColors[status],
            color: '#fff',
            fontSize: '20px',
            cursor: status === 'sending' ? 'not-allowed' : 'pointer',
            boxShadow: `0 4px 16px ${btnColors[status]}66`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.25s ease',
            opacity: status === 'sending' ? 0.7 : 1,
          }}
        >
          {btnLabel[status]}
        </button>
      </div>
    </>
  );
}
