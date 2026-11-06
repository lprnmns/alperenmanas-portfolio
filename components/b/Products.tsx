'use client';
import { useState } from 'react';
import s from './b.module.css';

type P = { sys: string; tag: string; img: string; name: string; desc: string; stats: { v: string; l: string }[]; chips: string[]; how: string[]; url: string; open: string; github?: string };

export function Products({ items, howT }: { items: P[]; howT: string }) {
  const [i, setI] = useState(0);
  const p = items[i];
  return (
    <div className={`${s.card} ${s.product}`}>
      <div className={s.win}>
        <span className={s.lights}><i /><i /><i /></span>
        <span className={s.sys}>{p.sys}</span>
      </div>
      <div className={s.shotWrap}>
        <img src={p.img} alt={p.name} className={s.shot} />
        <span className={s.liveTag}>{p.tag}</span>
      </div>
      <div className={s.pBody}>
        <div className={s.pHead}>
          <h3>{p.name}</h3>
          <span className={s.arrows}>
            <button aria-label="Önceki" onClick={() => setI((i - 1 + items.length) % items.length)}>‹</button>
            <button aria-label="Sonraki" onClick={() => setI((i + 1) % items.length)}>›</button>
          </span>
        </div>
        <p className={s.pDesc}>{p.desc}</p>
        <div className={s.stats}>
          {p.stats.map((x) => (
            <div key={x.l}><b>{x.v}</b><span>{x.l}</span></div>
          ))}
        </div>
        <div className={s.how}>
          <p className={s.howT}>{howT}</p>
          <ol>{p.how.map((h, k) => <li key={h}><span>{k + 1}</span>{h}</li>)}</ol>
        </div>
        <p className={s.chips}>{p.chips.map((c) => <span key={c}>{c}</span>)}</p>
        <p className={s.pLinks}>
          <a href={p.url} target="_blank" rel="noopener noreferrer" className={s.ghost}>{p.open} ↗</a>
          {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className={s.ghostDim}>GitHub ↗</a>}
        </p>
      </div>
    </div>
  );
}
