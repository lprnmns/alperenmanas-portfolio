'use client';

import ArtifactCard from '@/components/roadmap/ArtifactCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { WeekGroup } from '@/types/roadmap';

type WeekDetailDrawerProps = {
  week: WeekGroup | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function WeekDetailDrawer({ week, open, onOpenChange }: WeekDetailDrawerProps) {
  if (!week) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="border-slate-700 bg-slate-900 text-slate-100 sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>No week selected</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-slate-700 bg-slate-900 text-slate-100 sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{week.label}</DialogTitle>
          <DialogDescription className="text-slate-400">
            {week.items.length} milestones · {week.totalActualHours.toFixed(1)}h actual / {week.totalPlannedHours.toFixed(1)}h planned
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[70vh] space-y-4 overflow-y-auto pr-2">
          {week.items.map((weekItem) => (
            <section key={`${week.key}-${weekItem.item.id}`} className="rounded-xl border border-slate-700/60 bg-slate-800/50 p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="text-base font-semibold text-slate-100">{weekItem.item.title}</h4>
                  <p className="text-xs text-slate-400">{weekItem.item.phase}</p>
                </div>
                <div className="text-xs text-slate-400">
                  {weekItem.actualHours.toFixed(1)}h / {weekItem.plannedHours.toFixed(1)}h
                </div>
              </div>

              <div className="space-y-2">
                {weekItem.logs.length > 0 ? (
                  weekItem.logs.map((log) => (
                    <div key={log.id} className="rounded-lg border border-slate-700 bg-slate-900/70 p-3">
                      <p className="text-xs uppercase tracking-[0.15em] text-slate-400">{log.log_date}</p>
                      <p className="mt-1 text-sm font-medium text-slate-100">{log.title}</p>
                      {log.notes && <p className="mt-1 text-sm text-slate-300">{log.notes}</p>}
                    </div>
                  ))
                ) : (
                  <p className="rounded-lg border border-slate-700 bg-slate-900/70 p-3 text-sm text-slate-400">
                    No daily logs in this week.
                  </p>
                )}
              </div>

              {weekItem.artifacts.length > 0 && (
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                  {weekItem.artifacts.map((artifact) => (
                    <ArtifactCard key={artifact.id} artifact={artifact} roadmapTitle={weekItem.item.title} />
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
