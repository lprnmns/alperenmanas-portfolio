'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IMG, LINKS, TEXT, type Item, type Lang } from '@/lib/tl';
import type { Summary } from '@/lib/live';
import s from './h.module.css';

const GH = <svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>;
const LI = <svg viewBox="0 0 24 24" aria-hidden="true"><rect width="24" height="24" rx="4" fill="#0A66C2" /><path fill="#fff" d="M7.1 9.5h2.6V18H7.1zM8.4 5.4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM11.3 9.5h2.5v1.2h.04c.35-.66 1.2-1.36 2.47-1.36 2.64 0 3.13 1.74 3.13 4V18h-2.6v-4.1c0-.98-.02-2.24-1.36-2.24-1.37 0-1.58 1.07-1.58 2.17V18h-2.6z" /></svg>;
const WA = <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2zm5.8 14.03c-.24.68-1.42 1.3-1.95 1.35-.5.05-.97.23-3.27-.68-2.77-1.09-4.52-3.93-4.66-4.11-.13-.18-1.11-1.48-1.11-2.82 0-1.34.7-2 .95-2.27.25-.27.54-.34.72-.34h.52c.17 0 .39-.06.61.47.23.54.77 1.88.84 2.02.07.13.11.29.02.47-.09.18-.13.29-.27.45-.13.16-.28.35-.4.47-.13.13-.27.28-.12.55.16.27.7 1.15 1.5 1.86 1.03.92 1.9 1.2 2.17 1.34.27.13.43.11.59-.07.16-.18.68-.79.86-1.06.18-.27.36-.23.61-.14.25.09 1.58.75 1.85.88.27.14.45.2.52.32.07.11.07.66-.17 1.33z" /></svg>;

type DemoRes = { ref: boolean; before: boolean; after: boolean } | null; // true = kabul etti

const fill = (t: string, v: Record<string, string | number>) => t.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ''));

// Sayılar ilk kareden itibaren gerçek değerini gösterir (sayaç animasyonu ara değerlerde yanlış okunuyordu)
function Count({ to }: { to: number }) {
  return <span className={s.num}>{to}</span>;
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
  const [showAll, setShowAll] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLElement>(null);

  // Sayfa açılınca GitHub'dan güncel toplamı çek (repo sayısı sunucudan gelir); yeni katkılar bu aya eklenir
  const [liveTotal, setLiveTotal] = useState<number | null>(null);
  useEffect(() => {
    const q = encodeURIComponent('author:lprnmns is:pr is:merged -user:lprnmns');
    fetch(`https://api.github.com/search/issues?q=${q}&per_page=1`, { headers: { Accept: 'application/vnd.github+json' } })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => { if (j && typeof j.total_count === 'number' && j.total_count >= sum.total) setLiveTotal(j.total_count); })
      .catch(() => {});
  }, [sum.total]);
  const months = useMemo(() => {
    const m = { ...sum.months };
    if (liveTotal && liveTotal > sum.total) {
      const k = new Date().toISOString().slice(0, 7);
      m[k] = (m[k] ?? 0) + (liveTotal - sum.total);
    }
    return m;
  }, [sum, liveTotal]);

  // İsim animasyonu, fotoğraf dokusu yüklenmeden başlamaz (yavaş bağlantıda isim görünmez kalmasın)
  const [nameReady, setNameReady] = useState(false);
  useEffect(() => {
    const im = new Image();
    im.onload = () => setNameReady(true);
    im.src = '/img/name-sprite.webp';
    if (im.complete) setNameReady(true);
  }, []);
  const nameCls = nameReady ? (play ? s.play1 : s.play0) : '';

  const vars = {
    mj: sum.perRepo['mitsuhiko/minijinja'] ?? 17,
    mer: sum.perRepo['meriyah/meriyah'] ?? 23,
    total: liveTotal ?? sum.total,
    repos: sum.repos,
  };
  const items: Item[] = useMemo(
    () => t.items.map((it) => ({ ...it, facts: it.facts?.map((f) => ({ k: f.k, v: fill(f.v, vars) })) })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang, sum],
  );

  // ay grupları: canlı veriden; seçilmiş katkılar kendi ayının altında, kalanı "N katkı daha"
  const groups = useMemo(() => {
    const monthKeys = Object.keys(months).sort().reverse();
    const earliest = monthKeys[monthKeys.length - 1];
    const out: { key: string; label: string; items: Item[]; more: number }[] = [];
    out.push({ key: 'next', label: '', items: items.filter((i) => i.group === 'next'), more: 0 });
    for (const m of monthKeys) {
      const [y, mm] = m.split('-');
      const its = items.filter((i) => i.month === m);
      const prs = its.filter((i) => i.isPr).length;
      const n = months[m];
      const name = t.monthNames[Number(mm) - 1];
      out.push({ key: m, label: m === earliest && its.length === 0 ? fill(t.firstLabel, { m: name, y }) : fill(t.monthLabel, { m: name, y, n }), items: its, more: Math.max(0, n - prs) });
    }
    // aya düşmeyen (veride olmayan aydaki) seçilmiş öğeler kaybolmasın
    const placed = new Set(out.flatMap((g) => g.items.map((i) => i.id)));
    const orphan = items.filter((i) => i.month && !placed.has(i.id));
    if (orphan.length) out.push({ key: 'other', label: '', items: orphan, more: 0 });
    out.push({ key: '2025', label: '2025', items: items.filter((i) => i.group === '2025'), more: 0 });
    return out;
  }, [items, months, t]);

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

  // telefonda detay penceresi: arka sayfa kaymaz, odak pencereye geçer, kapanınca açan öğeye döner
  useEffect(() => {
    if (!sel || !window.matchMedia('(max-width: 720px)').matches) return;
    const opener = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.body.style.overflow = prev; opener?.focus?.(); };
  }, [sel]);
  const trapTab = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !sheetRef.current) return;
    const f = sheetRef.current.querySelectorAll<HTMLElement>('button, a[href]');
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  // #ev-... bağlantısıyla gelindiyse o kaydı aç; Esc ile ödüllere dön
  useEffect(() => {
    const h = location.hash.replace('#ev-', '');
    if (h && t.items.some((i) => i.id === h)) setSel(h);
    const k = (e: KeyboardEvent) => e.key === 'Escape' && back();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [back, t.items]);

  const [demoErr, setDemoErr] = useState(false);
  async function run(code = demoCode) {
    setBusy(true);
    setDemoErr(false);
    try {
    const imp = (p: string) => import(/* webpackIgnore: true */ p);
    const [acorn, m0, m1] = await Promise.all([imp('/demo/acorn-8.14.0.mjs'), imp('/demo/meriyah-7.4.0.mjs'), imp('/demo/meriyah-7.4.1.mjs')]);
    const ok = (f: () => unknown) => { try { f(); return true; } catch { return false; } };
    setDemo({
      ref: ok(() => acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'script' })),
      before: ok(() => m0.parseScript(code)),
      after: ok(() => m1.parseScript(code)),
    });
    } catch {
      setDemo(null);
      setDemoErr(true);
    } finally {
      setBusy(false);
    }
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
          {demoErr && <p className={s.demoErr}>{lang === 'tr' ? 'Demo yüklenemedi. Bağlantınızı kontrol edip tekrar deneyin.' : 'The demo could not load. Check your connection and try again.'}</p>}
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
      {!!it.how?.length && (
        <div className={s.how}>
          <p className={s.howT}>{t.howT}</p>
          <dl>
            {it.how.map((h) => <div key={h.k}><dt>{h.k}</dt><dd>{h.v}</dd></div>)}
          </dl>
        </div>
      )}
      {!phone && it.orig && <p className={s.orig}>{it.orig}</p>}
      {it.href && <p className={phone ? s.phoneLink : s.pLink}><a href={it.href} target={it.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{it.linkText}</a></p>}
    </>
  );

  return (
    <div className={s.root}>
      {/* ===== TELEFON DÜZENİ (≤720px) ===== */}
      <div className={s.mob}>
        <section className={s.mHead}>
          <p className={s.mTop}>{t.m.top}</p>
          <h1 className={s.h1}>
            <button type="button" className={`${s.name} ${s.mName} ${nameCls}`} onClick={() => setPlay((p) => (p ? 0 : 1))} aria-label={t.nameAria}>
              ALPEREN MANAS
            </button>
          </h1>
          <p className={s.mSeek}>{t.seek}</p>
          <p className={s.mSeekSub}>{t.seekSub} {t.roles.split(' · ').slice(-1)[0]}.</p>
          <p className={s.mChips}>
            {t.roles.split(' · ').slice(0, -1).map((r) => <span key={r} className={s.mChip}>{r}</span>)}
          </p>
          <div className={s.mPaper}>
            <p className={s.mPaperBig}>{t.paperA}<mark className={s.pen}>{withCounts(t.paperMark, vars)}</mark></p>
          </div>
          <div className={s.mAward}>
            {t.m.cards.slice(0, 2).map((c, i) => {
              const it = items.find((x) => x.id === c.id);
              return (
                <button key={c.id} type="button" className={`${s.mAwardSlide} ${slide === i ? s.mAwardOn : ''}`} onClick={() => pick(c.id)} aria-hidden={slide !== i} tabIndex={slide === i ? 0 : -1}>
                  <span className={s.mAwardImgWrap}>
                    <img src={it?.panelImg ?? it?.img} alt={it?.alt ?? ''} className={s.mAwardImg} />
                    <span className={s.mAwardBadge}>{c.tag}</span>
                  </span>
                  <span className={s.mAwardBody}>
                    <span className={s.mAwardT}>{c.t}</span>
                    <span className={s.mAwardD}>{c.d}</span>
                  </span>
                </button>
              );
            })}
            <div className={s.mAwardTabs}>
              {t.m.cards.slice(0, 2).map((c, i) => (
                <button key={c.id} type="button" onClick={() => setSlide(i)} aria-label={c.t} aria-pressed={slide === i}>
                  <span className={s.track}><span key={slide === i ? `m-${slide}` : 'idle'} className={`${s.bar} ${slide === i ? s.barRun : ''}`} /></span>
                </button>
              ))}
            </div>
          </div>
          <div className={s.mGrid}>
            {t.m.cards.slice(2).map((c) => {
              const it = items.find((x) => x.id === c.id);
              return (
                <button key={c.id} type="button" className={s.mCell} onClick={() => pick(c.id)}>
                  {c.logo ? (
                    <span className={s.mCellLogo}><img src={c.logo === 'bgts' ? IMG.bgts : IMG.ptt} alt="" /></span>
                  ) : (
                    <img src={it?.img} alt="" className={s.mCellImg} loading="lazy" />
                  )}
                  <span className={s.mCellBody}>
                    <span className={s.mCellTag}>{c.tag}</span>
                    <span className={s.mCellT}>{c.t}</span>
                    <span className={s.mCellD}>{c.d}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className={s.mSec}>
          <h2 className={s.mLabel}>{t.m.oss}</h2>
          <div className={s.mStats}>
            {t.m.stats.map((st) => (
              <div key={st.l}><b>{fill(st.v, vars)}</b><span>{st.l}</span>{st.s && <em>{st.s}</em>}</div>
            ))}
          </div>
          <div className={s.mBars}>
            {(() => {
              const ms = Object.keys(months).sort().reverse();
              const max = Math.max(...ms.map((m) => months[m]));
              return ms.map((m) => {
                const [y, mm] = m.split('-');
                return (
                  <div key={m} className={s.mBar}>
                    <span>{t.m.monthShort[Number(mm) - 1]} {y}</span>
                    <span className={s.mBarTrack}><i style={{ width: `${Math.max(4, (months[m] / max) * 100)}%` }} /></span>
                    <b>{months[m]}</b>
                  </div>
                );
              });
            })()}
          </div>
        </section>

        <section className={s.mSec}>
          <h2 className={s.mLabel}>{t.m.fixes}</h2>
          {(() => {
            const prs = items.filter((i) => i.isPr);
            const order = ['mer671', ...prs.map((p) => p.id).filter((id) => id !== 'mer671')];
            const list = order.map((id) => prs.find((p) => p.id === id)!).filter(Boolean);
            const shown = showAll ? list : list.slice(0, 3);
            return (
              <>
                {shown.map((it) => (
                  <button key={it.id} type="button" className={s.mFix} onClick={() => pick(it.id)}>
                    <span>
                      <span className={s.mFixTag}>
                        {it.date} · {it.tag.split(' · ')[0]}
                        {it.demo && <em>{t.m.demoBadge}</em>}
                      </span>
                      <span className={s.mFixT}>{it.title}</span>
                      {it.by && <span className={s.mFixBy}>{t.m.testTag} · {t.m.byLabel}: {it.by}</span>}
                    </span>
                    <span className={s.mChev} aria-hidden="true">›</span>
                  </button>
                ))}
                {!showAll && list.length > 3 && (
                  <button type="button" className={s.mMore} onClick={() => setShowAll(true)}>{fill(t.m.showMore, { n: list.length - 3 })}</button>
                )}
                <p className={s.mAll}><a href={LINKS.allPrs} target="_blank" rel="noopener noreferrer">{fill(t.seeAll, { n: vars.total })}</a></p>
              </>
            );
          })()}
        </section>

        <section className={s.mSec}>
          <h2 className={s.mLabel}>{t.m.exp}</h2>
          {['bgts', 'ptt', 'sic'].map((id) => {
            const it = items.find((i) => i.id === id)!;
            return (
              <button key={id} type="button" className={s.mExp} onClick={() => pick(id)}>
                {id === 'sic' ? <span className={s.mSq}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true"><path d="M2 9.5 12 5l10 4.5-10 4.5L2 9.5z" /><path d="M6 11.5V16c0 1.2 2.7 2.5 6 2.5s6-1.3 6-2.5v-4.5" /><path d="M21 10v5" /></svg></span> : <img src={id === 'bgts' ? IMG.bgts : IMG.ptt} alt="" />}
                <span>
                  <span className={s.mExpT}>{it.title}</span>
                  <span className={s.mExpW}>{it.date} · {it.tag.replace(/^(Staj|Internship|Eğitim|Education) · /, '')}</span>
                  {it.short && <span className={s.mExpD}>{it.short}</span>}
                </span>
              </button>
            );
          })}
        </section>

        <section className={s.mCta}>
          <p className={s.mCtaT}>{t.cta.title}</p>
          <p className={s.mCtaD}>{t.cta.text}</p>
          <p className={s.mCtaBtns}>
            <a className={s.ctaCv} href={LINKS.cv} target="_blank" rel="noopener noreferrer">{t.btnCv}</a>
            <a className={s.ctaMail} href={LINKS.mail}>{t.cta.mail}</a>
            <a className={s.ctaWa} href={`${LINKS.wa}?text=${encodeURIComponent(t.waText)}`} target="_blank" rel="noopener noreferrer">{WA}WhatsApp</a>
          </p>
        </section>

        <footer className={s.mFoot}>
          <a href={LINKS.mail}>{LINKS.email}</a>
          <span>{fill(t.footer, { date: fmtDate(sum.updated, lang) })}</span>
          <a href={t.lang.href} className={s.mLang}>{lang === 'tr' ? 'English' : 'Türkçe'}</a>
        </footer>

        <nav className={s.mBar2} aria-label={t.m.contact}>
          <a className={s.mCv} href={LINKS.cv} target="_blank" rel="noopener noreferrer">{t.btnCv}</a>
          <a className={s.mIco} href={LINKS.mail} aria-label={t.nav.email}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 6.5 12 13l8.5-6.5" /></svg>
          </a>
          <a className={s.mWaIco} href={`${LINKS.wa}?text=${encodeURIComponent(t.waText)}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">{WA}</a>
          <a className={s.mIco} href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">{GH}</a>
          <a className={s.mIco} href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">{LI}</a>
        </nav>

        {cur && (
          <div className={s.mSheetBg} onClick={back}>
            <section ref={sheetRef} className={s.mSheet} role="dialog" aria-modal="true" aria-label={cur.title} onClick={(e) => e.stopPropagation()} onKeyDown={trapTab}>
              <span className={s.mGrip} aria-hidden="true" />
              <button ref={closeRef} type="button" className={s.mClose} onClick={back} aria-label={t.m.close}>×</button>
              <div className={s.mSheetIn}><Detail it={cur} /></div>
            </section>
          </div>
        )}
      </div>

      {/* ===== MASAÜSTÜ / TABLET DÜZENİ ===== */}
      <header className={`${s.head} ${s.hPad} ${s.desk}`}>
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
            <button type="button" className={`${s.name} ${nameCls}`} onClick={() => setPlay((p) => (p ? 0 : 1))} aria-label={t.nameAria}>
              ALPEREN MANAS
            </button>
          </h1>
          <div className={s.heroRow}>
            <div>
              <p className={s.seek}>{t.seek}</p>
              <p className={s.seekSub}>{t.seekSub}</p>
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

      <main className={`${s.main} ${s.hPad} ${s.desk}`}>
        <div className={s.max}>
          <div className={s.split}>
            <section aria-label={t.timelineAria}>
              <p className={s.hint}>{t.hint}</p>
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
                                  <span className={s.tag}>{it.tag}{it.demo && <em className={s.demoTag}>{t.m.demoBadge}</em>}</span>
                                  <span className={it.big ? s.titleBig : s.titleSmall}>{it.title}</span>
                                  {it.big && it.short && <span className={s.short}>{it.short}</span>}
                                  {it.by && <span className={s.byLine}>{t.m.testTag} · {t.m.byLabel}: {it.by}</span>}
                                </span>
                                <span className={s.chev} aria-hidden="true">›</span>
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
              <p className={s.seeAll}><a href={LINKS.allPrs} target="_blank" rel="noopener noreferrer">{fill(t.seeAll, { n: vars.total })}</a></p>
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

          <section className={s.cta}>
            <div>
              <p className={s.ctaT}>{t.cta.title}</p>
              <p className={s.ctaD}>{t.cta.text}</p>
            </div>
            <p className={s.ctaBtns}>
              <a className={s.ctaCv} href={LINKS.cv} target="_blank" rel="noopener noreferrer">{t.btnCv}</a>
              <a className={s.ctaMail} href={LINKS.mail}>{t.cta.mail}</a>
              <a className={s.ctaWa} href={`${LINKS.wa}?text=${encodeURIComponent(t.waText)}`} target="_blank" rel="noopener noreferrer">{WA}WhatsApp</a>
            </p>
          </section>

          <footer className={s.footer}>
            <a href={LINKS.mail} className={s.footMail}>{LINKS.email}</a>
            <span className={s.footNote}>{fill(t.footer, { date: fmtDate(sum.updated, lang) })}</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
