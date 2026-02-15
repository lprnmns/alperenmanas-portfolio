import type {
  ArtifactRow,
  DailyLogRow,
  RoadmapItem,
  RoadmapItemRow,
  RoadmapStatus,
} from '@/types/roadmap';

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function toNumber(value: number | null): number {
  return value ?? 0;
}

export function calculateProgressPercent(
  status: RoadmapStatus,
  plannedHours: number | null,
  actualHours: number | null,
): number {
  if (status === 'done') {
    return 100;
  }

  const planned = toNumber(plannedHours);
  const actual = toNumber(actualHours);

  if (planned <= 0 || actual <= 0) {
    return 0;
  }

  return clamp(Math.round((actual / planned) * 100), 0, 100);
}

function groupByRoadmapItemId<T extends { roadmap_item_id: string | null }>(rows: T[]): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const row of rows) {
    if (!row.roadmap_item_id) {
      continue;
    }
    const current = grouped.get(row.roadmap_item_id) ?? [];
    current.push(row);
    grouped.set(row.roadmap_item_id, current);
  }
  return grouped;
}

function sortRoadmapItems(rows: RoadmapItemRow[]): RoadmapItemRow[] {
  return [...rows].sort((left, right) => {
    if (left.sort_order !== right.sort_order) {
      return left.sort_order - right.sort_order;
    }
    return left.start_date.localeCompare(right.start_date);
  });
}

function sortDailyLogs(rows: DailyLogRow[]): DailyLogRow[] {
  return [...rows].sort((left, right) => right.log_date.localeCompare(left.log_date));
}

function sortArtifacts(rows: ArtifactRow[]): ArtifactRow[] {
  return [...rows].sort((left, right) => {
    if (left.sort_order !== right.sort_order) {
      return left.sort_order - right.sort_order;
    }
    return right.created_at.localeCompare(left.created_at);
  });
}

export function mapRoadmapItems(
  roadmapRows: RoadmapItemRow[],
  dailyLogRows: DailyLogRow[],
  artifactRows: ArtifactRow[],
): RoadmapItem[] {
  const logsByRoadmapItemId = groupByRoadmapItemId(dailyLogRows);
  const artifactsByRoadmapItemId = groupByRoadmapItemId(artifactRows);

  return sortRoadmapItems(roadmapRows).map((row) => {
    const dailyLogs = sortDailyLogs(logsByRoadmapItemId.get(row.id) ?? []);
    const artifacts = sortArtifacts(artifactsByRoadmapItemId.get(row.id) ?? []);
    return {
      ...row,
      dailyLogs,
      artifacts,
      progressPercent: calculateProgressPercent(row.status, row.planned_hours, row.actual_hours),
    };
  });
}

export function toPhaseList(items: RoadmapItem[]): string[] {
  return Array.from(new Set(items.map((item) => item.phase))).sort((left, right) => left.localeCompare(right));
}
