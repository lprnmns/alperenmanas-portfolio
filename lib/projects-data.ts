import type { Language, TechCategory } from '@/lib/i18n';

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  coverImageUrl: string;
  gradient: string;
  liveUrl?: string;
  githubUrl: string;
  carouselImages: string[];
  purpose: string;
  subscriberCount?: string;
  notice?: string;
  techStack: { name: string; category: TechCategory }[];
  apis: { name: string; description: string }[];
  evolution: {
    version: string;
    title: string;
    summary: string;
    imageUrls: string[];
  }[];
}

type ProjectBase = {
  slug: string;
  coverImageUrl: string;
  gradient: string;
  liveUrl?: string;
  githubUrl: string;
  carouselImages: string[];
  techStack: { name: string; category: TechCategory }[];
};

type ProjectTranslationContent = {
  title: string;
  shortDescription: string;
  purpose: string;
  subscriberCount?: string;
  notice?: string;
  apis: { name: string; description: string }[];
  evolution: { version: string; title: string; summary: string; imageUrls: string[] }[];
};

const projectCollection: Record<Language, Project[]> = { en: [], tr: [] };

function registerProject(base: ProjectBase, translations: Record<Language, ProjectTranslationContent>) {
  (Object.keys(translations) as Language[]).forEach((language) => {
    const translation = translations[language];

    projectCollection[language].push({
      slug: base.slug,
      title: translation.title,
      shortDescription: translation.shortDescription,
      coverImageUrl: base.coverImageUrl,
      gradient: base.gradient,
      liveUrl: base.liveUrl,
      githubUrl: base.githubUrl,
      carouselImages: base.carouselImages,
      purpose: translation.purpose,
      subscriberCount: translation.subscriberCount,
      notice: translation.notice,
      techStack: base.techStack,
      apis: translation.apis,
      evolution: translation.evolution,
    });
  });
}

const zenithBase: ProjectBase = {
  slug: 'zenith-trader',
  coverImageUrl: '/projects/zenith-trader/cover.png',
  gradient: 'from-blue-500 to-cyan-500',
  liveUrl: 'https://zenithtrader.alperenmanas.app',
  githubUrl: 'https://github.com/lprnmns/zenith-trader',
  carouselImages: [
    '/projects/zenith-trader/carousel-1.png',
    '/projects/zenith-trader/carousel-2.png',
    '/projects/zenith-trader/carousel-3.png',
    '/projects/zenith-trader/carousel-4.png',
  ],
  techStack: [
    { name: 'React', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Frontend' },
    { name: 'Vite', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Express', category: 'Backend' },
    { name: 'Prisma', category: 'Backend' },
    { name: 'Zod', category: 'Backend' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Redis', category: 'Database' },
    { name: 'Docker', category: 'AI & Tools' },
    { name: 'Playwright', category: 'AI & Tools' },
  ],
};

const zenithTranslations: Record<Language, ProjectTranslationContent> = {
  en: {
    title: 'Zenith Trader',
    shortDescription:
      'Institutional platform that offers automated copy trading on OKX by monitoring whale wallets in real time.',
    purpose:
      'Enable investors to monitor large whale ETH wallets and mirror detected positions into their own accounts.',
    apis: [
      { name: 'Zerion API', description: 'Retrieve on-chain movements from whale ETH wallets.' },
      { name: 'OKX Exchange API', description: 'Execute detected signals as automated trades on OKX accounts.' },
      { name: 'Google OAuth API', description: 'Secure enterprise authentication and session management.' },
      { name: 'Coingecko API', description: 'Fallback source for price and market data.' },
    ],
    evolution: [],
  },
  tr: {
    title: 'Zenith Trader',
    shortDescription:
      'Gerçek zamanlı balina cüzdan takibiyle OKX üzerinde otomatik copy trading sunan kurumsal platform.',
    purpose:
      'Yatırımcıların büyük balina ETH cüzdanlarını izleyip tespit edilen pozisyonları kendi hesaplarına kopyalamasını sağlamak.',
    apis: [
      { name: 'Zerion API', description: 'Balina ETH cüzdanlarından zincir üstü hareketleri almak için.' },
      { name: 'OKX Exchange API', description: 'Tespit edilen sinyalleri OKX hesaplarında otomatik işlem olarak yürütmek için.' },
      { name: 'Google OAuth API', description: 'Kurumsal kullanıcı kimlik doğrulaması ve güvenli oturum yönetimi için.' },
      { name: 'Coingecko API', description: 'Fiyat ve piyasa verileri için yedek kaynak.' },
    ],
    evolution: [],
  },
};

registerProject(zenithBase, zenithTranslations);

const lokaskorBase: ProjectBase = {
  slug: 'lokaskor-ai-location-analysis',
  coverImageUrl: '/projects/lokaskor/cover.png',
  gradient: 'from-emerald-500 to-teal-500',
  liveUrl: 'https://lokaskor.alperenmanas.app',
  githubUrl: 'https://github.com/lprnmns/lokaSkor',
  carouselImages: [
    '/projects/lokaskor/carousel-1.png',
    '/projects/lokaskor/carousel-2.png',
    '/projects/lokaskor/carousel-3.png',
    '/projects/lokaskor/carousel-4.png',
    '/projects/lokaskor/carousel-5.png',
    '/projects/lokaskor/carousel-6.png',
    '/projects/lokaskor/carousel-7.png',
  ],
  techStack: [
    { name: 'JavaScript', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Frontend' },
    { name: 'HTML', category: 'Frontend' },
    { name: 'Python', category: 'Backend' },
    { name: 'Flask', category: 'Backend' },
    { name: 'Jupyter Notebook', category: 'Backend' },
    { name: 'SQLite', category: 'Database' },
    { name: 'Kimi K-2', category: 'AI & Tools' },
    { name: 'Qwen3-Coder', category: 'AI & Tools' },
    { name: 'Kiro Code', category: 'AI & Tools' },
    { name: 'Roo Code', category: 'AI & Tools' },
    { name: 'Claude 4 Sonnet', category: 'AI & Tools' },
    { name: 'Prompt Engineering', category: 'AI & Tools' },
  ],
};

const lokaskorTranslations: Record<Language, ProjectTranslationContent> = {
  en: {
    title: 'LokaSkor Pro',
    shortDescription:
      'AI-powered, data-driven location analysis and scoring platform for SMEs and entrepreneurs.',
    purpose:
      'Help entrepreneurs evaluate potential venues using competition, demographics, foot traffic, and accessibility metrics to find the location with the highest success potential backed by data.',
    notice:
      'The pilot region is currently Yenimahalle/Ankara. The "Discover New Opportunities" mode is not completed yet. For the most stable results choose Yenimahalle in comparison mode with the "Pharmacy" business type.',
    apis: [
      { name: 'Google Street View Static API', description: 'Deliver real-world imagery for candidate locations.' },
      { name: 'OpenStreetMap API', description: 'Provide mapping infrastructure and geospatial analysis.' },
    ],
    evolution: [
      {
        version: 'V4',
        title: 'Professional Analytics & Optimisation',
        summary:
          'The previous parameter improvement suggestions were solid but constantly switching values was cumbersome. I built a modern, flexible parameter editing screen so I can easily adjust the weight of each section of the 100-point score.',
        imageUrls: ['/projects/lokaskor/v4-1.png', '/projects/lokaskor/v4-2.png', '/projects/lokaskor/v4-3.png'],
      },
      {
        version: 'V3',
        title: 'Modern Comparison Interface & AI Optimisation',
        summary:
          'To fine-tune parameters I created a system that picks two random locations from the supported region, compares all metrics, and lets me score them manually. I sent this dataset to AI for new parameter suggestions and iterated the model close to optimal.',
        imageUrls: ['/projects/lokaskor/v3-1.png'],
      },
      {
        version: 'V2',
        title: 'Data Management Layer & User-centric UI',
        summary:
          'Refined the interface to better serve end users. At this stage the parameters were functional and the score accuracy had reached a level that inspired confidence.',
        imageUrls: ['/projects/lokaskor/v2-1.png', '/projects/lokaskor/v2-2.png'],
      },
      {
        version: 'V1',
        title: 'Validating the Concept & Backend',
        summary:
          'Initial prototype used to test the core scoring logic and map visualisation. The goal was to monitor backend behaviour and adjust optimal parameters from the admin panel until it proved itself.',
        imageUrls: [
          '/projects/lokaskor/v1-1.png',
          '/projects/lokaskor/v1-2.png',
          '/projects/lokaskor/v1-3.png',
          '/projects/lokaskor/v1-4.png',
        ],
      },
    ],
  },
  tr: {
    title: 'LokaSkor Pro',
    shortDescription:
      "KOBİ'ler ve girişimciler için yapay zekâ destekli, veri odaklı lokasyon analizi ve skorlama platformu.",
    purpose:
      'Yeni bir işletme açmak isteyen kullanıcıların, rekabet analizi, demografik yapı, yaya trafiği ve erişilebilirlik gibi kritik metrikleri kullanarak potansiyel konumlar arasından en yüksek başarı potansiyeline sahip olanı bilimsel verilerle bulmalarını sağlamak.',
    notice:
      "Şu an için pilot bölge Yenimahalle/Ankara'dır. \"Yeni Fırsatları Keşfet\" modu henüz tamamlanmadı. En stabil sonuçlar için Yenimahalle bölgesinde, \"Eczane\" işletme türünü seçerek Karşılaştırma Modu'nu kullanın.",
    apis: [
      { name: 'Google Street View Static API', description: 'Konumların gerçek dünya görüntülerini sunmak için.' },
      { name: 'OpenStreetMap API', description: 'Harita altyapısı ve coğrafi veri çözümlemesi için.' },
    ],
    evolution: [
      {
        version: 'V4',
        title: 'Profesyonel Analiz ve Optimizasyon',
        summary:
          "Önceki sürümdeki parametre geliştirme önerileri iyiydi ama sürekli değiştirmek zorluyordu. Bunun için daha modern, esnek bir parametre düzenleme sayfası oluşturdum ve 100 puanlık skorun bölümlere göre ağırlıklarını rahatça ayarlayabildim.",
        imageUrls: ['/projects/lokaskor/v4-1.png', '/projects/lokaskor/v4-2.png', '/projects/lokaskor/v4-3.png'],
      },
      {
        version: 'V3',
        title: 'Modern Karşılaştırma Arayüzü ve AI Destekli Optimizasyon',
        summary:
          "Parametreleri kusursuza yaklaştırmak için desteklenen bölgeden rastgele iki lokasyon seçip tüm verileriyle karşılaştırdığım ve manuel puanlama yaptığım bir sistem geliştirdim. Bu verileri AI'a göndererek yeni parametre önerileri aldım ve sistemi mükemmele yaklaştırdım.",
        imageUrls: ['/projects/lokaskor/v3-1.png'],
      },
      {
        version: 'V2',
        title: 'Veri Yönetim Altyapısı ve Kullanıcı Odaklı Arayüz',
        summary:
          "Arayüzü son kullanıcıya daha fazla hitap edecek şekilde geliştirdim. Bu noktada parametreler işlevsel hale geldi ve hesaplanan skorların doğruluğu güven verecek seviyeye ulaştı.",
        imageUrls: ['/projects/lokaskor/v2-1.png', '/projects/lokaskor/v2-2.png'],
      },
      {
        version: 'V1',
        title: 'Konseptin Kanıtlanması ve Backend Doğrulaması',
        summary:
          "Projenin temel skorlama mantığının ve harita görselleştirmesinin test edildiği ilk prototip. Amaç, backend tarafını izleyip yönetim panelinden optimal parametreleri ayarlayarak sistemi kanıtlamaktı.",
        imageUrls: [
          '/projects/lokaskor/v1-1.png',
          '/projects/lokaskor/v1-2.png',
          '/projects/lokaskor/v1-3.png',
          '/projects/lokaskor/v1-4.png',
        ],
      },
    ],
  },
};

registerProject(lokaskorBase, lokaskorTranslations);

const gradeAutomationBase: ProjectBase = {
  slug: 'not-bildirim-otomasyonu',
  coverImageUrl: '/projects/not-bildirim-otomasyonu/cover.png',
  gradient: 'from-purple-500 to-pink-500',
  githubUrl: 'https://github.com/lprnmns/not-bildirim-otomasyonu',
  carouselImages: [
    '/projects/not-bildirim-otomasyonu/carousel-1.png',
    '/projects/not-bildirim-otomasyonu/carousel-2.png',
    '/projects/not-bildirim-otomasyonu/carousel-3.png',
    '/projects/not-bildirim-otomasyonu/carousel-4.png',
    '/projects/not-bildirim-otomasyonu/carousel-5.jpg',
    '/projects/not-bildirim-otomasyonu/carousel-6.jpg',
  ],
  techStack: [
    { name: 'HTML', category: 'Frontend' },
    { name: 'CSS', category: 'Frontend' },
    { name: 'JavaScript', category: 'Frontend' },
    { name: 'Jinja2', category: 'Frontend' },
    { name: 'Python', category: 'Backend' },
    { name: 'Flask', category: 'Backend' },
    { name: 'BeautifulSoup4', category: 'Backend' },
    { name: 'Selenium', category: 'Backend' },
    { name: 'Requests', category: 'Backend' },
    { name: 'JSON Storage', category: 'Database' },
    { name: 'QWEN3-coder', category: 'AI & Tools' },
    { name: 'Kimi-K2', category: 'AI & Tools' },
  ],
};

const gradeAutomationTranslations: Record<Language, ProjectTranslationContent> = {
  en: {
    title: 'Grade Notification Automation',
    shortDescription: "Notification automation for Kırıkkale University's OBS grade system.",
    purpose:
      'Automation that logs into OBS on schedule, extracts screenshots, parses them with OCR, detects new grades via JSON diffing, and sends notifications through Telegram bot and email.',
    subscriberCount: '+30',
    apis: [
      { name: 'Telegram Bot API', description: 'Deliver real-time notifications to subscribers.' },
      { name: 'Google Gmail SMTP API', description: 'Send email alerts to mailing subscribers.' },
      { name: '2Captcha API', description: 'Solve the CAPTCHA challenge inside the OBS system.' },
    ],
    evolution: [],
  },
  tr: {
    title: 'Not Bildirim Otomasyonu',
    shortDescription: "Kırıkkale Üniversitesi OBS'i için not bildirim otomasyonu.",
    purpose:
      'OBS sistemine düzenli giriş yaparak ekran görüntülerini OCR ile ayrıştıran, JSON karşılaştırmasıyla yeni not girişlerini tespit eden ve Telegram botu ile e-posta üzerinden bildirim gönderen otomasyon.',
    subscriberCount: '+30',
    apis: [
      { name: 'Telegram Bot API', description: 'Kullanıcılara gerçek zamanlı bildirim göndermek için.' },
      { name: 'Google Gmail SMTP API', description: 'E-posta abonelikleri üzerinden bildirim yollamak için.' },
      { name: '2Captcha API', description: 'OBS sistemindeki CAPTCHA doğrulamasını aşmak için.' },
    ],
    evolution: [],
  },
};

registerProject(gradeAutomationBase, gradeAutomationTranslations);

const iranMonitorBase: ProjectBase = {
  slug: 'iran-airspace-monitor',
  coverImageUrl: '/projects/iran-havasahasi-monitor/cover.png',
  gradient: 'from-amber-500 to-orange-500',
  githubUrl: 'https://github.com/lprnmns/iran_havasahasi_monitor',
  carouselImages: [
    '/projects/iran-havasahasi-monitor/carousel-1.png',
    '/projects/iran-havasahasi-monitor/carousel-2.png',
  ],
  techStack: [
    { name: 'HTML', category: 'Frontend' },
    { name: 'CSS', category: 'Frontend' },
    { name: 'JavaScript', category: 'Frontend' },
    { name: 'Leaflet.js', category: 'Frontend' },
    { name: 'Python', category: 'Backend' },
    { name: 'Flask', category: 'Backend' },
    { name: 'Shapely', category: 'Backend' },
    { name: 'pywebpush', category: 'Backend' },
    { name: 'Requests', category: 'Backend' },
    { name: 'In-memory storage', category: 'Database' },
    { name: 'QWEN3-coder', category: 'AI & Tools' },
    { name: 'Kimi-K2', category: 'AI & Tools' },
  ],
};

const iranMonitorTranslations: Record<Language, ProjectTranslationContent> = {
  en: {
    title: 'Iran Airspace Monitor',
    shortDescription:
      "Hobby project that tracked humanitarian flights entering Iran's closed airspace during the Iran–Israel conflict in real time.",
    purpose:
      "Monitor humanitarian flights entering Iran's closed airspace and reveal which countries are providing support in real time.",
    apis: [
      { name: 'OpenSky Network API', description: 'Fetch real-time flight data.' },
      { name: 'Google AdSense API', description: 'Manage ad inventory inside the app.' },
      { name: 'OpenStreetMap API', description: 'Provide map tiles and geospatial data.' },
      { name: 'Web Push API', description: 'Send browser notifications to subscribed users.' },
    ],
    evolution: [],
  },
  tr: {
    title: 'İran Hava Sahası Monitör',
    shortDescription:
      "İran-İsrail gerginliğinde İran'ın kapalı hava sahasına giren yardım uçuşlarını gerçek zamanlı takip eden hobi projesi.",
    purpose:
      "İran'ın kapalı hava sahasına giren yardım uçuşlarını ve hangi ülkelerin destek verdiğini gerçek zamanlı olarak takip etmek.",
    apis: [
      { name: 'OpenSky Network API', description: 'Gerçek zamanlı uçuş verilerini almak için.' },
      { name: 'Google AdSense API', description: 'Uygulamadaki reklam alanlarını yönetmek için.' },
      { name: 'OpenStreetMap API', description: 'Harita karoları ve coğrafi veriler sağlamak için.' },
      { name: 'Web Push API', description: 'Abone olan kullanıcılara tarayıcı bildirimi göndermek için.' },
    ],
    evolution: [],
  },
};

registerProject(iranMonitorBase, iranMonitorTranslations);

export const projectSlugs = projectCollection.en.map((project) => project.slug);

export function getProjects(language: Language): Project[] {
  return projectCollection[language] ?? projectCollection.en;
}

export function getProject(language: Language, slug: string): Project | undefined {
  return getProjects(language).find((project) => project.slug === slug);
}

export interface ProjectListItem {
  id: string;
  title: string;
  shortDescription: string;
  coverImage: string;
  gradient: string;
  demoUrl?: string;
  githubUrl: string;
  tags: string[];
}

export function getProjectList(language: Language): ProjectListItem[] {
  return getProjects(language).map((project) => ({
    id: project.slug,
    title: project.title,
    shortDescription: project.shortDescription,
    coverImage: project.coverImageUrl,
    gradient: project.gradient,
    demoUrl: project.liveUrl,
    githubUrl: project.githubUrl,
    tags: project.techStack.map((tech) => tech.name),
  }));
}

export function getProjectMap(language: Language): Record<string, Project> {
  return Object.fromEntries(getProjects(language).map((project) => [project.slug, project]));
}
