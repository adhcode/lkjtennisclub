'use client';

import { Raleway } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TournamentRegistrationForm from '@/components/TournamentRegistrationForm';
import { Calendar, MapPin, Clock, Users, Trophy, Star } from 'lucide-react';

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
});

const DSEnergyTournament = () => {
    return (
        <>
            <Navbar />
            <main className="bg-[#fcf7dc]">
                {/* Hero Section */}
                <section className="pt-20 pb-12 bg-[#fcf7dc]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center max-w-4xl mx-auto">
                            <div className="inline-flex items-center gap-2 bg-[#911b1e]/10 rounded-full px-4 py-2 mb-6">

                                <span className={`text-[#911b1e] text-sm ${raleway.className}`}>
                                    Sponsored by DS Energy
                                </span>
                            </div>

                            <h1 className="text-[#911b1e] text-4xl md:text-5xl mb-6 font-agrandir">
                                DS ENERGY TENNIS TOURNAMENT
                            </h1>



                        </div>
                    </div>
                </section>

                {/* Tournament Details */}
                <section className="py-12">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-8">
                            <h2 className="text-[#911b1e] text-2xl mb-4 font-agrandir">
                                Tournament Information
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-[#911b1e]/10">
                                    <h3 className="text-[#911b1e] text-xl mb-4 font-agrandir">Event Details</h3>
                                    <ul className="space-y-3 text-[#911b1e]/80 font-raleway">
                                        <li className="flex items-center gap-3">
                                            <Calendar className="w-5 h-5 text-[#911b1e]" />
                                            <span><strong>Start Date:</strong> September 6, 2025</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Trophy className="w-5 h-5 text-[#911b1e]" />
                                            <span><strong>Final Date:</strong> September 20, 2025</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Clock className="w-5 h-5 text-[#911b1e]" />
                                            <span><strong>Format:</strong> 3 Weekends</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <MapPin className="w-5 h-5 text-[#911b1e]" />
                                            <span><strong>Location:</strong> LKJ Tennis Club</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-[#911b1e]/10">
                                    <h3 className="text-[#911b1e] text-xl mb-4 font-agrandir">Categories & Spots</h3>
                                    <ul className="space-y-3 text-[#911b1e]/80 font-raleway">
                                        <li className="flex items-center gap-3">
                                            <Users className="w-5 h-5 text-[#911b1e]" />
                                            <span><strong>Men:</strong> 16 spots available</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Users className="w-5 h-5 text-[#911b1e]" />
                                            <span><strong>Women:</strong> 2 spots available</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Users className="w-5 h-5 text-[#911b1e]" />
                                            <span><strong>Kids:</strong> 6 spots available</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <Star className="w-5 h-5 text-[#911b1e]" />
                                            <span><strong>Total:</strong> 24 participants</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Categories */}

                    </div>
                </section>

                {/* Sponsor Section */}


                {/* Registration Form Section */}
                <section className="py-12 bg-white/30">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-8">
                            <h2 className="text-[#911b1e] text-2xl mb-4 font-agrandir">
                                Register for Tournament
                            </h2>
                            <p className={`text-[#911b1e]/70 max-w-lg mx-auto ${raleway.className}`}>
                                Limited spaces available. Register now to secure your spot.
                            </p>
                        </div>

                        <div className="max-w-3xl mx-auto">
                            <TournamentRegistrationForm />
                        </div>
                    </div>
                </section>

                {/* Important Notes */}

            </main>
            <Footer />
        </>
    );
};

export default DSEnergyTournament; 