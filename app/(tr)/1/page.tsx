import { ME, PRS, PRODUCTS, STATS, TEKNOFEST } from '@/lib/k';
import { KNav } from '@/components/k/KNav';
import { BugDemo } from '@/components/k/BugDemo';
import { Glossary, Term } from '@/components/k/Term';
import s from './s.module.css';

export const metadata = { title: 'Konsept 1 · Kanıt Dosyası', robots: { index: false } };

const pick = (id: string) => PRS.find((p) => p.id === id)!;
const TOP = ['vite-23780', 'sk-14375', 'undici-6031', 'ce-9105', 'three-34459', 'katex-4277'].map(pick);

function Claim({ n, open, claim, sub, children }: { n: number; open?: boolean; claim: React.ReactNode; sub: string; children: React.ReactNode }) {
  return (
    <details className={s.claim} open={open}>
      <summary>
        <span className={s.cn}>{String(n).padStart(2, '0')}</span>
        <span className={s.ctext}>
          {claim}
          <span className={s.csub}>{sub}</span>
        </span>
        <span className={s.cbtn} aria-hidden="true">Kanıtı gör</span>
      </summary>
      <div className={s.evidence}>{children}</div>
    </details>
  );
}

export default function Page() {
  return (
    <>
      <header className={s.top}>
        <span className={s.brand}>{ME.name}</span>
        <span className={s.topLinks}>
          <a href={ME.cv} download>CV</a>
          <a href={ME.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={ME.mailto}>E-posta</a>
        </span>
      </header>
      <main className={s.wrap}>
        <section className={s.hero}>
          <p className={s.kicker}>{ME.dept} {ME.year} · {ME.school} · GNO {ME.gpa}</p>
          <h1 className={s.h1}>
            Hataları bulurum.
            <br />
            Düzeltmeyi kanıtlarım.
          </h1>
          <p className={s.avail}>
            <span className={s.dot} /> {ME.ime} <b>İME stajı</b> arıyorum · {ME.relocate}
          </p>
          <p className={s.roles}>
            {ME.roles.map((r) => (
              <span key={r}>{r}</span>
            ))}
          </p>
          <p className={s.intro}>
            Aşağıdaki her cümle bir iddia. Üstüne tıklayınca kanıtı açılır: bağlantı, fotoğraf ya da nasıl ölçtüğüm.
          </p>
        </section>

        <section className={s.claims} aria-label="İddialar ve kanıtları">
          <Claim
            n={1}
            open
            claim={<>Dünya çapında kullanılan <b>{STATS.repos} yazılım projesine {STATS.prs} kod katkım kabul edildi.</b></>}
            sub="Açık kaynak projelerde kodumu projenin sorumluları inceleyip kabul etti."
          >
            <p>
              <Term k="açık kaynak">Açık kaynak</Term> projelerde herkes kod önerebilir (<Term k="PR">PR</Term>), ama projeye neyin gireceğine projenin{' '}
              <Term k="bakımcı">bakımcıları</Term> karar verir. Aşağıdakiler, kabul edilen önerilerimden birkaçı ve onları kabul eden kişiler:
            </p>
            <ul className={s.evList}>
              {TOP.map((p) => (
                <li key={p.id}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    <b>{p.name}</b> <span className={s.muted}>★ {p.stars}</span>
                  </a>
                  <span>{p.plain}</span>
                  <span className={s.muted}>Kabul eden: {p.mergedByWho}</span>
                </li>
              ))}
            </ul>
            <a href={ME.allPrs} target="_blank" rel="noopener noreferrer">Kabul edilen {STATS.prs} katkının tamamı (GitHub) →</a>
          </Claim>

          <Claim
            n={2}
            claim={<>Flask ve Jinja2’nin yaratıcısı Armin Ronacher, <b>{STATS.minijinja} düzeltmemi</b> kendi projesine aldı.</>}
            sub="minijinja: metin ve web sayfası şablonu üreten motor."
          >
            <p>
              minijinja’nın Rust ve Go olmak üzere iki sürümü var. Go sürümünün Rust sürümüyle aynı sonucu vermediği yerleri buldum ve tek tek düzelttim.
              Her düzeltmeye, hatayı gösteren bir <Term k="test">test</Term> ekledim.
            </p>
            <ul className={s.evList}>
              {PRS.filter((p) => p.repo === 'mitsuhiko/minijinja').map((p) => (
                <li key={p.id}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer"><b>#{p.num}</b> <span className={s.muted}>{p.dateTr}</span></a>
                  <span>{p.plain}</span>
                </li>
              ))}
            </ul>
          </Claim>

          <Claim
            n={3}
            claim={<>Ayda 43 milyon kez indirilen bir <Term k="parser">parser</Term>’da <b>{STATS.meriyah} kural hatası</b> bulup düzelttim.</>}
            sub="Kendiniz deneyin: aşağıdaki demo gerçek kodu tarayıcınızda çalıştırıyor."
          >
            <BugDemo />
          </Claim>

          <Claim
            n={4}
            claim={<>TEKNOFEST 2026 finalinde takımımızın tareti <b>12 hedefin 11’ini vurdu</b>; En İyi Sistem Tasarımı ödülünü aldık.</>}
            sub="Hava Savunma Sistemleri kategorisi · takım ödülü"
          >
            <div className={s.evGrid}>
              <img src="/img/teknofest-odul.webp" alt="TEKNOFEST 2026 En İyi Sistem Tasarımı ödülü" loading="lazy" />
              <img src="/img/teknofest-taret.webp" alt="İSTİKLAL tareti, atış alanında" loading="lazy" />
              <div>
                <p><b>Benim payım:</b> {TEKNOFEST.mine}</p>
                <p className={s.muted}>Hareketli hedeflerde dost-düşman ayrımıyla 8 hedefin 7’si vuruldu.</p>
                <a href={TEKNOFEST.github} target="_blank" rel="noopener noreferrer">Kaynak kod (GitHub) →</a>
              </div>
            </div>
          </Claim>

          <Claim n={5} claim={<>Monad Blitz blockchain hackathonunda <b>birinci oldum</b>.</>} sub="Ankara, 2025">
            <div className={s.evGrid}>
              <img src="/img/monad-blitz.webp" alt="Monad Blitz birincilik ödülü" loading="lazy" />
              <p>Hackathon süresince bir ürün fikri geliştirip jüriye sundum ve birincilik ödülünü aldım.</p>
            </div>
          </Claim>

          <Claim
            n={6}
            claim={<>Geliştirdiğim iki ürün canlıda; <b>birinin 100’den fazla kullanıcısı var</b>.</>}
            sub="Zenith Trader ve Klinik Akış AI"
          >
            <div className={s.evProducts}>
              {[PRODUCTS.zenith, PRODUCTS.klinik].map((p) => (
                <figure key={p.name}>
                  <img src={p.shots[0].src} alt={p.shots[0].cap} loading="lazy" />
                  <figcaption>
                    <b>{p.name}</b> {p.badge ? <span className={s.pill}>{p.badge}</span> : null}
                    <span>{p.oneLine}</span>
                    <a href={p.url} target="_blank" rel="noopener noreferrer">{p.url.replace('https://', '')} →</a>
                  </figcaption>
                </figure>
              ))}
            </div>
          </Claim>

          <Claim
            n={7}
            claim={<>Stajımda yazdığım yapay zekâ servisi, doğru belgeyi <b>%92 oranında ilk 5 sonuçta</b> buluyor.</>}
            sub="BGTS (BilgeAdam) · Yapay Zekâ Mühendisliği Stajı · Temmuz – Eylül 2026"
          >
            <p>
              <b>Nasıl ölçtüm:</b> 44 soruluk bir değerlendirme seti hazırladım; her sorunun doğru belgesi önceden belliydi. Servis bu soruların %92’sinde doğru
              belgeyi ilk 5 sonuç arasında getirdi (Recall@5 = 0,92). Farklı arama yöntemlerini aynı setle karşılaştırıp en iyisini varsayılan yaptım.
            </p>
            <p>
              Servis 239 otomatik <Term k="test">testle</Term> korunuyor; cevaplayamayacağı sorularda uydurmak yerine “bilmiyorum” diyor.
            </p>
            <a href="https://github.com/lprnmns/document-intelligence" target="_blank" rel="noopener noreferrer">Kaynak kod ve ölçüm sonuçları (GitHub) →</a>
          </Claim>
        </section>

        <section className={s.more}>
          <div>
            <h2>Deneyim</h2>
            <p><b>BGTS (BilgeAdam)</b> · Yapay Zekâ Mühendisliği Stajyeri · Tem – Eyl 2026</p>
            <p><b>PTT Genel Müdürlüğü</b> · DevOps Stajyeri · Ağu 2025</p>
          </div>
          <div>
            <h2>Eğitim</h2>
            <p><b>{ME.school}</b> · {ME.dept} · {ME.year} · GNO {ME.gpa}</p>
            <p><b>Samsung Innovation Campus</b> · Yapay Zekâ Programı · Eki 2026</p>
            <p className={s.muted}>İngilizce B1-B2 · Huawei HCIA-AI · BTK SQL</p>
          </div>
        </section>

        <section className={s.contact}>
          <h2>{ME.imeShort} için müsaitim.</h2>
          <p>Şehir fark etmez. En hızlı e-postayla dönüyorum.</p>
          <p className={s.ctas}>
            <a className={s.primary} href={ME.mailto}>{ME.email}</a>
            <a href={ME.cv} download>CV’yi indir</a>
            <a href={ME.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </p>
        </section>
        <Glossary />
      </main>
      <KNav n={1} />
    </>
  );
}
