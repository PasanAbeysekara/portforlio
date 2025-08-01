"use client"; // For using next/navigation's usePathname
import Link from 'next/link';
import { Github, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useState } from 'react';

const navLinks = [
    { name: 'Projects', href: '/' },
    { name: 'Experience', href: '/experience' },
    { name: 'About Me', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-gh-bg-secondary border-b border-gh-border sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left side */}
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="text-white hover:text-gh-text-secondary transition-colors">
                            <Github size={32} />
                        </Link>
                        <div className="hidden md:flex items-center bg-gh-bg border border-gh-border rounded-md px-3 py-1.5 w-72">
                            <span className="text-gh-text-secondary text-sm">Search or jump to...</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-2">
                        {navLinks.map((link) => (
                            <Link
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
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
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
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className={clsx(
                                    'block px-3 py-2 rounded-md text-base font-medium transition-colors',
                                    (pathname === link.href || (link.href === '/' && pathname.startsWith('/projects')))
                                        ? 'text-white bg-gh-button-hover'
                                        : 'text-gh-text-secondary hover:text-white hover:bg-gh-button'
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}