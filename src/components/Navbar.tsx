'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Raleway } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import CartDrawer from './CartDrawer';
import { getCartCount } from '@/lib/cart';
import { useSession, signOut } from 'next-auth/react';

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['200'],
});

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const { data: session, status } = useSession();
    const isPending = status === 'loading';

    // Update cart count
    useEffect(() => {
        const updateCount = () => setCartCount(getCartCount());
        updateCount();
        
        // Listen for storage changes (cart updates)
        window.addEventListener('storage', updateCount);
        // Custom event for same-tab updates
        window.addEventListener('cartUpdated', updateCount);
        
        return () => {
            window.removeEventListener('storage', updateCount);
            window.removeEventListener('cartUpdated', updateCount);
        };
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    return (
        <nav className="fixed w-full z-50 transition-all duration-500 bg-[#911b1e]/95 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/logo.png"
                                alt="LKJ TENNIS CLUB"
                                width={60}
                                height={60}
                                className="h-16 w-auto"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/about" className={`text-[#fcf7dc] hover:text-white transition-colors ${raleway.className}`}>
                            About
                        </Link>
                        <Link href="/membership" className={`text-[#fcf7dc] hover:text-white transition-colors ${raleway.className}`}>
                            Membership
                        </Link>
                        <Link href="/events" className={`text-[#fcf7dc] hover:text-white transition-colors ${raleway.className}`}>
                            Events
                        </Link>
                        <Link 
                            href="/shop" 
                            className={`bg-[#fcf7dc] text-[#911b1e] px-4 py-2 hover:bg-white transition-colors font-medium ${raleway.className}`}
                        >
                            Shop
                        </Link>

                        {/* Cart Icon */}
                        <button
                            onClick={() => setCartOpen(true)}
                            className="relative text-[#fcf7dc] hover:text-white transition-colors"
                        >
                            <ShoppingCart size={24} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#fcf7dc] text-[#911b1e] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Auth Section */}
                        {!isPending && (
                            session ? (
                                <div className="flex items-center gap-4">
                                    <Link href="/profile" className="text-[#fcf7dc] hover:text-white transition-colors flex items-center gap-2">
                                        <User size={20} />
                                        <span className={raleway.className}>{session.user.name}</span>
                                    </Link>
                                    <button
                                        onClick={() => signOut()}
                                        className="text-[#fcf7dc] hover:text-white transition-colors"
                                        title="Sign Out"
                                    >
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            ) : (
                                <Link 
                                    href="/auth/signin"
                                    className={`text-[#fcf7dc] hover:text-white transition-colors flex items-center gap-2 ${raleway.className}`}
                                >
                                    <User size={20} />
                                    Sign In
                                </Link>
                            )
                        )}
                    </div>

                    {/* Mobile: Cart + Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        {/* Mobile Cart Icon */}
                        <button
                            onClick={() => setCartOpen(true)}
                            className="relative text-[#fcf7dc] hover:text-white transition-colors"
                        >
                            <ShoppingCart size={24} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#fcf7dc] text-[#911b1e] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="bg-transparent p-2 rounded-sm group"
                            aria-label="Menu"
                        >
                            <div className="space-y-1.5">
                                <span className={`block w-6 h-[1px] bg-[#fcf7dc] transform transition-all duration-300 
                                           ${isOpen ? 'rotate-45 translate-y-2' : 'group-hover:w-5'}`} />
                                <span className={`block w-4 h-[1px] bg-[#fcf7dc] transition-all duration-300 
                                           ${isOpen ? 'opacity-0' : 'group-hover:w-6'}`} />
                                <span className={`block w-5 h-[1px] bg-[#fcf7dc] transform transition-all duration-300 
                                           ${isOpen ? '-rotate-45 -translate-y-2' : 'group-hover:w-6'}`} />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu - Slide from top with blur */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="md:hidden absolute top-20 left-0 right-0 border-t border-[#fcf7dc]/10"
                        >
                            <div className="bg-gradient-to-b from-[#911b1e]/95 to-[#911b1e]/90 backdrop-blur-lg">
                                <div className="px-4 py-6 space-y-4">
                                    {[
                                        { label: 'About', href: '/about' },
                                        { label: 'Membership', href: '/membership' },
                                        { label: 'Events', href: '/events' },
                                    ].map((link, idx) => (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.05 * idx }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className={`block py-3 text-[#fcf7dc] hover:text-white transition-colors ${raleway.className}`}
                                            >
                                                {link.label}
                                            </Link>
                                        </motion.div>
                                    ))}

                                    {/* Mobile Shop Button - Prominent */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.15 }}
                                    >
                                        <Link
                                            href="/shop"
                                            onClick={() => setIsOpen(false)}
                                            className={`block py-3 px-4 bg-[#fcf7dc] text-[#911b1e] hover:bg-white transition-colors font-medium text-center ${raleway.className}`}
                                        >
                                            Shop Now
                                        </Link>
                                    </motion.div>

                                    {/* Mobile Auth */}
                                    {!isPending && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="border-t border-[#fcf7dc]/10 pt-4"
                                        >
                                            {session ? (
                                                <>
                                                    <Link
                                                        href="/profile"
                                                        onClick={() => setIsOpen(false)}
                                                        className={`block py-3 text-[#fcf7dc] hover:text-white transition-colors ${raleway.className}`}
                                                    >
                                                        My Profile
                                                    </Link>
                                                    <button
                                                        onClick={() => {
                                                            signOut();
                                                            setIsOpen(false);
                                                        }}
                                                        className={`block w-full text-left py-3 text-[#fcf7dc] hover:text-white transition-colors ${raleway.className}`}
                                                    >
                                                        Sign Out
                                                    </button>
                                                </>
                                            ) : (
                                                <Link
                                                    href="/auth/signin"
                                                    onClick={() => setIsOpen(false)}
                                                    className={`block py-3 text-[#fcf7dc] hover:text-white transition-colors ${raleway.className}`}
                                                >
                                                    Sign In
                                                </Link>
                                            )}
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Cart Drawer */}
            <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </nav>
    );
};

export default Navbar; 