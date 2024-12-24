'use client';

import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Button } from './ui/button';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  ImageIcon,
  Loader2,
} from 'lucide-react';
import '@/styles/editor.css';

const MenuBar = ({ editor }: any) => {
  const [isUploading, setIsUploading] = useState(false);
  const [setSelectedFile] = useState<File | null>(null);

  if (!editor) {
    return null;
  }

  const addImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async () => {
      if (input.files?.length) {
        const file = input.files[0];
        setSelectedFile(file);
        
        try {
          setIsUploading(true);
          const formData = new FormData();
          formData.append('file', file);

          // Create a temporary preview using FileReader
          const reader = new FileReader();
          reader.onload = (e) => {
            const previewUrl = e.target?.result as string;
            // Add preview image to editor
            editor.chain().focus().setImage({ 
              src: previewUrl,
              alt: 'Uploading...',
              'data-placeholder': true
            }).run();
          };
          reader.readAsDataURL(file);

          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) {
            throw new Error('Failed to upload image');
          }

          const data = await response.json();
          
          // Replace the preview with the actual uploaded image
          const doc = editor.view.state.doc;
          doc.descendants((node: any, _pos: number) => {
            if (node.type.name === 'image' && node.attrs['data-placeholder']) {
              editor.chain().focus().setImage({ 
                src: data.url,
                alt: file.name,
              }).run();
              return false;
            }
          });
        } catch (error) {
          console.error('Error uploading image:', error);
          // Remove the preview if upload failed
          editor.chain().focus().undo().run();
        } finally {
          setIsUploading(false);
          setSelectedFile(null);
        }
      }
    };
    
    input.click();
  };

  return (
    <div className="border border-input bg-transparent rounded-t-md p-1 flex flex-wrap gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-muted' : ''}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-muted' : ''}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'bg-muted' : ''}
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'bg-muted' : ''}
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'bg-muted' : ''}
      >
        <Heading3 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'bg-muted' : ''}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'bg-muted' : ''}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'bg-muted' : ''}
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'bg-muted' : ''}
      >
        <Code className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={addImage}
        disabled={isUploading}
        className="gap-1.5"
      >
        {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
      </Button>
    </div>
  );
};

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function Editor({ value, onChange, disabled }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg max-w-full h-auto',
          loading: 'lazy',
        },
        allowBase64: true,
      }),
    ],
    content: value,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4'
      }
    }
  });

  return (
    <div className="relative min-h-[500px] w-full border rounded-md">
      <style jsx global>{`
        .tiptap img {
          width: 100%;
          height: auto;
          max-height: 600px;
          object-fit: cover;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
      `}</style>
      <MenuBar editor={editor} />
      <div className="p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
