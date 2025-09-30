export type ProjectTechGroups = {
  frontend: string[];
  backend: string[];
  database: string[];
  tools: string[];
};

export interface ProjectResource {
  name: string;
  description: string;
}

export interface ProjectEvolution {
  version: string;
  title: string;
  summary: string;
  imageUrls: string[];
}

export interface ProjectData {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  purpose: string;
  coverImage: string;
  carouselImages: string[];
  gradient: string;
  demoUrl?: string;
  githubUrl: string;
  subscriberCount?: string;
  tags: string[];
  technologies: ProjectTechGroups;
  apis: ProjectResource[];
  evolution: ProjectEvolution[];
}

export const projectsData: Record<string, ProjectData> = {
  "zenith-trader": {
    id: "zenith-trader",
    title: "Zenith Trader",
    shortDescription:
      "Gerçek zamanlı whale cüzdan takibiyle OKX üzerinde otomatik copy trading sunan kurumsal platform.",
    fullDescription:
      "Whale (balina) Ethereum cüzdanlarını anlık olarak izleyip yeni pozisyonları yakalayan ve bu işlemleri OKX hesaplarına otomatik olarak kopyalayan uçtan uca geliştirilmiş copy trading altyapısı.",
    purpose:
      "Yatırımcıların büyük-balina ETH cüzdanlarını izleyip tespit edilen pozisyonları kendi hesaplarına kopyalamalarını sağlamak.",
    coverImage: "/projects/zenith-trader/cover.png",
    carouselImages: [
      "/projects/zenith-trader/carousel-1.png",
      "/projects/zenith-trader/carousel-2.png",
      "/projects/zenith-trader/carousel-3.png",
      "/projects/zenith-trader/carousel-4.png",
    ],
    gradient: "from-blue-500 to-cyan-500",
    demoUrl: "https://zenithtrader.alperenmanas.app",
    githubUrl: "https://github.com/lprnmns/zenith-trader",
    tags: ["React", "Vite", "TypeScript", "Express", "Prisma", "PostgreSQL", "Redis", "Docker"],
    technologies: {
      frontend: ["React", "TypeScript", "Tailwind CSS", "Vite"],
      backend: ["Node.js", "Express", "Prisma", "Zod"],
      database: ["PostgreSQL", "Redis"],
      tools: ["Docker", "Playwright"],
    },
    apis: [
      { name: "Zerion API", description: "Whale ETH cüzdanlarından zincir üstü hareketleri almak için." },
      { name: "OKX Exchange API", description: "Tespit edilen sinyalleri OKX hesaplarında otomatik işlem olarak yürütmek için." },
      { name: "Google OAuth API", description: "Kurumsal kullanıcı kimlik doğrulaması ve güvenli oturum yönetimi için." },
      { name: "Coingecko API", description: "Fiyat ve piyasa verileri için yedek kaynak." },
    ],
    evolution: [],
  },
  "lokaskor-ai-location-analysis": {
    id: "lokaskor-ai-location-analysis",
    title: "LokaSkor Pro",
    shortDescription:
      "KOBİ'ler ve girişimciler için yapay zeka destekli, veri-odaklı lokasyon analizi ve skorlama platformu.",
    fullDescription:
      "Rekabet, demografi, yaya trafiği ve erişilebilirlik gibi metrikleri karşılaştırarak yeni bir işletme için en doğru lokasyonu bilimsel verilerle öneren yapay zeka destekli platform.",
    purpose:
      "Yeni bir işletme açmak isteyen kullanıcıların, rekabet analizi, demografik yapı, yaya trafiği ve erişilebilirlik gibi kritik metrikleri kullanarak, potansiyel konumlar arasından en yüksek başarı potansiyeline sahip olanı bilimsel verilerle bulmalarını sağlamak.",
    coverImage: "/projects/lokaskor/cover.png",
    carouselImages: [
      "/projects/lokaskor/carousel-1.png",
      "/projects/lokaskor/carousel-2.png",
      "/projects/lokaskor/carousel-3.png",
      "/projects/lokaskor/carousel-4.png",
      "/projects/lokaskor/carousel-5.png",
      "/projects/lokaskor/carousel-6.png",
      "/projects/lokaskor/carousel-7.png",
    ],
    gradient: "from-emerald-500 to-teal-500",
    demoUrl: "https://lokaskor.alperenmanas.app",
    githubUrl: "https://github.com/lprnmns/lokaSkor",
    tags: ["React", "TypeScript", "Tailwind CSS", "Python", "Flask", "SQLite"],
    technologies: {
      frontend: ["JavaScript", "TypeScript", "Tailwind CSS", "HTML"],
      backend: ["Python", "Flask", "Jupyter Notebook"],
      database: ["SQLite"],
      tools: ["Kimi K-2", "Qwen3-Coder", "Kiro Code", "Roo Code", "Claude 4 Sonnet", "Prompt Engineering"],
    },
    apis: [
      { name: "Google Street View Static API", description: "Konumların gerçek dünya görüntülerini sunmak için." },
      { name: "OpenStreetMap API", description: "Harita altyapısı ve coğrafi veri çözümlemesi için." },
    ],
    evolution: [
      {
        version: "V4",
        title: "Profesyonel Analiz ve Optimizasyon",
        summary:
          "Önceki sürümdeki parametre geliştirme önerileri iyiydi ama sürekli değiştirme kısmı zorluyordu. Bunun için daha modern, esnek bir parametre düzenleme sayfası oluşturdum. Buradan 100 puanlık skorun bölümlere göre ağırlıklarını da kolayca ayarlayabildim.",
        imageUrls: [
          "/projects/lokaskor/v4-1.png",
          "/projects/lokaskor/v4-2.png",
          "/projects/lokaskor/v4-3.png",
        ],
      },
      {
        version: "V3",
        title: "Modern Karşılaştırma Arayüzü & AI Destekli Optimizasyon",
        summary:
          "Parametreleri kusursuza yaklaştırmak için, proje tarafından desteklenen bölgeden rastgele iki lokasyon seçilip, tüm verileriyle karşılaştırıldığı ve benim manuel puanlama yaptığım bir sistem geliştirdim. Bu verileri AI'ya göndererek parametreler için yeni değer önerileri aldım ve sistemi mükemmele yaklaştırdım.",
        imageUrls: ["/projects/lokaskor/v3-1.png"],
      },
      {
        version: "V2",
        title: "Veri Yönetim Altyapısı ve Kullanıcı Odaklı Arayüz",
        summary:
          "Arayüzü son kullanıcıya daha fazla hitap edecek şekilde geliştirdim. Bu noktada, parametreler işlevsel hale gelmiş ve hesaplanan skorların doğruluk oranı fikir verebilecek seviyeye ulaşmıştı.",
        imageUrls: ["/projects/lokaskor/v2-1.png", "/projects/lokaskor/v2-2.png"],
      },
      {
        version: "V1",
        title: "Konseptin Kanıtlanması ve Backend Doğrulaması",
        summary:
          "Projenin temel skorlama mantığının ve harita görselleştirmesinin test edildiği ilk prototip. Amaç, backend tarafının kendini kanıtlayana kadar izlemek ve admin panelinden optimal parametreleri ayarlamaktı.",
        imageUrls: [
          "/projects/lokaskor/v1-1.png",
          "/projects/lokaskor/v1-2.png",
          "/projects/lokaskor/v1-3.png",
          "/projects/lokaskor/v1-4.png",
        ],
      },
    ],
  },
  "not-bildirim-otomasyonu": {
    id: "not-bildirim-otomasyonu",
    title: "Not Bildirim Otomasyonu",
    shortDescription:
      "Kırıkkale Üniversitesi OBS not verilerini düzenli aralıklarla tarayıp yeni girişleri Telegram ve e-posta ile bildiren otomasyon sistemi.",
    fullDescription:
      "OBS'ye belirli aralıklarla girerek ekran görüntülerini OCR ile ayrıştıran, JSON karşılaştırmasıyla yeni not girişlerini tespit eden ve Telegram botu ile 30'dan fazla kullanıcıya bildirim gönderen kişisel otomasyon.",
    purpose:
      "OBS sistemindeki ders notlarını otomatik olarak takip edip yeni not girişlerinde Telegram ve e-posta ile bildirim göndermek.",
    coverImage: "/projects/not-bildirim-otomasyonu/cover.png",
    carouselImages: [
      "/projects/not-bildirim-otomasyonu/carousel-1.png",
      "/projects/not-bildirim-otomasyonu/carousel-2.png",
      "/projects/not-bildirim-otomasyonu/carousel-3.png",
      "/projects/not-bildirim-otomasyonu/carousel-4.png",
      "/projects/not-bildirim-otomasyonu/carousel-5.jpg",
      "/projects/not-bildirim-otomasyonu/carousel-6.jpg",
    ],
    gradient: "from-purple-500 to-pink-500",
    githubUrl: "https://github.com/lprnmns/not-bildirim-otomasyonu",
    subscriberCount: "+30",
    tags: ["Python", "Flask", "Selenium", "Telegram Bot"],
    technologies: {
      frontend: ["HTML", "CSS", "JavaScript", "Jinja2"],
      backend: ["Python", "Flask", "BeautifulSoup4", "Selenium", "Requests"],
      database: ["JSON Storage"],
      tools: ["QWEN3-coder", "Kimi-K2"],
    },
    apis: [
      { name: "Telegram Bot API", description: "Kullanıcılara gerçek zamanlı bildirim göndermek için." },
      { name: "Google Gmail SMTP API", description: "E-posta abonelikleri üzerinden bildirim yollamak için." },
      { name: "2Captcha API", description: "OBS sistemindeki CAPTCHA doğrulamasını aşmak için." },
    ],
    evolution: [],
  },
  "iran-airspace-monitor": {
    id: "iran-airspace-monitor",
    title: "İran Hava Sahası Monitör",
    shortDescription:
      "İran-İsrail gerginliğinde İran'ın kapalı hava sahasına giren yardım uçuşlarını gerçek zamanlı takip eden hobi projesi.",
    fullDescription:
      "OpenSky Network verilerini kullanarak İran hava sahasına giriş yapan yardım uçuşlarını harita üzerinde gösteren, Leaflet.js tabanlı gerçek zamanlı izleme uygulaması.",
    purpose:
      "İran'ın kapalı hava sahasına giren yardım uçuşlarını ve hangi ülkelerin destek verdiğini gerçek zamanlı takip etmek.",
    coverImage: "/projects/iran-havasahasi-monitor/cover.png",
    carouselImages: [
      "/projects/iran-havasahasi-monitor/carousel-1.png",
      "/projects/iran-havasahasi-monitor/carousel-2.png",
    ],
    gradient: "from-amber-500 to-orange-500",
    githubUrl: "https://github.com/lprnmns/iran_havasahasi_monitor",
    tags: ["Python", "Flask", "Leaflet.js", "Gerçek Zamanlı Veri"],
    technologies: {
      frontend: ["HTML", "CSS", "JavaScript", "Leaflet.js"],
      backend: ["Python", "Flask", "Shapely", "pywebpush", "Requests"],
      database: ["In-memory storage"],
      tools: ["QWEN3-coder", "Kimi-K2"],
    },
    apis: [
      { name: "OpenSky Network API", description: "Gerçek zamanlı uçuş verilerini almak için." },
      { name: "Google AdSense API", description: "Uygulamada reklam alanlarını yönetmek için." },
      { name: "OpenStreetMap API", description: "Harita karo ve coğrafi verileri sağlamak için." },
      { name: "Web Push API", description: "Abone olan kullanıcılara tarayıcı bildirimi göndermek için." },
    ],
    evolution: [],
  },
};

export const projectList = Object.values(projectsData);
export const projectSlugs = Object.keys(projectsData);
