'use client';

import { Bruno_Ace_SC, Raleway } from 'next/font/google';
import Image from 'next/image';
import { motion } from 'framer-motion';

const brunoAce = Bruno_Ace_SC({
    weight: '400',
    subsets: ['latin'],
});

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400'],
});

const AboutUs = () => {
    return (
        <section className="relative py-24 bg-[#fcf7dc] overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#911b1e]/5 rounded-full -translate-x-32 -translate-y-32" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#911b1e]/5 rounded-full translate-x-48 translate-y-48" />

            <div className="container mx-auto px-4 md:px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto"
                >
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8 md:pr-12">
                            <h2 className={`text-[#911b1e] text-3xl md:text-4xl tracking-wider font-medium ${brunoAce.className}`}>
                                ABOUT US
                            </h2>

                            <div className="space-y-6">
                                <p className={`text-[#911b1e]/70 text-sm md:text-base ${raleway.className}`}>
                                    Located in LKJ Gardens Igando, our tennis club is more than just a sports facility
                                    - it&apos;s a community where tennis enthusiasts come together to play, learn, and grow.
                                </p>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="relative group">
                                        <div className="w-28 h-28 rounded-full border-2 border-[#911b1e]/20 
                                                      flex flex-col items-center justify-center p-4
                                                      group-hover:border-[#911b1e]/40 transition-colors">
                                            <div className="w-12 h-12 flex items-center justify-center mb-1">
                                                <svg
                                                    className="w-8 h-8 text-[#911b1e]/70"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="1.5"
                                                        d="M5.5 8.5L9 12m0 0l3.5-3.5M9 12l3.5 3.5M9 12h9M7 17v1a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2H9a2 2 0 00-2 2v1"
                                                    />
                                                </svg>
                                            </div>
                                            <p className={`text-[#911b1e]/70 text-xs leading-tight text-center ${raleway.className}`}>
                                                Expert<br />Coaching
                                            </p>
                                        </div>
                                    </div>

                                    <div className="relative group">
                                        <div className="w-28 h-28 rounded-full border-2 border-[#911b1e]/20 
                                                      flex flex-col items-center justify-center p-4
                                                      group-hover:border-[#911b1e]/40 transition-colors">
                                            <div className="w-12 h-12 flex items-center justify-center mb-1">
                                                <svg
                                                    className="w-8 h-8 text-[#911b1e]/70"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="1.5"
                                                        d="M4 8h16M4 16h16M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z"
                                                    />
                                                </svg>
                                            </div>
                                            <p className={`text-[#911b1e]/70 text-xs leading-tight text-center ${raleway.className}`}>
                                                Premium<br />Court
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <p className={`text-[#911b1e]/90 text-sm md:text-base leading-relaxed ${raleway.className}`}>
                                    Founded with the vision of making tennis accessible and enjoyable for everyone,
                                    we provide a high-quality facility and a welcoming atmosphere that encourages
                                    both competitive spirit and casual play.
                                </p>

                                <div className="flex space-x-4">
                                    <button className={`bg-[#911b1e] text-[#fcf7dc] px-8 py-3 text-sm 
                                                      hover:bg-[#911b1e]/90 transition-colors ${raleway.className}`}>
                                        Learn More
                                    </button>
                                    <button className={`bg-transparent border border-[#911b1e] text-[#911b1e] 
                                                      px-8 py-3 text-sm hover:bg-[#911b1e]/5 
                                                      transition-colors ${raleway.className}`}>
                                        Our Team
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative h-[600px] rounded-lg overflow-hidden"
                            >
                                <Image
                                    src="/about_us.jpg"
                                    alt="Tennis Club"
                                    fill
                                    className="object-cover filter brightness-[0.85] contrast-[1.1] saturate-[0.95]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                            </motion.div>

                            {/* Decorative elements */}
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#911b1e]/10 rounded-lg -z-10" />
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#911b1e]/10 rounded-lg -z-10" />
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="absolute bottom-8 right-4 md:right-6 flex items-center space-x-4">
                <span className={`text-[#911b1e]/40 text-sm ${raleway.className}`}>Since 2024</span>
                <div className="w-12 h-[1px] bg-[#911b1e]/40" />
            </div>
        </section>
    );
};

export default AboutUs; 