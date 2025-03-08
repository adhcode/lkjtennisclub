'use client';

import { Bruno_Ace_SC, Raleway } from 'next/font/google';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const brunoAce = Bruno_Ace_SC({
    weight: '400',
    subsets: ['latin'],
});

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400'],
});

const blogPost = {
    title: "Tennis & Life: The Hidden Power of Consistency Over Talent",
    image: "/DSC_1723.jpg",
    date: "March 15, 2024",
    readTime: "5 min read",
    slug: "tennis-and-life-consistency-over-talent"
};

const BlogPost = () => {
    return (
        <>
            <Navbar />
            <main className="bg-[#fcf7dc]">
                {/* Hero Section */}
                <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src={blogPost.image}
                            alt="Tennis Court"
                            fill
                            className="object-cover filter brightness-[0.85]"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />
                    </div>
                    <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl mx-auto"
                        >
                            <h1 className={`text-[#fcf7dc] text-4xl md:text-6xl mb-6 tracking-wider ${brunoAce.className}`}>
                                {blogPost.title}
                            </h1>
                            <div className="flex items-center justify-center space-x-4 text-[#fcf7dc]/80">
                                <span className={`text-sm ${raleway.className}`}>{blogPost.date}</span>
                                <span className="w-1 h-1 rounded-full bg-[#fcf7dc]/40" />
                                <span className={`text-sm ${raleway.className}`}>{blogPost.readTime}</span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Article Content */}
                <section className="py-16 px-4 md:px-6">
                    <div className="container mx-auto max-w-3xl">
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-lg overflow-hidden shadow-xl p-8 md:p-12"
                        >
                            <div className={`prose prose-lg max-w-none ${raleway.className}`}>
                                <p className="text-[#911b1e]/80 mb-6 leading-relaxed">
                                    Coming soon...
                                </p>
                            </div>
                        </motion.article>

                        {/* Share and Navigation */}
                        <div className="mt-12 flex items-center justify-between">
                            <Link
                                href="/"
                                className={`inline-flex items-center space-x-2 text-[#911b1e] ${raleway.className} group`}
                            >
                                <svg
                                    className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                                <span>Back to Home</span>
                            </Link>
                            <div className="flex items-center space-x-4">
                                <button className="text-[#911b1e] hover:text-[#911b1e]/80 transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                                    </svg>
                                </button>
                                <button className="text-[#911b1e] hover:text-[#911b1e]/80 transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                                    </svg>
                                </button>
                                <button className="text-[#911b1e] hover:text-[#911b1e]/80 transition-colors">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default BlogPost; 