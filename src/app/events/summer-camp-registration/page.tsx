'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, MapPin, Users, Trophy, Heart, Instagram, Facebook, Twitter } from 'lucide-react';

const SummerCampResults = () => {
    return (
        <>
            <Navbar />
            <main className="bg-[#fcf7dc]">
                {/* Hero Section */}
                <section className="relative min-h-[60vh] flex items-center">
                    <Image
                        src="/summerprogram.jpg"
                        alt="Alimosho Summer Tennis Program - Completed"
                        fill
                        className="object-cover filter brightness-[0.7] contrast-[1.1]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

                    <div className="relative container mx-auto px-4 md:px-6 py-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <motion.span
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="inline-block px-4 py-1 bg-[#fcf7dc] text-[#911b1e] rounded-full text-sm mb-6 font-raleway font-medium"
                            >
                                Program Completed Successfully
                            </motion.span>

                            <h1 className="text-[#fcf7dc] text-4xl md:text-6xl mb-6 font-agrandir">
                                ALIMOSHO SUMMER TENNIS CLINIC & TOURNAMENT
                            </h1>

                            <p className="text-[#fcf7dc]/90 text-xl mb-8 max-w-2xl mx-auto font-raleway italic">
                                A Celebration of Young Champions & Community Spirit
                            </p>

                            <div className="flex flex-wrap justify-center gap-6 text-[#fcf7dc]/80">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    <span className="font-raleway">August 4-23, 2025</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5" />
                                    <span className="font-raleway">50+ Participants</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Trophy className="w-5 h-5" />
                                    <span className="font-raleway">Champions Crowned</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    <span className="font-raleway">LKJ Gardens Tennis Court</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>


                {/* Program Success Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-4xl mx-auto"
                        >
                            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 
                                          border border-[#911b1e]/10 shadow-lg mb-12">
                                <h2 className="text-[#911b1e] text-2xl md:text-3xl mb-6 font-agrandir text-center">
                                    A SUMMER TO REMEMBER
                                </h2>
                                
                                <div className="space-y-6 text-[#911b1e]/80 font-raleway leading-relaxed">
                                    <p className="text-lg">
                                        What an incredible journey it has been! Our Alimosho Summer Tennis Clinic & Tournament 
                                        concluded with overwhelming success, bringing together over <strong>50 enthusiastic young athletes</strong> 
                                         who showcased remarkable talent, determination, and sportsmanship throughout the program.
                                    </p>
                                    
                                    <p>
                                        For two transformative weeks, our court buzzed with energy as children aged 4-17 immersed 
                                        themselves in comprehensive tennis training, self-defense sessions, basketball drills, and 
                                        badminton activities. The daily 9 AM sessions became a beacon of joy and learning, fostering 
                                        not just athletic skills but lifelong friendships and invaluable life lessons.
                                    </p>
                                    
                                    <p>
                                        The program culminated in an exhilarating tournament that celebrated the growth and achievements 
                                        of every participant. 
                                    </p>
                                </div>
                            </div>

                            

                            {/* Community Impact */}
                            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-[#911b1e]/10 mb-12">
                                <h3 className="text-[#911b1e] text-2xl md:text-3xl mb-6 font-agrandir text-center">
                                    BUILDING CHAMPIONS, NURTURING DREAMS
                                </h3>
                                
                                <div className="space-y-6 text-[#911b1e]/80 font-raleway leading-relaxed">
                                    <p>
                                        At LKJ Tennis Club, we believe that every child carries within them the potential for greatness. 
                                        This summer program was more than just tennis lessons, it was a community-driven initiative 
                                        designed to inspire, educate, and empower the next generation of champions.
                                    </p>
                                    
                                    <p>
                                        Witnessing the transformation of these young athletes over two weeks has been nothing short of 
                                        extraordinary. From tentative first swings to confident rallies, from shy introductions to 
                                        lasting friendships, each child's journey has been a testament to the power of dedicated 
                                        coaching, supportive community, and unwavering determination.
                                    </p>
                                    
                                    <div className="bg-[#911b1e]/5 rounded-lg p-6 my-8">
                                        <div className="flex items-center gap-3 mb-4">
                                            <Heart className="w-6 h-6 text-[#911b1e]" />
                                            <h4 className="text-[#911b1e] text-lg font-agrandir">Our Commitment</h4>
                                        </div>
                                        <p className="text-[#911b1e]/80">
                                            We are deeply committed to continuing this legacy of excellence. Our mission extends beyond 
                                            teaching tennis techniques, we are dedicated to breeding champions in character, resilience, 
                                            and sportsmanship. Every program we organize is a step toward building a stronger, more 
                                            vibrant tennis community that celebrates both individual achievement and collective growth.
                                        </p>
                                    </div>
                                    
                                    <p>
                                        As we look toward the future, we remain steadfast in our commitment to providing exceptional 
                                        opportunities for young athletes. The success of this summer program reinforces our belief 
                                        that with the right environment, guidance, and community support, every child can achieve 
                                        remarkable things both on and off the court.
                                    </p>
                                </div>
                            </div>

                            {/* Social Media Section */}
                            <div className="bg-gradient-to-r from-[#911b1e] to-[#911b1e]/90 rounded-2xl p-8 md:p-12 text-center">
                                <h3 className="text-[#fcf7dc] text-2xl md:text-3xl mb-6 font-agrandir">
                                    RELIVE THE MEMORIES
                                </h3>
                                
                                <p className="text-[#fcf7dc]/90 text-lg mb-8 font-raleway leading-relaxed">
                                    Don't miss the amazing photos, videos, and highlights from our summer program! 
                                    Follow us on social media to see all the incredible moments, champion celebrations, 
                                    and behind-the-scenes content from this unforgettable summer.
                                </p>
                                
                                <div className="flex justify-center gap-6 mb-8">
                                    <motion.a
                                        href="#"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-12 h-12 bg-[#fcf7dc] rounded-full flex items-center justify-center
                                                 hover:bg-[#fcf7dc]/90 transition-colors duration-300"
                                    >
                                        <Instagram className="w-6 h-6 text-[#911b1e]" />
                                    </motion.a>
                                    
                                    <motion.a
                                        href="#"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-12 h-12 bg-[#fcf7dc] rounded-full flex items-center justify-center
                                                 hover:bg-[#fcf7dc]/90 transition-colors duration-300"
                                    >
                                        <Facebook className="w-6 h-6 text-[#911b1e]" />
                                    </motion.a>
                                    
                                    <motion.a
                                        href="#"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-12 h-12 bg-[#fcf7dc] rounded-full flex items-center justify-center
                                                 hover:bg-[#fcf7dc]/90 transition-colors duration-300"
                                    >
                                        <Twitter className="w-6 h-6 text-[#911b1e]" />
                                    </motion.a>
                                </div>
                                
                                <p className="text-[#fcf7dc]/80 text-sm font-raleway">
                                    @LKJTennisClub • #AlimoshoSummerTennis • #LKJChampions
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default SummerCampResults;