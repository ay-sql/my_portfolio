'use client';

import { useState, useCallback, memo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Types
interface Tag {
  _id: string;
  name: string;
  count: number;
}

interface TagItemProps {
  tag: Tag;
  onDelete: (tag: Tag) => void;
  isDeleting: boolean;
}

interface DeleteDialogProps {
  tag: Tag | null;
  isDeleting: boolean;
  onClose: () => void;
  onDelete: () => Promise<void>;
}

// Constants
const API_ENDPOINTS = {
  TAGS: '/api/tags',
  DELETE_TAG: (id: string) => `/api/tags/${id}`,
} as const;

const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to fetch tags',
  CREATE_FAILED: 'Failed to create tag',
  DELETE_FAILED: 'Failed to delete tag',
  NETWORK_ERROR: 'Network error occurred',
} as const;

// Components
const TagItem = memo(({ tag, onDelete, isDeleting }: TagItemProps) => (
  <div
    className="flex items-center gap-2 bg-secondary p-2 px-4 rounded-full border border-gray-200 hover:bg-secondary/80 transition-colors"
  >
    <span className="font-medium">{tag.name}</span>
    <Button
      variant="ghost"
      size="icon"
      className="h-6 w-6 p-0.5 ml-2 text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors" 
      onClick={() => onDelete(tag)}
      disabled={isDeleting}
      aria-label={`Delete tag ${tag.name}`}
    >
      <XMarkIcon className="h-4 w-4" />
    </Button>
  </div>
));

TagItem.displayName = 'TagItem';

const DeleteDialog = memo(({ 
  tag, 
  isDeleting, 
  onClose, 
  onDelete 
}: DeleteDialogProps) => (
  <Dialog open={!!tag} onOpenChange={(open) => !open && onClose()}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Tag</DialogTitle>
        <DialogDescription>
          {tag?.count ? (
            `This tag is used in ${tag.count} posts. You cannot delete it while it's in use.`
          ) : (
            'Are you sure you want to delete this tag? This action cannot be undone.'
          )}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={onClose}
          disabled={isDeleting}
        >
          Cancel
        </Button>
        {!tag?.count && (
          <Button
            variant="destructive"
            onClick={onDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        )}
      </DialogFooter>
    </DialogContent>
  </Dialog>
));

DeleteDialog.displayName = 'DeleteDialog';

export function TagsSection() {
  // State
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTagName, setNewTagName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [tagToDelete, setTagToDelete] = useState<Tag | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Hooks
  const { toast } = useToast();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/tags'); // Adjust this endpoint to match your API
        if (!response.ok) {
          throw new Error('Failed to fetch tags');
        }
        const data = await response.json();
        setTags(data.tags);
      } catch (err) {
        console.error('Error fetching tags:', err);
        setError(err as string);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  // Event Handlers
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = newTagName.trim();
    
    if (!trimmedName || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(API_ENDPOINTS.TAGS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: trimmedName }),
      });

      if (!response.ok) {
        throw new Error(ERROR_MESSAGES.CREATE_FAILED);
      }

      const data = await response.json();
      
      // Update both state and cache
      const newTags = [...tags, data];
      setTags(newTags);
      localStorage.setItem('tags', JSON.stringify(newTags));
      
      setNewTagName('');
      toast({
        title: 'Success',
        description: 'Tag created successfully',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error creating tag:', error);
      toast({
        title: 'Error',
        description: ERROR_MESSAGES.CREATE_FAILED,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [newTagName, isSubmitting, tags, toast]);

  const confirmDelete = useCallback((tag: Tag) => {
    if (isDeleting) return;
    setTagToDelete(tag);
  }, [isDeleting]);

  const handleDelete = useCallback(async () => {
    if (!tagToDelete || isDeleting) return;

    setIsDeleting(true);
    try {
      const response = await fetch(API_ENDPOINTS.DELETE_TAG(tagToDelete._id), {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(ERROR_MESSAGES.DELETE_FAILED);
      }

      setTagToDelete(null);
      const newTags = tags.filter(tag => tag._id !== tagToDelete._id);
      setTags(newTags);
      localStorage.setItem('tags', JSON.stringify(newTags));
      toast({
        title: 'Success',
        description: 'Tag deleted successfully',
        variant: 'default',
      });
    } catch (error) {
      console.error('Error deleting tag:', error);
      toast({
        title: 'Error',
        description: ERROR_MESSAGES.DELETE_FAILED,
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  }, [tagToDelete, isDeleting, tags, toast]);

  // Show loading state
  if (loading) {
    return <div>Loading tags...</div>;
  }

  // Show error state
  if (error) {
    return <div>Error loading tags: {error.message}</div>;
  }

  // Main render
  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Manage Tags</h2>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter new tag name"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            disabled={isSubmitting}
            className="max-w-md"
            aria-label="New tag name"
          />
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="min-w-[100px]"
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <>
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Tag
              </>
            )}
          </Button>
        </form>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg">
          <span className="font-bold">{tags.length} </span>
          <span className=" font-normal">existing Tags</span>
        </h3>
        <div className="flex flex-wrap w-fit bg-gray-50 gap-4 rounded-md border border-gray-200 p-4">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <TagItem
                key={tag._id}
                tag={tag}
                onDelete={confirmDelete}
                isDeleting={isDeleting}
              />
            ))
          ) : (
            <p className="text-muted-foreground">No tags found. Create your first tag above.</p>
          )}
        </div>
      </div>

      <DeleteDialog
        tag={tagToDelete}
        isDeleting={isDeleting}
        onClose={() => setTagToDelete(null)}
        onDelete={handleDelete}
      />
    </div>
  );
}
