'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  PlusIcon, 
  XMarkIcon, 
  PencilIcon, 
  ArrowTopRightOnSquareIcon as ExternalLinkIcon, 
  CodeBracketIcon, 
  Square2StackIcon 
} from '@heroicons/react/24/outline';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { ImageUpload } from '@/components/image-upload';

interface Tag {
  _id: string;
  name: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  tags: Tag[];
  demoLink?: string;
  codeLink?: string;
  figmaLink?: string;
  featured: boolean;
  order: number;
}

// Memoized Project Card Component
const ProjectCard = memo(({ 
  project, 
  onEdit, 
  onDelete 
}: { 
  project: Project; 
  onEdit: (project: Project) => void; 
  onDelete: (project: Project) => void;
}) => (
  <Card key={project._id} className="group flex flex-col transition-all duration-300 hover:shadow-lg">
    <CardHeader className="relative p-4">
      <div className="aspect-video relative overflow-hidden rounded-lg">
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center gap-2">
          <div className="flex gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {project.demoLink && (
              <Button variant="secondary" size="sm" asChild className="hover:scale-105 transition-transform">
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLinkIcon className="h-4 w-4 mr-1" />
                  Demo
                </a>
              </Button>
            )}
            {project.codeLink && (
              <Button variant="secondary" size="sm" asChild className="hover:scale-105 transition-transform">
                <a href={project.codeLink} target="_blank" rel="noopener noreferrer">
                  <CodeBracketIcon className="h-4 w-4 mr-1" />
                  Code
                </a>
              </Button>
            )}
            {project.figmaLink && (
              <Button variant="secondary" size="sm" asChild className="hover:scale-105 transition-transform">
                <a href={project.figmaLink} target="_blank" rel="noopener noreferrer">
                  <Square2StackIcon className="h-4 w-4 mr-1" />
                  Figma
                </a>
              </Button>
            )}
          </div>
        </div>
        <Image
          src={project.image}
          alt={project.title}
          width={400}
          height={300}
          className="object-cover w-full h-full rounded-lg transform group-hover:scale-105 transition-transform duration-300"
        />
        {project.featured && (
          <Badge className="absolute top-2 right-2 z-30 bg-primary/80 hover:bg-primary transition-colors duration-300">
            Featured
          </Badge>
        )}
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">{project.title}</CardTitle>
          <span className="text-sm text-muted-foreground font-medium">#{project.order}</span>
        </div>
        <p className="text-muted-foreground mt-2 line-clamp-2">{project.description}</p>
      </div>
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Badge 
            key={tag._id} 
            variant="secondary" 
            className="px-2 py-0.5 text-xs font-medium bg-secondary/50 hover:bg-secondary/70 transition-colors duration-200"
          >
            {tag.name}
          </Badge>
        ))}
      </div>
    </CardContent>
    <CardFooter className="p-4 pt-0 mt-auto">
      <div className="flex justify-end gap-2 w-full">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onEdit(project)}
          className="hover:bg-secondary/80 hover:scale-105 transition-all duration-200"
        >
          <PencilIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(project)}
          className="hover:scale-105 transition-all duration-200"
        >
          <XMarkIcon className="h-4 w-4" />
        </Button>
      </div>
    </CardFooter>
  </Card>
));
ProjectCard.displayName = 'ProjectCard';

// Memoized Project Form Component
const ProjectForm = memo(({ 
  formData, 
  onSubmit, 
  onChange, 
  onImageUpload, 
  isSubmitting,
  availableTags 
}: {
  formData: any;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: any) => void;
  onImageUpload: (url: string) => void;
  isSubmitting: boolean;
  availableTags: Tag[];
}) => (
  <form onSubmit={onSubmit}>
    <div className="grid gap-4 py-4">
      {/* Image Upload */}
      <div className="grid gap-2">
        <Label>Project Image</Label>
        <ImageUpload
          value={formData.image}
          onChange={onImageUpload}
          disabled={isSubmitting}
        />
      </div>

      {/* Title */}
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => onChange('title', e.target.value)}
          disabled={isSubmitting}
          required
          className={formData.title.trim().length < 3 ? 'border-red-500' : ''}
        />
        {formData.title.trim().length < 3 && (
          <p className="text-sm text-red-500">Title must be at least 3 characters long</p>
        )}
      </div>

      {/* Description */}
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => onChange('description', e.target.value)}
          disabled={isSubmitting}
          required
          className={formData.description.trim().length < 10 ? 'border-red-500' : ''}
        />
        {formData.description.trim().length < 10 && (
          <p className="text-sm text-red-500">Description must be at least 10 characters long</p>
        )}
      </div>

      {/* Tags */}
      <div className="grid gap-2">
        <Label>Tags</Label>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <Badge
              key={tag._id}
              variant={formData.tags.includes(tag._id) ? "default" : "outline"}
              className="cursor-pointer hover:bg-secondary/80 transition-colors"
              onClick={() => {
                const newTags = formData.tags.includes(tag._id)
                  ? formData.tags.filter((id: string) => id !== tag._id)
                  : [...formData.tags, tag._id];
                onChange('tags', newTags);
              }}
            >
              {tag.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="demoLink">Demo Link (Optional)</Label>
          <Input
            id="demoLink"
            value={formData.demoLink}
            onChange={(e) => onChange('demoLink', e.target.value)}
            disabled={isSubmitting}
            type="url"
            placeholder="https://..."
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="codeLink">Code Link (Optional)</Label>
          <Input
            id="codeLink"
            value={formData.codeLink}
            onChange={(e) => onChange('codeLink', e.target.value)}
            disabled={isSubmitting}
            type="url"
            placeholder="https://..."
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="figmaLink">Figma Link (Optional)</Label>
          <Input
            id="figmaLink"
            value={formData.figmaLink}
            onChange={(e) => onChange('figmaLink', e.target.value)}
            disabled={isSubmitting}
            type="url"
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Featured and Order */}
      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => onChange('featured', e.target.checked)}
            disabled={isSubmitting}
            className="h-4 w-4 rounded border-gray-300"
          />
          <Label htmlFor="featured">Featured Project</Label>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="order">Order</Label>
          <Input
            id="order"
            type="number"
            value={formData.order}
            onChange={(e) => onChange('order', parseInt(e.target.value))}
            disabled={isSubmitting}
            min={0}
            className="w-20"
          />
        </div>
      </div>
    </div>

    <DialogFooter>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Saving...
          </span>
        ) : (
          'Save Project'
        )}
      </Button>
    </DialogFooter>
  </form>
));
ProjectForm.displayName = 'ProjectForm';

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isTagsLoading, setIsTagsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tags: [] as string[],
    demoLink: '',
    codeLink: '',
    figmaLink: '',
    featured: false,
    order: 0,
  });

  // Fetch tags from cache or API
  const fetchTags = useCallback(async () => {
    if (!isTagsLoading) return;

    try {
      // Try to get cached tags
      const cachedTags = sessionStorage.getItem('dashboard_tags');
      const cacheTimestamp = sessionStorage.getItem('dashboard_tags_timestamp');
      const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

      if (cachedTags && cacheTimestamp) {
        const isExpired = Date.now() - parseInt(cacheTimestamp) > CACHE_DURATION;
        if (!isExpired) {
          setTags(JSON.parse(cachedTags));
          setIsTagsLoading(false);
          return;
        }
      }

      const response = await fetch('/api/tags');
      const data = await response.json();
      
      if (response.ok) {
        const tagsData = data.tags || [];
        setTags(tagsData);
        // Cache the tags
        sessionStorage.setItem('dashboard_tags', JSON.stringify(tagsData));
        sessionStorage.setItem('dashboard_tags_timestamp', Date.now().toString());
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
    } finally {
      setIsTagsLoading(false);
    }
  }, [isTagsLoading, toast]);

  const fetchProjects = useCallback(async () => {
    if (!isLoading) return;
    
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      
      if (response.ok) {
        setProjects(data.projects || []);
      } else {
        throw new Error(data.error || 'Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch projects',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, toast]);

  // Initial data fetch
  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!isDialogOpen) {
      setFormData({
        title: '',
        description: '',
        image: '',
        tags: [],
        demoLink: '',
        codeLink: '',
        figmaLink: '',
        featured: false,
        order: projects.length,
      });
      setEditingProject(null);
    }
  }, [isDialogOpen, projects.length]);

  // Set form data when editing
  useEffect(() => {
    if (editingProject) {
      setFormData({
        title: editingProject.title,
        description: editingProject.description,
        image: editingProject.image,
        tags: editingProject.tags.map(tag => tag._id),
        demoLink: editingProject.demoLink || '',
        codeLink: editingProject.codeLink || '',
        figmaLink: editingProject.figmaLink || '',
        featured: editingProject.featured,
        order: editingProject.order,
      });
      setIsDialogOpen(true);
    }
  }, [editingProject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors: string[] = [];
    
    if (!formData.title?.trim()) {
      validationErrors.push('Title is required');
    } else if (formData.title.trim().length < 3) {
      validationErrors.push('Title must be at least 3 characters long');
    }
    
    if (!formData.description?.trim()) {
      validationErrors.push('Description is required');
    } else if (formData.description.trim().length < 10) {
      validationErrors.push('Description must be at least 10 characters long');
    }
    
    if (!formData.image?.trim()) {
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

    setIsSubmitting(true);

    try {
      const endpoint = editingProject ? `/api/projects/${editingProject._id}` : '/api/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const submissionData = {
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
      };

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save project');
      }

      setIsLoading(true); // Trigger a fresh fetch
      setIsDialogOpen(false);
      setEditingProject(null);
      resetForm();
      router.refresh();
      
      toast({
        title: 'Success',
        description: data.message || `Project ${editingProject ? 'updated' : 'created'} successfully`,
        variant: 'default',
      });
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save project',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/projects/${projectToDelete._id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete project');
      }

      setIsLoading(true); // Trigger a fresh fetch
      setProjectToDelete(null);
      
      toast({
        title: 'Success',
        description: data.message || 'Project deleted successfully',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete project',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const resetForm = useCallback(() => {
    setFormData({
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
  }, []);

  const handleEdit = useCallback((project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      tags: project.tags.map(tag => tag._id),
      demoLink: project.demoLink || '',
      codeLink: project.codeLink || '',
      figmaLink: project.figmaLink || '',
      featured: project.featured,
      order: project.order,
    });
    setIsDialogOpen(true);
  }, []);

  const handleFormChange = useCallback((field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleImageUpload = useCallback((imageUrl: string) => {
    setFormData(prev => ({ ...prev, image: imageUrl }));
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
        <Button asChild>
          <Link href="/dashboard/add-project">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Project
          </Link>
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card className="text-center py-6">
          <CardContent>
            <p className="text-muted-foreground">No projects found. Create your first project!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onEdit={handleEdit}
              onDelete={setProjectToDelete}
            />
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          {tags.length > 0 ? (
            <ProjectForm
              formData={formData}
              onSubmit={handleSubmit}
              onChange={handleFormChange}
              onImageUpload={handleImageUpload}
              isSubmitting={isSubmitting}
              availableTags={tags}
            />
          ) : (
            <div className="flex items-center justify-center p-8">Loading tags...</div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!projectToDelete} onOpenChange={() => setProjectToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setProjectToDelete(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
