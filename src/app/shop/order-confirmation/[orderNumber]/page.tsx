'use client';

import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Raleway } from 'next/font/google';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderNumber = params.orderNumber as string;

  return (
    <main className="min-h-screen bg-[#fcf7dc]">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-8 md:p-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-block mb-6"
            >
              <CheckCircle size={80} className="text-green-500" />
            </motion.div>

            <h1 className="text-[#911b1e] text-3xl md:text-4xl font-agrandir mb-4">
              Order Confirmed!
            </h1>

            <p className={`text-[#911b1e]/70 text-lg mb-6 ${raleway.className}`}>
              Thank you for your order. We've received your order and will process it shortly.
            </p>

            <div className="bg-[#911b1e]/5 rounded-lg p-6 mb-8">
              <p className={`text-[#911b1e]/60 text-sm mb-2 ${raleway.className}`}>
                Order Number
              </p>
              <p className={`text-[#911b1e] text-2xl font-semibold font-mono ${raleway.className}`}>
                {orderNumber}
              </p>
            </div>

            <p className={`text-[#911b1e]/70 mb-8 ${raleway.className}`}>
              A confirmation email has been sent to your email address with order details and tracking information.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-[#911b1e] text-[#fcf7dc] px-8 py-3 hover:bg-[#911b1e]/90 
                    transition-colors ${raleway.className}`}
                >
                  Continue Shopping
                </motion.button>
              </Link>

              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-white text-[#911b1e] px-8 py-3 border border-[#911b1e]/20 
                    hover:bg-[#911b1e]/10 transition-colors ${raleway.className}`}
                >
                  Back to Home
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
