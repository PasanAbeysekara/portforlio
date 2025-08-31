---
title: 'React Server Components Explained'
date: '2024-06-01'
summary: 'Exploring the paradigm shift introduced by React Server Components (RSCs) and how they change the way we build modern web applications with frameworks like Next.js.'
image: '/images/blog/react-server-components.png'
categories: ['Frontend', 'React', 'Next.js']
---

React Server Components (RSCs) are a new architecture that allows us to write UI components that run exclusively on the server. This has profound implications for performance and data fetching.

## Key Benefits

1.  **Zero Bundle Size:** Server Components don't send any JavaScript to the client, reducing the bundle size and improving initial page load times.
2.  **Direct Data Access:** They can directly access server-side data sources (databases, file systems, internal APIs) without needing to expose an API endpoint.
3.  **Automatic Code Splitting:** RSCs act as natural code-splitting points.

Here's an example of an `async` Server Component in Next.js:

```tsx
async function getGithubStars() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
  const data = await res.json();
  return data.stargazers_count;
}

export default async function StarCounter() {
  const stars = await getGithubStars();
  return <div>Next.js has {stars} ⭐</div>;
}