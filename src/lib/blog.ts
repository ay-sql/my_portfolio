import 'server-only';
import { connectToDatabase } from './mongodb';
import { initModels } from './db/models';
import BlogPost from '@/models/BlogPost';

export interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  content: string;
  image: string;
  readingTime: number;
  tags: {
    _id: string;
    name: string;
  }[];
  status: 'draft' | 'published';
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    await connectToDatabase();
    
    const post = await BlogPost.findOne({ slug })
      .populate('author', 'username')
      .populate('tags', 'name')
      .lean();

    if (!post) {
      console.log(`No post found with slug: ${slug}`);
      return null;
    }

    return {
      ...post,
      _id: post._id.toString(),
      author: post.author ? {
        _id: post.author._id.toString(),
        username: post.author.username
      } : null,
      tags: post.tags.map((tag: any) => ({
        _id: tag._id.toString(),
        name: tag.name
      }))
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function getAllBlogPosts(options: {
  limit?: number;
  page?: number;
  status?: string;
} = {}): Promise<{ posts: BlogPost[]; total: number; pages: number }> {
  try {
    await connectToDatabase();
    initModels();
    
    const { limit = 10, page = 1, status = 'published' } = options;
    const skip = (page - 1) * limit;
    
    const query = status === 'all' ? {} : { status };

    const posts = await BlogPost.find(query)
      .select('title content image readingTime tags status author createdAt updatedAt slug')
      .populate('author', 'username')
      .populate('tags', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()
      .then(docs => docs.map(doc => ({
        ...doc,
        _id: doc._id?.toString() || '',
        readingTime: doc.readingTime || 0,
        author: doc.author ? {
          _id: doc.author._id?.toString() || '',
          username: doc.author.username || ''
        } : {
          _id: '',
          username: ''
        },
        tags: (doc.tags || []).map(tag => ({
          _id: tag?._id?.toString() || '',
          name: tag?.name || ''
        }))
      })));

    const total = await BlogPost.countDocuments(query);

    return {
      posts,
      total,
      pages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { posts: [], total: 0, pages: 0 };
  }
}
