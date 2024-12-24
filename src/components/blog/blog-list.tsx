'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface BlogPost {
  _id: string;
  slug: string;
  image: string;
  title: string;
  tags: Array<{ _id: string; name: string }>;
  content: string;
  createdAt: string;
  readingTime: string;
}

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link
          key={post._id}
          href={`/blog/${post.slug}`}
          className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 shadow-md hover:shadow-lg dark:shadow-none dark:border dark:border-gray-800/40 dark:hover:border-gray-700/70 transition-all duration-300"
        >
          <div className="relative h-64">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2 dark:text-white group-hover:text-primary transition-colors">{post.title}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
              <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readingTime} min read
              </span>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-2">
              {post.content.replace(/<[^>]*>/g, '').slice(0, 150)}...
            </p>
            {post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
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
      ))}
    </div>
  );
}
