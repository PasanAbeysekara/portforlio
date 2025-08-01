"use client";
import { useState, useEffect } from 'react';
import clsx from 'clsx';

const tooltips = [
    "Deployed a new feature for Project-Y", "Fixed a critical bug",
    "Completed a course on Kubernetes", "Wrote a blog post on TDD",
    "Refactored the authentication module", "Wrote 50 lines of code"
];

export default function ContributionGraph() {
  const [tooltip, setTooltip] = useState({ show: false, content: '', x: 0, y: 0 });
  const [days, setDays] = useState<{ level: number; tooltip: string }[] | null>(null);

  useEffect(() => {
    const generatedDays = Array.from({ length: 364 }, (_, i) => {
      const level = Math.floor(Math.random() * 5);
      return {
        level,
        tooltip: level > 0 ? `${level * 2} contributions. ${tooltips[Math.floor(Math.random() * tooltips.length)]}` : 'No contributions'
      };
    });
    setDays(generatedDays);
  }, []);

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>, content: string, level: number) => {
    if (level === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      show: true,
      content: content,
      x: rect.left + window.scrollX + rect.width / 2,
      y: rect.top + window.scrollY - 10,
    });
  };

  const handleMouseOut = () => {
    setTooltip(prev => ({ ...prev, show: false }));
  };

  if (!days) {
    return <div className="border border-gh-border rounded-lg p-4">Loading...</div>;
  }

  return (
    <div className="border border-gh-border rounded-lg p-4 overflow-x-auto relative">
      <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
        {days.map((day, i) => (
          <div
            key={i}
            className={clsx('w-3.5 h-3.5 rounded-sm', {
              'bg-gh-contrib-0': day.level === 0,
              'bg-gh-contrib-1': day.level === 1,
              'bg-gh-contrib-2': day.level === 2,
              'bg-gh-contrib-3': day.level === 3,
              'bg-gh-contrib-4': day.level === 4,
            })}
            onMouseOver={(e) => handleMouseOver(e, day.tooltip, day.level)}
            onMouseOut={handleMouseOut}
          />
        ))}
      </div>
      {tooltip.show && (
        <div
          className="absolute bg-gh-bg-secondary text-white text-xs px-2 py-1 rounded-md pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
}