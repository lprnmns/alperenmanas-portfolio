'use client';
import { useState } from 'react';
import { PRODUCTS } from '@/lib/k';
import s from './s.module.css';

const LIST = [PRODUCTS.klinik, PRODUCTS.zenith];

export function Studio() {
  const [i, setI] = useState(0);
  const [shot, setShot] = useState(0);
  const p = LIST[i];
  return (
    <div className={s.studio}>
      <div className={s.tabs} role="tablist">
        {LIST.map((x, k) => (
          <button key={x.name} role="tab" aria-selected={i === k} className={i === k ? s.tabOn : ''} onClick={() => { setI(k); setShot(0); }}>
            {x.name}
            <span className={s.tabBadge}>{x.badge ?? 'canlı'}</span>
          </button>
        ))}
      </div>
      <div className={s.stage}>
        <div className={s.screen}>
          <div className={s.browser}>
            <span /><span /><span />
            <em>{p.url.replace('https://', '')}</em>
          </div>
          <img key={p.shots[shot].src} src={p.shots[shot].src} alt={p.shots[shot].cap} className={s.shot} />
          <p className={s.cap}>{p.shots[shot].cap}</p>
          {p.shots.length > 1 && (
            <div className={s.thumbs}>
              {p.shots.map((x, k) => (
                <button key={x.src} onClick={() => setShot(k)} className={shot === k ? s.thumbOn : ''} aria-label={x.cap}>
                  <img src={x.src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className={s.info}>
          <h2>{p.name}</h2>
          <p className={s.one}>{p.oneLine}</p>
          <h3>Nasıl çalışıyor?</h3>
          <ol className={s.flow}>
            {p.steps.map((x, k) => (
              <li key={x}><span>{k + 1}</span>{x}</li>
            ))}
          </ol>
          <h3>Benim payım</h3>
          <ul className={s.mine}>{p.mine.map((x) => <li key={x}>{x}</li>)}</ul>
          <p className={s.tech}>{p.tech}</p>
          <p className={s.links}>
            <a className={s.primary} href={p.url} target="_blank" rel="noopener noreferrer">Canlı siteyi aç ↗</a>
            {p.github ? <a href={p.github} target="_blank" rel="noopener noreferrer">Kaynak kod</a> : null}
          </p>
        </div>
      </div>
    </div>
  );
}
