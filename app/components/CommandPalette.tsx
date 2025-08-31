"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
// UPDATED: Import DialogHeader, DialogTitle, DialogDescription
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { PostData } from "@/app/lib/posts";
import { Project, yourUsername } from "@/app/data/projects";
import { FileText, Newspaper, Home, User, Briefcase, Mail, Github } from 'lucide-react';
import { cn } from "@/lib/utils";

interface CommandPaletteProps {
  posts: PostData[];
  projects: Project[];
}

export function CommandPalette({ posts, projects }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      {/* --- THIS IS THE FIX FOR PART 2 --- */}
      <button
        onClick={() => setOpen(true)}
        className="text-sm text-gh-text-secondary border border-gh-border rounded-md px-3 py-1.5 w-full md:w-72 text-left hover:bg-gh-button transition-colors flex justify-between items-center"
      >
        <span>Search or jump to...</span>
        <kbd className="hidden md:inline-flex items-center gap-1 rounded border bg-gh-bg px-1.5 font-mono text-xs text-gh-text-secondary">
          <span className="text-lg">⌘</span>K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 shadow-lg">
          {/* --- THIS IS THE FIX FOR PART 1 --- */}
          <DialogHeader className="sr-only">
            <DialogTitle>Command Palette</DialogTitle>
            <DialogDescription>
              Search for projects, blog posts, or navigate the site.
            </DialogDescription>
          </DialogHeader>
          
          <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              
              <CommandGroup heading="Navigation">
                {/* ... (rest of the component is unchanged) ... */}
                <CommandItem onSelect={() => runCommand(() => router.push('/'))}><Home className="mr-2"/><span>Home</span></CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push('/experience'))}><Briefcase className="mr-2"/><span>Experience</span></CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push('/about'))}><User className="mr-2"/><span>About Me</span></CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push('/blog'))}><Newspaper className="mr-2"/><span>Blog</span></CommandItem>
                <CommandItem onSelect={() => runCommand(() => router.push('/contact'))}><Mail className="mr-2"/><span>Contact</span></CommandItem>
              </CommandGroup>

              <CommandGroup heading="Projects">
                {projects.map((project) => (
                  <CommandItem key={project.slug} onSelect={() => runCommand(() => router.push(`/projects/${project.slug}`))}>
                    <FileText className="mr-2"/>
                    <span>{project.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandGroup heading="Blog Posts">
                {posts.map((post) => (
                  <CommandItem key={post.slug} onSelect={() => runCommand(() => router.push(`/blog/${post.slug}`))}>
                    <Newspaper className="mr-2"/>
                    <span>{post.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandGroup heading="External">
                <CommandItem onSelect={() => runCommand(() => window.open(`https://github.com/${yourUsername}`, '_blank'))}>
                    <Github className="mr-2"/>
                    <span>GitHub Profile</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  );
}