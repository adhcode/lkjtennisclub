'use client';

import { Bruno_Ace_SC, Raleway } from 'next/font/google';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle, Calendar, Clock, MapPin, Phone, Mail } from 'lucide-react';

const brunoAce = Bruno_Ace_SC({
    weight: '400',
    subsets: ['latin'],
});

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400'],
});

const RegistrationConfirmation = () => {
    // Get number of children from URL params
    const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const childrenCount = searchParams ? parseInt(searchParams.get('children') || '1') : 1;

    return (
        <>
            <Navbar />
            <main className="bg-[#fcf7dc] min-h-screen pt-20">
                <section className="py-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            {/* Success Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="w-24 h-24 mx-auto mb-8 bg-green-100 rounded-full flex items-center justify-center"
                            >
                                <CheckCircle className="w-12 h-12 text-green-600" />
                            </motion.div>

                            {/* Success Message */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className={`text-[#911b1e] text-4xl md:text-5xl mb-6 ${brunoAce.className}`}
                            >
                                REGISTRATION SUCCESSFUL!
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className={`text-[#911b1e]/80 text-lg mb-8 ${raleway.className}`}
                            >
                                Thank you for registering {childrenCount > 1 ? `${childrenCount} children` : 'your child'} for our Summer Tennis Camp! 
                                We're excited to have {childrenCount > 1 ? 'them' : 'them'} join us for an amazing tennis experience.
                            </motion.p>

                            {/* What's Next Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-[#911b1e]/10 mb-8"
                            >
                                <h2 className={`text-[#911b1e] text-2xl mb-6 ${brunoAce.className}`}>
                                    WHAT HAPPENS NEXT?
                                </h2>

                                <div className="grid md:grid-cols-2 gap-6 text-left">
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 bg-[#911b1e]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className={`text-[#911b1e] text-sm font-bold ${raleway.className}`}>1</span>
                                        </div>
                                        <div>
                                            <h3 className={`text-[#911b1e] font-semibold mb-2 ${raleway.className}`}>
                                                Confirmation Email
                                            </h3>
                                            <p className={`text-[#911b1e]/70 text-sm ${raleway.className}`}>
                                                You'll receive a confirmation email within 24 hours with all the camp details.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 bg-[#911b1e]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className={`text-[#911b1e] text-sm font-bold ${raleway.className}`}>2</span>
                                        </div>
                                        <div>
                                            <h3 className={`text-[#911b1e] font-semibold mb-2 ${raleway.className}`}>
                                                Payment Instructions
                                            </h3>
                                            <p className={`text-[#911b1e]/70 text-sm ${raleway.className}`}>
                                                We'll send payment details and instructions to secure your child's spot.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 bg-[#911b1e]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className={`text-[#911b1e] text-sm font-bold ${raleway.className}`}>3</span>
                                        </div>
                                        <div>
                                            <h3 className={`text-[#911b1e] font-semibold mb-2 ${raleway.className}`}>
                                                Pre-Camp Information
                                            </h3>
                                            <p className={`text-[#911b1e]/70 text-sm ${raleway.className}`}>
                                                A week before camp, you'll receive a detailed information packet.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 bg-[#911b1e]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                            <span className={`text-[#911b1e] text-sm font-bold ${raleway.className}`}>4</span>
                                        </div>
                                        <div>
                                            <h3 className={`text-[#911b1e] font-semibold mb-2 ${raleway.className}`}>
                                                Camp Begins!
                                            </h3>
                                            <p className={`text-[#911b1e]/70 text-sm ${raleway.className}`}>
                                                Your child's tennis adventure starts on August 4th, 2025.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Camp Details Reminder */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="bg-[#911b1e]/5 rounded-2xl p-6 mb-8"
                            >
                                <h3 className={`text-[#911b1e] text-xl mb-4 ${brunoAce.className}`}>
                                    CAMP DETAILS REMINDER
                                </h3>
                                
                                <div className="grid md:grid-cols-2 gap-4 text-left">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="w-5 h-5 text-[#911b1e]" />
                                        <span className={`text-[#911b1e]/80 ${raleway.className}`}>
                                            August 4-23, 2025
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-[#911b1e]" />
                                        <span className={`text-[#911b1e]/80 ${raleway.className}`}>
                                            9:00 AM - 3:00 PM
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-5 h-5 text-[#911b1e]" />
                                        <span className={`text-[#911b1e]/80 ${raleway.className}`}>
                                            LKJ Tennis Club
                                        </span>
                                    </div>
                                   
                                </div>
                            </motion.div>

                            {/* Contact Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="bg-white/50 rounded-2xl p-6 mb-8"
                            >
                                <h3 className={`text-[#911b1e] text-xl mb-4 ${brunoAce.className}`}>
                                    QUESTIONS? CONTACT US
                                </h3>
                                
                                <div className="flex flex-col md:flex-row justify-center gap-6">
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-[#911b1e]" />
                                        <span className={`text-[#911b1e]/80 ${raleway.className}`}>
                                            +234 xxx xxx xxxx
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-5 h-5 text-[#911b1e]" />
                                        <span className={`text-[#911b1e]/80 ${raleway.className}`}>
                                            info@lkjtennisclub.com
                                        </span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Action Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center"
                            >
                                <Link
                                    href="/"
                                    className={`px-8 py-3 bg-[#911b1e] text-[#fcf7dc] rounded-lg 
                                             hover:bg-[#911b1e]/90 transition-colors duration-300
                                             text-center ${raleway.className}`}
                                >
                                    Return to Home
                                </Link>
                                
                                <Link
                                    href="/events"
                                    className={`px-8 py-3 border-2 border-[#911b1e] text-[#911b1e] rounded-lg 
                                             hover:bg-[#911b1e] hover:text-[#fcf7dc] transition-colors duration-300
                                             text-center ${raleway.className}`}
                                >
                                    View Other Events
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default RegistrationConfirmation;