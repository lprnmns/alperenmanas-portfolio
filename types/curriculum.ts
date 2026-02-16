export interface CurriculumResourceLink {
  label: string;
  url: string;
}

export interface CurriculumDayTemplate {
  id: string;
  week: number;
  day: number;
  suggestedDate: string;
  title: string;
  focus: string;
  summary: string;
  plannedHours: number;
  videoLinks: CurriculumResourceLink[];
  buildSteps: string[];
  definitionOfDone: string[];
  artifactTargets: string[];
}

export interface CurriculumWeekMilestone {
  week: number;
  title: string;
  summary: string;
}

export interface CurriculumWeekGroup {
  week: number;
  title: string;
  days: CurriculumDayTemplate[];
}

export interface CurriculumProgress {
  completedDays: number;
  totalDays: number;
  percent: number;
}
