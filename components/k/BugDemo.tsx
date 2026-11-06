'use client';
import { useState } from 'react';
import { DEMO } from '@/lib/k';
import s from './k.module.css';

type R = { ok: boolean; msg: string } | null;
type Row = { ref: R; before: R; after: R };

async function load(path: string) {
  return import(/* webpackIgnore: true */ path);
}

function run(fn: () => unknown): R {
  try {
    fn();
    return { ok: true, msg: 'Kabul etti' };
  } catch (e) {
    return { ok: false, msg: (e as Error).message };
  }
}

// Gerçek kütüphaneler tarayıcıda çalışır: acorn (referans), meriyah 7.4.0 (düzeltmeden önce), 7.4.1 (düzeltmeyle).
// Kod yalnızca ayrıştırılır, hiçbir zaman çalıştırılmaz.
export function BugDemo({ compact = false }: { compact?: boolean }) {
  const [code, setCode] = useState(DEMO.code);
  const [row, setRow] = useState<Row | null>(null);
  const [busy, setBusy] = useState(false);

  async function go(src = code) {
    setBusy(true);
    const [acorn, m0, m1] = await Promise.all([
      load('/demo/acorn-8.14.0.mjs'),
      load('/demo/meriyah-7.4.0.mjs'),
      load('/demo/meriyah-7.4.1.mjs'),
    ]);
    setRow({
      ref: run(() => acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'script' })),
      before: run(() => m0.parseScript(src)),
      after: run(() => m1.parseScript(src)),
    });
    setBusy(false);
  }

  const expectError = row ? !row.ref?.ok : null;
  const verdict = (r: R) => {
    if (!r || expectError === null) return '';
    const right = expectError ? !r.ok : r.ok;
    return right ? s.right : s.wrong;
  };

  return (
    <div className={`${s.demo} ${compact ? s.demoCompact : ''}`}>
      <div className={s.demoHead}>
        <span className={s.demoTag}>Canlı demo · gerçek kod, tarayıcınızda çalışır</span>
      </div>
      {!compact && <p className={s.demoRule}><b>Kural:</b> {DEMO.rule}</p>}
      <label className={s.demoLabel} htmlFor="demo-code">Denenecek JavaScript satırı</label>
      <div className={s.demoInput}>
        <input id="demo-code" value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} />
        <button onClick={() => go()} disabled={busy}>{busy ? 'Çalışıyor…' : 'Çalıştır ▶'}</button>
      </div>
      <div className={s.demoPresets}>
        <button onClick={() => { setCode(DEMO.code); go(DEMO.code); }}>Hatalı örnek</button>
        <button onClick={() => { setCode(DEMO.control); go(DEMO.control); }}>Geçerli örnek (kontrol)</button>
      </div>
      <div className={s.demoCols}>
        {[
          { k: 'ref', t: 'Referans: acorn', d: 'Başka bir parser; doğruyu buna göre kontrol ettim' },
          { k: 'before', t: 'meriyah 7.4.0', d: 'Benim düzeltmemden önce' },
          { k: 'after', t: 'meriyah 7.4.1', d: 'Benim düzeltmemle' },
        ].map((c) => {
          const r = row ? row[c.k as keyof Row] : null;
          return (
            <div key={c.k} className={`${s.demoCol} ${verdict(r)}`}>
              <p className={s.demoColT}>{c.t}</p>
              <p className={s.demoColD}>{c.d}</p>
              <p className={s.demoRes}>
                {r ? (r.ok ? '✓ Kabul etti' : '✕ Hata verdi') : '—'}
              </p>
              {r && !r.ok && <p className={s.demoMsg}>{r.msg}</p>}
            </div>
          );
        })}
      </div>
      {row && (
        <p className={s.demoSum}>
          {expectError
            ? row.before?.ok && !row.after?.ok
              ? 'Sonuç: Eski sürüm kurala aykırı kodu kabul ediyordu (yanlış). Düzeltmemle doğru şekilde hata veriyor.'
              : 'Üç program da aynı sonucu verdi.'
            : row.after?.ok
              ? 'Kontrol: Geçerli kod düzeltmeden sonra da çalışıyor; düzeltme başka bir şeyi bozmadı.'
              : 'Üç program farklı sonuç verdi.'}
        </p>
      )}
      <p className={s.demoLinks}>
        <a href={DEMO.pr} target="_blank" rel="noopener noreferrer">Kabul edilen kod önerisi (PR #671)</a> ·{' '}
        <a href={DEMO.release} target="_blank" rel="noopener noreferrer">Sürüm notu 7.4.1</a>
      </p>
    </div>
  );
}
