'use client';

import { Bruno_Ace_SC, Raleway } from 'next/font/google';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const brunoAce = Bruno_Ace_SC({
    weight: '400',
    subsets: ['latin'],
});

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400'],
});

const AboutUs = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const circleVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    const iconVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20
            }
        }
    };

    return (
        <section ref={sectionRef} className="relative py-16 sm:py-24 md:py-32 bg-[#fcf7dc] overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative">
                <motion.div
                    style={{ y, opacity }}
                    className="max-w-7xl mx-auto"
                >
                    <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                        <div className="space-y-12">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                            >
                                <h2 className={`text-[#911b1e] text-2xl sm:text-3xl md:text-4xl tracking-wider font-medium ${brunoAce.className}`}>
                                    ABOUT US
                                </h2>
                            </motion.div>

                            <div className="space-y-8">
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className={`text-[#911b1e]/70 text-base sm:text-lg leading-relaxed ${raleway.className}`}
                                >
                                    A Club Built on Passion and Community.
                                    At LKJ Tennis Club, we believe tennis is more than a sport, it&apos;s a lifestyle. Founded with the vision of making the game accessible and enjoyable for everyone, our club brings together people of all skill levels to learn, grow, and compete.
                                </motion.p>

                                <div className="grid grid-cols-2 gap-4 sm:gap-8">
                                    <motion.div
                                        variants={circleVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        className="relative group cursor-pointer"
                                    >
                                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-[#911b1e]/20 
                                                      flex flex-col items-center justify-center p-3 sm:p-4
                                                      group-hover:border-[#911b1e] transition-all duration-500">
                                            <motion.div
                                                variants={iconVariants}
                                                className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center mb-1 sm:mb-2"
                                            >
                                                <svg
                                                    className="w-6 h-6 sm:w-8 sm:h-8 text-[#911b1e] group-hover:scale-110 transition-transform duration-500"
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
                                            </motion.div>
                                            <p className={`text-[#911b1e]/70 text-xs sm:text-sm leading-tight text-center 
                                                         group-hover:text-[#911b1e] transition-colors duration-500 ${raleway.className}`}>
                                                Expert<br />Coaching
                                            </p>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        variants={circleVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 }}
                                        className="relative group cursor-pointer"
                                    >
                                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-[#911b1e]/20 
                                                      flex flex-col items-center justify-center p-3 sm:p-4
                                                      group-hover:border-[#911b1e] transition-all duration-500">
                                            <motion.div
                                                variants={iconVariants}
                                                className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center mb-1 sm:mb-2"
                                            >
                                                <svg
                                                    className="w-6 h-6 sm:w-8 sm:h-8 text-[#911b1e] group-hover:scale-110 transition-transform duration-500"
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
                                            </motion.div>
                                            <p className={`text-[#911b1e]/70 text-xs sm:text-sm leading-tight text-center 
                                                         group-hover:text-[#911b1e] transition-colors duration-500 ${raleway.className}`}>
                                                Premium<br />Court
                                            </p>
                                        </div>
                                    </motion.div>

                                </div>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    viewport={{ once: true }}
                                    className={`text-[#911b1e]/70 text-lg leading-relaxed ${raleway.className}`}
                                >
                                    With a well-maintained facility, structured training programs, and a calendar full of exciting events,
                                    we create the perfect environment for both competitive players and those who just want to enjoy the game.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    viewport={{ once: true }}
                                    className="flex space-x-4"
                                >
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`bg-[#911b1e] text-[#fcf7dc] px-8 py-4 text-sm 
                                                  hover:bg-[#911b1e]/90 transition-colors ${raleway.className}`}
                                    >
                                        Learn More
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`bg-transparent border border-[#911b1e] text-[#911b1e] 
                                                  px-8 py-4 text-sm hover:bg-[#911b1e]/5 
                                                  transition-colors ${raleway.className}`}
                                    >
                                        Our Team
                                    </motion.button>
                                </motion.div>
                            </div>
                        </div>

                        <div className="relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 1, type: "spring", bounce: 0.3 }}
                                viewport={{ once: true }}
                                className="relative h-[700px] rounded-lg overflow-hidden"
                            >
                                <Image
                                    src="/about_us.jpg"
                                    alt="Tennis Club"
                                    fill
                                    className="object-cover filter brightness-[0.85] contrast-[1.1] saturate-[0.95]"
                                />
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
                                />
                            </motion.div>

                            {/* Animated decorative elements */}
                            <motion.div
                                initial={{ opacity: 0, x: -20, y: 20 }}
                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#911b1e]/10 rounded-lg -z-10"
                            />
                            <motion.div
                                initial={{ opacity: 0, x: 20, y: -20 }}
                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                                className="absolute -top-6 -right-6 w-32 h-32 bg-[#911b1e]/10 rounded-lg -z-10"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Why Choose Us Section */}
            <div className="container mx-auto px-4 md:px-6 relative mt-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <h2 className={`text-[#911b1e] text-2xl sm:text-3xl md:text-4xl tracking-wider font-medium ${brunoAce.className}`}>
                        WHY CHOOSE US?
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-12 max-w-7xl">
                    {[
                        {
                            title: "Premium Tennis Courts",
                            description: "A high-quality playing surface for a top-tier experience.",
                            icon: (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M4 8h16M4 16h16M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z"
                                />
                            )
                        },
                        {
                            title: "Expert Coaching",
                            description: "Professional training tailored to all skill levels.",
                            icon: (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            )
                        },
                        {
                            title: "Vibrant Community",
                            description: "Meet, connect, and play with fellow tennis lovers.",
                            icon: (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            )
                        },
                        {
                            title: "Tournaments & Events",
                            description: "Regular competitions and fun social gatherings.",
                            icon: (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
                                />
                            )
                        },
                        {
                            title: "Lighted Courts",
                            description: "Enjoy tennis even after sunset with our well-lit courts.",
                            icon: (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                />
                            )
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="flex items-start space-x-6">
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                                    className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                                >
                                    <svg
                                        className="w-6 h-6 text-[#911b1e] group-hover:scale-110 transition-transform duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        {feature.icon}
                                    </svg>
                                </motion.div>

                                <div>
                                    <motion.h3
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                                        className={`text-[#911b1e] text-lg sm:text-xl md:text-2xl mb-2 ${brunoAce.className}`}
                                    >
                                        {feature.title}
                                    </motion.h3>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                                        className={`text-[#911b1e]/70 leading-relaxed ${raleway.className}`}
                                    >
                                        {feature.description}
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutUs; 