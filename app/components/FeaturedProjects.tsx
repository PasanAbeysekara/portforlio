"use client";
import { Project } from '../data/projects';
import Link from 'next/link';
import TransitionLink from './TransitionLink';
import { Book, Star, GitFork } from 'lucide-react';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        opacity: 0,
        y: 30,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {projects.slice(0, 4).map((project) => ( // Show only first 4 projects
        <div key={project.slug} className="project-card">
            <TransitionLink href={`/projects/${project.slug}`} className="block h-full">
                <div className="border border-gh-border hover:border-gh-border-active rounded-lg p-4 flex flex-col h-full transition-colors">
                    <h3 className="flex items-center gap-2 font-semibold text-gh-link">
                        <Book size={16} /> {project.name}
                    </h3>
                    <p className="text-sm text-gh-text-secondary my-2 flex-grow">
                        {project.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gh-text-secondary mt-2 flex-wrap">
                        {project.tags.map(tag => (
                            <span key={tag} className="bg-gh-blue-tag text-gh-link px-2 py-0.5 rounded-full">{tag}</span>
                        ))}
                        <div className="flex items-center gap-1">
                            <Star size={14} /> Live Demo
                        </div>
                        <div className="flex items-center gap-1">
                            <GitFork size={14} /> GitHub Repo
                        </div>
                    </div>
                </div>
            </TransitionLink>
        </div>
      ))}
    </div>
  );
}