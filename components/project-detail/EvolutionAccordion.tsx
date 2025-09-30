"use client";

import Image from "next/image";

interface EvolutionAccordionProps {
  version: string;
  title: string;
  summary: string;
  imageUrls: string[];
  isOpen: boolean;
  onToggle: () => void;
}

export default function EvolutionAccordion({
  version,
  title,
  summary,
  imageUrls,
  isOpen,
  onToggle,
}: EvolutionAccordionProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/40">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-300">{version}</p>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <span className={`text-slate-300 transition-transform ${isOpen ? "rotate-180" : ""}`}>⌄</span>
      </button>

      {isOpen && (
        <div className="space-y-6 px-6 pb-6">
          <p className="text-sm text-slate-300">{summary}</p>
          {imageUrls.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {imageUrls.map((url, index) => (
                <div key={url} className="relative aspect-video overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                  <Image
                    src={url}
                    alt={`${version} ekran görüntüsü ${index + 1}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
