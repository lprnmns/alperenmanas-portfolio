'use client';
import { useEffect, useState } from 'react';
import s from './b.module.css';

type A = { img: string; badge: string; cap: string; pos: string };

export function Awards({ items }: { items: A[] }) {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  useEffect(() => {
    if (hold || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % items.length), 4500);
    return () => clearInterval(t);
  }, [hold, items.length]);
  return (
    <div className={`${s.card} ${s.award}`} onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      {items.map((a, k) => (
        <img key={a.img} src={a.img} alt={a.cap} className={`${s.awardImg} ${k === i ? s.show : ''}`} style={{ objectPosition: a.pos }} fetchPriority={k === 0 ? 'high' : 'low'} />
      ))}
      <span className={s.awardBadge}>🏆 {items[i].badge}</span>
      <div className={s.awardFoot}>
        <span>{items[i].cap}</span>
        <span className={s.dots}>
          {items.map((a, k) => (
            <button key={a.img} aria-label={a.cap} className={k === i ? s.dotOn : ''} onClick={() => setI(k)} />
          ))}
        </span>
      </div>
    </div>
  );
}
