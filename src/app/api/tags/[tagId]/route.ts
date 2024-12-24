import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/mongodb';
import { authOptions } from '@/lib/auth';
import Tag from '@/models/Tag';
import Post from '@/models/Post';
import mongoose from 'mongoose';

export async function DELETE(
  request: Request,
  context: { params: { tagId: string } }
) {
  try {
    // Get tagId from context and await it
    const tagId = await Promise.resolve(context.params.tagId);

    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Validate tagId
    if (!mongoose.Types.ObjectId.isValid(tagId)) {
      return NextResponse.json(
        { error: 'Invalid tag ID format' },
        { status: 400 }
      );
    }

    // Check if tag exists
    const tag = await Tag.findById(tagId);
    if (!tag) {
      return NextResponse.json(
        { error: 'Tag not found' },
        { status: 404 }
      );
    }

    // Check if tag is being used in any posts
    const postsUsingTag = await Post.countDocuments({ tags: tagId });
    if (postsUsingTag > 0) {
      return NextResponse.json(
        { error: 'Cannot delete tag as it is being used in posts' },
        { status: 400 }
      );
    }

    // Delete the tag
    await Tag.findByIdAndDelete(tagId);

    return NextResponse.json({ message: 'Tag deleted successfully' });
  } catch (error) {
    console.error('Error deleting tag:', error);
    return NextResponse.json(
      { error: 'Failed to delete tag' },
      { status: 500 }
    );
  }
}
