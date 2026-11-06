import { ME, PRODUCTS, STATS, TEKNOFEST } from '@/lib/k';
import { KNav } from '@/components/k/KNav';
import { BugDemo } from '@/components/k/BugDemo';
import { Timeline } from '@/components/k/Timeline';
import { InspectList, type Inspection } from '@/components/k/Inspect';
import { Glossary, Term } from '@/components/k/Term';
import { Icon } from '@/components/Icons';
import s from './s.module.css';

export const metadata = { title: 'Konsept 11 · Sentez', robots: { index: false } };

const INSPECT: Inspection[] = [
  {
    id: 'meriyah', repo: 'meriyah/meriyah', stars: '1.2k', mergedByWho: 'meriyah bakımcısı', url: 'https://github.com/meriyah/meriyah/pull/671',
    plain: 'Dilin kurallarına göre yasak olan bir kodu “geçerli” sayan hatayı buldum; düzeltme 7.4.1 sürümüyle herkese ulaştı.',
    problem: 'Katı modda (strict mode) `let` değişken adı olamaz (ECMAScript §13.1.1). meriyah yalnızca satır başındaki `let => 1`’i reddediyor, `x = let => 1`, `f(let => 1)` gibi diğer konumlarda kabul ediyordu.',
    evidence: 'Rastgele ifadeler üretip meriyah ile acorn’un çıktılarını ve hatalarını karşılaştırdım; acorn bu örneklerin hepsini reddediyordu. Hangisinin haklı olduğunu spesifikasyondan doğruladım.',
    fix: '`let` belirteci “bağlamsal anahtar kelime” bayrağı taşıdığı için kimlik kontrolünden geçiyordu. Paylaşılan fonksiyonu bozmamak için katı mod kontrolünü yalnızca ok fonksiyonu yollarında çağrılan `classifyIdentifier()`’a ekledim.',
    test: '5 yeni hata testi; düzeltme olmadan hepsi başarısız. 92.026 testlik paketin tamamı geçti.',
  },
  {
    id: 'minijinja', repo: 'mitsuhiko/minijinja', stars: '2.8k', mergedByWho: 'Armin Ronacher, projenin yaratıcısı', url: 'https://github.com/mitsuhiko/minijinja/pull/1002',
    plain: 'Listeyi tersten dilimlerken programın çöktüğü ve yanlış sonuç verdiği durumları düzelttim.',
    problem: 'Negatif adımlı dilimlemede: `[][::-1]` çöküyordu (panic); `[1, 2, 3][:0:-1]` [3, 2] yerine [3, 2, 1] dönüyordu; `[1, 2, 3][-100::-1]` [] yerine [1] dönüyordu.',
    evidence: 'Sonuçları Python’un dilimlemesiyle karşılaştırdım: 0, 1, 2 ve 5 elemanlı listelerde tüm başlangıç/bitiş/adım kombinasyonları, toplam 4.732 durum. Düzeltmeden sonra hepsi aynı.',
    fix: '`range_step_backwards` başlangıç ve bitişi Python gibi sınırlıyor ve bitişi hariç tutarak geriye yürüyor. Pozitif adımlar değişmedi.',
    test: '`tests/inputs/slicing.txt` dosyasına yeni durumlar; düzeltme olmadan `test_vm` çöküyor.',
  },
  {
    id: 'vite', repo: 'vitejs/vite', stars: '84k', mergedByWho: 'Vite çekirdek ekibi', url: 'https://github.com/vitejs/vite/pull/23780',
    plain: 'Dosya değiştiğinde otomatik yeniden derlemenin bazı dosyalarda çalışmadığı hatayı düzelttim.',
    problem: '`new URL(\'./file?inline\', import.meta.url)` ile kullanılan bir dosya değiştiğinde `vite build --watch` yeniden derlemiyordu. Adresteki sorgu/hash yüzünden dosya bulunamıyor ve izlemeye eklenmiyordu.',
    evidence: 'Küçük bir projede elle doğruladım: düzeltmeden önce dosyayı değiştirmek yeniden derlemeyi tetiklemiyor, sonra tetikliyor.',
    fix: 'Dosya kontrolünden ve izlemeye eklemeden önce sorgu/hash’i `cleanUrl` ile temizledim; üretilen çıktı değişmiyor. Çözüm, hatayı bildiren kişinin önerisiydi; onu ortak yazar olarak ekledim.',
    test: '`assetImportMetaUrl.spec.ts` içinde iki test; sorgu/hash durumu düzeltme olmadan başarısız.',
    ai: 'Hatayı yeniden üretmek ve testi taslaklamak için AI asistanı kullandım; değişikliği kendim inceleyip önce/sonra davranışını yerelde kontrol ettim. Bunu PR’da da belirttim.',
  },
  {
    id: 'sk', repo: 'microsoft/semantic-kernel', stars: '29k', mergedByWho: 'Microsoft Semantic Kernel ekibi', url: 'https://github.com/microsoft/semantic-kernel/pull/14375',
    plain: 'Microsoft’un yapay zekâ kütüphanesinde, bir araç boş sonuç döndürünce oluşan çökmeyi düzelttim.',
    problem: 'Bir araç geçerli ama boş bir mesaj döndürdüğünde `FunctionResultContent.from_function_call_content_and_result()`, mesajı metne çevirmeden önce `result.items[0]` okuduğu için IndexError veriyordu.',
    evidence: 'Aynı alandaki önceki düzeltmelerin (#14359, #14364) bu yolu kapsamadığını gösterdim ve hatayı testle yeniden ürettim.',
    fix: 'Zaten hemen üzerine yazılan gereksiz öğe okumasını kaldırdım. Boş mesaj artık boş sonuç oluyor; dolu mesajlarda davranış aynı, genel API değişmedi.',
    test: 'Boş sonuç ve korunan iç içerik için odaklı regresyon testi; ilgili test paketleri geçti.',
  },
];

export default function Page() {
  return (
    <>
      <header className={s.top}>
        <span className={s.brand}>{ME.name}</span>
        <nav className={s.nav}><a href="#is">İşler</a><a href="#urunler">Ürünler</a><a href="#oduller">Ödüller</a><a href="#iletisim">İletişim</a></nav>
      </header>
      <main>
        <section className={s.hero}>
          <div className={s.id}>
            <h1 className={s.h1}>{ME.name}</h1>
            <p className={s.sub}>{ME.dept} {ME.year} · {ME.school} · GNO {ME.gpa}</p>
            <p className={s.seek}><span className={s.dot} /><span><b>{ME.ime}</b> İME stajı arıyorum.</span></p>
            <p className={s.roles}>{ME.roles.map((r) => <span key={r}>{r}</span>)}<em>{ME.relocate}</em></p>
            <p className={s.ctas}>
              <a className={s.primary} href={ME.cv} download>CV’yi indir</a>
              <a href={ME.mailto}>E-posta gönder</a>
              <a href={ME.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={ME.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            </p>
          </div>
          <div className={s.demoCol}>
            <p className={s.demoLead}>
              Yaygın kullanılan yazılımlardaki hataları bulup <b>testle kanıtlayarak</b> düzeltiyorum. Gerçek bir örnek, tarayıcınızda çalışıyor:
            </p>
            <BugDemo compact />
          </div>
        </section>

        <section className={s.wrap}>
          <ul className={s.proofs}>
            <li><img src="/img/monad-blitz.webp" alt="" /><div><b>Birincilik</b><span>Monad Blitz blockchain hackathonu, 2025</span></div></li>
            <li><img src="/img/teknofest-odul.webp" alt="" /><div><b>Finalist</b><span>TEKNOFEST 2026 · En İyi Sistem Tasarımı</span></div></li>
            <li><span className={s.pIcon}><Icon name="merge" /></span><div><b>{STATS.prs} katkı</b><span>{STATS.repos} açık kaynak projeye <Term k="merge">kabul edildi</Term></span></div></li>
            <li><span className={s.pIcon}><Icon name="users" /></span><div><b>100+ kullanıcı</b><span>canlı ürünüm Zenith Trader’da</span></div></li>
          </ul>
        </section>

        <section id="is" className={s.wrap}>
          <h2 className={s.h2}>Seçilmiş mühendislik işleri</h2>
          <p className={s.lead}>
            Dünya çapında kullanılan projelerde bulduğum hatalardan dördü. Her kartın önce sade özetini, “Düzeltmeyi incele” ile sorun, kanıt, düzeltme ve testi görebilirsiniz.
          </p>
          <InspectList items={INSPECT} />
        </section>

        <section id="urunler" className={s.wrap}>
          <h2 className={s.h2}>Canlı ürünler</h2>
          <div className={s.products}>
            {[PRODUCTS.klinik, PRODUCTS.zenith].map((p) => (
              <article key={p.name} className={s.product}>
                <img src={p.shots[0].src} alt={p.shots[0].cap} loading="lazy" />
                <div>
                  <h3>{p.name} {p.badge && <span className={s.pill}>{p.badge}</span>}</h3>
                  <p>{p.oneLine}</p>
                  <ol className={s.steps}>{p.steps.map((x) => <li key={x}>{x}</li>)}</ol>
                  <p className={s.tech}>{p.tech}</p>
                  <p className={s.plinks}>
                    <a href={p.url} target="_blank" rel="noopener noreferrer">{p.url.replace('https://', '')} ↗</a>
                    {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer">Kaynak kod</a>}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="oduller" className={s.wrap}>
          <h2 className={s.h2}>Ödüller</h2>
          <div className={s.awards}>
            <figure><img src="/img/teknofest-taret.webp" alt="TEKNOFEST taret sistemi" loading="lazy" /><figcaption><b>TEKNOFEST 2026 · Hava Savunma Sistemleri</b>Finalist ve En İyi Sistem Tasarımı ödülü. Finalde 12 hedefin 11’i. {TEKNOFEST.mine} <a href={TEKNOFEST.github} target="_blank" rel="noopener noreferrer">Kaynak</a></figcaption></figure>
            <figure><img src="/img/monad-blitz.webp" alt="Monad Blitz birinciliği" loading="lazy" /><figcaption><b>Monad Blitz 2025 · Birincilik</b>Hackathon süresince ürün fikri geliştirip sundum.</figcaption></figure>
          </div>
        </section>

        <section className={`${s.wrap} ${s.two}`}>
          <div>
            <h2 className={s.h2}>Deneyim</h2>
            <article className={s.job}><b>BGTS (BilgeAdam)</b> · Yapay Zekâ Mühendisliği Stajyeri <span>Tem – Eyl 2026</span><p>Belgeler üzerinde soru-cevap yapan yapay zekâ servisi: doğru belgeyi %92 oranında ilk 5 sonuçta buluyor, 239 otomatik testle korunuyor. <a href="https://github.com/lprnmns/document-intelligence" target="_blank" rel="noopener noreferrer">Kaynak</a></p></article>
            <article className={s.job}><b>PTT Genel Müdürlüğü</b> · DevOps Stajyeri <span>Ağu 2025</span><p>Docker, Linux, sanallaştırma ve deployment süreçleri.</p></article>
          </div>
          <div>
            <h2 className={s.h2}>Eğitim</h2>
            <article className={s.job}><b>{ME.school}</b> · {ME.dept} <span>2023 – 2027</span><p>{ME.year} · GNO {ME.gpa}</p></article>
            <article className={s.job}><b>Samsung Innovation Campus</b> · Yapay Zekâ Programı <span>Eki 2026</span><p>Samsung × UNDP · ML, NLP, derin öğrenme, LLM</p></article>
          </div>
        </section>

        <section className={s.wrap}>
          <h2 className={s.h2}>Son çalışmalar</h2>
          <Timeline limit={6} showFilters={false} />
        </section>

        <section id="iletisim" className={s.wrap}>
          <div className={s.contact}>
            <h2>Güvenilir bir şey inşa edelim.</h2>
            <p>{ME.ime} İME için müsaitim. {ME.relocate}. En hızlı e-postayla dönüyorum.</p>
            <p className={s.ctas}>
              <a className={s.primary} href={ME.mailto}>{ME.email}</a>
              <a href={ME.cv} download>CV’yi indir</a>
              <a href={ME.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </p>
          </div>
          <Glossary />
        </section>
      </main>
      <KNav n={11} />
    </>
  );
}
