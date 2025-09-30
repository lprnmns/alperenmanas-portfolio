'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
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

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Projelerim
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Gerçek iş problemlerine odaklanan, modern teknolojilerle geliştirdiğim projeler
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projectList.map((project) => {
            const hasDemo = Boolean(project.demoUrl);
            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-slate-600 transition-all duration-300">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  />

                  <div className="relative aspect-video bg-slate-900 overflow-hidden">
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
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all">
                      {project.title}
                    </h3>

                    <p className="text-slate-400 mb-4 line-clamp-3">
                      {project.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium bg-slate-700/50 text-blue-300 rounded-full border border-slate-600/50"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-3 py-1 text-xs font-medium bg-slate-700/50 text-slate-400 rounded-full border border-slate-600/50">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <motion.button
                        whileHover={hasDemo ? { scale: 1.05 } : {}}
                        whileTap={hasDemo ? { scale: 0.95 } : {}}
                        disabled={!hasDemo}
                        onClick={(e) => {
                          if (!project.demoUrl) return;
                          e.preventDefault();
                          window.open(project.demoUrl, '_blank', 'noopener');
                        }}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          hasDemo
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/50'
                            : 'bg-slate-700/40 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        <ExternalLink size={16} />
                        Canlı Demo
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(project.githubUrl, '_blank', 'noopener');
                        }}
                        className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-slate-300 border border-slate-600/50 transition-all"
                      >
                        <Github size={16} />
                      </motion.button>
                    </div>
                  </div>

                  <motion.div
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
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