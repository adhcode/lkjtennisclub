'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { Raleway } from 'next/font/google';
import { addToCart } from '@/lib/cart';
import { toggleWishlist, isInWishlist } from '@/lib/wishlist';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  brand?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [addedToCart, setAddedToCart] = useState(false);
  const [liked, setLiked] = useState(false);

  // Check if product is in wishlist on mount
  useEffect(() => {
    setLiked(isInWishlist(product.id));
  }, [product.id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock === 0) return;

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
    }, 1);

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const isNowLiked = toggleWishlist({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
    });
    
    setLiked(isNowLiked);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group h-full flex flex-col relative"
    >
      {/* Wishlist Button */}
      <div className="absolute top-2 right-2 z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
            liked 
              ? 'bg-red-500 text-white' 
              : 'bg-white/90 text-[#911b1e] hover:bg-red-500 hover:text-white opacity-0 group-hover:opacity-100'
          }`}
          title={liked ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
        </motion.button>
      </div>

      <Link href={`/shop/${product.slug}`}>
        <div className="relative h-64 bg-gray-100">
          <Image
            src={product.images[0] || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className={`text-white text-lg font-semibold ${raleway.className}`}>
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        {product.brand && (
          <p className={`text-[#911b1e]/60 text-xs mb-1 ${raleway.className}`}>
            {product.brand}
          </p>
        )}
        
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-[#911b1e] text-base font-agrandir mb-2 hover:text-[#911b1e]/80 transition-colors line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-auto">
          <span className={`text-[#911b1e] text-xl font-semibold ${raleway.className}`}>
            {formatPrice(product.price)}
          </span>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`p-2 rounded-full transition-colors ${
              addedToCart
                ? 'bg-green-500 text-white'
                : 'bg-[#911b1e] text-[#fcf7dc] hover:bg-[#911b1e]/90'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            title={addedToCart ? 'Added to cart!' : 'Add to cart'}
          >
            <ShoppingCart size={20} />
          </motion.button>
        </div>

        {addedToCart && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`text-green-600 text-xs text-center mt-2 ${raleway.className}`}
          >
            Added to cart!
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
