'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import { Raleway } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  featured: boolean;
  brand?: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts(prev => prev.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <main className="min-h-screen bg-[#fcf7dc]">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-[#911b1e] text-3xl md:text-4xl font-agrandir">
                Product Management
              </h1>
              <p className={`text-[#911b1e]/60 mt-2 ${raleway.className}`}>
                {products.length} products
              </p>
            </div>
            <Link href="/admin/products/new">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-[#911b1e] text-[#fcf7dc] px-6 py-3 flex items-center gap-2 
                  hover:bg-[#911b1e]/90 transition-colors ${raleway.className}`}
              >
                <Plus size={20} />
                Add Product
              </motion.button>
            </Link>
          </div>

          {loading ? (
            <div className="bg-white rounded-lg p-12 text-center">
              <p className={`text-[#911b1e]/60 ${raleway.className}`}>Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center">
              <Package size={64} className="text-[#911b1e]/30 mx-auto mb-4" />
              <p className={`text-[#911b1e]/60 mb-4 ${raleway.className}`}>
                No products yet. Add your first product to get started.
              </p>
              <Link href="/admin/products/new">
                <button className={`bg-[#911b1e] text-[#fcf7dc] px-6 py-3 hover:bg-[#911b1e]/90 
                  transition-colors ${raleway.className}`}>
                  Add Product
                </button>
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#911b1e]/5">
                    <tr>
                      <th className={`text-left p-4 text-[#911b1e] ${raleway.className}`}>Product</th>
                      <th className={`text-left p-4 text-[#911b1e] ${raleway.className}`}>Category</th>
                      <th className={`text-left p-4 text-[#911b1e] ${raleway.className}`}>Price</th>
                      <th className={`text-left p-4 text-[#911b1e] ${raleway.className}`}>Stock</th>
                      <th className={`text-left p-4 text-[#911b1e] ${raleway.className}`}>Status</th>
                      <th className={`text-right p-4 text-[#911b1e] ${raleway.className}`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-t border-[#911b1e]/10">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                              {product.images[0] ? (
                                <Image
                                  src={product.images[0]}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <Package size={24} className="text-[#911b1e]/30 absolute inset-0 m-auto" />
                              )}
                            </div>
                            <div>
                              <p className={`text-[#911b1e] font-medium ${raleway.className}`}>
                                {product.name}
                              </p>
                              {product.brand && (
                                <p className={`text-[#911b1e]/60 text-sm ${raleway.className}`}>
                                  {product.brand}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`text-[#911b1e]/70 capitalize ${raleway.className}`}>
                            {product.category}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`text-[#911b1e] font-medium ${raleway.className}`}>
                            {formatPrice(product.price)}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`text-[#911b1e]/70 ${raleway.className}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {product.featured && (
                              <span className="bg-[#911b1e] text-[#fcf7dc] text-xs px-2 py-1 rounded">
                                Featured
                              </span>
                            )}
                            <span className={`${product.stock > 0 ? 'text-green-600' : 'text-red-600'} text-sm ${raleway.className}`}>
                              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/admin/products/${product.id}/edit`}>
                              <button className="text-[#911b1e] hover:bg-[#911b1e]/10 p-2 rounded transition-colors">
                                <Edit size={18} />
                              </button>
                            </Link>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="text-red-600 hover:bg-red-50 p-2 rounded transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
