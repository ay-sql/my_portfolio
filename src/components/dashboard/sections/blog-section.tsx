'use client'

import Link from 'next/link'
import { PencilIcon, TrashIcon, EyeIcon, ClockIcon } from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  status: 'published' | 'draft';
  tags: { _id: string; name: string; }[];
  readingTime: number;
}

const blogPosts: BlogPost[] = [
  { 
    id: '1', 
    title: 'Understanding Modern Web Development',
    slug: 'understanding-modern-web-development',
    date: '2024-01-20',
    status: 'published',
    tags: [
      { _id: '1', name: 'Web Development' },
      { _id: '2', name: 'JavaScript' }
    ],
    readingTime: 5
  },
  { 
    id: '2', 
    title: 'The Future of AI in Web Development',
    slug: 'future-of-ai-in-web-development',
    date: '2024-01-19',
    status: 'draft',
    tags: [
      { _id: '3', name: 'AI' },
      { _id: '4', name: 'Web Development' }
    ],
    readingTime: 8
  }
]

export function BlogSection() {
  return (
    <div className="space-y-6">
      <Button className="w-full sm:w-auto">
        <PencilIcon className="h-4 w-4 mr-2" />
        New Blog Post
      </Button>
      <div className="space-y-4">
        {blogPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span className={post.status === 'published' ? 'text-green-600' : 'text-yellow-600'}>
                      {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {post.readingTime} min read
                    </span>
                  </div>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag._id} variant="secondary">
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/blog/${post.slug}`} target="_blank">
                    <Button variant="outline" size="sm">
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm">
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
