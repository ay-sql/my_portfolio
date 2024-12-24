'use client'

import { useEffect, useState } from 'react';
import { BlogList } from '@/components/blog/blog-list';
import { TagFilter } from '@/components/blog/tag-filter';
import { BlogListSkeleton } from '@/components/blog/blog-card-skeleton';
import Image from 'next/image';

interface Post {
  _id: string;
  tags: { _id: string }[];
  // other properties...
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [postsRes, tagsRes] = await Promise.all([
          fetch('/api/blog'),
          fetch('/api/tags')
        ]);
        
        const [postsData, tagsData] = await Promise.all([
          postsRes.json() as Promise<{ posts: Post[] }>,
          tagsRes.json()
        ]);

        setPosts(postsData.posts as Post[]);
        setTags(tagsData.tags);
      } catch (error) {
        console.error('Error fetching data:', error);
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

  const filteredPosts = selectedTags.length > 0
    ? posts.filter(post => 
        post.tags.some(tag => selectedTags.includes(tag._id))
      )
    : posts;

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center bg-background">
        {/* Header with background */}
        <div className="relative w-full h-[40vh] min-h-[400px] flex items-center justify-center dark:border-b dark:border-gray-800">
          <div className="absolute inset-0">
            <Image
              src="/img/hero-bg.jpg"
              alt="Blog Header Background"
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
              Blog & Insights
            </h1>
            <p className="mt-4 max-w-[700px] text-lg text-gray-600 dark:text-gray-300">
              Thoughts, tutorials and insights about web development, software engineering, and technology.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-12 dark:border-gray-800">
          <BlogListSkeleton />
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
            alt="Blog Header Background"
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
            Blog & Insights
          </h1>
          <p className="mt-4 max-w-[700px] text-lg text-gray-600 dark:text-gray-300">
            Thoughts, tutorials and insights about web development, software engineering, and technology.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 dark:border-gray-800">
        <TagFilter 
          tags={tags}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
        />
        <BlogList posts={filteredPosts} />
      </div>
    </main>
  );
}
