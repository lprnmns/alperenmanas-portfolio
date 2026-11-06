import { CONCEPTS } from '@/lib/concepts';
import s from './s.module.css';

export const metadata = { title: 'Konseptler · Alperen Manas', robots: { index: false } };

export default function Page() {
  return (
    <main className={s.wrap}>
      <p className={s.kicker}>Portföy konseptleri · yerel karşılaştırma</p>
      <h1 className={s.h1}>11 konsept, aynı içerik</h1>
      <p className={s.lead}>
        Hepsi aynı doğrulanmış bilgiyi kullanıyor; yalnızca anlatım biçimi farklı. Her sayfanın altında gezinme çubuğu var (← →).
        Hedef: teknik olmayan bir İK çalışanı da, bir mühendis de sayfayı açtığında kim olduğunu ve neden farklı olduğunu anlasın.
      </p>
      <ol className={s.grid}>
        <li>
          <a href="/" className={s.card}>
            <span className={s.n}>0</span>
            <span className={s.name}>Şu anki sade sürüm</span>
            <span className={s.idea}>Önizlemede duran, yayına hazır tek sayfa.</span>
          </a>
        </li>
        {CONCEPTS.map((c) => (
          <li key={c.n}>
            <a href={`/${c.n}`} className={s.card}>
              <span className={s.n}>{c.n}</span>
              <span className={s.name}>{c.name}</span>
              <span className={s.idea}>{c.idea}</span>
              <span className={s.src}>{c.src}</span>
            </a>
          </li>
        ))}
      </ol>
      <p className={s.check}>
        Her konsepti şu 5 soruyla test et (ilk 10 saniyede cevaplanmalı): Kaçıncı sınıf? Hangi rolleri arıyor? Ne zaman başlayabilir?
        En güçlü iki kanıtı ne? Nasıl iletişim kurulur?
      </p>
    </main>
  );
}
