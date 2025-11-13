"use client";
import TransitionLink from './TransitionLink'; 
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState } from 'react';
// NEW: Import the command palette and types
import { CommandPalette } from './CommandPalette';
import { PostData } from '../lib/posts';
import { Project } from '../data/projects';
import CustomLogo from './CustomLogo';

// The navLinks remain the same, but you can remove 'Blog' if it feels redundant with the search
const navLinks = [
    { name: 'Projects', href: '/' },
    { name: 'Experience', href: '/experience' },
    { name: 'About Me', href: '/about' },
    { name: 'Blog', href: '/blog'},
    { name: 'Contact', href: '/contact' },
];

// NEW: Define props for the Header
interface HeaderProps {
    posts: PostData[];
    projects: Project[];
}

export default function Header({ posts, projects }: HeaderProps) {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-gh-bg-secondary border-b border-gh-border sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-4">
                    <TransitionLink href="/" className="text-white hover:text-gh-text-secondary transition-colors">
                        <CustomLogo size={32} />
                    </TransitionLink>
                    {/* REPLACED: The old static search bar is now the command palette */}
                    <div className="hidden md:block">
                        <CommandPalette posts={posts} projects={projects} />
                    </div>
                </div>                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-2">
                        {navLinks.map((link) => (
                            <TransitionLink
                                key={link.name}
                                href={link.href}
                                className={clsx(
                                    'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                                    (pathname === link.href || (link.href === '/' && pathname.startsWith('/projects')))
                                        ? 'text-white bg-gh-button-hover'
                                        : 'text-gh-text-secondary hover:text-white hover:bg-gh-button'
                                )}
                            >
                                {link.name}
                            </TransitionLink>
                        ))}
                    </nav>

                    {/* Mobile Menu Button & Search */}
                    <div className="md:hidden flex items-center gap-4">
                        <CommandPalette posts={posts} projects={projects} />
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gh-text-secondary hover:text-white">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <TransitionLink
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={clsx(
                                    'block px-3 py-2 rounded-md text-base font-medium transition-colors',
                                    pathname === link.href ? 'text-white bg-gh-button-hover' : 'text-gh-text-secondary hover:text-white hover:bg-gh-button'
                                )}
                            >
                                {link.name}
                            </TransitionLink>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}