'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Raleway } from 'next/font/google';
import Link from 'next/link';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

export default function VerifySuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Auto redirect to signin after 5 seconds
    const timer = setTimeout(() => {
      router.push('/auth/signin?message=Email verified! Please sign in.');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="min-h-screen bg-[#fcf7dc]">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-8 shadow-sm text-center"
          >
            <div className="mb-6">
              <svg
                className="w-20 h-20 mx-auto text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h1 className="text-[#911b1e] text-3xl font-agrandir mb-4">
              Email Verified! 🎉
            </h1>
            
            <p className={`text-[#911b1e]/70 mb-6 ${raleway.className}`}>
              Your email has been successfully verified. Welcome to LKJ Tennis Club!
            </p>

            <div className="bg-[#fcf7dc] border border-[#911b1e]/20 rounded-lg p-4 mb-6">
              <p className={`text-[#911b1e] text-sm ${raleway.className}`}>
                You can now sign in to your account and access all features.
              </p>
            </div>

            <Link
              href="/auth/signin"
              className={`inline-block bg-[#911b1e] text-[#fcf7dc] px-8 py-3 rounded hover:bg-[#911b1e]/90 transition-colors ${raleway.className} font-medium`}
            >
              Sign In Now
            </Link>

            <p className={`text-[#911b1e]/60 text-sm mt-6 ${raleway.className}`}>
              Redirecting to sign in page in 5 seconds...
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
