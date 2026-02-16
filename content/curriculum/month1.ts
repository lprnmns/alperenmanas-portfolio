import type { CurriculumDayTemplate, CurriculumWeekMilestone } from '@/types/curriculum';

type DayBlueprint = Omit<CurriculumDayTemplate, 'id' | 'week' | 'day' | 'suggestedDate'>;

type WeekBlueprint = {
  week: number;
  milestone: CurriculumWeekMilestone;
  days: DayBlueprint[];
};

function toIsoDateFromWeekDay(week: number, day: number): string {
  const start = new Date(Date.UTC(2026, 0, 5));
  const offset = (week - 1) * 7 + (day - 1);
  start.setUTCDate(start.getUTCDate() + offset);
  return start.toISOString().slice(0, 10);
}

function toCurriculumDayId(week: number, day: number): string {
  return `W${week}D${day}`;
}

const WEEK_BLUEPRINTS: WeekBlueprint[] = [
  {
    week: 1,
    milestone: {
      week: 1,
      title: 'Week 1 — Tooling Baseline',
      summary: 'Set project standards, UI primitives, and delivery rhythm for daily execution.',
    },
    days: [
      {
        title: 'Repo Baseline and DX',
        focus: 'Dev environment consistency',
        summary: 'Lock scripts, lint conventions, and release-ready local workflow.',
        plannedHours: 1.5,
        videoLinks: [
          { label: 'App Router Architecture', url: 'https://www.youtube.com/results?search_query=nextjs+app+router+architecture' },
          { label: 'TypeScript Project Setup', url: 'https://www.youtube.com/results?search_query=typescript+project+setup+best+practices' },
        ],
        buildSteps: [
          'Run install/typecheck/lint/build and capture baseline outputs.',
          'Verify route-level loading behavior for roadmap/admin screens.',
          'Document local-mode workflow for static export constraints.',
        ],
        definitionOfDone: [
          'All quality commands run green.',
          'Static export assumptions are documented for future weeks.',
          'No credentials are hardcoded in code or docs.',
        ],
        artifactTargets: ['Setup checklist note', 'Baseline screenshot'],
      },
      {
        title: 'UI Primitive Audit',
        focus: 'Reusable component quality',
        summary: 'Review and align card, badge, button, and table patterns for roadmap/admin.',
        plannedHours: 1.5,
        videoLinks: [
          { label: 'Radix + Tailwind Patterns', url: 'https://www.youtube.com/results?search_query=radix+ui+tailwind+design+system' },
          { label: 'Design Tokens in Tailwind', url: 'https://www.youtube.com/results?search_query=tailwind+design+tokens+workflow' },
        ],
        buildSteps: [
          'Inspect visual hierarchy, spacing scale, and typography consistency.',
          'Define premium card style tokens for roadmap/admin surfaces.',
          'Standardize hover and focus states across controls.',
        ],
        definitionOfDone: [
          'Shared card/button language is visually consistent.',
          'Interactive controls have clear hover/focus feedback.',
          'Component usage avoids duplicated ad-hoc styles.',
        ],
        artifactTargets: ['UI audit note', 'Before-after comparison'],
      },
      {
        title: 'Motion Baseline',
        focus: 'Framer Motion system',
        summary: 'Set spring presets and apply intentional transitions for timeline and cards.',
        plannedHours: 1.5,
        videoLinks: [
          { label: 'Framer Motion Springs', url: 'https://www.youtube.com/results?search_query=framer+motion+spring+animations' },
          { label: 'Micro Interactions', url: 'https://www.youtube.com/results?search_query=ui+micro+interactions+framer+motion' },
        ],
        buildSteps: [
          'Create a small set of spring configs: snappy, fluid, heavy.',
          'Apply staggered entrances to high-level sections.',
          'Prevent layout shift and keep transitions transform/opacity based.',
        ],
        definitionOfDone: [
          'Key surfaces animate at 60fps without jank.',
          'Animation timing communicates hierarchy.',
          'Reduced-motion fallback is respected.',
        ],
        artifactTargets: ['Motion clip', 'Animation preset snippet'],
      },
      {
        title: 'Data Shape Contract',
        focus: 'Roadmap and log data semantics',
        summary: 'Normalize naming and ensure local-first data behavior remains predictable.',
        plannedHours: 1.5,
        videoLinks: [
          { label: 'Client Data Modeling', url: 'https://www.youtube.com/results?search_query=frontend+data+modeling+typescript' },
          { label: 'Local-first UX', url: 'https://www.youtube.com/results?search_query=local+first+web+apps+architecture' },
        ],
        buildSteps: [
          'Validate roadmap and daily log mapping assumptions.',
          'Define curriculum prefix format W#D# for progress detection.',
          'Draft helper utilities for progress and next-focus calculations.',
        ],
        definitionOfDone: [
          'Data helpers are deterministic and testable by inspection.',
          'Progress tracking works without backend connectivity.',
          'No schema migration is required.',
        ],
        artifactTargets: ['Helper API note', 'Progress formula doc'],
      },
      {
        title: 'Interaction Accessibility',
        focus: 'Keyboard and readable states',
        summary: 'Ensure roadmap/admin interactions are keyboard-safe and visually clear.',
        plannedHours: 1.5,
        videoLinks: [
          { label: 'Accessible Admin UI', url: 'https://www.youtube.com/results?search_query=accessible+admin+dashboard+ui' },
          { label: 'Keyboard Navigation Patterns', url: 'https://www.youtube.com/results?search_query=keyboard+navigation+react+ui' },
        ],
        buildSteps: [
          'Confirm focus rings and tab order for forms and drawers.',
          'Improve empty-state copy to guide first action.',
          'Review contrast on gradient and glass surfaces.',
        ],
        definitionOfDone: [
          'Primary workflows complete without pointer input.',
          'CTA copy is visible and actionable in empty states.',
          'No unreadable text/background combinations remain.',
        ],
        artifactTargets: ['Accessibility pass checklist', 'Keyboard flow gif'],
      },
      {
        title: 'Week 1 Integration Review',
        focus: 'Baseline readiness',
        summary: 'Consolidate quality, visuals, and data utilities for week handoff.',
        plannedHours: 1.5,
        videoLinks: [
          { label: 'Code Review for Frontend', url: 'https://www.youtube.com/results?search_query=frontend+code+review+process' },
          { label: 'Release Checklist', url: 'https://www.youtube.com/results?search_query=frontend+release+checklist' },
        ],
        buildSteps: [
          'Run full quality gates and verify no regressions.',
          'Capture visuals for public roadmap and admin baseline.',
          'Create concise notes for week 2 execution plan.',
        ],
        definitionOfDone: [
          'Quality gates pass cleanly.',
          'Public and admin states have clear empty/data views.',
          'Week 2 backlog is actionable.',
        ],
        artifactTargets: ['Week 1 recap note', 'Verification output snapshot'],
      },
    ],
  },
  {
    week: 2,
    milestone: {
      week: 2,
      title: 'Week 2 — UI Systems and Motion',
      summary: 'Deliver public roadmap storytelling with filters, timeline depth, and strong interaction design.',
    },
    days: [
      {
        title: 'Plan vs Execution IA',
        focus: 'Roadmap information architecture',
        summary: 'Split public roadmap into fast Plan overview and deep Execution mode.',
        plannedHours: 1.5,
        videoLinks: [
          { label: 'Dashboard Information Design', url: 'https://www.youtube.com/results?search_query=dashboard+information+architecture' },
          { label: 'Tabs UX Best Practices', url: 'https://www.youtube.com/results?search_query=tabs+ux+best+practices' },
        ],
        buildSteps: [
          'Implement tabs for Plan and Execution without navigation churn.',
          'Design summary cards for 30-second hiring read.',
          'Ensure responsive layout parity on mobile and desktop.',
        ],
        definitionOfDone: [
          'Plan/Execution switch is immediate and understandable.',
          'Critical status can be read in under 30 seconds.',
          'Layout remains stable across breakpoints.',
        ],
        artifactTargets: ['Roadmap IA screenshot', 'Interaction video'],
      },
      {
        title: 'Timeline/Gantt Refinement',
        focus: 'Execution readability',
        summary: 'Improve status signaling, spacing, and hover feedback for timeline bars.',
        plannedHours: 1.5,
        videoLinks: [
          { label: 'Gantt UX Patterns', url: 'https://www.youtube.com/results?search_query=gantt+chart+ux+patterns' },
          { label: 'Motion for Dashboards', url: 'https://www.youtube.com/results?search_query=dashboard+animation+principles' },
        ],
        buildSteps: [
          'Tune bar offsets, labels, and status colors for readability.',
          'Add motion that reinforces chronology rather than decoration.',
          'Define empty-state fallback for no milestones.',
        ],
        definitionOfDone: [
          'Timeline is readable on first scan.',
          'Status colors and labels are consistent.',
          'No-data state has a clear next step.',
        ],
        artifactTargets: ['Timeline refinement snapshot', 'Status legend'],
      },
      {
        title: 'Artifact Narrative Layer',
        focus: 'Proof-of-work storytelling',
        summary: 'Elevate PR/demo/blog cards to look like enterprise project evidence.',
        plannedHours: 1.5,
        videoLinks: [
          { label: 'Portfolio Case Study Cards', url: 'https://www.youtube.com/results?search_query=portfolio+case+study+ui+cards' },
          { label: 'Designing Link Cards', url: 'https://www.youtube.com/results?search_query=link+card+design+patterns' },
        ],
        buildSteps: [
          'Improve card hierarchy: type, title, source milestone, action.',
          'Add polished hover and action affordances.',
          'Limit density while preserving scan speed.',
        ],
        definitionOfDone: [
          'Artifacts feel consistent and premium.',
          'Card CTA behavior is predictable.',
          'Roadmap context is visible per artifact.',
        ],
        artifactTargets: ['Artifact card gallery', 'Component preview'],
      },
      {
        title: 'Search and Filters',
        focus: 'Fast navigation at scale',
        summary: 'Improve phase/status filtering and optional day jump interactions.',
        plannedHours: 1.5,
        videoLinks: [
          { label: 'Command Palette UX', url: 'https://www.youtube.com/results?search_query=cmdk+command+palette+react' },
          { label: 'Filter UX Heuristics', url: 'https://www.youtube.com/results?search_query=filter+ux+heuristics' },
        ],
        buildSteps: [
          'Harden query + phase + status filters for execution tab.',
          'Add optional command-jump for curriculum days.',
          'Preserve context when switching between sections.',
        ],
        definitionOfDone: [
          'Filtering is stable with no unexpected resets.',
          'Jump-to-day workflow opens correct detail drawer.',
          'Keyboard interactions remain intact.',
        ],
        artifactTargets: ['Filter walkthrough gif', 'Command palette demo'],
      },
      {
        title: 'Responsive QA Sprint',
        focus: 'Mobile-first hardening',
        summary: 'Tune spacing and component behavior for small screens and tablets.',
        plannedHours: 1.5,
        videoLinks: [
          { label: 'Mobile Dashboard Design', url: 'https://www.youtube.com/results?search_query=mobile+dashboard+design+best+practices' },
          { label: 'Responsive Tailwind Layouts', url: 'https://www.youtube.com/results?search_query=tailwind+responsive+layout+patterns' },
        ],
        buildSteps: [
          'Inspect roadmap/admin key sections in mobile viewport.',
          'Fix dense card layout and clipped labels.',
          'Ensure drawers and forms remain usable on small screens.',
        ],
        definitionOfDone: [
          'No critical overflow or clipped content.',
          'Core actions reachable with thumb-friendly controls.',
          'Typography hierarchy remains clear on mobile.',
        ],
        artifactTargets: ['Mobile QA checklist', 'Before-after mobile shots'],
      },
      {
        title: 'Week 2 Demo Story',
        focus: 'Hiring-friendly communication',
        summary: 'Package roadmap improvements into a concise narrative for reviewers.',
        plannedHours: 1.5,
        videoLinks: [
          { label: 'Product Demo Structure', url: 'https://www.youtube.com/results?search_query=how+to+structure+product+demo' },
          { label: 'Portfolio Storytelling', url: 'https://www.youtube.com/results?search_query=portfolio+storytelling+for+developers' },
        ],
        buildSteps: [
          'Record short walkthrough for Plan and Execution views.',
          'Highlight measurable progress and proof links.',
          'Prepare week 3 admin-focused backlog.',
        ],
        definitionOfDone: [
          'Demo covers value, flow, and evidence.',
          'Week 3 tasks are prioritized and scoped.',
          'Artifacts are linked from roadmap.',
        ],
        artifactTargets: ['Demo script', 'Walkthrough recording'],
      },
    ],
  },
  {
    week: 3,
    milestone: {
      week: 3,
      title: 'Week 3 — Data and Admin Workflows',
      summary: 'Build repeatable daily execution loops with robust admin tooling and local-first reliability.',
    },
    days: [
      {
        title: 'Curriculum Data Layer',
        focus: 'Template-driven execution',
        summary: 'Model month curriculum as reusable typed data and helper functions.',
        plannedHours: 1.5,
        videoLinks: [
          { label: 'TypeScript Data Modeling', url: 'https://www.youtube.com/results?search_query=typescript+data+modeling+patterns' },
          { label: 'Domain Driven Frontend', url: 'https://www.youtube.com/results?search_query=domain+driven+frontend+architecture' },
        ],
        buildSteps: [
          'Create month1 data source with full day details.',
          'Add grouping, completion, and progress helpers.',
          'Expose utilities for both roadmap and admin surfaces.',
        ],
        definitionOfDone: [
          'Single source of truth powers both views.',
          'Progress computes correctly from W#D# prefixes.',
          'No backend dependency is required for rendering.',
        ],
        artifactTargets: ['Data model diff', 'Utility function notes'],
      },
      {
        title: 'Admin Curriculum Surface',
        focus: 'Operational execution panel',
        summary: 'Design week/day control center and rich day details with drawer UX.',
        plannedHours: 1.5,
        videoLinks: [
          { label: 'Drawer UX Patterns', url: 'https://www.youtube.com/results?search_query=drawer+ux+patterns+web' },
          { label: 'Admin Panel IA', url: 'https://www.youtube.com/results?search_query=admin+panel+information+architecture' },
        ],
        buildSteps: [
          'Build week grid with completion state indicators.',
          'Open selected day in Vaul drawer with details.',
          'Integrate jump-to-day shortcut for faster navigation.',
        ],
        definitionOfDone: [
          'Week/day cards are legible and interactive.',
          'Drawer surfaces links, steps, and DoD clearly.',
          'Day selection is reflected across UI state.',
        ],
        artifactTargets: ['Admin curriculum screenshot', 'Drawer interaction gif'],
      },
      {
        title: 'One-Click Log Creation',
        focus: 'Execution automation',
        summary: 'Generate daily logs from day template and mark completion instantly.',
        plannedHours: 1.5,
        videoLinks: [
          { label: 'Form Automation UX', url: 'https://www.youtube.com/results?search_query=form+automation+ux+patterns' },
          { label: 'Supabase CRUD Patterns', url: 'https://www.youtube.com/results?search_query=supabase+crud+best+practices' },
        ],
        buildSteps: [
          'Create template note builder from curriculum details.',
          'Ensure week milestones exist before daily log insertion.',
          'Prevent duplicate day creation using title prefix checks.',
        ],
        definitionOfDone: [
          'Click creates a valid daily log row with W#D# prefix.',
          'Week milestones auto-create when absent.',
          'Completed badge updates immediately after refresh.',
        ],
        artifactTargets: ['Template creation clip', 'Sample daily log output'],
      },
      {
        title: 'Quality and Guardrails',
        focus: 'Safe admin operations',
        summary: 'Strengthen validation and user feedback in admin workflows.',
        plannedHours: 1.5,
        videoLinks: [
          { label: 'Form Validation UX', url: 'https://www.youtube.com/results?search_query=form+validation+ux+best+practices' },
          { label: 'Resilient Client State', url: 'https://www.youtube.com/results?search_query=resilient+react+state+patterns' },
        ],
        buildSteps: [
          'Add loading states and disabled states for create actions.',
          'Provide concise success/error feedback for admin actions.',
          'Keep fallback behavior clean when backend is not configured.',
        ],
        definitionOfDone: [
          'No silent failures on button actions.',
          'Action feedback is visible and contextual.',
          'Local mode handles operations without runtime errors.',
        ],
        artifactTargets: ['Admin feedback state shots', 'Validation checklist'],
      },
      {
        title: 'Insight Dashboard Polish',
        focus: 'Progress comprehension',
        summary: 'Improve progress and activity framing so updates are obvious at a glance.',
        plannedHours: 1.5,
        videoLinks: [
          { label: 'Data Visualization for Product', url: 'https://www.youtube.com/results?search_query=dashboard+data+visualization+best+practices' },
          { label: 'Recharts Dashboard Tutorial', url: 'https://www.youtube.com/results?search_query=recharts+dashboard+tutorial' },
        ],
        buildSteps: [
          'Expose completed/total curriculum metrics prominently.',
          'Tune 14-day activity chart labels and empty messaging.',
          'Align progress cards between public and admin contexts.',
        ],
        definitionOfDone: [
          'Progress never shows ambiguous 0/0 state.',
          'Chart remains informative with low activity.',
          'Today Focus is visible in both screens.',
        ],
        artifactTargets: ['Dashboard comparison', 'Metric definition note'],
      },
      {
        title: 'Week 3 Integration Review',
        focus: 'Execution loop readiness',
        summary: 'Validate end-to-end daily workflow from planning to logging.',
        plannedHours: 1.5,
        videoLinks: [
          { label: 'Release QA Checklist', url: 'https://www.youtube.com/results?search_query=frontend+release+qa+checklist' },
          { label: 'Feature Walkthrough Format', url: 'https://www.youtube.com/results?search_query=feature+walkthrough+best+practice' },
        ],
        buildSteps: [
          'Run full quality pipeline and manual interaction checks.',
          'Verify curriculum completion detection against existing logs.',
          'Prepare final week mini-project scope and outcomes.',
        ],
        definitionOfDone: [
          'Roadmap/admin loops are stable.',
          'All critical acceptance criteria are demonstrable.',
          'Week 4 goals are clearly prioritized.',
        ],
        artifactTargets: ['Week 3 report', 'Verification output snippet'],
      },
    ],
  },
  {
    week: 4,
    milestone: {
      week: 4,
      title: 'Week 4 — Titanic Mini Project',
      summary: 'Ship final integrated experience and present progress as a hiring-ready execution system.',
    },
    days: [
      {
        title: 'Mini-Project Scope Lock',
        focus: 'Outcome-first planning',
        summary: 'Define narrow, demonstrable success criteria for final public/admin release.',
        plannedHours: 1.5,
        videoLinks: [
          { label: 'MVP Scoping', url: 'https://www.youtube.com/results?search_query=mvp+scope+product+management' },
          { label: 'Feature Prioritization', url: 'https://www.youtube.com/results?search_query=feature+prioritization+framework' },
        ],
        buildSteps: [
          'List must-have vs nice-to-have items.',
          'Lock Definition of Done for release candidate.',
          'Sequence final implementation tasks by risk.',
        ],
        definitionOfDone: [
          'Scope is documented and frozen for week 4.',
          'Every task maps to user-visible value.',
          'Timeline supports predictable delivery.',
        ],
        artifactTargets: ['Scope matrix', 'Release backlog'],
      },
      {
        title: 'Public Roadmap Final Pass',
        focus: 'Hiring-page quality',
        summary: 'Finalize roadmap visual polish, copy, and scan speed.',
        plannedHours: 1.5,
        videoLinks: [
          { label: 'Portfolio UX Critique', url: 'https://www.youtube.com/results?search_query=portfolio+ux+critique' },
          { label: 'Conversion-focused UI Copy', url: 'https://www.youtube.com/results?search_query=ui+copywriting+for+conversion' },
        ],
        buildSteps: [
          'Polish tab labels, card copy, and CTA hierarchy.',
          'Improve empty-state storytelling with actionable steps.',
          'Validate visual balance on desktop and mobile.',
        ],
        definitionOfDone: [
          'Public page communicates status in 30 seconds.',
          'Plan and Execution flows are both production-ready.',
          'No generic placeholder copy remains.',
        ],
        artifactTargets: ['Roadmap final screenshots', 'Copy update note'],
      },
      {
        title: 'Admin Flow Final Pass',
        focus: 'Operational speed',
        summary: 'Ensure daily execution updates can be completed in under two minutes.',
        plannedHours: 1.5,
        videoLinks: [
          { label: 'Admin UX Speed Patterns', url: 'https://www.youtube.com/results?search_query=admin+ux+speed+patterns' },
          { label: 'Productive Forms Design', url: 'https://www.youtube.com/results?search_query=high+productivity+form+design' },
        ],
        buildSteps: [
          'Optimize day selection to log creation flow.',
          'Confirm milestone auto-create logic in empty database state.',
          'Tune feedback messaging and completion badges.',
        ],
        definitionOfDone: [
          'One-click template log flow succeeds reliably.',
          'Missing milestone case resolves automatically.',
          'Completion state is immediately visible.',
        ],
        artifactTargets: ['Admin flow recording', 'Latency notes'],
      },
      {
        title: 'Cross-View Consistency',
        focus: 'Design and data coherence',
        summary: 'Align terminology, status colors, and progress logic across screens.',
        plannedHours: 1.5,
        videoLinks: [
          { label: 'Design QA Workflow', url: 'https://www.youtube.com/results?search_query=design+qa+workflow+frontend' },
          { label: 'Consistency in Design Systems', url: 'https://www.youtube.com/results?search_query=design+system+consistency+audit' },
        ],
        buildSteps: [
          'Cross-check labels and metric meaning in roadmap/admin.',
          'Standardize status badges and card component usage.',
          'Fix any visual regression introduced during feature work.',
        ],
        definitionOfDone: [
          'No conflicting terms between views.',
          'Progress metrics are computed the same way everywhere.',
          'UI language feels like one coherent product.',
        ],
        artifactTargets: ['Consistency audit table', 'UI diff'],
      },
      {
        title: 'Hiring Package Assembly',
        focus: 'Evidence packaging',
        summary: 'Collect demos, PRs, and concise notes that prove execution discipline.',
        plannedHours: 1.5,
        videoLinks: [
          { label: 'Engineering Portfolio Presentation', url: 'https://www.youtube.com/results?search_query=engineering+portfolio+presentation' },
          { label: 'Technical Storytelling', url: 'https://www.youtube.com/results?search_query=technical+storytelling+for+hiring' },
        ],
        buildSteps: [
          'Curate top artifacts from each week.',
          'Write summary bullets for outcomes and impact.',
          'Link supporting evidence into roadmap artifacts.',
        ],
        definitionOfDone: [
          'Artifacts map to key capabilities clearly.',
          'Narrative highlights consistency and delivery pace.',
          'All links are valid and publicly accessible.',
        ],
        artifactTargets: ['Hiring evidence doc', 'Artifact shortlist'],
      },
      {
        title: 'Final Demo and Retrospective',
        focus: 'Closeout quality',
        summary: 'Run final verification and capture what worked for Month 2 planning.',
        plannedHours: 1.5,
        videoLinks: [
          { label: 'Retrospective Facilitation', url: 'https://www.youtube.com/results?search_query=engineering+retrospective+techniques' },
          { label: 'Final Demo Checklist', url: 'https://www.youtube.com/results?search_query=product+demo+final+checklist' },
        ],
        buildSteps: [
          'Run typecheck/lint/build and verify all acceptance criteria.',
          'Record final walkthrough of roadmap and admin.',
          'Capture lessons learned and next-month improvements.',
        ],
        definitionOfDone: [
          'Quality pipeline is green.',
          'Demo clearly shows public + admin value.',
          'Retrospective produces actionable Month 2 items.',
        ],
        artifactTargets: ['Final demo recording', 'Retro notes'],
      },
    ],
  },
];

export const MONTH1_WEEK_MILESTONES: CurriculumWeekMilestone[] = WEEK_BLUEPRINTS.map((week) => week.milestone);

export const MONTH1: CurriculumDayTemplate[] = WEEK_BLUEPRINTS.flatMap((week) =>
  week.days.map((day, index) => {
    const dayNumber = index + 1;
    return {
      ...day,
      id: toCurriculumDayId(week.week, dayNumber),
      week: week.week,
      day: dayNumber,
      suggestedDate: toIsoDateFromWeekDay(week.week, dayNumber),
    };
  }),
);
