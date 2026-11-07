import snap from '@/data/prs-summary.json';

export type Summary = { total: number; repos: number; months: Record<string, number>; perRepo: Record<string, number>; updated: string };

// Kabul edilen katkı sayıları: GitHub arama API'sinden saatlik (ISR). Hata olursa depodaki anlık görüntü.
export async function getSummary(): Promise<Summary> {
  try {
    const q = encodeURIComponent('author:lprnmns is:pr is:merged -user:lprnmns');
    const headers: Record<string, string> = { Accept: 'application/vnd.github+json', 'User-Agent': 'alperenmanas.app' };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const items: { closed_at: string; repository_url: string }[] = [];
    let total = 0;
    for (let page = 1; page <= 10; page++) {
      const r = await fetch(`https://api.github.com/search/issues?q=${q}&per_page=100&page=${page}`, { headers, next: { revalidate: 600 } });
      if (!r.ok) throw new Error(String(r.status));
      const j = await r.json();
      total = j.total_count;
      items.push(...j.items);
      if (items.length >= total || j.items.length < 100) break;
    }
    if (items.length < snap.total) throw new Error('eksik veri');
    const months: Record<string, number> = {};
    const per: Record<string, number> = {};
    for (const it of items) {
      const m = it.closed_at.slice(0, 7);
      months[m] = (months[m] ?? 0) + 1;
      const repo = it.repository_url.replace('https://api.github.com/repos/', '');
      per[repo] = (per[repo] ?? 0) + 1;
    }
    return { total: items.length, repos: Object.keys(per).length, months, perRepo: per, updated: new Date().toISOString().slice(0, 10) };
  } catch {
    return snap as Summary;
  }
}
