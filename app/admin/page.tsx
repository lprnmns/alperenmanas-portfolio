'use client';

import type { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { ArrowLeft, LogOut, RefreshCcw, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import AdminAuthGate from '@/components/admin/AdminAuthGate';
import CurriculumPanel from '@/components/admin/CurriculumPanel';
import AdminTable from '@/components/admin/AdminTable';
import ArtifactForm, {
  type ArtifactDailyLogOption,
  type ArtifactFormValues,
  type ArtifactRoadmapOption,
} from '@/components/admin/ArtifactForm';
import DailyLogForm, { type DailyLogFormValues } from '@/components/admin/DailyLogForm';
import RoadmapItemForm, { type RoadmapItemFormValues } from '@/components/admin/RoadmapItemForm';
import {
  buildTemplateDailyLog,
  computeProgress,
  detectCompletedDayIds,
  findWeekMilestone,
  getNextIncompleteDay,
  getWeekMilestoneInsert,
} from '@/lib/curriculum/month1-utils';
import { MONTH1 } from '@/content/curriculum/month1';
import {
  createArtifact,
  createDailyLog,
  createRoadmapItem,
  createTag,
  deleteArtifact,
  deleteDailyLog,
  deleteRoadmapItem,
  deleteTag,
  fetchAdminRoadmap,
  updateArtifact,
  updateDailyLog,
  updateRoadmapItem,
} from '@/lib/roadmap/queries';
import type { CurriculumDay } from '@/types/curriculum';
import type { AdminRoadmapDataSet, ArtifactRow, DailyLogRow, RoadmapItem, TagRow } from '@/types/roadmap';

type FlatDailyLog = DailyLogRow & { roadmapTitle: string };
type FlatArtifact = ArtifactRow & { roadmapTitle: string };

function flattenLogs(items: RoadmapItem[]): FlatDailyLog[] {
  return items
    .flatMap((item) => item.dailyLogs.map((log) => ({ ...log, roadmapTitle: item.title })))
    .sort((left, right) => right.log_date.localeCompare(left.log_date));
}

function flattenArtifacts(items: RoadmapItem[]): FlatArtifact[] {
  return items
    .flatMap((item) => item.artifacts.map((artifact) => ({ ...artifact, roadmapTitle: item.title })))
    .sort((left, right) => right.created_at.localeCompare(left.created_at));
}

function toRoadmapOptions(items: RoadmapItem[]): ArtifactRoadmapOption[] {
  return items.map((item) => ({ id: item.id, title: item.title }));
}

function toDailyLogOptions(logs: FlatDailyLog[]): ArtifactDailyLogOption[] {
  return logs.map((log) => ({
    id: log.id,
    roadmap_item_id: log.roadmap_item_id,
    title: log.title,
    log_date: log.log_date,
  }));
}

function AdminWorkspace({ user, signOut }: { user: User; signOut: () => Promise<void> }) {
  const [data, setData] = useState<AdminRoadmapDataSet>({ items: [], tags: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [editingRoadmapId, setEditingRoadmapId] = useState<string | null>(null);
  const [editingLogId, setEditingLogId] = useState<string | null>(null);
  const [editingArtifactId, setEditingArtifactId] = useState<string | null>(null);

  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('');
  const [creatingDayId, setCreatingDayId] = useState<string | null>(null);

  const flatLogs = useMemo(() => flattenLogs(data.items), [data.items]);
  const flatArtifacts = useMemo(() => flattenArtifacts(data.items), [data.items]);
  const roadmapOptions = useMemo(() => toRoadmapOptions(data.items), [data.items]);
  const dailyLogOptions = useMemo(() => toDailyLogOptions(flatLogs), [flatLogs]);
  const completedDayIds = useMemo(() => detectCompletedDayIds(flatLogs), [flatLogs]);
  const curriculumProgress = useMemo(() => computeProgress(MONTH1, completedDayIds), [completedDayIds]);
  const nextCurriculumDay = useMemo(
    () => getNextIncompleteDay(MONTH1, completedDayIds),
    [completedDayIds],
  );

  const refreshData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchAdminRoadmap(user.id);
      setData(result);
    } catch (caughtError) {
      const text = caughtError instanceof Error ? caughtError.message : 'Failed to load admin data.';
      setError(text);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    void refreshData();
  }, [refreshData]);

  const withFeedback = async (action: () => Promise<void>, successMessage: string) => {
    setError(null);
    setMessage(null);
    try {
      await action();
      setMessage(successMessage);
      await refreshData();
    } catch (caughtError) {
      const text = caughtError instanceof Error ? caughtError.message : 'Action failed.';
      setError(text);
    }
  };

  const ensureWeekMilestones = useCallback(async () => {
    const ids = new Map<number, string>();
    let nextSortOrder = Math.max(10, ...data.items.map((item) => item.sort_order + 1));
    const mutableItems = [...data.items];

    for (let week = 1; week <= 4; week += 1) {
      const existing = findWeekMilestone(mutableItems, week);
      if (existing) {
        ids.set(week, existing.id);
        continue;
      }

      const created = await createRoadmapItem(getWeekMilestoneInsert(week, user.id, nextSortOrder));
      nextSortOrder += 1;
      ids.set(week, created.id);
      mutableItems.push({
        ...created,
        dailyLogs: [],
        artifacts: [],
        progressPercent: 0,
      });
    }

    return ids;
  }, [data.items, user.id]);

  const handleCreateCurriculumLog = async (day: CurriculumDay) => {
    if (completedDayIds.has(day.key)) {
      setMessage(`${day.key} already has a daily log.`);
      setError(null);
      return;
    }

    setCreatingDayId(day.key);
    await withFeedback(async () => {
      const weekMilestoneIds = await ensureWeekMilestones();
      const milestoneId = weekMilestoneIds.get(day.week);
      if (!milestoneId) {
        throw new Error(`Week ${day.week} milestone is missing.`);
      }

      const template = buildTemplateDailyLog(day);
      await createDailyLog({
        roadmap_item_id: milestoneId,
        user_id: user.id,
        log_date: new Date().toISOString().slice(0, 10),
        title: template.title,
        notes: template.notes,
        status: 'done',
        planned_hours: template.plannedHours,
        actual_hours: template.plannedHours,
        is_public: true,
      });
    }, `${day.key} daily log created from template.`);
    setCreatingDayId(null);
  };

  const handleRoadmapCreate = async (values: RoadmapItemFormValues) => {
    await withFeedback(async () => {
      await createRoadmapItem({ ...values, user_id: user.id });
    }, 'Roadmap item created.');
  };

  const handleRoadmapUpdate = async (id: string, values: RoadmapItemFormValues) => {
    await withFeedback(async () => {
      await updateRoadmapItem(id, values);
      setEditingRoadmapId(null);
    }, 'Roadmap item updated.');
  };

  const handleRoadmapDelete = async (id: string) => {
    if (!window.confirm('Delete this roadmap item? This also removes linked daily logs and artifacts.')) {
      return;
    }
    await withFeedback(async () => {
      await deleteRoadmapItem(id);
    }, 'Roadmap item deleted.');
  };

  const handleDailyLogCreate = async (values: DailyLogFormValues) => {
    await withFeedback(async () => {
      await createDailyLog({ ...values, user_id: user.id });
    }, 'Daily log created.');
  };

  const handleDailyLogUpdate = async (id: string, values: DailyLogFormValues) => {
    await withFeedback(async () => {
      await updateDailyLog(id, values);
      setEditingLogId(null);
    }, 'Daily log updated.');
  };

  const handleDailyLogDelete = async (id: string) => {
    if (!window.confirm('Delete this daily log?')) {
      return;
    }
    await withFeedback(async () => {
      await deleteDailyLog(id);
    }, 'Daily log deleted.');
  };

  const handleArtifactCreate = async (values: ArtifactFormValues) => {
    await withFeedback(async () => {
      await createArtifact({ ...values, user_id: user.id });
    }, 'Artifact created.');
  };

  const handleArtifactUpdate = async (id: string, values: ArtifactFormValues) => {
    await withFeedback(async () => {
      await updateArtifact(id, values);
      setEditingArtifactId(null);
    }, 'Artifact updated.');
  };

  const handleArtifactDelete = async (id: string) => {
    if (!window.confirm('Delete this artifact?')) {
      return;
    }
    await withFeedback(async () => {
      await deleteArtifact(id);
    }, 'Artifact deleted.');
  };

  const handleTagCreate = async () => {
    const name = newTagName.trim();
    if (!name) {
      return;
    }
    await withFeedback(async () => {
      await createTag({ user_id: user.id, name, color: newTagColor.trim() || null });
      setNewTagName('');
      setNewTagColor('');
    }, 'Tag created.');
  };

  const handleTagDelete = async (tag: TagRow) => {
    if (!window.confirm(`Delete tag "${tag.name}"?`)) {
      return;
    }
    await withFeedback(async () => {
      await deleteTag(tag.id);
    }, 'Tag deleted.');
  };

  const selectedRoadmapItem = useMemo(
    () => data.items.find((item) => item.id === editingRoadmapId) ?? null,
    [data.items, editingRoadmapId],
  );
  const selectedDailyLog = useMemo(
    () => flatLogs.find((log) => log.id === editingLogId) ?? null,
    [flatLogs, editingLogId],
  );
  const selectedArtifact = useMemo(
    () => flatArtifacts.find((artifact) => artifact.id === editingArtifactId) ?? null,
    [flatArtifacts, editingArtifactId],
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-700/60 bg-slate-800/60 p-4">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-slate-400">Signed In</p>
          <p className="text-sm text-slate-100">{user.email ?? user.id}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => void refreshData()}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-2 text-xs uppercase tracking-[0.1em] text-slate-200 transition hover:bg-slate-800"
          >
            <RefreshCcw size={14} />
            Refresh
          </button>
          <button
            type="button"
            onClick={() => void signOut()}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-2 text-xs uppercase tracking-[0.1em] text-slate-200 transition hover:bg-slate-800"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </div>

      {error && <p className="rounded-lg border border-rose-500/40 bg-rose-900/20 p-3 text-sm text-rose-200">{error}</p>}
      {message && <p className="rounded-lg border border-emerald-500/40 bg-emerald-900/20 p-3 text-sm text-emerald-200">{message}</p>}
      {loading && (
        <div className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-6">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-500 border-t-cyan-300" />
        </div>
      )}

      {!loading && (
        <CurriculumPanel
          progress={curriculumProgress}
          completedDayIds={completedDayIds}
          nextDay={nextCurriculumDay}
          creatingDayId={creatingDayId}
          onCreateDailyLog={handleCreateCurriculumLog}
        />
      )}

      <AdminTable title="Roadmap Items" description="CRUD milestones with status, hours, order, and visibility.">
        <RoadmapItemForm onSubmit={handleRoadmapCreate} submitLabel="Create Milestone" />
        <div className="mt-4 space-y-3">
          {data.items.map((item) => (
            <div key={item.id} className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-100">{item.title}</p>
                  <p className="text-xs text-slate-400">
                    {item.phase} - {item.status} - {item.start_date} to {item.end_date ?? 'Open'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingRoadmapId((prev) => (prev === item.id ? null : item.id))}
                    className="rounded-lg border border-slate-600 px-3 py-1 text-xs text-slate-200 transition hover:bg-slate-800"
                  >
                    {editingRoadmapId === item.id ? 'Close' : 'Edit'}
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleRoadmapDelete(item.id)}
                    className="rounded-lg border border-rose-500/50 px-3 py-1 text-xs text-rose-200 transition hover:bg-rose-900/30"
                  >
                    <span className="inline-flex items-center gap-1">
                      <Trash2 size={12} /> Delete
                    </span>
                  </button>
                </div>
              </div>

              {editingRoadmapId === item.id && selectedRoadmapItem && (
                <div className="mt-3">
                  <RoadmapItemForm
                    initialValues={{
                      title: selectedRoadmapItem.title,
                      summary: selectedRoadmapItem.summary,
                      phase: selectedRoadmapItem.phase,
                      status: selectedRoadmapItem.status,
                      planned_hours: selectedRoadmapItem.planned_hours ?? 0,
                      actual_hours: selectedRoadmapItem.actual_hours ?? 0,
                      start_date: selectedRoadmapItem.start_date,
                      end_date: selectedRoadmapItem.end_date,
                      is_public: selectedRoadmapItem.is_public,
                      sort_order: selectedRoadmapItem.sort_order,
                    }}
                    submitLabel="Update Milestone"
                    onSubmit={async (values) => handleRoadmapUpdate(item.id, values)}
                    onCancel={() => setEditingRoadmapId(null)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </AdminTable>

      <AdminTable title="Daily Logs" description="Add day-level updates for deep dive timeline cards.">
        <DailyLogForm roadmapItems={roadmapOptions} onSubmit={handleDailyLogCreate} submitLabel="Create Daily Log" />
        <div className="mt-4 space-y-3">
          {flatLogs.map((log) => (
            <div key={log.id} className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-100">{log.title}</p>
                  <p className="text-xs text-slate-400">
                    {log.log_date} - {log.roadmapTitle} - {log.status ?? 'no status'}
                  </p>
                  {log.notes && <p className="mt-1 text-sm text-slate-300">{log.notes}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingLogId((prev) => (prev === log.id ? null : log.id))}
                    className="rounded-lg border border-slate-600 px-3 py-1 text-xs text-slate-200 transition hover:bg-slate-800"
                  >
                    {editingLogId === log.id ? 'Close' : 'Edit'}
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDailyLogDelete(log.id)}
                    className="rounded-lg border border-rose-500/50 px-3 py-1 text-xs text-rose-200 transition hover:bg-rose-900/30"
                  >
                    <span className="inline-flex items-center gap-1">
                      <Trash2 size={12} /> Delete
                    </span>
                  </button>
                </div>
              </div>

              {editingLogId === log.id && selectedDailyLog && (
                <div className="mt-3">
                  <DailyLogForm
                    roadmapItems={roadmapOptions}
                    initialValues={{
                      roadmap_item_id: selectedDailyLog.roadmap_item_id,
                      log_date: selectedDailyLog.log_date,
                      title: selectedDailyLog.title,
                      notes: selectedDailyLog.notes,
                      status: selectedDailyLog.status,
                      planned_hours: selectedDailyLog.planned_hours ?? 0,
                      actual_hours: selectedDailyLog.actual_hours ?? 0,
                      is_public: selectedDailyLog.is_public,
                    }}
                    submitLabel="Update Daily Log"
                    onSubmit={async (values) => handleDailyLogUpdate(log.id, values)}
                    onCancel={() => setEditingLogId(null)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </AdminTable>

      <AdminTable title="Artifacts" description="Attach PR/demo/blog/doc links to milestones or specific daily logs.">
        <ArtifactForm
          roadmapItems={roadmapOptions}
          dailyLogs={dailyLogOptions}
          onSubmit={handleArtifactCreate}
          submitLabel="Create Artifact"
        />
        <div className="mt-4 space-y-3">
          {flatArtifacts.map((artifact) => (
            <div key={artifact.id} className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-100">{artifact.title}</p>
                  <p className="text-xs text-slate-400">
                    {artifact.type} - {artifact.roadmapTitle} - {artifact.is_public ? 'public' : 'private'}
                  </p>
                  <a
                    href={artifact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-xs text-cyan-300 transition hover:text-cyan-200"
                  >
                    {artifact.url}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingArtifactId((prev) => (prev === artifact.id ? null : artifact.id))}
                    className="rounded-lg border border-slate-600 px-3 py-1 text-xs text-slate-200 transition hover:bg-slate-800"
                  >
                    {editingArtifactId === artifact.id ? 'Close' : 'Edit'}
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleArtifactDelete(artifact.id)}
                    className="rounded-lg border border-rose-500/50 px-3 py-1 text-xs text-rose-200 transition hover:bg-rose-900/30"
                  >
                    <span className="inline-flex items-center gap-1">
                      <Trash2 size={12} /> Delete
                    </span>
                  </button>
                </div>
              </div>

              {editingArtifactId === artifact.id && selectedArtifact && (
                <div className="mt-3">
                  <ArtifactForm
                    roadmapItems={roadmapOptions}
                    dailyLogs={dailyLogOptions}
                    initialValues={{
                      roadmap_item_id: selectedArtifact.roadmap_item_id,
                      daily_log_id: selectedArtifact.daily_log_id,
                      type: selectedArtifact.type,
                      title: selectedArtifact.title,
                      url: selectedArtifact.url,
                      is_public: selectedArtifact.is_public,
                      sort_order: selectedArtifact.sort_order,
                    }}
                    submitLabel="Update Artifact"
                    onSubmit={async (values) => handleArtifactUpdate(artifact.id, values)}
                    onCancel={() => setEditingArtifactId(null)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </AdminTable>

      <AdminTable title="Tags (Optional)" description="Reusable labels for roadmap categorization.">
        <div className="grid gap-2 sm:grid-cols-3">
          <input
            value={newTagName}
            onChange={(event) => setNewTagName(event.target.value)}
            placeholder="Tag name"
            className="h-10 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
          />
          <input
            value={newTagColor}
            onChange={(event) => setNewTagColor(event.target.value)}
            placeholder="Color (optional)"
            className="h-10 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
          />
          <button
            type="button"
            onClick={() => void handleTagCreate()}
            className="rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Add Tag
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {data.tags.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center gap-2 rounded-full border border-slate-600 bg-slate-900 px-3 py-1 text-xs text-slate-200"
            >
              {tag.name}
              <button
                type="button"
                onClick={() => void handleTagDelete(tag)}
                className="text-rose-300 transition hover:text-rose-200"
                aria-label={`Delete tag ${tag.name}`}
              >
                x
              </button>
            </span>
          ))}
          {data.tags.length === 0 && <p className="text-xs text-slate-400">No tags yet.</p>}
        </div>
      </AdminTable>

      <p className="text-xs text-slate-500">
        Works in local mode by default. If Supabase is configured, the same UI actions use Supabase tables.
      </p>
    </div>
  );
}

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <header className="space-y-3 rounded-2xl border border-slate-700/60 bg-gradient-to-br from-slate-800/80 via-slate-900 to-slate-900 p-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-xs uppercase tracking-[0.15em] text-slate-300 transition hover:border-cyan-400/60 hover:text-cyan-300"
          >
            <ArrowLeft size={14} />
            Back To Portfolio
          </Link>
          <h1 className="text-3xl font-bold text-white md:text-4xl">Roadmap Admin Panel</h1>
          <p className="max-w-3xl text-sm text-slate-300">
            Daily update workspace for milestones, logs, and artifacts. Runs in local mode by default and can sync to Supabase when configured.
          </p>
        </header>

        <AdminAuthGate>{({ user, signOut }) => <AdminWorkspace user={user} signOut={signOut} />}</AdminAuthGate>
      </div>
    </main>
  );
}
