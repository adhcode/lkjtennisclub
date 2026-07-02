'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Raleway } from 'next/font/google';
import { MapPin, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

export default function AddressPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?redirect=/profile/address');
    } else if (status === 'authenticated' && session?.user) {
      const user = session.user as any;
      setFormData({
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        postalCode: user.postalCode || '',
      });
    }
  }, [status, session, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/user/update-address', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Update the session with new address data
        await update({
          phone: data.user.phone,
          address: data.user.address,
          city: data.user.city,
          state: data.user.state,
          postalCode: data.user.postalCode,
        });
        setSuccess(true);
        // Redirect to profile after 1.5 seconds
        setTimeout(() => {
          router.push('/profile');
        }, 1500);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update address');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
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

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
    'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
    'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
    'Yobe', 'Zamfara'
  ];

  return (
    <main className="min-h-screen bg-[#fcf7dc]">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              href="/profile"
              className={`inline-flex items-center gap-2 text-[#911b1e] hover:text-[#911b1e]/80 mb-6 ${raleway.className}`}
            >
              <ArrowLeft size={20} />
              Back to Profile
            </Link>

            <div className="flex items-center gap-3 mb-2">
              <MapPin className="text-[#911b1e]" size={32} />
              <h1 className="text-[#911b1e] text-4xl font-agrandir">
                Shipping Address
              </h1>
            </div>
            <p className={`text-[#911b1e]/60 mb-8 ${raleway.className}`}>
              Save your address for faster checkout
            </p>

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6"
              >
                ✓ Address updated successfully!
              </motion.div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 space-y-6">
              <div>
                <label className={`block text-[#911b1e] mb-2 ${raleway.className} font-medium`}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                  placeholder="080XXXXXXXX"
                />
              </div>

              <div>
                <label className={`block text-[#911b1e] mb-2 ${raleway.className} font-medium`}>
                  Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                  placeholder="123 Main Street, Apartment 4B"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-[#911b1e] mb-2 ${raleway.className} font-medium`}>
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                    placeholder="Lagos"
                  />
                </div>

                <div>
                  <label className={`block text-[#911b1e] mb-2 ${raleway.className} font-medium`}>
                    State *
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                  >
                    <option value="">Select State</option>
                    {nigerianStates.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-[#911b1e] mb-2 ${raleway.className} font-medium`}>
                  Postal Code (Optional)
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                  placeholder="100001"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className={`text-blue-800 text-sm ${raleway.className}`}>
                  💡 <strong>Tip:</strong> Save your address now for faster checkout when shopping!
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className={`flex-1 bg-[#911b1e] text-[#fcf7dc] py-4 flex items-center justify-center gap-2
                    hover:bg-[#911b1e]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed 
                    ${raleway.className} font-medium`}
                >
                  <Save size={20} />
                  {loading ? 'Saving...' : 'Save Address'}
                </motion.button>

                <Link href="/profile" className="flex-shrink-0">
                  <button
                    type="button"
                    className={`px-8 py-4 border-2 border-[#911b1e]/20 text-[#911b1e] 
                      hover:border-[#911b1e] transition-colors ${raleway.className} h-full`}
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
