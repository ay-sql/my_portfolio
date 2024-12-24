'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import ProjectList from '@/components/portfolio/project-list';
import CategoryFilter from '@/components/portfolio/category-filter';
import { ProjectListSkeleton } from '@/components/portfolio/project-list-skeleton';

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  tags: Array<{ _id: string; name: string }>;
  demoLink?: string;
  codeLink?: string;
  figmaLink?: string;
  featured: boolean;
  order: number;
}

interface Tag {
  _id: string;
  name: string;
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        
        if (!data.projects) {
          throw new Error('No projects found');
        }

        // Log the first project's tags for debugging
        if (data.projects.length > 0) {
          console.log('First project data:', data.projects[0]);
        }

        setProjects(data.projects);
        
        // Extract unique tags from projects
        const uniqueTags = new Map<string, Tag>();
        data.projects.forEach((project: Project) => {
          if (Array.isArray(project.tags)) {
            project.tags.forEach(tag => {
              if (tag && tag._id && tag.name) {
                uniqueTags.set(tag._id, tag);
              }
            });
          }
        });
        
        // Convert Map to array and sort by name
        const tagArray = Array.from(uniqueTags.values());
        tagArray.sort((a, b) => a.name.localeCompare(b.name));
        
        // Log extracted tags for debugging
        console.log('Extracted tags:', tagArray);
        
        setTags(tagArray);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const filteredProjects = selectedTags.length > 0
    ? projects.filter(project => 
        project.tags.some(tag => selectedTags.includes(tag._id))
      )
    : projects;

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center bg-background">
        {/* Header with background */}
        <div className="relative w-full h-[40vh] min-h-[400px] flex items-center justify-center dark:border-b dark:border-gray-800">
          <div className="absolute inset-0">
            <Image
              src="/img/hero-bg.jpg"
              alt="Portfolio Header Background"
              fill
              className="object-cover"
              priority
              quality={100}
            />
            {/* Dark Overlay - Only visible in dark mode */}
            <div className="absolute inset-0 bg-transparent dark:bg-black/50" />
          </div>

          <div className="relative z-10 text-center text-black dark:text-white px-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Portfolio
            </h1>
            <p className="mt-4 max-w-[700px] text-lg text-gray-600 dark:text-gray-300">
              Explore my collection of projects showcasing my skills in web development, design, and software engineering.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-12 dark:border-gray-800">
          <ProjectListSkeleton />
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-background">
      {/* Header with background */}
      <div className="relative w-full h-[40vh] min-h-[400px] flex items-center justify-center dark:border-b dark:border-gray-800">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/img/hero-bg.jpg"
            alt="Portfolio Header Background"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          {/* Dark Overlay - Only visible in dark mode */}
          <div className="absolute inset-0 bg-transparent dark:bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-black dark:text-white px-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Portfolio
          </h1>
          <p className="mt-4 max-w-[700px] text-lg text-gray-600 dark:text-gray-300">
            Explore my collection of projects showcasing my skills in web development, design, and software engineering.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 dark:border-gray-800">
        {tags.length > 0 && (
          <CategoryFilter 
            tags={tags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
          />
        )}
        <ProjectList projects={filteredProjects} />
      </div>
    </main>
  );
}
