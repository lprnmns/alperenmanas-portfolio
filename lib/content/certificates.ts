import type { Language } from '@/lib/i18n';

export interface CertificateItem {
  name: string;
  issuer: string;
  image: string;
  gradient: string;
}

const certificateDefinitions = [
  {
    image: '/sertifikalar/huawei-hcia-ai-v3-5-turkish.png',
    gradient: 'from-red-500 to-orange-500',
    name: {
      en: 'Huawei HCIA-AI V3.5 (Turkish)',
      tr: 'Huawei HCIA-AI V3.5 (Turkish)',
    },
    issuer: { en: 'Huawei', tr: 'Huawei' },
  },
  {
    image: '/sertifikalar/btk-veri-tabanina-giris.png',
    gradient: 'from-blue-500 to-cyan-500',
    name: {
      en: 'BTK – Introduction to Databases',
      tr: 'BTK – Veri Tabanına Giriş',
    },
    issuer: { en: 'BTK Academy', tr: 'BTK Akademi' },
  },
  {
    image: '/sertifikalar/btk-uygulamalarla-SQL.png',
    gradient: 'from-purple-500 to-pink-500',
    name: {
      en: 'BTK – Learning SQL with Hands-on Projects',
      tr: 'BTK – Uygulamalarla SQL Öğreniyorum',
    },
    issuer: { en: 'BTK Academy', tr: 'BTK Akademi' },
  },
] as const;

export function getCertificates(language: Language): CertificateItem[] {
  return certificateDefinitions.map((certificate) => ({
    name: certificate.name[language],
    issuer: certificate.issuer[language],
    image: certificate.image,
    gradient: certificate.gradient,
  }));
}
