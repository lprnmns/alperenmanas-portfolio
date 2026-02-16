'use client';

import { Loader2, PlayCircle } from 'lucide-react';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import type { CurriculumDayTemplate } from '@/types/curriculum';

type CurriculumDayDrawerProps = {
  day: CurriculumDayTemplate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isCompleted: boolean;
  onCreateDailyLog?: (day: CurriculumDayTemplate) => Promise<void>;
  creating?: boolean;
};

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="space-y-2">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{title}</p>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={`${title}-${index}`} className="rounded-xl border border-slate-700/70 bg-slate-950/70 p-3 text-sm text-slate-200">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function CurriculumDayDrawer({
  day,
  open,
  onOpenChange,
  isCompleted,
  onCreateDailyLog,
  creating = false,
}: CurriculumDayDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[92vh] border-slate-700 bg-slate-900 text-slate-100">
        <DrawerHeader className="border-b border-slate-700/80">
          {day ? (
            <>
              <p className="text-xs uppercase tracking-[0.18em] text-cyan-200">{day.id}</p>
              <DrawerTitle className="text-2xl text-white">{day.title}</DrawerTitle>
              <DrawerDescription className="space-y-1 text-slate-300">
                <span className="block">{day.focus}</span>
                <span className="block">
                  Target date: {day.suggestedDate} - Planned {day.plannedHours.toFixed(1)}h
                </span>
              </DrawerDescription>
            </>
          ) : (
            <DrawerTitle className="text-white">No day selected</DrawerTitle>
          )}
        </DrawerHeader>

        <div className="space-y-4 overflow-y-auto px-4 py-4">
          {!day && <p className="text-sm text-slate-300">Select a curriculum day to inspect details.</p>}

          {day && (
            <>
              <section className="rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">Summary</p>
                <p className="mt-2 text-sm text-slate-100">{day.summary}</p>
              </section>

              <section className="space-y-2">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Video Links</p>
                <div className="grid gap-2 md:grid-cols-2">
                  {day.videoLinks.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-slate-700/70 bg-slate-950/70 p-3 text-sm text-cyan-200 transition hover:border-cyan-300/60 hover:text-cyan-100"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </section>

              <Section title="Build Steps" items={day.buildSteps} />
              <Section title="Definition of Done" items={day.definitionOfDone} />
              <Section title="Artifact Targets" items={day.artifactTargets} />
            </>
          )}
        </div>

        {day && onCreateDailyLog && (
          <DrawerFooter className="border-t border-slate-700/80">
            <button
              type="button"
              disabled={creating || isCompleted}
              onClick={() => void onCreateDailyLog(day)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:from-slate-700 disabled:to-slate-600"
            >
              {creating ? <Loader2 size={16} className="animate-spin" /> : <PlayCircle size={16} />}
              {isCompleted ? 'Already completed' : 'Create Daily Log from template'}
            </button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
