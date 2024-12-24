import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define a type for the upload response
interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  // Add other properties as needed
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

    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert buffer to base64
    const base64String = buffer.toString('base64');
    const uploadResponse: CloudinaryUploadResponse = await new Promise<CloudinaryUploadResponse>((resolve, reject) => {
      cloudinary.uploader.upload(
        `data:${file.type};base64,${base64String}`,
        {
          folder: 'portfolio/projects',
          transformation: [
            { width: 1920, height: 1080, crop: 'fill' },
            { quality: 'auto:good' }
          ]
        },
        (error: Error, result: CloudinaryUploadResponse) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });

    return NextResponse.json({ 
      url: uploadResponse.secure_url 
    });
  } catch (error) {
    console.error('Failed to upload file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
