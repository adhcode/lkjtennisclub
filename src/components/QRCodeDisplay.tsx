'use client'

import Image from 'next/image'
import { useState } from 'react'

interface QRCodeDisplayProps {
  qrCodeDataUrl: string
  memberName: string
  membershipId: string
}

export default function QRCodeDisplay({ qrCodeDataUrl, memberName, membershipId }: QRCodeDisplayProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="text-center">
      <div className="relative inline-block">
        {/* QR Code Card */}
        <div className="bg-white p-8 rounded-2xl border-2 border-[#911b1e]/20 shadow-lg">
          {/* Club Logo/Header */}
          <div className="mb-6">
            <div className="flex items-center justify-center mb-3">
              <Image
                src="/logo.png"
                alt="LKJ Tennis Club"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <h3 className="font-bruno text-[#911b1e] text-lg tracking-wide">
              LKJ TENNIS CLUB
            </h3>
            <p className="font-raleway text-[#911b1e]/60 text-sm">
              Member Verification
            </p>
          </div>

          {/* QR Code */}
          <div className="relative w-64 h-64 mx-auto mb-6">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-[#fcf7dc]/50 animate-pulse rounded-lg"></div>
            )}
            <Image
              src={qrCodeDataUrl}
              alt={`QR Code for ${memberName}`}
              fill
              className="object-contain rounded-lg"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          
          {/* Member Info */}
          <div className="pt-6 border-t border-[#911b1e]/20">
            <h4 className="font-bruno text-[#911b1e] text-xl mb-2 tracking-wide">
              {memberName}
            </h4>
            <p className="text-[#911b1e]/70 font-mono text-sm font-medium mb-2">
              {membershipId}
            </p>
            <p className="text-[#911b1e]/50 font-raleway text-xs">
              Scan to verify membership status
            </p>
          </div>
        </div>
        
        {/* Decorative corners with club colors */}
        <div className="absolute -top-3 -left-3 w-6 h-6 border-l-4 border-t-4 border-[#911b1e] rounded-tl-lg"></div>
        <div className="absolute -top-3 -right-3 w-6 h-6 border-r-4 border-t-4 border-[#911b1e] rounded-tr-lg"></div>
        <div className="absolute -bottom-3 -left-3 w-6 h-6 border-l-4 border-b-4 border-[#911b1e] rounded-bl-lg"></div>
        <div className="absolute -bottom-3 -right-3 w-6 h-6 border-r-4 border-b-4 border-[#911b1e] rounded-br-lg"></div>
      </div>
      
      <div className="mt-8 p-4 bg-[#fcf7dc]/50 rounded-lg border border-[#911b1e]/10">
        <p className="text-[#911b1e]/80 font-raleway text-sm">
          This QR code is ready for printing on ID cards
        </p>
        <p className="text-[#911b1e]/60 font-raleway text-xs mt-1">
          High resolution download available above
        </p>
      </div>
    </div>
  )
}