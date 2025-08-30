// app/components/ContributionGraph.tsx

"use client";

import type { ContributionsCollection, ContributionDay } from '../lib/types';
import { useState } from 'react';
import clsx from 'clsx';

interface ContributionGraphProps {
  data: ContributionsCollection | null;
}

export default function ContributionGraph({ data }: ContributionGraphProps) {
  const [tooltip, setTooltip] = useState({ show: false, content: '', x: 0, y: 0 });

  if (!data) {
    return (
      <div className="border border-gh-border rounded-lg p-4 text-gh-text-secondary bg-gh-bg-secondary">
        Could not load GitHub activity data.
      </div>
    );
  }

  const allDays = data.contributionCalendar.weeks.flatMap(week => week.contributionDays);

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>, day: ContributionDay) => {
    const date = new Date(day.date);
    const dateString = date.toLocaleDateString('en-US', { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' });
    const content = day.contributionCount === 0 
      ? `No contributions on ${dateString}`
      : `${day.contributionCount} contribution${day.contributionCount > 1 ? 's' : ''} on ${dateString}`;
    
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      show: true,
      content: content,
      x: rect.left + window.scrollX + rect.width / 2,
      y: rect.top + window.scrollY,
    });
  };

  const handleMouseOut = () => {
    setTooltip(prev => ({ ...prev, show: false }));
  };

  return (
    // REVERTED: Removed bg-gh-bg-secondary to blend with the main page background
    <div className="border border-gh-border rounded-lg p-4 relative">
        <div className="overflow-x-auto">
            <div className="grid grid-rows-7 grid-flow-col gap-1 w-max">
                {allDays.map((day, i) => (
                <div
                    key={i}
                    // REVERTED: Using clsx to map contributionLevel to the DARK theme colors
                    className={clsx('w-3.5 h-3.5 rounded-sm', {
                        'bg-gh-contrib-0': day.contributionLevel === 'NONE',
                        'bg-gh-contrib-1': day.contributionLevel === 'FIRST_QUARTILE',
                        'bg-gh-contrib-2': day.contributionLevel === 'SECOND_QUARTILE',
                        'bg-gh-contrib-3': day.contributionLevel === 'THIRD_QUARTILE',
                        'bg-gh-contrib-4': day.contributionLevel === 'FOURTH_QUARTILE',
                    })}
                    onMouseOver={(e) => handleMouseOver(e, day)}
                    onMouseOut={handleMouseOut}
                />
                ))}
            </div>
        </div>
        <p className="text-xs text-gh-text-secondary mt-2">
            Total contributions in the last year: {data.contributionCalendar.totalContributions}
        </p>
        
        {tooltip.show && (
            <div
                className="absolute bg-gh-bg-secondary text-white text-xs px-2 py-1 rounded-md pointer-events-none transform -translate-x-1/2 -translate-y-[calc(100%+8px)] z-10 border border-gh-border"
                style={{ left: tooltip.x, top: tooltip.y }}
            >
                <div className="relative">
                    {tooltip.content}
                    <svg className="absolute text-gh-bg-secondary h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255">
                        <polygon className="fill-current" points="0,0 127.5,127.5 255,0"/>
                    </svg>
                </div>
            </div>
        )}
    </div>
  );
}