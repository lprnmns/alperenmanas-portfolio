'use client';
import { useState } from 'react';
import { ME, PRS, STATS } from '@/lib/k';
import s from './s.module.css';

const CHECKS = [
  { t: 'Sınıf', d: `${ME.dept} ${ME.year} öğrencisi · ${ME.school} · GNO ${ME.gpa}` },
  { t: 'Müsaitlik', d: `${ME.ime}` },
  { t: 'Konum', d: 'Şehir fark etmez, taşınmaya açığım' },
  { t: 'Gerçek kod tabanlarında deneyim', d: `${STATS.repos} açık kaynak projeye ${STATS.prs} kod katkım kabul edildi` },
  { t: 'Ödüller', d: 'Monad Blitz hackathonu birinciliği · TEKNOFEST 2026 finalisti, En İyi Sistem Tasarımı' },
  { t: 'Canlı ürün', d: 'Zenith Trader 100’den fazla kullanıcıya ulaştı; Klinik Akış AI yayında' },
  { t: 'Testler', d: 'Stajda yazdığım yapay zekâ servisi 239 otomatik testle korunuyor' },
];

const DIFF = [
  { f: 'acik-kaynak/', lines: [`+ ${STATS.prs} kabul edilen kod katkısı, ${STATS.repos} projede`, '+ meriyah: 23 düzeltme (ayda 43 milyon indirilen JavaScript parser’ı)', '+ minijinja: 15 düzeltme (Flask’ın yaratıcısının projesi)', '+ Vite, Microsoft Semantic Kernel, Node.js undici, three.js, KaTeX…'] },
  { f: 'urunler/', lines: ['+ zenith-trader: canlı copy-trading platformu · 100+ kullanıcı', '+ klinik-akis-ai: WhatsApp’tan randevu alan yapay zekâ asistanı'] },
  { f: 'deneyim/', lines: ['+ bgts: yapay zekâ mühendisliği stajı (Tem–Eyl 2026) · RAG servisi, 239 test', '+ ptt: DevOps stajı (Ağu 2025) · Docker, Linux'] },
  { f: 'oduller/', lines: ['+ monad-blitz-2025: birincilik', '+ teknofest-2026: finalist · En İyi Sistem Tasarımı · 12 hedefin 11’i'] },
  { f: 'beceriler/', lines: ['+ TypeScript, Python, Go, Rust, C#, SQL', '+ Node.js, FastAPI, Next.js, Vue · Docker, Linux', '+ RAG, vektör arama, yerel LLM, LLM API entegrasyonu'] },
];

const REVIEWERS = PRS.filter((p) => ['minijinja-1002', 'ce-9105', 'undici-6031', 'vite-23780', 'sk-14375', 'meriyah-671'].includes(p.id));

export function MergeTabs() {
  const [t, setT] = useState<'desc' | 'checks' | 'diff' | 'rev'>('desc');
  const tabs = [
    { k: 'desc', l: 'Açıklama' },
    { k: 'checks', l: `Kontroller ${CHECKS.length}` },
    { k: 'diff', l: 'Değişiklikler' },
    { k: 'rev', l: 'Kodumu kabul edenler' },
  ] as const;
  return (
    <div>
      <div className={s.tabs} role="tablist">
        {tabs.map((x) => (
          <button key={x.k} role="tab" aria-selected={t === x.k} className={t === x.k ? s.tabOn : ''} onClick={() => setT(x.k)}>{x.l}</button>
        ))}
      </div>
      <div className={s.tabBody}>
        {t === 'desc' && (
          <div className={s.desc}>
            <p><b>Özet:</b> Ekibinize {ME.ime} çalışacak bir {ME.roles.join(' / ')} stajyeri ekliyor.</p>
            <p>Kod yazmayı hobi gibi yapıyorum. Çözümü hemen belli olmayan problemlerle uğraşmayı seviyorum: dünya çapında kullanılan açık kaynak projelerde hataları bulup testle kanıtlayarak düzeltiyor, kendi ürünlerimi uçtan uca geliştiriyorum.</p>
            <p><b>Nasıl test edilir:</b> CV’yi açın, “Kontroller” sekmesine bakın, isterseniz “Kodumu kabul edenler” sekmesindeki bağlantılardan gerçek kayıtları kontrol edin.</p>
            <p className={s.links}><a href={ME.cv} download>CV (PDF)</a> · <a href={ME.github} target="_blank" rel="noopener noreferrer">GitHub</a> · <a href={ME.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
          </div>
        )}
        {t === 'checks' && (
          <ul className={s.checks}>
            {CHECKS.map((c) => (
              <li key={c.t}><span className={s.ok}>✓</span><div><b>{c.t}</b><span>{c.d}</span></div></li>
            ))}
            <li className={s.allOk}>Bütün kontroller geçti</li>
          </ul>
        )}
        {t === 'diff' && (
          <div className={s.diff}>
            <p className={s.diffNote}>Yeşil “+” satırları, bu öneri kabul edilirse ekibinize eklenenler.</p>
            {DIFF.map((d) => (
              <div key={d.f} className={s.file}>
                <p className={s.fileName}>{d.f}</p>
                <pre>{d.lines.join('\n')}</pre>
              </div>
            ))}
          </div>
        )}
        {t === 'rev' && (
          <div>
            <p className={s.diffNote}>
              Açık kaynak projelerde kodum, projenin sorumluları tarafından incelenip kabul edildi. Bunlar herkese açık kayıtlar; bir tavsiye mektubu değil,
              ama kodumun bu kişilerin standartlarını karşıladığını gösteriyor.
            </p>
            <ul className={s.revs}>
              {REVIEWERS.map((p) => (
                <li key={p.id}>
                  <img src={`https://github.com/${p.mergedBy}.png?size=80`} alt="" width={40} height={40} loading="lazy" />
                  <div>
                    <b>{p.mergedByWho}</b>
                    <span>{p.name} · {p.plain}</span>
                  </div>
                  <a href={p.url} target="_blank" rel="noopener noreferrer">Kaydı gör</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
