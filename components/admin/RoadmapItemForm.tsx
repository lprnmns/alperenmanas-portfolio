'use client';

import { useMemo, useState } from 'react';

import type { RoadmapStatus } from '@/types/roadmap';

function getTodayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

type RoadmapItemFormState = {
  title: string;
  summary: string;
  phase: string;
  status: RoadmapStatus;
  plannedHours: string;
  actualHours: string;
  startDate: string;
  endDate: string;
  isPublic: boolean;
  sortOrder: string;
};

export interface RoadmapItemFormValues {
  title: string;
  summary: string | null;
  phase: string;
  status: RoadmapStatus;
  planned_hours: number;
  actual_hours: number;
  start_date: string;
  end_date: string | null;
  is_public: boolean;
  sort_order: number;
}

type RoadmapItemFormProps = {
  initialValues?: Partial<RoadmapItemFormValues>;
  submitLabel?: string;
  onSubmit: (values: RoadmapItemFormValues) => Promise<void> | void;
  onCancel?: () => void;
};

function toFormState(initialValues?: Partial<RoadmapItemFormValues>): RoadmapItemFormState {
  return {
    title: initialValues?.title ?? '',
    summary: initialValues?.summary ?? '',
    phase: initialValues?.phase ?? 'Execution',
    status: initialValues?.status ?? 'planned',
    plannedHours: String(initialValues?.planned_hours ?? 0),
    actualHours: String(initialValues?.actual_hours ?? 0),
    startDate: initialValues?.start_date ?? getTodayIsoDate(),
    endDate: initialValues?.end_date ?? '',
    isPublic: initialValues?.is_public ?? true,
    sortOrder: String(initialValues?.sort_order ?? 0),
  };
}

export default function RoadmapItemForm({
  initialValues,
  submitLabel = 'Save Item',
  onSubmit,
  onCancel,
}: RoadmapItemFormProps) {
  const [state, setState] = useState<RoadmapItemFormState>(() => toFormState(initialValues));
  const [saving, setSaving] = useState(false);

  const statusOptions = useMemo(
    () => [
      { value: 'planned', label: 'Planned' },
      { value: 'in_progress', label: 'In Progress' },
      { value: 'blocked', label: 'Blocked' },
      { value: 'done', label: 'Done' },
    ] as const,
    [],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSubmit({
        title: state.title.trim(),
        summary: state.summary.trim().length > 0 ? state.summary.trim() : null,
        phase: state.phase.trim(),
        status: state.status,
        planned_hours: Number(state.plannedHours) || 0,
        actual_hours: Number(state.actualHours) || 0,
        start_date: state.startDate,
        end_date: state.endDate || null,
        is_public: state.isPublic,
        sort_order: Number(state.sortOrder) || 0,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 rounded-xl border border-slate-700/60 bg-slate-900/60 p-4">
      <div className="grid gap-2 sm:grid-cols-2">
        <input
          required
          value={state.title}
          onChange={(event) => setState((prev) => ({ ...prev, title: event.target.value }))}
          placeholder="Milestone title"
          className="h-10 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
        />
        <input
          required
          value={state.phase}
          onChange={(event) => setState((prev) => ({ ...prev, phase: event.target.value }))}
          placeholder="Phase (ex: Discovery)"
          className="h-10 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
        />
      </div>

      <textarea
        value={state.summary}
        onChange={(event) => setState((prev) => ({ ...prev, summary: event.target.value }))}
        placeholder="Summary"
        rows={3}
        className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
      />

      <div className="grid gap-2 sm:grid-cols-3">
        <select
          value={state.status}
          onChange={(event) => setState((prev) => ({ ...prev, status: event.target.value as RoadmapStatus }))}
          className="h-10 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
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

      <div className="grid gap-2 sm:grid-cols-3">
        <input
          type="date"
          required
          value={state.startDate}
          onChange={(event) => setState((prev) => ({ ...prev, startDate: event.target.value }))}
          className="h-10 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
        />
        <input
          type="date"
          value={state.endDate}
          onChange={(event) => setState((prev) => ({ ...prev, endDate: event.target.value }))}
          className="h-10 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
        />
        <input
          type="number"
          value={state.sortOrder}
          onChange={(event) => setState((prev) => ({ ...prev, sortOrder: event.target.value }))}
          placeholder="Sort order"
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
          disabled={saving}
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
