'use client';

import { useMemo, useState } from 'react';

import type { ArtifactType } from '@/types/roadmap';

export interface ArtifactRoadmapOption {
  id: string;
  title: string;
}

export interface ArtifactDailyLogOption {
  id: string;
  roadmap_item_id: string;
  title: string;
  log_date: string;
}

export interface ArtifactFormValues {
  roadmap_item_id: string | null;
  daily_log_id: string | null;
  type: ArtifactType;
  title: string;
  url: string;
  is_public: boolean;
  sort_order: number;
}

type ArtifactFormState = {
  roadmapItemId: string;
  dailyLogId: string;
  type: ArtifactType;
  title: string;
  url: string;
  isPublic: boolean;
  sortOrder: string;
};

type ArtifactFormProps = {
  roadmapItems: ArtifactRoadmapOption[];
  dailyLogs: ArtifactDailyLogOption[];
  initialValues?: Partial<ArtifactFormValues>;
  submitLabel?: string;
  onSubmit: (values: ArtifactFormValues) => Promise<void> | void;
  onCancel?: () => void;
};

function toState(
  roadmapItems: ArtifactRoadmapOption[],
  initialValues?: Partial<ArtifactFormValues>,
): ArtifactFormState {
  return {
    roadmapItemId: initialValues?.roadmap_item_id ?? roadmapItems[0]?.id ?? '',
    dailyLogId: initialValues?.daily_log_id ?? '',
    type: initialValues?.type ?? 'other',
    title: initialValues?.title ?? '',
    url: initialValues?.url ?? '',
    isPublic: initialValues?.is_public ?? true,
    sortOrder: String(initialValues?.sort_order ?? 0),
  };
}

export default function ArtifactForm({
  roadmapItems,
  dailyLogs,
  initialValues,
  submitLabel = 'Save Artifact',
  onSubmit,
  onCancel,
}: ArtifactFormProps) {
  const [state, setState] = useState<ArtifactFormState>(() => toState(roadmapItems, initialValues));
  const [saving, setSaving] = useState(false);

  const availableLogs = useMemo(
    () => dailyLogs.filter((log) => log.roadmap_item_id === state.roadmapItemId),
    [dailyLogs, state.roadmapItemId],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSubmit({
        roadmap_item_id: state.roadmapItemId || null,
        daily_log_id: state.dailyLogId || null,
        type: state.type,
        title: state.title.trim(),
        url: state.url.trim(),
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
        <select
          value={state.roadmapItemId}
          onChange={(event) => {
            const value = event.target.value;
            setState((prev) => ({ ...prev, roadmapItemId: value, dailyLogId: '' }));
          }}
          className="h-10 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
        >
          {roadmapItems.length === 0 && <option value="">No roadmap item</option>}
          {roadmapItems.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
        <select
          value={state.dailyLogId}
          onChange={(event) => setState((prev) => ({ ...prev, dailyLogId: event.target.value }))}
          className="h-10 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
        >
          <option value="">Attach to milestone</option>
          {availableLogs.map((log) => (
            <option key={log.id} value={log.id}>
              {log.log_date} - {log.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <select
          value={state.type}
          onChange={(event) => setState((prev) => ({ ...prev, type: event.target.value as ArtifactType }))}
          className="h-10 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
        >
          <option value="pr">Pull Request</option>
          <option value="demo">Demo</option>
          <option value="blog">Blog</option>
          <option value="repo">Repository</option>
          <option value="doc">Documentation</option>
          <option value="other">Other</option>
        </select>
        <input
          type="number"
          value={state.sortOrder}
          onChange={(event) => setState((prev) => ({ ...prev, sortOrder: event.target.value }))}
          placeholder="Sort order"
          className="h-10 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
        />
      </div>

      <input
        required
        value={state.title}
        onChange={(event) => setState((prev) => ({ ...prev, title: event.target.value }))}
        placeholder="Artifact title"
        className="h-10 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
      />
      <input
        required
        type="url"
        value={state.url}
        onChange={(event) => setState((prev) => ({ ...prev, url: event.target.value }))}
        placeholder="https://..."
        className="h-10 rounded-lg border border-slate-700 bg-slate-950 px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
      />

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
