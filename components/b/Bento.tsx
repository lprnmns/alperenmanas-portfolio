import { BENTO, LINK, OSS_REPOS, type Lang } from '@/lib/bento';
import { getActivity } from '@/lib/github';
import { Awards } from './Awards';
import { Products } from './Products';
import { Heatmap } from './Heatmap';
import s from './b.module.css';

const fmt = (n: number, lang: Lang) => n.toLocaleString(lang === 'tr' ? 'tr-TR' : 'en-US');

export async function Bento({ lang }: { lang: Lang }) {
  const t = BENTO[lang];
  const act = await getActivity();
  return (
    <div className={s.page}>
      <div className={s.wrap}>
        <header className={`${s.card} ${s.bar}`}>
          <nav className={s.barLinks}>
            <a href={LINK.github} target="_blank" rel="noopener noreferrer">⌥ {t.nav.github} ↗</a>
            <a href={LINK.cv} target="_blank" rel="noopener noreferrer">▤ {t.nav.cv} ↗</a>
            <a href="#iletisim">✉ {t.nav.contact}</a>
          </nav>
          <span className={s.lang}>
            <a href="/en?lang=en" className={lang === 'en' ? s.langOn : ''}>EN</a>
            <a href="/?lang=tr" className={lang === 'tr' ? s.langOn : ''}>TR</a>
          </span>
        </header>

        <main className={s.grid}>
          {/* Tanıtım */}
          <section className={s.intro}>
            <h1 className={s.name}>Alperen<br />Manas</h1>
            <p className={s.role}>{t.role}</p>
            <p className={s.sub}>{t.sub}</p>
            <ul className={s.bullets}>
              {t.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
            <p className={s.pills}>
              <span className={s.pillGreen}><i />{t.seek}</span>
              <span className={s.pill}>{t.relocate}</span>
            </p>
          </section>

          <div className={s.awardCell}><Awards items={t.awards} /></div>
          <div className={s.productCell}><Products items={t.products} howT={t.profile.howT} /></div>

          {/* Deneyim */}
          <section className={`${s.card} ${s.exp}`}>
            <p className={s.label}><span className={s.labelIcon}>▣</span>{t.exp.label}</p>
            {t.exp.items.map((e) => (
              <article key={e.org} className={s.job}>
                <span className={s.logo}>{e.logo}</span>
                <div>
                  <h3>{e.org}</h3>
                  <p className={s.when}>{e.when}</p>
                  <p className={s.jobText}>{e.text}{e.url && <> <a href={e.url} target="_blank" rel="noopener noreferrer">↗</a></>}</p>
                </div>
              </article>
            ))}
          </section>

          {/* Açık kaynak */}
          <section className={`${s.card} ${s.oss}`}>
            <div className={s.ossHead}>
              <div>
                <p className={s.label}><span className={s.labelIcon}>⇄</span>{t.oss.label}</p>
                <h2 className={s.ossTitle}>{t.oss.title}</h2>
              </div>
              <div className={s.ossNums}>
                <div><b>150</b><span>{t.oss.n1}</span></div>
                <div><b>56</b><span>{t.oss.n2}</span></div>
              </div>
            </div>
            <div className={s.deep}>
              <a href="https://github.com/meriyah/meriyah/pulls?q=is%3Apr+author%3Alprnmns+is%3Amerged" target="_blank" rel="noopener noreferrer">
                <img src="https://github.com/meriyah.png?size=64" alt="" width={32} height={32} loading="lazy" />
                <span><b>meriyah</b><em>{t.oss.meriyah}</em></span>
                <strong>23 {t.oss.contrib}</strong>
              </a>
              <a href="https://github.com/mitsuhiko/minijinja/pulls?q=is%3Apr+author%3Alprnmns+is%3Amerged" target="_blank" rel="noopener noreferrer">
                <img src="https://github.com/mitsuhiko.png?size=64" alt="" width={32} height={32} loading="lazy" />
                <span><b>minijinja</b><em>{t.oss.minijinja}</em></span>
                <strong>15 {t.oss.contrib}</strong>
              </a>
            </div>
            <div className={s.repos}>
              {OSS_REPOS.map((r) => (
                <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer" title={lang === 'tr' ? r.tr : r.en}>
                  <img src={`https://github.com/${r.org}.png?size=48`} alt="" width={22} height={22} loading="lazy" />
                  <span>{r.name}</span>
                  <em>★ {r.stars}</em>
                </a>
              ))}
            </div>
            <p className={s.lastLine}>
              <span className={s.pulse} /> <b>{t.oss.last}</b> · {t.oss.lastWhen} · {t.oss.lastText}
              <a href={LINK.allPrs} target="_blank" rel="noopener noreferrer">{t.oss.all} ↗</a>
            </p>
          </section>

          {/* GitHub aktivitesi */}
          <section className={`${s.card} ${s.gh}`}>
            <div className={s.ghHead}>
              <div>
                <h2 className={s.ghTitle}><span className={s.labelIcon}>⌥</span>{t.gh.title}</h2>
                <p className={s.ghSub}>{t.gh.sub}</p>
              </div>
              <div className={s.ghNums}>
                <span><b>{fmt(act.total, lang)}</b> {t.gh.total}</span>
                <span><b>{act.active30}/30</b> {t.gh.active}</span>
                <span><b>{act.streak}</b> {t.gh.streak}</span>
              </div>
            </div>
            <Heatmap days={act.days.slice(-364)} months={t.gh.months} />
            <a className={s.ghLink} href={LINK.github} target="_blank" rel="noopener noreferrer">{t.gh.visit} ↗</a>
          </section>

          {/* Profil */}
          <section className={`${s.card} ${s.profile}`} id="iletisim">
            <p className={s.label}><span className={s.labelIcon}>◎</span>{t.profile.label}</p>
            <h3>{t.profile.edu}</h3>
            <p className={s.muted}>{t.profile.eduSub}</p>
            <h3>{t.profile.sic}</h3>
            <p className={s.muted}>{t.profile.sicSub}</p>
            <p className={s.roles}>{t.profile.roles.map((r) => <span key={r}>{r}</span>)}</p>
            <p className={s.meta}>◷ {t.profile.ime}</p>
            <p className={s.meta}>⌖ {t.profile.where}</p>
            <p className={s.meta}>◐ {t.profile.lang}</p>
            <h3>{t.profile.awardsT}</h3>
            <ul className={s.awardList}>{t.profile.awards.map((a) => <li key={a}>{a}</li>)}</ul>
            <h3>{t.profile.certsT}</h3>
            <p className={s.muted}>{t.profile.certs}</p>
            <div className={s.contact}>
              <a className={s.cta} href={LINK.mail}>{LINK.email}</a>
              <a className={s.ghost} href={LINK.cv} target="_blank" rel="noopener noreferrer">{t.contact.cv}</a>
              <a className={s.ghost} href={LINK.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
