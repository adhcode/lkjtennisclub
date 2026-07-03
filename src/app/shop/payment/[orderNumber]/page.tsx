'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Raleway } from 'next/font/google';
import { CreditCard, Building2, Wallet, CheckCircle } from 'lucide-react';
import { PaystackButton } from 'react-paystack';
import { generatePaymentReference, formatAmountToKobo, verifyPayment } from '@/lib/paystack';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  total: number;
  paymentStatus: string;
}

export default function PaymentPage() {
  const router = useRouter();
  const params = useParams();
  const orderNumber = params.orderNumber as string;
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  useEffect(() => {
    fetchOrder();
  }, [orderNumber]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders?orderNumber=${orderNumber}`);
      if (response.ok) {
        const data = await response.json();
        setOrder(data);
        
        // If already paid, redirect to confirmation
        if (data.paymentStatus === 'paid') {
          router.push(`/shop/order-confirmation/${orderNumber}`);
        }
      } else {
        router.push('/shop');
      }
    } catch (error) {
      console.error('Failed to fetch order:', error);
      router.push('/shop');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handlePaystackSuccess = async (reference: { reference: string }) => {
    setProcessing(true);
    try {
      const verification = await verifyPayment(reference.reference);
      
      if (verification.data.status === 'success') {
        // Update order with payment reference
        await fetch(`/api/orders/${order?.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentStatus: 'paid',
            paymentMethod: 'card',
            paymentReference: reference.reference,
          }),
        });
        
        router.push(`/shop/order-confirmation/${orderNumber}`);
      } else {
        alert('Payment verification failed. Please contact support.');
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      alert('Payment processing failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handlePaystackClose = () => {
    console.log('Payment popup closed');
  };

  const handleOtherPayment = async (method: string) => {
    setProcessing(true);
    try {
      await fetch(`/api/orders/${order?.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod: method,
        }),
      });
      
      router.push(`/shop/order-confirmation/${orderNumber}`);
    } catch (error) {
      console.error('Failed to update payment method:', error);
      alert('Failed to process. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
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

  if (!order) {
    return null;
  }

  const paystackConfig = {
    reference: generatePaymentReference(),
    email: order.customerEmail,
    amount: formatAmountToKobo(order.total),
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
    metadata: {
      custom_fields: [
        {
          display_name: 'Order Number',
          variable_name: 'order_number',
          value: order.orderNumber,
        },
      ],
    },
  };

  const paymentMethods = [
    {
      id: 'card',
      name: 'Card Payment',
      description: 'Pay securely with your debit or credit card',
      icon: CreditCard,
      badge: 'Instant',
      badgeColor: 'bg-green-100 text-green-700',
    },
    {
      id: 'transfer',
      name: 'Bank Transfer',
      description: 'Transfer to our bank account',
      icon: Building2,
      badge: 'Manual',
      badgeColor: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'cash',
      name: 'Cash on Delivery',
      description: 'Pay when you receive your order',
      icon: Wallet,
      badge: 'On Delivery',
      badgeColor: 'bg-orange-100 text-orange-700',
    },
  ];

  return (
    <main className="min-h-screen bg-[#fcf7dc]">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-8">
              <CheckCircle className="text-green-600 mx-auto mb-4" size={64} />
              <h1 className="text-[#911b1e] text-3xl md:text-4xl font-agrandir mb-2">
                Order Created Successfully!
              </h1>
              <p className={`text-[#911b1e]/70 ${raleway.className}`}>
                Order #{order.orderNumber}
              </p>
              <p className={`text-[#911b1e] text-2xl font-semibold mt-4 ${raleway.className}`}>
                Total: {formatPrice(order.total)}
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="text-[#911b1e] text-xl font-agrandir mb-4">
                Choose Payment Method
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
                {selectedMethod === 'card' ? (
                  <PaystackButton
                    {...paystackConfig}
                    text={processing ? 'Processing...' : 'Pay Now'}
                    onSuccess={handlePaystackSuccess}
                    onClose={handlePaystackClose}
                    disabled={processing}
                    className={`w-full bg-[#911b1e] text-[#fcf7dc] py-4 rounded hover:bg-[#911b1e]/90 
                      transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${raleway.className} font-medium`}
                  />
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOtherPayment(selectedMethod)}
                    disabled={processing}
                    className={`w-full bg-[#911b1e] text-[#fcf7dc] py-4 rounded hover:bg-[#911b1e]/90 
                      transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${raleway.className} font-medium`}
                  >
                    {processing ? 'Processing...' : 'Confirm Payment Method'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
