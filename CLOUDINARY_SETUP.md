# Cloudinary Setup Guide

## 1. Create Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Note down your Cloud Name, API Key, and API Secret from the dashboard

## 2. Configure Environment Variables
Update your `.env` file with your Cloudinary credentials:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-actual-cloud-name"
CLOUDINARY_API_KEY="your-actual-api-key"
CLOUDINARY_API_SECRET="your-actual-api-secret"
```

## 3. Create Upload Preset (Optional)
1. Go to Settings > Upload in your Cloudinary dashboard
2. Scroll down to "Upload presets"
3. Click "Add upload preset"
4. Set the preset name to: `lkj-tennis-members`
5. Set the folder to: `lkj-tennis-club/members`
6. Configure transformations:
   - Width: 400px
   - Height: 400px
   - Crop: Fill
   - Gravity: Face
7. Save the preset

## 4. Configure Next.js for Cloudinary Images
Update your `next.config.ts` file to allow Cloudinary images:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
```

## 5. Install Dependencies
Run the following command to install required packages:

```bash
npm install cloudinary next-cloudinary
```

## 6. Test the Setup
1. Start your development server: `npm run dev`
2. Go to `/admin/members/new`
3. Try uploading a profile image
4. Check your Cloudinary dashboard to see if the image was uploaded

## Features Included:
- ✅ Automatic image optimization
- ✅ Face-centered cropping
- ✅ 400x400px profile images
- ✅ Organized folder structure
- ✅ Secure upload handling
- ✅ Image deletion support
- ✅ Beautiful upload UI with drag & drop
- ✅ Progress indicators
- ✅ Error handling

## Folder Structure:
Images will be organized as:
```
lkj-tennis-club/
└── members/
    ├── member1_image.jpg
    ├── member2_image.jpg
    └── ...
```

## Security Notes:
- API credentials are server-side only
- Upload preset can be configured for additional security
- Images are automatically optimized for web delivery
- File size and type validation included