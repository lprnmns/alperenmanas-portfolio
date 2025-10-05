'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { DEFAULT_LANGUAGE, availableLanguages, getDictionary, type BaseDictionary, type Language } from '@/lib/i18n';

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  dictionary: BaseDictionary;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);
const STORAGE_KEY = 'am_language';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored === 'en' || stored === 'tr') {
      setLanguage(stored);
      document.documentElement.lang = stored;
    } else {
      document.documentElement.lang = DEFAULT_LANGUAGE;
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [hydrated, language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    toggleLanguage: () => setLanguage((prev) => (prev === 'en' ? 'tr' : 'en')),
    dictionary: getDictionary(language),
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
}

export { availableLanguages };
