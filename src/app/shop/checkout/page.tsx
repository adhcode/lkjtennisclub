'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Raleway } from 'next/font/google';
import { getCart, clearCart, type Cart } from '@/lib/cart';
import Image from 'next/image';
import Link from 'next/link';
import { UserPlus, Zap } from 'lucide-react';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [useSavedAddress, setUseSavedAddress] = useState(true);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    notes: '',
  });

  useEffect(() => {
    const currentCart = getCart();
    if (currentCart.items.length === 0) {
      router.push('/shop');
    }
    setCart(currentCart);
  }, [router]);

  // Auto-fill form for logged-in users
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const user = session.user as any;
      setFormData(prev => ({
        ...prev,
        customerName: user.name || prev.customerName,
        customerEmail: user.email || prev.customerEmail,
        customerPhone: user.phone || prev.customerPhone,
        shippingAddress: user.address || prev.shippingAddress,
        shippingCity: user.city || prev.shippingCity,
        shippingState: user.state || prev.shippingState,
      }));
    }
  }, [status, session]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const shippingCost = 2000;
  const total = cart.total + shippingCost;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isFormValid()) {
      // Store shipping info in sessionStorage and go to payment page
      sessionStorage.setItem('checkoutData', JSON.stringify({
        ...formData,
        items: cart.items,
        subtotal: cart.total,
        shipping: shippingCost,
        total: total,
      }));
      router.push('/shop/payment');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Validate form before showing Paystack button
  const isFormValid = () => {
    if (useSavedAddress && status === 'authenticated' && session?.user && (session.user as any).address) {
      return formData.customerEmail && formData.customerName;
    }
    return (
      formData.customerName &&
      formData.customerEmail &&
      formData.customerPhone &&
      formData.shippingAddress &&
      formData.shippingCity &&
      formData.shippingState
    );
  };

  return (
    <main className="min-h-screen bg-[#fcf7dc]">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#911b1e] text-3xl md:text-4xl font-agrandir mb-8 text-center"
          >
            CHECKOUT
          </motion.h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {/* Guest Sign-up Prompt */}
              {status === 'unauthenticated' && (
                <div className="bg-gradient-to-r from-[#911b1e] to-[#911b1e]/90 rounded-lg p-6 mb-6 text-[#fcf7dc]">
                  <div className="flex items-start gap-4">
                    <Zap className="flex-shrink-0 mt-1" size={24} />
                    <div className="flex-1">
                      <h3 className="font-agrandir text-lg mb-2">
                        Want Faster Checkout?
                      </h3>
                      <p className={`text-[#fcf7dc]/90 text-sm mb-4 ${raleway.className}`}>
                        Sign up to save your address and skip filling forms every time you shop!
                      </p>
                      <div className="flex gap-3">
                        <Link href="/auth/signup?redirect=/shop/checkout">
                          <button className={`bg-[#fcf7dc] text-[#911b1e] px-4 py-2 rounded hover:bg-white transition-colors text-sm ${raleway.className} font-medium flex items-center gap-2`}>
                            <UserPlus size={16} />
                            Sign Up
                          </button>
                        </Link>
                        <Link href="/auth/signin?redirect=/shop/checkout">
                          <button className={`border-2 border-[#fcf7dc] text-[#fcf7dc] px-4 py-2 rounded hover:bg-[#fcf7dc]/10 transition-colors text-sm ${raleway.className} font-medium`}>
                            Sign In
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Logged-in User Info */}
              {status === 'authenticated' && session?.user && (session.user as any).address && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className={`text-green-800 text-sm ${raleway.className}`}>
                    ✓ <strong>Signed in as {(session.user as any).name || session.user.email}</strong>
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 space-y-6">
                {/* For logged-in users with saved address */}
                {status === 'authenticated' && session?.user && (session.user as any).address && useSavedAddress ? (
                  <>
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[#911b1e] text-xl font-agrandir">
                          Delivery Information
                        </h2>
                        <button
                          type="button"
                          onClick={() => setUseSavedAddress(false)}
                          className={`text-[#911b1e] text-sm hover:underline ${raleway.className}`}
                        >
                          Use different address
                        </button>
                      </div>
                      
                      <div className="bg-[#fcf7dc] border border-[#911b1e]/20 rounded-lg p-4">
                        <p className={`text-[#911b1e] font-medium mb-2 ${raleway.className}`}>
                          {(session.user as any).name}
                        </p>
                        <p className={`text-[#911b1e]/80 text-sm ${raleway.className}`}>
                          {(session.user as any).phone}
                        </p>
                        <p className={`text-[#911b1e]/80 text-sm ${raleway.className}`}>
                          {(session.user as any).address}
                        </p>
                        <p className={`text-[#911b1e]/80 text-sm ${raleway.className}`}>
                          {(session.user as any).city}, {(session.user as any).state} {(session.user as any).postalCode}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Show full form for guests or when user wants different address */}
                    {status === 'authenticated' && session?.user && (session.user as any).address && !useSavedAddress && (
                      <div className="mb-4">
                        <button
                          type="button"
                          onClick={() => setUseSavedAddress(true)}
                          className={`text-[#911b1e] text-sm hover:underline ${raleway.className}`}
                        >
                          ← Use my saved address
                        </button>
                      </div>
                    )}
                    
                    <div>
                      <h2 className="text-[#911b1e] text-xl font-agrandir mb-4">
                        Contact Information
                      </h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label className={`block text-[#911b1e] mb-2 ${raleway.className}`}>
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                          />
                        </div>

                        <div>
                          <label className={`block text-[#911b1e] mb-2 ${raleway.className}`}>
                            Email *
                          </label>
                          <input
                            type="email"
                            name="customerEmail"
                            value={formData.customerEmail}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                          />
                        </div>

                        <div>
                          <label className={`block text-[#911b1e] mb-2 ${raleway.className}`}>
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="customerPhone"
                            value={formData.customerPhone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-[#911b1e] text-xl font-agrandir mb-4">
                        Shipping Address
                      </h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label className={`block text-[#911b1e] mb-2 ${raleway.className}`}>
                            Street Address *
                          </label>
                          <input
                            type="text"
                            name="shippingAddress"
                            value={formData.shippingAddress}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className={`block text-[#911b1e] mb-2 ${raleway.className}`}>
                              City *
                            </label>
                            <input
                              type="text"
                              name="shippingCity"
                              value={formData.shippingCity}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                            />
                          </div>

                          <div>
                            <label className={`block text-[#911b1e] mb-2 ${raleway.className}`}>
                          State *
                        </label>
                        <input
                          type="text"
                          name="shippingState"
                          value={formData.shippingState}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                  </>
                )}

                <div>
                  <label className={`block text-[#911b1e] mb-2 ${raleway.className}`}>
                    Order Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                    placeholder="Any special instructions?"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading || !isFormValid()}
                  className={`w-full bg-[#911b1e] text-[#fcf7dc] py-4 hover:bg-[#911b1e]/90 
                    transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${raleway.className} font-medium`}
                >
                  Proceed to Payment
                </motion.button>
              </form>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-white rounded-lg p-6 sticky top-32">
                <h2 className="text-[#911b1e] text-xl font-agrandir mb-4">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {cart.items.map((item) => (
                    <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4">
                      <div className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                        <Image
                          src={item.image || '/placeholder-product.jpg'}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className={`text-[#911b1e] font-medium ${raleway.className}`}>
                          {item.name}
                        </p>
                        {(item.size || item.color) && (
                          <p className={`text-[#911b1e]/60 text-sm ${raleway.className}`}>
                            {item.size && `Size: ${item.size}`}
                            {item.size && item.color && ' • '}
                            {item.color && item.color}
                          </p>
                        )}
                        <p className={`text-[#911b1e]/60 text-sm ${raleway.className}`}>
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className={`text-[#911b1e] font-semibold ${raleway.className}`}>
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#911b1e]/20 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className={`text-[#911b1e]/70 ${raleway.className}`}>Subtotal</span>
                    <span className={`text-[#911b1e] ${raleway.className}`}>{formatPrice(cart.total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-[#911b1e]/70 ${raleway.className}`}>Shipping</span>
                    <span className={`text-[#911b1e] ${raleway.className}`}>{formatPrice(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-[#911b1e]/20">
                    <span className={`text-[#911b1e] ${raleway.className}`}>Total</span>
                    <span className={`text-[#911b1e] ${raleway.className}`}>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
