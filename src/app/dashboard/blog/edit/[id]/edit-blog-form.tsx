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
import type { BlogPost } from '@/lib/blog';

interface EditBlogFormProps {
  post: BlogPost;
}

export default function EditBlogForm({ post }: EditBlogFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [blogPost, setBlogPost] = useState({
    title: post.title,
    content: post.content,
    image: post.image,
    readingTime: post.readingTime,
  });
  const [selectedTags, setSelectedTags] = useState(post.tags);

  const handleSubmit = async (status: 'draft' | 'published') => {
    try {
      setIsLoading(true);
      const tagIds = selectedTags.map(tag => tag._id);

      const response = await fetch(`/api/blog/${post._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...blogPost,
          status,
          tags: tagIds,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update blog post');
      }

      toast({ title: 'Success', description: 'Blog post updated' });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error updating post:', error);
      toast({ 
        title: 'Error', 
        description: 'Failed to update blog post',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Button variant="ghost" className="mb-4" onClick={() => router.push('/dashboard')}>
        <ArrowLeft className="mr-2 h-4 w-4" />Back to Dashboard
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Edit Blog Post</CardTitle>
          <CardDescription>Edit your blog post</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Featured Image</Label>
            <ImageUpload
              value={blogPost.image}
              onChange={(url) => setBlogPost(prev => ({ ...prev, image: url }))}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={blogPost.title}
              onChange={(e) => setBlogPost(prev => ({ ...prev, title: e.target.value }))}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label>Tags</Label>
            <TagSelector selectedTags={selectedTags} onTagsChange={setSelectedTags} />
          </div>
          <div className="space-y-2">
            <Label>Content</Label>
            <Editor
              value={blogPost.content}
              onChange={(value) => setBlogPost(prev => ({ ...prev, content: value }))}
              disabled={isLoading}
            />
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => handleSubmit('draft')} disabled={isLoading}>
              Save as Draft
            </Button>
            <Button onClick={() => handleSubmit('published')} disabled={isLoading}>
              Publish
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 