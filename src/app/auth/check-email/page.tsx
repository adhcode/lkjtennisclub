'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Raleway } from 'next/font/google';
import Link from 'next/link';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

export default function CheckEmailPage() {
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
                className="w-20 h-20 mx-auto text-[#911b1e]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            <h1 className="text-[#911b1e] text-3xl font-agrandir mb-4">
              Check Your Email
            </h1>
            
            <p className={`text-[#911b1e]/70 mb-6 ${raleway.className}`}>
              We've sent a verification link to your email address.
            </p>

            <div className="bg-[#fcf7dc] border border-[#911b1e]/20 rounded-lg p-4 mb-6">
              <p className={`text-[#911b1e] text-sm mb-3 ${raleway.className}`}>
                Please check your inbox and click the verification link to activate your account.
              </p>
              <p className={`text-[#911b1e]/70 text-sm ${raleway.className}`}>
                The link will expire in 24 hours.
              </p>
            </div>

            <div className="space-y-3">
              <p className={`text-[#911b1e]/60 text-sm ${raleway.className}`}>
                Didn't receive the email?
              </p>
              <ul className={`text-[#911b1e]/60 text-sm text-left space-y-2 ${raleway.className}`}>
                <li>• Check your spam or junk folder</li>
                <li>• Make sure you entered the correct email</li>
                <li>• Wait a few minutes and check again</li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#911b1e]/20">
              <Link
                href="/auth/signin"
                className={`text-[#911b1e] hover:text-[#911b1e]/80 ${raleway.className} font-medium`}
              >
                ← Back to Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
