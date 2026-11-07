// Ana sayfa içeriği (tasarım: Masaüstü-html). Metinler tasarımdan birebir; sayılar canlı veriden gelir.
export type Lang = 'tr' | 'en';

export const IMG = {
  t: '/img/d-teknofest.webp',
  tPanel: '/img/d-teknofest-taret.webp',
  tPair: '/img/d-teknofest-ikili.webp',
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
  wa: 'https://wa.me/905075086027',
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
  panelImg?: string; // panelde/ayrıntıda kullanılan daha büyük görsel
  alt?: string;
  desc: string;
  facts?: Fact[];
  bullets?: string[];
  orig?: string;
  by?: string; // kodu kabul eden (PR sayfasından doğrulandı)
  how?: Fact[]; // derin vaka: sorun, nasıl bulundu, düzeltme, test
  howTitle?: string; // derin vaka başlığı (varsayılan: hatayı nasıl buldum)
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
  seekSub: string;
  roles: string;
  hint: string;
  cta: { title: string; text: string; mail: string };
  btnCv: string;
  btnMail: string;
  paperA: string; // {repos} {total}
  paperMark: string;
  paperB: string;
  strip: { id: string; t: string; d: string; img?: string; dual?: boolean; rows?: { img: string; t: string; d: string }[] }[];
  btnGh: string;
  btnLi: string;
  btnWa: string;
  waText: string;
  monthNames: string[];
  monthLabel: string; // {m} {y} {n}
  firstLabel: string; // {m} {y}
  more: string; // {n}
  seeAll: string; // {n}
  tabs: string[];
  back: string;
  howT: string;
  demo: { run: string; running: string; ref: string; before: string; after: string; accepted: string; rejected: string; wrongAccept: string; rightReject: string; code: string; control: string; tryControl: string; tryBug: string };
  footer: string; // {date}
  timelineAria: string;
  panelAria: string;
  m: {
    top: string;
    paperA: string;
    paperB: string;
    highlights: string;
    swipe: string;
    cards: { id: string; tag: string; t: string; d: string; logo?: 'bgts' | 'ptt' }[];
    oss: string;
    stats: { v: string; l: string; s?: string }[];
    testTag: string;
    byLabel: string;
    monthShort: string[];
    fixes: string;
    demoBadge: string;
    showMore: string;
    exp: string;
    close: string;
    contact: string;
  };
  items: Item[];
};

const TR: Txt = {
  htmlLang: 'tr',
  top: 'Bilgisayar Mühendisliği 4. sınıf · Kırıkkale Üniversitesi · GNO 3.21 · Mezuniyet 2027',
  nav: { cv: 'CV', github: 'GitHub', linkedin: 'LinkedIn', email: 'E-posta' },
  lang: { label: 'EN', href: '/en?lang=en' },
  nameAria: 'Alperen Manas. Animasyonu yeniden oynatmak için tıklayın.',
  seek: 'Tam zamanlı, uzun dönem staj arıyorum.',
  seekSub: '8 Şubat 2027’den itibaren 14 hafta staj sigortam üniversitem tarafından karşılanıyor. Şirket sigorta sağlayabiliyorsa daha erken başlayabilirim.',
  roles: 'Backend · Full-stack · Yapay Zekâ / LLM · Şehir fark etmez',
  hint: 'Bir satıra tıkla → kanıtı sağdaki panelde incele',
  cta: { title: 'Ekibinizde uzun dönem staj yapmak istiyorum.', text: 'Üniversite sigortasıyla 8 Şubat 2027’den itibaren 14 hafta; şirket sigortasıyla daha erken. Şehir fark etmez.', mail: 'E-posta gönder' },
  btnCv: 'CV’yi aç',
  btnMail: 'E-posta gönder',
  btnGh: 'GitHub',
  btnLi: 'LinkedIn',
  btnWa: 'WhatsApp',
  waText: 'Merhaba Alperen, sitenden ulaşıyorum.',
  paperA: 'Aralarında Microsoft Semantic Kernel, Vite, Node.js undici ve three.js’in de bulunduğu, dünya çapında kullanılan ',
  paperMark: '{repos} projeye {total} kod katkım kabul edildi.',
  paperB: 'Yapay zekâ destekli denetimle hata adayı buluyorum, resmî referansla doğruluyorum, düzeltmeyi hatayı kanıtlayan bir testle gönderiyorum.',
  strip: [
    { id: 'teknofest', img: IMG.t, t: 'TEKNOFEST 2026 finalisti', d: 'En İyi Sistem Tasarımı Ödülü' },
    { id: 'monad', img: IMG.m, t: 'Hackathon birinciliği', d: 'Monad Blitz, 2025' },
    { id: 'klinik', img: IMG.k, t: '2 canlı ürün', d: 'Klinik Akış AI · Zenith Trader (100+)' },
    { id: 'bgts', dual: true, t: 'Deneyim', d: '', rows: [{ img: IMG.bgts, t: 'BGTS (BilgeAdam)', d: 'Yapay zekâ stajı' }, { img: IMG.ptt, t: 'PTT Genel Müdürlüğü', d: 'DevOps stajı' }] },
  ],
  monthNames: ['OCAK', 'ŞUBAT', 'MART', 'NİSAN', 'MAYIS', 'HAZİRAN', 'TEMMUZ', 'AĞUSTOS', 'EYLÜL', 'EKİM', 'KASIM', 'ARALIK'],
  monthLabel: '{m} {y} · {n} KABUL EDİLEN KATKI',
  firstLabel: '{m} {y} · İLK KABUL EDİLEN KATKILAR',
  more: '{n} katkı daha',
  seeAll: '{n} katkının tamamını GitHub’da gör',
  tabs: ['TEKNOFEST 2026', 'Monad Blitz 2025'],
  back: 'Ödüllere dön',
  howT: 'Bu hatayı nasıl buldum?',
  demo: {
    run: 'Çalıştır', running: 'Çalışıyor…', ref: 'acorn (referans)', before: 'meriyah 7.4.0 (önce)', after: 'meriyah 7.4.1 (sonra)',
    accepted: 'Kabul etti', rejected: 'SyntaxError', wrongAccept: 'Kabul etti: hata', rightReject: 'SyntaxError: doğru',
    code: '"use strict"; x = let => 1;', control: 'x = let => 1;', tryControl: 'Geçerli satırla dene', tryBug: 'Hatalı satıra dön',
  },
  footer: 'Katkı verisi: GitHub · son güncelleme {date}',
  timelineAria: 'Zaman çizelgesi',
  panelAria: 'Kanıt paneli',
  m: {
    top: 'Bilg. Müh. 4. sınıf · Kırıkkale Üni. · GNO 3.21 · Mezuniyet 2027',
    paperA: 'Microsoft Semantic Kernel, Vite, Node.js undici ve three.js dahil, dünya çapında kullanılan ',
    paperB: 'Hata adayını yapay zekâ destekli denetimle buluyor, resmî referansla doğruluyor, testle kanıtlayıp düzeltiyorum.',
    highlights: 'ÖNE ÇIKANLAR',
    swipe: 'kaydır →',
    cards: [
      { id: 'teknofest', tag: 'ÖDÜL · TAKIMLA', t: 'En İyi Sistem Tasarımı Ödülü', d: 'TEKNOFEST 2026 · Hava Savunma Sistemleri finali · 12 hedefte 11 isabet' },
      { id: 'monad', tag: 'ÖDÜL', t: 'Hackathon birinciliği', d: 'Monad Blitz 2025 · Ankara · blockchain ürünü' },
      { id: 'klinik', tag: 'CANLI ÜRÜN', t: 'Klinik Akış AI', d: 'WhatsApp’ta yapay zekâ randevu asistanı' },
      { id: 'zenith', tag: 'CANLI · 100+ KULLANICI', t: 'Zenith Trader', d: 'Copy-trading platformu' },
      { id: 'bgts', tag: 'STAJ · 2026', t: 'BGTS (BilgeAdam)', d: 'Yapay zekâ · RAG · 239 test', logo: 'bgts' },
      { id: 'ptt', tag: 'STAJ · 2025', t: 'PTT Genel Müdürlüğü', d: 'DevOps · Docker, Linux', logo: 'ptt' },
    ],
    oss: 'AÇIK KAYNAK · KABUL EDİLEN KATKILAR',
    stats: [{ v: '{total}', l: 'kabul edilen PR' }, { v: '{repos}', l: 'açık kaynak proje' }, { v: '{mer}', l: 'meriyah’ta kabul edilen PR', s: 'ayda 43M indirme' }, { v: '{mj}', l: 'minijinja’da kabul edilen PR', s: 'Flask’ın yaratıcısının projesi' }],
    testTag: '✓ test eklendi',
    byLabel: 'Kabul eden',
    monthShort: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
    fixes: 'SEÇİLMİŞ DÜZELTMELER · DOKUN, KANITI AÇ',
    demoBadge: 'CANLI DEMO',
    showMore: '{n} düzeltme daha göster',
    exp: 'DENEYİM VE EĞİTİM',
    close: 'Kapat',
    contact: 'İletişim',
  },
  items: [
    { id: 'ime', big: true, group: 'next', date: 'Müsait', tag: 'Sıradaki', title: 'Uzun dönem staj: ekibinizde', short: 'Tam zamanlı · Backend, full-stack veya yapay zekâ/LLM · Şehir fark etmez.', desc: 'Üretimde çalışan bir sistemde sorumluluk alabileceğim bir ekip arıyorum.', facts: [{ k: 'Üniversite sigortasıyla', v: '8 Şubat 2027’den itibaren 14 hafta' }, { k: 'Şirket sigortasıyla', v: 'Daha erken başlayabilirim' }], bullets: ['Okuldaki resmî adı: İşletmede Mesleki Eğitim (evrak işlemleri için)'], href: LINKS.mail, linkText: 'E-posta gönder' },
    { id: 'klinik', big: true, group: 'next', date: 'Canlıda', tag: 'Ürün', title: 'Klinik Akış AI', short: 'WhatsApp üzerinden çalışan yapay zekâ randevu asistanı.', img: IMG.k, alt: 'Klinik Akış AI: WhatsApp konuşması ve klinik paneli', desc: 'WhatsApp’tan gelen randevu taleplerini yorumlayan, canlı uygunluğu kontrol eden, onay alıp ortak takvime yazan asistan.', bullets: ['Belirsiz veya hassas mesajları personele devreder', 'Python, TypeScript, LLM API’leri, WhatsApp entegrasyonu'], howTitle: 'Arka planda nasıl çalışıyor?', how: [{ k: 'Sorun', v: 'Klinikler mesai dışında gelen WhatsApp randevu taleplerini kaçırıyor. Aynı saate iki hastanın aynı anda yazması ya da WhatsApp’ın aynı mesajı tekrar iletmesi çift randevu üretebilir.' }, { k: 'Çift randevu', v: 'Hasta onaylayana kadar saat 10 dakika tutuluyor. Aynı hekime çakışan iki tutma ya da onaylı randevu, PostgreSQL çakışma kısıtıyla (exclude using gist + tstzrange) doğrudan veritabanında reddediliyor; eşzamanlı istekler uygulama koduna bırakılmıyor.' }, { k: 'Tekrar eden mesajlar', v: 'Gelen her WhatsApp mesajı sağlayıcının mesaj kimliğiyle tekil; aynı bildirim tekrar gelse de bir kez işleniyor. Giden mesajlar yineleme anahtarıyla bir kez gönderiliyor.' }, { k: 'İnsana devir', v: 'Asistan tıbbi değerlendirme yapmıyor. Hasta isterse ya da mesaj belirsiz veya hassassa konuşmayı gerekçesiyle birlikte klinik personeline devrediyor.' }, { k: 'Veri ve test', v: 'Hasta notları şifreli saklanıyor, her kliniğin verisi ayrı. Sistemi 256 test dosyası (birim, entegrasyon ve uçtan uca) koruyor.' }], href: 'https://klinikakis.com', linkText: 'klinikakis.com' },
    { id: 'zenith', big: true, group: 'next', date: 'Canlıda', tag: 'Ürün · 100+ kullanıcı', title: 'Zenith Trader', short: 'Canlı copy-trading platformu, uçtan uca geliştirildi.', img: IMG.z, alt: 'Zenith Trader giriş ekranı', desc: 'OKX’teki büyük cüzdan hareketlerini izleyip kullanıcı hesaplarında işlem kopyalamaya çeviren ürün.', facts: [{ k: 'Kullanıcı', v: '100+' }, { k: 'Yığın', v: 'Next.js, Node.js' }], href: 'https://zenithtrader.alperenmanas.app', linkText: 'Canlı ürünü aç' },

    { id: 'mj1002', by: 'Armin Ronacher, Flask’ın yaratıcısı', isPr: true, month: '2026-11', date: '5 Kas', tag: 'minijinja · Flask’ın yaratıcısının şablon motoru', title: 'Listeyi tersten dilimlerken program çöküyor ya da yanlış sonuç veriyordu.', desc: 'Negatif adımlı dilimleme hem panic üretebiliyor hem yanlış öğeler döndürüyordu. Düzeltme, hatayı kanıtlayan testle kabul edildi.', facts: [{ k: 'Bu projedeki katkı', v: '{mj} merge' }, { k: 'Dil', v: 'Rust' }], how: [{ k: 'Sorun', v: '“[][::-1]” çöküyordu; “[1, 2, 3][:0:-1]” [3, 2] yerine [3, 2, 1], “[1, 2, 3][-100::-1]” [] yerine [1] dönüyordu.' }, { k: 'Nasıl buldum', v: 'Sonuçları Python’un dilimlemesiyle karşılaştırdım: 0, 1, 2 ve 5 elemanlı listelerde tüm başlangıç/bitiş/adım kombinasyonları, toplam 4.732 durum.' }, { k: 'Düzeltme', v: 'Geriye adımlı dilimleme başlangıç ve bitişi Python gibi sınırlıyor; pozitif adımlar değişmedi. Düzeltmeden sonra 4.732 durumun hepsi Python ile aynı.' }, { k: 'Kanıt testi', v: 'slicing.txt dosyasına yeni durumlar; düzeltme olmadan test_vm çöküyor.' }], orig: 'Fix slicing with a negative step panicking and returning wrong items', href: pr('mitsuhiko/minijinja', 1002), linkText: 'PR #1002’yi aç' },
    { id: 'mer689', by: 'Chunpeng Huo, meriyah bakımcısı', isPr: true, month: '2026-11', date: '2 Kas', tag: 'meriyah · ayda ~43 milyon npm indirmesi', title: '“[a]++” gibi dile aykırı ifadeleri kabul ediyordu. Artık reddediyor.', desc: 'JavaScript parser’ı, spesifikasyona göre geçersiz olan bir ifadeyi geçerli sayıyordu.', facts: [{ k: 'Bu projedeki katkı', v: '{mer} merge' }, { k: 'Yıldız', v: '★ 1.2k' }], orig: 'fix(parser): reject `++` and `--` on array and object literals', href: pr('meriyah/meriyah', 689), linkText: 'PR #689’u aç' },
    { id: 'sk', by: 'Eduard van Valkenburg, Semantic Kernel ekibi', isPr: true, month: '2026-11', date: '2 Kas', tag: 'Microsoft Semantic Kernel', title: 'Yapay zekânın çağırdığı fonksiyon boş sonuç döndürünce kütüphane çöküyordu.', desc: 'Microsoft’un yapay zekâ ajan kütüphanesinin Python tarafında, boş fonksiyon sonucu olan mesajlar doğru işleniyor.', facts: [{ k: 'Yıldız', v: '★ 29k' }, { k: 'Alan', v: 'Yapay zekâ / LLM' }], how: [{ k: 'Sorun', v: 'Bir araç geçerli ama boş bir mesaj döndürünce FunctionResultContent, mesajı metne çevirmeden önce result.items[0] okuduğu için IndexError veriyordu.' }, { k: 'Nasıl buldum', v: 'Aynı alandaki önceki düzeltmelerin (#14359, #14364) bu yolu kapsamadığını gösterdim ve hatayı testle yeniden ürettim.' }, { k: 'Düzeltme', v: 'Hemen üzerine yazılan gereksiz öğe okumasını kaldırdım. Boş mesaj artık boş sonuç; dolu mesajlarda davranış ve genel API aynı.' }, { k: 'Kanıt testi', v: 'Boş sonuç ve korunan iç içerik için odaklı regresyon testi; ilgili test paketleri geçti.' }], orig: 'Python: Handle empty chat message function results', href: pr('microsoft/semantic-kernel', 14375), linkText: 'PR #14375’i aç' },

    { id: 'vite', by: 'sapphi-red, Vite çekirdek ekibi', isPr: true, month: '2026-10', date: '26 Eki', tag: 'Vite', title: 'Adresinde “?” veya “#” olan dosyalarda otomatik yeniden derleme çalışmıyordu.', desc: 'new URL(..., import.meta.url) ile başvurulan bu dosyalar artık izleniyor.', facts: [{ k: 'Yıldız', v: '★ 84k' }, { k: 'Alan', v: 'Geliştirici aracı' }], how: [{ k: 'Sorun', v: 'new URL(\'./file?inline\', import.meta.url) ile kullanılan dosya değişince “vite build --watch” yeniden derlemiyordu: adresteki sorgu yüzünden dosya bulunamıyor, izlemeye eklenmiyordu.' }, { k: 'Nasıl buldum', v: 'Açık bir hata kaydından yola çıktım; küçük bir projede önce/sonra davranışını elle doğruladım. Hatayı yeniden üretmek ve testi taslaklamak için AI asistanı kullandım, bunu PR’da belirttim.' }, { k: 'Düzeltme', v: 'Dosya kontrolünden ve izlemeye eklemeden önce sorgu/hash’i cleanUrl ile temizledim; üretilen çıktı değişmiyor. Çözümü öneren kişiyi ortak yazar olarak ekledim.' }, { k: 'Kanıt testi', v: 'assetImportMetaUrl.spec.ts içinde iki test; sorgu/hash durumu düzeltme olmadan başarısız.' }], orig: 'fix: watch files that have a query or hash referenced with `new URL(..., import.meta.url)`', href: pr('vitejs/vite', 23780), linkText: 'PR #23780’i aç' },
    { id: 'mer671', by: 'Chunpeng Huo, meriyah bakımcısı', isPr: true, demo: true, month: '2026-10', date: '25 Eki', tag: 'meriyah · tarayıcıda kendiniz çalıştırın', title: 'Katı modda yasak olan “let => 1” ifadesini kabul ediyordu.', desc: 'Aynı satırı başka bir parser’la (acorn) ve kendi düzeltmemin öncesi/sonrasıyla karşılaştırın.', how: [{ k: 'Sorun', v: 'Katı modda “let” değişken adı olamaz (ECMAScript §13.1.1). meriyah bunu yalnızca satır başında yakalıyor; “x = let => 1”, “f(let => 1)” gibi konumlarda kabul ediyordu.' }, { k: 'Nasıl buldum', v: 'Rastgele JavaScript ifadeleri üretip meriyah ile acorn’un çıktılarını ve hatalarını karşılaştırdım; acorn dört örneği de reddediyordu. Hangisinin haklı olduğunu spesifikasyondan doğruladım.' }, { k: 'Düzeltme', v: '“let” belirteci bağlamsal anahtar kelime bayrağı taşıdığı için kimlik kontrolünden geçiyordu. Paylaşılan fonksiyonu bozmamak için kontrolü yalnızca ok fonksiyonu yollarındaki classifyIdentifier()’a ekledim.' }, { k: 'Kanıt testi', v: '5 yeni hata testi; düzeltme olmadan hepsi başarısız. 92.026 testlik paketin tamamı geçti.' }], orig: 'fix(parser): reject `let` as an arrow parameter in strict mode code', href: pr('meriyah/meriyah', 671), linkText: 'PR #671’i aç' },
    { id: 'sic', big: true, month: '2026-10', date: 'Eki 2026', tag: 'Eğitim', title: 'Samsung Innovation Campus', short: 'Yapay zekâ programından mezun oldum.', desc: 'Samsung ve UNDP iş birliğindeki programda makine öğrenmesi, NLP, derin öğrenme ve LLM.', facts: [{ k: 'Sertifika', v: 'Huawei HCIA-AI V3.5' }] },
    { id: 'undici', by: 'Matteo Collina, Node.js teknik komitesi', isPr: true, month: '2026-10', date: '19 Eki', tag: 'Node.js undici', title: 'Test isteklerinde adresteki tek “/” yüzünden eşleşme başarısız oluyordu.', desc: 'Sahte isteklerde sorgu dizgesinden önceki sondaki eğik çizgi artık yok sayılıyor.', facts: [{ k: 'Yıldız', v: '★ 7.7k' }, { k: 'Alan', v: 'Node.js HTTP istemcisi' }], orig: 'fix(mock): ignore the trailing slash before a query string', href: pr('nodejs/undici', 6031), linkText: 'PR #6031’i aç' },

    { id: 'teknofest', big: true, month: '2026-09', date: 'Eyl 2026', tag: 'Ödül · Takımla', title: 'TEKNOFEST 2026 finalisti, En İyi Sistem Tasarımı', short: 'Hava Savunma Sistemleri finalinde 12 hedeften 11’ini vurduk.', img: IMG.tPanel, panelImg: IMG.tPair, alt: 'Alperen Manas, TEKNOFEST ödülüyle ve İSTİKLAL taretiyle', desc: 'Görüntü işleme dışındaki yazılımı üstlendim. Kontrolcüleri log-replay ve Monte Carlo simülatörüyle karşılaştırdım.', facts: [{ k: 'Final', v: '11/12 isabet' }, { k: 'Hareketli hedef', v: '7/8 isabet' }], bullets: ['Takip ve atış kontrolü, seri haberleşme', 'Backend, operatör konsolu, entegrasyon', 'Python, FastAPI, Kalman/PID, C++, Vue 3, Three.js'] },
    { id: 'bgts', big: true, month: '2026-09', date: 'Tem–Eyl 2026', tag: 'Staj · BGTS (BilgeAdam)', title: 'Yapay zekâ mühendisliği stajı', short: 'Yerel çalışan RAG servisi: hibrit arama, kaynak gösteren yanıtlar.', desc: 'Vektör ve BM25 hibrit arama, kaynak gösteren yanıtlar, cevaplanamayan sorular için LLM’siz akış.', facts: [{ k: 'Recall@5 (44 vaka)', v: '0.92' }, { k: 'p95 gecikme', v: '43 ms' }, { k: 'Test', v: '239' }, { k: 'Yığın', v: 'FastAPI, Qdrant, Ollama' }], href: 'https://github.com/lprnmns/document-intelligence', linkText: 'Kaynak kodu aç' },
    { id: 'katex', by: 'Grigoriy Reshetniak, KaTeX bakımcısı', isPr: true, month: '2026-09', date: '23 Eyl', tag: 'KaTeX', title: 'Hizalanmış denklemlerde sondaki satırlar kayboluyordu.', desc: 'align ortamında sondaki satırlar artık korunuyor.', orig: 'fix(array): preserve trailing rows in align', href: pr('KaTeX/KaTeX', 4283), linkText: 'PR #4283’ü aç' },
    { id: 'ce', by: 'Matt Godbolt, Compiler Explorer’ın yaratıcısı', isPr: true, month: '2026-09', date: '14 Eyl', tag: 'Compiler Explorer', title: 'Makine kodu ekranında bazı sayılar yanlışlıkla renk kutucuğu olarak görünüyordu.', desc: 'Assembly çıktısında renk süslemeleri kapatıldı.', facts: [{ k: 'Yıldız', v: '★ 19k' }], orig: 'fix(compiler): disable color decorators for assembly output', href: pr('compiler-explorer/compiler-explorer', 9105), linkText: 'PR #9105’i aç' },
    { id: 'three', by: 'Michael Herzog, three.js çekirdek ekibi', isPr: true, month: '2026-09', date: '8 Eyl', tag: 'three.js', title: 'Büyük sayılarda “2’nin kuvveti” kontrolü yanlış sonuç veriyordu.', desc: 'MathUtils içindeki isPowerOfTwo düzeltildi.', facts: [{ k: 'Yıldız', v: '★ 118k' }], orig: 'MathUtils: Fix large isPowerOfTwo values', href: pr('mrdoob/three.js', 34459), linkText: 'PR #34459’u aç' },

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
  seek: 'Seeking a full-time, long-term internship.',
  seekSub: 'My university covers internship insurance for 14 weeks starting 8 February 2027. I can start earlier if the company provides insurance.',
  roles: 'Backend · Full-stack · AI / LLM · Open to relocating',
  hint: 'Click a row → inspect the evidence in the panel',
  cta: { title: 'I would like to join your team for a long-term internship.', text: 'From 8 February 2027 for 14 weeks with university insurance; earlier with company insurance. Any city.', mail: 'Send email' },
  btnCv: 'Open CV',
  btnMail: 'Send email',
  btnGh: 'GitHub',
  btnLi: 'LinkedIn',
  btnWa: 'WhatsApp',
  waText: 'Hi Alperen, I found you through your website.',
  paperA: 'In widely used open-source projects, including Microsoft Semantic Kernel, Vite, Node.js undici and three.js: ',
  paperMark: '{total} merged contributions in {repos} projects.',
  paperB: 'I find bug candidates with AI-assisted review, confirm them against an official reference, and send each fix with a test that proves the bug.',
  strip: [
    { id: 'teknofest', img: IMG.t, t: 'TEKNOFEST 2026 finalist', d: 'Best System Design Award' },
    { id: 'monad', img: IMG.m, t: 'Hackathon winner', d: 'Monad Blitz, 2025' },
    { id: 'klinik', img: IMG.k, t: '2 live products', d: 'Klinik Akış AI · Zenith Trader (100+)' },
    { id: 'bgts', dual: true, t: 'Experience', d: '', rows: [{ img: IMG.bgts, t: 'BGTS (BilgeAdam)', d: 'AI internship' }, { img: IMG.ptt, t: 'PTT (Turkish Post)', d: 'DevOps internship' }] },
  ],
  monthNames: ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'],
  monthLabel: '{m} {y} · {n} MERGED CONTRIBUTIONS',
  firstLabel: '{m} {y} · FIRST MERGED CONTRIBUTIONS',
  more: '{n} more',
  seeAll: 'See all {n} contributions on GitHub',
  tabs: ['TEKNOFEST 2026', 'Monad Blitz 2025'],
  back: 'Back to awards',
  howT: 'How I found it',
  demo: {
    run: 'Run', running: 'Running…', ref: 'acorn (reference)', before: 'meriyah 7.4.0 (before)', after: 'meriyah 7.4.1 (after)',
    accepted: 'Accepted', rejected: 'SyntaxError', wrongAccept: 'Accepted: bug', rightReject: 'SyntaxError: correct',
    code: '"use strict"; x = let => 1;', control: 'x = let => 1;', tryControl: 'Try a valid line', tryBug: 'Back to the invalid line',
  },
  footer: 'Contribution data: GitHub · last updated {date}',
  timelineAria: 'Timeline',
  panelAria: 'Evidence panel',
  m: {
    top: 'Comp. Eng., final year · Kırıkkale Univ. · GPA 3.21 · Class of 2027',
    paperA: 'Including Microsoft Semantic Kernel, Vite, Node.js undici and three.js: ',
    paperB: 'I find bug candidates with AI-assisted review, confirm them against an official reference, and fix them with a test that proves the bug.',
    highlights: 'HIGHLIGHTS',
    swipe: 'swipe →',
    cards: [
      { id: 'teknofest', tag: 'AWARD · TEAM', t: 'Best System Design Award', d: 'TEKNOFEST 2026 · Air Defense Systems final · 11 of 12 targets hit' },
      { id: 'monad', tag: 'AWARD', t: 'Hackathon winner', d: 'Monad Blitz 2025 · Ankara · blockchain product' },
      { id: 'klinik', tag: 'LIVE PRODUCT', t: 'Klinik Akış AI', d: 'AI appointment assistant on WhatsApp' },
      { id: 'zenith', tag: 'LIVE · 100+ USERS', t: 'Zenith Trader', d: 'Copy-trading platform' },
      { id: 'bgts', tag: 'INTERNSHIP · 2026', t: 'BGTS (BilgeAdam)', d: 'AI · RAG · 239 tests', logo: 'bgts' },
      { id: 'ptt', tag: 'INTERNSHIP · 2025', t: 'PTT (Turkish Post)', d: 'DevOps · Docker, Linux', logo: 'ptt' },
    ],
    oss: 'OPEN SOURCE · MERGED CONTRIBUTIONS',
    stats: [{ v: '{total}', l: 'merged PRs' }, { v: '{repos}', l: 'open-source projects' }, { v: '{mer}', l: 'merged PRs in meriyah', s: '43M downloads a month' }, { v: '{mj}', l: 'merged PRs in minijinja', s: 'by the creator of Flask' }],
    testTag: '✓ test added',
    byLabel: 'Merged by',
    monthShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    fixes: 'SELECTED FIXES · TAP FOR THE EVIDENCE',
    demoBadge: 'LIVE DEMO',
    showMore: 'Show {n} more fixes',
    exp: 'EXPERIENCE AND EDUCATION',
    close: 'Close',
    contact: 'Contact',
  },
  items: [
    { id: 'ime', big: true, group: 'next', date: 'Available', tag: 'Next', title: 'Long-term internship on your team', short: 'Full-time · Backend, full-stack or AI/LLM · Any city.', desc: 'I am looking for a team where I can own part of a system running in production.', facts: [{ k: 'With university insurance', v: '14 weeks from 8 Feb 2027' }, { k: 'With company insurance', v: 'I can start earlier' }], href: LINKS.mail, linkText: 'Send email' },
    { id: 'klinik', big: true, group: 'next', date: 'Live', tag: 'Product', title: 'Klinik Akış AI', short: 'AI appointment assistant that works over WhatsApp.', img: IMG.k, alt: 'Klinik Akış AI: WhatsApp chat and clinic dashboard', desc: 'Understands appointment requests from WhatsApp, checks live availability, books after confirmation and writes to the shared calendar.', bullets: ['Hands unclear or sensitive messages to staff', 'Python, TypeScript, LLM APIs, WhatsApp integration'], howTitle: 'How it works under the hood', how: [{ k: 'Problem', v: 'Clinics miss WhatsApp appointment requests outside working hours. Two patients asking for the same slot at once, or WhatsApp redelivering the same message, can create a double booking.' }, { k: 'Double booking', v: 'A slot is held for 10 minutes until the patient confirms. Overlapping holds or confirmed appointments for the same practitioner are rejected by a PostgreSQL exclusion constraint (exclude using gist + tstzrange), in the database itself rather than in application code.' }, { k: 'Duplicate messages', v: 'Every incoming WhatsApp message is unique by the provider’s message ID, so a redelivered webhook is processed once. Outgoing messages carry idempotency keys and are sent once.' }, { k: 'Human handoff', v: 'The assistant gives no medical assessment. When the patient asks, or a message is unclear or sensitive, it hands the conversation to clinic staff with the reason.' }, { k: 'Data and tests', v: 'Patient notes are stored encrypted and each clinic’s data is separated. 256 test files (unit, integration and end-to-end) cover the system.' }], href: 'https://klinikakis.com', linkText: 'klinikakis.com' },
    { id: 'zenith', big: true, group: 'next', date: 'Live', tag: 'Product · 100+ users', title: 'Zenith Trader', short: 'Live copy-trading platform, built end to end.', img: IMG.z, alt: 'Zenith Trader sign-in screen', desc: 'Watches large wallet moves on OKX and turns them into copied trades on users’ accounts.', facts: [{ k: 'Users', v: '100+' }, { k: 'Stack', v: 'Next.js, Node.js' }], href: 'https://zenithtrader.alperenmanas.app', linkText: 'Open live product' },

    { id: 'mj1002', by: 'Armin Ronacher, creator of Flask', isPr: true, month: '2026-11', date: '5 Nov', tag: 'minijinja · template engine by the creator of Flask', title: 'Slicing a list backwards crashed or returned the wrong items.', desc: 'Negative-step slicing could panic and return wrong items. The fix was merged with a test that proves the bug.', facts: [{ k: 'Merged in this project', v: '{mj}' }, { k: 'Language', v: 'Rust' }], how: [{ k: 'Problem', v: '“[][::-1]” panicked; “[1, 2, 3][:0:-1]” returned [3, 2, 1] instead of [3, 2], and “[1, 2, 3][-100::-1]” returned [1] instead of [].' }, { k: 'How I found it', v: 'I compared results with Python slicing: every start/stop/step combination on lists of length 0, 1, 2 and 5, 4,732 cases in total.' }, { k: 'Fix', v: 'Backward slicing now clamps start and stop like Python; positive steps are unchanged. After the fix all 4,732 cases match Python.' }, { k: 'Proof test', v: 'New cases in slicing.txt; without the fix test_vm panics.' }], orig: 'Fix slicing with a negative step panicking and returning wrong items', href: pr('mitsuhiko/minijinja', 1002), linkText: 'Open PR #1002' },
    { id: 'mer689', by: 'Chunpeng Huo, meriyah maintainer', isPr: true, month: '2026-11', date: '2 Nov', tag: 'meriyah · ~43M npm downloads a month', title: 'It accepted invalid expressions like “[a]++”. Now it rejects them.', desc: 'The JavaScript parser treated an expression that the spec forbids as valid.', facts: [{ k: 'Merged in this project', v: '{mer}' }, { k: 'Stars', v: '★ 1.2k' }], orig: 'fix(parser): reject `++` and `--` on array and object literals', href: pr('meriyah/meriyah', 689), linkText: 'Open PR #689' },
    { id: 'sk', by: 'Eduard van Valkenburg, Semantic Kernel team', isPr: true, month: '2026-11', date: '2 Nov', tag: 'Microsoft Semantic Kernel', title: 'The library crashed when a function called by the AI returned an empty result.', desc: 'In the Python side of Microsoft’s AI agent SDK, messages with empty function results are now handled.', facts: [{ k: 'Stars', v: '★ 29k' }, { k: 'Area', v: 'AI / LLM' }], how: [{ k: 'Problem', v: 'When a tool returned a valid but empty message, FunctionResultContent read result.items[0] before converting the message to text and raised IndexError.' }, { k: 'How I found it', v: 'I showed that earlier fixes in the same area (#14359, #14364) did not cover this path and reproduced the bug with a test.' }, { k: 'Fix', v: 'Removed an item lookup whose result was immediately overwritten. An empty message now gives an empty result; non-empty behaviour and the public API are unchanged.' }, { k: 'Proof test', v: 'A focused regression test for the empty result and the kept inner content; the related suites pass.' }], orig: 'Python: Handle empty chat message function results', href: pr('microsoft/semantic-kernel', 14375), linkText: 'Open PR #14375' },

    { id: 'vite', by: 'sapphi-red, Vite core team', isPr: true, month: '2026-10', date: '26 Oct', tag: 'Vite', title: 'Automatic rebuilds did not work for files with “?” or “#” in their URL.', desc: 'Files referenced with new URL(..., import.meta.url) are now watched.', facts: [{ k: 'Stars', v: '★ 84k' }, { k: 'Area', v: 'Developer tooling' }], how: [{ k: 'Problem', v: 'When a file used via new URL(\'./file?inline\', import.meta.url) changed, “vite build --watch” did not rebuild: the query made the file lookup fail, so it was never watched.' }, { k: 'How I found it', v: 'Starting from an open issue, I checked the before/after behaviour by hand in a small project. I used an AI assistant to reproduce the issue and draft the test, and said so in the PR.' }, { k: 'Fix', v: 'Strip the query/hash with cleanUrl before the file check and addWatchFile; the build output is unchanged. I credited the reporter, whose suggestion it was, as co-author.' }, { k: 'Proof test', v: 'Two cases in assetImportMetaUrl.spec.ts; the query/hash case fails without the fix.' }], orig: 'fix: watch files that have a query or hash referenced with `new URL(..., import.meta.url)`', href: pr('vitejs/vite', 23780), linkText: 'Open PR #23780' },
    { id: 'mer671', by: 'Chunpeng Huo, meriyah maintainer', isPr: true, demo: true, month: '2026-10', date: '25 Oct', tag: 'meriyah · run it yourself in the browser', title: 'It accepted “let => 1”, which strict mode forbids.', desc: 'Compare the same line in another parser (acorn) and in versions before and after my fix.', how: [{ k: 'Problem', v: 'In strict mode “let” cannot be a variable name (ECMAScript §13.1.1). meriyah only caught it at the start of a statement and accepted it in positions like “x = let => 1” or “f(let => 1)”.' }, { k: 'How I found it', v: 'I generated random JavaScript expressions and compared meriyah’s output and errors with acorn’s; acorn rejected all four. I confirmed which side was right from the spec.' }, { k: 'Fix', v: 'The “let” token carries the contextual-keyword flag, so it passed the identifier check. To avoid breaking a shared function, I added the check only to classifyIdentifier(), which runs on the arrow-function paths.' }, { k: 'Proof test', v: '5 new failing cases, all of which fail without the fix. The full 92,026-test suite passes.' }], orig: 'fix(parser): reject `let` as an arrow parameter in strict mode code', href: pr('meriyah/meriyah', 671), linkText: 'Open PR #671' },
    { id: 'sic', big: true, month: '2026-10', date: 'Oct 2026', tag: 'Education', title: 'Samsung Innovation Campus', short: 'Graduated from the AI program.', desc: 'Machine learning, NLP, deep learning and LLMs in a Samsung × UNDP program.', facts: [{ k: 'Certificate', v: 'Huawei HCIA-AI V3.5' }] },
    { id: 'undici', by: 'Matteo Collina, Node.js TSC', isPr: true, month: '2026-10', date: '19 Oct', tag: 'Node.js undici', title: 'Mocked requests failed to match because of a single “/” in the URL.', desc: 'The trailing slash before a query string is now ignored in mocked requests.', facts: [{ k: 'Stars', v: '★ 7.7k' }, { k: 'Area', v: 'Node.js HTTP client' }], orig: 'fix(mock): ignore the trailing slash before a query string', href: pr('nodejs/undici', 6031), linkText: 'Open PR #6031' },

    { id: 'teknofest', big: true, month: '2026-09', date: 'Sep 2026', tag: 'Award · team', title: 'TEKNOFEST 2026 finalist, Best System Design', short: 'We hit 11 of 12 targets in the Air Defense Systems final.', img: IMG.tPanel, panelImg: IMG.tPair, alt: 'Alperen Manas with the TEKNOFEST award and the İSTİKLAL turret', desc: 'I owned all software except computer vision. I compared controllers with log replay and a Monte Carlo simulator.', facts: [{ k: 'Final', v: '11/12 hits' }, { k: 'Moving targets', v: '7/8 hits' }], bullets: ['Tracking and fire control, serial communication', 'Backend, operator console, integration', 'Python, FastAPI, Kalman/PID, C++, Vue 3, Three.js'] },
    { id: 'bgts', big: true, month: '2026-09', date: 'Jul–Sep 2026', tag: 'Internship · BGTS (BilgeAdam)', title: 'AI engineering internship', short: 'Local RAG service: hybrid search, answers with sources.', desc: 'Hybrid vector + BM25 search, answers that cite sources, and a no-LLM path for questions it cannot answer.', facts: [{ k: 'Recall@5 (44 cases)', v: '0.92' }, { k: 'p95 latency', v: '43 ms' }, { k: 'Tests', v: '239' }, { k: 'Stack', v: 'FastAPI, Qdrant, Ollama' }], href: 'https://github.com/lprnmns/document-intelligence', linkText: 'Open source code' },
    { id: 'katex', by: 'Grigoriy Reshetniak, KaTeX maintainer', isPr: true, month: '2026-09', date: '23 Sep', tag: 'KaTeX', title: 'Trailing rows disappeared in aligned equations.', desc: 'Trailing rows in the align environment are now kept.', orig: 'fix(array): preserve trailing rows in align', href: pr('KaTeX/KaTeX', 4283), linkText: 'Open PR #4283' },
    { id: 'ce', by: 'Matt Godbolt, creator of Compiler Explorer', isPr: true, month: '2026-09', date: '14 Sep', tag: 'Compiler Explorer', title: 'Some numbers in the assembly view showed up as color swatches.', desc: 'Color decorators are now disabled for assembly output.', facts: [{ k: 'Stars', v: '★ 19k' }], orig: 'fix(compiler): disable color decorators for assembly output', href: pr('compiler-explorer/compiler-explorer', 9105), linkText: 'Open PR #9105' },
    { id: 'three', by: 'Michael Herzog, three.js core team', isPr: true, month: '2026-09', date: '8 Sep', tag: 'three.js', title: 'The “power of two” check was wrong for large numbers.', desc: 'Fixed isPowerOfTwo in MathUtils.', facts: [{ k: 'Stars', v: '★ 118k' }], orig: 'MathUtils: Fix large isPowerOfTwo values', href: pr('mrdoob/three.js', 34459), linkText: 'Open PR #34459' },

    { id: 'monad', big: true, group: '2025', date: '2025', tag: 'Award', title: 'Monad Blitz hackathon, 1st place', short: 'Built and pitched a product at the blockchain hackathon in Ankara.', img: IMG.m, alt: 'Alperen Manas with the Monad Blitz first-place board', desc: 'I developed and pitched a product idea during the hackathon and took first place.', facts: [{ k: 'Result', v: '1st' }, { k: 'Where', v: 'Ankara' }] },
    { id: 'ptt', big: true, group: '2025', date: 'Aug 2025', tag: 'Internship · PTT (Turkish Post)', title: 'DevOps internship', short: 'Docker, Linux, virtualization and deployment.', desc: 'Worked with Docker/Linux, virtualization and deployment in an enterprise IT environment; moved projects into containers.', facts: [{ k: 'Area', v: 'DevOps' }] },
  ],
};

export const TEXT: Record<Lang, Txt> = { tr: TR, en: EN };
