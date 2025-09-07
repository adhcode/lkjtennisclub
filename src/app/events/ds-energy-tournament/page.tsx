'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Users, Trophy, Instagram, Facebook, Twitter } from 'lucide-react';

const DSEnergyTournamentPage = () => {
    return (
        <>
            <Navbar />
            <main className="bg-[#fcf7dc] pt-20">
                {/* Hero Section */}
                <section className="relative min-h-[80vh] flex items-center">
                    <Image
                        src="/dsenergy2.jpg"
                        alt="DS Energy Tennis Tournament"
                        fill
                        className="object-cover filter brightness-[0.4] contrast-[1.1]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

                    <div className="relative container mx-auto px-4 md:px-6 py-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="inline-block px-4 py-2 bg-[#fcf7dc] text-[#911b1e] 
                                         rounded-full text-sm mb-6 font-raleway font-medium"
                            >
                                Tournament Ongoing
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-[#fcf7dc] text-4xl md:text-6xl mb-6 tracking-wider font-agrandir"
                            >
                                DS ENERGY TENNIS TOURNAMENT
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-[#fcf7dc]/90 text-xl mb-8 italic font-raleway"
                            >
                                September 6-20, 2025 • LKJ Tennis Club
                            </motion.p>
                        </motion.div>
                    </div>
                </section>

                {/* Tournament Status Section */}
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
                                    TOURNAMENT UPDATE
                                </h2>
                                
                                <div className="space-y-6 text-[#911b1e]/80 font-raleway leading-relaxed">
                                    <p className="text-lg">
                                        The DS Energy Tennis Tournament is now underway! Following a spectacular opening ceremony 
                                        on <strong>September 6th, 2025</strong>, our court have come alive with the sound of competitive tennis.
                                    </p>
                                    
                                    <p>
                                        Several exciting matches have already been played across in the men categories, with our 
                                        participants showcasing incredible skill, sportsmanship, and determination. The energy 
                                        on the courts has been electric, and the community support has been overwhelming.
                                    </p>
                                    
                                    <p>
                                        This prestigious tournament features three competitive categories:
                                    </p>
                                    
                                    <div className="grid md:grid-cols-3 gap-6 my-8">
                                        <div className="bg-[#911b1e]/5 rounded-lg p-6 text-center">
                                            <Users className="w-8 h-8 text-[#911b1e] mx-auto mb-3" />
                                            <h3 className="font-agrandir text-[#911b1e] mb-2">Men's Category</h3>
                                            
                                        </div>
                                        <div className="bg-[#911b1e]/5 rounded-lg p-6 text-center">
                                            <Users className="w-8 h-8 text-[#911b1e] mx-auto mb-3" />
                                            <h3 className="font-agrandir text-[#911b1e] mb-2">Women's Category</h3>
                                          
                                        </div>
                                        <div className="bg-[#911b1e]/5 rounded-lg p-6 text-center">
                                            <Trophy className="w-8 h-8 text-[#911b1e] mx-auto mb-3" />
                                            <h3 className="font-agrandir text-[#911b1e] mb-2">Kids Category</h3>
                                           
                                        </div>
                                    </div>
                                    
                                    <p>
                                        The tournament continues over three action-packed weekends, culminating in the grand finale 
                                        on <strong>September 20th, 2025</strong>. Each match brings us closer to crowning our champions 
                                        and celebrating the spirit of tennis that defines our community.
                                    </p>
                                </div>
                            </div>

                            {/* Tournament Schedule */}
                            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-[#911b1e]/10 mb-12">
                                <h3 className="text-[#911b1e] text-xl md:text-2xl mb-6 font-agrandir text-center">
                                    TOURNAMENT SCHEDULE
                                </h3>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 bg-[#911b1e]/5 rounded-lg">
                                        <Calendar className="w-5 h-5 text-[#911b1e]" />
                                        <div>
                                            <p className="font-medium text-[#911b1e] font-raleway">Weekend 1: September 6-8, 2025</p>
                                            <p className="text-sm text-[#911b1e]/70 font-raleway">Opening Ceremony & First Round Matches ✓</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 p-4 bg-[#911b1e]/10 rounded-lg border-l-4 border-[#911b1e]">
                                        <Calendar className="w-5 h-5 text-[#911b1e]" />
                                        <div>
                                            <p className="font-medium text-[#911b1e] font-raleway">Weekend 2: September 13-15, 2025</p>
                                            <p className="text-sm text-[#911b1e]/70 font-raleway">Quarter Finals & Semi Finals - In Progress</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 p-4 bg-[#911b1e]/5 rounded-lg">
                                        <Trophy className="w-5 h-5 text-[#911b1e]" />
                                        <div>
                                            <p className="font-medium text-[#911b1e] font-raleway">Weekend 3: September 20, 2025</p>
                                            <p className="text-sm text-[#911b1e]/70 font-raleway">Finals & Championship Ceremony</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media Section */}
                            <div className="bg-gradient-to-r from-[#911b1e] to-[#911b1e]/90 rounded-2xl p-8 md:p-12 text-center">
                                <h3 className="text-[#fcf7dc] text-2xl md:text-3xl mb-6 font-agrandir">
                                    STAY UPDATED
                                </h3>
                                
                                <p className="text-[#fcf7dc]/90 text-lg mb-8 font-raleway leading-relaxed">
                                    Don't miss a moment of the action! Follow us on our social media channels for live updates, 
                                    match results, photo highlights, and behind-the-scenes content from the DS Energy Tennis Tournament.
                                </p>
                                
                                <div className="flex justify-center gap-6 mb-8">
                                    <motion.a
                                        href="https://www.instagram.com/lkjtennisclub/?igsh=MXhtN2djZTJ3MHZkOA%3D%3D&utm_source=qr#"
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
                                    @LKJTennisClub • #DSEnergyTournament • #LKJTennis
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

export default DSEnergyTournamentPage;