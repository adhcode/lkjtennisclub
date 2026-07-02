'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Raleway } from 'next/font/google';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

export default function SignUpPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showGoogleButton, setShowGoogleButton] = useState(false);

  // Check if Google OAuth is configured
  useEffect(() => {
    fetch('/api/auth/providers')
      .then(res => res.json())
      .then(providers => {
        setShowGoogleButton('google' in providers);
      })
      .catch(() => setShowGoogleButton(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to create account');
        setLoading(false);
        return;
      }

      // Redirect to check email page
      router.push('/auth/check-email');
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fcf7dc]">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-8 shadow-sm"
          >
            <h1 className="text-[#911b1e] text-3xl font-agrandir mb-2 text-center">
              Create Account
            </h1>
            <p className={`text-[#911b1e]/60 text-center mb-8 ${raleway.className}`}>
              Join LKJ Tennis Club
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={`block text-[#911b1e] mb-2 ${raleway.className}`}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className={`block text-[#911b1e] mb-2 ${raleway.className}`}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className={`block text-[#911b1e] mb-2 ${raleway.className}`}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                  placeholder="••••••••"
                />
                <p className={`text-[#911b1e]/60 text-sm mt-1 ${raleway.className}`}>
                  At least 8 characters
                </p>
              </div>

              <div>
                <label className={`block text-[#911b1e] mb-2 ${raleway.className}`}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                  placeholder="••••••••"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className={`w-full bg-[#911b1e] text-[#fcf7dc] py-4 hover:bg-[#911b1e]/90 
                  transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${raleway.className} font-medium`}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </motion.button>
            </form>

            {showGoogleButton && (
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#911b1e]/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className={`px-2 bg-white text-[#911b1e]/60 ${raleway.className}`}>
                      Or continue with
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => signIn('google', { callbackUrl: '/' })}
                  className={`mt-4 w-full flex items-center justify-center gap-3 bg-white border-2 border-[#911b1e]/20 text-[#911b1e] py-4 hover:bg-gray-50 transition-colors ${raleway.className} font-medium`}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </motion.button>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className={`text-[#911b1e]/60 ${raleway.className}`}>
                Already have an account?{' '}
                <Link
                  href="/auth/signin"
                  className="text-[#911b1e] hover:text-[#911b1e]/80 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
