'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { motion } from 'framer-motion';

type LoadingStage = 'loading' | 'transition' | 'final';

type LoadingScreenProps = {
  progress: number;
  stage: LoadingStage;
};

type PreviewCard = {
  id: string;
  label: string;
  title: string;
  description: string;
  tags?: string[];
  image?: string;
  accent?: string;
};

const previewColumns: PreviewCard[][] = [
  [
    {
      id: 'project-zenith',
      label: 'Projects',
      title: 'Zenith Trader',
      description:
        'Institutional copy-trading platform that mirrors whale wallets on OKX in real time.',
      tags: ['Next.js', 'Realtime', 'Fintech'],
      image: '/projects/zenith-trader/cover.png',
      accent: 'from-blue-500/70 via-cyan-400/20 to-transparent',
    },
    {
      id: 'project-lokaskor',
      label: 'Projects',
      title: 'LokaSkor Pro',
      description:
        'AI-assisted location scoring SaaS that helps entrepreneurs find high-potential venues.',
      tags: ['AI', 'SaaS', 'GIS'],
      image: '/projects/lokaskor/cover.png',
      accent: 'from-emerald-500/70 via-teal-400/20 to-transparent',
    },
    {
      id: 'project-not-bildirim',
      label: 'Projects',
      title: 'Grade Notification Automation',
      description:
        'Automation that scrapes university grades with OCR and alerts via Telegram bot instantly.',
      tags: ['Automation', 'Python'],
      image: '/projects/not-bildirim-otomasyonu/carousel-2.png',
      accent: 'from-purple-500/70 via-pink-400/20 to-transparent',
    },
    {
      id: 'about-vision',
      label: 'About',
      title: 'Product-focused design & development',
      description:
        'Transforming complex business problems into intuitive experiences with performance in mind.',
      tags: ['Full-stack', 'UI/UX'],
      accent: 'from-sky-500/60 via-blue-400/10 to-transparent',
    },
    {
      id: 'about-stack',
      label: 'Stack',
      title: 'Type-safe modern toolkit',
      description:
        'Shipping production-ready solutions with TypeScript, React, Next.js and Node.js.',
      tags: ['TypeScript', 'Node.js', 'PostgreSQL'],
      accent: 'from-cyan-500/50 via-slate-800/30 to-transparent',
    },
  ],
  [
    {
      id: 'certificate-huawei',
      label: 'Certificates',
      title: 'Huawei HCIA-AI V3.5',
      description:
        'Comprehensive training covering deep learning and machine learning fundamentals.',
      tags: ['AI Fundamentals'],
      image: '/sertifikalar/huawei-hcia-ai-v3-5-turkish.png',
      accent: 'from-red-500/70 via-orange-400/20 to-transparent',
    },
    {
      id: 'certificate-btk-sql',
      label: 'Certificates',
      title: 'BTK SQL Practices',
      description:
        'Hands-on course for relational database design and query optimisation on real datasets.',
      tags: ['SQL', 'Database'],
      image: '/sertifikalar/btk-uygulamalarla-SQL.png',
      accent: 'from-blue-500/70 via-cyan-400/20 to-transparent',
    },
    {
      id: 'certificate-btk-db',
      label: 'Certificates',
      title: 'BTK Intro to Databases',
      description:
        'Foundational training on normalised schemas, data integrity and admin workflows.',
      tags: ['Data Modeling'],
      image: '/sertifikalar/btk-veri-tabanina-giris.png',
      accent: 'from-purple-500/70 via-pink-400/20 to-transparent',
    },
    {
      id: 'certificate-meta',
      label: 'Certificates',
      title: 'Meta Front-End Specialisation',
      description:
        'React component architecture, accessibility and performance optimisation best practices.',
      tags: ['React', 'Accessibility'],
      image: '/sertifikalar/meta-front-end-specialization.png',
      accent: 'from-emerald-500/70 via-slate-800/20 to-transparent',
    },
    {
      id: 'about-team',
      label: 'Workflow',
      title: 'Collaborative delivery',
      description:
        'Partnering with product teams and iterating quickly with tight feedback loops.',
      tags: ['Agile', 'Product'],
      accent: 'from-rose-500/40 via-slate-800/20 to-transparent',
    },
  ],
];

const columnDurations = [22, 26];

export default function LoadingScreen({ progress, stage }: LoadingScreenProps) {
  const progressValue = Math.round(Math.min(Math.max(progress, 0), 100));

  const overlayClasses = clsx(
    'fixed inset-0 z-40 overflow-hidden bg-slate-950/65 transition-opacity duration-700',
    stage === 'loading' ? 'opacity-100' : 'opacity-0 pointer-events-none'
  );

  const logoWrapperClasses = clsx(
    'fixed z-50 flex items-center justify-center text-white font-semibold transition-all duration-700 ease-out',
    stage === 'loading'
      ? 'top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2'
      : 'top-8 left-8 h-24 w-24 translate-x-0 translate-y-0 sm:h-28 sm:w-28'
  );

  const ringClasses = clsx(
    'absolute inset-0 rounded-full transition-all duration-700 ease-out',
    stage === 'final' ? 'border border-slate-500/60 bg-slate-900/80' : 'border border-transparent'
  );

  const ringStyle =
    stage === 'final'
      ? undefined
      : {
          background: `conic-gradient(#38bdf8 ${progressValue * 3.6}deg, rgba(148, 163, 184, 0.08) ${
            progressValue * 3.6
          }deg)`,
        };

  return (
    <>
      <div className={overlayClasses}>
        {stage === 'loading' && (
          <div className="pointer-events-none absolute inset-0 flex justify-center px-4 py-12 sm:px-8 md:px-24">
            <div className="flex w-full max-w-6xl flex-col items-center gap-10 md:flex-row md:items-center md:justify-between md:gap-24">
              {previewColumns.map((column, columnIndex) => {
                const items = [...column, ...column];

                return (
                  <div
                    key={columnIndex}
                    className="relative flex h-[500px] w-full max-w-[320px] flex-col overflow-hidden rounded-[2.75rem] border border-slate-800/25 bg-slate-900/20 p-6 backdrop-blur-[18px] shadow-[0_22px_70px_-50px_rgba(15,23,42,0.7)]"
                  >
                    <motion.div
                      animate={{ y: ['0%', '-50%'] }}
                      transition={{
                        repeat: Infinity,
                        duration: columnDurations[columnIndex % columnDurations.length],
                        ease: 'linear',
                      }}
                      className="flex flex-col gap-6 pb-6"
                    >
                      {items.map((item, itemIndex) => (
                        <article
                          key={`${item.id}-${itemIndex}`}
                          className="rounded-3xl border border-slate-800/25 bg-slate-900/45 px-7 py-6 shadow-[0_18px_46px_-36px_rgba(15,23,42,0.6)]"
                        >
                          {item.image ? (
                            <div className="relative mb-5 h-40 overflow-hidden rounded-2xl border border-slate-800/25">
                              <Image
                                src={item.image}
                                alt={`${item.title} preview`}
                                fill
                                sizes="(max-width: 1024px) 70vw, 320px"
                                className="object-cover opacity-90"
                                quality={35}
                                priority={columnIndex === 0 && itemIndex < 2}
                              />
                              <div
                                className={clsx(
                                  'absolute inset-0 bg-gradient-to-br opacity-30',
                                  item.accent
                                )}
                              />
                            </div>
                          ) : (
                            <div
                              className={clsx(
                                'mb-5 h-32 rounded-2xl border border-slate-800/25 bg-gradient-to-br opacity-50',
                                item.accent
                              )}
                            />
                          )}

                          <span className="text-[11px] uppercase tracking-[0.32em] text-sky-300/75">
                            {item.label}
                          </span>
                          <h3 className="mt-3 text-xl font-semibold text-slate-100/90">{item.title}</h3>
                          <p className="mt-3 text-sm leading-relaxed text-slate-300/70">
                            {item.description}
                          </p>
                          {item.tags && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {item.tags.map((tag) => (
                                <span
                                  key={`${item.id}-${tag}`}
                                  className="rounded-full border border-slate-700/30 bg-slate-800/30 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-slate-300/65"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </article>
                      ))}
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className={logoWrapperClasses}>
        <div className="relative flex h-full w-full items-center justify-center">
          <div className={ringClasses} style={ringStyle} />
          <div
            className={clsx(
              'absolute inset-[10%] overflow-hidden rounded-full border border-slate-900/40 bg-slate-900/20 transition-all duration-700 ease-out',
              stage === 'loading'
                ? 'shadow-[0_0_60px_rgba(56,189,248,0.28)]'
                : 'shadow-none'
            )}
          >
            <Image
              src="/yeni_loading_logosu.jpeg"
              alt="Alperen Manas profile photo"
              fill
              priority
              quality={50}
              sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 320px"
              className="object-cover"
            />
          </div>
          {stage === 'loading' && (
            <span className="absolute -bottom-16 text-sm font-medium tracking-[0.4em] text-slate-100/70">
              {progressValue}%
            </span>
          )}
        </div>
      </div>
    </>
  );
}
