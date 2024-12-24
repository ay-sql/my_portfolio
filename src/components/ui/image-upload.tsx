'use client';

import { useState } from 'react';
import { Button } from './button';
import Image from 'next/image';
import { uploadToCloudinary } from '@/lib/cloudinary';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  defaultImage?: string;
}

export function ImageUpload({ onUpload, defaultImage }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(defaultImage || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      // Create a preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Upload to Cloudinary
      const cloudinaryUrl = await uploadToCloudinary(file);
      onUpload(cloudinaryUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-40 h-40 border rounded-lg overflow-hidden">
        {preview ? (
          <Image
            src={preview}
            alt="Upload preview"
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button
            type="button"
            variant="outline"
            disabled={isUploading}
            className="cursor-pointer"
          >
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </Button>
        </label>
      </div>
    </div>
  );
}
