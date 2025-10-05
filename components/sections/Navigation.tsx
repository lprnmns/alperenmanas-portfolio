'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Menu, X } from 'lucide-react';
import Link from 'next/link';

import { useLanguage } from '@/components/providers/LanguageProvider';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, dictionary } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = useMemo(() => [
    { name: dictionary.navigation.projects, href: '#projects' },
    { name: dictionary.navigation.about, href: '#about' },
    { name: dictionary.navigation.certificates, href: '#certificates' },
  ], [dictionary.navigation]);

  const languageLabel = language.toUpperCase();
  const languageButtonTitle =
    language === 'en'
      ? `Switch to ${dictionary.navigation.turkish}`
      : `Switch to ${dictionary.navigation.english}`;

  const renderLanguageButton = (className: string) => (
    <button
      type="button"
      onClick={toggleLanguage}
      className={className}
      aria-label={dictionary.languageToggle.srLabel}
      title={languageButtonTitle}
    >
      {languageLabel}
    </button>
  );

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-800'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer text-xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text"
            >
              Alperen Manas
            </motion.div>
          </Link>

          <div className="hidden items-center space-x-6 md:flex">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative cursor-pointer text-slate-300 transition-colors hover:text-white"
                >
                  {item.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-blue-400 to-cyan-400"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </Link>
            ))}

            {renderLanguageButton('rounded-lg border border-slate-700/60 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-blue-500/60')}

            <motion.a
              href="https://github.com/lprnmns"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 font-medium text-white shadow-blue-500/50 transition-shadow hover:shadow-lg"
            >
              <Github size={20} />
              {dictionary.navigation.github}
            </motion.a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white md:hidden"
            aria-label={mobileMenuOpen ? dictionary.navigation.closeMenu : dictionary.navigation.openMenu}
            type="button"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-40 w-64 bg-slate-900/98 backdrop-blur-lg shadow-2xl md:hidden"
          >
            <div className="mt-16 flex flex-col space-y-6 p-6">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg text-slate-300 transition-colors hover:text-white"
                >
                  {item.name}
                </motion.a>
              ))}

              <div className="flex items-center gap-3">
                {renderLanguageButton('flex-1 rounded-lg border border-slate-700/60 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-slate-200 transition hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-blue-500/60')}
              </div>

              <motion.a
                href="https://github.com/lprnmns"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 font-medium text-white"
              >
                <Github size={20} />
                {dictionary.navigation.github}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
