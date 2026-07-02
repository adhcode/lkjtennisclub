'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Raleway } from 'next/font/google';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

export default function EditProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?redirect=/profile/edit');
    } else if (status === 'authenticated' && session?.user) {
      const user = session.user as any;
      setFormData({
        name: user.name || '',
        email: user.email || '',
      });
      setLoading(false);
    }
  }, [status, session, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to update profile');
        setSaving(false);
        return;
      }

      // Update session
      await update({
        ...session,
        user: {
          ...session?.user,
          name: formData.name,
        },
      });

      setSuccess('Profile updated successfully!');
      setTimeout(() => {
        router.push('/profile');
      }, 1500);
    } catch (err) {
      setError('An error occurred. Please try again.');
      setSaving(false);
    }
  };

  if (loading || status === 'loading') {
    return (
      <main className="min-h-screen bg-[#fcf7dc]">
        <Navbar />
        <div className="pt-32 pb-16 px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto border-4 border-[#911b1e] border-t-transparent rounded-full animate-spin"></div>
            <p className={`mt-4 text-[#911b1e] ${raleway.className}`}>Loading...</p>
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
              Edit Profile
            </h1>
            <p className={`text-[#911b1e]/60 mb-8 ${raleway.className}`}>
              Update your account information
            </p>

            <div className="bg-white rounded-lg p-8 shadow-sm">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded mb-6">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className={`block text-[#911b1e] mb-2 ${raleway.className} font-medium`}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className={`block text-[#911b1e] mb-2 ${raleway.className} font-medium`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-3 border border-[#911b1e]/20 rounded bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                  <p className={`text-[#911b1e]/60 text-sm mt-1 ${raleway.className}`}>
                    Email cannot be changed
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={saving}
                    className={`flex-1 bg-[#911b1e] text-[#fcf7dc] py-3 rounded hover:bg-[#911b1e]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${raleway.className} font-medium`}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => router.push('/profile')}
                    className={`flex-1 bg-white border-2 border-[#911b1e]/20 text-[#911b1e] py-3 rounded hover:border-[#911b1e] transition-colors ${raleway.className} font-medium`}
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
