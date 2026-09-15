import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { projects, getProject } from '@/data/projects'
import { profile } from '@/data/profile'
import { CaseStudy } from '@/components/case-study'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return { title: `Work — ${profile.name}` }
  return {
    title: `${project.title} — ${profile.name}`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) notFound()

  const project = projects[index]
  const next = projects[(index + 1) % projects.length]

  return <CaseStudy project={project} next={next} />
}
