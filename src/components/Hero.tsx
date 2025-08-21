'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <div className="relative h-screen w-full overflow-hidden pt-16">
            {/* Base image with parallax effect */}
            <motion.div
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0"
            >
                <Image
                    src="/hero3.jpg"
                    alt="Tennis Player"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="left"
                    className="absolute z-0 filter brightness-[0.85] contrast-[1.1] saturate-[1.05]"
                    priority
                />
            </motion.div>

            {/* Animated gradient overlays */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="absolute inset-0"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent z-[1]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 z-[1]" />
            </motion.div>

            {/* Content */}
            <div className="relative z-[2] h-full flex flex-col justify-center text-left px-4 md:px-16">
                <div className="max-w-[600px]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <h1 className="font-agrandir text-[#fcf7dc] text-3xl sm:text-5xl md:text-7xl mb-4 sm:mb-6 tracking-wider drop-shadow-sm">
                            LKJ TENNIS CLUB
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                    >
                        <p className="font-raleway text-[#fcf7dc]/90 text-base sm:text-lg md:text-xl font-light tracking-wide mb-8 sm:mb-12 drop-shadow-sm max-w-[400px]">
                            Where tennis brings people together, enriching lives through sport and community.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="flex space-x-4"
                    >
                        <Link
                            href="/about"
                            className="group relative overflow-hidden"
                        >
                            <div className="relative z-10 bg-transparent border border-[#fcf7dc] px-8 py-4 text-[#fcf7dc]
                                        font-raleway text-sm md:text-base transition-all duration-300
                                        hover:bg-[#fcf7dc] hover:text-[#911b1e]"
                            >
                                About Us
                            </div>
                            <motion.div
                                initial={{ x: "-100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="absolute inset-0 bg-[#fcf7dc]"
                            />
                        </Link>

                        <Link
                            href="/membership"
                            className="group relative overflow-hidden"
                        >
                            <div className="relative z-10 bg-[#911b1e] px-8 py-4 text-[#fcf7dc]
                                        font-raleway text-sm md:text-base transition-all duration-300"
                            >
                                Join Us
                            </div>
                            <motion.div
                                initial={{ x: "100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="absolute inset-0 bg-[#fcf7dc]"
                            />
                        </Link>
                    </motion.div>
                </div>

                {/* Decorative elements */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
                    className="absolute bottom-8 sm:bottom-12 left-4 md:left-16"
                >
                    <div className="flex items-center space-x-4">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 1.6 }}
                            className="w-12 h-[1px] bg-[#fcf7dc]/40 origin-left"
                        />
                        <span className="font-raleway text-[#fcf7dc]/40 text-sm">
                            Est. 2024
                        </span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroSection;
