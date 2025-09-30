'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useRef } from 'react';
import type { MouseEvent } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { projectList } from '@/lib/projects-data';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const router = useRouter();

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
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-transparent md:text-5xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
            Projelerim
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Gerçek iş problemlerine odaklanan, modern teknolojilerle geliştirdiğim projeler
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {projectList.map((project) => {
            const hasDemo = Boolean(project.demoUrl);

            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
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
                  <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-20 bg-gradient-to-br ${project.gradient}`} />

                  <div className="relative aspect-video overflow-hidden bg-slate-900">
                    <Image
                      src={project.coverImage}
                      alt={`${project.title} kapak görseli`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/40 to-transparent" />
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
                        Canlı Test
                      </motion.button>

                      <motion.button
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
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleNavigate(project.id);
                        }}
                        className="rounded-lg border border-slate-600/50 bg-slate-800/60 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
                      >
                        Detaylar
                      </motion.button>
                    </div>
                  </div>

                  <motion.div
                    className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100"
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
        </motion.div>
      </div>
    </section>
  );
}
