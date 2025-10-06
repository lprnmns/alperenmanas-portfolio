import type { Language } from '@/lib/i18n';

export type IconKey = 'code' | 'brain' | 'boxes' | 'trendingUp' | 'share2';

export interface AboutContent {
  heading: string;
  subheading: string;
  personalHeading: string;
  summary: string;
  personal: {
    nameLabel: string;
    nameValue: string;
    emailLabel: string;
    emailValue: string;
    educationLabel: string;
    educationValue: string;
  };
  programmingHeading: string;
  programmingSkills: { name: string; level: number; color: string }[];
  domainHeading: string;
  domainItems: { icon: IconKey; name: string }[];
  interestsHeading: string;
  interestItems: { icon: IconKey; name: string }[];
}

const aboutContent: Record<Language, AboutContent> = {
  en: {
    heading: 'About Me',
    subheading: 'Snapshot of who I am',
    personalHeading: 'Personal Details',
    summary: "I've been into computers and technology since I was 15. I started out tweaking Android operating systems with custom ROMs. Studying computer engineering and the rise of AI shifted my focus in recent years toward using AI tools to rapidly ship solutions I believe solve real-world problems. I spend about 4-5 hours a day experimenting with new AI tools in projects, combining my grounding in algorithms with the breadth of large models to build production-grade full-stack apps via vibe coding. As hobbies I follow finance (crypto, stocks, etc.) and blockchain.",
    personal: {
      nameLabel: 'Name',
      nameValue: 'Alperen Manas',
      emailLabel: 'Email',
      emailValue: 'manasalperen@gmail.com',
      educationLabel: 'Education',
      educationValue: 'Kırıkkale University - Computer Engineering (3rd year)',
    },
    programmingHeading: 'Programming Languages',
    programmingSkills: [
      { name: 'C#', level: 75, color: 'from-emerald-500 to-green-500' },
      { name: 'Python', level: 50, color: 'from-purple-500 to-pink-500' },
      { name: 'TypeScript & React', level: 30, color: 'from-blue-500 to-cyan-500' },
    ],
    domainHeading: 'Domain Expertise',
    domainItems: [
      { icon: 'code', name: 'Software & Programming' },
      { icon: 'brain', name: 'Vibe Coding (Context & Prompt Engineering)' },
      { icon: 'boxes', name: 'Docker & Kubernetes' },
    ],
    interestsHeading: 'Interests',
    interestItems: [
      { icon: 'brain', name: 'LLMs' },
      { icon: 'code', name: 'Algorithms' },
      { icon: 'trendingUp', name: 'Financial Markets' },
      { icon: 'share2', name: 'Blockchain' },
    ],
  },
  tr: {
    heading: 'Hakkımda',
    subheading: 'Hakkımda genel bilgiler',
    personalHeading: 'Kişisel Bilgiler',
    summary: "15 yaşımdan beri bilgisayar ve bilişimle ilgileniyorum. Serüvenime Android işletim sistemlerine, port/custom ROM'larla başladım. Bilgisayar mühendisliği okumaya başlamam ve yapay zekânın yükseldiği son yıllarda odağımı, gerçek hayat problemlerini hızla çözeceğine inandığım projeleri hayata geçirmek için yapay zeka araçlarını kullanmaya kaydırdım. Günde yaklaşık 4-5 saat bilgisayar başında her hafta çıkan AI araçlarını projelerimde deneyerek geçiriyorum. Kendi algoritma bilgim ile yapay zekânın geniş kodlama bilgisini birleştirip vibe coding yaklaşımıyla kurumsal seviyede full stack uygulamalar geliştiriyorum. Hobi olarak finans (kripto para, hisse vb...) ve blockchain'e ilgim var.",
    personal: {
      nameLabel: 'İsim',
      nameValue: 'Alperen Manas',
      emailLabel: 'E-posta',
      emailValue: 'manasalperen@gmail.com',
      educationLabel: 'Eğitim',
      educationValue: 'Kırıkkale Üniversitesi - Bilgisayar Mühendisliği (3. sınıf)',
    },
    programmingHeading: 'Programlama Dilleri',
    programmingSkills: [
      { name: 'C#', level: 75, color: 'from-emerald-500 to-green-500' },
      { name: 'Python', level: 50, color: 'from-purple-500 to-pink-500' },
      { name: 'TypeScript & React', level: 30, color: 'from-blue-500 to-cyan-500' },
    ],
    domainHeading: 'Alan Bilgisi',
    domainItems: [
      { icon: 'code', name: 'Yazılım & Programlama' },
      { icon: 'brain', name: 'Vibe Coding (Context & Prompt Engineering)' },
      { icon: 'boxes', name: 'Docker & Kubernetes' },
    ],
    interestsHeading: 'İlgi Alanları',
    interestItems: [
      { icon: 'brain', name: 'LLM' },
      { icon: 'code', name: 'Algoritmalar' },
      { icon: 'trendingUp', name: 'Finansal Piyasalar' },
      { icon: 'share2', name: 'Blockchain' },
    ],
  },
};

export function getAboutContent(language: Language): AboutContent {
  return aboutContent[language] ?? aboutContent.en;
}
