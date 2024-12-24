import { getBlogPost } from '@/lib/blog';
import EditBlogForm from './edit-blog-form';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditBlogPage({ params }: PageProps) {
  const post = await getBlogPost(params.id);
  
  if (!post) {
    console.log(`Failed to load post with id: ${params.id}`);
    notFound();
  }

  return <EditBlogForm post={post} />;
} 