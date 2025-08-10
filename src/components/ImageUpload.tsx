'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, User, Camera, Loader2 } from 'lucide-react'

interface ImageUploadProps {
  currentImage?: string | null
  onImageChange: (imageUrl: string | null) => void
  disabled?: boolean
}

export default function ImageUpload({ currentImage, onImageChange, disabled = false }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB')
      return
    }

    setIsUploading(true)

    try {
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Upload to Cloudinary via our API
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: uploadFormData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload image')
      }

      const data = await response.json()
      onImageChange(data.url)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Failed to upload image. Please try again.')
      setPreviewUrl(currentImage || null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setPreviewUrl(null)
    onImageChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUploadClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div className="space-y-4">
      <label className="block text-[#911b1e]/60 text-sm font-raleway font-medium">
        Profile Image
      </label>
      
      <div className="flex flex-col items-center space-y-4">
        {/* Image Preview */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#911b1e]/20 shadow-lg bg-gradient-to-br from-[#fcf7dc] to-[#fcf7dc]/80">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Profile preview"
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-16 h-16 text-[#911b1e]/40" />
              </div>
            )}
          </div>

          {/* Upload/Camera Button */}
          <button
            type="button"
            onClick={handleUploadClick}
            disabled={disabled || isUploading}
            className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#911b1e] text-[#fcf7dc] rounded-full flex items-center justify-center hover:bg-[#911b1e]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isUploading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Camera className="w-5 h-5" />
            )}
          </button>

          {/* Remove Button */}
          {previewUrl && !isUploading && (
            <button
              type="button"
              onClick={handleRemoveImage}
              disabled={disabled}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Upload Area */}
        <div
          onClick={handleUploadClick}
          className={`w-full max-w-sm p-6 border-2 border-dashed rounded-xl transition-colors cursor-pointer ${
            disabled || isUploading
              ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
              : 'border-[#911b1e]/30 bg-[#fcf7dc]/20 hover:border-[#911b1e]/50 hover:bg-[#fcf7dc]/30'
          }`}
        >
          <div className="text-center">
            <Upload className={`w-8 h-8 mx-auto mb-3 ${
              disabled || isUploading ? 'text-gray-400' : 'text-[#911b1e]/60'
            }`} />
            <p className={`font-raleway text-sm mb-1 ${
              disabled || isUploading ? 'text-gray-500' : 'text-[#911b1e]/80'
            }`}>
              {isUploading ? 'Uploading...' : 'Click to upload image'}
            </p>
            <p className={`font-raleway text-xs ${
              disabled || isUploading ? 'text-gray-400' : 'text-[#911b1e]/60'
            }`}>
              PNG, JPG up to 5MB
            </p>
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

      {isUploading && (
        <div className="text-center">
          <p className="text-[#911b1e]/70 font-raleway text-sm">
            Uploading image, please wait...
          </p>
        </div>
      )}
    </div>
  )
}