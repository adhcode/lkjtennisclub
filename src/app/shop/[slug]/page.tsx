'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Minus, Plus } from 'lucide-react';
import { Raleway } from 'next/font/google';
import { addToCart } from '@/lib/cart';

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
  brand?: string;
  sizes?: string[];
  colors?: string[];
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [params.slug]);

  // Check if product is in wishlist
  useEffect(() => {
    if (product) {
      const { isInWishlist } = require('@/lib/wishlist');
      setLiked(isInWishlist(product.id));
    }
  }, [product]);

  const fetchProduct = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const products = await response.json();
        const foundProduct = products.find((p: Product) => p.slug === params.slug);
        
        if (foundProduct) {
          setProduct(foundProduct);
          if (foundProduct.sizes?.length) setSelectedSize(foundProduct.sizes[0]);
          if (foundProduct.colors?.length) setSelectedColor(foundProduct.colors[0]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch product:', error);
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

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      slug: product.slug,
    }, quantity);

    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    
    const { toggleWishlist } = require('@/lib/wishlist');
    const isNowLiked = toggleWishlist({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
    });
    
    setLiked(isNowLiked);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fcf7dc]">
        <Navbar />
        <div className="pt-32 pb-16 px-4 text-center">
          <p className={`text-[#911b1e] text-xl ${raleway.className}`}>Loading...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#fcf7dc]">
        <Navbar />
        <div className="pt-32 pb-16 px-4 text-center">
          <p className={`text-[#911b1e] text-xl ${raleway.className}`}>Product not found</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcf7dc]">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-white rounded-lg overflow-hidden mb-4">
                <div className="relative h-96 md:h-[500px]">
                  <Image
                    src={product.images[selectedImage] || '/placeholder-product.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              {product.images.length > 1 && (
                <div className="flex gap-4">
                  {product.images.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative h-20 w-20 rounded-lg overflow-hidden border-2 transition-all
                        ${selectedImage === idx ? 'border-[#911b1e]' : 'border-transparent'}`}
                    >
                      <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {product.brand && (
                <p className={`text-[#911b1e]/60 text-sm mb-2 ${raleway.className}`}>
                  {product.brand}
                </p>
              )}
              
              <h1 className="text-[#911b1e] text-3xl md:text-4xl font-agrandir mb-4">
                {product.name}
              </h1>

              <p className={`text-[#911b1e] text-3xl font-semibold mb-6 ${raleway.className}`}>
                {formatPrice(product.price)}
              </p>

              <p className={`text-[#911b1e]/80 mb-8 leading-relaxed ${raleway.className}`}>
                {product.description}
              </p>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <label className={`block text-[#911b1e] mb-2 font-medium ${raleway.className}`}>
                    Size
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border transition-all ${raleway.className}
                          ${selectedSize === size
                            ? 'bg-[#911b1e] text-[#fcf7dc] border-[#911b1e]'
                            : 'bg-white text-[#911b1e] border-[#911b1e]/20 hover:border-[#911b1e]'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <label className={`block text-[#911b1e] mb-2 font-medium ${raleway.className}`}>
                    Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color: string) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border transition-all ${raleway.className}
                          ${selectedColor === color
                            ? 'bg-[#911b1e] text-[#fcf7dc] border-[#911b1e]'
                            : 'bg-white text-[#911b1e] border-[#911b1e]/20 hover:border-[#911b1e]'
                          }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <label className={`block text-[#911b1e] mb-2 font-medium ${raleway.className}`}>
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-white text-[#911b1e] p-2 border border-[#911b1e]/20 hover:bg-[#911b1e]/10 transition-colors"
                  >
                    <Minus size={20} />
                  </button>
                  <span className={`text-[#911b1e] text-xl font-semibold w-12 text-center ${raleway.className}`}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="bg-white text-[#911b1e] p-2 border border-[#911b1e]/20 hover:bg-[#911b1e]/10 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                  <span className={`text-[#911b1e]/60 text-sm ${raleway.className}`}>
                    {product.stock} available
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 py-4 px-6 flex items-center justify-center gap-2
                    hover:bg-[#911b1e]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${raleway.className}
                    ${addedToCart ? 'bg-green-500 text-white' : 'bg-[#911b1e] text-[#fcf7dc]'}`}
                >
                  <ShoppingCart size={20} />
                  {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                </motion.button>
                
                <button 
                  onClick={handleToggleWishlist}
                  className={`p-4 border-2 transition-colors ${
                    liked
                      ? 'bg-red-500 border-red-500 text-white'
                      : 'bg-white text-[#911b1e] border-[#911b1e]/20 hover:border-red-500 hover:text-red-500'
                  }`}
                  title={liked ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
