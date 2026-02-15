import { getSupabaseBrowserClient, isSupabaseConfigured } from '@/lib/supabase/client';
import {
  createArtifactLocal,
  createDailyLogLocal,
  createRoadmapItemLocal,
  createTagLocal,
  deleteArtifactLocal,
  deleteDailyLogLocal,
  deleteRoadmapItemLocal,
  deleteTagLocal,
  fetchAdminRoadmapLocal,
  fetchPublicRoadmapLocal,
  updateArtifactLocal,
  updateDailyLogLocal,
  updateRoadmapItemLocal,
  updateTagLocal,
} from '@/lib/roadmap/local-store';
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

function ensureSuccess(error: { message: string } | null, context: string): void {
  if (error) {
    throw new Error(`${context}: ${error.message}`);
  }
}

function sanitizeSearchTerm(value: string): string {
  return value.replace(/[%_,']/g, ' ').trim();
}

async function fetchPublicRoadmapRows(filters: RoadmapFilters): Promise<RoadmapItemRow[]> {
  const supabase = getSupabaseBrowserClient();

  let query = supabase.from('roadmap_items').select('*').eq('is_public', true);

  if (filters.phase && filters.phase !== 'all') {
    query = query.eq('phase', filters.phase);
  }

  if (filters.status && filters.status !== 'all') {
    query = query.eq('status', filters.status);
  }

  if (filters.query && filters.query.trim().length > 0) {
    const term = sanitizeSearchTerm(filters.query);
    if (term) {
      query = query.or(`title.ilike.%${term}%,summary.ilike.%${term}%`);
    }
  }

  const { data, error } = await query
    .order('sort_order', { ascending: true })
    .order('start_date', { ascending: true });

  ensureSuccess(error, 'Failed to fetch public roadmap items');

  return (data ?? []) as RoadmapItemRow[];
}

async function fetchAdminRoadmapRows(ownerUserId: string): Promise<RoadmapItemRow[]> {
  const supabase = getSupabaseBrowserClient();

  const { data, error } = await supabase
    .from('roadmap_items')
    .select('*')
    .eq('user_id', ownerUserId)
    .order('sort_order', { ascending: true })
    .order('start_date', { ascending: true });

  ensureSuccess(error, 'Failed to fetch admin roadmap items');

  return (data ?? []) as RoadmapItemRow[];
}

async function fetchDailyLogs(roadmapItemIds: string[], includePrivate: boolean): Promise<DailyLogRow[]> {
  if (roadmapItemIds.length === 0) {
    return [];
  }

  const supabase = getSupabaseBrowserClient();
  let query = supabase.from('daily_logs').select('*').in('roadmap_item_id', roadmapItemIds);
  if (!includePrivate) {
    query = query.eq('is_public', true);
  }

  const { data, error } = await query.order('log_date', { ascending: false });
  ensureSuccess(error, 'Failed to fetch daily logs');

  return (data ?? []) as DailyLogRow[];
}

async function fetchArtifacts(roadmapItemIds: string[], includePrivate: boolean): Promise<ArtifactRow[]> {
  if (roadmapItemIds.length === 0) {
    return [];
  }

  const supabase = getSupabaseBrowserClient();
  let query = supabase.from('artifacts').select('*').in('roadmap_item_id', roadmapItemIds);
  if (!includePrivate) {
    query = query.eq('is_public', true);
  }

  const { data, error } = await query
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  ensureSuccess(error, 'Failed to fetch artifacts');

  return (data ?? []) as ArtifactRow[];
}

export async function fetchPublicRoadmap(filters: RoadmapFilters = {}): Promise<RoadmapDataSet> {
  if (!isSupabaseConfigured()) {
    return fetchPublicRoadmapLocal(filters);
  }

  const roadmapRows = await fetchPublicRoadmapRows(filters);
  const roadmapIds = roadmapRows.map((item) => item.id);
  const [dailyLogs, artifacts] = await Promise.all([
    fetchDailyLogs(roadmapIds, false),
    fetchArtifacts(roadmapIds, false),
  ]);
  const items = mapRoadmapItems(roadmapRows, dailyLogs, artifacts);

  return {
    items,
    phases: toPhaseList(items),
  };
}

export async function fetchAdminRoadmap(ownerUserId: string): Promise<AdminRoadmapDataSet> {
  if (!isSupabaseConfigured()) {
    return fetchAdminRoadmapLocal(ownerUserId);
  }

  const supabase = getSupabaseBrowserClient();
  const roadmapRows = await fetchAdminRoadmapRows(ownerUserId);
  const roadmapIds = roadmapRows.map((item) => item.id);

  const [dailyLogs, artifacts, tagsResult] = await Promise.all([
    fetchDailyLogs(roadmapIds, true),
    fetchArtifacts(roadmapIds, true),
    supabase.from('tags').select('*').eq('user_id', ownerUserId).order('name', { ascending: true }),
  ]);

  ensureSuccess(tagsResult.error, 'Failed to fetch tags');

  return {
    items: mapRoadmapItems(roadmapRows, dailyLogs, artifacts),
    tags: (tagsResult.data ?? []) as TagRow[],
  };
}

export async function createRoadmapItem(payload: RoadmapItemInsert): Promise<RoadmapItemRow> {
  if (!isSupabaseConfigured()) {
    return createRoadmapItemLocal(payload);
  }

  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from('roadmap_items')
    .insert(payload)
    .select('*')
    .single();

  ensureSuccess(error, 'Failed to create roadmap item');
  return data as RoadmapItemRow;
}

export async function updateRoadmapItem(id: string, payload: RoadmapItemUpdate): Promise<RoadmapItemRow> {
  if (!isSupabaseConfigured()) {
    return updateRoadmapItemLocal(id, payload);
  }

  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from('roadmap_items')
    .update(payload)
    .eq('id', id)
    .select('*')
    .single();

  ensureSuccess(error, 'Failed to update roadmap item');
  return data as RoadmapItemRow;
}

export async function deleteRoadmapItem(id: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    deleteRoadmapItemLocal(id);
    return;
  }

  const supabase = getSupabaseBrowserClient();
  const { error } = await supabase.from('roadmap_items').delete().eq('id', id);
  ensureSuccess(error, 'Failed to delete roadmap item');
}

export async function createDailyLog(payload: DailyLogInsert): Promise<DailyLogRow> {
  if (!isSupabaseConfigured()) {
    return createDailyLogLocal(payload);
  }

  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase.from('daily_logs').insert(payload).select('*').single();
  ensureSuccess(error, 'Failed to create daily log');
  return data as DailyLogRow;
}

export async function updateDailyLog(id: string, payload: DailyLogUpdate): Promise<DailyLogRow> {
  if (!isSupabaseConfigured()) {
    return updateDailyLogLocal(id, payload);
  }

  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from('daily_logs')
    .update(payload)
    .eq('id', id)
    .select('*')
    .single();

  ensureSuccess(error, 'Failed to update daily log');
  return data as DailyLogRow;
}

export async function deleteDailyLog(id: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    deleteDailyLogLocal(id);
    return;
  }

  const supabase = getSupabaseBrowserClient();
  const { error } = await supabase.from('daily_logs').delete().eq('id', id);
  ensureSuccess(error, 'Failed to delete daily log');
}

export async function createArtifact(payload: ArtifactInsert): Promise<ArtifactRow> {
  if (!isSupabaseConfigured()) {
    return createArtifactLocal(payload);
  }

  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase.from('artifacts').insert(payload).select('*').single();
  ensureSuccess(error, 'Failed to create artifact');
  return data as ArtifactRow;
}

export async function updateArtifact(id: string, payload: ArtifactUpdate): Promise<ArtifactRow> {
  if (!isSupabaseConfigured()) {
    return updateArtifactLocal(id, payload);
  }

  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from('artifacts')
    .update(payload)
    .eq('id', id)
    .select('*')
    .single();

  ensureSuccess(error, 'Failed to update artifact');
  return data as ArtifactRow;
}

export async function deleteArtifact(id: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    deleteArtifactLocal(id);
    return;
  }

  const supabase = getSupabaseBrowserClient();
  const { error } = await supabase.from('artifacts').delete().eq('id', id);
  ensureSuccess(error, 'Failed to delete artifact');
}

export async function createTag(payload: TagInsert): Promise<TagRow> {
  if (!isSupabaseConfigured()) {
    return createTagLocal(payload);
  }

  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase.from('tags').insert(payload).select('*').single();
  ensureSuccess(error, 'Failed to create tag');
  return data as TagRow;
}

export async function updateTag(id: string, payload: TagUpdate): Promise<TagRow> {
  if (!isSupabaseConfigured()) {
    return updateTagLocal(id, payload);
  }

  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase.from('tags').update(payload).eq('id', id).select('*').single();
  ensureSuccess(error, 'Failed to update tag');
  return data as TagRow;
}

export async function deleteTag(id: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    deleteTagLocal(id);
    return;
  }

  const supabase = getSupabaseBrowserClient();
  const { error } = await supabase.from('tags').delete().eq('id', id);
  ensureSuccess(error, 'Failed to delete tag');
}
