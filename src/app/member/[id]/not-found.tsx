import Link from 'next/link'
import Image from 'next/image'
import { AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fcf7dc] via-[#fcf7dc]/90 to-[#fcf7dc]/80">
      {/* Hero Section */}
      <div className="relative bg-[#911b1e] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#911b1e] via-[#911b1e]/95 to-[#911b1e]/90"></div>
        <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Image
                src="/logo.png"
                alt="LKJ Tennis Club"
                width={80}
                height={80}
                className="h-20 w-auto"
              />
            </div>
            <h1 className="font-bruno text-[#fcf7dc] text-4xl md:text-6xl mb-4 tracking-wider">
              LKJ TENNIS CLUB
            </h1>
            <p className="font-raleway text-[#fcf7dc]/90 text-lg md:text-xl font-light tracking-wide">
              Member Verification System
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
            
            <h2 className="font-bruno text-[#911b1e] text-3xl mb-4 tracking-wide">
              Member Not Found
            </h2>
            
            <p className="text-[#911b1e]/80 font-raleway text-lg mb-8 leading-relaxed">
              The member ID you're looking for doesn't exist or may have been deactivated.
            </p>
            
            <div className="space-y-6">
              <div className="bg-[#fcf7dc]/50 p-6 rounded-lg border border-[#911b1e]/10">
                <p className="text-[#911b1e]/70 font-raleway text-sm">
                  Please verify the QR code or member ID and try again. If you believe this is an error, 
                  contact the club administration for assistance.
                </p>
              </div>
              
              <Link 
                href="/"
                className="group relative overflow-hidden inline-block"
              >
                <div className="relative z-10 bg-[#911b1e] px-8 py-4 text-[#fcf7dc] font-raleway text-base transition-all duration-300 hover:bg-[#fcf7dc] hover:text-[#911b1e] border border-[#911b1e]">
                  Return to Home
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}