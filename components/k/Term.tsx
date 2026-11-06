import { GLOSSARY } from '@/lib/k';
import s from './k.module.css';

// Teknik terim: altı noktalı çizgi, üzerine gelince/dokununca sade açıklama
export function Term({ k, children }: { k: keyof typeof GLOSSARY | string; children: React.ReactNode }) {
  const tip = GLOSSARY[k as string];
  return (
    <span className={s.term} tabIndex={0} data-tip={tip} aria-label={tip}>
      {children}
    </span>
  );
}

export function Glossary({ keys }: { keys?: string[] }) {
  const list = Object.entries(GLOSSARY).filter(([k]) => !keys || keys.includes(k));
  return (
    <details className={s.glossary}>
      <summary>Teknik terimler sözlüğü</summary>
      <dl>
        {list.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
