import { DEMO, ME, PRS, STATS } from '@/lib/k';
import { KNav } from '@/components/k/KNav';
import { BugDemo } from '@/components/k/BugDemo';
import s from './s.module.css';

export const metadata = { title: 'Konsept 3 · Hata Laboratuvarı', robots: { index: false } };

const CASES = PRS.filter((p) => p.id !== 'meriyah-671' && p.id !== 'mui-49090').slice(0, 9);

const STEPS = [
  { t: 'Doğruyu tanımla', d: 'Bir referans seç: dilin resmî kuralları (spesifikasyon), resmî test seti ya da aynı işi yapan başka bir program.' },
  { t: 'Binlerce girdi üret', d: 'Rastgele kod örnekleri üreten küçük bir program yazdım. Her örneği hem incelediğim programa hem referansa verdim.' },
  { t: 'Farkları yakala', d: 'İkisinin farklı cevap verdiği her örnek bir hata adayı. AI destekli kod incelemesiyle şüpheli yeri daralttım.' },
  { t: 'Kuralla doğrula', d: 'Hangisinin haklı olduğunu spesifikasyondan kontrol ettim. Referans da yanılıyor olabilir.' },
  { t: 'Testle kanıtla, düzelt', d: 'Hatayı en küçük örneğe indirip test yazdım; düzeltme olmadan test başarısız, düzeltmeyle başarılı.' },
  { t: 'Projeye gönder', d: 'Kodu ve testi projeye önerdim. Projenin sorumluları inceleyip kabul etti; düzeltme 7.4.1 sürümüyle herkese ulaştı.' },
];

export default function Page() {
  return (
    <>
      <div className={s.page}>
        <section className={s.hero}>
          <div className={s.id}>
            <p className={s.kicker}>Hata Laboratuvarı · Vaka 001</p>
            <h1 className={s.h1}>{ME.name}</h1>
            <p className={s.sub}>{ME.dept} {ME.year} · {ME.school}</p>
            <p className={s.avail}><span className={s.dot} /> {ME.ime} İME stajı arıyorum · {ME.relocate}</p>
            <p className={s.roles}>{ME.roles.map((r) => <span key={r}>{r}</span>)}</p>
            <p className={s.pitch}>
              Yaygın kullanılan yazılımlardaki hataları bulup <b>testle kanıtlayarak</b> düzeltiyorum. Şimdiye kadar {STATS.repos} projeye {STATS.prs} düzeltmem kabul edildi.
              Sağdaki demo bunlardan birini, <b>gerçek kodu tarayıcınızda çalıştırarak</b> gösteriyor.
            </p>
            <p className={s.ctas}>
              <a className={s.primary} href={ME.cv} download>CV’yi indir</a>
              <a href={ME.mailto}>E-posta gönder</a>
              <a href={ME.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            </p>
          </div>
          <div className={s.demoWrap}>
            <BugDemo />
          </div>
        </section>

        <section className={s.section}>
          <h2>Bu hata nasıl bulundu?</h2>
          <p className={s.lead}>{DEMO.howFound}</p>
          <ol className={s.steps}>
            {STEPS.map((x, i) => (
              <li key={x.t}>
                <span className={s.stepN}>{i + 1}</span>
                <b>{x.t}</b>
                <span>{x.d}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className={s.section}>
          <h2>Laboratuvar kayıtları</h2>
          <p className={s.lead}>Aynı yöntemle bulduğum ve projelerine kabul edilen başka düzeltmeler. Her birinde ne bozuktu, sade dille:</p>
          <div className={s.cases}>
            {CASES.map((p, i) => (
              <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className={s.case}>
                <span className={s.caseN}>Vaka {String(i + 2).padStart(3, '0')} · {p.dateTr}</span>
                <span className={s.caseRepo}>{p.name} <em>★ {p.stars}</em></span>
                <span className={s.caseWhat}>{p.what}</span>
                <span className={s.caseBug}><b>Sorun:</b> {p.plain}</span>
                <span className={s.caseMeta}>Kanıt: {p.test}{p.reference ? ` · Referans: ${p.reference}` : ''}</span>
                <span className={s.caseMeta}>Kabul eden: {p.mergedByWho}</span>
              </a>
            ))}
          </div>
          <p className={s.all}><a href={ME.allPrs} target="_blank" rel="noopener noreferrer">{STATS.prs} kaydın tamamı →</a></p>
        </section>

        <section className={s.section}>
          <div className={s.contact}>
            <div>
              <h2>Ekibinizdeki hataları da bulayım.</h2>
              <p>{ME.ime} İME için müsaitim. En hızlı e-postayla dönüyorum.</p>
            </div>
            <p className={s.ctas}>
              <a className={s.primary} href={ME.mailto}>{ME.email}</a>
              <a href={ME.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </p>
          </div>
        </section>
      </div>
      <KNav n={3} />
    </>
  );
}
