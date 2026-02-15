'use client';

import type { RoadmapStatus } from '@/types/roadmap';

export type RoadmapFilterValues = {
  phase: string;
  status: RoadmapStatus | 'all';
  query: string;
};

type RoadmapFiltersProps = {
  phases: string[];
  value: RoadmapFilterValues;
  onChange: (nextValue: RoadmapFilterValues) => void;
};

export default function RoadmapFilters({ phases, value, onChange }: RoadmapFiltersProps) {
  return (
    <div className="grid gap-3 rounded-2xl border border-slate-700/60 bg-slate-800/60 p-4 sm:grid-cols-3">
      <input
        value={value.query}
        onChange={(event) => onChange({ ...value, query: event.target.value })}
        type="search"
        placeholder="Search milestones, notes, artifacts..."
        className="h-10 rounded-lg border border-slate-700 bg-slate-900 px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
      />
      <select
        value={value.phase}
        onChange={(event) => onChange({ ...value, phase: event.target.value })}
        className="h-10 rounded-lg border border-slate-700 bg-slate-900 px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
      >
        <option value="all">All Phases</option>
        {phases.map((phase) => (
          <option key={phase} value={phase}>
            {phase}
          </option>
        ))}
      </select>
      <select
        value={value.status}
        onChange={(event) => onChange({ ...value, status: event.target.value as RoadmapStatus | 'all' })}
        className="h-10 rounded-lg border border-slate-700 bg-slate-900 px-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
      >
        <option value="all">All Statuses</option>
        <option value="planned">Planned</option>
        <option value="in_progress">In Progress</option>
        <option value="blocked">Blocked</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
}
