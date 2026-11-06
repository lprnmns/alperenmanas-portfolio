// Ana sayfa (bento düzeni) metinleri. Yalnızca doğrulanmış bilgi; Türkçe doğal, kısa cümlelerle.
export type Lang = 'tr' | 'en';

export const LINK = {
  github: 'https://github.com/lprnmns',
  linkedin: 'https://www.linkedin.com/in/alperen-manas',
  mail: 'mailto:manasalperen@gmail.com',
  email: 'manasalperen@gmail.com',
  cv: '/Alperen_Manas_CV.pdf',
  allPrs: 'https://github.com/pulls?q=is%3Apr+author%3Alprnmns+is%3Amerged+-user%3Alprnmns',
};

export const OSS_REPOS = [
  { org: 'mrdoob', name: 'three.js', stars: '118k', url: 'https://github.com/mrdoob/three.js/pull/34459', tr: '3B grafik kütüphanesi', en: '3D graphics library' },
  { org: 'mui', name: 'Material UI', stars: '99k', url: 'https://github.com/mui/material-ui/pull/49090', tr: 'React arayüz kütüphanesi', en: 'React UI library' },
  { org: 'vitejs', name: 'Vite', stars: '84k', url: 'https://github.com/vitejs/vite/pull/23780', tr: 'Web geliştirme aracı', en: 'Web build tool' },
  { org: 'markedjs', name: 'marked', stars: '37k', url: 'https://github.com/markedjs/marked/pull/4159', tr: 'Markdown çevirici', en: 'Markdown parser' },
  { org: 'microsoft', name: 'Semantic Kernel', stars: '29k', url: 'https://github.com/microsoft/semantic-kernel/pull/14375', tr: 'Microsoft’un yapay zekâ kütüphanesi', en: 'Microsoft’s AI SDK' },
  { org: 'KaTeX', name: 'KaTeX', stars: '20k', url: 'https://github.com/KaTeX/KaTeX/pull/4277', tr: 'Matematik formülü gösterimi', en: 'Math typesetting' },
  { org: 'compiler-explorer', name: 'Compiler Explorer', stars: '19k', url: 'https://github.com/compiler-explorer/compiler-explorer/pull/9105', tr: 'godbolt.org', en: 'godbolt.org' },
  { org: 'nodejs', name: 'Node.js undici', stars: '7.7k', url: 'https://github.com/nodejs/undici/pull/6031', tr: 'Node.js’in HTTP istemcisi', en: 'Node.js HTTP client' },
];

const T = {
  tr: {
    nav: { github: 'GitHub', cv: 'CV', contact: 'İletişim' },
    langHref: '/en?lang=en',
    langLabel: 'EN',
    role: 'Backend · Full-stack · Yapay Zekâ',
    sub: 'Bilgisayar mühendisliği 4. sınıf öğrencisiyim. Canlı ürünler geliştiriyor, açık kaynağa katkı veriyorum.',
    bullets: [
      'Dünyada milyonlarca geliştiricinin kullandığı projelerde hata bulup düzeltiyorum. 150 katkım kabul edildi.',
      'Ürünlerimi fikirden yayına kadar geliştiriyorum. Zenith Trader 100’den fazla kullanıcıya ulaştı.',
      'Yapay zekâyı gerçek işlere bağlıyorum: belge soru-cevap servisleri, WhatsApp asistanları, LLM entegrasyonları.',
    ],
    seek: '8 Şubat 2027’den itibaren 14 hafta İME stajı arıyorum',
    relocate: 'Taşınmaya açığım',
    awards: [
      { img: '/img/monad-blitz.webp', badge: '1.LİK · MONAD BLITZ 2025', cap: 'HACKATHON BİRİNCİLİĞİ', pos: '50% 40%' },
      { img: '/img/teknofest-odul.webp', badge: 'FİNALİST · TEKNOFEST 2026', cap: 'EN İYİ SİSTEM TASARIMI ÖDÜLÜ', pos: '50% 30%' },
      { img: '/img/teknofest-taret.webp', badge: 'FİNAL · 12 HEDEFTE 11 İSABET', cap: 'HAVA SAVUNMA SİSTEMLERİ', pos: '50% 35%' },
    ],
    products: [
      {
        sys: 'ZENITH_TRADER.SYS', tag: 'CANLI ÜRÜN', img: '/img/zenith.webp', name: 'Zenith Trader',
        desc: 'Başarılı kripto yatırımcılarının işlemlerini kullanıcı hesaplarına otomatik kopyalayan canlı platform.',
        stats: [{ v: '100+', l: 'KULLANICI' }, { v: 'Canlı', l: 'GERÇEK ZAMANLI' }],
        how: ['Kullanıcı takip edeceği cüzdanı seçer', 'Sistem cüzdanın işlemlerini anlık izler', 'Yeni işlem, kullanıcının hesabında aynen açılır'],
        chips: ['Next.js', 'Node.js', 'Realtime', 'Auth'], url: 'https://zenithtrader.alperenmanas.app', open: 'Canlı ürünü aç', github: 'https://github.com/lprnmns/zenith-trader',
      },
      {
        sys: 'KLINIK_AKIS.SYS', tag: 'CANLI ÜRÜN', img: '/img/klinik-panel.webp', name: 'Klinik Akış AI',
        desc: 'Kliniklere WhatsApp’tan gelen randevu taleplerini yapay zekâyla karşılayan, takvime işleyen asistan.',
        stats: [{ v: 'WhatsApp', l: 'HASTA KANALI' }, { v: 'LLM', l: 'YAPAY ZEKÂ' }],
        how: ['Hasta WhatsApp’tan yazar', 'Yapay zekâ talebi anlar, uygun saatleri sunar', 'Hasta onaylar, randevu takvime yazılır; gerekirse personel devralır'],
        chips: ['Python', 'TypeScript', 'LLM', 'WhatsApp API'], url: 'https://klinikakis.com', open: 'Canlı ürünü aç',
      },
    ],
    exp: {
      label: 'DENEYİM',
      items: [
        { logo: 'BG', org: 'BGTS (BilgeAdam) – Yapay Zekâ Mühendisliği', when: 'Stajyer · Temmuz – Eylül 2026', text: 'Belgelerden soru-cevap yapan yapay zekâ servisi geliştirdim. Doğru belgeyi %92 oranında ilk 5 sonuçta buluyor, 239 otomatik testle korunuyor.', url: 'https://github.com/lprnmns/document-intelligence' },
        { logo: 'PTT', org: 'PTT Genel Müdürlüğü – DevOps', when: 'Stajyer · Ağustos 2025', text: 'Kurumsal BT ortamında Docker, Linux ve sanallaştırmayla çalıştım; projeleri container’a taşıdım.' },
      ],
    },
    oss: {
      label: 'AÇIK KAYNAK',
      title: 'Dünya çapındaki projelere kabul edilen katkılar',
      n1: 'kabul edilen katkı', n2: 'proje', deep: 'En çok katkı',
      meriyah: 'JavaScript parser’ı · ayda 43 milyon indirme',
      minijinja: 'Flask’ın yaratıcısının şablon motoru',
      contrib: 'katkı',
      last: 'Son kabul edilen',
      lastText: 'minijinja: listeyi tersten dilimlerken oluşan çökme düzeltildi',
      lastWhen: '5 Kasım 2026',
      all: 'Tüm katkılar',
    },
    gh: { title: 'Canlı GitHub Aktivitesi · Son 12 Ay', sub: 'Kod yazmak benim için hobi; her gün bir şeyler üretiyorum.', total: 'katkı · son 12 ay', active: 'aktif gün · son 30 gün', streak: 'günlük seri', visit: 'GitHub profilimi ziyaret et', months: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'] },
    profile: {
      label: 'PROFİL',
      edu: '4. sınıf Bilgisayar Mühendisliği öğrencisi',
      eduSub: 'Kırıkkale Üniversitesi · 2023 – 2027 · GNO 3.21',
      sic: 'Samsung Innovation Campus',
      sicSub: 'Yapay Zekâ Programı · Ekim 2026',
      lang: 'İngilizce · B1-B2',
      awardsT: 'Ödüller',
      awards: ['Monad Blitz 2025 · Hackathon birinciliği', 'TEKNOFEST 2026 · Finalist, En İyi Sistem Tasarımı Ödülü'],
      certsT: 'Sertifikalar',
      certs: 'Huawei HCIA-AI V3.5 · SQL & Databases (BTK Akademi)',
      howT: 'Nasıl çalışıyor?',
      roles: ['Backend', 'Full-stack', 'Yapay Zekâ / LLM'],
      where: 'Türkiye’nin her yerinde staja açığım · taşınabilirim',
      ime: 'İME: 8 Şubat 2027’den itibaren 14 hafta, tam zamanlı',
    },
    contact: { title: 'Birlikte çalışalım', text: 'En hızlı e-postayla dönüyorum.', cv: 'CV’yi indir' },
  },
  en: {
    nav: { github: 'GitHub', cv: 'CV', contact: 'Contact' },
    langHref: '/?lang=tr',
    langLabel: 'TR',
    role: 'Backend · Full-stack · AI',
    sub: 'Final-year computer engineering student. I build live products and contribute to open source.',
    bullets: [
      'I find and fix bugs in projects used by millions of developers. 150 of my contributions have been merged.',
      'I take my products from idea to launch. Zenith Trader reached more than 100 users.',
      'I connect AI to real work: document Q&A services, WhatsApp assistants, LLM integrations.',
    ],
    seek: 'Looking for a 14-week internship from 8 February 2027',
    relocate: 'Open to relocating',
    awards: [
      { img: '/img/monad-blitz.webp', badge: '1ST PLACE · MONAD BLITZ 2025', cap: 'HACKATHON WINNER', pos: '50% 40%' },
      { img: '/img/teknofest-odul.webp', badge: 'FINALIST · TEKNOFEST 2026', cap: 'BEST SYSTEM DESIGN AWARD', pos: '50% 30%' },
      { img: '/img/teknofest-taret.webp', badge: 'FINAL · 11 OF 12 TARGETS HIT', cap: 'AIR DEFENSE SYSTEMS', pos: '50% 35%' },
    ],
    products: [
      {
        sys: 'ZENITH_TRADER.SYS', tag: 'LIVE PRODUCT', img: '/img/zenith.webp', name: 'Zenith Trader',
        desc: 'Live platform that automatically copies the trades of successful crypto traders to users’ accounts.',
        stats: [{ v: '100+', l: 'USERS' }, { v: 'Live', l: 'REAL TIME' }],
        how: ['The user picks a wallet to follow', 'The system watches its trades in real time', 'Each new trade is opened on the user’s account'],
        chips: ['Next.js', 'Node.js', 'Realtime', 'Auth'], url: 'https://zenithtrader.alperenmanas.app', open: 'Open live product', github: 'https://github.com/lprnmns/zenith-trader',
      },
      {
        sys: 'KLINIK_AKIS.SYS', tag: 'LIVE PRODUCT', img: '/img/klinik-panel.webp', name: 'Klinik Akış AI',
        desc: 'AI assistant that answers clinics’ WhatsApp appointment requests and books them into the calendar.',
        stats: [{ v: 'WhatsApp', l: 'PATIENT CHANNEL' }, { v: 'LLM', l: 'AI' }],
        how: ['The patient writes on WhatsApp', 'The AI understands the request and offers free slots', 'The patient confirms and it is booked; staff take over when needed'],
        chips: ['Python', 'TypeScript', 'LLM', 'WhatsApp API'], url: 'https://klinikakis.com', open: 'Open live product',
      },
    ],
    exp: {
      label: 'EXPERIENCE',
      items: [
        { logo: 'BG', org: 'BGTS (BilgeAdam) – AI Engineering', when: 'Intern · July – September 2026', text: 'Built a document Q&A service. It finds the right document in the top 5 results 92% of the time and is covered by 239 automated tests.', url: 'https://github.com/lprnmns/document-intelligence' },
        { logo: 'PTT', org: 'PTT (Turkish Post) – DevOps', when: 'Intern · August 2025', text: 'Worked with Docker, Linux and virtualization in an enterprise IT environment; moved projects into containers.' },
      ],
    },
    oss: {
      label: 'OPEN SOURCE',
      title: 'Merged contributions to widely used projects',
      n1: 'merged contributions', n2: 'projects', deep: 'Most contributions',
      meriyah: 'JavaScript parser · 43M npm downloads/month',
      minijinja: 'Template engine by the creator of Flask',
      contrib: 'merged',
      last: 'Latest merged',
      lastText: 'minijinja: fixed a crash when slicing a list backwards',
      lastWhen: '5 November 2026',
      all: 'All contributions',
    },
    gh: { title: 'Live GitHub Activity · Last 12 Months', sub: 'Coding is my hobby; I build something every day.', total: 'contributions · last 12 months', active: 'active days · last 30 days', streak: 'day streak', visit: 'Visit my GitHub profile', months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
    profile: {
      label: 'PROFILE',
      edu: 'Final-year Computer Engineering student',
      eduSub: 'Kırıkkale University · 2023 – 2027 · GPA 3.21',
      sic: 'Samsung Innovation Campus',
      sicSub: 'AI Program · October 2026',
      lang: 'English · B1-B2',
      awardsT: 'Awards',
      awards: ['Monad Blitz 2025 · Hackathon winner', 'TEKNOFEST 2026 · Finalist, Best System Design Award'],
      certsT: 'Certificates',
      certs: 'Huawei HCIA-AI V3.5 · SQL & Databases (BTK Academy)',
      howT: 'How it works',
      roles: ['Backend', 'Full-stack', 'AI / LLM'],
      where: 'Open to any city in Türkiye · can relocate',
      ime: 'Internship: 14 weeks from 8 Feb 2027, full-time',
    },
    contact: { title: 'Let’s work together', text: 'Email is the fastest way to reach me.', cv: 'Download CV' },
  },
};

export const BENTO = T;
export type BentoText = (typeof T)['tr'];
