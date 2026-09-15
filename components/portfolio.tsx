'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  ArrowDownRight,
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Mail,
  Check,
  Copy,
  Plus,
  Minus,
  GraduationCap,
} from 'lucide-react'

import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { skillCategories } from '@/data/skills'
import { education } from '@/data/education'
import { coursework } from '@/data/coursework'
import { contact } from '@/data/contact'

import { Reveal, Magnetic, ScrollProgress, CursorRing, Parallax } from '@/components/motion'
import { WorkflowDiagram, ToolChain } from '@/components/workflow'
import { PipelineStrand } from '@/components/pipeline-strand'

const HeroHelix = dynamic(() => import('@/components/hero-helix').then((m) => m.HeroHelix), {
  ssr: false,
  loading: () => null,
})

const Scene3D = dynamic(() => import('@/components/scenes3d').then((m) => m.Scene3D), {
  ssr: false,
  loading: () => null,
})

const NAV = ['About', 'Work', 'Skills', 'Education', 'Contact']

/* ---------------------------------------------------------------- skills -- */

function SkillCategories() {
  const [open, setOpen] = useState<string>(skillCategories[0].id)

  return (
    <div className="skills-list">
      {skillCategories.map((cat, i) => {
        const isOpen = open === cat.id
        return (
          <div className={`skill-cat ${isOpen ? 'is-open' : ''}`} key={cat.id}>
            <button
              type="button"
              className="skill-cat-head skill-row"
              aria-expanded={isOpen}
              aria-controls={`skill-panel-${cat.id}`}
              onClick={() => setOpen(isOpen ? '' : cat.id)}
            >
              <span>{String(i + 1).padStart(2, '0')}</span>
              <strong>{cat.label}</strong>
              <span className="skill-cat-meta">
                <em>{cat.caption}</em>
                {isOpen ? <Minus size={15} /> : <Plus size={15} />}
              </span>
            </button>
            <div
              id={`skill-panel-${cat.id}`}
              className="skill-cat-panel"
              role="region"
              aria-label={cat.label}
              hidden={!isOpen}
            >
              <div className="tag-row">
                {cat.items.map((item, j) => (
                  <span className="tag" key={item} style={{ '--i': j } as React.CSSProperties}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------- education -- */

function EducationTimeline() {
  return (
    <div className="edu-list">
      {education.map((entry, i) => (
        <Reveal key={entry.id} delay={i * 110}>
          <article className="edu-row">
            <div className="edu-period">
              <span className={`edu-status ${entry.status}`} aria-hidden="true" />
              {entry.period}
            </div>
            <div className="edu-main">
              <h3>{entry.degree}</h3>
              <p>{entry.institution}</p>
            </div>
            <div className="edu-score">
              <span className="edu-score-label">CGPA</span>
              <span className="edu-score-value">
                {entry.cgpa.toFixed(2)}
                <em>/{entry.cgpaScale}</em>
              </span>
              <span className="edu-meter">
                <span
                  className="edu-meter-fill"
                  style={{ width: `${(entry.cgpa / entry.cgpaScale) * 100}%` }}
                />
              </span>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  )
}

/* --------------------------------------------------------------- contact -- */

function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable — the mailto link remains the fallback */
    }
  }
  return (
    <button type="button" className="copy-email" onClick={copy} aria-live="polite">
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? 'Email copied' : 'Copy email'}
    </button>
  )
}

/* ------------------------------------------------------------------ page -- */

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { hero, about } = profile

  return (
    <main className="site-shell">
      <ScrollProgress />
      <CursorRing />
      <div className="grain" />
      <PipelineStrand />

      <header className="nav-wrap">
        <a href="#top" className="wordmark">
          {profile.wordmark.lead} <span>{profile.wordmark.accent}</span>
        </a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          {NAV.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
        </nav>
        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* ---------------------------------------------------------- hero -- */}
      <section id="top" className="hero section-pad">
        <Parallax className="hero-orb" amount={0.05} />
        <HeroHelix />

        <div className="hero-meta">
          <span>{hero.metaLeft}</span>
          <span>{hero.metaRight}</span>
        </div>

        <div className="hero-copy">
          <p className="eyebrow hero-rise" style={{ animationDelay: '0ms' }}>
            {hero.eyebrow}
          </p>
          <h1 className="hero-rise" style={{ animationDelay: '140ms' }}>
            {hero.headline}
            <br />
            <em>{hero.headlineAccent}</em>
          </h1>
          <div className="hero-bottom hero-rise" style={{ animationDelay: '300ms' }}>
            <p>{hero.supporting}</p>
            <a className="round-link" href="#work" aria-label="Scroll to selected work">
              <ArrowDownRight size={26} />
            </a>
          </div>
          <div className="cta-row hero-rise" style={{ animationDelay: '420ms' }}>
            {hero.ctas.map((cta) => (
              <Magnetic
                key={cta.href}
                href={cta.href}
                strength={0.12}
                className={cta.primary ? 'btn btn-primary' : 'btn btn-ghost'}
              >
                {cta.label} <ArrowUpRight size={18} />
              </Magnetic>
            ))}
          </div>
        </div>

        <div className="hero-foot hero-rise" style={{ animationDelay: '540ms' }}>
          <ul className="hero-disciplines">
            {profile.disciplines.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <div className="scroll-note">
            <span className="line" /> Scroll to explore
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- about -- */}
      <section id="about" className="about section-pad">
        <Reveal>
          <p className="section-label">/ 01 — About</p>
        </Reveal>
        <Reveal className="about-grid" delay={80}>
          <h2>
            {about.headingLead} <span>{about.headingSpans[0]}</span>,{' '}
            <span>{about.headingSpans[1]}</span>
            <br />
            and <span>{about.headingSpans[2]}.</span>
          </h2>
          <div className="about-body">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <ul className="focus-chips" aria-label="Focus areas">
              {about.focusAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
            <a href="#contact" className="text-link">
              Get in touch <ArrowUpRight size={17} />
            </a>
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- work -- */}
      <section id="work" className="work section-pad">
        <Reveal>
          <div className="section-heading">
            <p className="section-label">/ 02 — Selected work</p>
            <span>Bioinformatics · Full-stack · AI</span>
          </div>
        </Reveal>

        <div className="project-list">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 90}>
              <article className={`project-card ${project.featured ? 'featured' : ''}`}>
                <Link href={`/work/${project.slug}`} className="project-link">
                  <div className={`project-art ${project.tone}`}>
                    <Scene3D slug={project.slug} tone={project.tone} />
                    <div className="art-ring" />
                    <span className="art-index">{project.number}</span>
                    <span className="art-word">{project.artWord}</span>
                  </div>

                  <div className="project-info">
                    <div className="project-head">
                      <h3>{project.title}</h3>
                      <p className="project-sub">{project.subtitle}</p>
                      <p>{project.description}</p>
                      <ToolChain items={project.toolchain} />
                    </div>
                    <div className="project-side">
                      <div className="project-detail">
                        <span>{project.type}</span>
                        <span>{project.meta[1].value}</span>
                      </div>
                      <div className="tag-row compact">
                        {project.tech.slice(0, 6).map((t) => (
                          <span className="tag" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="case-cta">
                        View Case Study <ArrowUpRight size={18} />
                      </span>
                    </div>
                  </div>

                  <div className="card-workflow">
                    <WorkflowDiagram
                      steps={project.workflow.steps}
                      title={project.workflow.title}
                      variant="compact"
                    />
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- skills -- */}
      <section id="skills" className="experience section-pad">
        <Reveal>
          <p className="section-label">/ 03 — Skills</p>
        </Reveal>
        <div className="capability-grid">
          <Reveal delay={60}>
            <h2>
              Where the wet lab meets
              <br />
              <em>the command line.</em>
            </h2>
            <p className="capability-note">
              Eight working areas, from sequence analysis and pipeline tooling through to the
              software and models built around them.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <SkillCategories />
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------- education -- */}
      <section id="education" className="education section-pad">
        <Reveal>
          <div className="section-heading">
            <p className="section-label">/ 04 — Education</p>
            <span>
              <GraduationCap size={15} /> Chanakya University · BIHER
            </span>
          </div>
        </Reveal>
        <EducationTimeline />

        <div className="coursework">
          <Reveal>
            <p className="workflow-title">Academic coursework</p>
          </Reveal>
          <div className="coursework-list">
            {coursework.map((entry, i) => (
              <Reveal key={entry.id} delay={i * 60}>
                <article className="coursework-row">
                  <h3>{entry.label}</h3>
                  <p>{entry.detail}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- contact -- */}
      <section id="contact" className="contact section-pad">
        <Reveal>
          <p className="section-label">/ 05 — Contact</p>
          <h2>
            {contact.headlineLines[0]}
            <br />
            {contact.headlineLines[1]}
            <br />
            <em>{contact.headlineAccent}</em>
          </h2>

          <div className="contact-actions">
            <Magnetic
              href={`mailto:${contact.email}`}
              className="contact-link"
              aria-label={`Email ${profile.name}`}
            >
              <Mail size={22} /> Say hello <ArrowUpRight size={22} />
            </Magnetic>

            <div className="contact-lines">
<a className="contact-line" href={`mailto:${contact.email}`}>
                  <span>Email</span>
                  <strong>{contact.email}</strong>
                  <ArrowRight size={17} />
                </a>
              {contact.socials.map((social) => (
                <a
                  className="contact-line"
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <span>{social.label}</span>
                  <strong>{social.url.replace('https://', '')}</strong>
                  <ArrowUpRight size={17} />
                </a>
              ))}
              <CopyEmail />
            </div>
          </div>

          <div className="contact-foot">
            <span>{contact.availability}</span>
            <span>{profile.disciplines.join(' · ')}</span>
          </div>
        </Reveal>
      </section>

      <footer>
        <span>{profile.footerNote}</span>
        <span>Bioinformatics & Computational Biology</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  )
}
