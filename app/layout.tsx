import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from './components/Header'
// NEW: Import data and fetching functions
import { getSortedPostsData } from './lib/posts'
import { projects } from './data/projects'
import { TransitionProvider } from './components/TransitionProvider'
import CookieConsent from './components/CookieConsent'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://pasana.site'),
  title: 'Pasan Abeysekara | Software Engineer',
  description: 'Personal portfolio of Pasan Abeysekara, a software engineer.',
  icons: {
    icon: '/logo-pasan.png',
    apple: '/logo-pasan.png',
  },
  openGraph: {
    title: 'Pasan Abeysekara | Software Engineer',
    description: 'Full-Stack Developer | DevOps Enthusiast | Scalable Systems Advocate',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pasan Abeysekara | Software Engineer',
    description: 'Full-Stack Developer | DevOps Enthusiast | Scalable Systems Advocate',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // NEW: Fetch all data needed for the command palette here
  const allPosts = getSortedPostsData();
  const allProjects = projects;

  return (
    <html lang="en" data-arp="">
      <body className={inter.className}>
        <TransitionProvider>
          <div className="min-h-screen flex flex-col">
            {/* NEW: Pass data down to the Header */}
            <Header posts={allPosts} projects={allProjects} />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
          </div>
          <CookieConsent />
        </TransitionProvider>
      </body>
    </html>
  )
}