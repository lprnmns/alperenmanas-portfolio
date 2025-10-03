'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

import LoadingScreen from '@/components/LoadingScreen';
import AnimatedBackground from '@/components/animations/AnimatedBackground';
import Navigation from '@/components/sections/Navigation';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import Certificates from '@/components/sections/Certificates';

type LoadingStage = 'loading' | 'transition' | 'final';

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
    }, 45);

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
      }, 1100);

      return () => clearTimeout(timeout);
    }
  }, [stage]);

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
        <Hero />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5 space-y-12">
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
