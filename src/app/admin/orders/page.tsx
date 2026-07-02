'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Package, Eye, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Raleway } from 'next/font/google';
import Link from 'next/link';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  orderItems: {
    id: string;
    quantity: number;
    price: number;
    product: {
      name: string;
    };
  }[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
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

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setOrders(prev =>
          prev.map(order =>
            order.id === orderId ? { ...order, status } : order
          )
        );
      }
    } catch (error) {
      console.error('Failed to update order:', error);
      alert('Failed to update order status');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} className="text-yellow-600" />;
      case 'processing':
        return <Package size={16} className="text-blue-600" />;
      case 'delivered':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'cancelled':
        return <XCircle size={16} className="text-red-600" />;
      default:
        return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
  };

  return (
    <main className="min-h-screen bg-[#fcf7dc]">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-[#911b1e] text-3xl md:text-4xl font-agrandir mb-2">
              Order Management
            </h1>
            <p className={`text-[#911b1e]/60 ${raleway.className}`}>
              Manage and track customer orders
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4">
              <p className={`text-[#911b1e]/60 text-sm mb-1 ${raleway.className}`}>Total Orders</p>
              <p className="text-[#911b1e] text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className={`text-[#911b1e]/60 text-sm mb-1 ${raleway.className}`}>Pending</p>
              <p className="text-yellow-600 text-2xl font-bold">{stats.pending}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className={`text-[#911b1e]/60 text-sm mb-1 ${raleway.className}`}>Processing</p>
              <p className="text-blue-600 text-2xl font-bold">{stats.processing}</p>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className={`text-[#911b1e]/60 text-sm mb-1 ${raleway.className}`}>Delivered</p>
              <p className="text-green-600 text-2xl font-bold">{stats.delivered}</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded capitalize transition-all ${raleway.className}
                  ${filter === status
                    ? 'bg-[#911b1e] text-[#fcf7dc]'
                    : 'bg-white text-[#911b1e] hover:bg-[#911b1e]/10'
                  }`}
              >
                {status}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="bg-white rounded-lg p-12 text-center">
              <p className={`text-[#911b1e]/60 ${raleway.className}`}>Loading orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center">
              <Package size={64} className="text-[#911b1e]/30 mx-auto mb-4" />
              <p className={`text-[#911b1e]/60 ${raleway.className}`}>
                No orders found
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className={`text-[#911b1e] text-lg font-semibold ${raleway.className}`}>
                          {order.orderNumber}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          {order.status}
                        </span>
                      </div>
                      <p className={`text-[#911b1e]/70 text-sm ${raleway.className}`}>
                        {order.customerName} • {order.customerEmail}
                      </p>
                      <p className={`text-[#911b1e]/60 text-xs ${raleway.className}`}>
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className={`text-[#911b1e]/60 text-sm ${raleway.className}`}>Total</p>
                        <p className={`text-[#911b1e] text-xl font-bold ${raleway.className}`}>
                          {formatPrice(order.total)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#911b1e]/10 pt-4 mb-4">
                    <p className={`text-[#911b1e]/60 text-sm mb-2 ${raleway.className}`}>
                      Items ({order.orderItems.length}):
                    </p>
                    <div className="space-y-1">
                      {order.orderItems.map((item) => (
                        <p key={item.id} className={`text-[#911b1e] text-sm ${raleway.className}`}>
                          {item.quantity}x {item.product.name} - {formatPrice(item.price)}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`px-4 py-2 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e] ${raleway.className}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    
                    <Link href={`/shop/order-confirmation/${order.orderNumber}`}>
                      <button className={`px-4 py-2 bg-[#911b1e]/10 text-[#911b1e] rounded hover:bg-[#911b1e]/20 transition-colors flex items-center gap-2 ${raleway.className}`}>
                        <Eye size={16} />
                        View Details
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
