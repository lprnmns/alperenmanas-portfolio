// Konsept sayfalarının ortak verisi. Kural: her teknik bilginin yanında sade Türkçe karşılığı olur,
// böylece hem mühendis hem teknik olmayan İK aynı sayfayı anlar. Sayılar GitHub ve npm API'den (6 Kasım 2026).

export const ME = {
  name: 'Alperen Manas',
  school: 'Kırıkkale Üniversitesi',
  dept: 'Bilgisayar Mühendisliği',
  year: '4. sınıf',
  gpa: '3.21',
  grad: '2027',
  ime: "8 Şubat 2027'den itibaren 14 hafta, tam zamanlı",
  imeShort: '8 Şubat 2027 · 14 hafta',
  roles: ['Backend', 'Full-stack', 'Yapay Zekâ / LLM'],
  relocate: 'Taşınmaya açığım',
  email: 'manasalperen@gmail.com',
  mailto: 'mailto:manasalperen@gmail.com?subject=%C4%B0ME%20staj%C4%B1%20hakk%C4%B1nda',
  linkedin: 'https://www.linkedin.com/in/alperen-manas',
  github: 'https://github.com/lprnmns',
  cv: '/Alperen_Manas_CV.pdf',
  allPrs: 'https://github.com/pulls?q=is%3Apr+author%3Alprnmns+is%3Amerged+-user%3Alprnmns',
};

export const STATS = {
  prs: 150,
  repos: 56,
  meriyah: 23,
  minijinja: 15,
  contributions: '1.636',
  updated: '6 Kasım 2026',
};

// Teknik terimlerin sade karşılıkları (İK için)
export const GLOSSARY: Record<string, string> = {
  'açık kaynak': 'Kodu herkese açık olan, dünyanın her yerinden gönüllülerin geliştirdiği yazılım projeleri.',
  'PR': 'Pull request: bir projeye “şu değişikliği yapalım” diye sunulan kod önerisi.',
  'merge': 'Önerilen kodun, projenin sorumluları tarafından incelenip projeye kabul edilmesi.',
  'bakımcı': 'Bir açık kaynak projeye hangi kodun gireceğine karar veren deneyimli sorumlu (maintainer).',
  'yıldız': 'GitHub’da bir projeyi beğenen/takip eden kişi sayısı; projenin ne kadar tanındığını gösterir.',
  'test': 'Kodun doğru çalıştığını otomatik kontrol eden küçük program. Hata tekrar ederse hemen yakalar.',
  'parser': 'Yazılan kodu okuyup bilgisayarın anlayacağı yapıya çeviren program.',
};

export type Pr = {
  id: string;
  repo: string; // GitHub adı
  name: string; // görünen ad
  what: string; // proje sade dille ne
  stars: string;
  downloads?: string; // aylık npm indirme (projenin ölçeği, benim etkim değil)
  url: string;
  num: number;
  date: string; // ISO
  dateTr: string;
  plain: string; // sade Türkçe: ne bozuktu, ne oldu
  title: string; // özgün PR başlığı
  plus: number;
  minus: number;
  test: string; // eklenen kanıt testi
  mergedBy: string;
  mergedByWho: string; // sade: kim kabul etti
  reference?: string; // doğruyu neye göre belirledim
  kind: 'dil' | 'ai' | 'web' | 'altyapı';
  featured?: boolean;
};

export const PRS: Pr[] = [
  {
    id: 'meriyah-671', repo: 'meriyah/meriyah', name: 'meriyah', what: 'JavaScript kodunu okuyup anlamlandıran program (parser). Başka araçların içinde ayda ~43 milyon kez indiriliyor.',
    stars: '1.2k', downloads: '43 milyon/ay', url: 'https://github.com/meriyah/meriyah/pull/671', num: 671, date: '2026-10-25', dateTr: '25 Ekim 2026',
    plain: 'Dilin kurallarına göre yasak olan bir kod satırını program “geçerli” sayıyordu. Düzeltmeden sonra doğru şekilde hata veriyor.',
    title: 'fix(parser): reject `let` as an arrow parameter in strict mode code', plus: 40, minus: 0,
    test: '5 yeni test: düzeltme olmadan hepsi başarısız oluyor', mergedBy: '3cp', mergedByWho: 'meriyah bakımcısı',
    reference: 'acorn (başka bir JavaScript parser’ı) + ECMAScript spesifikasyonu §13.1.1', kind: 'dil', featured: true,
  },
  {
    id: 'meriyah-689', repo: 'meriyah/meriyah', name: 'meriyah', what: 'JavaScript parser’ı · ayda ~43 milyon indirme',
    stars: '1.2k', downloads: '43 milyon/ay', url: 'https://github.com/meriyah/meriyah/pull/689', num: 689, date: '2026-11-02', dateTr: '2 Kasım 2026',
    plain: '`[a]++` gibi dilin kurallarına aykırı ifadeleri kabul ediyordu. Artık reddediyor.',
    title: 'fix(parser): reject `++` and `--` on array and object literals', plus: 84, minus: 12,
    test: 'Regresyon testleri eklendi', mergedBy: '3cp', mergedByWho: 'meriyah bakımcısı', reference: 'test262 (resmî JavaScript test seti)', kind: 'dil',
  },
  {
    id: 'minijinja-1002', repo: 'mitsuhiko/minijinja', name: 'minijinja', what: 'Metin ve web sayfası şablonu üreten motor. Flask ve Jinja2’yi yazan Armin Ronacher’ın projesi.',
    stars: '2.8k', url: 'https://github.com/mitsuhiko/minijinja/pull/1002', num: 1002, date: '2026-11-05', dateTr: '5 Kasım 2026',
    plain: 'Bir listeyi tersten dilimlemek istendiğinde program çöküyor ya da yanlış sonuç veriyordu.',
    title: 'Fix slicing with a negative step panicking and returning wrong items', plus: 37, minus: 15,
    test: 'Şablon testi + beklenen çıktı kaydı', mergedBy: 'mitsuhiko', mergedByWho: 'Armin Ronacher, projenin yaratıcısı', reference: 'Python’un dilimleme davranışı (4.732 kombinasyon karşılaştırıldı)', kind: 'dil', featured: true,
  },
  {
    id: 'minijinja-983', repo: 'mitsuhiko/minijinja', name: 'minijinja', what: 'Şablon motoru · Rust ve Go sürümleri var',
    stars: '2.8k', url: 'https://github.com/mitsuhiko/minijinja/pull/983', num: 983, date: '2026-10-28', dateTr: '28 Ekim 2026',
    plain: 'Go sürümü ondalıklı sayıları Rust sürümünden farklı yazıyordu. İki sürüm artık aynı sonucu veriyor.',
    title: 'fix(go): serialize floats in tojson like Rust', plus: 147, minus: 80,
    test: 'Go testleri eklendi', mergedBy: 'mitsuhiko', mergedByWho: 'Armin Ronacher, projenin yaratıcısı', reference: 'Rust sürümü (referans uygulama)', kind: 'dil',
  },
  {
    id: 'vite-23780', repo: 'vitejs/vite', name: 'Vite', what: 'Web siteleri geliştirilirken kullanılan, dünyanın en popüler araçlarından biri.',
    stars: '84k', downloads: '832 milyon/ay', url: 'https://github.com/vitejs/vite/pull/23780', num: 23780, date: '2026-10-26', dateTr: '26 Ekim 2026',
    plain: 'Dosya değişince projenin otomatik yeniden derlenmesi, adresinde “?” veya “#” olan dosyalarda çalışmıyordu.',
    title: 'fix: watch files that have a query or hash referenced with `new URL(..., import.meta.url)`', plus: 38, minus: 7,
    test: 'Birim testi eklendi', mergedBy: 'sapphi-red', mergedByWho: 'Vite çekirdek ekibi', kind: 'web', featured: true,
  },
  {
    id: 'sk-14375', repo: 'microsoft/semantic-kernel', name: 'Microsoft Semantic Kernel', what: 'Microsoft’un yapay zekâ uygulamaları geliştirme kütüphanesi.',
    stars: '29k', url: 'https://github.com/microsoft/semantic-kernel/pull/14375', num: 14375, date: '2026-11-02', dateTr: '2 Kasım 2026',
    plain: 'Yapay zekânın çağırdığı bir fonksiyon boş sonuç döndürünce kütüphane çöküyordu.',
    title: 'Python: Handle empty chat message function results', plus: 10, minus: 7,
    test: 'Birim testi eklendi', mergedBy: 'eavanvalkenburg', mergedByWho: 'Microsoft Semantic Kernel ekibi', kind: 'ai', featured: true,
  },
  {
    id: 'undici-6031', repo: 'nodejs/undici', name: 'Node.js undici', what: 'Node.js’in internet istekleri için kullandığı resmî kütüphane.',
    stars: '7.7k', downloads: '991 milyon/ay', url: 'https://github.com/nodejs/undici/pull/6031', num: 6031, date: '2026-10-19', dateTr: '19 Ekim 2026',
    plain: 'Testlerde kullanılan sahte internet istekleri, adresteki tek bir “/” yüzünden eşleşmiyordu.',
    title: 'fix(mock): ignore the trailing slash before a query string', plus: 12, minus: 2,
    test: 'Test eklendi', mergedBy: 'mcollina', mergedByWho: 'Matteo Collina, Node.js teknik yönlendirme komitesi', kind: 'altyapı',
  },
  {
    id: 'ce-9105', repo: 'compiler-explorer/compiler-explorer', name: 'Compiler Explorer', what: 'Yazılan kodun makine diline nasıl çevrildiğini gösteren site (godbolt.org).',
    stars: '19k', url: 'https://github.com/compiler-explorer/compiler-explorer/pull/9105', num: 9105, date: '2026-09-14', dateTr: '14 Eylül 2026',
    plain: 'Makine kodu ekranında bazı sayılar yanlışlıkla renk kutucuğu olarak gösteriliyordu.',
    title: 'fix(compiler): disable color decorators for assembly output', plus: 53, minus: 0,
    test: 'Arayüz testi eklendi', mergedBy: 'mattgodbolt', mergedByWho: 'Matt Godbolt, sitenin yaratıcısı', kind: 'web',
  },
  {
    id: 'three-34459', repo: 'mrdoob/three.js', name: 'three.js', what: 'Tarayıcıda 3B grafik çizmek için en çok kullanılan kütüphane.',
    stars: '118k', downloads: '102 milyon/ay', url: 'https://github.com/mrdoob/three.js/pull/34459', num: 34459, date: '2026-09-08', dateTr: '8 Eylül 2026',
    plain: 'Bir sayının 2’nin kuvveti olup olmadığını kontrol eden fonksiyon büyük sayılarda yanlış cevap veriyordu.',
    title: 'MathUtils: Fix large isPowerOfTwo values', plus: 5, minus: 3,
    test: 'Birim testi eklendi', mergedBy: 'Mugen87', mergedByWho: 'three.js çekirdek ekibi', kind: 'web',
  },
  {
    id: 'katex-4277', repo: 'KaTeX/KaTeX', name: 'KaTeX', what: 'Web sayfalarında matematik formüllerini gösteren kütüphane.',
    stars: '20k', downloads: '131 milyon/ay', url: 'https://github.com/KaTeX/KaTeX/pull/4277', num: 4277, date: '2026-09-05', dateTr: '5 Eylül 2026',
    plain: 'Denklem tablosunun boş son satırındaki denklem numarası kayboluyordu.',
    title: 'fix(array): preserve tags on empty final rows', plus: 11, minus: 2,
    test: 'Test eklendi', mergedBy: 'grigoriy-reshetniak', mergedByWho: 'KaTeX bakımcısı', reference: 'LaTeX’in davranışı', kind: 'web',
  },
  {
    id: 'marked-4159', repo: 'markedjs/marked', name: 'marked', what: 'Markdown metnini web sayfasına çeviren kütüphane.',
    stars: '37k', downloads: '386 milyon/ay', url: 'https://github.com/markedjs/marked/pull/4159', num: 4159, date: '2026-11-02', dateTr: '2 Kasım 2026',
    plain: 'HTML bloğundan sonra gelen satır yanlışlıkla listeye ekleniyordu.',
    title: 'fix: end a list item before a lazy line after an html block', plus: 42, minus: 0,
    test: 'Örnek girdi ve beklenen çıktı eklendi', mergedBy: 'UziTech', mergedByWho: 'marked bakımcısı', reference: 'CommonMark spesifikasyonu', kind: 'web',
  },
  {
    id: 'mui-49090', repo: 'mui/material-ui', name: 'Material UI', what: 'React ile arayüz yapmak için en çok kullanılan bileşen kütüphanelerinden biri.',
    stars: '99k', downloads: '44 milyon/ay', url: 'https://github.com/mui/material-ui/pull/49090', num: 49090, date: '2026-10-28', dateTr: '28 Ekim 2026',
    plain: 'Sayfa numaralandırma bileşeninin uç durumları için eksik testleri yazdım.',
    title: '[test][pagination] Test ellipses with zero boundary and sibling counts', plus: 18, minus: 0,
    test: 'Bu katkının kendisi test', mergedBy: 'ZeeshanTamboli', mergedByWho: 'Material UI ekibi', kind: 'web',
  },
];

export const BY_DATE = [...PRS].sort((a, b) => (a.date < b.date ? 1 : -1));

export type Milestone = { id: string; when: string; sortKey: string; title: string; plain: string; img?: string; link?: string; tag: string };

export const MILESTONES: Milestone[] = [
  { id: 'samsung', when: 'Ekim 2026', sortKey: '2026-10-15', tag: 'Eğitim', title: 'Samsung Innovation Campus yapay zekâ programını bitirdim', plain: 'Samsung × UNDP programı: makine öğrenmesi, doğal dil işleme, derin öğrenme, büyük dil modelleri.' },
  { id: 'bgts', when: 'Temmuz – Eylül 2026', sortKey: '2026-09-15', tag: 'Staj', title: 'BGTS’de yapay zekâ mühendisliği stajı', plain: 'Belgeler üzerinde soru-cevap yapan yapay zekâ servisi geliştirdim. Doğru belgeyi %92 oranında ilk 5 sonuçta buluyor; 239 otomatik testle korunuyor.', link: 'https://github.com/lprnmns/document-intelligence' },
  { id: 'teknofest', when: '2026', sortKey: '2026-09-01', tag: 'Ödül', title: 'TEKNOFEST 2026 Hava Savunma Sistemleri: finalist + En İyi Sistem Tasarımı', plain: 'Takımımızın taret sistemi finalde 12 hedefin 11’ini vurdu. Görüntü işleme dışındaki yazılımı ben yazdım.', img: '/img/teknofest-odul.webp', link: 'https://github.com/lprnmns/target-tracking-engagement-system' },
  { id: 'monad', when: '2025', sortKey: '2025-10-01', tag: 'Ödül', title: 'Monad Blitz blockchain hackathonu: birincilik', plain: 'Hackathon süresince bir ürün fikri geliştirip sundum ve birinci oldum.', img: '/img/monad-blitz.webp' },
  { id: 'zenith', when: '2025', sortKey: '2025-09-27', tag: 'Ürün', title: 'Zenith Trader yayında', plain: 'Büyük kripto cüzdanlarının işlemlerini kullanıcı hesaplarına kopyalayan platform. 100’den fazla kullanıcıya ulaştı.', img: '/img/zenith.webp', link: 'https://zenithtrader.alperenmanas.app' },
  { id: 'ptt', when: 'Ağustos 2025', sortKey: '2025-08-15', tag: 'Staj', title: 'PTT Genel Müdürlüğü’nde DevOps stajı', plain: 'Kurumsal BT ortamında Docker, Linux ve sanallaştırmayla çalıştım; projeleri container’a taşıdım.' },
];

export type Product = {
  name: string; oneLine: string; badge?: string; url: string; github?: string;
  shots: { src: string; cap: string }[]; steps: string[]; mine: string[]; tech: string;
};

export const PRODUCTS: Record<'zenith' | 'klinik', Product> = {
  zenith: {
    name: 'Zenith Trader',
    oneLine: 'Kripto piyasasında başarılı yatırımcıların işlemlerini kullanıcı hesaplarına otomatik kopyalayan canlı platform.',
    badge: '100+ kullanıcı',
    url: 'https://zenithtrader.alperenmanas.app',
    github: 'https://github.com/lprnmns/zenith-trader',
    shots: [
      { src: '/img/zenith.webp', cap: 'Cüzdan analizi: bir yatırımcının kâr/zarar geçmişi' },
      { src: '/img/zenith-panel.webp', cap: 'Kullanıcı paneli' },
      { src: '/img/zenith-strateji.webp', cap: 'Kopyalama stratejileri' },
    ],
    steps: ['Kullanıcı takip edeceği cüzdanı seçer', 'Sistem o cüzdanın işlemlerini gerçek zamanlı izler', 'Yeni işlem açılınca kullanıcının hesabında aynı işlem açılır'],
    mine: ['Ürünü uçtan uca geliştirdim: arayüz, sunucu, borsa entegrasyonu, giriş sistemi', 'Canlıya alıp gerçek kullanıcılarla çalıştırdım'],
    tech: 'TypeScript · Next.js · Node.js · gerçek zamanlı API entegrasyonları · kimlik doğrulama',
  },
  klinik: {
    name: 'Klinik Akış AI',
    oneLine: 'Kliniklere WhatsApp’tan gelen randevu taleplerini yapay zekâyla karşılayan, takvime işleyen asistan.',
    url: 'https://klinikakis.com',
    shots: [
      { src: '/img/klinik-panel.webp', cap: 'Hastanın WhatsApp’ı (solda) ve kliniğin paneli (sağda)' },
      { src: '/img/klinik-giris.webp', cap: 'Ürün sitesi: klinikakis.com' },
    ],
    steps: ['Hasta WhatsApp’tan yazar', 'Yapay zekâ talebi anlar, uygun saatleri sunar', 'Hasta onaylar, randevu ortak takvime yazılır', 'Belirsiz veya hassas mesajlar klinik personeline devredilir'],
    mine: ['Ürünü geliştirdim: WhatsApp entegrasyonu, yapay zekâ akışı, takvim, klinik paneli', 'Asistan tıbbi değerlendirme yapmaz; gerektiğinde konuşmayı klinik ekibine devreder'],
    tech: 'Python · TypeScript · LLM API’leri · WhatsApp entegrasyonu · iş akışı otomasyonu',
  },
};

export const TEKNOFEST = {
  title: 'TEKNOFEST 2026 · Hava Savunma Sistemleri',
  award: 'Finalist · En İyi Sistem Tasarımı Ödülü',
  plain: 'Kamera hedefi görür, yazılım hangi hedefe ateş edileceğine karar verir, taret döner ve atış yapar. Dost ve düşman hedefleri ayırt etmesi gerekir.',
  stage2: { hit: 11, total: 12, label: 'Final, 2. aşama: sabit balon hedefler' },
  stage3: { hit: 7, total: 8, label: 'Final, 3. aşama: hareketli uçak maketleri, dost-düşman ayrımı' },
  mine: 'Görüntü işleme dışındaki bütün yazılımı ben yazdım: takip ve atış kontrolü, seri haberleşme, sunucu, operatör konsolu ve sistem entegrasyonu.',
  pipeline: [
    { t: 'Kamera', d: 'Görüntüyü alır', mine: false },
    { t: 'Görüntü işleme (YOLO)', d: 'Balonu ve uçağı tanır, dost/düşman rengini ayırır', mine: false },
    { t: 'Hedef kaydı', d: 'Hangi hedef vurulacak, hangisi zaten vuruldu', mine: true },
    { t: 'Otomatik takip', d: 'PID + ileri besleme + öndeleme ile nişan alır', mine: true },
    { t: 'Komut geçidi', d: 'Güvenlik kontrolleri, atış izni', mine: true },
    { t: 'Seri haberleşme', d: '460800 baud ile karta komut gönderir', mine: true },
    { t: 'Pico 2 kartı (C++)', d: 'Motorları ve tetiği sürer', mine: true },
  ],
  github: 'https://github.com/lprnmns/target-tracking-engagement-system',
};

export const DEMO = {
  code: '"use strict"; x = let => 1;',
  control: 'x = let => 1;',
  rule: 'JavaScript’in katı modunda (“use strict”) “let” kelimesi değişken adı olarak kullanılamaz. Yani bu satır hata vermeli.',
  pr: 'https://github.com/meriyah/meriyah/pull/671',
  release: 'https://github.com/meriyah/meriyah/releases/tag/v7.4.1',
  howFound: 'Rastgele JavaScript ifadeleri üreten bir program yazdım. Her ifadeyi hem meriyah’a hem acorn’a verip sonuçlarını karşılaştırdım. İkisinin anlaşamadığı yerler hata adayıydı; her adayı spesifikasyondan kontrol ettim.',
};
