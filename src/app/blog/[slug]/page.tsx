import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import ContactSection from '@/components/sections/contact-section'
import { getBlogPost } from '@/lib/blog'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import { Clock } from 'lucide-react'

// Export the interface so it can be used by other components
export interface BlogPost {
  slug: string
  title: string
  content: string
  image: string
  tags: Array<{ _id: string; name: string }>
  date: string
  author?: {
    username: string
  } | null
  createdAt: string
  readingTime: number
}

// Add type for generateMetadata params
type GenerateMetadataProps = {
  params: { slug: Promise<string> }
}

export async function generateMetadata(
  { params }: GenerateMetadataProps
): Promise<Metadata> {
  // Properly handle the async slug
  const resolvedSlug = String(params.slug);
  const post = await getBlogPost(resolvedSlug);
  
  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: post.title,
    description: post.content.substring(0, 200),
    openGraph: {
      title: post.title,
      description: post.content.substring(0, 200),
      images: [post.image],
    },
  };
}

// Add type for PageProps
type PageProps = {
  params: { slug: Promise<string> }
}

export default async function BlogPostPage({ params }: PageProps) {
  // Properly handle the async slug
  const resolvedSlug = String(params.slug);
  const post = await getBlogPost(resolvedSlug);
  
  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-background">
      {/* Hero Section with Image Background */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL={post.image}
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="container relative flex h-full items-end pb-16  px-10">
          <div className="mb-8 max-w-3xl space-y-4">
            {/* Tags moved to top */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag._id} variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              {post.author && <p>By {post.author.username}</p>}
              {post.author && <span>•</span>}
              <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readingTime} min read
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container py-12  px-16">
        <div className="prose prose-lg mx-auto dark:prose-invert">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>

      {/* Contact Section */}
      <ContactSection />
    </article>
  )
}
