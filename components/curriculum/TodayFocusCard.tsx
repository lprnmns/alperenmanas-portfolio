'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Compass, Sparkles } from 'lucide-react';

import type { CurriculumDay, CurriculumProgress } from '@/types/curriculum';

type TodayFocusCardProps = {
  heading: string;
  progress: CurriculumProgress;
  nextDay: CurriculumDay | null;
  ctaLabel?: string;
  onCta?: () => void;
};

export default function TodayFocusCard({
  heading,
  progress,
  nextDay,
  ctaLabel,
  onCta,
}: TodayFocusCardProps) {
  const progressWidth = `${Math.max(0, Math.min(100, progress.percent))}%`;

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-5 shadow-[0_24px_80px_rgba(8,145,178,0.22)]"
    >
      <div className="pointer-events-none absolute -top-16 right-0 h-44 w-44 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-14 left-10 h-36 w-36 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-cyan-200">
              <Sparkles size={13} />
              {heading}
            </p>
            <h2 className="text-xl font-semibold text-white md:text-2xl">
              {progress.completedDays}/{progress.totalDays} days completed
            </h2>
            <p className="text-sm text-slate-300">Month 1 curriculum execution status</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Progress</p>
            <p className="text-2xl font-semibold text-cyan-200">{progress.percent}%</p>
          </div>
        </div>

        <div className="h-3 overflow-hidden rounded-full border border-cyan-300/30 bg-slate-950/70">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: progressWidth }}
            transition={{ type: 'spring', stiffness: 140, damping: 22 }}
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-400"
          />
        </div>

        {nextDay ? (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <div>
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-slate-300">
                <Compass size={13} />
                Today Focus
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                {nextDay.key} - {nextDay.title}
              </p>
              <p className="text-xs text-slate-300">{nextDay.focus}</p>
            </div>
            {ctaLabel && onCta && (
              <button
                type="button"
                onClick={onCta}
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-300/50 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100 transition hover:bg-cyan-400/20"
              >
                {ctaLabel}
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
            <p className="inline-flex items-center gap-2 font-semibold">
              <CheckCircle2 size={16} />
              Month 1 completed
            </p>
            <p className="mt-1 text-emerald-100/90">
              All 24 curriculum days are logged. Continue with Month 2 planning.
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
}
