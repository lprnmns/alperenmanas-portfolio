'use client';

import type { ReactNode } from 'react';

type AdminTableProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export default function AdminTable({ title, description, actions, children }: AdminTableProps) {
  return (
    <section className="rounded-2xl border border-slate-700/60 bg-slate-800/60 p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {description && <p className="text-sm text-slate-400">{description}</p>}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}
