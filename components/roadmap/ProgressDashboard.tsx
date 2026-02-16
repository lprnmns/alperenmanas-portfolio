'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import type { CurriculumProgress } from '@/types/curriculum';
import type { RoadmapItem } from '@/types/roadmap';

type ProgressDashboardProps = {
  items: RoadmapItem[];
  curriculumProgress: CurriculumProgress;
};

type ActivityPoint = {
  date: string;
  entries: number;
  actualHours: number;
};

function toDateFromIsoDate(isoDate: string): Date {
  return new Date(`${isoDate}T00:00:00`);
}

function toIsoDate(value: Date): string {
  return value.toISOString().slice(0, 10);
}

function getLast14DaysActivity(items: RoadmapItem[]): ActivityPoint[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days: ActivityPoint[] = [];

  for (let index = 13; index >= 0; index -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - index);
    days.push({
      date: toIsoDate(date),
      entries: 0,
      actualHours: 0,
    });
  }

  const map = new Map(days.map((entry) => [entry.date, entry]));

  for (const item of items) {
    for (const log of item.dailyLogs) {
      const point = map.get(log.log_date);
      if (!point) {
        continue;
      }

      point.entries += 1;
      point.actualHours += log.actual_hours ?? 0;
    }
  }

  return days;
}

export default function ProgressDashboard({ items, curriculumProgress }: ProgressDashboardProps) {
  const metrics = useMemo(() => {
    const activeItems = items.filter((item) => item.status === 'in_progress' || item.status === 'blocked');
    const completedItems = items.filter((item) => item.status === 'done');
    const plannedHours = items.reduce((sum, item) => sum + (item.planned_hours ?? 0), 0);
    const actualHours = items.reduce((sum, item) => sum + (item.actual_hours ?? 0), 0);
    const itemUpdates = items.map((item) => item.updated_at);
    const logUpdates = items.flatMap((item) => item.dailyLogs.map((log) => log.updated_at));
    const updatedAt = [...itemUpdates, ...logUpdates]
      .sort((left, right) => right.localeCompare(left))[0] ?? null;

    return {
      activeCount: activeItems.length,
      completedCount: completedItems.length,
      plannedHours,
      actualHours,
      updatedAt,
    };
  }, [items]);

  const last14Days = useMemo(() => getLast14DaysActivity(items), [items]);
  const totalEntries = useMemo(
    () => last14Days.reduce((sum, entry) => sum + entry.entries, 0),
    [last14Days],
  );
  const totalActualHours = useMemo(
    () => last14Days.reduce((sum, entry) => sum + entry.actualHours, 0),
    [last14Days],
  );
  const hasExecutionData = items.length > 0 || totalEntries > 0;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/10 via-slate-900/80 to-slate-900/80 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">Month 1 Completion</p>
          <p className="mt-2 text-3xl font-bold text-cyan-200">
            {curriculumProgress.completedDays}/{curriculumProgress.totalDays}
          </p>
          <p className="mt-1 text-xs text-cyan-100/80">{curriculumProgress.percent}% progress</p>
        </div>
        <div className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Milestones Closed</p>
          <p className="mt-2 text-3xl font-bold text-slate-100">{metrics.completedCount}</p>
          <p className="mt-1 text-xs text-slate-400">
            {items.length > 0 ? `${items.length} total milestones` : 'No milestones synced yet'}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Planned vs Actual</p>
          <p className="mt-2 text-3xl font-bold text-slate-100">
            {metrics.actualHours.toFixed(1)}h / {metrics.plannedHours.toFixed(1)}h
          </p>
          <p className="mt-1 text-xs text-slate-400">{metrics.activeCount} active milestone(s)</p>
        </div>
        <div className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Last Update</p>
          <p className="mt-2 text-lg font-semibold text-slate-100">
            {metrics.updatedAt ? toDateFromIsoDate(metrics.updatedAt.slice(0, 10)).toLocaleDateString() : 'N/A'}
          </p>
          <p className="mt-1 text-xs text-slate-400">Based on latest synced record</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Last 14 Days Activity</p>
            <p className="text-sm text-slate-300">
              {totalEntries} entries · {totalActualHours.toFixed(1)}h logged
            </p>
          </div>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={last14Days}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.2)" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#cbd5e1' }} />
              <YAxis tick={{ fontSize: 11, fill: '#cbd5e1' }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid rgba(100,116,139,0.4)',
                  borderRadius: 10,
                }}
                labelStyle={{ color: '#cbd5e1' }}
              />
              <Bar dataKey="entries" fill="#22d3ee" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {!hasExecutionData && (
          <div className="mt-4 rounded-2xl border border-dashed border-cyan-300/40 bg-cyan-500/5 p-4 text-sm text-cyan-100">
            <p className="font-semibold">No execution logs yet. Month 1 starts at 0/24.</p>
            <p className="mt-1 text-cyan-100/80">
              Open admin and create today&apos;s daily log from a curriculum template to begin tracking.
            </p>
            <Link
              href="/admin"
              className="mt-3 inline-flex rounded-lg border border-cyan-300/50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100 transition hover:bg-cyan-400/10"
            >
              Open Admin
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
