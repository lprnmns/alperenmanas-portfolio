'use client';

import AnimatedBackground from '@/components/animations/AnimatedBackground';
import Navigation from '@/components/sections/Navigation';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import About from '@/components/sections/About';
import Certificates from '@/components/sections/Certificates';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      <AnimatedBackground />
      <Navigation />
      <Hero />
      <Projects />
      <About />
      <Certificates />
    </main>
  );
}
