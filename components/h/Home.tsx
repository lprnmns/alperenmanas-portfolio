'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { LINKS, TEXT, type Item, type Lang } from '@/lib/tl';
import type { Summary } from '@/lib/live';
import s from './h.module.css';

const GH = <svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>;
const LI = <svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#0A66C2" /><path fill="#fff" d="M7.1 9.5h2.6V18H7.1zM8.4 5.4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM11.3 9.5h2.5v1.2h.04c.35-.66 1.2-1.36 2.47-1.36 2.64 0 3.13 1.74 3.13 4V18h-2.6v-4.1c0-.98-.02-2.24-1.36-2.24-1.37 0-1.58 1.07-1.58 2.17V18h-2.6z" /></svg>;
const WA = <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2zm5.8 14.03c-.24.68-1.42 1.3-1.95 1.35-.5.05-.97.23-3.27-.68-2.77-1.09-4.52-3.93-4.66-4.11-.13-.18-1.11-1.48-1.11-2.82 0-1.34.7-2 .95-2.27.25-.27.54-.34.72-.34h.52c.17 0 .39-.06.61.47.23.54.77 1.88.84 2.02.07.13.11.29.02.47-.09.18-.13.29-.27.45-.13.16-.28.35-.4.47-.13.13-.27.28-.12.55.16.27.7 1.15 1.5 1.86 1.03.92 1.9 1.2 2.17 1.34.27.13.43.11.59-.07.16-.18.68-.79.86-1.06.18-.27.36-.23.61-.14.25.09 1.58.75 1.85.88.27.14.45.2.52.32.07.11.07.66-.17 1.33z" /></svg>;

type DemoRes = { ref: boolean; before: boolean; after: boolean } | null; // true = kabul etti

const fill = (t: string, v: Record<string, string | number>) => t.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ''));

// Sayı CSS ile sıfırdan sayarak yükselir (@property); ekran okuyucu gerçek sayıyı okur, JS beklenmez
function Count({ to }: { to: number }) {
  return (
    <>
      <span className={s.count} style={{ ['--to' as string]: to }} aria-hidden="true" />
      <span className={s.srOnly}>{to}</span>
    </>
  );
}
function withCounts(t: string, v: Record<string, number>) {
  return t.split(/(\{\w+\})/).map((part, i) => {
    const m = part.match(/^\{(\w+)\}$/);
    return m && typeof v[m[1]] === 'number' ? <Count key={i} to={v[m[1]]} /> : <span key={i}>{part}</span>;
  });
}

function fmtDate(iso: string, lang: Lang) {
  const d = new Date(iso + 'T12:00:00Z');
  return d.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export function Home({ lang, sum }: { lang: Lang; sum: Summary }) {
  const t = TEXT[lang];
  const [sel, setSel] = useState('');
  const [slide, setSlide] = useState(0);
  const [play, setPlay] = useState(0);
  const [demoCode, setDemoCode] = useState(t.demo.code);
  const [demo, setDemo] = useState<DemoRes>(null);
  const [busy, setBusy] = useState(false);

  const vars = {
    mj: sum.perRepo['mitsuhiko/minijinja'] ?? 17,
    mer: sum.perRepo['meriyah/meriyah'] ?? 23,
    total: sum.total,
    repos: sum.repos,
  };
  const items: Item[] = useMemo(
    () => t.items.map((it) => ({ ...it, facts: it.facts?.map((f) => ({ k: f.k, v: fill(f.v, vars) })) })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang, sum],
  );

  // ay grupları: canlı veriden; seçilmiş katkılar kendi ayının altında, kalanı "N katkı daha"
  const groups = useMemo(() => {
    const months = Object.keys(sum.months).sort().reverse();
    const earliest = months[months.length - 1];
    const out: { key: string; label: string; items: Item[]; more: number }[] = [];
    out.push({ key: 'next', label: '', items: items.filter((i) => i.group === 'next'), more: 0 });
    for (const m of months) {
      const [y, mm] = m.split('-');
      const its = items.filter((i) => i.month === m);
      const prs = its.filter((i) => i.isPr).length;
      const n = sum.months[m];
      const name = t.monthNames[Number(mm) - 1];
      out.push({ key: m, label: m === earliest && its.length === 0 ? fill(t.firstLabel, { m: name, y }) : fill(t.monthLabel, { m: name, y, n }), items: its, more: Math.max(0, n - prs) });
    }
    // aya düşmeyen (veride olmayan aydaki) seçilmiş öğeler kaybolmasın
    const placed = new Set(out.flatMap((g) => g.items.map((i) => i.id)));
    const orphan = items.filter((i) => i.month && !placed.has(i.id));
    if (orphan.length) out.push({ key: 'other', label: '', items: orphan, more: 0 });
    out.push({ key: '2025', label: '2025', items: items.filter((i) => i.group === '2025'), more: 0 });
    return out;
  }, [items, sum, t]);

  const cur = items.find((i) => i.id === sel) ?? null;
  const awards = [items.find((i) => i.id === 'teknofest')!, items.find((i) => i.id === 'monad')!];

  const pick = useCallback((id: string) => {
    setSel(id);
    setDemo(null);
    if (history.replaceState) history.replaceState(null, '', `#ev-${id}`);
  }, []);
  const back = useCallback(() => {
    setSel('');
    setDemo(null);
    if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
  }, []);

  // ödül slaytı: hiçbir olay seçili değilken 5 sn'de bir döner (CSS/hareket ayarından bağımsız)
  useEffect(() => {
    if (sel) return;
    const id = window.setTimeout(() => setSlide((x) => (x + 1) % 2), 5000);
    return () => window.clearTimeout(id);
  }, [slide, sel]);

  // #ev-... bağlantısıyla gelindiyse o kaydı aç; Esc ile ödüllere dön
  useEffect(() => {
    const h = location.hash.replace('#ev-', '');
    if (h && t.items.some((i) => i.id === h)) setSel(h);
    const k = (e: KeyboardEvent) => e.key === 'Escape' && back();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [back, t.items]);

  async function run(code = demoCode) {
    setBusy(true);
    const imp = (p: string) => import(/* webpackIgnore: true */ p);
    const [acorn, m0, m1] = await Promise.all([imp('/demo/acorn-8.14.0.mjs'), imp('/demo/meriyah-7.4.0.mjs'), imp('/demo/meriyah-7.4.1.mjs')]);
    const ok = (f: () => unknown) => { try { f(); return true; } catch { return false; } };
    setDemo({
      ref: ok(() => acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'script' })),
      before: ok(() => m0.parseScript(code)),
      after: ok(() => m1.parseScript(code)),
    });
    setBusy(false);
  }
  const verdict = (accepted: boolean, ref: boolean, role: 'ref' | 'before' | 'after') => {
    if (role === 'ref') return accepted ? t.demo.accepted : t.demo.rejected;
    if (accepted === ref) return accepted ? t.demo.accepted : t.demo.rightReject;
    return accepted ? t.demo.wrongAccept : `${t.demo.rejected}: ✕`;
  };

  const Detail = ({ it, phone }: { it: Item; phone?: boolean }) => (
    <>
      {!phone && <p className={s.pMeta}>{it.date} · {it.tag}</p>}
      {(it.panelImg ?? it.img) && <img src={it.panelImg ?? it.img} alt={it.alt ?? ''} className={phone ? s.phoneImg : s.selImg} />}
      {!phone && <h2 className={s.pTitle}>{it.title}</h2>}
      <p className={phone ? s.phoneDesc : s.pDesc}>{it.desc}</p>
      {it.demo && (
        <div className={s.demo}>
          <div className={s.demoRow}>
            <code>{demoCode}</code>
            <button type="button" onClick={() => run()} disabled={busy} className={s.runBtn}>{busy ? t.demo.running : t.demo.run}</button>
          </div>
          <div className={s.demoCols}>
            {([['ref', t.demo.ref], ['before', t.demo.before], ['after', t.demo.after]] as const).map(([k, label]) => (
              <div key={k}>
                <div className={s.dk}>{label}</div>
                <div className={`${s.dv} ${demo && k !== 'ref' ? (demo[k] === demo.ref ? s.good : s.bad) : ''}`}>
                  {demo ? verdict(demo[k], demo.ref, k) : '—'}
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className={s.demoSwitch}
            onClick={() => { const c = demoCode === t.demo.code ? t.demo.control : t.demo.code; setDemoCode(c); run(c); }}
          >
            {demoCode === t.demo.code ? t.demo.tryControl : t.demo.tryBug}
          </button>
        </div>
      )}
      {!!it.facts?.length && (
        <div className={phone ? s.phoneFacts : s.facts}>
          {it.facts.map((f) => (
            phone
              ? <p key={f.k}><span>{f.k}: </span><strong>{f.v}</strong></p>
              : <div key={f.k}><div className={s.fk}>{f.k}</div><div className={s.fv}>{f.v}</div></div>
          ))}
        </div>
      )}
      {!!it.bullets?.length && (phone
        ? it.bullets.map((b) => <p key={b} className={s.phoneBullet}>{b}</p>)
        : <ul className={s.bullets}>{it.bullets.map((b) => <li key={b}>{b}</li>)}</ul>)}
      {!phone && it.orig && <p className={s.orig}>{it.orig}</p>}
      {it.href && <p className={phone ? s.phoneLink : s.pLink}><a href={it.href} target={it.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{it.linkText}</a></p>}
    </>
  );

  return (
    <div className={s.root}>
      <header className={`${s.head} ${s.hPad}`}>
        <div className={s.max}>
          <div className={s.topRow}>
            <span>{t.top}</span>
            <nav className={s.nav}>
              <a href={LINKS.cv} target="_blank" rel="noopener noreferrer">{t.nav.cv}</a>
              <a href={LINKS.github} target="_blank" rel="noopener noreferrer">{t.nav.github}</a>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">{t.nav.linkedin}</a>
              <a href={LINKS.mail}>{t.nav.email}</a>
              <a href={t.lang.href} className={s.langLink} hrefLang={lang === 'tr' ? 'en' : 'tr'}>{t.lang.label}</a>
            </nav>
          </div>
          <h1 className={s.h1}>
            <button type="button" className={`${s.name} ${play ? s.play1 : s.play0}`} onClick={() => setPlay((p) => (p ? 0 : 1))} aria-label={t.nameAria}>
              ALPEREN MANAS
            </button>
          </h1>
          <div className={s.heroRow}>
            <div>
              <p className={s.seek}>{t.seek}</p>
              <p className={s.roles}>{t.roles}</p>
              <div className={s.btns}>
                <a className={`${s.btn} ${s.btnWhite}`} href={LINKS.cv} target="_blank" rel="noopener noreferrer">{t.btnCv}</a>
                <a className={`${s.btn} ${s.btnLine}`} href={LINKS.mail}>{t.btnMail}</a>
                <a className={`${s.btn} ${s.btnLine} ${s.btnIcon}`} href={LINKS.github} target="_blank" rel="noopener noreferrer">{GH}{t.btnGh}</a>
                <a className={`${s.btn} ${s.btnLine} ${s.btnIcon}`} href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">{LI}{t.btnLi}</a>
                <a className={`${s.btn} ${s.btnWa} ${s.btnIcon}`} href={`${LINKS.wa}?text=${encodeURIComponent(t.waText)}`} target="_blank" rel="noopener noreferrer">{WA}{t.btnWa}</a>
              </div>
            </div>
            <div className={s.paper}>
              <p className={s.paperBig}>
                {t.paperA}<mark className={s.pen}>{withCounts(t.paperMark, vars)}</mark>
              </p>
              <p className={s.paperSmall}>{t.paperB}</p>
            </div>
          </div>
          <div className={s.strip}>
            {t.strip.map((c) => (
              <a key={c.id} className={s.stripCell} href={`#ev-${c.id}`} onClick={() => pick(c.id)}>
                {c.img && <img src={c.img} alt="" className={s.stripImg} />}
                {c.rows ? (
                  <span className={s.expCell}>
                    <span className={s.stripT}>{c.t}</span>
                    {c.rows.map((r) => (
                      <span key={r.t} className={s.expRow}>
                        <img src={r.img} alt="" />
                        <span><b>{r.t}</b><em>{r.d}</em></span>
                      </span>
                    ))}
                  </span>
                ) : (
                  <span>
                    <span className={s.stripT}>{c.t}</span>
                    <span className={s.stripD}>{c.d}</span>
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </header>

      <main className={`${s.main} ${s.hPad}`}>
        <div className={s.max}>
          <div className={s.split}>
            <section aria-label={t.timelineAria}>
              <div className={s.tl}>
                {groups.map((g) => (
                  <div key={g.key}>
                    {g.label && (
                      <div className={`${s.grid3} ${s.gHead}`}>
                        <div className={s.dateTxt} style={{ visibility: 'hidden' }}>.</div><div />
                        <h2 className={s.gLabel}>{g.label}</h2>
                      </div>
                    )}
                    {g.items.map((it) => {
                      const on = it.id === sel;
                      return (
                        <div key={it.id} id={`ev-${it.id}`} className={s.anchor}>
                          <button type="button" className={`${s.row} ${on ? s.rowOn : ''}`} onClick={() => (on ? back() : pick(it.id))} aria-pressed={on}>
                            <span className={s.grid3}>
                              <span className={s.dateTxt}>{it.date}</span>
                              <span className={it.big ? s.sq : s.dot} />
                              <span className={s.rowBody}>
                                {it.big && it.img && <img src={it.img} alt="" className={s.rowImg} loading="lazy" />}
                                <span className={s.rowText}>
                                  <span className={s.dateIn}>{it.date}</span>
                                  <span className={s.tag}>{it.tag}</span>
                                  <span className={it.big ? s.titleBig : s.titleSmall}>{it.title}</span>
                                  {it.big && it.short && <span className={s.short}>{it.short}</span>}
                                </span>
                              </span>
                            </span>
                          </button>
                          {on && (
                            <div className={s.onlyPhone}>
                              <div className={s.phoneCard}><Detail it={it} phone /></div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    {g.more > 0 && (
                      <div className={`${s.grid3} ${s.moreRow}`}>
                        <div className={s.dateTxt} style={{ visibility: 'hidden' }}>.</div><div />
                        <div className={s.bars}>
                          {Array.from({ length: g.more }, (_, i) => <span key={i} className={s.barTick} style={{ animationDelay: `${Math.min(i * 12, 900)}ms` }} />)}
                          <span className={s.moreTxt}>{fill(t.more, { n: g.more })}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p className={s.seeAll}><a href={LINKS.allPrs} target="_blank" rel="noopener noreferrer">{fill(t.seeAll, { n: sum.total })}</a></p>
            </section>

            <aside className={s.panel} aria-label={t.panelAria} aria-live={cur ? 'polite' : 'off'}>
              {!cur ? (
                <>
                  <div className={s.slides}>
                    {awards.map((a, i) => (
                      <div key={a.id} className={`${s.slide} ${slide === i ? s.slideOn : ''}`} aria-hidden={slide !== i}>
                        <div className={s.slideImgWrap}><img className={s.slideImg} src={a.panelImg ?? a.img} alt={a.alt ?? ''} /></div>
                        <div className={s.slideText}>
                          <p className={s.pMeta}>{a.date} · {a.tag}</p>
                          <h2 className={s.pTitle}>{a.title}</h2>
                          <p className={s.pDesc}>{a.desc}</p>
                          <div className={s.facts}>
                            {a.facts?.map((f) => <div key={f.k}><div className={s.fk}>{f.k}</div><div className={s.fv}>{f.v}</div></div>)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={s.tabs}>
                    {t.tabs.map((label, i) => (
                      <button key={label} type="button" className={`${s.tab} ${slide === i ? s.tabOn : ''}`} onClick={() => setSlide(i)} aria-pressed={slide === i}>
                        {label}
                        <span className={s.track}><span key={slide === i ? `run-${slide}` : 'idle'} className={`${s.bar} ${slide === i ? s.barRun : ''}`} /></span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div key={cur.id} className={s.selIn}>
                  <Detail it={cur} />
                  <button type="button" onClick={back} className={s.backBtn}>{t.back}</button>
                </div>
              )}
            </aside>
          </div>

          <footer className={s.footer}>
            <a href={LINKS.mail} className={s.footMail}>{LINKS.email}</a>
            <span className={s.footNote}>{fill(t.footer, { date: fmtDate(sum.updated, lang) })}</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
