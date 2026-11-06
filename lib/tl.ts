// Ana sayfa içeriği (tasarım: Masaüstü-html). Metinler tasarımdan birebir; sayılar canlı veriden gelir.
export type Lang = 'tr' | 'en';

export const IMG = {
  t: '/img/d-teknofest.webp',
  tPanel: '/img/d-teknofest-taret.webp',
  m: '/img/d-monad.webp',
  k: '/img/d-klinik.webp',
  z: '/img/d-zenith.webp',
  bgts: '/img/logo-bgts.webp',
  ptt: '/img/logo-ptt.webp',
};

export const LINKS = {
  cv: '/cv/alperen-manas-cv.pdf',
  github: 'https://github.com/lprnmns',
  linkedin: 'https://www.linkedin.com/in/alperen-manas-a92aa2378/',
  mail: 'mailto:manasalperen@gmail.com',
  email: 'manasalperen@gmail.com',
  allPrs: 'https://github.com/search?q=author%3Alprnmns+is%3Apr+is%3Amerged+-user%3Alprnmns&type=pullrequests',
};

const pr = (r: string, n: number) => `https://github.com/${r}/pull/${n}`;

export type Fact = { k: string; v: string };
export type Item = {
  id: string;
  big?: boolean;
  demo?: boolean;
  isPr?: boolean;
  month?: string; // YYYY-MM, PR'ın ait olduğu ay grubu
  group?: 'next' | '2025';
  date: string;
  tag: string;
  title: string;
  short?: string;
  img?: string;
  alt?: string;
  desc: string;
  facts?: Fact[];
  bullets?: string[];
  orig?: string;
  href?: string;
  linkText?: string;
};

type Txt = {
  htmlLang: string;
  top: string;
  nav: { cv: string; github: string; linkedin: string; email: string };
  lang: { label: string; href: string };
  nameAria: string;
  seek: string;
  roles: string;
  btnCv: string;
  btnMail: string;
  paperA: string; // {repos} {total}
  paperMark: string;
  paperB: string;
  strip: { id: string; t: string; d: string; img?: string; dual?: boolean }[];
  monthNames: string[];
  monthLabel: string; // {m} {y} {n}
  firstLabel: string; // {m} {y}
  more: string; // {n}
  seeAll: string; // {n}
  tabs: string[];
  back: string;
  demo: { run: string; running: string; ref: string; before: string; after: string; accepted: string; rejected: string; wrongAccept: string; rightReject: string; code: string; control: string; tryControl: string; tryBug: string };
  footer: string; // {date}
  timelineAria: string;
  panelAria: string;
  items: Item[];
};

const TR: Txt = {
  htmlLang: 'tr',
  top: 'Bilgisayar Mühendisliği 4. sınıf · Kırıkkale Üniversitesi · GNO 3.21 · Mezuniyet 2027',
  nav: { cv: 'CV', github: 'GitHub', linkedin: 'LinkedIn', email: 'E-posta' },
  lang: { label: 'EN', href: '/en?lang=en' },
  nameAria: 'Alperen Manas. Animasyonu yeniden oynatmak için tıklayın.',
  seek: '8 Şubat 2027’den itibaren 14 hafta, tam zamanlı İME stajı arıyorum.',
  roles: 'Backend · Full-stack · Yapay Zekâ / LLM · Taşınmaya açığım',
  btnCv: 'CV’yi aç',
  btnMail: 'E-posta gönder',
  paperA: 'Aralarında Vite, Node.js undici ve three.js’in de bulunduğu, dünya çapında kullanılan ',
  paperMark: '{repos} projeye {total} kod katkım kabul edildi.',
  paperB: 'Yapay zekâ destekli denetimle hata adayı buluyorum, resmî referansla doğruluyorum, düzeltmeyi hatayı kanıtlayan bir testle gönderiyorum.',
  strip: [
    { id: 'teknofest', img: IMG.t, t: 'TEKNOFEST 2026 finalisti', d: 'En İyi Sistem Tasarımı · 11/12 isabet' },
    { id: 'monad', img: IMG.m, t: 'Hackathon birinciliği', d: 'Monad Blitz, 2025' },
    { id: 'klinik', img: IMG.k, t: '2 canlı ürün', d: 'Klinik Akış AI · Zenith Trader (100+)' },
    { id: 'bgts', dual: true, t: 'Deneyim', d: 'BGTS · Yapay zekâ stajı\nPTT · DevOps stajı' },
  ],
  monthNames: ['OCAK', 'ŞUBAT', 'MART', 'NİSAN', 'MAYIS', 'HAZİRAN', 'TEMMUZ', 'AĞUSTOS', 'EYLÜL', 'EKİM', 'KASIM', 'ARALIK'],
  monthLabel: '{m} {y} · {n} KABUL EDİLEN KATKI',
  firstLabel: '{m} {y} · İLK KABUL EDİLEN KATKILAR',
  more: '{n} katkı daha',
  seeAll: '{n} katkının tamamını GitHub’da gör',
  tabs: ['TEKNOFEST 2026', 'Monad Blitz 2025'],
  back: 'Ödüllere dön',
  demo: {
    run: 'Çalıştır', running: 'Çalışıyor…', ref: 'acorn (referans)', before: 'meriyah 7.4.0 (önce)', after: 'meriyah 7.4.1 (sonra)',
    accepted: 'Kabul etti', rejected: 'SyntaxError', wrongAccept: 'Kabul etti: hata', rightReject: 'SyntaxError: doğru',
    code: '"use strict"; x = let => 1;', control: 'x = let => 1;', tryControl: 'Geçerli satırla dene', tryBug: 'Hatalı satıra dön',
  },
  footer: 'Katkı verisi: GitHub · son güncelleme {date}',
  timelineAria: 'Zaman çizelgesi',
  panelAria: 'Kanıt paneli',
  items: [
    { id: 'ime', big: true, group: 'next', date: '8 Şub 2027', tag: 'Sıradaki', title: 'İME stajı: ekibinizde 14 hafta', short: 'Backend, full-stack veya yapay zekâ/LLM. Şehir fark etmez.', desc: '8 Şubat 2027’den itibaren 14 hafta, tam zamanlı. Üretimde çalışan bir sistemde sorumluluk alabileceğim bir ekip arıyorum.', facts: [{ k: 'Başlangıç', v: '8 Şubat 2027' }, { k: 'Süre', v: '14 hafta, tam zamanlı' }], href: LINKS.mail, linkText: 'E-posta gönder' },
    { id: 'klinik', big: true, group: 'next', date: 'Canlıda', tag: 'Ürün', title: 'Klinik Akış AI', short: 'WhatsApp üzerinden çalışan yapay zekâ randevu asistanı.', img: IMG.k, alt: 'Klinik Akış AI: WhatsApp konuşması ve klinik paneli', desc: 'WhatsApp’tan gelen randevu taleplerini yorumlayan, canlı uygunluğu kontrol eden, onay alıp ortak takvime yazan asistan.', bullets: ['Belirsiz veya hassas mesajları personele devreder', 'Python, TypeScript, LLM API’leri, WhatsApp entegrasyonu'], href: 'https://klinikakis.com', linkText: 'klinikakis.com' },
    { id: 'zenith', big: true, group: 'next', date: 'Canlıda', tag: 'Ürün · 100+ kullanıcı', title: 'Zenith Trader', short: 'Canlı copy-trading platformu, uçtan uca geliştirildi.', img: IMG.z, alt: 'Zenith Trader giriş ekranı', desc: 'OKX’teki büyük cüzdan hareketlerini izleyip kullanıcı hesaplarında işlem kopyalamaya çeviren ürün.', facts: [{ k: 'Kullanıcı', v: '100+' }, { k: 'Yığın', v: 'Next.js, Node.js' }], href: 'https://zenithtrader.alperenmanas.app', linkText: 'Canlı ürünü aç' },

    { id: 'mj1002', isPr: true, month: '2026-11', date: '5 Kas', tag: 'minijinja · Flask’ın yaratıcısının şablon motoru', title: 'Listeyi tersten dilimlerken program çöküyor ya da yanlış sonuç veriyordu.', desc: 'Negatif adımlı dilimleme hem panic üretebiliyor hem yanlış öğeler döndürüyordu. Düzeltme, hatayı kanıtlayan testle kabul edildi.', facts: [{ k: 'Bu projedeki katkı', v: '{mj} merge' }, { k: 'Dil', v: 'Rust' }], orig: 'Fix slicing with a negative step panicking and returning wrong items', href: pr('mitsuhiko/minijinja', 1002), linkText: 'PR #1002’yi aç' },
    { id: 'mer689', isPr: true, month: '2026-11', date: '2 Kas', tag: 'meriyah · ayda ~40 milyon npm indirmesi', title: '“[a]++” gibi dile aykırı ifadeleri kabul ediyordu. Artık reddediyor.', desc: 'JavaScript parser’ı, spesifikasyona göre geçersiz olan bir ifadeyi geçerli sayıyordu.', facts: [{ k: 'Bu projedeki katkı', v: '{mer} merge' }, { k: 'Yıldız', v: '★ 1.2k' }], orig: 'fix(parser): reject `++` and `--` on array and object literals', href: pr('meriyah/meriyah', 689), linkText: 'PR #689’u aç' },
    { id: 'sk', isPr: true, month: '2026-11', date: '2 Kas', tag: 'Microsoft Semantic Kernel', title: 'Yapay zekânın çağırdığı fonksiyon boş sonuç döndürünce kütüphane çöküyordu.', desc: 'Microsoft’un yapay zekâ ajan kütüphanesinin Python tarafında, boş fonksiyon sonucu olan mesajlar doğru işleniyor.', facts: [{ k: 'Yıldız', v: '★ 29k' }, { k: 'Alan', v: 'Yapay zekâ / LLM' }], orig: 'Python: Handle empty chat message function results', href: pr('microsoft/semantic-kernel', 14375), linkText: 'PR #14375’i aç' },

    { id: 'vite', isPr: true, month: '2026-10', date: '26 Eki', tag: 'Vite', title: 'Adresinde “?” veya “#” olan dosyalarda otomatik yeniden derleme çalışmıyordu.', desc: 'new URL(..., import.meta.url) ile başvurulan bu dosyalar artık izleniyor.', facts: [{ k: 'Yıldız', v: '★ 84k' }, { k: 'Alan', v: 'Geliştirici aracı' }], orig: 'fix: watch files that have a query or hash referenced with `new URL(..., import.meta.url)`', href: pr('vitejs/vite', 23780), linkText: 'PR #23780’i aç' },
    { id: 'mer671', isPr: true, demo: true, month: '2026-10', date: '25 Eki', tag: 'meriyah · tarayıcıda kendiniz çalıştırın', title: 'Katı modda yasak olan “let => 1” ifadesini kabul ediyordu.', desc: 'Aynı satırı başka bir parser’la (acorn) ve kendi düzeltmemin öncesi/sonrasıyla karşılaştırın.', orig: 'fix(parser): reject `let` as an arrow parameter in strict mode code', href: pr('meriyah/meriyah', 671), linkText: 'PR #671’i aç' },
    { id: 'sic', big: true, month: '2026-10', date: 'Eki 2026', tag: 'Eğitim', title: 'Samsung Innovation Campus', short: 'Yapay zekâ programından mezun oldum.', desc: 'Samsung ve UNDP iş birliğindeki programda makine öğrenmesi, NLP, derin öğrenme ve LLM.', facts: [{ k: 'Sertifika', v: 'Huawei HCIA-AI V3.5' }] },
    { id: 'undici', isPr: true, month: '2026-10', date: '19 Eki', tag: 'Node.js undici', title: 'Test isteklerinde adresteki tek “/” yüzünden eşleşme başarısız oluyordu.', desc: 'Sahte isteklerde sorgu dizgesinden önceki sondaki eğik çizgi artık yok sayılıyor.', facts: [{ k: 'Yıldız', v: '★ 7.7k' }, { k: 'Alan', v: 'Node.js HTTP istemcisi' }], orig: 'fix(mock): ignore the trailing slash before a query string', href: pr('nodejs/undici', 6031), linkText: 'PR #6031’i aç' },

    { id: 'teknofest', big: true, month: '2026-09', date: 'Eyl 2026', tag: 'Ödül · Takımla', title: 'TEKNOFEST 2026 finalisti, En İyi Sistem Tasarımı', short: 'Hava Savunma Sistemleri finalinde 12 hedeften 11’ini vurduk.', img: IMG.tPanel, alt: 'Alperen Manas, İSTİKLAL tareti ile TEKNOFEST atış alanında', desc: 'Görüntü işleme dışındaki yazılımı üstlendim. Kontrolcüleri log-replay ve Monte Carlo simülatörüyle karşılaştırdım.', facts: [{ k: 'Final', v: '11/12 isabet' }, { k: 'Hareketli hedef', v: '7/8 isabet' }], bullets: ['Takip ve atış kontrolü, seri haberleşme', 'Backend, operatör konsolu, entegrasyon', 'Python, FastAPI, Kalman/PID, C++, Vue 3, Three.js'] },
    { id: 'bgts', big: true, month: '2026-09', date: 'Tem–Eyl 2026', tag: 'Staj · BGTS (BilgeAdam)', title: 'Yapay zekâ mühendisliği stajı', short: 'Yerel çalışan RAG servisi: hibrit arama, kaynak gösteren yanıtlar.', desc: 'Vektör ve BM25 hibrit arama, kaynak gösteren yanıtlar, cevaplanamayan sorular için LLM’siz akış.', facts: [{ k: 'Recall@5 (44 vaka)', v: '0.92' }, { k: 'p95 gecikme', v: '43 ms' }, { k: 'Test', v: '239' }, { k: 'Yığın', v: 'FastAPI, Qdrant, Ollama' }], href: 'https://github.com/lprnmns/document-intelligence', linkText: 'Kaynak kodu aç' },
    { id: 'katex', isPr: true, month: '2026-09', date: '23 Eyl', tag: 'KaTeX', title: 'Hizalanmış denklemlerde sondaki satırlar kayboluyordu.', desc: 'align ortamında sondaki satırlar artık korunuyor.', orig: 'fix(array): preserve trailing rows in align', href: pr('KaTeX/KaTeX', 4283), linkText: 'PR #4283’ü aç' },
    { id: 'ce', isPr: true, month: '2026-09', date: '14 Eyl', tag: 'Compiler Explorer', title: 'Makine kodu ekranında bazı sayılar yanlışlıkla renk kutucuğu olarak görünüyordu.', desc: 'Assembly çıktısında renk süslemeleri kapatıldı.', facts: [{ k: 'Yıldız', v: '★ 19k' }], orig: 'fix(compiler): disable color decorators for assembly output', href: pr('compiler-explorer/compiler-explorer', 9105), linkText: 'PR #9105’i aç' },
    { id: 'three', isPr: true, month: '2026-09', date: '8 Eyl', tag: 'three.js', title: 'Büyük sayılarda “2’nin kuvveti” kontrolü yanlış sonuç veriyordu.', desc: 'MathUtils içindeki isPowerOfTwo düzeltildi.', facts: [{ k: 'Yıldız', v: '★ 118k' }], orig: 'MathUtils: Fix large isPowerOfTwo values', href: pr('mrdoob/three.js', 34459), linkText: 'PR #34459’u aç' },

    { id: 'monad', big: true, group: '2025', date: '2025', tag: 'Ödül', title: 'Monad Blitz hackathonu birinciliği', short: 'Ankara’daki blockchain hackathonunda ürünü geliştirip sundum.', img: IMG.m, alt: 'Alperen Manas, Monad Blitz birincilik panosuyla', desc: 'Hackathon boyunca ürün fikrini geliştirip sundum ve birinci oldum.', facts: [{ k: 'Sonuç', v: '1.' }, { k: 'Yer', v: 'Ankara' }] },
    { id: 'ptt', big: true, group: '2025', date: 'Ağu 2025', tag: 'Staj · PTT Genel Müdürlüğü', title: 'DevOps stajı', short: 'Docker, Linux, sanallaştırma ve deployment süreçleri.', desc: 'Kurumsal BT ortamında Docker/Linux, sanallaştırma ve deployment süreçleriyle çalıştım, projeleri container’a taşıdım.', facts: [{ k: 'Alan', v: 'DevOps' }] },
  ],
};

const EN: Txt = {
  htmlLang: 'en',
  top: 'Computer Engineering, final year · Kırıkkale University · GPA 3.21 · Graduating 2027',
  nav: { cv: 'CV', github: 'GitHub', linkedin: 'LinkedIn', email: 'Email' },
  lang: { label: 'TR', href: '/?lang=tr' },
  nameAria: 'Alperen Manas. Click to replay the animation.',
  seek: 'Looking for a full-time, 14-week internship from 8 February 2027.',
  roles: 'Backend · Full-stack · AI / LLM · Open to relocating',
  btnCv: 'Open CV',
  btnMail: 'Send email',
  paperA: 'In widely used open-source projects, including Vite, Node.js undici and three.js: ',
  paperMark: '{total} merged contributions in {repos} projects.',
  paperB: 'I find bug candidates with AI-assisted review, confirm them against an official reference, and send each fix with a test that proves the bug.',
  strip: [
    { id: 'teknofest', img: IMG.t, t: 'TEKNOFEST 2026 finalist', d: 'Best System Design · 11/12 hits' },
    { id: 'monad', img: IMG.m, t: 'Hackathon winner', d: 'Monad Blitz, 2025' },
    { id: 'klinik', img: IMG.k, t: '2 live products', d: 'Klinik Akış AI · Zenith Trader (100+)' },
    { id: 'bgts', dual: true, t: 'Experience', d: 'BGTS · AI internship\nPTT · DevOps internship' },
  ],
  monthNames: ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'],
  monthLabel: '{m} {y} · {n} MERGED CONTRIBUTIONS',
  firstLabel: '{m} {y} · FIRST MERGED CONTRIBUTIONS',
  more: '{n} more',
  seeAll: 'See all {n} contributions on GitHub',
  tabs: ['TEKNOFEST 2026', 'Monad Blitz 2025'],
  back: 'Back to awards',
  demo: {
    run: 'Run', running: 'Running…', ref: 'acorn (reference)', before: 'meriyah 7.4.0 (before)', after: 'meriyah 7.4.1 (after)',
    accepted: 'Accepted', rejected: 'SyntaxError', wrongAccept: 'Accepted: bug', rightReject: 'SyntaxError: correct',
    code: '"use strict"; x = let => 1;', control: 'x = let => 1;', tryControl: 'Try a valid line', tryBug: 'Back to the invalid line',
  },
  footer: 'Contribution data: GitHub · last updated {date}',
  timelineAria: 'Timeline',
  panelAria: 'Evidence panel',
  items: [
    { id: 'ime', big: true, group: 'next', date: '8 Feb 2027', tag: 'Next', title: 'Internship: 14 weeks on your team', short: 'Backend, full-stack or AI/LLM. Any city.', desc: 'Full-time for 14 weeks from 8 February 2027. I am looking for a team where I can own part of a system running in production.', facts: [{ k: 'Start', v: '8 February 2027' }, { k: 'Length', v: '14 weeks, full-time' }], href: LINKS.mail, linkText: 'Send email' },
    { id: 'klinik', big: true, group: 'next', date: 'Live', tag: 'Product', title: 'Klinik Akış AI', short: 'AI appointment assistant that works over WhatsApp.', img: IMG.k, alt: 'Klinik Akış AI: WhatsApp chat and clinic dashboard', desc: 'Understands appointment requests from WhatsApp, checks live availability, books after confirmation and writes to the shared calendar.', bullets: ['Hands unclear or sensitive messages to staff', 'Python, TypeScript, LLM APIs, WhatsApp integration'], href: 'https://klinikakis.com', linkText: 'klinikakis.com' },
    { id: 'zenith', big: true, group: 'next', date: 'Live', tag: 'Product · 100+ users', title: 'Zenith Trader', short: 'Live copy-trading platform, built end to end.', img: IMG.z, alt: 'Zenith Trader sign-in screen', desc: 'Watches large wallet moves on OKX and turns them into copied trades on users’ accounts.', facts: [{ k: 'Users', v: '100+' }, { k: 'Stack', v: 'Next.js, Node.js' }], href: 'https://zenithtrader.alperenmanas.app', linkText: 'Open live product' },

    { id: 'mj1002', isPr: true, month: '2026-11', date: '5 Nov', tag: 'minijinja · template engine by the creator of Flask', title: 'Slicing a list backwards crashed or returned the wrong items.', desc: 'Negative-step slicing could panic and return wrong items. The fix was merged with a test that proves the bug.', facts: [{ k: 'Merged in this project', v: '{mj}' }, { k: 'Language', v: 'Rust' }], orig: 'Fix slicing with a negative step panicking and returning wrong items', href: pr('mitsuhiko/minijinja', 1002), linkText: 'Open PR #1002' },
    { id: 'mer689', isPr: true, month: '2026-11', date: '2 Nov', tag: 'meriyah · ~40M npm downloads a month', title: 'It accepted invalid expressions like “[a]++”. Now it rejects them.', desc: 'The JavaScript parser treated an expression that the spec forbids as valid.', facts: [{ k: 'Merged in this project', v: '{mer}' }, { k: 'Stars', v: '★ 1.2k' }], orig: 'fix(parser): reject `++` and `--` on array and object literals', href: pr('meriyah/meriyah', 689), linkText: 'Open PR #689' },
    { id: 'sk', isPr: true, month: '2026-11', date: '2 Nov', tag: 'Microsoft Semantic Kernel', title: 'The library crashed when a function called by the AI returned an empty result.', desc: 'In the Python side of Microsoft’s AI agent SDK, messages with empty function results are now handled.', facts: [{ k: 'Stars', v: '★ 29k' }, { k: 'Area', v: 'AI / LLM' }], orig: 'Python: Handle empty chat message function results', href: pr('microsoft/semantic-kernel', 14375), linkText: 'Open PR #14375' },

    { id: 'vite', isPr: true, month: '2026-10', date: '26 Oct', tag: 'Vite', title: 'Automatic rebuilds did not work for files with “?” or “#” in their URL.', desc: 'Files referenced with new URL(..., import.meta.url) are now watched.', facts: [{ k: 'Stars', v: '★ 84k' }, { k: 'Area', v: 'Developer tooling' }], orig: 'fix: watch files that have a query or hash referenced with `new URL(..., import.meta.url)`', href: pr('vitejs/vite', 23780), linkText: 'Open PR #23780' },
    { id: 'mer671', isPr: true, demo: true, month: '2026-10', date: '25 Oct', tag: 'meriyah · run it yourself in the browser', title: 'It accepted “let => 1”, which strict mode forbids.', desc: 'Compare the same line in another parser (acorn) and in versions before and after my fix.', orig: 'fix(parser): reject `let` as an arrow parameter in strict mode code', href: pr('meriyah/meriyah', 671), linkText: 'Open PR #671' },
    { id: 'sic', big: true, month: '2026-10', date: 'Oct 2026', tag: 'Education', title: 'Samsung Innovation Campus', short: 'Graduated from the AI program.', desc: 'Machine learning, NLP, deep learning and LLMs in a Samsung × UNDP program.', facts: [{ k: 'Certificate', v: 'Huawei HCIA-AI V3.5' }] },
    { id: 'undici', isPr: true, month: '2026-10', date: '19 Oct', tag: 'Node.js undici', title: 'Mocked requests failed to match because of a single “/” in the URL.', desc: 'The trailing slash before a query string is now ignored in mocked requests.', facts: [{ k: 'Stars', v: '★ 7.7k' }, { k: 'Area', v: 'Node.js HTTP client' }], orig: 'fix(mock): ignore the trailing slash before a query string', href: pr('nodejs/undici', 6031), linkText: 'Open PR #6031' },

    { id: 'teknofest', big: true, month: '2026-09', date: 'Sep 2026', tag: 'Award · team', title: 'TEKNOFEST 2026 finalist, Best System Design', short: 'We hit 11 of 12 targets in the Air Defense Systems final.', img: IMG.tPanel, alt: 'Alperen Manas with the İSTİKLAL turret on the TEKNOFEST range', desc: 'I owned all software except computer vision. I compared controllers with log replay and a Monte Carlo simulator.', facts: [{ k: 'Final', v: '11/12 hits' }, { k: 'Moving targets', v: '7/8 hits' }], bullets: ['Tracking and fire control, serial communication', 'Backend, operator console, integration', 'Python, FastAPI, Kalman/PID, C++, Vue 3, Three.js'] },
    { id: 'bgts', big: true, month: '2026-09', date: 'Jul–Sep 2026', tag: 'Internship · BGTS (BilgeAdam)', title: 'AI engineering internship', short: 'Local RAG service: hybrid search, answers with sources.', desc: 'Hybrid vector + BM25 search, answers that cite sources, and a no-LLM path for questions it cannot answer.', facts: [{ k: 'Recall@5 (44 cases)', v: '0.92' }, { k: 'p95 latency', v: '43 ms' }, { k: 'Tests', v: '239' }, { k: 'Stack', v: 'FastAPI, Qdrant, Ollama' }], href: 'https://github.com/lprnmns/document-intelligence', linkText: 'Open source code' },
    { id: 'katex', isPr: true, month: '2026-09', date: '23 Sep', tag: 'KaTeX', title: 'Trailing rows disappeared in aligned equations.', desc: 'Trailing rows in the align environment are now kept.', orig: 'fix(array): preserve trailing rows in align', href: pr('KaTeX/KaTeX', 4283), linkText: 'Open PR #4283' },
    { id: 'ce', isPr: true, month: '2026-09', date: '14 Sep', tag: 'Compiler Explorer', title: 'Some numbers in the assembly view showed up as color swatches.', desc: 'Color decorators are now disabled for assembly output.', facts: [{ k: 'Stars', v: '★ 19k' }], orig: 'fix(compiler): disable color decorators for assembly output', href: pr('compiler-explorer/compiler-explorer', 9105), linkText: 'Open PR #9105' },
    { id: 'three', isPr: true, month: '2026-09', date: '8 Sep', tag: 'three.js', title: 'The “power of two” check was wrong for large numbers.', desc: 'Fixed isPowerOfTwo in MathUtils.', facts: [{ k: 'Stars', v: '★ 118k' }], orig: 'MathUtils: Fix large isPowerOfTwo values', href: pr('mrdoob/three.js', 34459), linkText: 'Open PR #34459' },

    { id: 'monad', big: true, group: '2025', date: '2025', tag: 'Award', title: 'Monad Blitz hackathon, 1st place', short: 'Built and pitched a product at the blockchain hackathon in Ankara.', img: IMG.m, alt: 'Alperen Manas with the Monad Blitz first-place board', desc: 'I developed and pitched a product idea during the hackathon and took first place.', facts: [{ k: 'Result', v: '1st' }, { k: 'Where', v: 'Ankara' }] },
    { id: 'ptt', big: true, group: '2025', date: 'Aug 2025', tag: 'Internship · PTT (Turkish Post)', title: 'DevOps internship', short: 'Docker, Linux, virtualization and deployment.', desc: 'Worked with Docker/Linux, virtualization and deployment in an enterprise IT environment; moved projects into containers.', facts: [{ k: 'Area', v: 'DevOps' }] },
  ],
};

export const TEXT: Record<Lang, Txt> = { tr: TR, en: EN };
