'use client';

import { CalendarRange, CheckCircle2, Target } from 'lucide-react';
import { useMemo, useState } from 'react';

import { MONTH1 } from '@/content/curriculum/month1';
import CurriculumDayDrawer from '@/components/curriculum/CurriculumDayDrawer';
import CurriculumJumpDialog from '@/components/curriculum/CurriculumJumpDialog';
import TodayFocusCard from '@/components/curriculum/TodayFocusCard';
import CurriculumWeekGrid from '@/components/curriculum/CurriculumWeekGrid';
import { groupByWeek } from '@/lib/curriculum/month1-utils';
import type { CurriculumDayTemplate, CurriculumProgress } from '@/types/curriculum';

type CurriculumPanelProps = {
  progress: CurriculumProgress;
  completedDayIds: Set<string>;
  nextDay: CurriculumDayTemplate | null;
  onCreateDailyLog: (day: CurriculumDayTemplate) => Promise<void>;
  creatingDayId: string | null;
};

export default function CurriculumPanel({
  progress,
  completedDayIds,
  nextDay,
  onCreateDailyLog,
  creatingDayId,
}: CurriculumPanelProps) {
  const weeks = useMemo(() => groupByWeek(MONTH1), []);
  const [selectedDay, setSelectedDay] = useState<CurriculumDayTemplate | null>(nextDay ?? MONTH1[0] ?? null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDay = (day: CurriculumDayTemplate) => {
    setSelectedDay(day);
    setDrawerOpen(true);
  };

  return (
    <section className="space-y-4">
      <TodayFocusCard
        heading="Admin Curriculum"
        progress={progress}
        nextDay={nextDay}
        ctaLabel={nextDay ? 'Open Today Focus' : undefined}
        onCta={nextDay ? () => openDay(nextDay) : undefined}
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-300">
            <Target size={14} />
            Completion
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {progress.completedDays}/{progress.totalDays}
          </p>
          <p className="text-xs text-slate-400">Month 1 day coverage</p>
        </div>
        <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-300">
            <CheckCircle2 size={14} />
            Weeks Done
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {Array.from({ length: 4 }, (_, index) => index + 1).filter((week) =>
              MONTH1.filter((day) => day.week === week).every((day) => completedDayIds.has(day.id)),
            ).length}
            /4
          </p>
          <p className="text-xs text-slate-400">Week milestone completion</p>
        </div>
        <div className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-4">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-300">
            <CalendarRange size={14} />
            Jump
          </p>
          <div className="mt-2">
            <CurriculumJumpDialog days={MONTH1} onSelectDay={openDay} />
          </div>
          <p className="mt-2 text-xs text-slate-400">Quick access by W#D# prefix</p>
        </div>
      </div>

      <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-4 shadow-[0_18px_70px_rgba(8,145,178,0.2)]">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Curriculum Control Center</p>
            <h3 className="text-lg font-semibold text-white">Week 1 - Week 4 daily execution</h3>
          </div>
          <p className="text-xs text-slate-300">
            Click any day for details, then generate a daily log template in one action.
          </p>
        </div>

        <CurriculumWeekGrid
          weeks={weeks}
          completedDayIds={completedDayIds}
          onSelectDay={openDay}
          selectedDayId={selectedDay?.id ?? null}
        />
      </div>

      <CurriculumDayDrawer
        day={selectedDay}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        isCompleted={selectedDay ? completedDayIds.has(selectedDay.id) : false}
        creating={selectedDay ? creatingDayId === selectedDay.id : false}
        onCreateDailyLog={onCreateDailyLog}
      />
    </section>
  );
}
