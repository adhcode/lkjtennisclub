'use client';

import { motion } from 'framer-motion';
import { Raleway } from 'next/font/google';
import Link from 'next/link';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import { useState, useEffect } from 'react';

const raleway = Raleway({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  brand?: string;
}

export default function ShopPreview() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products?featured=true');
      if (response.ok) {
        const data = await response.json();
        setProducts(data.slice(0, 3));
      }
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!loading && products.length === 0) return null;

  return (
    <section className="relative py-16 sm:py-20 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`inline-block px-3 sm:px-4 py-1 bg-[#911b1e]/10 text-[#911b1e] 
                      rounded-full text-xs sm:text-sm mb-3 sm:mb-4 ${raleway.className}`}
          >
            Tennis Shop
          </motion.span>
          <h2 className="text-[#911b1e] text-2xl sm:text-3xl md:text-4xl tracking-wider font-agrandir mb-4">
            PREMIUM TENNIS GEAR
          </h2>
          <p className={`text-[#911b1e]/70 text-lg max-w-2xl mx-auto ${raleway.className}`}>
            Equip yourself with the best tennis equipment and apparel
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {loading ? (
            <>
              {[...Array(3)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </>
          ) : (
            products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`bg-[#911b1e] text-[#fcf7dc] px-8 py-3 hover:bg-[#911b1e]/90 
                transition-colors ${raleway.className} font-medium`}
            >
              View All Products
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
