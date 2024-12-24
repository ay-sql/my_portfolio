'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Editor } from '@/components/editor';
import { ImageUpload } from '@/components/image-upload';
import { TagSelector } from '@/components/blog/tag-selector';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

interface BlogPost {
  title: string;
  content: string;
  image: string;
  tags: string[];
  status: 'draft' | 'published';
  readingTime: number;
}

export default function AddBlogPost() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [blogPost, setBlogPost] = useState<BlogPost>({
    title: '',
    content: '',
    image: '',
    tags: [],
    status: 'draft',
    readingTime: 1,
  });
  const [selectedTags, setSelectedTags] = useState<Array<{ _id: string; name: string }>>([]);

  const handleImageUpload = async (imageUrl: string) => {
    setBlogPost((prev) => ({ ...prev, image: imageUrl }));
  };

  const handleSubmit = async (status: 'draft' | 'published') => {
    try {
      setIsLoading(true);
      
      const tagIds = selectedTags.map(tag => tag._id);
      
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...blogPost,
          status,
          tags: tagIds,
        }),
      });

      if (!response.ok) throw new Error('Failed to create blog post');

      toast({
        title: 'Success',
        description: `Blog post ${status === 'published' ? 'published' : 'saved as draft'}`,
        variant: 'default',
      });

      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: 'Error',
        description: 'Failed to create blog post',
        type: 'error',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => router.push('/dashboard')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Create New Blog Post</CardTitle>
          <CardDescription>
            Create a new blog post with rich text editing capabilities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Featured Image</Label>
            <ImageUpload
              value={blogPost.image}
              onChange={handleImageUpload}
              disabled={isLoading}
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={blogPost.title}
              onChange={(e) =>
                setBlogPost((prev) => ({ ...prev, title: e.target.value }))
              }
              disabled={isLoading}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <TagSelector
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
            />
          </div>

          {/* Reading Time */}
          <div className="space-y-2">
            <Label htmlFor="readingTime">Reading Time (minutes)</Label>
            <Input
              id="readingTime"
              type="number"
              min="1"
              value={blogPost.readingTime}
              onChange={(e) =>
                setBlogPost((prev) => ({ 
                  ...prev, 
                  readingTime: parseInt(e.target.value) || 1 
                }))
              }
              disabled={isLoading}
            />
          </div>

          {/* Rich Text Editor */}
          <div className="space-y-2">
            <Label>Content</Label>
            <Editor
              value={blogPost.content}
              onChange={(value) =>
                setBlogPost((prev) => ({ ...prev, content: value }))
              }
              disabled={isLoading}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => handleSubmit('draft')}
              disabled={isLoading}
            >
              Save as Draft
            </Button>
            <Button
              onClick={() => handleSubmit('published')}
              disabled={isLoading}
            >
              Publish
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
