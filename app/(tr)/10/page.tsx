import { BY_DATE, ME, STATS, TEKNOFEST } from '@/lib/k';
import { KNav } from '@/components/k/KNav';
import s from './s.module.css';

export const metadata = { title: 'Konsept 10 · Manşet', robots: { index: false } };

export default function Page() {
  return (
    <>
      <main className={s.paper}>
        <header className={s.mast}>
          <p className={s.mastTop}><span>Sayı 4 · 4. sınıf</span><span>Ankara · 6 Kasım 2026, Cuma</span><span>{STATS.prs} katkı · {STATS.repos} proje</span></p>
          <p className={s.title}>Mühendislik Postası</p>
          <p className={s.mastSub}>Alperen Manas’ın çalışmaları hakkında tek sayfalık gazete · yazdırınca özgeçmiş olur</p>
        </header>

        <section className={s.headline}>
          <h1>Bilgisayar mühendisliği 4. sınıf öğrencisi, 8 Şubat 2027’de İME stajı için müsait</h1>
          <p className={s.deck}>
            {ME.school} öğrencisi {ME.name}, 14 haftalık tam zamanlı staj için {ME.roles.join(', ')} pozisyonlarına bakıyor. Şehir fark etmiyor; taşınmaya açık.
          </p>
        </section>

        <div className={s.grid}>
          <article className={s.lead}>
            <img src="/img/teknofest-odul.webp" alt="Alperen Manas, TEKNOFEST 2026 En İyi Sistem Tasarımı ödülüyle" />
            <p className={s.cap}>Manas, TEKNOFEST 2026’da takımının aldığı En İyi Sistem Tasarımı ödülüyle.</p>
            <h2>Kodu dünya çapındaki {STATS.repos} projeye kabul edildi</h2>
            <p className={s.body}>
              <span className={s.drop}>K</span>ırıkkale Üniversitesi’nde okuyan Alperen Manas, boş zamanında dünyanın dört bir yanında kullanılan açık kaynak
              yazılımlardaki hataları arıyor. Bulduğu her hatayı, hatanın varlığını kanıtlayan bir testle birlikte düzeltip projeye öneriyor. Şimdiye kadar
              {' '}{STATS.prs} önerisi projelerin sorumluları tarafından incelenip kabul edildi.
            </p>
            <p className={s.body}>
              Katkı verdiği projeler arasında Microsoft’un yapay zekâ kütüphanesi Semantic Kernel, web geliştirme aracı Vite ve Node.js’in internet kütüphanesi
              undici var. Ayda 43 milyon kez indirilen JavaScript parser’ı meriyah’a 23, Flask’ın yaratıcısı Armin Ronacher’ın minijinja projesine 15 düzeltme
              kazandırdı. “Çözümü hemen belli olmayan problemlerle uğraşmayı seviyorum” diyor.
            </p>
          </article>

          <div className={s.mid}>
            <article className={s.story}>
              <img src="/img/teknofest-taret.webp" alt="TEKNOFEST taret sistemi" />
              <h3>TEKNOFEST finalinde 12 hedefin 11’i vuruldu</h3>
              <p>{TEKNOFEST.plain} Takımın taretinde görüntü işleme dışındaki yazılımı Manas yazdı. Hareketli hedeflerde 8’de 7 isabet.</p>
            </article>
            <article className={s.story}>
              <img src="/img/monad-blitz.webp" alt="Monad Blitz birincilik ödülü" />
              <h3>Blockchain hackathonunda birincilik</h3>
              <p>Monad Blitz’de hackathon süresince geliştirip sunduğu ürün fikriyle birinci oldu.</p>
            </article>
            <article className={s.story}>
              <h3>Yaptığı uygulama 100 kullanıcıyı aştı</h3>
              <p>Kripto yatırımcılarının işlemlerini otomatik kopyalayan Zenith Trader canlıda. İkinci ürünü Klinik Akış AI, kliniklerin WhatsApp randevularını yapay zekâyla yönetiyor.</p>
            </article>
          </div>

          <aside className={s.side}>
            <div className={s.box}>
              <p className={s.boxT}>Son gelişmeler</p>
              <ul>
                {BY_DATE.slice(0, 6).map((p) => (
                  <li key={p.id}>
                    <b>{p.dateTr}</b> · {p.name}: {p.plain}
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.box}>
              <p className={s.boxT}>Staj ve eğitim</p>
              <p><b>BGTS (BilgeAdam)</b> · Yapay zekâ mühendisliği stajı, 2026. Yazdığı servis doğru belgeyi %92 oranında ilk 5 sonuçta buluyor.</p>
              <p><b>PTT</b> · DevOps stajı, 2025.</p>
              <p><b>Kırıkkale Üniversitesi</b> · GNO {ME.gpa} · Samsung Innovation Campus yapay zekâ programı.</p>
            </div>
            <div className={`${s.box} ${s.ad}`}>
              <p className={s.boxT}>İlan</p>
              <p className={s.adBig}>14 haftalık stajyer</p>
              <p>Backend · Full-stack · Yapay Zekâ. 8 Şubat 2027’den itibaren tam zamanlı.</p>
              <p className={s.adContact}>{ME.email}</p>
            </div>
          </aside>
        </div>

        <footer className={s.foot}>
          <span>Künye · {ME.name} · {ME.email}</span>
          <span><a href={ME.cv} download>CV (PDF)</a> · <a href={ME.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> · <a href={ME.github} target="_blank" rel="noopener noreferrer">GitHub</a></span>
        </footer>
      </main>
      <KNav n={10} />
    </>
  );
}
