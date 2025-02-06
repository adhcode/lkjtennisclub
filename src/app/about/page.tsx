'use client';

import { Bruno_Ace_SC, Raleway } from 'next/font/google';
import { motion } from 'framer-motion';
import Image from 'next/image';
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

const AboutPage = () => {
    return (
        <>
            <Navbar />
            <main className="bg-[#fcf7dc]">
                {/* Hero Section */}
                <section className="relative h-[60vh] min-h-[400px]">
                    <Image
                        src="/about_us3.jpg"
                        alt="LKJ Tennis Club"
                        fill
                        className="object-cover filter brightness-[0.85] contrast-[1.1]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <h1 className={`text-[#fcf7dc] text-4xl md:text-6xl mb-6 tracking-wider ${brunoAce.className}`}>
                                OUR STORY
                            </h1>
                            <div className="flex items-center justify-center space-x-4">
                                <div className="w-12 h-[1px] bg-[#fcf7dc]/40" />
                                <span className={`text-[#fcf7dc]/60 text-sm ${raleway.className}`}>Est. 2024</span>
                                <div className="w-12 h-[1px] bg-[#fcf7dc]/40" />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* History Section */}
                <section className="relative py-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 mb-12"
                            >
                                <h2 className={`text-[#911b1e] text-2xl md:text-3xl mb-6 ${brunoAce.className}`}>
                                    Our Beginning
                                </h2>
                                <p className={`text-[#911b1e]/80 leading-relaxed mb-6 ${raleway.className}`}>
                                    LKJ Tennis Club was established in 2024 as a premier tennis community within
                                    LKJ Gardens, Igando. Founded by a group of passionate tennis enthusiasts,
                                    the club has quickly become a vibrant hub for tennis lovers and social interaction
                                    in the heart of Igando.
                                </p>
                                <p className={`text-[#911b1e]/80 leading-relaxed ${raleway.className}`}>
                                    Our club provides a unique blend of competitive tennis and social engagement,
                                    creating an environment where members can improve their game while building lasting friendships.
                                </p>
                            </motion.div>

                            {/* Mission & Values */}
                            <div className="grid md:grid-cols-2 gap-8 mb-12">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white/50 backdrop-blur-sm rounded-2xl p-8"
                                >
                                    <h2 className={`text-[#911b1e] text-2xl mb-6 ${brunoAce.className}`}>
                                        Our Mission
                                    </h2>
                                    <p className={`text-[#911b1e]/80 leading-relaxed ${raleway.className}`}>
                                        To foster a thriving tennis community that promotes excellence,
                                        sportsmanship, and social connection through the beautiful game of tennis.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white/50 backdrop-blur-sm rounded-2xl p-8"
                                >
                                    <h2 className={`text-[#911b1e] text-2xl mb-6 ${brunoAce.className}`}>
                                        Our Values
                                    </h2>
                                    <ul className={`text-[#911b1e]/80 space-y-3 ${raleway.className}`}>
                                        <li>• Excellence in tennis and community building</li>
                                        <li>• Inclusivity and sportsmanship</li>
                                        <li>• Continuous improvement and development</li>
                                        <li>• Social engagement and friendship</li>
                                    </ul>
                                </motion.div>
                            </div>

                            {/* Facilities */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 md:p-12"
                            >
                                <h2 className={`text-[#911b1e] text-2xl md:text-3xl mb-6 ${brunoAce.className}`}>
                                    Our Facilities
                                </h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="relative h-64 rounded-xl overflow-hidden">
                                        <video
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="absolute inset-0 w-full h-full object-cover"
                                        >
                                            <source src="/hero.mp4" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                    <div className={`text-[#911b1e]/80 space-y-4 ${raleway.className}`}>
                                        <p>Our world-class facilities include:</p>
                                        <ul className="space-y-2">
                                            <li>• Professional-grade tennis courts</li>
                                            <li>• Modern lighting for evening play</li>
                                            <li>• Comfortable viewing areas</li>
                                            <li>• Well-maintained practice areas</li>
                                            <li>• Club house with amenities</li>
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute right-0 top-0 w-40 h-40 
                                      bg-[#911b1e]/5 rounded-full blur-3xl" />
                        <div className="absolute left-0 bottom-0 w-40 h-40 
                                      bg-[#911b1e]/5 rounded-full blur-3xl" />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default AboutPage; 