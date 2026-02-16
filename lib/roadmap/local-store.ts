import { mapRoadmapItems, toPhaseList } from '@/lib/roadmap/mappers';
import type {
  AdminRoadmapDataSet,
  ArtifactInsert,
  ArtifactRow,
  ArtifactUpdate,
  DailyLogInsert,
  DailyLogRow,
  DailyLogUpdate,
  RoadmapDataSet,
  RoadmapFilters,
  RoadmapItemInsert,
  RoadmapItemRow,
  RoadmapItemUpdate,
  TagInsert,
  TagRow,
  TagUpdate,
} from '@/types/roadmap';

const STORAGE_KEY = 'am_roadmap_local_db_v1';

type LocalRoadmapDb = {
  roadmap_items: RoadmapItemRow[];
  daily_logs: DailyLogRow[];
  artifacts: ArtifactRow[];
  tags: TagRow[];
};

const SEEDED_OWNER_ID = 'local-owner';
const SEEDED_CREATED_AT = '2026-02-16T10:30:00.000Z';
const SEEDED_UPDATED_AT = '2026-02-16T10:35:00.000Z';
const SEEDED_ROADMAP_ITEM_ID = 'seed-week1-tooling-baseline';
const SEEDED_DAILY_LOG_ID = 'seed-w1d1-shell-basics';

const SEEDED_DB: LocalRoadmapDb = {
  roadmap_items: [
    {
      id: SEEDED_ROADMAP_ITEM_ID,
      user_id: SEEDED_OWNER_ID,
      title: 'Week 1 - Tooling Baseline',
      summary: 'Shell basics and toolbox repo setup completed for Day 1.',
      phase: 'Month 1 Curriculum',
      status: 'in_progress',
      planned_hours: 9,
      actual_hours: 1.5,
      start_date: '2026-02-16',
      end_date: '2026-02-22',
      is_public: true,
      sort_order: 10,
      created_at: SEEDED_CREATED_AT,
      updated_at: SEEDED_UPDATED_AT,
    },
  ],
  daily_logs: [
    {
      id: SEEDED_DAILY_LOG_ID,
      roadmap_item_id: SEEDED_ROADMAP_ITEM_ID,
      user_id: SEEDED_OWNER_ID,
      log_date: '2026-02-16',
      title: 'W1D1 - Shell basics + toolbox repo',
      notes: [
        '- Created toolbox/ with scripts/ and notes/ folders.',
        '- Added CLI cheatsheet for ls, grep, find, cat, and pipe examples.',
        '- Added executable helper script and toolbox README with usage commands.',
      ].join('\n'),
      status: 'done',
      planned_hours: 1.5,
      actual_hours: 1.5,
      is_public: true,
      created_at: SEEDED_CREATED_AT,
      updated_at: SEEDED_UPDATED_AT,
    },
  ],
  artifacts: [
    {
      id: 'seed-artifact-w1d1-ai-eng-studies',
      roadmap_item_id: SEEDED_ROADMAP_ITEM_ID,
      daily_log_id: SEEDED_DAILY_LOG_ID,
      user_id: SEEDED_OWNER_ID,
      type: 'repo',
      title: 'W1D1 Artifact - ai-eng-studies',
      url: 'https://github.com/lprnmns/ai-eng-studies',
      is_public: true,
      sort_order: 10,
      created_at: SEEDED_UPDATED_AT,
    },
  ],
  tags: [],
};

function getNowIso(): string {
  return new Date().toISOString();
}

function createId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function cloneDb(db: LocalRoadmapDb): LocalRoadmapDb {
  return {
    roadmap_items: [...db.roadmap_items],
    daily_logs: [...db.daily_logs],
    artifacts: [...db.artifacts],
    tags: [...db.tags],
  };
}

function isDbEmpty(db: LocalRoadmapDb): boolean {
  return db.roadmap_items.length === 0 && db.daily_logs.length === 0 && db.artifacts.length === 0 && db.tags.length === 0;
}

function getSeededDb(): LocalRoadmapDb {
  return cloneDb(SEEDED_DB);
}

function readDb(): LocalRoadmapDb {
  if (typeof window === 'undefined') {
    return getSeededDb();
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return getSeededDb();
  }

  try {
    const parsed = JSON.parse(raw) as Partial<LocalRoadmapDb>;
    const normalized: LocalRoadmapDb = {
      roadmap_items: parsed.roadmap_items ?? [],
      daily_logs: parsed.daily_logs ?? [],
      artifacts: parsed.artifacts ?? [],
      tags: parsed.tags ?? [],
    };
    if (isDbEmpty(normalized)) {
      return getSeededDb();
    }
    return normalized;
  } catch {
    return getSeededDb();
  }
}

function writeDb(db: LocalRoadmapDb): void {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

function applyPublicFilters(rows: RoadmapItemRow[], filters: RoadmapFilters): RoadmapItemRow[] {
  return rows.filter((row) => {
    if (!row.is_public) {
      return false;
    }
    if (filters.phase && filters.phase !== 'all' && row.phase !== filters.phase) {
      return false;
    }
    if (filters.status && filters.status !== 'all' && row.status !== filters.status) {
      return false;
    }
    if (filters.query && filters.query.trim().length > 0) {
      const term = filters.query.trim().toLowerCase();
      const title = row.title.toLowerCase();
      const summary = (row.summary ?? '').toLowerCase();
      if (!title.includes(term) && !summary.includes(term)) {
        return false;
      }
    }
    return true;
  });
}

export function fetchPublicRoadmapLocal(filters: RoadmapFilters = {}): RoadmapDataSet {
  const db = readDb();
  const roadmapRows = applyPublicFilters(db.roadmap_items, filters);
  const roadmapIds = new Set(roadmapRows.map((row) => row.id));
  const dailyLogs = db.daily_logs.filter((row) => roadmapIds.has(row.roadmap_item_id) && row.is_public);
  const artifacts = db.artifacts.filter((row) => row.roadmap_item_id && roadmapIds.has(row.roadmap_item_id) && row.is_public);
  const items = mapRoadmapItems(roadmapRows, dailyLogs, artifacts);

  return {
    items,
    phases: toPhaseList(items),
  };
}

export function fetchAdminRoadmapLocal(ownerUserId: string): AdminRoadmapDataSet {
  const db = readDb();
  const roadmapRows = db.roadmap_items.filter((row) => row.user_id === ownerUserId);
  const roadmapIds = new Set(roadmapRows.map((row) => row.id));
  const dailyLogs = db.daily_logs.filter((row) => roadmapIds.has(row.roadmap_item_id));
  const artifacts = db.artifacts.filter((row) => row.roadmap_item_id && roadmapIds.has(row.roadmap_item_id));

  return {
    items: mapRoadmapItems(roadmapRows, dailyLogs, artifacts),
    tags: db.tags.filter((row) => row.user_id === ownerUserId),
  };
}

export function createRoadmapItemLocal(payload: RoadmapItemInsert): RoadmapItemRow {
  const db = readDb();
  const now = getNowIso();
  const row: RoadmapItemRow = {
    id: createId(),
    ...payload,
    created_at: now,
    updated_at: now,
  };
  db.roadmap_items.push(row);
  writeDb(db);
  return row;
}

export function updateRoadmapItemLocal(id: string, payload: RoadmapItemUpdate): RoadmapItemRow {
  const db = readDb();
  const index = db.roadmap_items.findIndex((row) => row.id === id);
  if (index < 0) {
    throw new Error('Roadmap item not found');
  }
  const updated: RoadmapItemRow = {
    ...db.roadmap_items[index],
    ...payload,
    updated_at: getNowIso(),
  };
  db.roadmap_items[index] = updated;
  writeDb(db);
  return updated;
}

export function deleteRoadmapItemLocal(id: string): void {
  const db = readDb();
  db.roadmap_items = db.roadmap_items.filter((row) => row.id !== id);
  const removedLogIds = new Set(db.daily_logs.filter((log) => log.roadmap_item_id === id).map((log) => log.id));
  db.daily_logs = db.daily_logs.filter((log) => log.roadmap_item_id !== id);
  db.artifacts = db.artifacts.filter((artifact) => artifact.roadmap_item_id !== id && !(artifact.daily_log_id && removedLogIds.has(artifact.daily_log_id)));
  writeDb(db);
}

export function createDailyLogLocal(payload: DailyLogInsert): DailyLogRow {
  const db = readDb();
  const now = getNowIso();
  const row: DailyLogRow = {
    id: createId(),
    ...payload,
    created_at: now,
    updated_at: now,
  };
  db.daily_logs.push(row);
  writeDb(db);
  return row;
}

export function updateDailyLogLocal(id: string, payload: DailyLogUpdate): DailyLogRow {
  const db = readDb();
  const index = db.daily_logs.findIndex((row) => row.id === id);
  if (index < 0) {
    throw new Error('Daily log not found');
  }
  const updated: DailyLogRow = {
    ...db.daily_logs[index],
    ...payload,
    updated_at: getNowIso(),
  };
  db.daily_logs[index] = updated;
  writeDb(db);
  return updated;
}

export function deleteDailyLogLocal(id: string): void {
  const db = readDb();
  db.daily_logs = db.daily_logs.filter((row) => row.id !== id);
  db.artifacts = db.artifacts.filter((artifact) => artifact.daily_log_id !== id);
  writeDb(db);
}

export function createArtifactLocal(payload: ArtifactInsert): ArtifactRow {
  const db = readDb();
  const row: ArtifactRow = {
    id: createId(),
    ...payload,
    created_at: getNowIso(),
  };
  db.artifacts.push(row);
  writeDb(db);
  return row;
}

export function updateArtifactLocal(id: string, payload: ArtifactUpdate): ArtifactRow {
  const db = readDb();
  const index = db.artifacts.findIndex((row) => row.id === id);
  if (index < 0) {
    throw new Error('Artifact not found');
  }
  const updated: ArtifactRow = {
    ...db.artifacts[index],
    ...payload,
  };
  db.artifacts[index] = updated;
  writeDb(db);
  return updated;
}

export function deleteArtifactLocal(id: string): void {
  const db = readDb();
  db.artifacts = db.artifacts.filter((row) => row.id !== id);
  writeDb(db);
}

export function createTagLocal(payload: TagInsert): TagRow {
  const db = readDb();
  const row: TagRow = {
    id: createId(),
    ...payload,
    created_at: getNowIso(),
  };
  db.tags.push(row);
  writeDb(db);
  return row;
}

export function updateTagLocal(id: string, payload: TagUpdate): TagRow {
  const db = readDb();
  const index = db.tags.findIndex((row) => row.id === id);
  if (index < 0) {
    throw new Error('Tag not found');
  }
  const updated: TagRow = {
    ...db.tags[index],
    ...payload,
  };
  db.tags[index] = updated;
  writeDb(db);
  return updated;
}

export function deleteTagLocal(id: string): void {
  const db = readDb();
  db.tags = db.tags.filter((row) => row.id !== id);
  writeDb(db);
}
