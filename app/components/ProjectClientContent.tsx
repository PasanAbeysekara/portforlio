"use client";
import { useState, useEffect } from 'react';
import { Project } from '../data/projects';
import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';

interface ProjectClientContentProps {
  project: Project;
}

type Tab = 'readme' | 'demo' | 'architecture' | 'challenges';

export default function ProjectClientContent({ project }: ProjectClientContentProps) {
  const [activeTab, setActiveTab] = useState<Tab>('readme');
  const [fetchedContent, setFetchedContent] = useState<string | null>(null);
  const [loadingContent, setLoadingContent] = useState(false);
  const [contentError, setContentError] = useState<string | null>(null);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'readme', label: 'README.md' },
    { id: 'demo', label: 'DEMO.mp4' },
    { id: 'architecture', label: 'ARCHITECTURE.md' },
    { id: 'challenges', label: 'CHALLENGES.md' },
  ];

  useEffect(() => {
    const getContentPath = (tab: Tab): string | undefined => {
      if (tab === 'readme') return project.content.readmePath;
      if (tab === 'architecture') return project.content.architecturePath;
      if (tab === 'challenges') return project.content.challengesPath;
      return undefined;
    };

    const path = getContentPath(activeTab);
    if (!path) {
      setFetchedContent(null);
      setContentError(null);
      setLoadingContent(false);
      return;
    }

    let cancelled = false;
    const fetchMd = async () => {
      setLoadingContent(true);
      setContentError(null);
      try {
        const res = await fetch(path);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const txt = await res.text();
        if (cancelled) return;
        setFetchedContent(txt);
      } catch {
        if (!cancelled) setContentError('Failed to load content');
      } finally {
        if (!cancelled) setLoadingContent(false);
      }
    };

    fetchMd();
    return () => {
      cancelled = true;
    };
  }, [activeTab, project.content]);

  const renderContent = () => {
    if (activeTab === 'demo') {
      const content = project.content.demo;
      return <div className="p-4" dangerouslySetInnerHTML={{ __html: content }} />;
    }

    if (activeTab === 'readme' || activeTab === 'architecture' || activeTab === 'challenges') {
      const getLocalContent = (tab: Tab): string | undefined => {
        if (tab === 'readme') return project.content.readme;
        if (tab === 'architecture') return project.content.architecture;
        if (tab === 'challenges') return project.content.challenges;
        return undefined;
      };

      const local = getLocalContent(activeTab)?.trim();
      if (local) return (
        <div className="markdown-content p-6">
          <ReactMarkdown>{local}</ReactMarkdown>
        </div>
      );

      if (loadingContent) return <div className="p-6">Loading...</div>;
      if (contentError) return <div className="p-6">{contentError}</div>;
      if (fetchedContent) return (
        <div className="markdown-content p-6">
          <ReactMarkdown>{fetchedContent}</ReactMarkdown>
        </div>
      );

      return <div className="p-6">No content available.</div>;
    }

    const content = project.content[activeTab];
    return (
      <div className="markdown-content p-6">
        <ReactMarkdown>{content}</ReactMarkdown>
    </div>);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* File Browser */}
      <div className="w-full md:w-1/4">
        <div className="border border-gh-border rounded-lg">
          <ul>
            {tabs.map((tab, index) => (
              <li key={tab.id} 
                  className={clsx(
                    "px-4 py-2 text-sm cursor-pointer transition-colors",
                    index !== 0 && "border-t border-gh-border",
                    activeTab === tab.id 
                      ? "bg-gh-link text-white font-semibold" 
                      : "hover:bg-gh-button"
                  )}
                  onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Content Display */}
      <div className="w-full md:w-3/4">
        <div className="border border-gh-border rounded-lg min-h-[400px]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}