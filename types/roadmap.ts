export const ROADMAP_STATUSES = ['planned', 'in_progress', 'blocked', 'done'] as const;
export type RoadmapStatus = (typeof ROADMAP_STATUSES)[number];

export const ARTIFACT_TYPES = ['pr', 'demo', 'blog', 'repo', 'doc', 'other'] as const;
export type ArtifactType = (typeof ARTIFACT_TYPES)[number];

export interface RoadmapFilters {
  phase?: string;
  status?: RoadmapStatus | 'all';
  query?: string;
}

export interface RoadmapItemRow {
  id: string;
  user_id: string;
  title: string;
  summary: string | null;
  phase: string;
  status: RoadmapStatus;
  planned_hours: number | null;
  actual_hours: number | null;
  start_date: string;
  end_date: string | null;
  is_public: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface DailyLogRow {
  id: string;
  roadmap_item_id: string;
  user_id: string;
  log_date: string;
  title: string;
  notes: string | null;
  status: RoadmapStatus | null;
  planned_hours: number | null;
  actual_hours: number | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface ArtifactRow {
  id: string;
  roadmap_item_id: string | null;
  daily_log_id: string | null;
  user_id: string;
  type: ArtifactType;
  title: string;
  url: string;
  is_public: boolean;
  sort_order: number;
  created_at: string;
}

export interface TagRow {
  id: string;
  user_id: string;
  name: string;
  color: string | null;
  created_at: string;
}

export interface RoadmapItemTagRow {
  roadmap_item_id: string;
  tag_id: string;
}

export type RoadmapItemInsert = Omit<RoadmapItemRow, 'id' | 'created_at' | 'updated_at'>;
export type RoadmapItemUpdate = Partial<Omit<RoadmapItemInsert, 'user_id'>>;

export type DailyLogInsert = Omit<DailyLogRow, 'id' | 'created_at' | 'updated_at'>;
export type DailyLogUpdate = Partial<Omit<DailyLogInsert, 'user_id' | 'roadmap_item_id'>>;

export type ArtifactInsert = Omit<ArtifactRow, 'id' | 'created_at'>;
export type ArtifactUpdate = Partial<Omit<ArtifactInsert, 'user_id'>>;

export type TagInsert = Omit<TagRow, 'id' | 'created_at'>;
export type TagUpdate = Partial<Omit<TagInsert, 'user_id'>>;

export interface RoadmapItem extends RoadmapItemRow {
  dailyLogs: DailyLogRow[];
  artifacts: ArtifactRow[];
  progressPercent: number;
}

export interface RoadmapDataSet {
  items: RoadmapItem[];
  phases: string[];
}

export interface AdminRoadmapDataSet {
  items: RoadmapItem[];
  tags: TagRow[];
}

export interface WeekItem {
  item: RoadmapItem;
  logs: DailyLogRow[];
  artifacts: ArtifactRow[];
  plannedHours: number;
  actualHours: number;
}

export interface WeekGroup {
  key: string;
  label: string;
  startDate: string;
  endDate: string;
  items: WeekItem[];
  totalPlannedHours: number;
  totalActualHours: number;
}
