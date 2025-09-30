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
  techStack: { name: string; category: 'Frontend' | 'Backend' | 'Database' | 'AI & Tools' }[];
  apis: { name: string; description: string }[];
  evolution: {
    version: string;
    title: string;
    summary: string;
    imageUrls: string[];
  }[];
}

export const projectsData: Project[] = [
  {
    slug: 'zenith-trader',
    title: 'Zenith Trader',
    shortDescription: 'Gerçek zamanlı whale cüzdan takibiyle OKX üzerinde otomatik copy trading sunan kurumsal platform.',
    coverImageUrl: '/projects/zenith-trader/cover.png',
    gradient: 'from-blue-500 to-cyan-500',
    liveUrl: 'https://zenithtrader.alperenmanas.app',
    githubUrl: 'https://github.com/lprnmns/zenith-trader',
    carouselImages: [
      '/projects/zenith-trader/carousel-1.png',
      '/projects/zenith-trader/carousel-2.png',
      '/projects/zenith-trader/carousel-3.png',
      '/projects/zenith-trader/carousel-4.png'
    ],
    purpose: 'Yatırımcıların büyük-balina ETH cüzdanlarını izleyip tespit edilen pozisyonları kendi hesaplarına kopyalamalarını sağlamak.',
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
      { name: 'Playwright', category: 'AI & Tools' }
    ],
    apis: [
      { name: 'Zerion API', description: 'Whale ETH cüzdanlarından zincir üstü hareketleri almak için.' },
      { name: 'OKX Exchange API', description: 'Tespit edilen sinyalleri OKX hesaplarında otomatik işlem olarak yürütmek için.' },
      { name: 'Google OAuth API', description: 'Kurumsal kullanıcı kimlik doğrulaması ve güvenli oturum yönetimi için.' },
      { name: 'Coingecko API', description: 'Fiyat ve piyasa verileri için yedek kaynak.' }
    ],
    evolution: []
  },
  {
    slug: 'lokaskor-ai-location-analysis',
    title: 'LokaSkor Pro',
    shortDescription: "KOBİ'ler ve girişimciler için yapay zeka destekli, veri-odaklı lokasyon analizi ve skorlama platformu.",
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
      '/projects/lokaskor/carousel-7.png'
    ],
    purpose: "Yeni bir işletme açmak isteyen kullanıcıların, rekabet analizi, demografik yapı, yaya trafiği ve erişilebilirlik gibi kritik metrikleri kullanarak, potansiyel konumlar arasından en yüksek başarı potansiyeline sahip olanı bilimsel verilerle bulmalarını sağlamak.",
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
      { name: 'Prompt Engineering', category: 'AI & Tools' }
    ],
    apis: [
      { name: 'Google Street View Static API', description: 'Konumların gerçek dünya görüntülerini sunmak için.' },
      { name: 'OpenStreetMap API', description: 'Harita altyapısı ve coğrafi veri çözümlemesi için.' }
    ],
    evolution: [
      {
        version: 'V4',
        title: 'Profesyonel Analiz ve Optimizasyon',
        summary:
          "Önceki sürümdeki parametre geliştirme önerileri iyiydi ama sürekli değiştirme kısmı zorluyordu. Bunun için daha modern, esnek bir parametre düzenleme sayfası oluşturdum. Buradan 100 puanlık skorun bölümlere göre ağırlıklarını da kolayca ayarlayabildim.",
        imageUrls: ['/projects/lokaskor/v4-1.png', '/projects/lokaskor/v4-2.png', '/projects/lokaskor/v4-3.png']
      },
      {
        version: 'V3',
        title: 'Modern Karşılaştırma Arayüzü & AI Destekli Optimizasyon',
        summary:
          "Parametreleri kusursuza yaklaştırmak için, proje tarafından desteklenen bölgeden rastgele iki lokasyon seçilip, tüm verileriyle karşılaştırıldığı ve benim manuel puanlama yaptığım bir sistem geliştirdim. Bu verileri AI'ya göndererek parametreler için yeni değer önerileri aldım ve sistemi mükemmele yaklaştırdım.",
        imageUrls: ['/projects/lokaskor/v3-1.png']
      },
      {
        version: 'V2',
        title: 'Veri Yönetim Altyapısı ve Kullanıcı Odaklı Arayüz',
        summary:
          "Arayüzü son kullanıcıya daha fazla hitap edecek şekilde geliştirdim. Bu noktada, parametreler işlevsel hale gelmiş ve hesaplanan skorların doğruluk oranı fikir verebilecek seviyeye ulaşmıştı.",
        imageUrls: ['/projects/lokaskor/v2-1.png', '/projects/lokaskor/v2-2.png']
      },
      {
        version: 'V1',
        title: 'Konseptin Kanıtlanması ve Backend Doğrulaması',
        summary:
          "Projenin temel skorlama mantığının ve harita görselleştirmesinin test edildiği ilk prototip. Amaç, backend tarafının kendini kanıtlayana kadar izlemek ve admin panelinden optimal parametreleri ayarlamaktı.",
        imageUrls: [
          '/projects/lokaskor/v1-1.png',
          '/projects/lokaskor/v1-2.png',
          '/projects/lokaskor/v1-3.png',
          '/projects/lokaskor/v1-4.png'
        ]
      }
    ]
  },
  {
    slug: 'not-bildirim-otomasyonu',
    title: 'Not Bildirim Otomasyonu',
    shortDescription: "Kırıkkale Üniversitesi OBS'i için not bildirim otomasyonu.",
    coverImageUrl: '/projects/not-bildirim-otomasyonu/cover.png',
    gradient: 'from-purple-500 to-pink-500',
    githubUrl: 'https://github.com/lprnmns/not-bildirim-otomasyonu',
    carouselImages: [
      '/projects/not-bildirim-otomasyonu/carousel-1.png',
      '/projects/not-bildirim-otomasyonu/carousel-2.png',
      '/projects/not-bildirim-otomasyonu/carousel-3.png',
      '/projects/not-bildirim-otomasyonu/carousel-4.png',
      '/projects/not-bildirim-otomasyonu/carousel-5.jpg',
      '/projects/not-bildirim-otomasyonu/carousel-6.jpg'
    ],
    purpose:
      "OBS sistemine düzenli giriş yaparak ekran görüntülerini OCR ile ayrıştıran, JSON karşılaştırmasıyla yeni not girişlerini tespit eden ve Telegram botu/e-posta ile bildirim gönderen otomasyon.",
    subscriberCount: '+30',
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
      { name: 'Kimi-K2', category: 'AI & Tools' }
    ],
    apis: [
      { name: 'Telegram Bot API', description: 'Kullanıcılara gerçek zamanlı bildirim göndermek için.' },
      { name: 'Google Gmail SMTP API', description: 'E-posta abonelikleri üzerinden bildirim yollamak için.' },
      { name: '2Captcha API', description: 'OBS sistemindeki CAPTCHA doğrulamasını aşmak için.' }
    ],
    evolution: []
  },
  {
    slug: 'iran-airspace-monitor',
    title: 'İran Hava Sahası Monitör',
    shortDescription: "İran-İsrail gerginliğinde İran'ın kapalı hava sahasına giren yardım uçuşlarını gerçek zamanlı takip eden hobi projesi.",
    coverImageUrl: '/projects/iran-havasahasi-monitor/cover.png',
    gradient: 'from-amber-500 to-orange-500',
    githubUrl: 'https://github.com/lprnmns/iran_havasahasi_monitor',
    carouselImages: [
      '/projects/iran-havasahasi-monitor/carousel-1.png',
      '/projects/iran-havasahasi-monitor/carousel-2.png'
    ],
    purpose:
      "İran\\'ın kapalı hava sahasına giren yardım uçuşlarını ve hangi ülkelerin destek verdiğini gerçek zamanlı olarak takip etmek.",
    techStack: [
      { name: 'HTML', category: 'Frontend' },
      { name: 'CSS', category: 'Frontend' },
      { name: 'JavaScript', category: 'Frontend' },
      { name: 'Leaflet.js', category: 'Frontend' },
      { name: 'Python', category: 'Backend' },
      { name: 'Flask', category: 'Backend' },
      { name: 'Shapely', category: 'Backend' },
      { name: 'pywebpush', category: 'Backend' },
      { name: 'requests', category: 'Backend' },
      { name: 'In-memory storage', category: 'Database' },
      { name: 'QWEN3-coder', category: 'AI & Tools' },
      { name: 'Kimi-K2', category: 'AI & Tools' }
    ],
    apis: [
      { name: 'OpenSky Network API', description: 'Gerçek zamanlı uçuş verilerini almak için.' },
      { name: 'Google AdSense API', description: 'Uygulamada reklam alanlarını yönetmek için.' },
      { name: 'OpenStreetMap API', description: 'Harita karo ve coğrafi verileri sağlamak için.' },
      { name: 'Web Push API', description: 'Abone olan kullanıcılara tarayıcı bildirimi göndermek için.' }
    ],
    evolution: []
  }
];

export const projectSlugs = projectsData.map((project) => project.slug);

export const projectList = projectsData.map((project) => ({
  id: project.slug,
  title: project.title,
  shortDescription: project.shortDescription,
  coverImage: project.coverImageUrl,
  gradient: project.gradient,
  demoUrl: project.liveUrl,
  githubUrl: project.githubUrl,
  tags: project.techStack.map((tech) => tech.name),
}));

export const projectMap = Object.fromEntries(projectsData.map((project) => [project.slug, project]));

