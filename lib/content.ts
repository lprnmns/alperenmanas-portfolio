// Sitedeki bütün metinler burada. Yalnızca doğrulanmış bilgi girer; sayılar GitHub API'den (Kasım 2026).

export type Lang = 'tr' | 'en';

export const LINKS = {
  github: 'https://github.com/lprnmns',
  linkedin: 'https://www.linkedin.com/in/alperen-manas',
  email: 'mailto:manasalperen@gmail.com',
  emailText: 'manasalperen@gmail.com',
  cv: '/Alperen_Manas_CV.pdf',
  allPrs: 'https://github.com/pulls?q=is%3Apr+author%3Alprnmns+is%3Amerged+-user%3Alprnmns',
};

type Proof = { icon: 'trophy' | 'medal' | 'merge' | 'users'; big: string; title: string; sub: string };
type Fix = { repo: string; stars: string; text: string; url: string };
type Deep = { name: string; url: string; meta: string; count: string; text: string; examples: { label: string; url: string }[] };
type Project = {
  name: string;
  kicker: string;
  badge?: string;
  text: string;
  points?: string[];
  flow?: string[];
  tech: string;
  image?: { src: string; alt: string; pos?: string };
  links: { label: string; url: string; kind: 'web' | 'github' }[];
};
type Job = { org: string; role: string; date: string; points: string[]; tech?: string; link?: { label: string; url: string } };

export type Content = {
  htmlLang: string;
  title: string;
  description: string;
  nav: { oss: string; projects: string; experience: string; contact: string };
  langSwitch: { label: string; href: string };
  available: string;
  name: string;
  role: string;
  positionsLabel: string;
  positions: string[];
  intro: string;
  edu: string;
  cta: { cv: string; email: string };
  photos: { src: string; alt: string; caption: string; w: number; h: number }[];
  photoAlt: string;
  proofs: Proof[];
  oss: { title: string; lead: string; deepTitle: string; deep: Deep[]; othersTitle: string; others: Fix[]; all: string };
  method: { title: string; steps: { t: string; d: string }[] };
  projects: { title: string; items: Project[] };
  experience: { title: string; jobs: Job[] };
  education: { title: string; items: { org: string; detail: string; date: string }[]; certs: string; langs: string };
  contact: { title: string; text: string; email: string };
  footer: string;
};

const MERIYAH_EX = [
  { label: '#680', url: 'https://github.com/meriyah/meriyah/pull/680' },
  { label: '#671', url: 'https://github.com/meriyah/meriyah/pull/671' },
  { label: '#673', url: 'https://github.com/meriyah/meriyah/pull/673' },
];
const MINIJINJA_EX = [
  { label: '#1002', url: 'https://github.com/mitsuhiko/minijinja/pull/1002' },
  { label: '#983', url: 'https://github.com/mitsuhiko/minijinja/pull/983' },
  { label: '#989', url: 'https://github.com/mitsuhiko/minijinja/pull/989' },
];

const PR = {
  three: 'https://github.com/mrdoob/three.js/pull/34459',
  mui: 'https://github.com/mui/material-ui/pull/49090',
  vite: 'https://github.com/vitejs/vite/pull/23780',
  marked: 'https://github.com/markedjs/marked/pull/4159',
  sk: 'https://github.com/microsoft/semantic-kernel/pull/14375',
  crawlee: 'https://github.com/apify/crawlee/pull/4092',
  katex: 'https://github.com/KaTeX/KaTeX/pull/4277',
  ce: 'https://github.com/compiler-explorer/compiler-explorer/pull/9105',
  undici: 'https://github.com/nodejs/undici/pull/6031',
};

const ZENITH_LINKS: Project['links'] = [
  { label: 'zenithtrader.alperenmanas.app', url: 'https://zenithtrader.alperenmanas.app', kind: 'web' },
  { label: 'GitHub', url: 'https://github.com/lprnmns/zenith-trader', kind: 'github' },
];
const KLINIK_LINKS: Project['links'] = [{ label: 'klinikakis.com', url: 'https://klinikakis.com', kind: 'web' }];
const TF_LINKS: Project['links'] = [
  { label: 'GitHub', url: 'https://github.com/lprnmns/target-tracking-engagement-system', kind: 'github' },
];
const DI_LINK = { url: 'https://github.com/lprnmns/document-intelligence' };

export const CONTENT: Record<Lang, Content> = {
  tr: {
    htmlLang: 'tr',
    title: 'Alperen Manas · Yazılım Geliştirici',
    description:
      'Bilgisayar mühendisliği 4. sınıf öğrencisi. 56 açık kaynak projede 150 merge edilmiş PR, hackathon birinciliği, TEKNOFEST 2026 finali. 8 Şubat 2027\'den itibaren İME stajı arıyor.',
    nav: { oss: 'Açık Kaynak', projects: 'Projeler', experience: 'Deneyim', contact: 'İletişim' },
    langSwitch: { label: 'EN', href: '/en?lang=en' },
    available: "8 Şubat 2027'den itibaren 14 haftalık İME stajı arıyorum · Taşınmaya açığım",
    name: 'Alperen Manas',
    role: 'Bilgisayar Mühendisliği 4. sınıf öğrencisi · Yazılım Geliştirici',
    positionsLabel: 'İlgilendiğim pozisyonlar',
    positions: ['Backend', 'Full-stack', 'Yapay Zekâ / LLM'],
    intro:
      'Çözümü hemen belli olmayan problemlerle uğraşmayı seviyorum: açık kaynak projelerde hataları testlerle doğrulayıp düzeltiyor, ürünlerimi uçtan uca geliştiriyorum. Yeni teknolojileri öğrenip farklı fikirleri deneyebileceğim ekiplerde çalışmak istiyorum.',
    edu: 'Kırıkkale Üniversitesi · GNO 3.21 · Mezuniyet 2027',
    cta: { cv: "CV'yi indir", email: 'E-posta gönder' },
    photos: [
      { src: '/img/monad-blitz.webp', alt: 'Alperen Manas, Monad Blitz hackathonunda birincilik ödülüyle', caption: 'Monad Blitz 2025 · Birincilik', w: 600, h: 800 },
      { src: '/img/teknofest-odul.webp', alt: 'Alperen Manas, TEKNOFEST 2026 En İyi Sistem Tasarımı ödülüyle', caption: 'TEKNOFEST 2026 · En İyi Sistem Tasarımı', w: 480, h: 599 },
    ],
    photoAlt: 'Alperen Manas, Monad Blitz hackathonunda birincilik ödülüyle',
    proofs: [
      { icon: 'trophy', big: 'Birincilik', title: 'Blockchain Hackathonu', sub: 'Monad Blitz, 2025' },
      { icon: 'medal', big: 'Finalist', title: 'En İyi Sistem Tasarımı Ödülü', sub: 'TEKNOFEST 2026 · Hava Savunma Sistemleri' },
      { icon: 'merge', big: '150', title: 'merge edilmiş PR', sub: '56 açık kaynak projede' },
      { icon: 'users', big: '100+', title: 'kullanıcı', sub: 'canlı ürünüm Zenith Trader’da' },
    ],
    oss: {
      title: 'Açık Kaynak',
      lead: 'Dünya çapında kullanılan projelerde hata bulup düzeltiyorum. Her düzeltmeyi hatayı kanıtlayan bir testle gönderiyorum; projelerin bakımcıları inceleyip kabul ediyor.',
      deepTitle: 'En çok emek verdiğim iki proje',
      deep: [
        {
          name: 'meriyah',
          url: 'https://github.com/meriyah/meriyah',
          meta: 'JavaScript parser · ayda ~40 milyon npm indirmesi',
          count: '23 merge',
          text: 'Parser\'ı resmî ECMAScript test seti (test262) ve başka parser\'larla karşılaştırdım; geçersiz kodu kabul ettiği ya da geçerli kodu reddettiği durumları bulup düzelttim.',
          examples: MERIYAH_EX,
        },
        {
          name: 'minijinja',
          url: 'https://github.com/mitsuhiko/minijinja',
          meta: 'Şablon motoru · Flask ve Jinja2\'nin yaratıcısının projesi',
          count: '15 merge',
          text: 'Go sürümünü Rust referans uygulamasıyla birebir aynı davranacak hâle getirdim: filtreler, karşılaştırmalar, dilimleme ve tanımsız değerlerin işlenmesi.',
          examples: MINIJINJA_EX,
        },
      ],
      othersTitle: 'Katkı verdiğim diğer projelerden örnekler',
      others: [
        { repo: 'three.js', stars: '118k', text: 'Büyük sayılarda isPowerOfTwo hatası', url: PR.three },
        { repo: 'Material UI', stars: '99k', text: 'Pagination için sınır durumu testleri', url: PR.mui },
        { repo: 'Vite', stars: '84k', text: 'Sorgu/hash içeren new URL(…) dosyalarını izleme', url: PR.vite },
        { repo: 'marked', stars: '37k', text: 'HTML bloğundan sonra liste öğesini doğru bitirme', url: PR.marked },
        { repo: 'Microsoft Semantic Kernel', stars: '29k', text: 'Boş fonksiyon sonucunda çökmeyi önleme', url: PR.sk },
        { repo: 'Crawlee', stars: '26k', text: 'Hata mesajlarını yığın izi olmadan da koruma', url: PR.crawlee },
        { repo: 'KaTeX', stars: '20k', text: 'Boş son satırlarda denklem etiketlerini koruma', url: PR.katex },
        { repo: 'Compiler Explorer', stars: '19k', text: 'Assembly çıktısında renk dekoratörlerini kapatma', url: PR.ce },
        { repo: 'Node.js undici', stars: '7.7k', text: 'MockAgent\'ta sorgu öncesi eğik çizgiyi yok sayma', url: PR.undici },
      ],
      all: 'Tüm merge edilmiş PR\'lar',
    },
    method: {
      title: 'Nasıl çalışıyorum',
      steps: [
        { t: 'Referans bul', d: 'Doğru davranışı tanımlayan bir kaynak: spesifikasyon, resmî test seti ya da başka bir uygulama.' },
        { t: 'Karşılaştır', d: 'İki tarafı aynı girdilerle çalıştırıp farkları yakalıyorum (differential testing, fuzzing). AI destekli kod incelemesiyle şüpheli yerleri daraltıyorum.' },
        { t: 'Kanıtla ve düzelt', d: 'Hatayı en küçük teste indiriyor, düzeltiyor ve testle birlikte projeye gönderiyorum.' },
      ],
    },
    projects: {
      title: 'Projeler',
      items: [
        {
          name: 'Zenith Trader',
          kicker: 'Canlı copy-trading platformu',
          badge: '100+ kullanıcı',
          text: "OKX'teki büyük cüzdanların hareketlerini izleyip kullanıcı hesaplarında aynı işlemleri açan canlı ürünü uçtan uca geliştirdim.",
          tech: 'TypeScript · Next.js · Node.js · gerçek zamanlı API entegrasyonları · kimlik doğrulama',
          image: { src: '/img/zenith.webp', alt: 'Zenith Trader cüzdan analizi ekranı' },
          links: ZENITH_LINKS,
        },
        {
          name: 'Klinik Akış AI',
          kicker: 'Klinikler için yapay zekâ randevu asistanı',
          text: "WhatsApp'tan gelen randevu taleplerini yorumlayan, canlı uygunluğu kontrol eden, onay alıp ortak takvime yazan ve belirsiz ya da hassas mesajları personele devreden ürünü geliştirdim.",
          image: { src: '/img/klinik-panel.webp', alt: 'Klinik Akış: hastanın WhatsApp konuşması ve klinik paneli' },
          tech: 'Python · TypeScript · LLM API\'leri · WhatsApp entegrasyonu · iş akışı otomasyonu',
          links: KLINIK_LINKS,
        },
        {
          name: 'TEKNOFEST 2026 · Hava Savunma Tareti',
          kicker: 'Görüntü işlemeyle hedef takip eden taret',
          badge: 'Finalist · En İyi Sistem Tasarımı',
          text: 'Görüntü işleme dışındaki yazılımı üstlendim: takip ve atış kontrol algoritması, seri haberleşme, backend, operatör konsolu ve sistem entegrasyonu.',
          points: ['Final: 12 hedefin 11\'i vuruldu', 'Hareketli hedeflerde dost-düşman ayrımıyla 8 hedefin 7\'si vuruldu'],
          tech: 'Python · FastAPI · OpenCV/YOLO · Kalman/PID · C++ (Raspberry Pi Pico 2) · Vue 3 · Three.js',
          image: { src: '/img/teknofest-taret.webp', alt: 'Alperen Manas, TEKNOFEST atış alanında İSTİKLAL taretiyle', pos: 'center 30%' },
          links: TF_LINKS,
        },
      ],
    },
    experience: {
      title: 'Deneyim',
      jobs: [
        {
          org: 'BGTS (BilgeAdam)',
          role: 'Yapay Zekâ Mühendisliği Stajyeri',
          date: 'Tem 2026 – Eyl 2026',
          points: [
            'Yerel çalışan doküman soru-cevap (RAG) servisi: hibrit arama (vektör + BM25), kaynak gösteren yanıtlar, cevaplanamayan sorular için LLM\'siz akış.',
            '44 vakalık değerlendirme setinde Recall@5 0.92; 239 test, mypy strict, Docker Compose.',
          ],
          tech: 'Python · FastAPI · Qdrant · Ollama · Docker Compose · pytest',
          link: { label: 'Kodu incele', url: DI_LINK.url },
        },
        {
          org: 'PTT Genel Müdürlüğü',
          role: 'DevOps Stajyeri',
          date: 'Ağu 2025',
          points: ['Kurumsal BT ortamında Docker/Linux, sanallaştırma ve deployment süreçleriyle çalıştım; projeleri container\'a taşıdım.'],
        },
      ],
    },
    education: {
      title: 'Eğitim',
      items: [
        { org: 'Kırıkkale Üniversitesi · Bilgisayar Mühendisliği', detail: '4. sınıf · GNO 3.21 / 4.00', date: '2023 – 2027' },
        { org: 'Samsung Innovation Campus · Yapay Zekâ Programı', detail: 'Samsung × UNDP · ML, NLP, derin öğrenme, LLM', date: 'Eki 2026' },
      ],
      certs: 'Sertifikalar: Huawei HCIA-AI V3.5 · SQL & Databases (BTK Akademi)',
      langs: 'Diller: Türkçe (ana dil) · İngilizce (B1-B2)',
    },
    contact: {
      title: 'İletişim',
      text: "8 Şubat 2027'den itibaren 14 haftalık, tam zamanlı İME stajı için başvurulara açığım. Şehir fark etmez. En hızlı e-postayla dönüyorum.",
      email: 'E-posta gönder',
    },
    footer: '© 2026 Alperen Manas',
  },

  en: {
    htmlLang: 'en',
    title: 'Alperen Manas · Software Engineer',
    description:
      'Final-year Computer Engineering student. 150 merged PRs across 56 open-source projects, hackathon winner, TEKNOFEST 2026 finalist. Looking for a 14-week internship from 8 February 2027.',
    nav: { oss: 'Open Source', projects: 'Projects', experience: 'Experience', contact: 'Contact' },
    langSwitch: { label: 'TR', href: '/?lang=tr' },
    available: 'Looking for a 14-week internship from 8 Feb 2027 · Open to relocating',
    name: 'Alperen Manas',
    role: 'Final-year Computer Engineering student · Software Engineer',
    positionsLabel: 'Roles I am looking for',
    positions: ['Backend', 'Full-stack', 'AI / LLM'],
    intro:
      'I like problems whose solution is not obvious at first. I find and fix bugs in widely used open-source projects, proving each one with a test, and I build my own products end to end. I want to join a team where I can keep learning new technologies and try new ideas.',
    edu: 'Kırıkkale University · GPA 3.21 · Graduating 2027',
    cta: { cv: 'Download CV', email: 'Send email' },
    photos: [
      { src: '/img/monad-blitz.webp', alt: 'Alperen Manas holding the first-place prize at Monad Blitz', caption: 'Monad Blitz 2025 · 1st place', w: 600, h: 800 },
      { src: '/img/teknofest-odul.webp', alt: 'Alperen Manas with the TEKNOFEST 2026 Best System Design award', caption: 'TEKNOFEST 2026 · Best System Design', w: 480, h: 599 },
    ],
    photoAlt: 'Alperen Manas holding the first-place prize at Monad Blitz',
    proofs: [
      { icon: 'trophy', big: '1st place', title: 'Blockchain hackathon', sub: 'Monad Blitz, 2025' },
      { icon: 'medal', big: 'Finalist', title: 'Best System Design Award', sub: 'TEKNOFEST 2026 · Air Defense Systems' },
      { icon: 'merge', big: '150', title: 'merged PRs', sub: 'across 56 open-source projects' },
      { icon: 'users', big: '100+', title: 'users', sub: 'on my live product, Zenith Trader' },
    ],
    oss: {
      title: 'Open Source',
      lead: 'I find and fix bugs in widely used projects. Every fix ships with a test that proves the bug, and the maintainers review and merge it.',
      deepTitle: 'Where I went deep',
      deep: [
        {
          name: 'meriyah',
          url: 'https://github.com/meriyah/meriyah',
          meta: 'JavaScript parser · ~40M npm downloads a month',
          count: '23 merged',
          text: 'I checked the parser against test262 (the official ECMAScript test suite) and other parsers, then fixed the cases where it accepted invalid code or rejected valid code.',
          examples: MERIYAH_EX,
        },
        {
          name: 'minijinja',
          url: 'https://github.com/mitsuhiko/minijinja',
          meta: 'Template engine · by the creator of Flask and Jinja2',
          count: '15 merged',
          text: 'I made the Go port behave exactly like the Rust reference implementation: filters, comparisons, slicing and undefined-value handling.',
          examples: MINIJINJA_EX,
        },
      ],
      othersTitle: 'A few of the other projects I contributed to',
      others: [
        { repo: 'three.js', stars: '118k', text: 'Fix isPowerOfTwo for large values', url: PR.three },
        { repo: 'Material UI', stars: '99k', text: 'Edge-case tests for Pagination', url: PR.mui },
        { repo: 'Vite', stars: '84k', text: 'Watch new URL(…) files that have a query or hash', url: PR.vite },
        { repo: 'marked', stars: '37k', text: 'End a list item correctly after an HTML block', url: PR.marked },
        { repo: 'Microsoft Semantic Kernel', stars: '29k', text: 'Stop crashing on empty function results', url: PR.sk },
        { repo: 'Crawlee', stars: '26k', text: 'Keep error messages that have no stack trace', url: PR.crawlee },
        { repo: 'KaTeX', stars: '20k', text: 'Keep equation tags on empty final rows', url: PR.katex },
        { repo: 'Compiler Explorer', stars: '19k', text: 'Disable color decorators in assembly output', url: PR.ce },
        { repo: 'Node.js undici', stars: '7.7k', text: 'MockAgent: ignore the slash before a query string', url: PR.undici },
      ],
      all: 'All merged PRs',
    },
    method: {
      title: 'How I work',
      steps: [
        { t: 'Find a reference', d: 'Something that defines correct behavior: a spec, an official test suite, or another implementation.' },
        { t: 'Compare', d: 'Run both sides on the same inputs and catch the differences (differential testing, fuzzing). AI-assisted code review narrows down the suspects.' },
        { t: 'Prove and fix', d: 'Reduce the bug to the smallest failing test, fix it, and send both upstream.' },
      ],
    },
    projects: {
      title: 'Projects',
      items: [
        {
          name: 'Zenith Trader',
          kicker: 'Live copy-trading platform',
          badge: '100+ users',
          text: 'I built this live product end to end. It watches large wallets on OKX and opens the same trades on users’ accounts.',
          tech: 'TypeScript · Next.js · Node.js · real-time API integrations · authentication',
          image: { src: '/img/zenith.webp', alt: 'Zenith Trader wallet analysis screen' },
          links: ZENITH_LINKS,
        },
        {
          name: 'Klinik Akış AI',
          kicker: 'AI appointment assistant for clinics',
          text: 'It reads appointment requests arriving on WhatsApp, checks live availability, books after the patient confirms, and hands unclear or sensitive messages to staff.',
          image: { src: '/img/klinik-panel.webp', alt: 'Klinik Akış: the patient’s WhatsApp chat and the clinic dashboard' },
          tech: 'Python · TypeScript · LLM APIs · WhatsApp integration · workflow automation',
          links: KLINIK_LINKS,
        },
        {
          name: 'TEKNOFEST 2026 · Air Defense Turret',
          kicker: 'Vision-guided target tracking turret',
          badge: 'Finalist · Best System Design',
          text: 'I owned all the software except computer vision: tracking and fire control, serial communication, backend, operator console and system integration.',
          points: ['Final: 11 of 12 targets hit', 'Moving targets with friend/foe identification: 7 of 8 hit'],
          tech: 'Python · FastAPI · OpenCV/YOLO · Kalman/PID · C++ (Raspberry Pi Pico 2) · Vue 3 · Three.js',
          image: { src: '/img/teknofest-taret.webp', alt: 'Alperen Manas with the İSTİKLAL turret on the TEKNOFEST range', pos: 'center 30%' },
          links: TF_LINKS,
        },
      ],
    },
    experience: {
      title: 'Experience',
      jobs: [
        {
          org: 'BGTS (BilgeAdam)',
          role: 'AI Engineering Intern',
          date: 'Jul 2026 – Sep 2026',
          points: [
            'Local document question-answering (RAG) service: hybrid search (vector + BM25), answers with sources, and a no-LLM path for questions it cannot answer.',
            'Recall@5 0.92 on a 44-case evaluation set; 239 tests, mypy strict, Docker Compose.',
          ],
          tech: 'Python · FastAPI · Qdrant · Ollama · Docker Compose · pytest',
          link: { label: 'View code', url: DI_LINK.url },
        },
        {
          org: 'PTT (Turkish Post)',
          role: 'DevOps Intern',
          date: 'Aug 2025',
          points: ['Worked with Docker/Linux, virtualization and deployment in an enterprise IT environment; moved projects into containers.'],
        },
      ],
    },
    education: {
      title: 'Education',
      items: [
        { org: 'Kırıkkale University · Computer Engineering', detail: 'Final year · GPA 3.21 / 4.00', date: '2023 – 2027' },
        { org: 'Samsung Innovation Campus · AI Program', detail: 'Samsung × UNDP · ML, NLP, deep learning, LLMs', date: 'Oct 2026' },
      ],
      certs: 'Certificates: Huawei HCIA-AI V3.5 · SQL & Databases (BTK Academy)',
      langs: 'Languages: Turkish (native) · English (B1-B2)',
    },
    contact: {
      title: 'Contact',
      text: 'I am looking for a full-time, 14-week internship starting 8 February 2027. Location does not matter. Email is the fastest way to reach me.',
      email: 'Send email',
    },
    footer: '© 2026 Alperen Manas',
  },
};
