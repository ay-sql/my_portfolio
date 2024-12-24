'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.includes('image')) {
        toast({
          title: 'Error',
          description: 'Please upload an image file',
          type: 'error',
        });
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      setIsUploading(true);

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      onChange(data.url);
      setPreviewUrl(''); // Clear preview after successful upload
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload image',
        type: 'error',
      });
      setPreviewUrl(''); // Clear preview on error
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-40 w-40 overflow-hidden rounded-lg border">
        {value || previewUrl ? (
          <>
            <Image
              src={value || previewUrl}
              alt="Upload"
              className="object-cover"
              fill
              sizes="160px"
            />
            <button
              className="absolute right-2 top-2 rounded-full bg-rose-500 p-1 text-white shadow-sm"
              type="button"
              onClick={() => {
                onChange('');
                setPreviewUrl('');
              }}
              disabled={disabled || isUploading}
            >
              <X className="h-4 w-4" />
            </button>
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Loader2 className="h-6 w-6 animate-spin text-white" />
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <Upload className="h-10 w-10 text-muted-foreground" />
          </div>
        )}
      </div>
      <Button
        type="button"
        variant="outline"
        disabled={disabled || isUploading}
        onClick={() => document.getElementById('imageUpload')?.click()}
      >
        {isUploading ? 'Uploading...' : 'Upload Image'}
      </Button>
      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
        disabled={disabled || isUploading}
      />
    </div>
  );
}
