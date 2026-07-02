'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Raleway } from 'next/font/google';
import { getCart, updateQuantity, removeFromCart, clearCart, type Cart } from '@/lib/cart';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });

  useEffect(() => {
    if (isOpen) {
      setCart(getCart());
    }
  }, [isOpen]);

  const handleUpdateQuantity = (productId: string, quantity: number, size?: string, color?: string) => {
    const updatedCart = updateQuantity(productId, quantity, size, color);
    setCart(updatedCart);
  };

  const handleRemove = (productId: string, size?: string, color?: string) => {
    const updatedCart = removeFromCart(productId, size, color);
    setCart(updatedCart);
  };

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      setCart({ items: [], total: 0 });
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-screen w-full sm:w-96 bg-[#fcf7dc] z-[60] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#911b1e]/20">
              <h2 className={`text-[#911b1e] text-2xl font-agrandir`}>
                Shopping Cart
              </h2>
              <div className="flex items-center gap-2">
                {cart.items.length > 0 && (
                  <button
                    onClick={handleClearCart}
                    className={`text-[#911b1e]/60 hover:text-[#911b1e] text-sm ${raleway.className} mr-2`}
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="text-[#911b1e] hover:bg-[#911b1e]/10 p-2 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={64} className="text-[#911b1e]/30 mb-4" />
                  <p className={`text-[#911b1e]/60 ${raleway.className}`}>
                    Your cart is empty
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div
                      key={`${item.productId}-${item.size}-${item.color}`}
                      className="bg-white rounded-lg p-4 shadow-sm"
                    >
                      <div className="flex gap-4">
                        <div className="relative h-20 w-20 flex-shrink-0 rounded overflow-hidden">
                          <Image
                            src={item.image || '/placeholder-product.jpg'}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/shop/${item.slug}`}
                            onClick={onClose}
                            className="text-[#911b1e] font-medium hover:text-[#911b1e]/80 transition-colors block truncate"
                          >
                            {item.name}
                          </Link>
                          
                          {(item.size || item.color) && (
                            <p className={`text-[#911b1e]/60 text-sm mt-1 ${raleway.className}`}>
                              {item.size && `Size: ${item.size}`}
                              {item.size && item.color && ' • '}
                              {item.color && `Color: ${item.color}`}
                            </p>
                          )}

                          <p className={`text-[#911b1e] font-semibold mt-2 ${raleway.className}`}>
                            {formatPrice(item.price)}
                          </p>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1, item.size, item.color)}
                                className="bg-[#911b1e]/10 text-[#911b1e] p-1 rounded hover:bg-[#911b1e]/20 transition-colors"
                              >
                                <Minus size={14} />
                              </button>
                              <span className={`text-[#911b1e] font-medium w-8 text-center ${raleway.className}`}>
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1, item.size, item.color)}
                                className="bg-[#911b1e]/10 text-[#911b1e] p-1 rounded hover:bg-[#911b1e]/20 transition-colors"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            <button
                              onClick={() => handleRemove(item.productId, item.size, item.color)}
                              className={`text-[#911b1e]/60 hover:text-[#911b1e] text-sm ${raleway.className}`}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.items.length > 0 && (
              <div className="border-t border-[#911b1e]/20 p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className={`text-[#911b1e] text-lg ${raleway.className}`}>
                    Subtotal
                  </span>
                  <span className={`text-[#911b1e] text-2xl font-semibold ${raleway.className}`}>
                    {formatPrice(cart.total)}
                  </span>
                </div>

                <Link href="/shop/checkout" onClick={onClose}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full bg-[#911b1e] text-[#fcf7dc] py-4 hover:bg-[#911b1e]/90 
                      transition-colors ${raleway.className} font-medium`}
                  >
                    Checkout
                  </motion.button>
                </Link>

                <Link href="/shop" onClick={onClose}>
                  <button className={`w-full text-[#911b1e] py-2 hover:text-[#911b1e]/80 
                    transition-colors ${raleway.className}`}>
                    Continue Shopping
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
