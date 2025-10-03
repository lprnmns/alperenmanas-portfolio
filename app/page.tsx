'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { motion, type Variants } from 'framer-motion';
import { Github, Linkedin, ChevronDown } from 'lucide-react';

import LoadingScreen from '@/components/LoadingScreen';
import AnimatedBackground from '@/components/animations/AnimatedBackground';
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

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<LoadingStage>('loading');
  const [showHeading, setShowHeading] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showSections, setShowSections] = useState(false);

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
  }, [stage]);

  const headingState = showHeading ? 'visible' : 'hidden';
  const actionsState = showActions ? 'visible' : 'hidden';
  const sectionsState = showSections ? 'visible' : 'hidden';

  return (
    <main className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <LoadingScreen progress={progress} stage={stage} />
      <div
        className={clsx(
          'relative z-10 transition-all duration-700 ease-out',
          stage === 'final' ? 'opacity-100 blur-0' : 'opacity-25 blur-sm'
        )}
      >
        <AnimatedBackground />

        <div className="relative z-20 mx-auto flex min-h-[85vh] max-w-4xl flex-col items-center justify-center gap-10 px-6 pt-24 pb-20 text-center sm:pt-32 sm:pb-24">
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

          <motion.div
            initial="hidden"
            animate={actionsState}
            variants={actionsVariants}
            className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400/80"
            aria-hidden="true"
          >
            <ChevronDown className="h-8 w-8 animate-bounce" strokeWidth={1.5} />
          </motion.div>
        </div>
        <motion.section
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