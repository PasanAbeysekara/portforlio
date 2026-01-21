'use client';
import { useState } from 'react';
import Image from 'next/image';
import { yourEmail } from '../data/projects';
import { Send, Mail, User, MessageSquare } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        // Using mailto as a fallback - in production, you would use a server-side API
        const mailtoLink = `mailto:${yourEmail}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
            `From: ${formData.name} (${formData.email})\n\n${formData.message}`
        )}`;
        
        try {
            window.location.href = mailtoLink;
            setStatus('success');
            setTimeout(() => {
                setFormData({ name: '', email: '', subject: '', message: '' });
                setStatus('idle');
            }, 3000);
        } catch (error) {
            console.error('Error:', error);
            setStatus('error');
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="border-b border-gh-border pb-4 mb-6">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <Mail className="text-gh-link" />
                    Get in Touch
                </h1>
                <p className="text-gh-text-secondary mt-2">
                    Have a question or want to work together? Send me a message and I&apos;ll get back to you as soon as possible.
                </p>
            </div>
            
            <div className="flex gap-4">
                <div className="hidden sm:block">
                    <Image src="/profile-photo.jpg" alt="Your avatar" width={40} height={40} className="rounded-full" />
                </div>
                <div className="flex-grow border border-gh-border rounded-lg">
                    <form onSubmit={handleSubmit} className="relative">
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="text-sm font-medium mb-2 flex items-center gap-2">
                                        <User size={16} className="text-gh-link" />
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Sunil Perera"
                                        className="w-full bg-gh-bg border border-gh-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gh-link"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-sm font-medium mb-2 flex items-center gap-2">
                                        <Mail size={16} className="text-gh-link" />
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="sunil@gmail.com"
                                        className="w-full bg-gh-bg border border-gh-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gh-link"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="subject" className="text-sm font-medium mb-2 flex items-center gap-2">
                                    <MessageSquare size={16} className="text-gh-link" />
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="What's this about?"
                                    className="w-full bg-gh-bg border border-gh-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gh-link"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Tell me more about your project or inquiry..."
                                    className="w-full bg-gh-bg border border-gh-border rounded-md px-3 py-2 text-sm h-48 resize-y focus:outline-none focus:ring-2 focus:ring-gh-link"
                                />
                            </div>

                            {status === 'success' && (
                                <div className="bg-green-900/20 border border-green-500/50 rounded-md p-3 text-sm text-green-400">
                                    ✓ Message sent successfully! I&apos;ll get back to you soon.
                                </div>
                            )}
                            
                            {status === 'error' && (
                                <div className="bg-red-900/20 border border-red-500/50 rounded-md p-3 text-sm text-red-400">
                                    ✗ Something went wrong. Please try again or email me directly at {yourEmail}
                                </div>
                            )}
                        </div>
                        
                        <div className="flex justify-end p-4 border-t border-gh-border bg-gh-bg-secondary rounded-b-lg">
                            <button 
                                type="submit" 
                                disabled={status === 'sending'}
                                className="bg-gh-green-active hover:bg-gh-green text-white font-semibold px-6 py-2 rounded-md text-sm transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={16} />
                                {status === 'sending' ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                        
                        <div className="absolute top-6 -left-3.5 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-gh-border border-b-8 border-b-transparent"></div>
                        <div className="absolute top-6 -left-3 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-gh-bg border-b-8 border-b-transparent"></div>
                    </form>
                </div>
            </div>

            <div className="mt-8 p-4 border border-gh-border rounded-lg bg-gh-bg-secondary">
                <h2 className="font-semibold mb-2 flex items-center gap-2">
                    <Mail size={18} className="text-gh-link" />
                    Direct Contact
                </h2>
                <p className="text-sm text-gh-text-secondary">
                    You can also reach me directly at:{' '}
                    <a href={`mailto:${yourEmail}`} className="text-gh-link hover:underline">
                        {yourEmail}
                    </a>
                </p>
            </div>
        </div>
    );
}