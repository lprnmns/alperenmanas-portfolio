'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { motion, type Variants } from 'framer-motion';

import LoadingScreen from '@/components/LoadingScreen';
import AnimatedBackground from '@/components/animations/AnimatedBackground';
import Navigation from '@/components/sections/Navigation';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import Certificates from '@/components/sections/Certificates';

type LoadingStage = 'loading' | 'transition' | 'final';

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const chipListVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.45,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.12,
    },
  },
};

const chipItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<LoadingStage>('loading');

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

  const headingState = stage === 'loading' ? 'hidden' : 'visible';

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
        <Navigation />

        <div className="relative z-20 mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 pt-24 pb-12 text-center sm:pt-28">
          <motion.h1
            initial="hidden"
            animate={headingState}
            variants={headingVariants}
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Alperen Manas
          </motion.h1>
          <motion.div
            initial="hidden"
            animate={headingState}
            variants={chipListVariants}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <motion.a
              variants={chipItemVariants}
              href="https://github.com/lprnmns"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 font-medium text-white shadow-blue-500/50 transition-shadow duration-300 hover:shadow-lg"
            >
              GitHub
            </motion.a>
            <motion.a
              variants={chipItemVariants}
              href="https://www.linkedin.com/in/alperen-manas-a92aa2378/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 font-medium text-white shadow-blue-500/50 transition-shadow duration-300 hover:shadow-lg"
            >
              LinkedIn
            </motion.a>
          </motion.div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-12 lg:col-span-5">
              <About />
              <Certificates />
            </div>

            <div className="lg:col-span-7">
              <Projects />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
