'use client';

import { useState, useRef } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { Raleway } from 'next/font/google';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

interface ProductImageUploadProps {
  onUploadSuccess: (url: string) => void;
  disabled?: boolean;
}

export default function ProductImageUpload({ onUploadSuccess, disabled = false }: ProductImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Upload to Cloudinary via our API
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);
      uploadFormData.append('folder', 'products'); // Specify products folder

      const response = await fetch('/api/upload-image/product', {
        method: 'POST',
        body: uploadFormData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      onUploadSuccess(data.url);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
    if (!disabled && !isUploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-2">
      <div
        onClick={handleUploadClick}
        className={`w-full p-8 border-2 border-dashed rounded-lg transition-all cursor-pointer ${
          disabled || isUploading
            ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
            : 'border-[#911b1e]/30 bg-[#fcf7dc]/20 hover:border-[#911b1e]/50 hover:bg-[#fcf7dc]/30'
        }`}
      >
        <div className="text-center">
          {isUploading ? (
            <>
              <Loader2 className="w-12 h-12 mx-auto mb-4 text-[#911b1e] animate-spin" />
              <p className={`text-[#911b1e] font-medium ${raleway.className}`}>
                Uploading image...
              </p>
              <p className={`text-[#911b1e]/60 text-sm mt-1 ${raleway.className}`}>
                Please wait
              </p>
            </>
          ) : (
            <>
              <Upload className="w-12 h-12 mx-auto mb-4 text-[#911b1e]/60" />
              <p className={`text-[#911b1e] font-medium mb-1 ${raleway.className}`}>
                Click to upload product image
              </p>
              <p className={`text-[#911b1e]/60 text-sm ${raleway.className}`}>
                PNG, JPG up to 5MB
              </p>
            </>
          )}
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || isUploading}
      />
    </div>
  );
}
