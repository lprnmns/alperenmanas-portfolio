import type { Metadata, Viewport } from 'next';
import { CONTENT, type Lang } from './content';

const SITE = 'https://www.alperenmanas.app';

// Açıklama ve paylaşım bilgileri sayfadaki sayılarla aynı kaynaktan (canlı GitHub verisi) üretilir
export function metaFor(lang: Lang, n?: { total: number; repos: number }): Metadata {
  const c = CONTENT[lang];
  const total = n?.total ?? 150;
  const repos = n?.repos ?? 56;
  const description =
    lang === 'tr'
      ? `Bilgisayar mühendisliği 4. sınıf öğrencisi. ${repos} açık kaynak projede ${total} kabul edilen kod katkısı, hackathon birinciliği, TEKNOFEST 2026 finali. 8 Şubat 2027'den itibaren 14 haftalık İME stajı arıyor.`
      : `Final-year computer engineering student. ${total} merged contributions in ${repos} open-source projects, hackathon winner, TEKNOFEST 2026 finalist. Looking for a 14-week internship from 8 February 2027.`;
  const og = lang === 'tr' ? '/img/og.jpg' : '/img/og-en.jpg';
  const path = lang === 'tr' ? '/tr' : '/en';
  return {
    metadataBase: new URL(SITE),
    title: c.title,
    description,
    alternates: { canonical: path, languages: { tr: '/tr', en: '/en' } },
    openGraph: {
      title: c.title,
      description,
      url: path,
      siteName: 'Alperen Manas',
      locale: lang === 'tr' ? 'tr_TR' : 'en_US',
      type: 'profile',
      images: [{ url: og, width: 1200, height: 630, alt: c.title }],
    },
    twitter: { card: 'summary_large_image', title: c.title, description, images: [og] },
    icons: { icon: '/favicon.svg' },
  };
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#0E0F12' };
