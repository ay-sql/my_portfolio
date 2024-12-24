'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { FaFigma } from 'react-icons/fa';

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

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <div
          key={project._id}
          className="group relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900"
        >
          <div className="aspect-video relative">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 p-6 flex flex-col justify-end text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-sm text-gray-300 line-clamp-2 mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag._id}
                  className="px-2 py-1 text-xs rounded-full bg-white/20"
                >
                  {tag.name}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-4">
              {project.demoLink && (
                <Link
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-white hover:text-yellow-400 transition-colors"
                >
                  <FiExternalLink className="w-4 h-4" />
                  <span>Demo</span>
                </Link>
              )}
              {project.codeLink && (
                <Link
                  href={project.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-white hover:text-yellow-400 transition-colors"
                >
                  <FiGithub className="w-4 h-4" />
                  <span>Code</span>
                </Link>
              )}
              {project.figmaLink && (
                <Link
                  href={project.figmaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-white hover:text-yellow-400 transition-colors"
                >
                  <FaFigma className="w-4 h-4" />
                  <span>Figma</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
