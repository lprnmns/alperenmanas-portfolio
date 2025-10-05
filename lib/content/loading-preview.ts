import type { Language } from '@/lib/i18n';

export type LoadingPreviewCard = {
  id: string;
  label: string;
  title: string;
  description: string;
  tags?: string[];
  image?: string;
  accent?: string;
};

export type LoadingPreviewColumn = LoadingPreviewCard[];

const previewColumns: Record<Language, LoadingPreviewColumn[]> = {
  en: [
    [
      {
        id: 'project-zenith',
        label: 'Projects',
        title: 'Zenith Trader',
        description:
          'Institutional copy-trading platform that mirrors whale wallets on OKX in real time.',
        tags: ['Next.js', 'Realtime', 'Fintech'],
        image: '/projects/zenith-trader/cover.png',
        accent: 'from-blue-500/70 via-cyan-400/20 to-transparent',
      },
      {
        id: 'project-lokaskor',
        label: 'Projects',
        title: 'LokaSkor Pro',
        description:
          'AI-assisted location scoring SaaS that helps entrepreneurs find high-potential venues.',
        tags: ['AI', 'SaaS', 'GIS'],
        image: '/projects/lokaskor/cover.png',
        accent: 'from-emerald-500/70 via-teal-400/20 to-transparent',
      },
      {
        id: 'project-not-bildirim',
        label: 'Projects',
        title: 'Grade Notification Automation',
        description:
          'Automation that scrapes university grades with OCR and alerts via Telegram bot instantly.',
        tags: ['Automation', 'Python'],
        image: '/projects/not-bildirim-otomasyonu/carousel-2.png',
        accent: 'from-purple-500/70 via-pink-400/20 to-transparent',
      },
      {
        id: 'about-vision',
        label: 'About',
        title: 'Product-focused design & development',
        description:
          'Transforming complex business problems into intuitive experiences with performance in mind.',
        tags: ['Full-stack', 'UI/UX'],
        accent: 'from-sky-500/60 via-blue-400/10 to-transparent',
      },
      {
        id: 'about-stack',
        label: 'Stack',
        title: 'Type-safe modern toolkit',
        description:
          'Shipping production-ready solutions with TypeScript, React, Next.js and Node.js.',
        tags: ['TypeScript', 'Node.js', 'PostgreSQL'],
        accent: 'from-cyan-500/50 via-slate-800/30 to-transparent',
      },
    ],
    [
      {
        id: 'certificate-huawei',
        label: 'Certificates',
        title: 'Huawei HCIA-AI V3.5',
        description:
          'Comprehensive training covering deep learning and machine learning fundamentals.',
        tags: ['AI Fundamentals'],
        image: '/sertifikalar/huawei-hcia-ai-v3-5-turkish.png',
        accent: 'from-red-500/70 via-orange-400/20 to-transparent',
      },
      {
        id: 'certificate-btk-sql',
        label: 'Certificates',
        title: 'BTK SQL Practices',
        description:
          'Hands-on course for relational database design and query optimisation on real datasets.',
        tags: ['SQL', 'Database'],
        image: '/sertifikalar/btk-uygulamalarla-SQL.png',
        accent: 'from-blue-500/70 via-cyan-400/20 to-transparent',
      },
      {
        id: 'certificate-btk-db',
        label: 'Certificates',
        title: 'BTK Intro to Databases',
        description:
          'Foundational training on normalised schemas, data integrity and admin workflows.',
        tags: ['Data Modeling'],
        image: '/sertifikalar/btk-veri-tabanina-giris.png',
        accent: 'from-purple-500/70 via-pink-400/20 to-transparent',
      },
      {
        id: 'certificate-meta',
        label: 'Certificates',
        title: 'Meta Front-End Specialisation',
        description:
          'React component architecture, accessibility and performance optimisation best practices.',
        tags: ['React', 'Accessibility'],
        image: '/sertifikalar/meta-front-end-specialization.png',
        accent: 'from-emerald-500/70 via-slate-800/20 to-transparent',
      },
      {
        id: 'about-team',
        label: 'Workflow',
        title: 'Collaborative delivery',
        description:
          'Partnering with product teams and iterating quickly with tight feedback loops.',
        tags: ['Agile', 'Product'],
        accent: 'from-rose-500/40 via-slate-800/20 to-transparent',
      },
    ],
  ],
  tr: [
    [
      {
        id: 'project-zenith',
        label: 'Projeler',
        title: 'Zenith Trader',
        description:
          'OKX üzerinde balina cüzdanlarını gerçek zamanlı izleyip otomatik kopyalayan kurumsal copy-trading platformu.',
        tags: ['Next.js', 'Gerçek zamanlı', 'Fintech'],
        image: '/projects/zenith-trader/cover.png',
        accent: 'from-blue-500/70 via-cyan-400/20 to-transparent',
      },
      {
        id: 'project-lokaskor',
        label: 'Projeler',
        title: 'LokaSkor Pro',
        description:
          'KOBİ ve girişimciler için yüksek potansiyelli lokasyonları bulan yapay zekâ destekli skorlama platformu.',
        tags: ['AI', 'SaaS', 'CBS'],
        image: '/projects/lokaskor/cover.png',
        accent: 'from-emerald-500/70 via-teal-400/20 to-transparent',
      },
      {
        id: 'project-not-bildirim',
        label: 'Projeler',
        title: 'Not Bildirim Otomasyonu',
        description:
          'Üniversite notlarını OCR ile tarayıp Telegram botu üzerinden anında bildiren otomasyon sistemi.',
        tags: ['Otomasyon', 'Python'],
        image: '/projects/not-bildirim-otomasyonu/carousel-2.png',
        accent: 'from-purple-500/70 via-pink-400/20 to-transparent',
      },
      {
        id: 'about-vision',
        label: 'Hakkımda',
        title: 'Ürün odaklı tasarım & geliştirme',
        description:
          'Karmaşık iş problemlerini performansı gözeten sezgisel deneyimlere dönüştürüyorum.',
        tags: ['Full-stack', 'UI/UX'],
        accent: 'from-sky-500/60 via-blue-400/10 to-transparent',
      },
      {
        id: 'about-stack',
        label: 'Teknoloji',
        title: 'Tür güvenli modern araç seti',
        description:
          'TypeScript, React, Next.js ve Node.js ile üretim seviyesinde çözümler geliştiriyorum.',
        tags: ['TypeScript', 'Node.js', 'PostgreSQL'],
        accent: 'from-cyan-500/50 via-slate-800/30 to-transparent',
      },
    ],
    [
      {
        id: 'certificate-huawei',
        label: 'Sertifikalar',
        title: 'Huawei HCIA-AI V3.5',
        description:
          'Derin öğrenme ve makine öğrenmesi temellerini kapsayan kapsamlı eğitim.',
        tags: ['AI Temelleri'],
        image: '/sertifikalar/huawei-hcia-ai-v3-5-turkish.png',
        accent: 'from-red-500/70 via-orange-400/20 to-transparent',
      },
      {
        id: 'certificate-btk-sql',
        label: 'Sertifikalar',
        title: 'BTK SQL Uygulamaları',
        description:
          'Gerçek veri setleriyle ilişkisel veritabanı tasarımı ve sorgu optimizasyonu.',
        tags: ['SQL', 'Veritabanı'],
        image: '/sertifikalar/btk-uygulamalarla-SQL.png',
        accent: 'from-blue-500/70 via-cyan-400/20 to-transparent',
      },
      {
        id: 'certificate-btk-db',
        label: 'Sertifikalar',
        title: 'BTK Veri Tabanına Giriş',
        description:
          'Normalleştirilmiş şemalar, veri bütünlüğü ve yönetim iş akışları üzerine temel eğitim.',
        tags: ['Veri Modellemesi'],
        image: '/sertifikalar/btk-veri-tabanina-giris.png',
        accent: 'from-purple-500/70 via-pink-400/20 to-transparent',
      },
      {
        id: 'certificate-meta',
        label: 'Sertifikalar',
        title: 'Meta Front-End Uzmanlığı',
        description:
          'React bileşen mimarisi, erişilebilirlik ve performans optimizasyonu en iyi uygulamaları.',
        tags: ['React', 'Erişilebilirlik'],
        image: '/sertifikalar/meta-front-end-specialization.png',
        accent: 'from-emerald-500/70 via-slate-800/20 to-transparent',
      },
      {
        id: 'about-team',
        label: 'Çalışma Şekli',
        title: 'İş birliğine dayalı teslimat',
        description:
          'Ürün ekipleriyle birlikte çalışarak sık geri bildirim döngüleriyle hızlı iterasyon yapıyorum.',
        tags: ['Agile', 'Ürün'],
        accent: 'from-rose-500/40 via-slate-800/20 to-transparent',
      },
    ],
  ],
};

export function getLoadingPreviewColumns(language: Language): LoadingPreviewColumn[] {
  return previewColumns[language] ?? previewColumns.en;
}
