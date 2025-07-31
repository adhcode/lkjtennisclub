'use client';

import { Bruno_Ace_SC, Raleway } from 'next/font/google';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Clock, MapPin, Users, ArrowLeft, Heart, Trophy, Star } from 'lucide-react';

const brunoAce = Bruno_Ace_SC({
    weight: '400',
    subsets: ['latin'],
});

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400'],
});

const ProfTayoInauguralLecture = () => {
    return (
        <>
            <Navbar />
            <main className="bg-[#fcf7dc] pt-20">
                {/* Hero Section */}
                <section className="relative min-h-[70vh] flex items-center">
                    <Image
                        src="/proftayo.JPG"
                        alt="Prof. Tayo Ajayi Inaugural Lecture"
                        fill
                        className="object-cover filter brightness-[0.8] contrast-[1.1]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
                    
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
                                Celebrating Excellence
                            </motion.span>
                            
                            <h1 className={`text-[#fcf7dc] text-3xl md:text-5xl mb-6 leading-tight ${brunoAce.className}`}>
                                CELEBRATING PROF. TAYO AJAYI'S 109TH INAUGURAL LECTURE
                            </h1>
                            
                            <p className={`text-[#fcf7dc]/90 text-lg mb-8 max-w-3xl mx-auto ${raleway.className}`}>
                                We proudly celebrated our esteemed club member, Professor Tayo Julius Ajayi, 
                                as he delivered his inaugural lecture at Lagos State University. 
                                A moment of academic excellence and club pride.
                            </p>
                            
                            <div className="flex flex-wrap justify-center gap-6 text-[#fcf7dc]/80">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    <span className={raleway.className}>Tuesday, July 29, 2025</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    <span className={raleway.className}>2:00 PM</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    <span className={raleway.className}>LASU, Ojo Campus</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Event Details */}
                <section className="py-16">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-4xl mx-auto">
                            {/* Back Button */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="mb-8"
                            >
                                <Link
                                    href="/events"
                                    className={`inline-flex items-center gap-2 text-[#911b1e] hover:text-[#911b1e]/80 
                                              transition-colors ${raleway.className}`}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Events
                                </Link>
                            </motion.div>

                            {/* Event Story */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-[#911b1e]/10"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <Heart className="w-6 h-6 text-[#911b1e]" />
                                    <h2 className={`text-[#911b1e] text-2xl ${brunoAce.className}`}>
                                        A PROUD MOMENT FOR LKJ TENNIS CLUB
                                    </h2>
                                </div>
                                
                                <div className={`text-[#911b1e]/80 space-y-4 ${raleway.className}`}>
                                    <p>
                                    On Tuesday, July 29th, 2025, the LKJ Tennis Club proudly celebrated one of our esteemed members, Professor Tayo Julius Ajayi, as he delivered the 109th Inaugural Lecture at Lagos State University.
                                    </p>
                                    
                                    <p>
                                    His lecture, titled “Interlinguistic Interactions and Resultant Phenomena: Agglutinative and Inflectional Languages,” was presented at the renowned Buba Marwa Auditorium, LASU Main Campus, and chaired by the Vice-Chancellor, Professor Ibiyemi Ibilola Olatunji-Bello.
                                    </p>
                                    
                                    <p>
                                    Professor Ajayi’s accomplishment reflects the depth of intellect and excellence we are proud to see within our community. His academic contributions inspire us all, and we are honoured to celebrate this remarkable milestone with him.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Lecture Details */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-[#911b1e]/10"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <Trophy className="w-6 h-6 text-[#911b1e]" />
                                    <h3 className={`text-[#911b1e] text-xl ${brunoAce.className}`}>
                                        LECTURE DETAILS
                                    </h3>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className={`text-[#911b1e] font-semibold mb-2 ${raleway.className}`}>
                                                Lecturer
                                            </h4>
                                            <p className={`text-[#911b1e]/80 ${raleway.className}`}>
                                                Professor Tayo Julius Ajayi
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h4 className={`text-[#911b1e] font-semibold mb-2 ${raleway.className}`}>
                                                Lecture Number
                                            </h4>
                                            <p className={`text-[#911b1e]/80 ${raleway.className}`}>
                                                109th Inaugural Lecture
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h4 className={`text-[#911b1e] font-semibold mb-2 ${raleway.className}`}>
                                                Venue
                                            </h4>
                                            <p className={`text-[#911b1e]/80 ${raleway.className}`}>
                                                Buba Marwa Auditorium<br />
                                                LASU Main Campus, Ojo, Lagos
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className={`text-[#911b1e] font-semibold mb-2 ${raleway.className}`}>
                                                Date & Time
                                            </h4>
                                            <p className={`text-[#911b1e]/80 ${raleway.className}`}>
                                                Tuesday, 29th July, 2025<br />
                                                2:00 PM
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h4 className={`text-[#911b1e] font-semibold mb-2 ${raleway.className}`}>
                                                Chairperson
                                            </h4>
                                            <p className={`text-[#911b1e]/80 ${raleway.className}`}>
                                                Professor Ibiyemi Ibilola Olatunji-Bello<br />
                                                <span className="text-sm">Vice-Chancellor, Lagos State University</span>
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <h4 className={`text-[#911b1e] font-semibold mb-2 ${raleway.className}`}>
                                                Lecture Title
                                            </h4>
                                            <p className={`text-[#911b1e]/80 italic ${raleway.className}`}>
                                                "Interlinguistic Interactions and Resultant Phenomena: 
                                                Agglutinative and Inflectional Languages"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Photo Gallery */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-[#911b1e]/10"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <Star className="w-6 h-6 text-[#911b1e]" />
                                    <h3 className={`text-[#911b1e] text-xl ${brunoAce.className}`}>
                                        CELEBRATION MOMENTS
                                    </h3>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="relative h-64 rounded-xl overflow-hidden">
                                        <Image
                                            src="/proftayo.JPG"
                                            alt="Prof. Tayo Ajayi Inaugural Lecture Invitation"
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="relative h-64 rounded-xl overflow-hidden">
                                        <Image
                                            src="/proftayo2.JPG"
                                            alt="LKJ Tennis Club members celebrating Prof. Tayo"
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </div>
                                
                                <p className={`text-[#911b1e]/70 text-center mt-6 ${raleway.className}`}>
                                    The LKJ Tennis Club family proudly supporting our distinguished member
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default ProfTayoInauguralLecture;