'use client'

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export default function HeroSection() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [content, setContent] = useState<HeroContent>({
    title: '',
    subtitle: '',
    description: '',
    ctaText: 'Contact Me',
    ctaLink: '#contact',
  });

  // Fetch hero content
  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const response = await fetch('/api/hero');
        if (!response.ok) {
          throw new Error('Failed to fetch hero content');
        }

        const data = await response.json();
        setContent(data);
      } catch (error) {
        toast({
          title: "Error",
          description: 'Failed to fetch hero content',
          type: "error"
        });
      } finally {
        setIsFetching(false);
      }
    };

    fetchHeroContent();
  }, []); // Empty dependency array to run only on mount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.title || !content.subtitle || !content.description) {
      toast({
        title: "Error",
        description: 'Title, subtitle, and description are required',
        type: "error"
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/hero', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update content');
      }

      toast({
        title: "Success",
        description: 'Hero section updated successfully',
        type: "success"
      });
      
      setContent(data);
    } catch (error) {
      console.error('Error updating hero content:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to update hero content',
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-4">
            Loading...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hero Section</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={content.title}
              onChange={(e) => setContent(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter title"
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              value={content.subtitle}
              onChange={(e) => setContent(prev => ({ ...prev, subtitle: e.target.value }))}
              placeholder="Enter subtitle"
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={content.description}
              onChange={(e) => setContent(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter description"
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ctaText">CTA Button Text</Label>
            <Input
              id="ctaText"
              value={content.ctaText}
              onChange={(e) => setContent(prev => ({ ...prev, ctaText: e.target.value }))}
              placeholder="Enter CTA text"
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ctaLink">CTA Button Link</Label>
            <Input
              id="ctaLink"
              value={content.ctaLink}
              onChange={(e) => setContent(prev => ({ ...prev, ctaLink: e.target.value }))}
              placeholder="Enter CTA link"
              disabled={loading}
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
