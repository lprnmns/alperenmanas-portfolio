'use client';

import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import type { CurriculumDay } from '@/types/curriculum';

type CurriculumJumpDialogProps = {
  days: CurriculumDay[];
  onSelectDay: (day: CurriculumDay) => void;
};

export default function CurriculumJumpDialog({ days, onSelectDay }: CurriculumJumpDialogProps) {
  const [open, setOpen] = useState(false);

  const sortedDays = useMemo(
    () => [...days].sort((left, right) => (left.week - right.week) || (left.day - right.day)),
    [days],
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-900/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-100"
      >
        <Search size={14} />
        Jump to day
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search W1D1, focus, or title..." />
        <CommandList>
          <CommandEmpty>No curriculum day found.</CommandEmpty>
          <CommandGroup heading="Month 1">
            {sortedDays.map((day) => (
              <CommandItem
                key={day.key}
                value={`${day.key} ${day.title} ${day.focus}`}
                onSelect={() => {
                  onSelectDay(day);
                  setOpen(false);
                }}
              >
                <div className="flex w-full flex-col">
                  <span className="text-xs uppercase tracking-[0.14em] text-slate-400">{day.key}</span>
                  <span className="text-sm text-slate-100">{day.title}</span>
                  <span className="text-xs text-slate-400">{day.focus}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
