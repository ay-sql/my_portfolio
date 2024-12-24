import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/mongodb';
import { authOptions } from '@/lib/auth';
import HeroContent from '@/models/HeroContent';

export async function GET() {
  try {
    await connectToDatabase();
    const content = await HeroContent.findOne();
    return NextResponse.json(content || {});
  } catch (error) {
    console.error('Error fetching hero content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero content' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validate that all required fields are present
    if (!body.title || !body.subtitle || !body.description) {
      return NextResponse.json(
        { error: 'Missing required fields: title, subtitle, and description are required' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const content = await HeroContent.findOneAndUpdate(
      {}, // find first document
      {
        title: body.title,
        subtitle: body.subtitle,
        description: body.description,
        ctaText: body.ctaText || 'Contact Me',
        ctaLink: body.ctaLink || '#contact'
      },
      { new: true, upsert: true, runValidators: true }
    );

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error updating hero content:', error);
    return NextResponse.json(
      { error: 'Failed to update hero content' },
      { status: 500 }
    );
  }
}