import { MONTH1, MONTH1_WEEK_MILESTONES } from '@/content/curriculum/month1';
import type {
  CurriculumDayTemplate,
  CurriculumProgress,
  CurriculumWeekGroup,
} from '@/types/curriculum';
import type { DailyLogRow, RoadmapItem, RoadmapItemInsert, RoadmapStatus } from '@/types/roadmap';

const CURRICULUM_PREFIX_PATTERN = /\bW([1-4])D([1-6])\b/i;

export function toCurriculumDayId(week: number, day: number): string {
  return `W${week}D${day}`;
}

export function groupByWeek(days: CurriculumDayTemplate[] = MONTH1): CurriculumWeekGroup[] {
  const weekMap = new Map<number, CurriculumDayTemplate[]>();

  for (const day of days) {
    const values = weekMap.get(day.week) ?? [];
    values.push(day);
    weekMap.set(day.week, values);
  }

  return Array.from(weekMap.entries())
    .sort((left, right) => left[0] - right[0])
    .map(([week, values]) => {
      const milestoneTitle = MONTH1_WEEK_MILESTONES.find((milestone) => milestone.week === week)?.title ?? `Week ${week}`;
      return {
        week,
        title: milestoneTitle,
        days: values.sort((left, right) => left.day - right.day),
      };
    });
}

export function parseCurriculumPrefix(input: string): string | null {
  const result = input.match(CURRICULUM_PREFIX_PATTERN);
  if (!result) {
    return null;
  }
  const week = Number(result[1]);
  const day = Number(result[2]);
  if (!Number.isFinite(week) || !Number.isFinite(day)) {
    return null;
  }
  return toCurriculumDayId(week, day);
}

export function detectCompletedDayIds(logs: DailyLogRow[]): Set<string> {
  const completed = new Set<string>();
  for (const log of logs) {
    const prefix = parseCurriculumPrefix(log.title);
    if (prefix) {
      completed.add(prefix);
    }
  }
  return completed;
}

export function computeProgress(
  days: CurriculumDayTemplate[],
  completedDayIds: Set<string>,
): CurriculumProgress {
  const totalDays = days.length;
  const completedDays = days.reduce(
    (count, day) => count + (completedDayIds.has(day.id) ? 1 : 0),
    0,
  );
  const percent = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;

  return {
    completedDays,
    totalDays,
    percent,
  };
}

export function getNextIncompleteDay(
  days: CurriculumDayTemplate[],
  completedDayIds: Set<string>,
): CurriculumDayTemplate | null {
  for (const day of days) {
    if (!completedDayIds.has(day.id)) {
      return day;
    }
  }
  return null;
}

export function buildTemplateDailyLog(day: CurriculumDayTemplate): {
  title: string;
  notes: string;
  plannedHours: number;
} {
  const links = day.videoLinks.map((link) => `- ${link.label}: ${link.url}`);
  const buildSteps = day.buildSteps.map((step, index) => `${index + 1}. ${step}`);
  const definitionOfDone = day.definitionOfDone.map((item, index) => `${index + 1}. ${item}`);

  const notes = [
    `Focus: ${day.focus}`,
    `Summary: ${day.summary}`,
    '',
    'Video Links:',
    ...links,
    '',
    'Build Steps:',
    ...buildSteps,
    '',
    'Definition of Done:',
    ...definitionOfDone,
    '',
    `Artifact Targets: ${day.artifactTargets.join(', ')}`,
  ].join('\n');

  return {
    title: `${day.id} — ${day.title}`,
    notes,
    plannedHours: day.plannedHours,
  };
}

function toStatus(week: number): RoadmapStatus {
  if (week === 1) {
    return 'in_progress';
  }
  return 'planned';
}

export function getWeekMilestoneInsert(
  week: number,
  userId: string,
  sortOrder: number,
): RoadmapItemInsert {
  const milestone = MONTH1_WEEK_MILESTONES.find((value) => value.week === week);
  if (!milestone) {
    throw new Error(`Week milestone not found: ${week}`);
  }

  const days = MONTH1.filter((day) => day.week === week);
  const startDate = days[0]?.suggestedDate ?? new Date().toISOString().slice(0, 10);
  const endDate = days[days.length - 1]?.suggestedDate ?? startDate;
  const plannedHours = days.reduce((sum, day) => sum + day.plannedHours, 0);

  return {
    user_id: userId,
    title: milestone.title,
    summary: milestone.summary,
    phase: 'Month 1 Curriculum',
    status: toStatus(week),
    planned_hours: plannedHours,
    actual_hours: 0,
    start_date: startDate,
    end_date: endDate,
    is_public: true,
    sort_order: sortOrder,
  };
}

export function findWeekMilestone(items: RoadmapItem[], week: number): RoadmapItem | null {
  const strictPrefix = `Week ${week} —`;
  const fallbackPrefix = `W${week}`;

  for (const item of items) {
    if (item.title.startsWith(strictPrefix) || item.title.startsWith(fallbackPrefix)) {
      return item;
    }
  }
  return null;
}
