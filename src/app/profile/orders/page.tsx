'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Raleway } from 'next/font/google';
import { ShoppingBag, ArrowLeft, Package } from 'lucide-react';
import Link from 'next/link';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  total: number;
  status: string;
  paymentStatus: string;
  orderItems: {
    id: string;
    quantity: number;
    price: number;
    product: {
      name: string;
    };
  }[];
}

export default function OrdersPage() {
  const { status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?redirect=/profile/orders');
    } else if (status === 'authenticated') {
      fetchOrders();
    }
  }, [status, router]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/user/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (status === 'loading' || loading) {
    return (
      <main className="min-h-screen bg-[#fcf7dc]">
        <Navbar />
        <div className="pt-32 pb-16 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
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
        <div className="max-w-4xl mx-auto">
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
              <ShoppingBag className="text-[#911b1e]" size={32} />
              <h1 className="text-[#911b1e] text-4xl font-agrandir">
                My Orders
              </h1>
            </div>
            <p className={`text-[#911b1e]/60 mb-8 ${raleway.className}`}>
              View your order history and track deliveries
            </p>

            {orders.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <Package size={64} className="text-[#911b1e]/30 mx-auto mb-4" />
                <p className={`text-[#911b1e]/60 mb-4 ${raleway.className}`}>
                  You haven't placed any orders yet.
                </p>
                <Link href="/shop">
                  <button className={`bg-[#911b1e] text-[#fcf7dc] px-6 py-3 rounded hover:bg-[#911b1e]/90 transition-colors ${raleway.className} font-medium`}>
                    Start Shopping
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-[#911b1e] font-agrandir text-lg">
                          Order #{order.orderNumber}
                        </h3>
                        <p className={`text-[#911b1e]/60 text-sm ${raleway.className}`}>
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)} ${raleway.className}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        <p className={`text-[#911b1e] font-bold mt-2 ${raleway.className}`}>
                          {formatPrice(order.total)}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-[#911b1e]/10 pt-4">
                      <p className={`text-[#911b1e]/70 text-sm mb-2 ${raleway.className}`}>
                        Items:
                      </p>
                      <ul className="space-y-1">
                        {order.orderItems.map((item) => (
                          <li key={item.id} className={`text-[#911b1e] text-sm ${raleway.className}`}>
                            • {item.product.name} × {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#911b1e]/10">
                      <Link href={`/shop/order-confirmation/${order.orderNumber}`}>
                        <button className={`text-[#911b1e] hover:text-[#911b1e]/80 text-sm ${raleway.className} font-medium`}>
                          View Details →
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
