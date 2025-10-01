'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

import LoadingScreen, { type LoadingStage } from '@/components/LoadingScreen';
import AnimatedBackground from '@/components/animations/AnimatedBackground';
import Navigation from '@/components/sections/Navigation';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import Certificates from '@/components/sections/Certificates';

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

  const contentClasses = clsx(
    'relative z-10 transition-all duration-700 ease-out',
    stage === 'final'
      ? 'opacity-100 blur-0 pointer-events-auto'
      : 'opacity-30 blur-sm pointer-events-none animate-content-flow motion-reduce:animate-none'
  );

  return (
    <main className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <LoadingScreen progress={progress} stage={stage} />
      <div className={contentClasses}>
        <AnimatedBackground />
        <Navigation />
        <Hero />
        <Projects />
        <About />
        <Certificates />
      </div>
    </main>
  );
}
