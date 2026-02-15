'use client';

import { motion } from 'framer-motion';

import type { RoadmapItem, RoadmapStatus } from '@/types/roadmap';

type RoadmapTimelineProps = {
  items: RoadmapItem[];
};

function toDate(value: string): Date {
  return new Date(`${value}T00:00:00`);
}

function toDateOrFallback(value: string | null, fallback: string): Date {
  return value ? toDate(value) : toDate(fallback);
}

function getDurationInDays(startDate: Date, endDate: Date): number {
  const difference = endDate.getTime() - startDate.getTime();
  return Math.max(1, Math.ceil(difference / (24 * 60 * 60 * 1000)) + 1);
}

function getStatusColor(status: RoadmapStatus): string {
  if (status === 'done') return 'from-emerald-500 to-green-400';
  if (status === 'blocked') return 'from-rose-500 to-orange-400';
  if (status === 'in_progress') return 'from-blue-500 to-cyan-400';
  return 'from-slate-500 to-slate-400';
}

function getStatusLabel(status: RoadmapStatus): string {
  if (status === 'in_progress') return 'In Progress';
  if (status === 'done') return 'Done';
  if (status === 'blocked') return 'Blocked';
  return 'Planned';
}

export default function RoadmapTimeline({ items }: RoadmapTimelineProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-8 text-center text-slate-300">
        No roadmap items found for current filters.
      </div>
    );
  }

  const starts = items.map((item) => toDate(item.start_date));
  const ends = items.map((item) => toDateOrFallback(item.end_date, item.start_date));
  const minStart = new Date(Math.min(...starts.map((value) => value.getTime())));
  const maxEnd = new Date(Math.max(...ends.map((value) => value.getTime())));
  const totalDuration = getDurationInDays(minStart, maxEnd);

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-4">
      <div className="space-y-3">
        {items.map((item, index) => {
          const start = toDate(item.start_date);
          const end = toDateOrFallback(item.end_date, item.start_date);
          const offsetDays = getDurationInDays(minStart, start) - 1;
          const itemDuration = getDurationInDays(start, end);
          const offsetPercent = (offsetDays / totalDuration) * 100;
          const widthPercent = Math.max(6, (itemDuration / totalDuration) * 100);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.25 }}
              className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-3"
            >
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-100">{item.title}</p>
                  <p className="text-xs text-slate-400">{item.phase}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-slate-700 px-2 py-1 text-[11px] uppercase tracking-[0.15em] text-slate-300">
                    {getStatusLabel(item.status)}
                  </span>
                  <span className="text-xs text-slate-400">{item.progressPercent}%</span>
                </div>
              </div>

              <div className="relative h-8 rounded-lg bg-slate-900/90">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${widthPercent}%` }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={`absolute top-1 bottom-1 rounded-md bg-gradient-to-r ${getStatusColor(item.status)}`}
                  style={{ left: `${offsetPercent}%` }}
                />
              </div>

              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                <span>{item.start_date}</span>
                <span>{item.end_date ?? 'Open'}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
