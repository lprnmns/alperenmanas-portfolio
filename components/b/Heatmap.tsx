import type { Day } from '@/lib/github';
import s from './b.module.css';

// GitHub tarzı katkı ızgarası: sütunlar hafta, satırlar gün
export function Heatmap({ days, months }: { days: Day[]; months: string[] }) {
  const first = new Date(days[0].date + 'T00:00:00Z');
  const pad = first.getUTCDay(); // pazar=0
  const cells: (Day | null)[] = [...Array(pad).fill(null), ...days];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  let lastM = -1;
  return (
    <div className={s.heat}>
      <div className={s.heatMonths} style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}>
        {weeks.map((w, k) => {
          const d = w.find(Boolean);
          const m = d ? new Date(d.date + 'T00:00:00Z').getUTCMonth() : -1;
          const show = m !== lastM && d && new Date(d.date + 'T00:00:00Z').getUTCDate() <= 7;
          if (show) lastM = m;
          return <span key={k}>{show ? months[m] : ''}</span>;
        })}
      </div>
      <div className={s.heatGrid} style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}>
        {weeks.map((w, k) => (
          <div key={k} className={s.heatCol}>
            {Array.from({ length: 7 }, (_, r) => {
              const d = w[r];
              return <i key={r} className={d ? s[`l${Math.min(d.level, 4)}`] : s.lx} title={d ? `${d.date}: ${d.count}` : ''} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
