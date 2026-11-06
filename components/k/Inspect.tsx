'use client';
import { useEffect, useState } from 'react';
import s from './k.module.css';

export type Inspection = {
  id: string;
  repo: string;
  stars: string;
  plain: string;
  problem: string;
  evidence: string;
  fix: string;
  test: string;
  ai?: string;
  url: string;
  mergedByWho: string;
};

// "Düzeltmeyi incele": sağdan açılan panel. Önce sade özet, sonra teknik ayrıntı.
export function InspectList({ items }: { items: Inspection[] }) {
  const [open, setOpen] = useState<Inspection | null>(null);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, []);
  return (
    <>
      <div className={s.inspGrid}>
        {items.map((x) => (
          <article key={x.id} className={s.inspCard}>
            <p className={s.inspRepo}>{x.repo} <span>★ {x.stars}</span></p>
            <p className={s.inspPlain}>{x.plain}</p>
            <p className={s.inspBy}>Kabul eden: {x.mergedByWho}</p>
            <button onClick={() => setOpen(x)}>Düzeltmeyi incele →</button>
          </article>
        ))}
      </div>
      {open && (
        <div className={s.drawerBg} onClick={() => setOpen(null)}>
          <aside className={s.drawer} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={`${open.repo} düzeltmesi`}>
            <button className={s.drawerX} onClick={() => setOpen(null)} aria-label="Kapat">×</button>
            <p className={s.inspRepo}>{open.repo} <span>★ {open.stars}</span></p>
            <p className={s.drawerPlain}>{open.plain}</p>
            <dl className={s.drawerDl}>
              <div><dt>Sorun</dt><dd>{open.problem}</dd></div>
              <div><dt>Kanıt</dt><dd>{open.evidence}</dd></div>
              <div><dt>Düzeltme</dt><dd>{open.fix}</dd></div>
              <div><dt>Regresyon testi</dt><dd>{open.test}</dd></div>
              {open.ai && <div><dt>AI kullanımı</dt><dd>{open.ai}</dd></div>}
              <div><dt>Kaynak</dt><dd><a href={open.url} target="_blank" rel="noopener noreferrer">{open.url.replace('https://github.com/', '')}</a> · kabul eden: {open.mergedByWho}</dd></div>
            </dl>
          </aside>
        </div>
      )}
    </>
  );
}
