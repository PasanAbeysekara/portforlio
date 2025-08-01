"use client";
import { useState } from 'react';
import { Project } from '../data/projects';
import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';

interface ProjectClientContentProps {
  project: Project;
}

type Tab = 'readme' | 'demo' | 'architecture' | 'challenges';

export default function ProjectClientContent({ project }: ProjectClientContentProps) {
  const [activeTab, setActiveTab] = useState<Tab>('readme');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'readme', label: 'README.md' },
    { id: 'demo', label: 'DEMO.gif' },
    { id: 'architecture', label: 'ARCHITECTURE.md' },
    { id: 'challenges', label: 'CHALLENGES.md' },
  ];

  const renderContent = () => {
    const content = project.content[activeTab];
    if (activeTab === 'demo') {
        return <div className="p-4" dangerouslySetInnerHTML={{ __html: content }} />;
    }
    return 
    (<div className="markdown-content p-6">
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