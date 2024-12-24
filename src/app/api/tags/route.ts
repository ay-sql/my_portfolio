import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/mongodb';
import { authOptions } from '@/lib/auth';
import Tag from '@/models/Tag';
import { initModels } from '@/lib/db/models';
import Post from '@/models/Post';

export async function GET() {
  try {
    await connectToDatabase();
    initModels();
    
    const tags = await Tag.find().lean();

    // For each tag, get the actual count from posts
    const tagsWithCounts = await Promise.all(tags.map(async (tag) => {
      const count = await Post.countDocuments({ tags: tag._id });
      return { ...tag, count };
    }));

    return NextResponse.json({ tags: tagsWithCounts });
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json({ tags: [] }, { status: 500 });
  }
}

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
    const { name } = await req.json();

    // Check if tag already exists
    let tag = await Tag.findOne({ name: name.toLowerCase() });

    if (tag) {
      return NextResponse.json(
        { error: 'Tag already exists' },
        { status: 400 }
      );
    }

    // Create new tag with count 0
    tag = await Tag.create({
      name: name.toLowerCase(),
      count: 0,
    });

    return NextResponse.json(tag);
  } catch (error) {
    console.error('Error creating tag:', error);
    return NextResponse.json(
      { error: 'Failed to create tag' },
      { status: 500 }
    );
  }
}
