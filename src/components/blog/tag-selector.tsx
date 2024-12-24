'use client'

import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface Tag {
  _id: string;
  name: string;
}

interface TagSelectorProps {
  selectedTags: Tag[];
  onTagsChange: (tags: Tag[]) => void;
}

export function TagSelector({ selectedTags, onTagsChange }: TagSelectorProps) {
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await fetch('/api/tags');
        const data = await response.json();
        setTags(data.tags || []);
      } catch (error) {
        setError(error as Error);
      }
    }
    fetchTags();
  }, []);

  const handleSelect = (tag: Tag) => {
    const isSelected = selectedTags.some(t => t._id === tag._id);
    if (isSelected) {
      onTagsChange(selectedTags.filter(t => t._id !== tag._id));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
    setSearchValue('');
  };

  const handleAddNewTag = async () => {
    if (!searchValue.trim()) return;

    try {
      const response = await fetch('/api/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: searchValue.trim() })
      });

      const newTag = await response.json();
      setTags(prev => [...prev, newTag]);
      onTagsChange([...selectedTags, newTag]);
      setSearchValue('');
    } catch (error) {
      console.error('Error adding new tag:', error);
    }
  };

  const filteredTags = tags.filter(tag => 
    tag.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {error && (
        <p className="text-sm text-red-500">
          An error occurred while fetching tags. Please try again.
        </p>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            Select tags...
            <Plus className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-2">
          <Input
            placeholder="Search or add new tag..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="mb-2"
          />
          <div className="max-h-[200px] overflow-y-auto">
            {filteredTags.length > 0 ? (
              filteredTags.map((tag) => (
                <div
                  key={tag._id}
                  className={`flex items-center justify-between p-2 hover:bg-accent rounded-md cursor-pointer ${
                    selectedTags.some(t => t._id === tag._id) ? 'bg-accent' : ''
                  }`}
                  onClick={() => handleSelect(tag)}
                >
                  <span>{tag.name}</span>
                  {selectedTags.some(t => t._id === tag._id) && (
                    <X className="h-4 w-4" />
                  )}
                </div>
              ))
            ) : (
              <div className="text-sm text-muted-foreground">
                No tags found. Please create a new tag in the &quot;Tags&quot; section.
              </div>
            )}
          </div>
          {searchValue && !filteredTags.length && (
            <Button
              size="sm"
              className="w-full mt-2"
              onClick={handleAddNewTag}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add &quot;{searchValue}&quot;
            </Button>
          )}
        </PopoverContent>
      </Popover>

      <div className="flex flex-wrap gap-2">
        {selectedTags.map((tag) => (
          <Badge
            key={tag._id}
            variant="secondary"
            className="cursor-pointer"
            onClick={() => handleSelect(tag)}
          >
            {tag.name}
            <X className="ml-1 h-3 w-3" />
          </Badge>
        ))}
      </div>
    </div>
  );
} 