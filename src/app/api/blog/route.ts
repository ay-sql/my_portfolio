import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/mongodb';
import { authOptions } from '@/lib/auth';
import BlogPost from '@/models/BlogPost';
import Tag from '@/models/Tag';
import mongoose from 'mongoose';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const data = await req.json();
    const { tags: tagIds, ...postData } = data;

    // Convert session.user.id to ObjectId
    const authorId = new mongoose.Types.ObjectId(session.user.id);

    // Create the blog post
    const blogPost = await BlogPost.create({
      ...postData,
      tags: tagIds,
      author: authorId,
      slug: postData.title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
    });

    // Update tag counts
    if (tagIds && tagIds.length > 0) {
      await Tag.updateMany(
        { _id: { $in: tagIds } },
        { $inc: { count: 1 } }
      );
    }

    return NextResponse.json(blogPost);
  } catch (error) {
    console.error('Failed to create blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const tag = searchParams.get('tag') || '';

    const query: any = {};
    if (search) {
      query.$text = { $search: search };
    }
    if (tag) {
      query.tags = tag;
    }

    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      BlogPost.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('tags')
        .lean(),
      BlogPost.countDocuments(query),
    ]);

    return NextResponse.json({
      posts,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const data = await req.json();
    const { id, tags: newTagIds, ...updateData } = data;

    // Get the current blog post to compare tags
    const currentPost = await BlogPost.findById(id);
    if (!currentPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Convert current and new tag IDs to strings for comparison
    const currentTagIds = currentPost.tags.map((tag: any) => tag.toString());
    const newTagIdsStr = newTagIds.map((tag: string) => tag.toString());

    // Find tags to increment and decrement
    const tagsToDecrement = currentTagIds.filter(
      (tagId: string) => !newTagIdsStr.includes(tagId)
    );
    const tagsToIncrement = newTagIdsStr.filter(
      (tagId: string) => !currentTagIds.includes(tagId)
    );

    // Update tag counts
    if (tagsToDecrement.length > 0) {
      await Tag.updateMany(
        { _id: { $in: tagsToDecrement } },
        { $inc: { count: -1 } }
      );
    }
    if (tagsToIncrement.length > 0) {
      await Tag.updateMany(
        { _id: { $in: tagsToIncrement } },
        { $inc: { count: 1 } }
      );
    }

    // Update the blog post
    const updatedPost = await BlogPost.findByIdAndUpdate(
      id,
      {
        ...updateData,
        tags: newTagIds,
      },
      { new: true }
    ).populate('tags');

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Failed to update blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}
