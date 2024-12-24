import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/mongodb';
import { authOptions } from '@/lib/auth';
import Project from '@/models/Project';

export async function POST(request: Request) {
  try {
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

    // Parse request body
    const data = await request.json();

    // Create project
    const project = await Project.create(data);

    // Populate tags
    await project.populate('tags');

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create project' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    // Connect to database
    await connectToDatabase();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const tag = searchParams.get('tag');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Build query
    const query: any = {};
    if (featured === 'true') {
      query.featured = true;
    }
    if (tag) {
      query.tags = tag;
    }

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Fetch projects with populated tags
    const [projects, total] = await Promise.all([
      Project.find(query)
        .sort({ featured: -1, order: 1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate({
          path: 'tags',
          select: '_id name',
          model: 'Tag'
        })
        .lean(),
      Project.countDocuments(query),
    ]);

    // Log the first project's tags for debugging
    if (projects.length > 0) {
      console.log('First project tags:', projects[0].tags);
    }

    return NextResponse.json({
      projects,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
