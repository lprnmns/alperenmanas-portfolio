'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IMG, LINKS, TEXT, type Item, type Lang } from '@/lib/tl';
import type { Summary } from '@/lib/live';
import s from './h.module.css';

type DemoRes = { ref: boolean; before: boolean; after: boolean } | null; // true = kabul etti

const fill = (t: string, v: Record<string, string | number>) => t.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ''));

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
      {it.img && <img src={it.img} alt={it.alt ?? ''} className={phone ? s.phoneImg : s.selImg} />}
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
              </div>
            </div>
            <div className={s.paper}>
              <p className={s.paperBig}>
                {t.paperA}<mark className={s.pen}>{fill(t.paperMark, vars)}</mark>
              </p>
              <p className={s.paperSmall}>{t.paperB}</p>
            </div>
          </div>
          <div className={s.strip}>
            {t.strip.map((c) => (
              <a key={c.id} className={s.stripCell} href={`#ev-${c.id}`} onClick={() => pick(c.id)}>
                {c.img && <img src={c.img} alt="" className={s.stripImg} />}
                {c.dual && (
                  <span className={s.dual}>
                    <img src={IMG.bgts} alt="BGTS logosu" />
                    <img src={IMG.ptt} alt="PTT logosu" />
                  </span>
                )}
                <span>
                  <span className={s.stripT}>{c.t}</span>
                  <span className={s.stripD}>{c.d}</span>
                </span>
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
                        <div className={s.slideImgWrap}><img className={s.slideImg} src={a.img} alt={a.alt ?? ''} /></div>
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
                        <span className={s.track}><span className={`${s.bar} ${slide === i ? s.barRun : ''}`} onAnimationEnd={() => setSlide((x) => (x ? 0 : 1))} /></span>
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
