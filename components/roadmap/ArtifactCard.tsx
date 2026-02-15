'use client';

import { BookOpen, FileCode2, FileText, Globe, Link2, PlayCircle, type LucideIcon } from 'lucide-react';

import type { ArtifactType, ArtifactRow } from '@/types/roadmap';

type ArtifactCardProps = {
  artifact: ArtifactRow;
  roadmapTitle?: string;
};

const artifactTypeConfig: Record<ArtifactType, { label: string; Icon: LucideIcon }> = {
  pr: { label: 'Pull Request', Icon: FileCode2 },
  demo: { label: 'Demo', Icon: PlayCircle },
  blog: { label: 'Blog', Icon: BookOpen },
  repo: { label: 'Repository', Icon: Globe },
  doc: { label: 'Documentation', Icon: FileText },
  other: { label: 'Link', Icon: Link2 },
};

export default function ArtifactCard({ artifact, roadmapTitle }: ArtifactCardProps) {
  const config = artifactTypeConfig[artifact.type];
  const Icon = config.Icon;

  return (
    <a
      href={artifact.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-xl border border-slate-700/60 bg-slate-800/60 p-4 transition hover:border-cyan-400/50 hover:bg-slate-800"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="rounded-md border border-slate-700 bg-slate-900/80 p-2 text-cyan-300">
            <Icon size={16} />
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{config.label}</p>
            <p className="text-sm font-semibold text-slate-100">{artifact.title}</p>
          </div>
        </div>
        <span className="text-xs text-slate-400 transition group-hover:text-cyan-300">Open</span>
      </div>
      {roadmapTitle && <p className="mt-3 text-xs text-slate-400">From: {roadmapTitle}</p>}
    </a>
  );
}
