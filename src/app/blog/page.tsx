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

const blogPosts = [
    {
        title: "Tennis & Life: The Hidden Power of Consistency Over Talent",
        image: "/DSC_1723.jpg",
        date: "March 15, 2024",
        readTime: "5 min read",
        slug: "tennis-and-life-consistency-over-talent"
    }
];

const BlogPage = () => {
    return (
        <>
            <Navbar />
            <main className="bg-[#fcf7dc]">
                {/* Hero Section */}
                <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[#911b1e] pattern-grid-lg opacity-5" />
                    <div className="container mx-auto px-4 md:px-6 py-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <h1 className={`text-[#911b1e] text-3xl sm:text-5xl md:text-7xl mb-6 tracking-wider ${brunoAce.className}`}>
                                TENNIS INSIGHTS
                            </h1>
                            <p className={`text-[#911b1e]/70 text-lg md:text-xl ${raleway.className}`}>
                                Stories, tips, and insights from the tennis community
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Blog Posts Grid */}
                <section className="py-16 px-4 md:px-6">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid gap-8">
                            {blogPosts.map((post, index) => (
                                <motion.div
                                    key={post.slug}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group"
                                >
                                    <Link href={`/blog/${post.slug}`}>
                                        <div className="relative bg-white rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                                            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                                                <motion.div
                                                    whileHover={{ scale: 1.05 }}
                                                    transition={{ duration: 0.6 }}
                                                    className="relative h-full"
                                                >
                                                    <Image
                                                        src={post.image}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover"
                                                        priority
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                                </motion.div>
                                                <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
                                                    <div className="flex items-center space-x-4 mb-4 text-[#fcf7dc]/80">
                                                        <span className={`text-sm ${raleway.className}`}>
                                                            {post.date}
                                                        </span>
                                                        <span className="w-1 h-1 rounded-full bg-[#fcf7dc]/40" />
                                                        <span className={`text-sm ${raleway.className}`}>
                                                            {post.readTime}
                                                        </span>
                                                    </div>

                                                    <h3 className={`text-[#fcf7dc] text-xl sm:text-2xl md:text-3xl mb-4 group-hover:text-[#fcf7dc]/90 transition-colors ${brunoAce.className}`}>
                                                        {post.title}
                                                    </h3>

                                                    <div className={`inline-flex items-center text-[#fcf7dc] group-hover:text-[#fcf7dc]/90 transition-colors ${raleway.className}`}>
                                                        <span>Read Article</span>
                                                        <motion.span
                                                            initial={{ x: 0 }}
                                                            whileHover={{ x: 5 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="ml-2"
                                                        >
                                                            →
                                                        </motion.span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default BlogPage; 