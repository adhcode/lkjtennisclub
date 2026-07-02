'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Raleway } from 'next/font/google';
import { Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

export default function RequestProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    productName: '',
    description: '',
    category: '',
    urgency: 'normal',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/product-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/shop');
        }, 2000);
      }
    } catch {
      alert('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-[#fcf7dc]">
        <Navbar />
        <div className="pt-32 pb-16 px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-12"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-[#911b1e] text-2xl font-agrandir mb-2">
                Request Submitted!
              </h2>
              <p className={`text-[#911b1e]/70 ${raleway.className}`}>
                We'll review your request and get back to you soon.
              </p>
            </motion.div>
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
            <Link
              href="/shop"
              className={`inline-flex items-center gap-2 text-[#911b1e] hover:text-[#911b1e]/80 mb-6 ${raleway.className}`}
            >
              <ArrowLeft size={20} />
              Back to Shop
            </Link>

            <div className="flex items-center gap-3 mb-2">
              <Package className="text-[#911b1e]" size={32} />
              <h1 className="text-[#911b1e] text-4xl font-agrandir">
                Request a Product
              </h1>
            </div>
            <p className={`text-[#911b1e]/60 mb-8 ${raleway.className}`}>
              Didn't see what you want? Tell us what you're looking for!
            </p>

            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 space-y-6">
              <div>
                <h2 className="text-[#911b1e] text-xl font-agrandir mb-4">
                  Your Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className={`block text-[#911b1e] mb-2 ${raleway.className} font-medium`}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-[#911b1e] mb-2 ${raleway.className} font-medium`}>
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                      />
                    </div>

                    <div>
                      <label className={`block text-[#911b1e] mb-2 ${raleway.className} font-medium`}>
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-[#911b1e] text-xl font-agrandir mb-4">
                  Product Details
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className={`block text-[#911b1e] mb-2 ${raleway.className} font-medium`}>
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="productName"
                      value={formData.productName}
                      onChange={handleChange}
                      required
                      placeholder="e.g., Wilson Pro Staff 97"
                      className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                    />
                  </div>

                  <div>
                    <label className={`block text-[#911b1e] mb-2 ${raleway.className} font-medium`}>
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                    >
                      <option value="">Select category</option>
                      <option value="rackets">Rackets</option>
                      <option value="balls">Tennis Balls</option>
                      <option value="mens-apparel">Men's Apparel</option>
                      <option value="womens-apparel">Women's Apparel</option>
                      <option value="shoes">Shoes</option>
                      <option value="accessories">Accessories</option>
                      <option value="strings">Strings</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-[#911b1e] mb-2 ${raleway.className} font-medium`}>
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Please describe the product you're looking for, including brand, model, size, color, etc."
                      className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                    />
                  </div>

                  <div>
                    <label className={`block text-[#911b1e] mb-2 ${raleway.className} font-medium`}>
                      How soon do you need it?
                    </label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                    >
                      <option value="normal">No rush</option>
                      <option value="soon">Within 2 weeks</option>
                      <option value="urgent">Urgent (ASAP)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className={`flex-1 bg-[#911b1e] text-[#fcf7dc] py-4 hover:bg-[#911b1e]/90 
                    transition-colors disabled:opacity-50 disabled:cursor-not-allowed 
                    ${raleway.className} font-medium`}
                >
                  {loading ? 'Submitting...' : 'Submit Request'}
                </motion.button>

                <Link href="/shop" className="flex-shrink-0">
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
