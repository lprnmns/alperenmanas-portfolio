'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { Github, Linkedin, ChevronDown, X } from 'lucide-react';
import Image from 'next/image';

import { GithubContributions } from '@/components/ui/GithubContributions';
import LoadingScreen from '@/components/LoadingScreen';
import { useLanguage } from '@/components/providers/LanguageProvider';
import AnimatedBackground from '@/components/animations/AnimatedBackground';
import Navigation from '@/components/sections/Navigation';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import Certificates from '@/components/sections/Certificates';

type LoadingStage = 'loading' | 'transition' | 'final';

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const actionsVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15,
      duration: 0.45,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.12,
    },
  },
};

const actionItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

const sectionsVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const heroContainerVariants: Variants = {
  center: { y: 0, scale: 1 },
  pinned: {
    y: 0,
    scale: 0.95,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<LoadingStage>('loading');
  const [showHeading, setShowHeading] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showSections, setShowSections] = useState(false);
  const [heroPinned, setHeroPinned] = useState(false);
  const [showContribs, setShowContribs] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(false);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);
  const heroContainerRef = useRef<HTMLDivElement | null>(null);
  const aboutSectionRef = useRef<HTMLElement | null>(null);
  const { dictionary } = useLanguage();

  useEffect(() => {
    if (stage !== 'loading') {
      return;
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return prev;
        }

        const increment = Math.floor(Math.random() * 4) + 1;
        const nextValue = Math.min(prev + increment, 100);

        if (nextValue === 100) {
          clearInterval(timer);
        }

        return nextValue;
      });
    }, 40);

    return () => {
      clearInterval(timer);
    };
  }, [stage]);

  useEffect(() => {
    if (stage === 'loading' && progress === 100) {
      setStage('transition');
    }
  }, [progress, stage]);

  useEffect(() => {
    if (stage === 'transition') {
      const timeout = setTimeout(() => {
        setStage('final');
      }, 900);

      return () => clearTimeout(timeout);
    }
  }, [stage]);

  useEffect(() => {
    if (stage === 'final') {
      const headingTimer = setTimeout(() => setShowHeading(true), 120);
      const actionsTimer = setTimeout(() => setShowActions(true), 360);
      const sectionsTimer = setTimeout(() => setShowSections(true), 660);

      return () => {
        clearTimeout(headingTimer);
        clearTimeout(actionsTimer);
        clearTimeout(sectionsTimer);
      };
    }

    setShowHeading(false);
    setShowActions(false);
    setShowSections(false);
    setHeroPinned(false);
    setShowContribs(false);
  }, [stage]);

  useEffect(() => {
    if (showActions && !heroPinned) {
      const timer = setTimeout(() => {
        setHeroPinned(true);
        setShowContribs(true);
        requestAnimationFrame(() => {
          const containerTop = heroContainerRef.current?.offsetTop ?? 0;
          const target = Math.max(containerTop - 16, 0);
          window.scrollTo({ top: target, behavior: 'smooth' });
        });
      }, 900);

      return () => clearTimeout(timer);
    }
  }, [showActions, heroPinned]);

  useEffect(() => {
    if (heroPinned && !announcementDismissed) {
      setAnnouncementVisible(true);
    }
  }, [heroPinned, announcementDismissed]);

  const heroContainerState = heroPinned ? 'pinned' : 'center';
  const headingState = showHeading ? 'visible' : 'hidden';
  const actionsState = showActions ? 'visible' : 'hidden';
  const sectionsState = showSections ? 'visible' : 'hidden';
  const announcement = dictionary.announcement;

  const handleAnnouncementClose = () => {
    setAnnouncementVisible(false);
    setAnnouncementDismissed(true);
  };

  const heroContainerClass = clsx(
    'relative z-20 mx-auto flex max-w-6xl flex-col items-center text-center transition-all duration-700',
    heroPinned
      ? 'min-h-[30vh] justify-start gap-8 px-6 pt-12 pb-10 sm:pt-16 sm:pb-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:text-left'
      : 'min-h-[85vh] justify-center gap-12 px-6 pt-24 pb-20 sm:pt-32 sm:pb-24'
  );

  const heroStackClass = clsx(
    'flex w-full flex-col items-center gap-8 text-center transition-all duration-700',
    heroPinned && 'lg:max-w-xl lg:items-start lg:text-left'
  );

  return (
    <main className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <LoadingScreen progress={progress} stage={stage} />
      <Navigation />
      <div
        className={clsx(
          'relative z-10 transition-all duration-700 ease-out',
          stage === 'final' ? 'opacity-100 blur-0' : 'opacity-25 blur-sm'
        )}
      >
        <AnimatedBackground />

        <AnimatePresence>
          {announcementVisible && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="fixed top-6 right-6 z-30 w-full max-w-[380px]"
            >
              <div className="relative overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-900/95 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-cyan-500/10 to-transparent" />
                <div className="relative flex flex-col gap-5 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Monad Blitz</p>
                      <h3 className="mt-2 text-xl font-semibold text-white">{announcement.title}</h3>
                      <p className="mt-1 text-sm font-medium text-slate-300">{announcement.subtitle}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAnnouncementClose}
                      className="rounded-full border border-slate-700/60 bg-slate-900/80 p-2 text-slate-400 transition hover:text-white"
                      aria-label={announcement.close}
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950/60">
                    <Image
                      src="/achievements/monad-blitz-first-prize.jpg"
                      alt={announcement.imageAlt}
                      width={320}
                      height={420}
                      className="h-auto w-full object-cover"
                      priority
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-blue-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">{announcement.date}</span>
                  </div>

                  <p className="text-sm leading-relaxed text-slate-300">{announcement.description}</p>

                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Layer-1 · Hackathon Winner</span>
                    <button
                      type="button"
                      onClick={handleAnnouncementClose}
                      className="font-medium text-cyan-300 transition hover:text-cyan-200"
                    >
                      {announcement.close}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          ref={heroContainerRef}
          variants={heroContainerVariants}
          initial="center"
          animate={heroContainerState}
          className={heroContainerClass}
        >
          <div className={heroStackClass}>
            <motion.h1
              initial="hidden"
              animate={headingState}
              variants={headingVariants}
              className="text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl"
            >
              Alperen Manas
            </motion.h1>

            <motion.div
              initial="hidden"
              animate={actionsState}
              variants={actionsVariants}
              className="flex flex-wrap items-center justify-center gap-5"
            >
              <motion.a
                variants={actionItemVariants}
                href="https://github.com/lprnmns"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 text-sm font-medium text-white shadow-blue-500/50 transition-shadow duration-300 hover:shadow-lg sm:text-base"
              >
                <Github size={20} />
                <span>GitHub</span>
              </motion.a>
              <motion.a
                variants={actionItemVariants}
                href="https://www.linkedin.com/in/alperen-manas-a92aa2378/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 text-sm font-medium text-white shadow-blue-500/50 transition-shadow duration-300 hover:shadow-lg sm:text-base"
              >
                <Linkedin size={20} />
                <span>LinkedIn</span>
              </motion.a>
            </motion.div>
          </div>

          {showContribs && (
            <motion.div
              initial={{ opacity: 0, x: 48 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mt-12 w-full max-w-2xl lg:mt-0 lg:max-w-md"
            >
              <GithubContributions username="lprnmns" />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={heroPinned ? { opacity: 0, y: 16 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400/80"
            aria-hidden="true"
          >
            <ChevronDown className="h-8 w-8 animate-bounce" strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        <motion.section
          ref={aboutSectionRef}
          initial="hidden"
          animate={sectionsState}
          variants={sectionsVariants}
          className="mx-auto mt-10 max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-12 lg:col-span-5">
              <About />
              <Certificates />
            </div>
            <div className="lg:col-span-7">
              <Projects />
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
