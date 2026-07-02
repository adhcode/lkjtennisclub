import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import type { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData = (await request.formData()) as unknown as globalThis.FormData;
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary with product-specific settings
    const result: UploadApiResponse = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'lkj-tennis-club/products',
          transformation: [
            { width: 800, height: 800, crop: 'limit' }, // Maintain aspect ratio, max 800x800
            { quality: 'auto:good', fetch_format: 'auto' }
          ]
        },
        (error: UploadApiErrorResponse | undefined, uploadResult: UploadApiResponse | undefined) => {
          if (error || !uploadResult) {
            reject(error ?? new Error('Upload failed'));
          } else {
            resolve(uploadResult);
          }
        }
      ).end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id
    });

  } catch (error) {
    console.error('Error uploading product image:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
