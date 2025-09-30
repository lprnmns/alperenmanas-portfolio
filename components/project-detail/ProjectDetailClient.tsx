"use client";

import { useState } from "react";
import Link from "next/link";
import ImageCarousel from "@/components/project-detail/ImageCarousel";
import EvolutionAccordion from "@/components/project-detail/EvolutionAccordion";
import TechBadge from "@/components/project-detail/TechBadge";
import type { ProjectData } from "@/lib/projects-data";

const CATEGORY_LABELS: Record<keyof ProjectData["technologies"], string> = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  tools: "AI & Tools",
};

const CATEGORY_COLORS: Record<keyof ProjectData["technologies"], string> = {
  frontend: "from-blue-500 to-cyan-500",
  backend: "from-emerald-500 to-green-500",
  database: "from-purple-500 to-indigo-500",
  tools: "from-amber-500 to-orange-500",
};

interface ProjectDetailClientProps {
  project: ProjectData;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [openEvolution, setOpenEvolution] = useState(project.evolution[0]?.version ?? "");

  const handleNext = () => {
    setCarouselIndex((prev) => (prev === project.carouselImages.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev === 0 ? project.carouselImages.length - 1 : prev - 1));
  };

  const techEntries = Object.entries(project.technologies) as [keyof ProjectData["technologies"], string[]][];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-10 rounded-3xl border border-slate-800 bg-slate-900/80 p-10 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-10 lg:flex-row">
          <div className="lg:w-1/2">
            <ImageCarousel images={project.carouselImages} currentIndex={carouselIndex} onNext={handleNext} onPrev={handlePrev} />
          </div>

          <div className="flex flex-col gap-6 lg:w-1/2">
            <div>
              <p className="text-sm uppercase tracking-widest text-cyan-400">Proje</p>
              <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">{project.title}</h1>
              <p className="mt-4 text-base text-slate-300 md:text-lg">{project.fullDescription}</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">Projenin Amacı</h2>
              <p className="mt-2 text-slate-300">{project.purpose}</p>
              {project.subscriberCount && (
                <p className="mt-3 inline-flex items-center rounded-full border border-cyan-500/40 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">
                  Aktif Kullanıcı / Abone: {project.subscriberCount}
                </p>
              )}
            </div>

            <div className="mt-auto flex flex-wrap gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/40 transition duration-200 hover:brightness-110"
                >
                  Canlı Demo
                </a>
              )}

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 transition duration-200 hover:border-slate-500 hover:text-white"
              >
                GitHub Kodları
              </a>

              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg border border-transparent px-5 py-2 text-sm font-semibold text-slate-300 transition duration-200 hover:text-white"
              >
                ← Projelere Dön
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-10 backdrop-blur-xl">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Teknoloji Yığını</h2>
            <div className="space-y-5">
              {techEntries.map(([category, items]) => (
                <div key={category} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                    {CATEGORY_LABELS[category]}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {items.map((item) => (
                      <TechBadge key={`${category}-${item}`} name={item} gradient={CATEGORY_COLORS[category]} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Entegrasyonlar ve API’ler</h2>
            <div className="space-y-4">
              {project.apis.map((api) => (
                <div key={api.name} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                  <h3 className="text-sm font-semibold text-cyan-300">{api.name}</h3>
                  <p className="mt-2 text-sm text-slate-300">{api.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {project.evolution.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-white">Neydi, Ne Oldu? (Projenin Evrimi)</h2>
            <div className="mt-6 space-y-4">
              {project.evolution.map((item) => (
                <EvolutionAccordion
                  key={item.version}
                  version={item.version}
                  title={item.title}
                  summary={item.summary}
                  imageUrls={item.imageUrls}
                  isOpen={openEvolution === item.version}
                  onToggle={() => setOpenEvolution(openEvolution === item.version ? "" : item.version)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

