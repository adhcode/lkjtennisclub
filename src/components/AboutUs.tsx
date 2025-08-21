'use client';

import { Raleway } from 'next/font/google';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
});

const AboutUs = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);



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
                                <h2 className="text-[#911b1e] text-2xl sm:text-3xl md:text-4xl tracking-wider font-medium font-agrandir">
                                    ABOUT US
                                </h2>
                            </motion.div>

                            <div className="space-y-8">
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className={`text-[#911b1e]/70 text-lg sm:text-lg leading-relaxed ${raleway.className}`}
                                >
                                    A Club Built on Passion and Community.
                                    At LKJ Tennis Club, we believe tennis is more than a sport, it&apos;s a lifestyle. Founded with the vision of making the game accessible and enjoyable for everyone, our club brings together people of all skill levels to learn, grow, and compete.
                                </motion.p>


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



        </section>
    );
};

export default AboutUs; 