'use client';
import { useEffect, useState } from 'react';
import { ME, STATS } from '@/lib/k';
import s from './s.module.css';

type Work = { t: string; d: string; img?: string; url?: string; stat?: string };
type Track = { k: string; label: string; why: string; works: Work[] };

const W: Record<string, Work> = {
  teknofest: { t: 'TEKNOFEST 2026 hava savunma tareti', d: 'Finalist ve En İyi Sistem Tasarımı ödülü. Takip, atış kontrolü, seri haberleşme ve operatör konsolu yazılımını yazdım.', img: '/img/teknofest-taret.webp', stat: '12 hedefin 11’i', url: 'https://github.com/lprnmns/target-tracking-engagement-system' },
  bgts: { t: 'BGTS stajı: belge soru-cevap yapay zekâ servisi', d: 'Doğru belgeyi %92 oranında ilk 5 sonuçta buluyor; cevaplayamayacağı soruda uydurmak yerine “bilmiyorum” diyor.', stat: '239 test', url: 'https://github.com/lprnmns/document-intelligence' },
  oss: { t: `${STATS.prs} kabul edilen açık kaynak katkısı`, d: `Dünya çapında kullanılan ${STATS.repos} projede (Vite, Microsoft Semantic Kernel, Node.js…) hataları bulup testle kanıtlayarak düzelttim.`, stat: `${STATS.repos} proje`, url: ME.allPrs },
  klinik: { t: 'Klinik Akış AI', d: 'Kliniklere WhatsApp’tan gelen randevu taleplerini yapay zekâyla karşılayan, takvime yazan, gerektiğinde personele devreden ürün.', img: '/img/klinik-panel.webp', url: 'https://klinikakis.com' },
  sk: { t: 'Microsoft Semantic Kernel katkısı', d: 'Microsoft’un yapay zekâ kütüphanesinde, fonksiyon boş sonuç döndürünce oluşan çökmeyi düzelttim.', url: 'https://github.com/microsoft/semantic-kernel/pull/14375' },
  zenith: { t: 'Zenith Trader', d: 'Başarılı kripto yatırımcılarının işlemlerini kullanıcı hesaplarına gerçek zamanlı kopyalayan canlı platform.', img: '/img/zenith.webp', stat: '100+ kullanıcı', url: 'https://zenithtrader.alperenmanas.app' },
  monad: { t: 'Monad Blitz blockchain hackathonu', d: 'Hackathon süresince ürün fikri geliştirip sundum ve birinci oldum.', img: '/img/monad-blitz.webp', stat: 'Birincilik' },
  meriyah: { t: 'meriyah: 23 doğruluk düzeltmesi', d: 'Ayda 43 milyon indirilen JavaScript parser’ında dilin kurallarına aykırı davranışları bulup düzelttim.', stat: '23 düzeltme', url: 'https://github.com/meriyah/meriyah/pulls?q=is%3Apr+author%3Alprnmns+is%3Amerged' },
};

const TRACKS: Track[] = [
  { k: 'savunma', label: 'Savunma / gömülü', why: 'Savunma yazılımında hata pahalıdır. Gerçek zamanlı bir taret sistemini sahada çalıştırdım ve hataları kanıtla yakalamayı alışkanlık hâline getirdim.', works: [W.teknofest, W.oss, W.bgts] },
  { k: 'ai', label: 'Yapay zekâ / LLM', why: 'Yapay zekâyı demo olarak değil, ölçerek ve test ederek gerçek işe koymayı seviyorum.', works: [W.bgts, W.klinik, W.sk] },
  { k: 'fintech', label: 'Fintech / blockchain', why: 'Para hareket ettiren yazılımda doğruluk her şeydir. Canlı bir trading ürünü geliştirdim, blockchain hackathonu kazandım.', works: [W.zenith, W.monad, W.meriyah] },
  { k: 'yazilim', label: 'Genel yazılım', why: 'Farklı kod tabanlarına hızlı giriyorum: dünya çapında kullanılan projelere katkı veriyor, kendi ürünlerimi uçtan uca geliştiriyorum.', works: [W.oss, W.zenith, W.bgts] },
];

export function ForCompany() {
  const [firma, setFirma] = useState('');
  const [alan, setAlan] = useState('yazilim');
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.get('firma')) setFirma(q.get('firma')!);
    if (q.get('alan') && TRACKS.some((t) => t.k === q.get('alan'))) setAlan(q.get('alan')!);
  }, []);
  const t = TRACKS.find((x) => x.k === alan)!;

  return (
    <>
      <div className={s.preview}>
        <span>Önizleme: firma alanı</span>
        {TRACKS.map((x) => (
          <button key={x.k} className={x.k === alan ? s.on : ''} onClick={() => setAlan(x.k)}>{x.label}</button>
        ))}
        <span className={s.previewNote}>Bu çubuk yalnızca önizlemede görünür. Örnek link: <code>/9?firma=Örnek%20A.Ş.&amp;alan=ai</code></span>
      </div>
      <main className={s.page}>
        <p className={s.to}>{firma ? `${firma} ekibi için hazırlandı` : 'Sizin için hazırlandı'}</p>
        <h1 className={s.h1}>Merhaba{firma ? ` ${firma}` : ''},</h1>
        <p className={s.letter}>
          Ben {ME.name}, {ME.school} {ME.dept} {ME.year} öğrencisiyim. <b>{ME.ime}</b> İME stajı yapacağım ve bunu sizinle yapmak istiyorum.
          {' '}{t.why}
        </p>
        <p className={s.facts}>
          <span>{ME.imeShort}</span><span>{ME.roles.join(' · ')}</span><span>{ME.relocate}</span><span>GNO {ME.gpa}</span>
        </p>
        <h2 className={s.h2}>Sizin alanınızla ilgili üç işim</h2>
        <div className={s.works}>
          {t.works.map((w, i) => (
            <article key={w.t} className={s.work}>
              {w.img ? <img src={w.img} alt="" loading="lazy" /> : <div className={s.noimg}><b>{w.stat}</b></div>}
              <div className={s.workBody}>
                <span className={s.workN}>{i + 1}</span>
                <h3>{w.t}</h3>
                {w.stat && w.img && <p className={s.stat}>{w.stat}</p>}
                <p>{w.d}</p>
                {w.url && <a href={w.url} target="_blank" rel="noopener noreferrer">İncele →</a>}
              </div>
            </article>
          ))}
        </div>
        <div className={s.sign}>
          <div>
            <p>Görüşmek isterseniz en hızlı e-postayla dönüyorum.</p>
            <p className={s.signName}>— {ME.name}</p>
          </div>
          <p className={s.ctas}>
            <a className={s.primary} href={ME.mailto}>E-posta gönder</a>
            <a href={ME.cv} download>CV’yi indir</a>
            <a href={ME.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </p>
        </div>
        <p className={s.other}>Diğer işlerim: Monad Blitz birinciliği · TEKNOFEST 2026 finalisti · {STATS.prs} kabul edilen açık kaynak katkısı · Zenith Trader (100+ kullanıcı) · <a href="/">Tüm portföy</a></p>
      </main>
    </>
  );
}
