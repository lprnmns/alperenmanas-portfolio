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
};

const previewColumns: PreviewCard[][] = [
  [
    {
      id: 'about-focus',
      label: 'Hakkımda',
      title: 'Tutkulu bir full-stack geliştirici',
      description:
        'TypeScript, React ve Node.js ile kullanıcı odaklı deneyimler oluşturuyorum.',
      tags: ['React', 'Next.js', 'TypeScript'],
    },
    {
      id: 'projects-preview',
      label: 'Projeler',
      title: 'Portfolyo, SaaS ve 3D deneyimler',
      description:
        'Gerçek dünyada kullanılan ürünler ve etkileşimli deneyimler geliştiriyorum.',
      tags: ['UI/UX', 'Framer Motion'],
    },
    {
      id: 'about-culture',
      label: 'Hakkımda',
      title: 'Öğrenmeye meraklı, disiplinli ve takım oyuncusu',
      description:
        'Sürekli gelişen teknolojilere ayak uydurmak için her gün yeni bir şeyler öğreniyorum.',
      tags: ['Problem Solving', 'Mentorluk'],
    },
  ],
  [
    {
      id: 'projects-impact',
      label: 'Projeler',
      title: 'Ölçeklenebilir ve performanslı çözümler',
      description:
        'API entegrasyonları, gerçek zamanlı paneller ve duyarlı web uygulamaları geliştiriyorum.',
      tags: ['API', 'Performance'],
    },
    {
      id: 'certificates-progress',
      label: 'Sertifikalar',
      title: 'Google, Meta & Bootstrap dersleri',
      description:
        'Modern frontend pratikleri ve kullanıcı deneyimi tasarımı üzerine resmî eğitimler.',
      tags: ['Frontend', 'UX'],
    },
    {
      id: 'certificates-lifetime',
      label: 'Sertifikalar',
      title: 'Sürekli öğrenme alışkanlığı',
      description:
        'Yeni teknolojileri deneyerek ve sertifika programlarıyla yetkinliklerimi arttırıyorum.',
      tags: ['Lifelong Learning'],
    },
  ],
];

const columnDurations = [18, 22];

export default function LoadingScreen({ progress, stage }: LoadingScreenProps) {
  const progressValue = Math.round(Math.min(Math.max(progress, 0), 100));

  const overlayClasses = clsx(
    'fixed inset-0 z-40 overflow-hidden bg-slate-950/88 transition-opacity duration-700',
    stage === 'loading' ? 'opacity-100' : 'opacity-0 pointer-events-none'
  );

  const logoWrapperClasses = clsx(
    'fixed z-50 flex items-center justify-center text-white font-semibold transition-all duration-700 ease-out',
    stage === 'loading'
      ? 'top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2'
      : 'top-6 left-6 h-16 w-16 translate-x-0 translate-y-0 sm:h-20 sm:w-20'
  );

  const ringClasses = clsx(
    'absolute inset-0 rounded-full transition-all duration-700 ease-out',
    stage === 'final' ? 'border border-slate-500/70 bg-slate-900/90' : 'border border-transparent'
  );

  const ringStyle =
    stage === 'final'
      ? undefined
      : {
          background: `conic-gradient(#38bdf8 ${progressValue * 3.6}deg, rgba(148, 163, 184, 0.15) ${
            progressValue * 3.6
          }deg)`,
        };

  return (
    <>
      <div className={overlayClasses}>
        {stage === 'loading' && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 py-16 text-slate-200 sm:flex-row sm:items-stretch sm:justify-between sm:px-12 md:px-20">
            {previewColumns.map((column, columnIndex) => {
              const items = [...column, ...column];
              return (
                <div
                  key={columnIndex}
                  className={clsx(
                    'relative h-full w-full max-w-[260px] overflow-hidden',
                    columnIndex === 1 ? 'hidden sm:block' : 'block'
                  )}
                >
                  <motion.div
                    animate={{ y: ['0%', '-50%'] }}
                    transition={{
                      repeat: Infinity,
                      duration: columnDurations[columnIndex % columnDurations.length],
                      ease: 'linear',
                    }}
                    className="flex flex-col gap-5 pb-5"
                  >
                    {items.map((item, itemIndex) => (
                      <article
                        key={`${item.id}-${itemIndex}`}
                        className="rounded-3xl border border-slate-800/60 bg-slate-900/70 px-7 py-6 shadow-[0_20px_40px_-24px_rgba(15,23,42,0.85)] backdrop-blur-md transition-colors duration-500 hover:border-sky-400/60"
                      >
                        <span className="text-[10px] uppercase tracking-[0.35em] text-sky-400/80">
                          {item.label}
                        </span>
                        <h3 className="mt-3 text-lg font-semibold text-slate-100">{item.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-300/85">
                          {item.description}
                        </p>
                        {item.tags && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                              <span
                                key={`${item.id}-${tag}`}
                                className="rounded-full border border-slate-700/50 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-slate-400/80"
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
        )}
      </div>
      <div className={logoWrapperClasses}>
        <div className="relative flex h-full w-full items-center justify-center">
          <div className={ringClasses} style={ringStyle} />
          <div
            className={clsx(
              'absolute inset-[12%] overflow-hidden rounded-full border border-slate-900/40 bg-slate-900/20 transition-all duration-700 ease-out',
              stage === 'loading'
                ? 'shadow-[0_0_50px_rgba(56,189,248,0.35)]'
                : 'shadow-none'
            )}
          >
            <Image
              src="/yeni_loading_logosu.jpeg"
              alt="Alperen Manas profile photo"
              fill
              priority
              sizes="(max-width: 640px) 160px, (max-width: 1024px) 220px, 224px"
              className="object-cover"
            />
          </div>
          {stage === 'loading' && (
            <span className="absolute -bottom-14 text-xs font-medium tracking-[0.35em] text-slate-300">
              {progressValue}%
            </span>
          )}
        </div>
      </div>
    </>
  );
}
