'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { type MouseEvent } from 'react';
import { ExternalLink, Github } from 'lucide-react';

import { useLanguage } from '@/components/providers/LanguageProvider';
import { formatTranslation } from '@/lib/i18n';
import { getProjectList } from '@/lib/projects-data';

export default function Projects() {
  const router = useRouter();
  const { language, dictionary } = useLanguage();
  const projects = useMemo(() => getProjectList(language), [language]);

  const handleNavigate = (slug: string) => {
    router.push(`/projects/${slug}`);
  };

  const handleDemoClick = (event: MouseEvent<HTMLButtonElement>, url?: string) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation?.();

    if (url) {
      window.open(url, '_blank', 'noopener');
    }
  };

  return (
    <section id="projects" className="relative py-12">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
            {dictionary.projectsSection.heading}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            {dictionary.projectsSection.subheading}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-10 overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/60 p-6 shadow-xl backdrop-blur-sm"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="relative inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-200">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
              </span>
              Live
            </span>
            <p className="text-sm font-semibold text-slate-200">In Progress — Air Defense Prototype</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900/70">
              <video
                className="h-full w-full object-cover"
                src="https://files.catbox.moe/0o5m8o.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
            </div>

            <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-700/60 bg-slate-900/70 p-5">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">TEKNOFEST 2026 — Air Defense Systems</h3>
                <p className="text-sm text-slate-300">
                  First prototype for our low-altitude air defense stack. Rapid-response interceptor control, telemetry
                  visualization, and rules engine tuned for competition constraints.
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-slate-700/60 bg-slate-800/60 p-3 text-sm text-slate-200">
                <div className="space-y-1">
                  <p className="font-semibold text-white">Prototype v1</p>
                  <p className="text-xs text-slate-400">Guidance stack + comms layer integrated; live demo loop above.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {projects.map((project, index) => {
            const isFirst = index === 0;
            const hasDemo = Boolean(project.demoUrl);
            const coverAlt = formatTranslation(dictionary.projectsSection.coverAlt, { title: project.title });

            return (
              <motion.div
                key={project.id}
                initial={isFirst ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: isFirst ? 0.01 : 0.2 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: isFirst ? 0 : index * 0.08 }}
                whileHover={{ y: -10 }}
                className="group relative cursor-pointer"
                onClick={() => handleNavigate(project.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleNavigate(project.id);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/60 backdrop-blur-sm transition-all duration-300 group-hover:border-slate-600">
                  <div className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-20 bg-gradient-to-br ${project.gradient}`} />

                  <div className="relative aspect-video overflow-hidden bg-slate-900">
                    <Image
                      src={project.coverImage}
                      alt={coverAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/40 to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="mb-3 text-2xl font-bold text-white transition-all group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text group-hover:text-transparent">
                      {project.title}
                    </h3>

                    <p className="mb-4 line-clamp-3 text-slate-300">{project.shortDescription}</p>

                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-600/50 bg-slate-700/50 px-3 py-1 text-xs font-medium text-blue-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="rounded-full border border-slate-600/50 bg-slate-700/50 px-3 py-1 text-xs font-medium text-slate-400">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <motion.button
                        type="button"
                        whileHover={hasDemo ? { scale: 1.05 } : {}}
                        whileTap={hasDemo ? { scale: 0.95 } : {}}
                        disabled={!hasDemo}
                        onClick={(event) => handleDemoClick(event, project.demoUrl)}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                          hasDemo
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-blue-500/40 hover:shadow-lg'
                            : 'cursor-not-allowed bg-slate-700/40 text-slate-500'
                        }`}
                      >
                        <ExternalLink size={16} />
                        {dictionary.projectsSection.liveDemo}
                      </motion.button>

                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(event) => {
                          event.stopPropagation();
                          event.nativeEvent.stopImmediatePropagation?.();
                          window.open(project.githubUrl, '_blank', 'noopener');
                        }}
                        className="rounded-lg border border-slate-600/50 bg-slate-700/50 px-4 py-2 text-slate-200 transition hover:bg-slate-700"
                      >
                        <Github size={16} />
                      </motion.button>

                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(event) => {
                          event.stopPropagation();
                          event.nativeEvent.stopImmediatePropagation?.();
                          handleNavigate(project.id);
                        }}
                        className="rounded-lg border border-slate-600/50 bg-slate-800/60 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
                      >
                        {dictionary.projectsSection.details}
                      </motion.button>
                    </div>
                  </div>

                  <motion.div
                    className="pointer-events-none absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
                      <ExternalLink size={20} className="text-white" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
