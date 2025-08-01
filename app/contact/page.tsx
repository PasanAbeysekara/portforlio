'use client';
import { useState } from 'react';
import Image from 'next/image';
import { yourEmail } from '../data/projects';

export default function ContactPage() {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const mailtoLink = `mailto:${yourEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="border-b border-gh-border pb-4 mb-6">
                <h1 className="text-3xl font-bold">Open an Issue to Get in Touch</h1>
                <p className="text-gh-text-secondary mt-1">Have a question or want to work together? Leave a message below.</p>
            </div>
            
            <div className="flex gap-4">
                <div className="hidden sm:block">
                    <Image src="/profile-photo.jpg" alt="Your avatar" width={40} height={40} className="rounded-full" />
                </div>
                <div className="flex-grow border border-gh-border rounded-lg">
                    <form onSubmit={handleSubmit} className="relative">
                        <div className="p-4 space-y-4">
                            <input
                                type="text"
                                placeholder="Title"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                                className="w-full bg-gh-bg border border-gh-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gh-link"
                            />
                            <textarea
                                placeholder="Leave a comment"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                required
                                className="w-full bg-gh-bg border border-gh-border rounded-md px-3 py-2 text-sm h-48 resize-y focus:outline-none focus:ring-2 focus:ring-gh-link"
                            />
                        </div>
                        <div className="flex justify-end p-4 border-t border-gh-border">
                            <button type="submit" className="bg-gh-green-active hover:bg-gh-green text-white font-semibold px-4 py-2 rounded-md text-sm transition-colors">
                                Submit new issue
                            </button>
                        </div>
                         <div className="absolute top-4 -left-3.5 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-gh-border border-b-8 border-b-transparent"></div>
                         <div className="absolute top-4 -left-3 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-gh-bg border-b-8 border-b-transparent"></div>
                    </form>
                </div>
            </div>
        </div>
    );
}