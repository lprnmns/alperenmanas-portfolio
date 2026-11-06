import { ME } from '@/lib/k';
import { KNav } from '@/components/k/KNav';
import { MergeTabs } from './MergeTabs';
import s from './s.module.css';

export const metadata = { title: 'Konsept 7 · Birleştirme İsteği', robots: { index: false } };

export default function Page() {
  return (
    <>
      <main className={s.page}>
        <p className={s.explain}>
          <b>Bu sayfa ne?</b> Yazılımcılar bir değişiklik önerirken “birleştirme isteği” açar; ekip inceler, beğenirse kabul eder.
          Ben de kendimi ekibinize aynı biçimde öneriyorum.
        </p>
        <header className={s.head}>
          <h1 className={s.h1}>İME stajyeri ekle: {ME.name} <span className={s.num}>#2027</span></h1>
          <p className={s.status}>
            <span className={s.open}>● Açık</span>
            <span><b>{ME.name}</b>, <code>alperen/ime-2027</code> dalını <code>ekibiniz/main</code> dalına eklemek istiyor</span>
          </p>
        </header>
        <div className={s.grid}>
          <MergeTabs />
          <aside className={s.side}>
            <div><p className={s.sideK}>İnceleyen</p><p>Siz</p></div>
            <div><p className={s.sideK}>Etiketler</p><p className={s.labels}>{ME.roles.map((r) => <span key={r}>{r}</span>)}<span className={s.lGreen}>taşınmaya açık</span></p></div>
            <div><p className={s.sideK}>Kilometre taşı</p><p>İME · {ME.imeShort}</p></div>
            <div><p className={s.sideK}>Eğitim</p><p>{ME.school}<br />{ME.dept} {ME.year} · GNO {ME.gpa}</p></div>
            <img src="/img/monad-blitz.webp" alt="Alperen Manas, Monad Blitz birinciliği" className={s.sidePhoto} />
          </aside>
        </div>
        <div className={s.mergeBox}>
          <span className={s.mergeIcon}>✓</span>
          <div>
            <p className={s.mergeT}>Bu öneri birleştirilmeye hazır</p>
            <p className={s.mergeD}>Çakışma yok. {ME.ime} başlayabilirim.</p>
          </div>
          <p className={s.mergeBtns}>
            <a className={s.mergeBtn} href={ME.mailto}>Görüşme ayarla</a>
            <a href={ME.cv} download>CV’yi indir</a>
          </p>
        </div>
      </main>
      <KNav n={7} />
    </>
  );
}
