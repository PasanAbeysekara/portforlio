import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Link as LinkIcon, Linkedin } from 'lucide-react';
import { yourName, yourUsername, yourBio, yourLocation, yourBlogUrl, yourLinkedInUrl, yourLinkedInHandle, yourGithubUrl } from '../data/projects';
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
            <Link href={yourGithubUrl} target="_blank" className="w-full text-center bg-gh-button hover:bg-gh-button-hover border border-gh-border rounded-md py-1.5 transition-colors">
                Github
            </Link>
            <p className="text-base">{yourBio}</p>
            <ul className="space-y-2 text-sm text-gh-text-secondary">
                <li className="flex items-center gap-2">
                    <MapPin size={16} /> <span>{yourLocation}</span>
                </li>
                <li className="flex items-center gap-2">
                    <LinkIcon size={16} /> <a href={yourBlogUrl} target="_blank" className="text-gh-link hover:underline">{yourBlogUrl.replace('https://','')}</a>
                </li>
                <li className="flex items-center gap-2">
                    <Linkedin size={16} /> <a href={yourLinkedInUrl} target="_blank" className="text-gh-link hover:underline">{yourLinkedInHandle}</a>
                </li>
            </ul>
            
            <ProfileStats stats={stats} />
        </div>
    );
}