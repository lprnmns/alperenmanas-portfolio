import { ME, STATS } from '@/lib/k';
import { KNav } from '@/components/k/KNav';
import { Atlas } from './Atlas';
import s from './s.module.css';

export const metadata = { title: 'Konsept 5 · Mühendislik Haritası', robots: { index: false } };

export default function Page() {
  return (
    <>
      <main className={s.page}>
        <header className={s.head}>
          <div>
            <h1 className={s.h1}>{ME.name}</h1>
            <p className={s.sub}>{ME.dept} {ME.year} · {ME.school} · GNO {ME.gpa}</p>
          </div>
          <div className={s.seek}>
            <span className={s.dot} />
            <span><b>İME stajı arıyorum:</b> {ME.ime}. {ME.roles.join(', ')} pozisyonları. {ME.relocate}.</span>
          </div>
        </header>
        <p className={s.lead}>
          Farklı alanlarda çalıştım, ama hepsi birbirine bağlı: yazılımın doğru çalıştığını kanıtlamak, yapay zekâyı gerçek işe koymak, ürünü yayına almak
          ve sistemleri birbirine bağlamak. Harita, her alandaki gerçek işlerimi gösteriyor.
        </p>
        <Atlas />
        <section className={s.strip}>
          <div><b>{STATS.prs}</b><span>kabul edilen açık kaynak katkısı</span></div>
          <div><b>{STATS.repos}</b><span>farklı proje</span></div>
          <div><b>1.</b><span>Monad Blitz hackathonu</span></div>
          <div><b>11/12</b><span>TEKNOFEST finali isabet</span></div>
          <div className={s.stripCta}>
            <a href={ME.cv} download>CV’yi indir</a>
            <a href={ME.mailto}>E-posta</a>
            <a href={ME.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </section>
      </main>
      <KNav n={5} />
    </>
  );
}
