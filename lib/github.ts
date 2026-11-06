import snapshot from '@/data/contributions.json';

export type Day = { date: string; count: number; level: number };
export type Activity = { days: Day[]; total: number; active30: number; streak: number; fetchedLive: boolean };

// GitHub katkı takvimi: saatlik yenilenir (ISR). Servis cevap vermezse depodaki son anlık görüntü kullanılır.
export async function getActivity(): Promise<Activity> {
  let days: Day[] = snapshot.contributions as Day[];
  let apiTotal: number | undefined = (snapshot as { total?: { lastYear?: number } }).total?.lastYear;
  let live = false;
  try {
    const r = await fetch('https://github-contributions-api.jogruber.de/v4/lprnmns?y=last', { next: { revalidate: 3600 } });
    if (r.ok) {
      const d = await r.json();
      if (Array.isArray(d.contributions) && d.contributions.length > 300) {
        days = d.contributions;
        apiTotal = d.total?.lastYear ?? apiTotal;
        live = true;
      }
    }
  } catch {
    /* anlık görüntüyle devam */
  }
  const today = new Date().toISOString().slice(0, 10);
  days = days.filter((d) => d.date <= today);
  const total = apiTotal ?? days.reduce((a, d) => a + d.count, 0);
  const active30 = days.slice(-30).filter((d) => d.count > 0).length;
  let streak = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) streak++;
    else if (i === days.length - 1) continue; // bugün henüz katkı yoksa seriyi bozma
    else break;
  }
  return { days, total, active30, streak, fetchedLive: live };
}
