import { MONTH1, type CurriculumDay } from '@/content/curriculum/month1';
import type {
  CurriculumProgress,
  CurriculumWeekGroup,
  CurriculumWeekMilestone,
} from '@/types/curriculum';
import type { DailyLogRow, RoadmapItem, RoadmapItemInsert, RoadmapStatus } from '@/types/roadmap';

const CURRICULUM_PREFIX_PATTERN = /\bW([1-4])D([1-6])\b/i;

export const MONTH1_WEEK_MILESTONES: CurriculumWeekMilestone[] = [
  {
    week: 1,
    title: 'Week 1 - Tooling Baseline',
    summary: 'Shell, git fundamentals, debugging habits, and linear algebra warmup.',
  },
  {
    week: 2,
    title: 'Week 2 - Python Engineering',
    summary: 'OOP, typing, testing, and clean refactor discipline in Python.',
  },
  {
    week: 3,
    title: 'Week 3 - Data and SQL Foundations',
    summary: 'Pandas workflows, SQL practice, and EDA-driven insight writing.',
  },
  {
    week: 4,
    title: 'Week 4 - Titanic Mini Project',
    summary: 'End-to-end mini project with feature engineering and final report.',
  },
];

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function getCurriculumBaseDate(): Date {
  return new Date(Date.UTC(2026, 0, 5));
}

export function toCurriculumDayId(week: number, day: number): string {
  return `W${week}D${day}`;
}

export function getCurriculumSuggestedDate(day: CurriculumDay): string {
  const base = getCurriculumBaseDate();
  const offset = (day.week - 1) * 7 + (day.day - 1);
  base.setUTCDate(base.getUTCDate() + offset);
  return toIsoDate(base);
}

export function groupByWeek(days: CurriculumDay[] = MONTH1): CurriculumWeekGroup[] {
  const weekMap = new Map<number, CurriculumDay[]>();

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
  days: CurriculumDay[],
  completedDayIds: Set<string>,
): CurriculumProgress {
  const totalDays = days.length;
  const completedDays = days.reduce(
    (count, day) => count + (completedDayIds.has(day.key) ? 1 : 0),
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
  days: CurriculumDay[],
  completedDayIds: Set<string>,
): CurriculumDay | null {
  for (const day of days) {
    if (!completedDayIds.has(day.key)) {
      return day;
    }
  }
  return null;
}

export function buildTemplateDailyLog(day: CurriculumDay): {
  title: string;
  notes: string;
  plannedHours: number;
} {
  const videoLinks = day.video.length > 0
    ? day.video.map((entry) => {
      if (entry.notes) {
        return `- ${entry.title}: ${entry.url} (${entry.notes})`;
      }
      return `- ${entry.title}: ${entry.url}`;
    })
    : ['- No video assigned for this day.'];
  const buildSteps = day.build.map((step, index) => `${index + 1}. ${step}`);
  const definitionOfDone = day.dod.map((item, index) => `${index + 1}. ${item}`);

  const notes = [
    `Focus: ${day.focus}`,
    `Timebox: ${day.timeboxHours.toFixed(1)}h`,
    '',
    'Video Links:',
    ...videoLinks,
    '',
    'Build Steps:',
    ...buildSteps,
    '',
    'Definition of Done:',
    ...definitionOfDone,
  ].join('\n');

  return {
    title: `${day.key} - ${day.title}`,
    notes,
    plannedHours: day.timeboxHours,
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

  const weekDays = MONTH1
    .filter((day) => day.week === week)
    .sort((left, right) => left.day - right.day);
  const startDate = weekDays[0] ? getCurriculumSuggestedDate(weekDays[0]) : toIsoDate(new Date());
  const endDate = weekDays[weekDays.length - 1]
    ? getCurriculumSuggestedDate(weekDays[weekDays.length - 1])
    : startDate;
  const plannedHours = weekDays.reduce((sum, day) => sum + day.timeboxHours, 0);

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
  const prefixes = [`Week ${week} -`, `Week ${week} -`, `W${week}`];

  for (const item of items) {
    if (prefixes.some((prefix) => item.title.startsWith(prefix))) {
      return item;
    }
  }
  return null;
}
