'use client';

import { useEffect, useState } from 'react';
import { Raleway } from 'next/font/google';
import { Users, ShoppingBag, Package, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

interface Stats {
  totalMembers: number;
  totalOrders: number;
  totalProducts: number;
  pendingOrders: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalMembers: 0,
    totalOrders: 0,
    totalProducts: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch all data in parallel
      const [membersRes, ordersRes, productsRes] = await Promise.all([
        fetch('/api/members/list'),
        fetch('/api/orders'),
        fetch('/api/products'),
      ]);

      const members = await membersRes.json();
      const orders = await ordersRes.json();
      const products = await productsRes.json();

      setStats({
        totalMembers: members.length || 0,
        totalOrders: orders.length || 0,
        totalProducts: products.length || 0,
        pendingOrders: orders.filter((o: any) => o.status === 'pending').length || 0,
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      name: 'Total Members',
      value: stats.totalMembers,
      icon: Users,
      color: 'bg-blue-500',
      href: '/admin/members',
    },
    {
      name: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'bg-green-500',
      href: '/admin/orders',
    },
    {
      name: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-purple-500',
      href: '/admin/products',
    },
    {
      name: 'Pending Orders',
      value: stats.pendingOrders,
      icon: TrendingUp,
      color: 'bg-orange-500',
      href: '/admin/orders',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-agrandir text-gray-900 mb-2">
          Dashboard
        </h1>
        <p className={`text-gray-600 ${raleway.className}`}>
          Welcome to the LKJ Tennis Club admin panel
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => (
            <Link key={stat.name} href={stat.href}>
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                </div>
                <p className={`text-gray-600 text-sm ${raleway.className}`}>
                  {stat.name}
                </p>
                <p className={`text-3xl font-bold text-gray-900 ${raleway.className}`}>
                  {stat.value}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-agrandir text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/members/new">
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 cursor-pointer border-2 border-transparent hover:border-[#911b1e]">
              <h3 className={`font-semibold text-gray-900 mb-2 ${raleway.className}`}>
                Add New Member
              </h3>
              <p className={`text-gray-600 text-sm ${raleway.className}`}>
                Register a new club member
              </p>
            </div>
          </Link>

          <Link href="/admin/products/new">
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 cursor-pointer border-2 border-transparent hover:border-[#911b1e]">
              <h3 className={`font-semibold text-gray-900 mb-2 ${raleway.className}`}>
                Add New Product
              </h3>
              <p className={`text-gray-600 text-sm ${raleway.className}`}>
                Add a product to the shop
              </p>
            </div>
          </Link>

          <Link href="/admin/orders">
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 cursor-pointer border-2 border-transparent hover:border-[#911b1e]">
              <h3 className={`font-semibold text-gray-900 mb-2 ${raleway.className}`}>
                View Orders
              </h3>
              <p className={`text-gray-600 text-sm ${raleway.className}`}>
                Manage customer orders
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
