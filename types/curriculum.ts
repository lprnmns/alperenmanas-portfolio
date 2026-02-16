import type { CurriculumDay } from '@/content/curriculum/month1';

export type { CurriculumDay };

export interface CurriculumWeekMilestone {
  week: number;
  title: string;
  summary: string;
}

export interface CurriculumWeekGroup {
  week: number;
  title: string;
  days: CurriculumDay[];
}

export interface CurriculumProgress {
  completedDays: number;
  totalDays: number;
  percent: number;
}
