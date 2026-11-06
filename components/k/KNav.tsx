import { CONCEPTS } from '@/lib/concepts';
import s from './k.module.css';

// Konseptler arasında gezinmek için sabit alt çubuk (yalnızca karşılaştırma aşaması için)
export function KNav({ n }: { n: number }) {
  const c = CONCEPTS.find((x) => x.n === n)!;
  const prev = n > 1 ? n - 1 : CONCEPTS.length;
  const next = n < CONCEPTS.length ? n + 1 : 1;
  return (
    <nav className={s.knav} aria-label="Konseptler">
      <a href={`/${prev}`} className={s.knavBtn} aria-label="Önceki konsept">←</a>
      <a href="/0" className={s.knavMid}>
        <b>Konsept {n}/{CONCEPTS.length}</b> · {c.name}
        <span className={s.knavSrc}>{c.src}</span>
      </a>
      <a href={`/${next}`} className={s.knavBtn} aria-label="Sonraki konsept">→</a>
    </nav>
  );
}
