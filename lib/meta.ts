import type { Metadata, Viewport } from 'next';
import { CONTENT, type Lang } from './content';

const SITE = 'https://www.alperenmanas.app';

export function metaFor(lang: Lang): Metadata {
  const c = CONTENT[lang];
  return {
    metadataBase: new URL(SITE),
    title: c.title,
    description: c.description,
    alternates: { canonical: lang === 'tr' ? '/' : '/en', languages: { tr: '/', en: '/en' } },
    openGraph: {
      title: c.title,
      description: c.description,
      url: lang === 'tr' ? '/' : '/en',
      siteName: 'Alperen Manas',
      locale: lang === 'tr' ? 'tr_TR' : 'en_US',
      type: 'profile',
      images: [{ url: '/img/og.jpg', width: 600, height: 800, alt: c.photoAlt }],
    },
    twitter: { card: 'summary', title: c.title, description: c.description, images: ['/img/og.jpg'] },
    icons: { icon: '/favicon.svg' },
  };
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#050a14' };
