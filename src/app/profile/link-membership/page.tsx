'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Raleway } from 'next/font/google';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

interface MemberData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function LinkMembershipPage() {
  const { status } = useSession();
  const router = useRouter();
  const [step, setStep] = useState<'input' | 'verify' | 'success'>('input');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [membershipId, setMembershipId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [memberData, setMemberData] = useState<MemberData | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?redirect=/profile/link-membership');
    }
  }, [status, router]);

  const handleLookupMembership = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/membership/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ membershipId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Membership ID not found');
        setLoading(false);
        return;
      }

      setMemberData(data.member);
      setStep('verify');
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/membership/verify-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          membershipId,
          verificationCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Invalid verification code');
        setLoading(false);
        return;
      }

      setStep('success');
      setTimeout(() => {
        router.push('/profile');
      }, 2000);
    } catch {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResendLoading(true);
    setResendMessage('');
    setError('');

    try {
      const response = await fetch('/api/membership/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ membershipId }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to resend code');
        setResendLoading(false);
        return;
      }

      setResendMessage('✓ New code sent to your email!');
      setTimeout(() => setResendMessage(''), 5000);
    } catch {
      setError('Failed to resend code. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-[#fcf7dc]">
        <Navbar />
        <div className="pt-32 pb-16 px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto border-4 border-[#911b1e] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcf7dc]">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-[#911b1e] text-4xl font-agrandir mb-2">
              Link Membership
            </h1>
            <p className={`text-[#911b1e]/60 mb-8 ${raleway.className}`}>
              Connect your club membership to your account
            </p>

            <div className="bg-white rounded-lg p-8 shadow-sm">
              {/* Step Indicator */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step === 'input' ? 'bg-[#911b1e] text-[#fcf7dc]' : 'bg-green-500 text-white'
                  }`}>
                    {step === 'input' ? '1' : '✓'}
                  </div>
                  <div className={`w-16 h-1 ${step !== 'input' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step === 'verify' ? 'bg-[#911b1e] text-[#fcf7dc]' : 
                    step === 'success' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step === 'success' ? '✓' : '2'}
                  </div>
                  <div className={`w-16 h-1 ${step === 'success' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step === 'success' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {step === 'success' ? '✓' : '3'}
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}

              {/* Step 1: Enter Membership ID */}
              {step === 'input' && (
                <form onSubmit={handleLookupMembership} className="space-y-6">
                  <div>
                    <label className={`block text-[#911b1e] mb-2 ${raleway.className} font-medium`}>
                      Membership ID
                    </label>
                    <input
                      type="text"
                      value={membershipId}
                      onChange={(e) => setMembershipId(e.target.value.toUpperCase())}
                      required
                      placeholder="LKJ-2025-001"
                      className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e] font-mono text-lg"
                    />
                    <p className={`text-[#911b1e]/60 text-sm mt-2 ${raleway.className}`}>
                      Enter your membership ID (found on your ID card)
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-[#911b1e] text-[#fcf7dc] py-4 rounded hover:bg-[#911b1e]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${raleway.className} font-medium`}
                  >
                    {loading ? 'Looking up...' : 'Continue'}
                  </motion.button>
                </form>
              )}

              {/* Step 2: Verify with Code */}
              {step === 'verify' && memberData && (
                <div className="space-y-6">
                  <div className="bg-[#fcf7dc] border border-[#911b1e]/20 rounded-lg p-6">
                    <h3 className="text-[#911b1e] font-agrandir text-lg mb-4">
                      Membership Found
                    </h3>
                    <div className="space-y-2">
                      <p className={`text-[#911b1e] ${raleway.className}`}>
                        <span className="font-medium">Name:</span> {memberData.firstName} {memberData.lastName}
                      </p>
                      <p className={`text-[#911b1e] ${raleway.className}`}>
                        <span className="font-medium">Email:</span> {memberData.email}
                      </p>
                      <p className={`text-[#911b1e] ${raleway.className}`}>
                        <span className="font-medium">Phone:</span> {memberData.phone}
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className={`text-blue-800 text-sm ${raleway.className}`}>
                      📧 A verification code has been sent to <strong>{memberData.email}</strong>
                    </p>
                  </div>

                  {resendMessage && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className={`text-green-800 text-sm ${raleway.className}`}>
                        {resendMessage}
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleVerifyCode} className="space-y-6">
                    <div>
                      <label className={`block text-[#911b1e] mb-2 ${raleway.className} font-medium`}>
                        Verification Code
                      </label>
                      <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        required
                        placeholder="Enter 6-digit code"
                        maxLength={6}
                        className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e] font-mono text-2xl text-center tracking-widest"
                      />
                    </div>

                    <div className="flex gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className={`flex-1 bg-[#911b1e] text-[#fcf7dc] py-4 rounded hover:bg-[#911b1e]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${raleway.className} font-medium`}
                      >
                        {loading ? 'Verifying...' : 'Verify & Link'}
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={() => setStep('input')}
                        className={`flex-1 bg-white border-2 border-[#911b1e]/20 text-[#911b1e] py-4 rounded hover:border-[#911b1e] transition-colors ${raleway.className} font-medium`}
                      >
                        Back
                      </motion.button>
                    </div>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={resendLoading}
                        className={`text-[#911b1e] hover:underline text-sm ${raleway.className} disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {resendLoading ? 'Sending...' : "Didn't receive the code? Resend"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 3: Success */}
              {step === 'success' && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-[#911b1e] text-2xl font-agrandir mb-2">
                    Membership Linked! 🎉
                  </h3>
                  <p className={`text-[#911b1e]/70 ${raleway.className}`}>
                    Your club membership has been successfully linked to your account.
                  </p>
                  <p className={`text-[#911b1e]/60 text-sm mt-4 ${raleway.className}`}>
                    Redirecting to your profile...
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
