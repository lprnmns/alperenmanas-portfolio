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
      label: 'Projeler',
      title: 'Zenith Trader',
      description:
        'Whale cüzdan hareketlerini izleyip OKX üzerinde otomatik işlem açan kurumsal platform.',
      tags: ['Next.js', 'Realtime', 'Fintech'],
      image: '/projects/zenith-trader/cover.png',
      accent: 'from-blue-500/70 via-cyan-400/20 to-transparent',
    },
    {
      id: 'project-lokaskor',
      label: 'Projeler',
      title: 'LokaSkor Pro',
      description:
        'Yapay zeka destekli lokasyon skorlamasıyla doğru yatırımı seçmeye yardımcı SaaS ürünü.',
      tags: ['AI', 'SaaS', 'GIS'],
      image: '/projects/lokaskor/cover.png',
      accent: 'from-emerald-500/70 via-teal-400/20 to-transparent',
    },
    {
      id: 'project-not-bildirim',
      label: 'Projeler',
      title: 'Not Bildirim Otomasyonu',
      description:
        'OBS sisteminde yeni notları OCR ve Telegram botu ile anlık haber veren otomasyon.',
      tags: ['Automation', 'Python'],
      image: '/projects/not-bildirim-otomasyonu/carousel-2.png',
      accent: 'from-purple-500/70 via-pink-400/20 to-transparent',
    },
    {
      id: 'project-iran-monitor',
      label: 'Projeler',
      title: 'İran Hava Sahası Monitör',
      description:
        'Jeopolitik kriz anında yardım uçuşlarını harita üzerinde gerçek zamanlı izleyen hobi projesi.',
      tags: ['Leaflet', 'Real-time'],
      image: '/projects/iran-havasahasi-monitor/cover.png',
      accent: 'from-amber-500/70 via-orange-400/20 to-transparent',
    },
  ],
  [
    {
      id: 'about-vision',
      label: 'Hakkımda',
      title: 'Ürüne odaklı tasarım & geliştirme',
      description:
        'Karmaşık iş problemlerini kullanıcı dostu deneyimlere dönüştürürken performans ve ölçeklenebilirliği birlikte düşünüyorum.',
      tags: ['Full-stack', 'UI/UX'],
      accent: 'from-sky-500/60 via-blue-400/10 to-transparent',
    },
    {
      id: 'about-stack',
      label: 'Teknolojiler',
      title: 'Tip güvenli modern stack',
      description:
        'TypeScript, React, Next.js ve Node.js ekosisteminde üretim ortamına hazır çözümler inşa ediyorum.',
      tags: ['TypeScript', 'Node.js', 'PostgreSQL'],
      accent: 'from-cyan-500/50 via-slate-800/30 to-transparent',
    },
    {
      id: 'about-craft',
      label: 'Üretim',
      title: 'Sürekli öğrenme ve paylaşım',
      description:
        'Yeni teknolojileri deneyip topluluklarda anlatıyorum; doküman, demo ve eğitim içerikleri hazırlıyorum.',
      tags: ['Mentorluk', 'Topluluk'],
      accent: 'from-indigo-500/50 via-violet-400/20 to-transparent',
    },
    {
      id: 'about-team',
      label: 'Çalışma Şekli',
      title: 'Takım uyumu ve hızlı iterasyon',
      description:
        'Ürün ekipleriyle yakın çalışıp hızlı geri bildirim döngüleriyle fikirleri canlıya taşıyorum.',
      tags: ['Agile', 'Product'],
      accent: 'from-rose-500/50 via-slate-800/30 to-transparent',
    },
  ],
  [
    {
      id: 'certificate-huawei',
      label: 'Sertifikalar',
      title: 'Huawei HCIA-AI V3.5',
      description:
        'Derin öğrenme ve makine öğrenimi temellerini kapsayan kapsamlı eğitim programı.',
      tags: ['AI Fundamentals'],
      image: '/sertifikalar/huawei-hcia-ai-v3-5-turkish.png',
      accent: 'from-red-500/70 via-orange-400/20 to-transparent',
    },
    {
      id: 'certificate-btk-sql',
      label: 'Sertifikalar',
      title: 'BTK SQL Uygulamaları',
      description:
        'Gerçek veri setleriyle ilişkisel veritabanı tasarımı ve sorgu optimizasyonu.',
      tags: ['SQL', 'Database'],
      image: '/sertifikalar/btk-uygulamalarla-SQL.png',
      accent: 'from-blue-500/70 via-cyan-400/20 to-transparent',
    },
    {
      id: 'certificate-btk-db',
      label: 'Sertifikalar',
      title: 'BTK Veritabanına Giriş',
      description:
        'Normalize şemalar, veri bütünlüğü ve yönetim süreçlerine odaklı temel eğitim.',
      tags: ['Data Modeling'],
      image: '/sertifikalar/btk-veri-tabanina-giris.png',
      accent: 'from-purple-500/70 via-pink-400/20 to-transparent',
    },
  ],
];

const columnDurations = [20, 24, 22];

export default function LoadingScreen({ progress, stage }: LoadingScreenProps) {
  const progressValue = Math.round(Math.min(Math.max(progress, 0), 100));

  const overlayClasses = clsx(
    'fixed inset-0 z-40 overflow-hidden bg-slate-950/88 transition-opacity duration-700',
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
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 py-12 sm:px-8 md:px-12">
            <div className="flex w-full max-w-6xl flex-col items-center gap-8 md:flex-row md:items-stretch md:justify-between">
              {previewColumns.map((column, columnIndex) => {
                const items = [...column, ...column];

                return (
                  <div
                    key={columnIndex}
                    className={clsx(
                      'relative flex h-[520px] w-full max-w-[340px] flex-col overflow-hidden rounded-[2.75rem] border border-slate-800/40 bg-slate-900/45 p-6 backdrop-blur-xl shadow-[0_30px_80px_-60px_rgba(15,23,42,0.9)]',
                      columnIndex === 1 ? 'hidden xl:flex' : 'flex'
                    )}
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
                          className="rounded-3xl border border-slate-800/50 bg-slate-900/80 px-7 py-6 shadow-[0_22px_48px_-34px_rgba(15,23,42,0.95)]"
                        >
                          {item.image ? (
                            <div className="relative mb-5 h-44 overflow-hidden rounded-2xl border border-slate-800/50">
                              <Image
                                src={item.image}
                                alt={`${item.title} görseli`}
                                fill
                                sizes="(max-width: 1024px) 80vw, 340px"
                                className="object-cover"
                                priority={columnIndex === 0 && itemIndex < 2}
                              />
                              <div
                                className={clsx(
                                  'absolute inset-0 bg-gradient-to-br opacity-45',
                                  item.accent
                                )}
                              />
                            </div>
                          ) : (
                            <div
                              className={clsx(
                                'mb-5 h-36 rounded-2xl border border-slate-800/50 bg-gradient-to-br opacity-80',
                                item.accent
                              )}
                            />
                          )}

                          <span className="text-[11px] uppercase tracking-[0.35em] text-sky-400/90">
                            {item.label}
                          </span>
                          <h3 className="mt-3 text-xl font-semibold text-slate-100">{item.title}</h3>
                          <p className="mt-3 text-sm leading-relaxed text-slate-300/85">
                            {item.description}
                          </p>
                          {item.tags && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {item.tags.map((tag) => (
                                <span
                                  key={`${item.id}-${tag}`}
                                  className="rounded-full border border-slate-700/50 bg-slate-800/60 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-slate-300/80"
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
              'absolute inset-[10%] overflow-hidden rounded-full border border-slate-900/50 bg-slate-900/30 transition-all duration-700 ease-out',
              stage === 'loading'
                ? 'shadow-[0_0_70px_rgba(56,189,248,0.35)]'
                : 'shadow-none'
            )}
          >
            <Image
              src="/yeni_loading_logosu.jpeg"
              alt="Alperen Manas profile photo"
              fill
              priority
              sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 320px"
              className="object-cover"
            />
          </div>
          {stage === 'loading' && (
            <span className="absolute -bottom-16 text-sm font-medium tracking-[0.4em] text-slate-200">
              {progressValue}%
            </span>
          )}
        </div>
      </div>
    </>
  );
}
