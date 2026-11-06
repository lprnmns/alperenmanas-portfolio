'use client';
import { useState } from 'react';
import { ME, PRS, STATS, TEKNOFEST } from '@/lib/k';
import { BugDemo } from '@/components/k/BugDemo';
import s from './s.module.css';

export function TwoSpeeds() {
  const [mode, setMode] = useState<'hr' | 'eng'>('hr');
  return (
    <>
      <div className={s.choose} role="tablist" aria-label="İnceleme biçimi">
        <button role="tab" aria-selected={mode === 'hr'} className={mode === 'hr' ? s.on : ''} onClick={() => setMode('hr')}>
          <span className={s.cT}>30 saniyelik özet</span>
          <span className={s.cD}>Sınıf, müsaitlik, roller, ödüller ve CV. İK için.</span>
        </button>
        <button role="tab" aria-selected={mode === 'eng'} className={mode === 'eng' ? s.on : ''} onClick={() => setMode('eng')}>
          <span className={s.cT}>Teknik inceleme</span>
          <span className={s.cD}>Kod katkıları, testler, mimari, canlı demo. Mühendisler için.</span>
        </button>
      </div>

      {mode === 'hr' ? (
        <section className={s.hr}>
          <dl className={s.qa}>
            <div><dt>Kaçıncı sınıf?</dt><dd>{ME.dept} <b>{ME.year}</b>, {ME.school}. GNO {ME.gpa}, mezuniyet {ME.grad}.</dd></div>
            <div><dt>Ne arıyor, ne zaman?</dt><dd><b>İME stajı</b> · {ME.ime}. {ME.relocate}.</dd></div>
            <div><dt>Hangi roller?</dt><dd>{ME.roles.map((r) => <span key={r} className={s.role}>{r}</span>)}</dd></div>
            <div><dt>Deneyimi?</dt><dd>BGTS’de yapay zekâ mühendisliği stajı (2026), PTT’de DevOps stajı (2025).</dd></div>
          </dl>
          <h3 className={s.h3}>Onu farklı kılan dört şey</h3>
          <div className={s.proofs}>
            <figure>
              <img src="/img/monad-blitz.webp" alt="Monad Blitz birinciliği" />
              <figcaption><b>Hackathon birinciliği</b>Monad Blitz blockchain hackathonu, 2025</figcaption>
            </figure>
            <figure>
              <img src="/img/teknofest-odul.webp" alt="TEKNOFEST ödülü" />
              <figcaption><b>TEKNOFEST 2026 finalisti</b>En İyi Sistem Tasarımı ödülü · finalde 12 hedefin 11’i</figcaption>
            </figure>
            <div className={s.bigCard}>
              <b>{STATS.prs}</b>
              <span>Dünya çapında kullanılan {STATS.repos} yazılım projesine kabul edilen kod katkısı</span>
              <em>Microsoft, Node.js, Vite, three.js gibi projelerin sorumluları kodunu inceleyip projelerine aldı.</em>
            </div>
            <div className={s.bigCard}>
              <b>100+</b>
              <span>kullanıcıya ulaşan kendi ürünü</span>
              <em>Zenith Trader canlıda; ikinci ürünü Klinik Akış AI kliniklerin randevu akışını yapay zekâyla yönetiyor.</em>
            </div>
          </div>
          <p className={s.ctas}>
            <a className={s.primary} href={ME.cv} download>CV’yi indir (PDF)</a>
            <a href={ME.mailto}>E-posta gönder</a>
            <a href={ME.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </p>
        </section>
      ) : (
        <section className={s.eng}>
          <div className={s.engGrid}>
            <div>
              <h3 className={s.h3}>Yöntem</h3>
              <p>Bir referans seçiyorum (spesifikasyon, resmî test seti veya alternatif uygulama), rastgele girdilerle iki tarafı karşılaştırıyorum (differential testing / fuzzing), adayları AI destekli kod incelemesiyle daraltıyorum. Her düzeltme, düzeltme olmadan başarısız olan bir regresyon testiyle gidiyor.</p>
              <p className={s.small}>meriyah {STATS.meriyah} merge · minijinja {STATS.minijinja} merge · toplam {STATS.prs} merge / {STATS.repos} repo (kendi repolarım hariç)</p>
            </div>
            <BugDemo compact />
          </div>
          <h3 className={s.h3}>Seçilmiş merge’ler</h3>
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead><tr><th>Repo</th><th>★</th><th>npm/ay</th><th>Değişiklik</th><th>Diff</th><th>Merge eden</th></tr></thead>
              <tbody>
                {PRS.map((p) => (
                  <tr key={p.id}>
                    <td><a href={p.url} target="_blank" rel="noopener noreferrer">{p.repo}#{p.num}</a></td>
                    <td>{p.stars}</td>
                    <td>{p.downloads?.replace(' milyon/ay', 'M') ?? '—'}</td>
                    <td><code>{p.title}</code></td>
                    <td className={s.diff}><span>+{p.plus}</span> <span>−{p.minus}</span></td>
                    <td>{p.mergedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={s.engGrid}>
            <div>
              <h3 className={s.h3}>TEKNOFEST taret · veri akışı</h3>
              <ol className={s.pipe}>
                {TEKNOFEST.pipeline.map((x) => (
                  <li key={x.t} className={x.mine ? s.mine : ''}><b>{x.t}</b><span>{x.d}</span></li>
                ))}
              </ol>
              <p className={s.small}>Koyu kutular benim yazdığım katmanlar. Python · FastAPI · OpenCV/YOLO · Kalman/PID · C++ (Pico 2) · Vue 3. <a href={TEKNOFEST.github} target="_blank" rel="noopener noreferrer">Kaynak</a></p>
            </div>
            <div>
              <h3 className={s.h3}>BGTS · RAG servisi</h3>
              <ul className={s.list}>
                <li>Hibrit arama: dense + BM25 → RRF; reranker ölçüme göre kapalı (Hybrid RRF Recall@5 0.92 &gt; +reranker 0.91)</li>
                <li>44 vaka, dev/val/test ayrımı (19/11/14); kaynak gösteren yanıt, answerability gate ile LLM’siz ret</li>
                <li>239 test · mypy strict · Docker Compose · Qdrant · Ollama</li>
              </ul>
              <a href="https://github.com/lprnmns/document-intelligence" target="_blank" rel="noopener noreferrer">Kaynak ve benchmark’lar →</a>
              <h3 className={s.h3}>Stack</h3>
              <p>TypeScript, Python, Go, Rust, C#, SQL · Node.js, FastAPI, Next.js, Vue · Docker, Linux · pytest, fuzzing</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
