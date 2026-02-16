'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, CalendarClock, RefreshCcw } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { MONTH1 } from '@/content/curriculum/month1';
import CurriculumDayDrawer from '@/components/curriculum/CurriculumDayDrawer';
import CurriculumJumpDialog from '@/components/curriculum/CurriculumJumpDialog';
import TodayFocusCard from '@/components/curriculum/TodayFocusCard';
import CurriculumWeekGrid from '@/components/curriculum/CurriculumWeekGrid';
import ArtifactCard from '@/components/roadmap/ArtifactCard';
import ProgressDashboard from '@/components/roadmap/ProgressDashboard';
import RoadmapFilters, { type RoadmapFilterValues } from '@/components/roadmap/RoadmapFilters';
import RoadmapTimeline from '@/components/roadmap/RoadmapTimeline';
import WeekDetailDrawer from '@/components/roadmap/WeekDetailDrawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  computeProgress,
  detectCompletedDayIds,
  getNextIncompleteDay,
  groupByWeek,
} from '@/lib/curriculum/month1-utils';
import { fetchPublicRoadmap } from '@/lib/roadmap/queries';
import { buildWeekGroups } from '@/lib/roadmap/week-utils';
import type { CurriculumDay } from '@/types/curriculum';
import type { RoadmapDataSet, WeekGroup } from '@/types/roadmap';

const DEFAULT_FILTERS: RoadmapFilterValues = {
  phase: 'all',
  status: 'all',
  query: '',
};

type ActivityCell = {
  date: string;
  entries: number;
};

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function getHeatmapCells(data: RoadmapDataSet): ActivityCell[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cells: ActivityCell[] = [];

  for (let index = 83; index >= 0; index -= 1) {
    const value = new Date(today);
    value.setDate(value.getDate() - index);
    cells.push({ date: toIsoDate(value), entries: 0 });
  }

  const map = new Map(cells.map((cell) => [cell.date, cell]));

  for (const item of data.items) {
    for (const log of item.dailyLogs) {
      const cell = map.get(log.log_date);
      if (!cell) {
        continue;
      }
      cell.entries += 1;
    }
  }

  return cells;
}

function getHeatmapColor(count: number): string {
  if (count >= 4) return 'bg-emerald-400';
  if (count >= 3) return 'bg-emerald-500/80';
  if (count >= 2) return 'bg-cyan-400/70';
  if (count >= 1) return 'bg-cyan-500/50';
  return 'bg-slate-800';
}

export default function RoadmapHiringView() {
  const [filters, setFilters] = useState<RoadmapFilterValues>(DEFAULT_FILTERS);
  const [data, setData] = useState<RoadmapDataSet>({ items: [], phases: [] });
  const [activeTab, setActiveTab] = useState<'plan' | 'execution'>('plan');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedWeekKey, setSelectedWeekKey] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCurriculumDay, setSelectedCurriculumDay] = useState<CurriculumDay | null>(
    MONTH1[0] ?? null,
  );
  const [curriculumDrawerOpen, setCurriculumDrawerOpen] = useState(false);

  const loadRoadmap = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = await fetchPublicRoadmap(filters);
      setData(payload);
    } catch {
      setError('Roadmap data could not be loaded right now.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    void loadRoadmap();
  }, [loadRoadmap]);

  const weekGroups = useMemo(() => buildWeekGroups(data.items), [data.items]);
  const selectedWeek: WeekGroup | null = useMemo(() => {
    if (!selectedWeekKey) {
      return null;
    }
    return weekGroups.find((week) => week.key === selectedWeekKey) ?? null;
  }, [selectedWeekKey, weekGroups]);

  const featuredArtifacts = useMemo(
    () =>
      data.items
        .flatMap((item) => item.artifacts.map((artifact) => ({ artifact, roadmapTitle: item.title })))
        .slice(0, 8),
    [data.items],
  );

  const heatmapCells = useMemo(() => getHeatmapCells(data), [data]);
  const hasHeatmapActivity = heatmapCells.some((cell) => cell.entries > 0);
  const curriculumWeeks = useMemo(() => groupByWeek(MONTH1), []);
  const completedDayIds = useMemo(
    () => detectCompletedDayIds(data.items.flatMap((item) => item.dailyLogs)),
    [data.items],
  );
  const curriculumProgress = useMemo(() => computeProgress(MONTH1, completedDayIds), [completedDayIds]);
  const nextDay = useMemo(() => getNextIncompleteDay(MONTH1, completedDayIds), [completedDayIds]);
  const hasExecutionMilestones = data.items.length > 0;

  const openCurriculumDay = (day: CurriculumDay) => {
    setSelectedCurriculumDay(day);
    setCurriculumDrawerOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,rgba(14,116,144,0.32),transparent_65%)]" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <header className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2 text-xs uppercase tracking-[0.15em] text-slate-300 transition hover:border-cyan-400/60 hover:text-cyan-300"
          >
            <ArrowLeft size={14} />
            Back To Portfolio
          </Link>
          <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-slate-950 p-6 shadow-[0_26px_90px_rgba(8,145,178,0.2)]">
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">Hiring View</p>
            <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl">Interactive Roadmap and Execution Hub</h1>
            <p className="mt-3 max-w-3xl text-sm text-slate-300">
              30-second summary: month progress, 14-day execution pace, artifacts, and weekly deep dive. Switch to Plan to inspect the full Month 1 curriculum.
            </p>
          </div>
        </header>

        <TodayFocusCard
          heading="Public Roadmap Focus"
          progress={curriculumProgress}
          nextDay={nextDay}
          ctaLabel={nextDay ? 'Inspect day details' : undefined}
          onCta={nextDay ? () => openCurriculumDay(nextDay) : undefined}
        />

        <ProgressDashboard items={data.items} curriculumProgress={curriculumProgress} />

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as 'plan' | 'execution')}
          className="space-y-4"
        >
          <TabsList className="h-auto gap-2 rounded-2xl border border-slate-700/70 bg-slate-900/70 p-1">
            <TabsTrigger
              value="plan"
              className="rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] data-[state=active]:bg-cyan-500/15 data-[state=active]:text-cyan-100"
            >
              Plan
            </TabsTrigger>
            <TabsTrigger
              value="execution"
              className="rounded-xl px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] data-[state=active]:bg-cyan-500/15 data-[state=active]:text-cyan-100"
            >
              Execution
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plan" className="space-y-4">
            <section className="rounded-3xl border border-slate-700/70 bg-slate-900/70 p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">Month 1 Curriculum</p>
                  <h2 className="text-xl font-semibold text-white">4 weeks, 6 days per week, 24 execution days</h2>
                </div>
                <CurriculumJumpDialog days={MONTH1} onSelectDay={openCurriculumDay} />
              </div>
              <p className="mb-4 text-sm text-slate-300">
                Plan tab is code-driven and always available, even if external data is empty. Pick a day to inspect build steps, links, and definition of done.
              </p>
              <CurriculumWeekGrid
                weeks={curriculumWeeks}
                completedDayIds={completedDayIds}
                onSelectDay={openCurriculumDay}
                selectedDayId={selectedCurriculumDay?.key ?? null}
              />
            </section>
          </TabsContent>

          <TabsContent value="execution" className="space-y-5">
            {error && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-rose-500/40 bg-rose-900/20 p-4">
                <p className="text-sm text-rose-200">{error}</p>
                <button
                  type="button"
                  onClick={() => void loadRoadmap()}
                  className="inline-flex items-center gap-2 rounded-lg border border-rose-300/40 px-3 py-2 text-xs uppercase tracking-[0.15em] text-rose-100 transition hover:bg-rose-900/40"
                >
                  <RefreshCcw size={14} />
                  Retry
                </button>
              </div>
            )}

            <RoadmapFilters phases={data.phases} value={filters} onChange={setFilters} />

            {loading ? (
              <div className="rounded-2xl border border-slate-700/60 bg-slate-800/50 p-8">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-500 border-t-cyan-300" />
              </div>
            ) : (
              <>
                <section className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">Timeline / Gantt</h2>
                    <p className="text-xs uppercase tracking-[0.15em] text-slate-400">Animated by Framer Motion</p>
                  </div>
                  {hasExecutionMilestones ? (
                    <RoadmapTimeline items={data.items} />
                  ) : (
                    <div className="rounded-3xl border border-dashed border-cyan-300/40 bg-cyan-400/5 p-6">
                      <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.17em] text-cyan-200">
                        <CalendarClock size={14} />
                        Execution feed is empty
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-white">Start logging days to unlock timeline view</h3>
                      <p className="mt-2 max-w-2xl text-sm text-cyan-100/80">
                        Progress already tracks 0/24 from curriculum. Open admin and generate today&apos;s daily log from template to populate execution history.
                      </p>
                      <Link
                        href="/admin"
                        className="mt-4 inline-flex rounded-xl border border-cyan-300/50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100 transition hover:bg-cyan-400/10"
                      >
                        Open Admin Workspace
                      </Link>
                    </div>
                  )}
                </section>

                <section className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">Artifacts</h2>
                    <p className="text-xs uppercase tracking-[0.15em] text-slate-400">PR - Demo - Blog - Docs</p>
                  </div>
                  {featuredArtifacts.length > 0 ? (
                    <div className="grid gap-3 md:grid-cols-2">
                      {featuredArtifacts.map(({ artifact, roadmapTitle }) => (
                        <ArtifactCard key={artifact.id} artifact={artifact} roadmapTitle={roadmapTitle} />
                      ))}
                    </div>
                  ) : (
                    <p className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-4 text-sm text-slate-300">
                      Artifact feed is waiting for first PR/demo/blog link.
                    </p>
                  )}
                </section>

                <section className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">Deep Dive By Week</h2>
                    <p className="text-xs uppercase tracking-[0.15em] text-slate-400">Expandable week cards</p>
                  </div>
                  {weekGroups.length > 0 ? (
                    <div className="grid gap-3 md:grid-cols-2">
                      {weekGroups.map((week, index) => (
                        <motion.button
                          type="button"
                          key={week.key}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.04, duration: 0.2 }}
                          onClick={() => {
                            setSelectedWeekKey(week.key);
                            setDrawerOpen(true);
                          }}
                          className="rounded-xl border border-slate-700/60 bg-slate-800/60 p-4 text-left transition hover:border-cyan-400/40 hover:bg-slate-800"
                        >
                          <p className="text-xs uppercase tracking-[0.15em] text-slate-400">{week.key}</p>
                          <h3 className="mt-1 text-sm font-semibold text-white">{week.label}</h3>
                          <p className="mt-2 text-xs text-slate-300">
                            {week.items.length} milestones - {week.totalActualHours.toFixed(1)}h actual / {week.totalPlannedHours.toFixed(1)}h planned
                          </p>
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <p className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-4 text-sm text-slate-300">
                      Weekly deep dive will appear after the first execution logs are added.
                    </p>
                  )}
                </section>

                {hasHeatmapActivity && (
                  <section className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-white">Activity Heatmap (Optional)</h2>
                      <p className="text-xs uppercase tracking-[0.15em] text-slate-400">Last 12 weeks</p>
                    </div>
                    <div className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-4">
                      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(14, minmax(0, 1fr))' }}>
                        {heatmapCells.map((cell) => (
                          <span
                            key={cell.date}
                            title={`${cell.date}: ${cell.entries} logs`}
                            className={`h-4 rounded-sm ${getHeatmapColor(cell.entries)}`}
                          />
                        ))}
                      </div>
                    </div>
                  </section>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <WeekDetailDrawer week={selectedWeek} open={drawerOpen} onOpenChange={setDrawerOpen} />
      <CurriculumDayDrawer
        day={selectedCurriculumDay}
        open={curriculumDrawerOpen}
        onOpenChange={setCurriculumDrawerOpen}
        isCompleted={selectedCurriculumDay ? completedDayIds.has(selectedCurriculumDay.key) : false}
      />
    </main>
  );
}
