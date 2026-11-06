import { BY_DATE, ME, STATS } from '@/lib/k';
import { KNav } from '@/components/k/KNav';
import { Timeline } from '@/components/k/Timeline';
import { Glossary } from '@/components/k/Term';
import s from './s.module.css';

export const metadata = { title: 'Konsept 2 · Canlı Mühendislik Günlüğü', robots: { index: false } };

export default function Page() {
  const last = BY_DATE[0];
  return (
    <>
      <div className={s.layout}>
        <aside className={s.side}>
          <img src="/img/teknofest-odul.webp" alt="Alperen Manas, TEKNOFEST 2026 ödülüyle" className={s.photo} />
          <h1 className={s.name}>{ME.name}</h1>
          <p className={s.meta}>{ME.dept} {ME.year} öğrencisi<br />{ME.school} · GNO {ME.gpa}</p>
          <div className={s.avail}>
            <span className={s.dot} />
            <div>
              <b>İME stajı arıyorum</b>
              <span>{ME.ime}</span>
              <span>{ME.relocate}</span>
            </div>
          </div>
          <p className={s.label}>İlgilendiğim pozisyonlar</p>
          <p className={s.roles}>{ME.roles.map((r) => <span key={r}>{r}</span>)}</p>
          <dl className={s.nums}>
            <div><dt>{STATS.prs}</dt><dd>kabul edilen kod katkısı</dd></div>
            <div><dt>{STATS.repos}</dt><dd>açık kaynak proje</dd></div>
            <div><dt>1.</dt><dd>blockchain hackathonu</dd></div>
            <div><dt>Finalist</dt><dd>TEKNOFEST 2026</dd></div>
          </dl>
          <p className={s.ctas}>
            <a className={s.primary} href={ME.cv} download>CV’yi indir</a>
            <a href={ME.mailto}>E-posta</a>
            <a href={ME.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={ME.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </p>
        </aside>

        <main className={s.main}>
          <div className={s.signal}>
            <span className={s.pulse} aria-hidden="true" />
            <div>
              <p className={s.signalK}>Son sinyal · {last.dateTr}</p>
              <p className={s.signalT}>
                <b>{last.name}</b> projesine bir düzeltmem kabul edildi: {last.plain}
              </p>
            </div>
          </div>
          <h2 className={s.h2}>Ne üzerinde çalışıyorum?</h2>
          <p className={s.lead}>
            Kod yazmak benim için hobi gibi; aşağıdaki akış bunun kaydı. Mavi noktalar dünya çapında kullanılan projelere kabul edilen kod katkılarım,
            sarı noktalar ödüller, ürünler ve stajlar. Her katkının altında projenin ne olduğu ve kanıtı var.
          </p>
          <Timeline />
          <Glossary />
        </main>
      </div>
      <KNav n={2} />
    </>
  );
}
