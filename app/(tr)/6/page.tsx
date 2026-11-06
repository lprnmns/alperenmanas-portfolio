import { ME } from '@/lib/k';
import { KNav } from '@/components/k/KNav';
import { TwoSpeeds } from './TwoSpeeds';
import s from './s.module.css';

export const metadata = { title: 'Konsept 6 · İki Hız', robots: { index: false } };

export default function Page() {
  return (
    <>
      <main className={s.page}>
        <header className={s.head}>
          <img src="/img/teknofest-odul.webp" alt="" className={s.avatar} />
          <div>
            <h1 className={s.h1}>{ME.name}</h1>
            <p className={s.sub}>{ME.dept} {ME.year} · {ME.imeShort} İME stajı arıyorum · {ME.roles.join(' · ')}</p>
          </div>
        </header>
        <h2 className={s.ask}>Nasıl incelemek istersiniz?</h2>
        <TwoSpeeds />
      </main>
      <KNav n={6} />
    </>
  );
}
