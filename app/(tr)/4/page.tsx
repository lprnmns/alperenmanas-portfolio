import { ME, STATS } from '@/lib/k';
import { KNav } from '@/components/k/KNav';
import { Studio } from './Studio';
import s from './s.module.css';

export const metadata = { title: 'Konsept 4 · Ürün Stüdyosu', robots: { index: false } };

export default function Page() {
  return (
    <>
      <main className={s.page}>
        <header className={s.head}>
          <div>
            <p className={s.who}><b>{ME.name}</b> · {ME.dept} {ME.year} · {ME.school}</p>
            <h1 className={s.h1}>Sadece demo değil.<br />İnsanların kullandığı ürünler.</h1>
            <p className={s.sub}>
              Fikirden canlı ürüne kadar her aşamayı geliştirdim: arayüz, sunucu, yapay zekâ, entegrasyonlar, yayına alma.
            </p>
          </div>
          <div className={s.card}>
            <p className={s.cardK}>Aradığım</p>
            <p className={s.cardT}>İME stajı · {ME.imeShort}</p>
            <p className={s.cardR}>{ME.roles.join(' · ')}</p>
            <p className={s.cardR}>{ME.relocate}</p>
            <p className={s.cardLinks}>
              <a className={s.primary} href={ME.cv} download>CV’yi indir</a>
              <a href={ME.mailto}>E-posta</a>
            </p>
          </div>
        </header>

        <Studio />

        <section className={s.behind}>
          <h2>Ürünlerin arkasındaki mühendislik</h2>
          <div className={s.behindGrid}>
            <div>
              <p className={s.big}>{STATS.prs}</p>
              <p>Dünya çapında kullanılan {STATS.repos} açık kaynak projeye kabul edilen kod katkısı. Vite, Microsoft Semantic Kernel, Node.js, three.js…</p>
              <a href={ME.github} target="_blank" rel="noopener noreferrer">GitHub profilim →</a>
            </div>
            <div>
              <img src="/img/teknofest-taret.webp" alt="TEKNOFEST taret sistemi" />
              <p><b>TEKNOFEST 2026 finalisti</b> · En İyi Sistem Tasarımı. Taretin takip, atış kontrolü ve operatör yazılımını yazdım.</p>
            </div>
            <div>
              <img src="/img/monad-blitz.webp" alt="Monad Blitz birinciliği" />
              <p><b>Monad Blitz 2025 birincisi.</b> Hackathon süresince ürün fikri geliştirip sundum.</p>
            </div>
          </div>
        </section>

        <section className={s.contact}>
          <h2>Sizin ürününüzde de çalışmak isterim.</h2>
          <p>{ME.ime} · {ME.relocate} · <a href={ME.mailto}>{ME.email}</a> · <a href={ME.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
        </section>
      </main>
      <KNav n={4} />
    </>
  );
}
