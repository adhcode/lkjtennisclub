'use client';

import { Bruno_Ace_SC, Raleway } from 'next/font/google';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Clock, MapPin, Users, Star } from 'lucide-react';
import RegistrationForm from '@/components/RegistrationForm';

const brunoAce = Bruno_Ace_SC({
    weight: '400',
    subsets: ['latin'],
});

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400'],
});



const SummerCampRegistration = () => {
    return (
        <>
            <Navbar />
            <main className="bg-[#fcf7dc]">
                {/* Hero Section */}
                <section className="relative min-h-[60vh] flex items-center">
                    <Image
                        src="/summerprogram.jpg"
                        alt="Alimosho Summer Tennis Program"
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
                                className={`inline-block px-4 py-1 bg-[#fcf7dc] text-[#911b1e] 
                                           rounded-full text-sm mb-6 ${raleway.className}`}
                            >
                                🎾 Summer 2025
                            </motion.span>
                            
                            <h1 className={`text-[#fcf7dc] text-4xl md:text-6xl mb-6 ${brunoAce.className}`}>
                                ALIMOSHO SUMMER TENNIS CLINIC & TOURNAMENT
                            </h1>
                            
                            <p className={`text-[#fcf7dc]/90 text-lg mb-8 max-w-2xl mx-auto ${raleway.className}`}>
                                Join our comprehensive 2-week summer program featuring tennis clinic, tournament, 
                                plus self-defense, basketball, and badminton activities for ages 4-17.
                            </p>
                            
                            <div className="flex flex-wrap justify-center gap-6 text-[#fcf7dc]/80">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    <span className={raleway.className}>August 4-23, 2025</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    <span className={raleway.className}>9:00 AM Daily</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5" />
                                    <span className={raleway.className}>Ages 4-17</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    <span className={raleway.className}>LKJ Gardens Tennis Court</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

               

                {/* Registration Form Section */}
                <section className="py-16 bg-white/30">
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className={`text-[#911b1e] text-3xl md:text-4xl mb-4 ${brunoAce.className}`}>
                                REGISTER YOUR CHILD TODAY
                            </h2>
                            <p className={`text-[#911b1e]/70 text-lg max-w-2xl mx-auto ${raleway.className}`}>
                                Secure your child's spot in our exciting summer tennis camp. 
                                Limited spaces available - register now!
                            </p>
                        </motion.div>

                        <div className="max-w-4xl mx-auto">
                            <RegistrationForm />
                        </div>
                    </div>
                </section>

                {/* Contact & Pricing Section */}
                <section className="py-16">
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-2xl mx-auto text-center"
                        >
                            <h2 className={`text-[#911b1e] text-3xl md:text-4xl mb-8 ${brunoAce.className}`}>
                                PROGRAM DETAILS & CONTACT
                            </h2>
                            
                            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-[#911b1e]/10">
                                <div className="text-center mb-6">
                                    <div className={`text-2xl text-[#911b1e] mb-2 ${raleway.className}`}>
                                        2 WEEKS PROGRAM
                                    </div>
                                    <p className={`text-[#911b1e]/70 ${raleway.className}`}>
                                        Daily sessions at 9AM for ages 4-17 years
                                    </p>
                                </div>
                                
                                <div className="space-y-3 text-left mb-6">
                                    <div className="flex items-center gap-3">
                                        <Star className="w-5 h-5 text-[#911b1e]" />
                                        <span className={`text-[#911b1e]/80 ${raleway.className}`}>
                                            Tennis clinic and tournament
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Star className="w-5 h-5 text-[#911b1e]" />
                                        <span className={`text-[#911b1e]/80 ${raleway.className}`}>
                                            Self defense training (2 hrs for 3 days)
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Star className="w-5 h-5 text-[#911b1e]" />
                                        <span className={`text-[#911b1e]/80 ${raleway.className}`}>
                                            Basketball and badminton activities
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Star className="w-5 h-5 text-[#911b1e]" />
                                        <span className={`text-[#911b1e]/80 ${raleway.className}`}>
                                            Professional coaching and supervision
                                        </span>
                                    </div>
                                </div>

                                <div className="border-t border-[#911b1e]/10 pt-6">
                                    <h3 className={`text-[#911b1e] text-lg mb-4 ${raleway.className}`}>
                                        FOR MORE ENQUIRIES
                                    </h3>
                                    <div className="space-y-2">
                                        <a href="tel:+2348065638497" className={`block text-[#911b1e] hover:text-[#911b1e]/80 transition-colors ${raleway.className}`}>
                                             +234 8065 638 497
                                        </a>
                                        <a href="tel:+2348027766996" className={`block text-[#911b1e] hover:text-[#911b1e]/80 transition-colors ${raleway.className}`}>
                                             +234 8027 766996
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default SummerCampRegistration;