'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { PlusIcon } from '@heroicons/react/24/outline';

interface Tag {
  _id: string;
  name: string;
}

interface TagSelectorProps {
  selectedTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
}

export function TagSelector({ selectedTags, onTagsChange }: TagSelectorProps) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTagName, setNewTagName] = useState('');
  const [isCreatingTag, setIsCreatingTag] = useState(false);
  const { toast } = useToast();

  const fetchTags = useCallback(async () => {
    try {
      // Use cached data if available
      const cachedTags = sessionStorage.getItem('dashboard_tags');
      if (cachedTags) {
        setTags(JSON.parse(cachedTags));
        return;
      }

      const response = await fetch('/api/tags');
      const data = await response.json();
      const tagsData = data.tags || [];
      setTags(tagsData);
      // Cache the data
      sessionStorage.setItem('dashboard_tags', JSON.stringify(tagsData));
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

  const createNewTag = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagName.trim()) return;

    setIsCreatingTag(true);
    try {
      const response = await fetch('/api/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newTagName.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create tag');
      }

      // Refresh tags list
      await fetchTags();
      
      // Clear input
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
        description: error instanceof Error ? error.message : 'Failed to create tag',
        variant: 'destructive',
      });
    } finally {
      setIsCreatingTag(false);
    }
  };

  const toggleTag = (tag: Tag) => {
    const isSelected = selectedTags.some(t => t._id === tag._id);
    const newTags = isSelected
      ? selectedTags.filter(t => t._id !== tag._id)
      : [...selectedTags, tag];
    onTagsChange(newTags);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag._id}
            variant={selectedTags.some(t => t._id === tag._id) ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => toggleTag(tag)}
          >
            {tag.name}
          </Badge>
        ))}
      </div>
      
      <form onSubmit={createNewTag} className="flex gap-2">
        <Input
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          placeholder="Enter new tag name"
          className="flex-1"
        />
        <Button type="submit" disabled={isCreatingTag || !newTagName.trim()}>
          <PlusIcon className="h-4 w-4 mr-2" />
          {isCreatingTag ? 'Adding...' : 'Add Tag'}
        </Button>
      </form>
    </div>
  );
}
