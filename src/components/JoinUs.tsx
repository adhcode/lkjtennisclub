'use client';

import { Bruno_Ace_SC, Raleway } from 'next/font/google';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, Users, Calendar, UserCheck, MapPin, Phone, Mail } from 'lucide-react';

const brunoAce = Bruno_Ace_SC({
    weight: '400',
    subsets: ['latin'],
});

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['300', '400', '500'],
});

const clubFeatures = [
    {
        icon: Users,
        title: "A Community That Knows Your Name",
        description: "Not a crowd, but a circle of neighbors, mentors, friends. People who make the club feel like a second home."
    },
    {
        icon: Heart,
        title: "Courts That Invite You In",
        description: "Thoughtfully maintained, never overcrowded. Always ready for a match, a lesson, or a quiet morning rally."
    },
    {
        icon: Calendar,
        title: "Events That Connect Us",
        description: "From weekend games to evening conversations, from friendly tournaments to thoughtful gatherings, our calendar is full of moments that bring us closer."
    },
    {
        icon: UserCheck,
        title: "Coaching That Respects Your Pace",
        description: "We work with players, not just skills. Whether you're beginning or refining, you'll be met with patience and encouragement."
    }
];

const JoinUs = () => {
    return (
        <section className="relative py-24 bg-[#911b1e] overflow-hidden">
            {/* Background Image with Overlay */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/DSC_1873.jpg"
                    alt="Tennis Club"
                    fill
                    className="object-cover filter brightness-[0.15] contrast-[1.1] saturate-[0.95]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#911b1e]/60 via-[#911b1e]/40 to-[#911b1e]/60" />
            </motion.div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center mb-16"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className={`text-[#fcf7dc] text-4xl md:text-5xl mb-4 tracking-wider ${brunoAce.className}`}
                    >
                        MEMBERSHIP AT LKJ TENNIS CLUB
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className={`text-[#fcf7dc]/90 text-xl mb-8 italic ${raleway.className}`}
                    >
                        Where Good People Gather
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className={`text-[#fcf7dc]/80 text-base leading-relaxed space-y-4 ${raleway.className}`}
                    >
                        <p>
                            There's a certain rhythm to life at LKJ. The sound of the ball, the pause between sets,
                            the quiet nods of recognition. It's not just about tennis — it's about the people you meet along the way.
                        </p>

                        <p>
                            LKJ Tennis Club was built on something deeper than sport. It was built on the idea that community
                            is earned through presence, that excellence takes time, and that the best kind of competition
                            is the one that brings people closer.
                        </p>

                        <p>
                            We welcome members who are not just looking for a place to play, but a place to belong —
                            people who show up with intention, who care about the atmosphere they help create,
                            and who believe that how we spend our leisure says something about who we are.
                        </p>
                    </motion.div>
                </motion.div>

                {/* What You'll Find Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto mb-16"
                >
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className={`text-[#fcf7dc] text-2xl md:text-3xl mb-12 text-center ${brunoAce.className}`}
                    >
                        HERE'S WHAT YOU'LL FIND
                    </motion.h3>

                    <div className="grid md:grid-cols-2 gap-8">
                        {clubFeatures.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="bg-[#fcf7dc]/5 backdrop-blur-sm rounded-xl p-6 border border-[#fcf7dc]/10 
                                              hover:bg-[#fcf7dc]/10 hover:border-[#fcf7dc]/20 transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                            className="w-12 h-12 bg-[#fcf7dc]/10 rounded-full flex items-center justify-center 
                                                     border border-[#fcf7dc]/20 group-hover:bg-[#fcf7dc]/20 
                                                     group-hover:border-[#fcf7dc]/40 transition-all duration-300 flex-shrink-0"
                                        >
                                            <feature.icon className="w-6 h-6 text-[#fcf7dc]" />
                                        </motion.div>
                                        <div>
                                            <h4 className={`text-[#fcf7dc] text-lg mb-3 ${brunoAce.className}`}>
                                                {feature.title}
                                            </h4>
                                            <p className={`text-[#fcf7dc]/70 leading-relaxed ${raleway.className}`}>
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Call to Action Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <div className="bg-[#fcf7dc]/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 
                                  border border-[#fcf7dc]/10 shadow-2xl">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`text-[#fcf7dc]/80 text-lg mb-8 leading-relaxed ${raleway.className}`}
                        >
                            Membership is selective, not exclusive.
                            We welcome those who resonate with who we are thoughtful individuals looking for more than just a place to play.
                        </motion.p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link
                                    href="/membership"
                                    className={`inline-flex items-center gap-2 bg-[#fcf7dc] text-[#911b1e] 
                                              px-8 py-4 rounded-lg font-medium text-base
                                              hover:bg-[#fcf7dc]/90 transition-all duration-300 
                                              shadow-lg hover:shadow-xl ${raleway.className}`}
                                >
                                    Enquire About Membership
                                    <Heart className="w-4 h-4" />
                                </Link>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <button
                                    className={`inline-flex items-center gap-2 bg-transparent border-2 border-[#fcf7dc] 
                                              text-[#fcf7dc] px-8 py-4 rounded-lg font-medium text-base
                                              hover:bg-[#fcf7dc] hover:text-[#911b1e] transition-all duration-300 ${raleway.className}`}
                                >
                                    Visit the Club
                                    <MapPin className="w-4 h-4" />
                                </button>
                            </motion.div>
                        </div>

                        {/* Contact Information */}
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-[#fcf7dc]/70">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span className={`text-sm ${raleway.className}`}>LKJ Gardens, Igando</span>
                            </div>
                            <div className="hidden sm:block w-1 h-1 bg-[#fcf7dc]/40 rounded-full"></div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <span className={`text-sm ${raleway.className}`}>+234 806 123 0727</span>
                            </div>
                            <div className="hidden sm:block w-1 h-1 bg-[#fcf7dc]/40 rounded-full"></div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                <span className={`text-sm ${raleway.className}`}>membership@lkjtennis.com</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Decorative Bottom Element */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-center mt-12"
                >
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="w-16 h-[1px] bg-[#fcf7dc]/30"
                    />
                    <Heart className="w-6 h-6 text-[#fcf7dc]/40 mx-4" />
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="w-16 h-[1px] bg-[#fcf7dc]/30"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default JoinUs;