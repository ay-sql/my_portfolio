'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface BlogCardProps {
  title: string;
  content: string;
  image: string;
  slug: string;
  readingTime: number;
  tags: Array<{ _id: string; name: string }>;
  author?: {
    username: string;
  } | null;
  createdAt: string;
}

export function BlogCard({ 
  title, 
  content, 
  image, 
  slug, 
  readingTime,
  tags, 
  author, 
  createdAt 
}: BlogCardProps) {
  // Truncate content for preview (remove HTML tags first)
  const plainContent = content.replace(/<[^>]*>/g, '');
  const truncatedContent = plainContent.slice(0, 150) + '...';

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 shadow-md hover:shadow-lg dark:shadow-none dark:border dark:border-gray-800/40 dark:hover:border-gray-700/70 transition-all duration-300">
      <Link href={`/blog/${slug}`}>
        <div className="relative h-64">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="text-center p-4">
              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-gray-200 mb-4">{truncatedContent}</p>
              <div className="flex justify-center space-x-4">
                <span className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-100 transition-colors">
                  Read More
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2 dark:text-white">{title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
            {author && (
              <div className="flex items-center gap-4">
                <span>By {author.username}</span>
                <span>•</span>
              </div>
            )}
            <time dateTime={createdAt}>{formatDate(createdAt)}</time>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {readingTime} min read
            </span>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-300">{truncatedContent}</p>
          {tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag._id}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
