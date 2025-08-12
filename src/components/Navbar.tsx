'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Raleway } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['200'],
});

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle navbar background on scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#911b1e]/95 backdrop-blur-md' : 'bg-transparent'
            }`}>
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
                        <Link href="/exco" className={`text-[#fcf7dc] hover:text-white transition-colors ${raleway.className}`}>
                            Exco
                        </Link>
                        <Link href="/bookcourt" className={`text-[#fcf7dc] hover:text-white transition-colors ${raleway.className}`}>
                            Book Court
                        </Link>
                        <Link href="/events" className={`text-[#fcf7dc] hover:text-white transition-colors ${raleway.className}`}>
                            Events
                        </Link>
                        <Link href="/blog" className={`text-[#fcf7dc] hover:text-white transition-colors ${raleway.className}`}>
                            Blog
                        </Link>




                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden bg-transparent p-2 rounded-sm group"
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
                                        { label: 'Exco', href: '/exco' },
                                        { label: 'Book Court', href: '/bookcourt' },
                                        { label: 'Events', href: '/events' },
                                        { label: 'Blog', href: '/blog' },
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
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar; 