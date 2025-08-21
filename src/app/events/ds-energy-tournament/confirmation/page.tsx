'use client';

import { Raleway } from 'next/font/google';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle, Trophy, Clock, MapPin, Phone, Mail, Calendar } from 'lucide-react';

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
});

const TournamentConfirmation = () => {
    // Get category from URL params
    const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const category = searchParams ? searchParams.get('category') || 'tournament' : 'tournament';

    const getCategoryName = (cat: string) => {
        switch (cat) {
            case 'men': return 'Men\'s Category';
            case 'women': return 'Women\'s Category';
            case 'kids': return 'Kids Category';
            default: return 'Tournament';
        }
    };

    const getCategoryIcon = (cat: string) => {
        switch (cat) {
            case 'men': return '';
            case 'women': return '';
            case 'kids': return '';
            default: return '';
        }
    };

    return (
        <>
            <Navbar />
            <main className="bg-[#fcf7dc] min-h-screen pt-20">
                <div className="container mx-auto px-4 md:px-6 py-12">
                    <div className="max-w-4xl mx-auto">
                        {/* Success Header */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6"
                            >
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </motion.div>

                            <h1 className="text-[#911b1e] text-4xl md:text-5xl mb-6 font-agrandir">
                                REGISTRATION SUCCESSFUL!
                            </h1>
                            <p className="text-[#911b1e] text-lg mb-8 max-w-3xl mx-auto font-raleway">
                                Congratulations! You've successfully registered for the DS Energy Tennis Tournament. We're excited to have you join us for this 3-weekend event!
                            </p>
                            <div className="flex flex-wrap justify-center gap-6 text-[#911b1e]">
                                <div className="flex items-center gap-2">
                                    <span className="font-raleway">September 6th - 20th, 2025</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-raleway">Weekends Only</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-raleway">LKJ Tennis Club</span>
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="inline-flex items-center gap-2 bg-[#911b1e]/10 rounded-full px-6 py-2 mt-4"
                            >
                                <span className="text-2xl">{getCategoryIcon(category)}</span>
                                <span className={`text-[#911b1e] font-medium ${raleway.className}`}>
                                    {getCategoryName(category)}
                                </span>
                            </motion.div>
                        </motion.div>

                        {/* Next Steps */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-[#911b1e]/10"
                        >
                            <h2 className="text-[#911b1e] text-2xl mb-6 font-agrandir">
                                WHAT HAPPENS NEXT?
                            </h2>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-[#911b1e]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className={`text-[#911b1e] text-xl font-bold ${raleway.className}`}>1</span>
                                    </div>
                                    <h3 className={`text-[#911b1e] text-lg mb-2 ${raleway.className} font-semibold`}>
                                        Confirmation Call
                                    </h3>
                                    <p className={`text-[#911b1e]/70 text-sm ${raleway.className}`}>
                                        We'll contact you within 24 hours to confirm your registration
                                    </p>
                                </div>

                                <div className="text-center">
                                    <div className="w-12 h-12 bg-[#911b1e]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className={`text-[#911b1e] text-xl font-bold ${raleway.className}`}>2</span>
                                    </div>
                                    <h3 className={`text-[#911b1e] text-lg mb-2 ${raleway.className} font-semibold`}>
                                        Tournament Details
                                    </h3>
                                    <p className={`text-[#911b1e]/70 text-sm ${raleway.className}`}>
                                        You'll receive the tournament date and schedule once confirmed
                                    </p>
                                </div>

                                <div className="text-center">
                                    <div className="w-12 h-12 bg-[#911b1e]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className={`text-[#911b1e] text-xl font-bold ${raleway.className}`}>3</span>
                                    </div>
                                    <h3 className={`text-[#911b1e] text-lg mb-2 ${raleway.className} font-semibold`}>
                                        Tournament Day
                                    </h3>
                                    <p className={`text-[#911b1e]/70 text-sm ${raleway.className}`}>
                                        Arrive ready to compete and enjoy the tournament!
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Tournament Details Reminder */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="bg-[#911b1e]/5 rounded-2xl p-6 mb-8"
                        >
                            <h3 className="text-[#911b1e] text-xl mb-4 font-agrandir">
                                TOURNAMENT DETAILS REMINDER
                            </h3>
                            <div className="space-y-3 text-[#911b1e]/80 font-raleway">
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-[#911b1e]" />
                                    <span><strong>Start Date:</strong> September 6, 2025</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Trophy className="w-5 h-5 text-[#911b1e]" />
                                    <span><strong>Final Date:</strong> September 20, 2025</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-[#911b1e]" />
                                    <span><strong>Format:</strong> 3 Weekends</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-[#911b1e]" />
                                    <span><strong>Location:</strong> LKJ Tennis Club</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-[#911b1e]/10"
                        >
                            <h3 className="text-[#911b1e] text-xl mb-6 text-center font-agrandir">
                                NEED HELP? CONTACT US
                            </h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#911b1e]/10 rounded-full flex items-center justify-center">
                                        <Phone className="w-6 h-6 text-[#911b1e]" />
                                    </div>
                                    <div>
                                        <h4 className={`text-[#911b1e] font-medium ${raleway.className}`}>
                                            Phone
                                        </h4>
                                        <p className={`text-[#911b1e]/70 ${raleway.className}`}>
                                            +234 8061230727
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#911b1e]/10 rounded-full flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-[#911b1e]" />
                                    </div>
                                    <div>
                                        <h4 className={`text-[#911b1e] font-medium ${raleway.className}`}>
                                            Email
                                        </h4>
                                        <p className={`text-[#911b1e]/70 ${raleway.className}`}>
                                            hello@lkjtennisclub.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="text-center space-y-4"
                        >
                            <Link
                                href="/"
                                className={`inline-flex items-center gap-2 bg-[#911b1e] text-[#fcf7dc] px-8 py-3 rounded-lg
                                          hovr:bg-[#911b1e]/90 transition-colors ${raleway.className}`}
                            >
                                Return to Home
                            </Link>

                            <p className={`text-[#911b1e]/60 text-sm ${raleway.className}`}>
                                We look forward to seeing you at the tournament!
                            </p>
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default TournamentConfirmation; 