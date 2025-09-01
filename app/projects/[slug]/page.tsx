// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { Book, Star, GitFork } from 'lucide-react'
import TransitionLink from '../../components/TransitionLink'
import ProjectClientContent from '../../components/ProjectClientContent'
import { projects, yourUsername } from '../../data/projects'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find(p => p.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <div>
      <div className="pb-4 mb-4 border-b border-gh-border">
        <h2 className="text-xl text-gh-text-secondary mb-2">
          <Book size={20} className="inline-block mr-2 align-text-bottom" />
          <span className="text-gh-link hover:underline">{yourUsername}</span>
          <span className="mx-1">/</span>
          <span className="font-semibold text-gh-link hover:underline">{project.name}</span>
        </h2>
        <p className="text-sm text-gh-text-secondary">{project.description}</p>
        <div className="flex items-center gap-2 mt-4">
          <TransitionLink
            href={project.demoUrl}
            className="flex items-center gap-1 bg-gh-button hover:bg-gh-button-hover border border-gh-border rounded-md px-3 py-1 text-sm transition-colors"
          >
            <Star size={16} /> Live Demo
          </TransitionLink>
          <TransitionLink
            href={project.repoUrl}
            className="flex items-center gap-1 bg-gh-button hover:bg-gh-button-hover border border-gh-border rounded-md px-3 py-1 text-sm transition-colors"
          >
            <GitFork size={16} /> GitHub Repo
          </TransitionLink>
        </div>
      </div>

      <ProjectClientContent project={project} />
    </div>
  )
}

export async function generateStaticParams() {
  return projects.map(project => ({ slug: project.slug }))
}
