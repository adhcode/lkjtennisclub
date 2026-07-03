'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Raleway } from 'next/font/google';
import { getCart, clearCart, type Cart } from '@/lib/cart';
import { CreditCard, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { PaystackButton } from 'react-paystack';
import { generatePaymentReference, formatAmountToKobo, verifyPayment } from '@/lib/paystack';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

export default function PaymentPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [checkoutData, setCheckoutData] = useState<any>(null);

  useEffect(() => {
    // Load checkout data from sessionStorage
    const stored = sessionStorage.getItem('checkoutData');
    if (!stored) {
      router.push('/shop');
      return;
    }
    
    const data = JSON.parse(stored);
    setCheckoutData(data);
    setCart({ items: data.items, total: data.subtotal });
  }, [router]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (!checkoutData) {
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

  const total = checkoutData.total;

  const createOrder = async (paymentMethod: string, paymentRef?: string) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...checkoutData,
          paymentMethod: 'paystack',
          paymentReference: paymentRef,
          paymentStatus: paymentRef ? 'paid' : 'pending',
        }),
      });

      if (response.ok) {
        const order = await response.json();
        clearCart();
        sessionStorage.removeItem('checkoutData');
        router.push(`/shop/order-confirmation/${order.orderNumber}`);
      } else {
        alert('Failed to create order. Please try again.');
      }
    } catch (error) {
      console.error('Order failed:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const handlePaystackSuccess = async (reference: { reference: string }) => {
    setLoading(true);
    try {
      const verification = await verifyPayment(reference.reference);
      
      if (verification.data.status === 'success') {
        // Create order and get order number
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...checkoutData,
            paymentMethod: 'paystack',
            paymentReference: reference.reference,
            paymentStatus: 'paid',
          }),
        });

        if (response.ok) {
          const order = await response.json();
          clearCart();
          sessionStorage.removeItem('checkoutData');
          // Redirect immediately after order is created
          router.push(`/shop/order-confirmation/${order.orderNumber}`);
        } else {
          alert('Failed to create order. Please try again.');
          setLoading(false);
        }
      } else {
        alert('Payment verification failed. Please contact support.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      alert('Payment processing failed. Please try again.');
      setLoading(false);
    }
  };

  const handlePaystackClose = () => {
    console.log('Payment popup closed');
  };

  const paystackConfig = {
    reference: generatePaymentReference(),
    email: checkoutData.customerEmail,
    amount: formatAmountToKobo(total),
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
    metadata: {
      custom_fields: [
        {
          display_name: 'Customer Name',
          variable_name: 'customer_name',
          value: checkoutData.customerName,
        },
      ],
    },
  };

  const paymentMethods = [
    {
      id: 'paystack',
      name: 'Pay with Paystack',
      description: 'Card, Bank Transfer, USSD & more payment options',
      icon: CreditCard,
      badge: 'Secure & Instant',
      badgeColor: 'bg-green-100 text-green-700',
    },
  ];

  return (
    <main className="min-h-screen bg-[#fcf7dc] relative">
      <Navbar />
      
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="w-16 h-16 mx-auto border-4 border-[#911b1e] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className={`text-[#911b1e] text-lg font-semibold ${raleway.className}`}>
              Processing your payment...
            </p>
            <p className={`text-[#911b1e]/60 text-sm mt-2 ${raleway.className}`}>
              Please wait, do not close this window
            </p>
          </div>
        </div>
      )}
      
      <div className="pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              href="/shop/checkout"
              className={`inline-flex items-center gap-2 text-[#911b1e] hover:text-[#911b1e]/80 mb-6 ${raleway.className}`}
            >
              <ArrowLeft size={20} />
              Back to Checkout
            </Link>

            <div className="text-center mb-8">
              <h1 className="text-[#911b1e] text-3xl md:text-4xl font-agrandir mb-2">
                Choose Payment Method
              </h1>
              <p className={`text-[#911b1e]/70 ${raleway.className} mb-4`}>
                Complete your order
              </p>
              <p className={`text-[#911b1e] text-2xl font-semibold ${raleway.className}`}>
                Total: {formatPrice(total)}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="text-[#911b1e] text-xl font-agrandir mb-4">
                Select Payment Method
              </h2>
              
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedMethod === method.id
                        ? 'border-[#911b1e] bg-[#911b1e]/5'
                        : 'border-[#911b1e]/20 hover:border-[#911b1e]/40'
                    }`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <method.icon className="text-[#911b1e]" size={32} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`text-[#911b1e] font-semibold ${raleway.className}`}>
                            {method.name}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${method.badgeColor} ${raleway.className}`}>
                            {method.badge}
                          </span>
                        </div>
                        <p className={`text-[#911b1e]/60 text-sm ${raleway.className}`}>
                          {method.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedMethod === method.id
                            ? 'border-[#911b1e] bg-[#911b1e]'
                            : 'border-[#911b1e]/30'
                        }`}>
                          {selectedMethod === method.id && (
                            <div className="w-2 h-2 bg-[#fcf7dc] rounded-full"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedMethod && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <PaystackButton
                  {...paystackConfig}
                  text={loading ? 'Processing Payment...' : 'Pay Now'}
                  onSuccess={handlePaystackSuccess}
                  onClose={handlePaystackClose}
                  disabled={loading}
                  className={`w-full bg-[#911b1e] text-[#fcf7dc] py-4 rounded hover:bg-[#911b1e]/90 
                    transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${raleway.className} font-medium text-lg`}
                />
                <p className={`text-center text-[#911b1e]/60 text-sm mt-4 ${raleway.className}`}>
                  Paystack supports: Cards • Bank Transfer • USSD • Mobile Money
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
