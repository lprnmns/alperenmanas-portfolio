import { CONTENT, LINKS, type Lang } from '@/lib/content';
import { Icon } from './Icons';

function Ext({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export function Site({ lang }: { lang: Lang }) {
  const c = CONTENT[lang];

  return (
    <>
      <header className="top">
        <div className="wrap top-in">
          <a href={lang === 'tr' ? '/' : '/en'} className="brand">
            Alperen Manas
          </a>
          <nav className="nav" aria-label="Sections">
            <a href="#oss">{c.nav.oss}</a>
            <a href="#projects">{c.nav.projects}</a>
            <a href="#experience">{c.nav.experience}</a>
            <a href="#contact">{c.nav.contact}</a>
          </nav>
          <a className="lang" href={c.langSwitch.href} hrefLang={lang === 'tr' ? 'en' : 'tr'}>
            {c.langSwitch.label}
          </a>
        </div>
      </header>

      <main>
        {/* 1. İlk ekran: kim, ne arıyor, nasıl ulaşılır */}
        <section className="hero wrap">
          <div className="hero-text">
            <p className="avail">
              <span className="dot" aria-hidden="true" />
              {c.available}
            </p>
            <h1>{c.name}</h1>
            <p className="role">{c.role}</p>
            <p className="positions">
              <span className="positions-label">{c.positionsLabel}:</span>
              {c.positions.map((p) => (
                <span key={p} className="pos">
                  {p}
                </span>
              ))}
            </p>
            <p className="intro">{c.intro}</p>
            <p className="edu">{c.edu}</p>
            <div className="cta">
              <a className="btn primary" href={LINKS.cv} download>
                <Icon name="download" />
                {c.cta.cv}
              </a>
              <Ext className="btn" href={LINKS.github}>
                <Icon name="github" />
                GitHub
              </Ext>
              <Ext className="btn" href={LINKS.linkedin}>
                <Icon name="linkedin" />
                LinkedIn
              </Ext>
              <a className="btn" href={LINKS.email}>
                <Icon name="mail" />
                {c.cta.email}
              </a>
            </div>
          </div>
          <div className="hero-photos">
            {c.photos.map((ph, i) => (
              <figure key={ph.src} className={`polaroid p${i + 1}`}>
                <img src={ph.src} alt={ph.alt} width={ph.w} height={ph.h} fetchPriority={i === 0 ? 'high' : 'auto'} />
                <figcaption>
                  <Icon name={i === 0 ? 'trophy' : 'medal'} />
                  {ph.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* 2. Kanıt şeridi */}
        <section className="wrap">
          <ul className="proofs">
            {c.proofs.map((p) => (
              <li key={p.title} className="proof">
                <Icon name={p.icon} className="proof-icon" />
                <div>
                  <p className="proof-big">{p.big}</p>
                  <p className="proof-title">{p.title}</p>
                  <p className="proof-sub">{p.sub}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 3. Açık kaynak */}
        <section id="oss" className="wrap section">
          <h2>{c.oss.title}</h2>
          <p className="lead">{c.oss.lead}</p>

          <h3 className="sub">{c.oss.deepTitle}</h3>
          <div className="deep">
            {c.oss.deep.map((d) => (
              <article key={d.name} className="card deep-card">
                <div className="deep-head">
                  <Ext href={d.url} className="deep-name">
                    {d.name}
                  </Ext>
                  <span className="pill">{d.count}</span>
                </div>
                <p className="muted small">{d.meta}</p>
                <p>{d.text}</p>
                <p className="examples">
                  {d.examples.map((e) => (
                    <Ext key={e.url} href={e.url} className="chip">
                      <Icon name="merge" />
                      {e.label}
                    </Ext>
                  ))}
                </p>
              </article>
            ))}
          </div>

          <h3 className="sub">{c.oss.othersTitle}</h3>
          <ul className="fixes">
            {c.oss.others.map((f) => (
              <li key={f.url}>
                <Ext href={f.url} className="fix">
                  <span className="fix-repo">
                    {f.repo}
                    <span className="stars">
                      <Icon name="star" />
                      {f.stars}
                    </span>
                  </span>
                  <span className="fix-text">{f.text}</span>
                </Ext>
              </li>
            ))}
          </ul>
          <p>
            <Ext href={LINKS.allPrs} className="more">
              {c.oss.all} →
            </Ext>
          </p>

          <div className="method">
            <h3 className="sub">{c.method.title}</h3>
            <ol>
              {c.method.steps.map((s) => (
                <li key={s.t}>
                  <strong>{s.t}</strong>
                  <span>{s.d}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. Projeler */}
        <section id="projects" className="wrap section">
          <h2>{c.projects.title}</h2>
          <div className="projects">
            {c.projects.items.map((p) => (
              <article key={p.name} className="card project">
                {p.image ? (
                  <img
                    className="shot"
                    src={p.image.src}
                    alt={p.image.alt}
                    loading="lazy"
                    width={1200}
                    height={600}
                    style={p.image.pos ? { objectPosition: p.image.pos } : undefined}
                  />
                ) : p.flow ? (
                  <ol className="flow" aria-label={p.kicker}>
                    {p.flow.map((s, i) => (
                      <li key={s}>
                        <span className="flow-n">{i + 1}</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                ) : null}
                <div className="project-body">
                  <div className="project-head">
                    <h3>{p.name}</h3>
                    {p.badge && <span className="pill">{p.badge}</span>}
                  </div>
                  <p className="kicker">{p.kicker}</p>
                  <p>{p.text}</p>
                  {p.points && (
                    <ul className="points">
                      {p.points.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  )}
                  <p className="tech">{p.tech}</p>
                  <p className="plinks">
                    {p.links.map((l) => (
                      <Ext key={l.url} href={l.url} className={`chip ${l.kind}`}>
                        <Icon name={l.kind === 'web' ? 'globe' : 'github'} />
                        {l.label}
                      </Ext>
                    ))}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 5. Deneyim + eğitim */}
        <section id="experience" className="wrap section two">
          <div>
            <h2>{c.experience.title}</h2>
            {c.experience.jobs.map((j) => (
              <article key={j.org} className="job">
                <div className="job-head">
                  <h3>
                    {j.org} <span className="muted">· {j.role}</span>
                  </h3>
                  <span className="date">{j.date}</span>
                </div>
                <ul className="points">
                  {j.points.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                {j.tech && <p className="tech">{j.tech}</p>}
                {j.link && (
                  <p>
                    <Ext href={j.link.url} className="chip github">
                      <Icon name="github" />
                      {j.link.label}
                    </Ext>
                  </p>
                )}
              </article>
            ))}
          </div>
          <div>
            <h2>{c.education.title}</h2>
            {c.education.items.map((e) => (
              <article key={e.org} className="job">
                <div className="job-head">
                  <h3>{e.org}</h3>
                  <span className="date">{e.date}</span>
                </div>
                <p className="muted">{e.detail}</p>
              </article>
            ))}
            <p className="small">{c.education.certs}</p>
            <p className="small">{c.education.langs}</p>
          </div>
        </section>

        {/* 6. İletişim */}
        <section id="contact" className="wrap section">
          <div className="contact card">
            <h2>{c.contact.title}</h2>
            <p>{c.contact.text}</p>
            <div className="cta">
              <a className="btn primary" href={LINKS.email}>
                <Icon name="mail" />
                {LINKS.emailText}
              </a>
              <a className="btn" href={LINKS.cv} download>
                <Icon name="download" />
                {c.cta.cv}
              </a>
              <Ext className="btn" href={LINKS.linkedin}>
                <Icon name="linkedin" />
                LinkedIn
              </Ext>
            </div>
          </div>
        </section>
      </main>

      <footer className="wrap foot">{c.footer}</footer>
    </>
  );
}
