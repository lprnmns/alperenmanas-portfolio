'use client';

import { useState } from 'react';

import type { RoadmapStatus } from '@/types/roadmap';

function getTodayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

export interface DailyLogOption {
  id: string;
  title: string;
}

export interface DailyLogFormValues {
  roadmap_item_id: string;
  log_date: string;
  title: string;
  notes: string | null;
  status: RoadmapStatus | null;
  planned_hours: number;
  actual_hours: number;
  is_public: boolean;
}

type DailyLogFormProps = {
  roadmapItems: DailyLogOption[];
  initialValues?: Partial<DailyLogFormValues>;
  submitLabel?: string;
  onSubmit: (values: DailyLogFormValues) => Promise<void> | void;
  onCancel?: () => void;
};

type DailyLogFormState = {
  roadmapItemId: string;
  logDate: string;
  title: string;
  notes: string;
  status: RoadmapStatus | 'none';
  plannedHours: string;
  actualHours: string;
  isPublic: boolean;
};

function toFormState(
  roadmapItems: DailyLogOption[],
  initialValues?: Partial<DailyLogFormValues>,
): DailyLogFormState {
  return {
    roadmapItemId: initialValues?.roadmap_item_id ?? roadmapItems[0]?.id ?? '',
    logDate: initialValues?.log_date ?? getTodayIsoDate(),
    title: initialValues?.title ?? '',
    notes: initialValues?.notes ?? '',
    status: initialValues?.status ?? 'none',
    plannedHours: String(initialValues?.planned_hours ?? 0),
    actualHours: String(initialValues?.actual_hours ?? 0),
    isPublic: initialValues?.is_public ?? true,
  };
}

export default function DailyLogForm({
  roadmapItems,
  initialValues,
  submitLabel = 'Save Log',
  onSubmit,
  onCancel,
}: DailyLogFormProps) {
  const [state, setState] = useState<DailyLogFormState>(() => toFormState(roadmapItems, initialValues));
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSubmit({
        roadmap_item_id: state.roadmapItemId,
        log_date: state.logDate,
        title: state.title.trim(),
        notes: state.notes.trim().length > 0 ? state.notes.trim() : null,
        status: state.status === 'none' ? null : state.status,
        planned_hours: Number(state.plannedHours) || 0,
        actual_hours: Number(state.actualHours) || 0,
        is_public: state.isPublic,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 rounded-xl border border-slate-700/60 bg-slate-900/60 p-4">
      <div className="grid gap-2 sm:grid-cols-2">
        <select
          required
          value={state.roadmapItemId}
          onChange={(event) => setState((prev) => ({ ...prev, roadmapItemId: event.target.value }))}
          className="h-10 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
        >
          {roadmapItems.length === 0 && <option value="">No roadmap item</option>}
          {roadmapItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
        <input
          type="date"
          required
          value={state.logDate}
          onChange={(event) => setState((prev) => ({ ...prev, logDate: event.target.value }))}
          className="h-10 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
        />
      </div>

      <input
        required
        value={state.title}
        onChange={(event) => setState((prev) => ({ ...prev, title: event.target.value }))}
        placeholder="Daily update title"
        className="h-10 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
      />

      <textarea
        rows={3}
        value={state.notes}
        onChange={(event) => setState((prev) => ({ ...prev, notes: event.target.value }))}
        placeholder="What changed today?"
        className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
      />

      <div className="grid gap-2 sm:grid-cols-3">
        <select
          value={state.status}
          onChange={(event) => setState((prev) => ({ ...prev, status: event.target.value as RoadmapStatus | 'none' }))}
          className="h-10 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
        >
          <option value="none">No status change</option>
          <option value="planned">Planned</option>
          <option value="in_progress">In Progress</option>
          <option value="blocked">Blocked</option>
          <option value="done">Done</option>
        </select>
        <input
          type="number"
          step="0.5"
          value={state.plannedHours}
          onChange={(event) => setState((prev) => ({ ...prev, plannedHours: event.target.value }))}
          placeholder="Planned hours"
          className="h-10 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
        />
        <input
          type="number"
          step="0.5"
          value={state.actualHours}
          onChange={(event) => setState((prev) => ({ ...prev, actualHours: event.target.value }))}
          placeholder="Actual hours"
          className="h-10 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
        />
      </div>

      <label className="inline-flex items-center gap-2 text-sm text-slate-200">
        <input
          type="checkbox"
          checked={state.isPublic}
          onChange={(event) => setState((prev) => ({ ...prev, isPublic: event.target.checked }))}
          className="h-4 w-4 rounded border-slate-600"
        />
        Publicly visible
      </label>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="submit"
          disabled={saving || roadmapItems.length === 0}
          className="rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {saving ? 'Saving...' : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
