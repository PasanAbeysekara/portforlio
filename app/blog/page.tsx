import { getSortedPostsData } from '../lib/posts';
import BlogList from './BlogList'; // Import our new client component

export const metadata = { title: `Blog - Pasan Abeysekara` };

// This is now a Server Component by default (no "use client")
export default function BlogPage() {
  // Data fetching happens here, safely on the server
  const allPosts = getSortedPostsData();

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold border-b border-gh-border pb-4 mb-6">Blog</h1>
      
      {/* Pass the server-fetched data as a prop to the client component */}
      <BlogList posts={allPosts} />
    </div>
  );
}