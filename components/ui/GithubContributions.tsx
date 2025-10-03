'use client';

import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';

const API_URL = 'https://github-contributions-api.deno.dev';

const COLOR_EMPTY = 'rgba(148, 163, 184, 0.2)';

function getFourMonthsAgoDate(): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setMonth(date.getMonth() - 4);
  return date;
}

function formatRange(start: Date, end: Date): string {
  const formatter = new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: 'short',
  });

  return `${formatter.format(start)} – ${formatter.format(end)}`;
}

function getSummary(days: ContributionDay[], threshold: Date) {
  const activeDays = days.filter((day) => day.date >= threshold);
  const total = activeDays.reduce((acc, day) => acc + day.contributionCount, 0);
  const start = activeDays[0]?.date ?? threshold;
  const end = activeDays[activeDays.length - 1]?.date ?? new Date();

  return {
    total,
    start,
    end,
  };
}

type ContributionDay = {
  date: Date;
  color: string;
  contributionCount: number;
  contributionLevel: string;
};

export function GithubContributions({ username }: { username: string }) {
  const [weeks, setWeeks] = useState<ContributionDay[][]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');

  useEffect(() => {
    async function load() {
      try {
        setStatus('loading');
        const response = await fetch(`${API_URL}/${username}.json`);
        if (!response.ok) {
          throw new Error('Failed to fetch contributions');
        }

        const payload = await response.json();
        const threshold = getFourMonthsAgoDate();

        const parsedWeeks: ContributionDay[][] = (payload.contributions as any[][]).map((week) =>
          week.map((day) => ({
            date: new Date(day.date),
            color: day.color as string,
            contributionCount: day.contributionCount as number,
            contributionLevel: day.contributionLevel as string,
          }))
        );

        const filtered = parsedWeeks.filter((week) =>
          week.some((day) => day.date >= threshold)
        );

        setWeeks(filtered);
        setStatus('ready');
      } catch (error) {
        console.error(error);
        setStatus('error');
      }
    }

    load();
  }, [username]);

  const threshold = useMemo(() => getFourMonthsAgoDate(), []);
  const flatDays = useMemo(() => weeks.flat(), [weeks]);
  const summary = useMemo(() => getSummary(flatDays, threshold), [flatDays, threshold]);

  if (status === 'error') {
    return (
      <div className="rounded-2xl border border-slate-700/40 bg-slate-900/40 p-6 text-left">
        <p className="text-sm text-slate-400">
          GitHub katkı verileri şu anda getirilemedi.
        </p>
      </div>
    );
  }

  if (status !== 'ready') {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-slate-700/40 bg-slate-900/40 p-6">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-600/60 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-300">
            GitHub
          </p>
          <p className="mt-2 text-base font-semibold text-white">Son 4 ay katkılarım</p>
        </div>
        <span className="text-xs text-slate-400">{formatRange(summary.start, summary.end)}</span>
      </div>

      <div className="mt-4">
        <div className="grid auto-cols-max grid-flow-col gap-[4px] overflow-x-auto pb-2">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[4px]">
              {week.map((day, dayIndex) => {
                const isActive = day.date >= threshold;
                return (
                  <span
                    key={`${day.date.toISOString()}-${dayIndex}`}
                    title={`${day.contributionCount} katkı · ${day.date.toLocaleDateString('tr-TR')}`}
                    className={clsx(
                      'h-[11px] w-[11px] rounded-sm transition-transform duration-200',
                      isActive ? 'hover:scale-105' : 'opacity-10'
                    )}
                    style={{ backgroundColor: isActive ? day.color : COLOR_EMPTY }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <span>{summary.total} katkı</span>
        <div className="flex items-center gap-2">
          <span>Az</span>
          <div className="flex gap-[4px]">
            {['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'].map((color) => (
              <span
                key={color}
                className="h-[11px] w-[11px] rounded-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span>Fazla</span>
        </div>
      </div>
    </div>
  );
}
