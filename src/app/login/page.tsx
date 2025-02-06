'use client';

import { Bruno_Ace_SC, Raleway } from 'next/font/google';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState, FormEvent, ChangeEvent } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Link from 'next/link';

const brunoAce = Bruno_Ace_SC({
    weight: '400',
    subsets: ['latin'],
});

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400'],
});

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle login logic here
    };

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#fcf7dc] relative">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero3.jpg"
                        alt="Tennis Court"
                        fill
                        className="object-cover filter brightness-[0.2]"
                    />
                </div>

                <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
                    <div className="max-w-md mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20"
                        >
                            {/* Logo and Title */}
                            <div className="text-center mb-8">
                                <Image
                                    src="/logo.png"
                                    alt="LKJ Tennis Club"
                                    width={80}
                                    height={80}
                                    className="mx-auto mb-6"
                                />
                                <h1 className={`text-[#fcf7dc] text-2xl mb-2 ${brunoAce.className}`}>
                                    Member Login
                                </h1>
                                <p className={`text-[#fcf7dc]/60 text-sm ${raleway.className}`}>
                                    Welcome back to LKJ Tennis Club
                                </p>
                            </div>

                            {/* Login Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className={`block text-[#fcf7dc]/80 text-sm ${raleway.className}`}>
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#911b1e]/60" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={handleEmailChange}
                                            className={`w-full bg-white/10 border border-white/20 rounded-lg px-10 py-3 
                                                      text-[#fcf7dc] placeholder-[#fcf7dc]/40 focus:outline-none 
                                                      focus:border-[#911b1e] transition-colors ${raleway.className}`}
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className={`block text-[#fcf7dc]/80 text-sm ${raleway.className}`}>
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#911b1e]/60" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={handlePasswordChange}
                                            className={`w-full bg-white/10 border border-white/20 rounded-lg px-10 py-3 
                                                      text-[#fcf7dc] placeholder-[#fcf7dc]/40 focus:outline-none 
                                                      focus:border-[#911b1e] transition-colors ${raleway.className}`}
                                            placeholder="Enter your password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#fcf7dc]/60 
                                                     hover:text-[#fcf7dc] transition-colors"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className={`flex items-center space-x-2 ${raleway.className}`}>
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-white/20 bg-white/10 
                                                     text-[#911b1e] focus:ring-[#911b1e]"
                                        />
                                        <span className="text-sm text-[#fcf7dc]/80">Remember me</span>
                                    </label>
                                    <Link
                                        href="/forgot-password"
                                        className={`text-sm text-[#fcf7dc]/60 hover:text-[#fcf7dc] 
                                                  transition-colors ${raleway.className}`}
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    className={`w-full bg-[#911b1e] text-[#fcf7dc] py-3 rounded-lg 
                                              hover:bg-[#911b1e]/90 transition-colors ${raleway.className}`}
                                >
                                    Sign In
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className={`text-[#fcf7dc]/60 text-sm ${raleway.className}`}>
                                    Not a member yet?{' '}
                                    <Link
                                        href="/join"
                                        className="text-[#911b1e] hover:text-[#911b1e]/80 transition-colors"
                                    >
                                        Join Now
                                    </Link>
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default LoginPage; 