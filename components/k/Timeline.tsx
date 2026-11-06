'use client';
import { useState } from 'react';
import { BY_DATE, MILESTONES, STATS } from '@/lib/k';
import s from './k.module.css';

type Item =
  | { type: 'pr'; key: string; date: string; pr: (typeof BY_DATE)[number] }
  | { type: 'ms'; key: string; date: string; ms: (typeof MILESTONES)[number] };

const TODAY = new Date('2026-11-06T12:00:00Z');
function rel(iso: string) {
  const d = Math.round((+TODAY - +new Date(iso + 'T12:00:00Z')) / 864e5);
  if (d <= 0) return 'bugün';
  if (d === 1) return 'dün';
  if (d <= 30) return `${d} gün önce`;
  return '';
}

const FILTERS = [
  { k: 'all', t: 'Hepsi' },
  { k: 'oss', t: 'Açık kaynak katkıları' },
  { k: 'ms', t: 'Ödül, ürün, staj' },
] as const;

export function Timeline({ limit, showFilters = true }: { limit?: number; showFilters?: boolean }) {
  const [f, setF] = useState<(typeof FILTERS)[number]['k']>('all');
  const items: Item[] = [
    ...BY_DATE.map((pr) => ({ type: 'pr' as const, key: pr.id, date: pr.date, pr })),
    ...MILESTONES.map((ms) => ({ type: 'ms' as const, key: ms.id, date: ms.sortKey, ms })),
  ]
    .filter((x) => f === 'all' || (f === 'oss' ? x.type === 'pr' : x.type === 'ms'))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit);

  return (
    <div className={s.tl}>
      {showFilters && (
        <div className={s.tlFilters} role="tablist">
          {FILTERS.map((x) => (
            <button key={x.k} role="tab" aria-selected={f === x.k} className={f === x.k ? s.on : ''} onClick={() => setF(x.k)}>
              {x.t}
            </button>
          ))}
          <span className={s.tlNote}>Veri: GitHub · son güncelleme {STATS.updated}</span>
        </div>
      )}
      <ol className={s.tlList}>
        {items.map((it) =>
          it.type === 'pr' ? (
            <li key={it.key} className={s.tlItem}>
              <div className={s.tlWhen}>
                <b>{it.pr.dateTr}</b>
                {rel(it.pr.date) && <span>{rel(it.pr.date)}</span>}
              </div>
              <div className={s.tlDot} aria-hidden="true" />
              <div className={s.tlBody}>
                <p className={s.tlKicker}>
                  <span className={s.tlBadge}>Kod katkısı kabul edildi</span> {it.pr.name}
                </p>
                <p className={s.tlPlain}>{it.pr.plain}</p>
                <details className={s.tlMore}>
                  <summary>Projeyi ve kanıtı gör</summary>
                  <div className={s.repoCard}>
                    <p className={s.repoName}>{it.pr.repo}</p>
                    <p className={s.repoWhat}>{it.pr.what}</p>
                    <p className={s.repoStats}>
                      <span>★ {it.pr.stars} yıldız</span>
                      {it.pr.downloads && <span>⬇ {it.pr.downloads}</span>}
                      <span>Kabul eden: {it.pr.mergedByWho}</span>
                    </p>
                    <p className={s.repoTech}><code>{it.pr.title}</code></p>
                    <p className={s.repoTech}>
                      Kanıt: {it.pr.test}
                      {it.pr.reference ? ` · Doğruyu belirleyen referans: ${it.pr.reference}` : ''} · +{it.pr.plus}/−{it.pr.minus} satır
                    </p>
                    <a href={it.pr.url} target="_blank" rel="noopener noreferrer">GitHub’da aç →</a>
                  </div>
                </details>
              </div>
            </li>
          ) : (
            <li key={it.key} className={`${s.tlItem} ${s.tlMs}`}>
              <div className={s.tlWhen}><b>{it.ms.when}</b></div>
              <div className={`${s.tlDot} ${s.tlDotMs}`} aria-hidden="true" />
              <div className={s.tlBody}>
                <p className={s.tlKicker}><span className={`${s.tlBadge} ${s.tlBadgeMs}`}>{it.ms.tag}</span></p>
                <p className={s.tlTitle}>{it.ms.title}</p>
                <p className={s.tlPlain}>{it.ms.plain}</p>
                {it.ms.img && <img src={it.ms.img} alt="" className={s.tlImg} loading="lazy" />}
                {it.ms.link && <a href={it.ms.link} target="_blank" rel="noopener noreferrer">Bağlantı →</a>}
              </div>
            </li>
          ),
        )}
      </ol>
      {!showFilters && null}
      <p className={s.tlAll}>
        Bu listede seçilmiş {BY_DATE.length} katkı var; toplamı {STATS.prs}.{' '}
        <a href="https://github.com/pulls?q=is%3Apr+author%3Alprnmns+is%3Amerged+-user%3Alprnmns" target="_blank" rel="noopener noreferrer">Tümünü GitHub’da gör →</a>
      </p>
    </div>
  );
}
