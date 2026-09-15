'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

import type { Project } from '@/data/projects'
import { profile } from '@/data/profile'
import { Reveal, ScrollProgress, CursorRing } from '@/components/motion'
import { WorkflowDiagram } from '@/components/workflow'

const Scene3D = dynamic(() => import('@/components/scenes3d').then((m) => m.Scene3D), {
  ssr: false,
  loading: () => null,
})

function Section({
  index,
  title,
  children,
}: {
  index: string
  title: string
  children: React.ReactNode
}) {
  return (
    <Reveal className="case-section">
      <div className="case-section-head">
        <p className="section-label">{index}</p>
        <h2>{title}</h2>
      </div>
      <div className="case-section-body">{children}</div>
    </Reveal>
  )
}

export function CaseStudy({ project, next }: { project: Project; next: Project }) {
  const { caseStudy } = project

  return (
    <main className="site-shell case-page">
      <ScrollProgress />
      <CursorRing />
      <div className="grain" />

      <header className="nav-wrap">
        <Link href="/" className="wordmark">
          {profile.wordmark.lead} <span>{profile.wordmark.accent}</span>
        </Link>
        <Link href="/#work" className="case-back">
          <ArrowLeft size={18} /> All work
        </Link>
      </header>

      {/* ----------------------------------------------------- case hero -- */}
      <section className={`case-hero section-pad ${project.tone}`}>
        <Scene3D slug={project.slug} tone={project.tone} />
        <div className="case-hero-inner">
          <p className="eyebrow hero-rise" style={{ animationDelay: '0ms' }}>
            {project.number} — {project.type}
          </p>
          <h1 className="hero-rise" style={{ animationDelay: '140ms' }}>
            {project.title}
          </h1>
          <p className="case-sub hero-rise" style={{ animationDelay: '260ms' }}>
            {project.subtitle}
          </p>
          <p className="case-tagline hero-rise" style={{ animationDelay: '360ms' }}>
            {project.tagline}
          </p>
          <dl className="case-meta hero-rise" style={{ animationDelay: '460ms' }}>
            {project.meta.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="case-body section-pad">
        <Section index="01 — Problem" title="What this project set out to solve">
          {caseStudy.problem.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Section>

        <Section index="02 — Approach" title="How it was approached">
          {caseStudy.approach.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Section>

        <Section index="03 — Workflow" title="Workflow & architecture">
          <WorkflowDiagram steps={project.workflow.steps} title={project.workflow.title} />
          <ul className="case-list">
            {caseStudy.architecture.map((a) => (
              <li key={a.slice(0, 24)}>{a}</li>
            ))}
          </ul>
        </Section>

        <Section index="04 — Technologies" title="What it was built with">
          <div className="tech-groups">
            {caseStudy.technologies.map((group) => (
              <div className="tech-group" key={group.group}>
                <p className="tech-group-label">{group.group}</p>
                <div className="tag-row">
                  {group.items.map((item) => (
                    <span className="tag" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section index="05 — Implementation" title="What was built">
          <ul className="case-list">
            {caseStudy.implementation.map((p) => (
              <li key={p.slice(0, 24)}>{p}</li>
            ))}
          </ul>
        </Section>

        <Section index="06 — Results" title="Results & output">
          {caseStudy.results.map((p) => (
            <p className="case-neutral" key={p.slice(0, 24)}>
              {p}
            </p>
          ))}
        </Section>

        <Section index="07 — Learnings" title="What it taught me">
          <ul className="case-list">
            {caseStudy.learnings.map((p) => (
              <li key={p.slice(0, 24)}>{p}</li>
            ))}
          </ul>
        </Section>
      </div>

      {/* ---------------------------------------------------- next project -- */}
      <Reveal className="case-next">
        <Link href={`/work/${next.slug}`} className="case-next-link">
          <span className="section-label">Next project</span>
          <strong>{next.title}</strong>
          <span className="case-next-sub">
            {next.subtitle} <ArrowUpRight size={22} />
          </span>
        </Link>
      </Reveal>

      <footer>
        <span>{profile.footerNote}</span>
        <span>Bioinformatics &amp; Computational Biology</span>
        <Link href="/#work">Back to work ↑</Link>
      </footer>
    </main>
  )
}
