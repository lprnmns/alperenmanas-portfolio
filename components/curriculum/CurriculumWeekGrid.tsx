'use client';

import { motion } from 'framer-motion';
import { Check, CircleDot, Play } from 'lucide-react';

import type { CurriculumDay, CurriculumWeekGroup } from '@/types/curriculum';

type CurriculumWeekGridProps = {
  weeks: CurriculumWeekGroup[];
  completedDayIds: Set<string>;
  onSelectDay: (day: CurriculumDay) => void;
  selectedDayId?: string | null;
};

function getDayState(
  day: CurriculumDay,
  completedDayIds: Set<string>,
  selectedDayId: string | null | undefined,
): 'completed' | 'active' | 'pending' {
  if (completedDayIds.has(day.key)) {
    return 'completed';
  }
  if (selectedDayId === day.key) {
    return 'active';
  }
  return 'pending';
}

function getDayClassName(state: 'completed' | 'active' | 'pending'): string {
  if (state === 'completed') {
    return 'border-emerald-400/60 bg-emerald-500/10 text-emerald-100';
  }
  if (state === 'active') {
    return 'border-cyan-300/70 bg-cyan-500/10 text-cyan-100';
  }
  return 'border-slate-600/70 bg-slate-900/70 text-slate-100 hover:border-cyan-300/50';
}

function DayIcon({ state }: { state: 'completed' | 'active' | 'pending' }) {
  if (state === 'completed') {
    return <Check size={14} />;
  }
  if (state === 'active') {
    return <Play size={14} />;
  }
  return <CircleDot size={14} />;
}

export default function CurriculumWeekGrid({
  weeks,
  completedDayIds,
  onSelectDay,
  selectedDayId,
}: CurriculumWeekGridProps) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {weeks.map((week, index) => (
        <motion.section
          key={week.week}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.03, duration: 0.2 }}
          className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4 backdrop-blur"
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Week {week.week}</p>
              <h3 className="mt-1 text-sm font-semibold text-white">{week.title}</h3>
            </div>
            <span className="rounded-full border border-slate-600 px-2 py-1 text-[11px] text-slate-300">
              {week.days.filter((day) => completedDayIds.has(day.key)).length}/{week.days.length} done
            </span>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            {week.days.map((day) => {
              const state = getDayState(day, completedDayIds, selectedDayId);
              return (
                <button
                  type="button"
                  key={day.key}
                  onClick={() => onSelectDay(day)}
                  className={`rounded-xl border p-3 text-left transition ${getDayClassName(state)}`}
                >
                  <p className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.16em]">
                    <DayIcon state={state} />
                    {day.key}
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-tight">{day.title}</p>
                  <p className="mt-1 text-xs opacity-80">{day.focus}</p>
                </button>
              );
            })}
          </div>
        </motion.section>
      ))}
    </div>
  );
}
