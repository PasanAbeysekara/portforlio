"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import TransitionLink from '../components/TransitionLink'; 
import { PostData } from '../lib/posts';
import { format, parseISO } from 'date-fns';
import { Calendar } from 'lucide-react';
import { cn } from "@/lib/utils";

interface BlogListProps {
  posts: PostData[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    // Make sure posts exists before trying to loop
    if (posts) { 
        posts.forEach(post => {
            // THIS IS THE FIX:
            // Check if post.categories is an array before calling forEach on it.
            if (Array.isArray(post.categories)) {
                post.categories.forEach(cat => categories.add(cat));
            }
        });
    }
    return ['All', ...Array.from(categories)];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!activeCategory || activeCategory === 'All') {
      return posts;
    }
    // Add a defensive check here as well for filtering
    return posts.filter(post => Array.isArray(post.categories) && post.categories.includes(activeCategory));
  }, [activeCategory, posts]);

  // Handle the case where there are no posts gracefully
  if (!posts || posts.length === 0) {
      return <p className="text-gh-text-secondary">No blog posts found.</p>;
  }

  return (
    <div>
      {/* --- CATEGORY FILTERS --- */}
      <div className="flex flex-wrap gap-2 mb-10">
        {allCategories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category === 'All' ? null : category)}
            className={cn(
              "px-3 py-1 rounded-full text-sm font-medium transition-colors",
              (!activeCategory && category === 'All') || activeCategory === category
                ? "bg-gh-link text-white"
                : "bg-gh-button hover:bg-gh-button-hover text-gh-text-secondary"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* --- BLOG POSTS LIST --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPosts.map(({ slug, date, title, summary, image, categories }) => (
          <article key={slug} className="group flex flex-col border border-gh-border rounded-lg overflow-hidden hover:border-gh-border-active transition-colors">
            <TransitionLink href={`/blog/${slug}`} className="block">
              <div className="relative w-full h-48">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </TransitionLink>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-3 text-sm text-gh-text-secondary mb-2">
                  <Calendar size={16} />
                  <time dateTime={date}>{format(parseISO(date), 'LLLL d, yyyy')}</time>
              </div>
              <h2 className="text-xl font-semibold mb-3 flex-grow">
                <TransitionLink href={`/blog/${slug}`} className="text-gh-link hover:underline">
                  {title}
                </TransitionLink>
              </h2>
              <p className="text-gh-text-secondary leading-relaxed mb-4 text-sm">{summary}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                  {/* Also add a check here before mapping */}
                  {Array.isArray(categories) && categories.map(cat => (
                      <span key={cat} className="bg-gh-blue-tag text-gh-link px-2 py-0.5 rounded-full text-xs">
                          {cat}
                      </span>
                  ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}