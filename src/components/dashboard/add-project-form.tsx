'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { TagSelector } from '@/components/project/tag-selector';
import Image from 'next/image';

interface Tag {
  _id: string;
  name: string;
}

export function AddProjectForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    demoLink: '',
    codeLink: '',
    figmaLink: '',
    featured: false,
    order: 0,
  });
  const [imagePreview, setImagePreview] = useState('');

  const fetchTags = useCallback(async () => {
    try {
      const response = await fetch('/api/tags');
      const data = await response.json();
      
      if (response.ok) {
        // setTags(data.tags || []);
      } else {
        throw new Error(data.error || 'Failed to fetch tags');
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch tags',
        variant: 'destructive',
      });
    }
  }, [toast]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  useEffect(() => {
    if (formData.image) {
      setImagePreview(formData.image);
    }
  }, [formData.image]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: selectedTags.map(tag => tag._id),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create project');
      }

      toast({
        title: 'Success',
        description: 'Project created successfully',
      });

      // Redirect to projects page
      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create project',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter project title"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your project"
                required
                className="min-h-[120px]"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Enter image URL"
                required
              />
              {imagePreview && (
                <div className="mt-2">
                  <Label>Preview</Label>
                  <div className="aspect-video relative mt-2">
                    <Image
                      src={imagePreview}
                      alt="Project preview"
                      width={200}
                      height={150}
                      className="rounded-lg object-cover"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Tags</Label>
              <TagSelector
                selectedTags={selectedTags}
                onTagsChange={setSelectedTags}
              />
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="demoLink">Demo Link (Optional)</Label>
                <Input
                  id="demoLink"
                  value={formData.demoLink}
                  onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="codeLink">Code Link (Optional)</Label>
                <Input
                  id="codeLink"
                  value={formData.codeLink}
                  onChange={(e) => setFormData({ ...formData, codeLink: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="figmaLink">Figma Link (Optional)</Label>
                <Input
                  id="figmaLink"
                  value={formData.figmaLink}
                  onChange={(e) => setFormData({ ...formData, figmaLink: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => 
                    setFormData({ ...formData, featured: checked as boolean })
                  }
                />
                <div className="grid gap-1.5">
                  <Label htmlFor="featured">Featured Project</Label>
                  <p className="text-sm text-muted-foreground">
                    Featured projects will be displayed prominently on your portfolio homepage and at the top of your projects list.
                    Use this for your best or most important work that you want visitors to see first.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                min="0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Project'}
        </Button>
      </div>
    </form>
  );
}
