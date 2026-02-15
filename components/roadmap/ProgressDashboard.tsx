'use client';

import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import type { RoadmapItem } from '@/types/roadmap';

type ProgressDashboardProps = {
  items: RoadmapItem[];
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

export default function ProgressDashboard({ items }: ProgressDashboardProps) {
  const metrics = useMemo(() => {
    const activeItems = items.filter((item) => item.status !== 'done');
    const completedItems = items.filter((item) => item.status === 'done');
    const overallProgress = items.length > 0
      ? Math.round(items.reduce((sum, item) => sum + item.progressPercent, 0) / items.length)
      : 0;
    const plannedHours = items.reduce((sum, item) => sum + (item.planned_hours ?? 0), 0);
    const actualHours = items.reduce((sum, item) => sum + (item.actual_hours ?? 0), 0);
    const updatedAt = items
      .map((item) => item.updated_at)
      .sort((left, right) => right.localeCompare(left))[0] ?? null;

    return {
      activeCount: activeItems.length,
      completedCount: completedItems.length,
      overallProgress,
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

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Overall Progress</p>
          <p className="mt-2 text-3xl font-bold text-cyan-300">{metrics.overallProgress}%</p>
          <p className="mt-1 text-xs text-slate-400">
            {metrics.completedCount} completed / {items.length} total
          </p>
        </div>
        <div className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Active Milestones</p>
          <p className="mt-2 text-3xl font-bold text-slate-100">{metrics.activeCount}</p>
          <p className="mt-1 text-xs text-slate-400">Current execution focus</p>
        </div>
        <div className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Planned vs Actual</p>
          <p className="mt-2 text-3xl font-bold text-slate-100">
            {metrics.actualHours.toFixed(1)}h / {metrics.plannedHours.toFixed(1)}h
          </p>
          <p className="mt-1 text-xs text-slate-400">Portfolio roadmap scope</p>
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
      </div>
    </div>
  );
}
