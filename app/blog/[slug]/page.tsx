import { getPostData, getSortedPostsData } from '@/app/lib/posts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { format, parseISO } from 'date-fns';
import { Calendar, Tag } from 'lucide-react';

// If you want to keep a prop type:
type ParamsPromise = { params: Promise<{ slug: string }> };

// Pre-render slugs at build time
export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({ slug: post.slug }));
}

// Must await params now
export async function generateMetadata({ params }: ParamsPromise) {
  const { slug } = await params;
  const post = await getPostData(slug);
  if (!post) return {};
  return {
    title: `${post.title} - Pasan Abeysekara`,
    description: post.summary,
  };
}

export default async function PostPage({ params }: ParamsPromise) {
  const { slug } = await params;
  const post = await getPostData(slug);

  if (!post) notFound();

  return (
    <article className="max-w-4xl mx-auto">
      {/* --- POST HEADER --- */}
      <div className="mb-8 border-b border-gh-border pb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gh-text-secondary">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            {post.date ? (
              <time dateTime={post.date}>
                {format(parseISO(post.date), 'LLLL d, yyyy')}
              </time>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            <Tag size={16} />
            <span>{Array.isArray(post.categories) ? post.categories.join(', ') : ''}</span>
          </div>
        </div>
      </div>

      {/* --- FEATURED IMAGE --- */}
      {post.image ? (
        <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : null}

      {/* --- MARKDOWN CONTENT --- */}
      <div className="markdown-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
