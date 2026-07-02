'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Raleway } from 'next/font/google';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

export default function VerifyRequestPage() {
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
                className="w-16 h-16 mx-auto text-[#911b1e]"
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
              Check your email
            </h1>
            
            <p className={`text-[#911b1e]/70 mb-6 ${raleway.className}`}>
              A sign in link has been sent to your email address.
            </p>

            <div className="bg-[#fcf7dc] border border-[#911b1e]/20 rounded-lg p-4 mb-6">
              <p className={`text-[#911b1e] text-sm ${raleway.className}`}>
                Click the link in the email to sign in to your account. The link will expire in 24 hours.
              </p>
            </div>

            <p className={`text-[#911b1e]/60 text-sm ${raleway.className}`}>
              Didn't receive the email? Check your spam folder or try signing in again.
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
