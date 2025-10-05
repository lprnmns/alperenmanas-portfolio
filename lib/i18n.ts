export type Language = "en" | "tr";
export type TechCategory = "Frontend" | "Backend" | "Database" | "AI & Tools";

export const DEFAULT_LANGUAGE: Language = "en";

export const availableLanguages = [
  { code: "en", label: "English" },
  { code: "tr", label: "Türkçe" },
] as const;

const dictionaries = {
  en: {
    navigation: {
      projects: "Projects",
      about: "About",
      certificates: "Certificates",
      github: "GitHub",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      language: "Language",
      english: "English",
      turkish: "Türkçe",
    },
    languageToggle: {
      label: "Language",
      srLabel: "Toggle language",
    },
    projectsSection: {
      heading: "Projects",
      subheading: "Projects built with modern technologies to solve real business problems.",
      liveDemo: "Live Demo",
      details: "Details",
      github: "GitHub",
      coverAlt: "{title} cover image",
    },
    certificatesSection: {
      heading: "Certificates",
      subheading: "Professional certifications and technical training I have completed.",
      detailsAria: "View certificate details",
    },
    projectDetail: {
      viewLive: "View Live Project",
      viewGithub: "View on GitHub",
      purposeHeading: "Project Purpose",
      statusHeading: "Current Status & Tips",
      subscriberLabel: "Active Subscribers",
      techHeading: "Technologies & APIs",
      techStackHeading: "Tech Stack",
      apisHeading: "APIs Used",
      evolutionHeading: "What Changed? (Project Evolution)",
      categoryLabels: {
        Frontend: "Frontend",
        Backend: "Backend",
        Database: "Database",
        "AI & Tools": "AI & Tools",
      } as Record<TechCategory, string>,
      carouselAlt: "{title} preview",
    },
    githubContributions: {
      error: "GitHub contribution data could not be loaded right now.",
      heading: "GitHub",
      subheading: "Contributions during the last 4 months",
      contributionsLabel: "{count} contributions",
      tooltip: "{count} contributions  -  {date}",
      low: "Low",
      high: "High",
      locale: "en-US",
    },
    evolution: {
      imageAlt: "{version} screenshot {index}",
    },
  },
  tr: {
    navigation: {
      projects: "Projeler",
      about: "Hakkımda",
      certificates: "Sertifikalar",
      github: "GitHub",
      openMenu: "Menüyü aç",
      closeMenu: "Menüyü kapat",
      language: "Dil",
      english: "İngilizce",
      turkish: "Türkçe",
    },
    languageToggle: {
      label: "Dil",
      srLabel: "Dili değiştir",
    },
    projectsSection: {
      heading: "Projelerim",
      subheading: "Gerçek iş problemlerine odaklanan, modern teknolojilerle geliştirdiğim projeler.",
      liveDemo: "Canlı Test",
      details: "Detaylar",
      github: "GitHub",
      coverAlt: "{title} kapak görseli",
    },
    certificatesSection: {
      heading: "Sertifikalar",
      subheading: "Aldığım profesyonel sertifikalar ve teknik eğitimler.",
      detailsAria: "Sertifika detayı",
    },
    projectDetail: {
      viewLive: "Projeyi Canlı Gör",
      viewGithub: "GitHub'da İncele",
      purposeHeading: "Projenin Amacı",
      statusHeading: "Güncel Durum & Tavsiyeler",
      subscriberLabel: "Aktif Abone",
      techHeading: "Teknolojiler ve API'ler",
      techStackHeading: "Teknoloji Yığını",
      apisHeading: "Kullanılan API'ler",
      evolutionHeading: "Neydi, Ne Oldu? (Projenin Evrimi)",
      categoryLabels: {
        Frontend: "Ön Yüz",
        Backend: "Arka Uç",
        Database: "Veritabanı",
        "AI & Tools": "Yapay Zeka & Araçlar",
      } as Record<TechCategory, string>,
      carouselAlt: "{title} ekran görüntüsü",
    },
    githubContributions: {
      error: "GitHub katkı verileri şu anda getirilemedi.",
      heading: "GitHub",
      subheading: "Son 4 ay katkılarım",
      contributionsLabel: "{count} katkı",
      tooltip: "{count} katkı  -  {date}",
      low: "Az",
      high: "Fazla",
      locale: "tr-TR",
    },
    evolution: {
      imageAlt: "{version} ekran görüntüsü {index}",
    },
  },
} as const;

export type BaseDictionary = typeof dictionaries.en;

export function getDictionary(language: Language): BaseDictionary {
  return dictionaries[language] ?? dictionaries.en;
}

export function formatTranslation(
  template: string,
  params: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      return String(params[key]);
    }
    return `{${key}}`;
  });
}
