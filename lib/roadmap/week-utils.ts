import type {
  ArtifactRow,
  DailyLogRow,
  RoadmapItem,
  WeekGroup,
  WeekItem,
} from '@/types/roadmap';

type MutableWeekGroup = {
  key: string;
  label: string;
  startDate: string;
  endDate: string;
  itemsByRoadmapId: Map<string, WeekItem>;
  totalPlannedHours: number;
  totalActualHours: number;
};

function getDateFromIsoDate(isoDate: string): Date {
  return new Date(`${isoDate}T00:00:00`);
}

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function getStartOfIsoWeek(date: Date): Date {
  const value = new Date(date);
  const day = value.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  value.setDate(value.getDate() + diff);
  value.setHours(0, 0, 0, 0);
  return value;
}

function getEndOfIsoWeek(start: Date): Date {
  const value = new Date(start);
  value.setDate(value.getDate() + 6);
  value.setHours(0, 0, 0, 0);
  return value;
}

function getWeekNumber(date: Date): number {
  const target = new Date(date.valueOf());
  const dayNumber = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNumber + 3);
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  const firstDayNumber = (firstThursday.getDay() + 6) % 7;
  firstThursday.setDate(firstThursday.getDate() - firstDayNumber + 3);
  const diff = target.getTime() - firstThursday.getTime();
  return 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000));
}

export function getIsoWeekKeyFromDate(date: Date): string {
  const start = getStartOfIsoWeek(date);
  const week = String(getWeekNumber(start)).padStart(2, '0');
  return `${start.getFullYear()}-W${week}`;
}

function getIsoWeekKeyFromDateValue(dateValue: string): string {
  return getIsoWeekKeyFromDate(getDateFromIsoDate(dateValue));
}

function formatWeekLabel(startDate: string, endDate: string): string {
  return `${startDate} - ${endDate}`;
}

function toHours(value: number | null): number {
  return value ?? 0;
}

function getLogWeekMap(logs: DailyLogRow[]): Map<string, DailyLogRow[]> {
  const grouped = new Map<string, DailyLogRow[]>();
  for (const log of logs) {
    const weekKey = getIsoWeekKeyFromDateValue(log.log_date);
    const values = grouped.get(weekKey) ?? [];
    values.push(log);
    grouped.set(weekKey, values);
  }
  return grouped;
}

function getArtifactWeekKey(artifact: ArtifactRow): string {
  return getIsoWeekKeyFromDateValue(artifact.created_at.slice(0, 10));
}

function buildWeekItem(
  item: RoadmapItem,
  logs: DailyLogRow[],
  artifacts: ArtifactRow[],
): WeekItem {
  const plannedHoursFromLogs = logs.reduce((sum, log) => sum + toHours(log.planned_hours), 0);
  const actualHoursFromLogs = logs.reduce((sum, log) => sum + toHours(log.actual_hours), 0);

  return {
    item,
    logs,
    artifacts,
    plannedHours: plannedHoursFromLogs > 0 ? plannedHoursFromLogs : toHours(item.planned_hours),
    actualHours: actualHoursFromLogs > 0 ? actualHoursFromLogs : toHours(item.actual_hours),
  };
}

function getOrCreateWeek(
  weekGroups: Map<string, MutableWeekGroup>,
  weekKey: string,
  sourceDate: string,
): MutableWeekGroup {
  const found = weekGroups.get(weekKey);
  if (found) {
    return found;
  }

  const start = getStartOfIsoWeek(getDateFromIsoDate(sourceDate));
  const end = getEndOfIsoWeek(start);
  const week: MutableWeekGroup = {
    key: weekKey,
    label: formatWeekLabel(toIsoDate(start), toIsoDate(end)),
    startDate: toIsoDate(start),
    endDate: toIsoDate(end),
    itemsByRoadmapId: new Map<string, WeekItem>(),
    totalPlannedHours: 0,
    totalActualHours: 0,
  };
  weekGroups.set(weekKey, week);
  return week;
}

export function buildWeekGroups(items: RoadmapItem[]): WeekGroup[] {
  const weekGroups = new Map<string, MutableWeekGroup>();

  for (const item of items) {
    const logsByWeek = getLogWeekMap(item.dailyLogs);
    const fallbackWeekKey = getIsoWeekKeyFromDateValue(item.start_date);
    const fallbackWeek = getOrCreateWeek(weekGroups, fallbackWeekKey, item.start_date);
    const relevantWeeks = logsByWeek.size > 0 ? Array.from(logsByWeek.keys()) : [fallbackWeekKey];

    for (const weekKey of relevantWeeks) {
      const baseDate = logsByWeek.get(weekKey)?.[0]?.log_date ?? item.start_date;
      const week = getOrCreateWeek(weekGroups, weekKey, baseDate);
      const logs = logsByWeek.get(weekKey) ?? [];
      const logIdSet = new Set(logs.map((log) => log.id));
      const artifacts = item.artifacts.filter((artifact) => {
        if (artifact.daily_log_id && logIdSet.has(artifact.daily_log_id)) {
          return true;
        }
        return getArtifactWeekKey(artifact) === weekKey;
      });
      const weekItem = buildWeekItem(item, logs, artifacts);
      week.itemsByRoadmapId.set(item.id, weekItem);
    }

    if (!fallbackWeek.itemsByRoadmapId.has(item.id)) {
      fallbackWeek.itemsByRoadmapId.set(item.id, buildWeekItem(item, [], item.artifacts));
    }
  }

  const groups: WeekGroup[] = [];
  for (const week of Array.from(weekGroups.values())) {
    const itemsInWeek = Array.from(week.itemsByRoadmapId.values()).sort((left, right) => {
      if (left.item.sort_order !== right.item.sort_order) {
        return left.item.sort_order - right.item.sort_order;
      }
      return left.item.start_date.localeCompare(right.item.start_date);
    });

    const totalPlannedHours = itemsInWeek.reduce((sum, item) => sum + item.plannedHours, 0);
    const totalActualHours = itemsInWeek.reduce((sum, item) => sum + item.actualHours, 0);

    groups.push({
      key: week.key,
      label: week.label,
      startDate: week.startDate,
      endDate: week.endDate,
      items: itemsInWeek,
      totalPlannedHours,
      totalActualHours,
    });
  }

  return groups.sort((left, right) => right.startDate.localeCompare(left.startDate));
}
