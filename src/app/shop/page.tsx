'use client';

import { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import { motion } from 'framer-motion';
import { Raleway } from 'next/font/google';
import Link from 'next/link';

const raleway = Raleway({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  featured: boolean;
  brand?: string;
}

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products once on mount
  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setAllProducts(data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Client-side filtering - no API calls needed
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by category
    if (selectedCategory === 'apparel') {
      if (selectedSubcategory) {
        filtered = filtered.filter(p => p.category === selectedSubcategory);
      } else {
        filtered = filtered.filter(p => 
          p.category === 'mens-apparel' || p.category === 'womens-apparel'
        );
      }
    } else if (selectedCategory === 'shoes') {
      if (selectedSubcategory) {
        filtered = filtered.filter(p => p.category === selectedSubcategory);
      } else {
        filtered = filtered.filter(p => 
          p.category === 'mens-shoes' || p.category === 'womens-shoes'
        );
      }
    } else if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by brand
    if (selectedBrand) {
      filtered = filtered.filter(p => p.brand === selectedBrand);
    }

    return filtered;
  }, [allProducts, selectedCategory, selectedSubcategory, selectedBrand]);

  // Extract available brands from filtered products (before brand filter)
  const availableBrands = useMemo(() => {
    let productsForBrands = allProducts;

    // Apply category filter only
    if (selectedCategory === 'apparel') {
      if (selectedSubcategory) {
        productsForBrands = productsForBrands.filter(p => p.category === selectedSubcategory);
      } else {
        productsForBrands = productsForBrands.filter(p => 
          p.category === 'mens-apparel' || p.category === 'womens-apparel'
        );
      }
    } else if (selectedCategory !== 'all') {
      productsForBrands = productsForBrands.filter(p => p.category === selectedCategory);
    }

    const brands = [...new Set(productsForBrands.map(p => p.brand).filter(Boolean))] as string[];
    return brands.sort();
  }, [allProducts, selectedCategory, selectedSubcategory]);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'rackets', name: 'Rackets' },
    { id: 'balls', name: 'Tennis Balls' },
    { id: 'apparel', name: 'Apparel' },
    { id: 'shoes', name: 'Shoes' },
    { id: 'accessories', name: 'Accessories' },
  ];

  const apparelSubcategories = [
    { id: 'mens-apparel', name: "Men's" },
    { id: 'womens-apparel', name: "Women's" },
  ];

  const shoesSubcategories = [
    { id: 'mens-shoes', name: "Men's" },
    { id: 'womens-shoes', name: "Women's" },
  ];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(null);
    setSelectedBrand(null);
  };

  return (
    <main className="min-h-screen bg-[#fcf7dc]">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-[#911b1e] text-4xl md:text-5xl tracking-wider font-agrandir mb-4">
              TENNIS SHOP
            </h1>
            <p className={`text-[#911b1e]/70 text-lg ${raleway.className}`}>
              Premium tennis equipment and apparel
            </p>
            <Link href="/shop/request-product">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`mt-4 text-[#911b1e] hover:text-[#911b1e]/80 text-sm ${raleway.className} font-medium underline`}
              >
                Didn't see what you want? Request a product →
              </motion.button>
            </Link>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-6 py-2 transition-all duration-300 ${raleway.className}
                    ${selectedCategory === cat.id
                      ? 'bg-[#911b1e] text-[#fcf7dc]'
                      : 'bg-white text-[#911b1e] hover:bg-[#911b1e]/10'
                    }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Apparel Subcategories */}
            {selectedCategory === 'apparel' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex justify-center gap-3"
              >
                <button
                  onClick={() => setSelectedSubcategory(null)}
                  className={`px-4 py-2 text-sm transition-all duration-300 ${raleway.className}
                    ${selectedSubcategory === null
                      ? 'bg-[#911b1e]/80 text-[#fcf7dc]'
                      : 'bg-[#911b1e]/10 text-[#911b1e] hover:bg-[#911b1e]/20'
                    }`}
                >
                  All Apparel
                </button>
                {apparelSubcategories.map((subcat) => (
                  <button
                    key={subcat.id}
                    onClick={() => setSelectedSubcategory(subcat.id)}
                    className={`px-4 py-2 text-sm transition-all duration-300 ${raleway.className}
                      ${selectedSubcategory === subcat.id
                        ? 'bg-[#911b1e]/80 text-[#fcf7dc]'
                        : 'bg-[#911b1e]/10 text-[#911b1e] hover:bg-[#911b1e]/20'
                      }`}
                  >
                    {subcat.name}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Shoes Subcategories */}
            {selectedCategory === 'shoes' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex justify-center gap-3"
              >
                <button
                  onClick={() => setSelectedSubcategory(null)}
                  className={`px-4 py-2 text-sm transition-all duration-300 ${raleway.className}
                    ${selectedSubcategory === null
                      ? 'bg-[#911b1e]/80 text-[#fcf7dc]'
                      : 'bg-[#911b1e]/10 text-[#911b1e] hover:bg-[#911b1e]/20'
                    }`}
                >
                  All Shoes
                </button>
                {shoesSubcategories.map((subcat) => (
                  <button
                    key={subcat.id}
                    onClick={() => setSelectedSubcategory(subcat.id)}
                    className={`px-4 py-2 text-sm transition-all duration-300 ${raleway.className}
                      ${selectedSubcategory === subcat.id
                        ? 'bg-[#911b1e]/80 text-[#fcf7dc]'
                        : 'bg-[#911b1e]/10 text-[#911b1e] hover:bg-[#911b1e]/20'
                      }`}
                  >
                    {subcat.name}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Brand Filter */}
            {availableBrands.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex flex-col items-center gap-3"
              >
                <p className={`text-[#911b1e]/70 text-sm ${raleway.className}`}>
                  Filter by Brand:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => setSelectedBrand(null)}
                    className={`px-4 py-1.5 text-sm transition-all duration-300 ${raleway.className}
                      ${selectedBrand === null
                        ? 'bg-[#911b1e]/60 text-[#fcf7dc]'
                        : 'bg-white text-[#911b1e] hover:bg-[#911b1e]/5 border border-[#911b1e]/20'
                      }`}
                  >
                    All Brands
                  </button>
                  {availableBrands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`px-4 py-1.5 text-sm transition-all duration-300 ${raleway.className}
                        ${selectedBrand === brand
                          ? 'bg-[#911b1e]/60 text-[#fcf7dc]'
                          : 'bg-white text-[#911b1e] hover:bg-[#911b1e]/5 border border-[#911b1e]/20'
                        }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * Math.min(index, 8) }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className={`text-[#911b1e]/60 text-lg ${raleway.className}`}>
                    No products found
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
