'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Raleway } from 'next/font/google';
import Link from 'next/link';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setError('Invalid verification link');
      return;
    }

    // Call the API to verify the email
    fetch(`/api/auth/verify-email?token=${token}`)
      .then(async (res) => {
        if (res.redirected) {
          // Successfully verified, redirect handled by API
          window.location.href = res.url;
        } else if (!res.ok) {
          const data = await res.json();
          setStatus('error');
          setError(data.error || 'Verification failed');
        }
      })
      .catch(() => {
        setStatus('error');
        setError('An error occurred during verification');
      });
  }, [token]);

  if (status === 'loading') {
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
                <div className="w-16 h-16 mx-auto border-4 border-[#911b1e] border-t-transparent rounded-full animate-spin"></div>
              </div>

              <h1 className="text-[#911b1e] text-2xl font-agrandir mb-4">
                Verifying Your Email...
              </h1>
              
              <p className={`text-[#911b1e]/70 ${raleway.className}`}>
                Please wait while we verify your email address.
              </p>
            </motion.div>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  if (status === 'error') {
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
                  className="w-20 h-20 mx-auto text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h1 className="text-[#911b1e] text-3xl font-agrandir mb-4">
                Verification Failed
              </h1>
              
              <p className={`text-[#911b1e]/70 mb-6 ${raleway.className}`}>
                {error}
              </p>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className={`text-red-600 text-sm ${raleway.className}`}>
                  {error === 'Verification token has expired' 
                    ? 'Your verification link has expired. Please sign up again to receive a new verification email.'
                    : 'The verification link is invalid or has already been used.'}
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  href="/auth/signup"
                  className={`inline-block bg-[#911b1e] text-[#fcf7dc] px-8 py-3 rounded hover:bg-[#911b1e]/90 transition-colors ${raleway.className} font-medium`}
                >
                  Sign Up Again
                </Link>
                <div>
                  <Link
                    href="/auth/signin"
                    className={`text-[#911b1e] hover:text-[#911b1e]/80 ${raleway.className} font-medium`}
                  >
                    Back to Sign In
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  return null;
}
