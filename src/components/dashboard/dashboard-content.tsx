'use client'

import { ScrollArea } from '@/components/ui/scroll-area';
import HeroSection from './sections/hero-section';
import { AboutSection } from './sections/about-section';
import { SkillsSection } from './sections/skills-section';
import BlogPostsSection from '@/app/dashboard/components/blog-posts-section';
import MessagesSection from '@/app/dashboard/components/messages-section';
import { TagsSection } from './tags-section';
import { ProjectsSection } from './projects-section';

interface DashboardContentProps {
  activeSection: string;
}

export function DashboardContent({ activeSection }: DashboardContentProps) {
  const renderContent = () => {
    switch (activeSection) {
      case 'hero':
        return <HeroSection />;
      case 'about':
        return <AboutSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'skills':
        return <SkillsSection />;
      case 'blog':
        return <BlogPostsSection />;
      case 'tags':
        return <TagsSection />;
      case 'contact':
        return <MessagesSection />;
      default:
        return null;
    }
  };

  return (
    <ScrollArea className="flex-1">
      <div className="container mx-auto py-6">
        {renderContent()}
      </div>
    </ScrollArea>
  );
}
