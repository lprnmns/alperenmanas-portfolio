import { ME, STATS, TEKNOFEST } from '@/lib/k';
import { KNav } from '@/components/k/KNav';
import s from './s.module.css';

export const metadata = { title: 'Konsept 8 · 12 Atış', robots: { index: false } };

function Targets({ hit, total }: { hit: number; total: number }) {
  return (
    <div className={s.targets} aria-label={`${total} hedeften ${hit} isabet`}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={i < hit ? s.hit : s.miss} aria-hidden="true">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="10" r="7" /><path d="M12 17v5" /></svg>
        </span>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <>
      <div className={s.idbar}>
        <span><b>{ME.name}</b> · {ME.dept} {ME.year} · {ME.school}</span>
        <span className={s.idSeek}>● {ME.imeShort} İME stajı arıyorum · {ME.roles.join(' · ')}</span>
        <span className={s.idLinks}><a href={ME.cv} download>CV</a><a href={ME.mailto}>E-posta</a></span>
      </div>
      <main className={s.page}>
        <section className={s.hero}>
          <div>
            <p className={s.kicker}>{TEKNOFEST.title} · Final</p>
            <h1 className={s.h1}>12 atış.<br /><span>11 isabet.</span></h1>
            <p className={s.award}>🏅 {TEKNOFEST.award}</p>
            <p className={s.plain}>{TEKNOFEST.plain}</p>
            <p className={s.mine}><b>Benim payım:</b> {TEKNOFEST.mine}</p>
          </div>
          <figure className={s.photo}>
            <img src="/img/teknofest-taret.webp" alt="Alperen Manas, İSTİKLAL tareti ile TEKNOFEST atış alanında" />
            <figcaption>Takımımızın tareti, final atış alanında</figcaption>
          </figure>
        </section>

        <section className={s.board}>
          <div className={s.stage}>
            <p className={s.stageL}>{TEKNOFEST.stage2.label}</p>
            <p className={s.score}>{TEKNOFEST.stage2.hit}<span>/{TEKNOFEST.stage2.total}</span></p>
            <Targets hit={TEKNOFEST.stage2.hit} total={TEKNOFEST.stage2.total} />
          </div>
          <div className={s.stage}>
            <p className={s.stageL}>{TEKNOFEST.stage3.label}</p>
            <p className={s.score}>{TEKNOFEST.stage3.hit}<span>/{TEKNOFEST.stage3.total}</span></p>
            <Targets hit={TEKNOFEST.stage3.hit} total={TEKNOFEST.stage3.total} />
          </div>
          <p className={s.note}>Kutular yalnızca sayıyı gösterir; atışların sırasını değil.</p>
        </section>

        <section className={s.section}>
          <h2>Sistem nasıl çalışıyor?</h2>
          <p className={s.lead}>Görüntüden atışa kadar her adım bir yazılım katmanı. Kırmızı çerçeveliler benim yazdığım katmanlar.</p>
          <ol className={s.pipe}>
            {TEKNOFEST.pipeline.map((x, i) => (
              <li key={x.t} className={x.mine ? s.pMine : ''}>
                <span className={s.pN}>{i + 1}</span>
                <b>{x.t}</b>
                <span>{x.d}</span>
                {x.mine && <em>benim</em>}
              </li>
            ))}
          </ol>
          <div className={s.two}>
            <div>
              <h3>Sahaya çıkmadan önce</h3>
              <p>Farklı nişan alma yöntemlerini sahada denemeden önce bir simülatörde karşılaştırdım: kayıtlı verileri yeniden oynatarak (log-replay) ve çok sayıda rastgele senaryo deneyerek (Monte Carlo).</p>
            </div>
            <div>
              <h3>Teknolojiler</h3>
              <p>Python · FastAPI · OpenCV/YOLO · Kalman filtresi / PID kontrol · C++ (Raspberry Pi Pico 2) · Vue 3 · Three.js (3B dijital ikiz)</p>
              <a href={TEKNOFEST.github} target="_blank" rel="noopener noreferrer">Kaynak kod (GitHub) →</a>
            </div>
            <figure className={s.trophy}>
              <img src="/img/teknofest-odul.webp" alt="En İyi Sistem Tasarımı ödülü" />
            </figure>
          </div>
        </section>

        <section className={s.section}>
          <h2>Tareti yazan kişinin diğer işleri</h2>
          <div className={s.others}>
            <div><b>{STATS.prs}</b><span>Dünya çapında kullanılan {STATS.repos} açık kaynak projeye kabul edilen kod katkısı</span></div>
            <div><b>1.</b><span>Monad Blitz blockchain hackathonu, 2025</span></div>
            <div><b>100+</b><span>kullanıcılı canlı ürün: Zenith Trader</span></div>
            <div><b>%92</b><span>BGTS stajında yazdığım yapay zekâ servisinin doğru belgeyi ilk 5 sonuçta bulma oranı</span></div>
          </div>
          <p className={s.ctas}>
            <a className={s.primary} href={ME.mailto}>E-posta gönder</a>
            <a href={ME.cv} download>CV’yi indir</a>
            <a href={ME.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={ME.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </p>
        </section>
      </main>
      <KNav n={8} />
    </>
  );
}
