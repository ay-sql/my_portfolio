'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/image-upload';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { TagSelector } from '@/components/project/tag-selector';
import { Checkbox } from '@/components/ui/checkbox';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
  codeLink: string;
  figmaLink: string;
  featured: boolean;
  order: number;
}

export default function AddProjectPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Array<{ _id: string; name: string }>>([]);
  const [project, setProject] = useState<Project>({
    title: '',
    description: '',
    image: '',
    tags: [],
    demoLink: '',
    codeLink: '',
    figmaLink: '',
    featured: false,
    order: 0,
  });

  const handleImageUpload = async (imageUrl: string) => {
    setProject((prev) => ({ ...prev, image: imageUrl }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    const validationErrors: string[] = [];
    
    if (!project.title?.trim()) {
      validationErrors.push('Title is required');
    } else if (project.title.trim().length < 3) {
      validationErrors.push('Title must be at least 3 characters long');
    }
    
    if (!project.description?.trim()) {
      validationErrors.push('Description is required');
    } else if (project.description.trim().length < 10) {
      validationErrors.push('Description must be at least 10 characters long');
    } else if (project.description.trim().length > 1000) {
      validationErrors.push('Description cannot exceed 1000 characters');
    }
    
    if (!project.image?.trim()) {
      validationErrors.push('Image URL is required');
    }
    
    if (validationErrors.length > 0) {
      toast({
        title: 'Validation Error',
        description: validationErrors.join(', '),
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const tagIds = selectedTags.map(tag => tag._id);
      
      // Prepare the data with trimmed values
      const submissionData = {
        ...project,
        title: project.title.trim(),
        description: project.description.trim(),
        tags: tagIds,
      };
      
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create project');
      }

      toast({
        title: 'Success',
        description: 'Project created successfully',
        variant: 'default',
      });

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
          <CardTitle>Create New Project</CardTitle>
          <CardDescription>
            Add a new project to showcase in your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Project Image</Label>
            <ImageUpload
              value={project.image}
              onChange={handleImageUpload}
              disabled={isLoading}
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={project.title}
              onChange={(e) =>
                setProject((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Enter project title"
              disabled={isLoading}
              className={project.title.trim().length < 3 ? 'border-red-500' : ''}
            />
            {project.title.trim().length < 3 && (
              <p className="text-sm text-red-500">Title must be at least 3 characters long</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-sm text-muted-foreground">({project.description.trim().length}/1000 characters)</span>
            </Label>
            <Textarea
              id="description"
              value={project.description}
              onChange={(e) =>
                setProject((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Describe your project (10-1000 characters)"
              className={`min-h-[120px] ${project.description.trim().length < 10 ? 'border-red-500' : ''}`}
              disabled={isLoading}
            />
            {project.description.trim().length < 10 && (
              <p className="text-sm text-red-500">Description must be at least 10 characters long</p>
            )}
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <TagSelector
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
            />
          </div>

          {/* Links */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="demoLink">Demo Link (Optional)</Label>
              <Input
                id="demoLink"
                value={project.demoLink}
                onChange={(e) =>
                  setProject((prev) => ({ ...prev, demoLink: e.target.value }))
                }
                placeholder="https://..."
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="codeLink">Code Link (Optional)</Label>
              <Input
                id="codeLink"
                value={project.codeLink}
                onChange={(e) =>
                  setProject((prev) => ({ ...prev, codeLink: e.target.value }))
                }
                placeholder="https://..."
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="figmaLink">Figma Link (Optional)</Label>
              <Input
                id="figmaLink"
                value={project.figmaLink}
                onChange={(e) =>
                  setProject((prev) => ({ ...prev, figmaLink: e.target.value }))
                }
                placeholder="https://..."
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Featured Project */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="featured"
                checked={project.featured}
                onCheckedChange={(checked) => 
                  setProject((prev) => ({ ...prev, featured: checked as boolean }))
                }
                disabled={isLoading}
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

          {/* Display Order */}
          <div className="space-y-2">
            <Label htmlFor="order">Display Order</Label>
            <Input
              id="order"
              type="number"
              value={project.order}
              onChange={(e) =>
                setProject((prev) => ({ 
                  ...prev, 
                  order: parseInt(e.target.value) || 0
                }))
              }
              min="0"
              disabled={isLoading}
            />
          </div>

          {/* Action Button */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Project'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
