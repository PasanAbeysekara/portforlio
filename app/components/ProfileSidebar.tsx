import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Link as LinkIcon, Linkedin, Youtube, Instagram, Github } from 'lucide-react';
import { yourName, yourUsername, yourBio, yourLocation, yourBlogUrl, yourLinkedInUrl, yourLinkedInHandle, yourGithubUrl, yourYouTubeUrl, yourInstagramUrl, yourStackOverflowUrl } from '../data/projects';
import ProfileStats from './ProfileStats';
import { GithubProfileData } from '../lib/types';

interface ProfileSidebarProps {
  stats: GithubProfileData['user'];
}

export default function ProfileSidebar({ stats }: ProfileSidebarProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="relative w-3/4 sm:w-1/2 md:w-full mx-auto md:mx-0">
                <Image
                    src="/profile-photo.jpg" 
                    alt={yourName}
                    width={296}
                    height={296}
                    className="rounded-full border-2 border-gh-border"
                    priority
                />
            </div>
            <div>
                <h1 className="text-2xl font-bold">{yourName}</h1>
                <p className="text-xl text-gh-text-secondary font-light">{yourUsername}</p>
            </div>
            <Link href={yourGithubUrl} target="_blank" className="w-full text-center bg-gh-button hover:bg-gh-button-hover border border-gh-border rounded-md py-1.5 transition-colors flex items-center justify-center gap-2">
                <Github size={16} />
                <span>Github</span>
            </Link>
            <p className="text-base">{yourBio}</p>
            <ul className="space-y-2 text-sm text-gh-text-secondary">
                <li className="flex items-center gap-2">
                    <MapPin size={16} /> <span>{yourLocation}</span>
                </li>
                <li className="flex items-center gap-2">
                    <Linkedin size={16} /> <a href={yourLinkedInUrl} target="_blank" rel="noopener noreferrer" className="text-gh-link hover:underline">{yourLinkedInHandle}</a>
                </li>
                <li className="flex items-center gap-2">
                    <LinkIcon size={16} /> <Link href={yourBlogUrl} className="text-gh-link hover:underline">Blog</Link>
                </li>
                <li className="flex items-center gap-2">
                    <Youtube size={16} /> <a href={yourYouTubeUrl} target="_blank" rel="noopener noreferrer" className="text-gh-link hover:underline">YouTube</a>
                </li>
                <li className="flex items-center gap-2">
                    <Instagram size={16} /> <a href={yourInstagramUrl} target="_blank" rel="noopener noreferrer" className="text-gh-link hover:underline">Instagram</a>
                </li>
                <li className="flex items-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.725 0l-1.72 1.277-6.39 4.883 2.641 2.641 5.113-3.895L20.499 9.5l-1.095 4.725-3.895 5.113-3.832-3.832-3.895 5.113L3.5 20.499 9.5 15.499l3.832 3.832 5.113-5.113 1.277-5.497L24 4.446 15.725 0zm-7.678 18.028l-1.937 1.937-1.937-1.937 1.937-1.937 1.937 1.937z"/>
                    </svg>
                    <a href={yourStackOverflowUrl} target="_blank" rel="noopener noreferrer" className="text-gh-link hover:underline">StackOverflow</a>
                </li>
            </ul>
            
            <ProfileStats stats={stats} />
        </div>
    );
}