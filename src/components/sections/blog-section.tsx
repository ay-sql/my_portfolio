'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { BlogListSkeleton } from '@/components/blog/blog-card-skeleton';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  tags: Array<{ _id: string; name: string }>;
  createdAt: string;
  readingTime: number;
}

export default function BlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/blog?limit=3');
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <BlogListSkeleton />;
  }

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Latest Blog Posts</h2>
          <p className="text-muted-foreground">Stay updated with my latest thoughts and insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug}`}>
              <Card className="group h-full hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag._id}
                        className="px-2 py-1 text-xs bg-muted rounded-full"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
                    <span>{post.readingTime} min read</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link 
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
          >
            View All Posts
          </Link>
        </div>

      
      </div>
    </section>
  );
}
