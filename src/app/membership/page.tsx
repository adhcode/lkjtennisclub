'use client';

import { Bruno_Ace_SC, Raleway } from 'next/font/google';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Heart, Users, Calendar, UserCheck, MapPin, Phone, Mail } from 'lucide-react';

const brunoAce = Bruno_Ace_SC({
    weight: '400',
    subsets: ['latin'],
});

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['300', '400', '500'],
});

const clubValues = [
    {
        icon: Heart,
        title: "Community Over Competition",
        description: "We believe the best matches are the ones that bring people closer together, not further apart."
    },
    {
        icon: Users,
        title: "Presence Over Performance",
        description: "Excellence is earned through showing up consistently, not just winning games."
    },
    {
        icon: Calendar,
        title: "Moments That Matter",
        description: "From quiet morning rallies to evening conversations, every interaction has meaning."
    },
    {
        icon: UserCheck,
        title: "Intention Over Intensity",
        description: "We welcome those who care about the atmosphere they help create."
    }
];

const membershipJourney = [
    {
        step: "1",
        title: "Visit & Experience",
        description: "Come see our facilities, meet our community, and feel the atmosphere firsthand."
    },
    {
        step: "2",
        title: "Express Interest",
        description: "Share your story with us. Tell us what draws you to LKJ and what you hope to find here."
    },
    {
        step: "3",
        title: "Meet the Community",
        description: "Spend time with current members, join a casual game, attend one of our gatherings."
    },
    {
        step: "4",
        title: "Welcome Home",
        description: "When the fit feels right for everyone, we'll welcome you into the LKJ family."
    }
];

const faqs = [
    {
        question: "What makes LKJ different from other tennis clubs?",
        answer: "LKJ is built on community first, tennis second. We're a place where relationships matter as much as your backhand, where showing up consistently is valued over winning consistently."
    },
    {
        question: "Do I need to be an experienced player to join?",
        answer: "Not at all. We welcome players of every level, from those picking up a racket for the first time to seasoned competitors. What matters is your intention to be part of our community."
    },
    {
        question: "How does the membership process work?",
        answer: "Membership at LKJ is by invitation and mutual fit. We encourage you to visit, spend time with us, and see if our values align with yours. It's a personal decision for both sides."
    },
    {
        question: "What can I expect as a member?",
        answer: "You'll find thoughtfully maintained courts, never overcrowded. Events with soul. Coaching that respects your pace. Most importantly, a community that knows your name."
    },
    {
        question: "Are there membership fees?",
        answer: "Yes, though we prefer to discuss the details in person during your visit. We believe the value of membership is best understood through experience, not price lists."
    }
];

const MembershipPage = () => {
    return (
        <>
            <Navbar />
            <main className="bg-[#fcf7dc] pt-20">
                {/* Hero Section */}
                <section className="relative min-h-[80vh] flex items-center">
                    <Image
                        src="/DSC_1873.jpg"
                        alt="LKJ Tennis Club Community"
                        fill
                        className="object-cover filter brightness-[0.3] contrast-[1.1]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

                    <div className="relative container mx-auto px-4 md:px-6 py-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className={`text-[#fcf7dc] text-4xl md:text-6xl mb-6 tracking-wider ${brunoAce.className}`}
                            >
                                MEMBERSHIP AT LKJ
                            </motion.h1>
                            
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className={`text-[#fcf7dc]/90 text-xl mb-8 italic ${raleway.className}`}
                            >
                                Where Good People Gather
                            </motion.p>
                            
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className={`text-[#fcf7dc]/80 text-lg max-w-3xl mx-auto leading-relaxed ${raleway.className}`}
                            >
                                There's a certain rhythm to life at LKJ. The sound of the ball, the pause between sets, 
                                the quiet nods of recognition. It's not just about tennis — it's about the people you meet along the way.
                            </motion.p>
                        </motion.div>
                    </div>
                </section>

                {/* Our Values Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className={`text-[#911b1e] text-3xl md:text-4xl mb-6 tracking-wider ${brunoAce.className}`}>
                                WHAT WE BELIEVE
                            </h2>
                            <p className={`text-[#911b1e]/70 text-lg max-w-3xl mx-auto leading-relaxed ${raleway.className}`}>
                                LKJ Tennis Club was built on something deeper than sport. It was built on the idea that community 
                                is earned through presence, that excellence takes time, and that the best kind of competition 
                                is the one that brings people closer.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            {clubValues.map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group"
                                >
                                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-8 border border-[#911b1e]/10 
                                                  hover:bg-white/70 hover:border-[#911b1e]/20 transition-all duration-300">
                                        <div className="flex items-start gap-4">
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                                className="w-12 h-12 bg-[#911b1e]/10 rounded-full flex items-center justify-center 
                                                         border border-[#911b1e]/20 group-hover:bg-[#911b1e]/20 
                                                         group-hover:border-[#911b1e]/40 transition-all duration-300 flex-shrink-0"
                                            >
                                                <value.icon className="w-6 h-6 text-[#911b1e]" />
                                            </motion.div>
                                            <div>
                                                <h3 className={`text-[#911b1e] text-xl mb-3 ${brunoAce.className}`}>
                                                    {value.title}
                                                </h3>
                                                <p className={`text-[#911b1e]/70 leading-relaxed ${raleway.className}`}>
                                                    {value.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Membership Journey Section */}
                <section className="py-20 bg-white/30">
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className={`text-[#911b1e] text-3xl md:text-4xl mb-6 tracking-wider ${brunoAce.className}`}>
                                THE JOURNEY TO MEMBERSHIP
                            </h2>
                            <p className={`text-[#911b1e]/70 text-lg max-w-2xl mx-auto leading-relaxed ${raleway.className}`}>
                                Joining LKJ is a personal step. There's no rush, no pressure — only an open door 
                                and a warm welcome to those who align with the spirit we hold dear.
                            </p>
                        </motion.div>

                        <div className="max-w-4xl mx-auto">
                            {membershipJourney.map((step, index) => (
                                <motion.div
                                    key={step.step}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-6 mb-12 group"
                                >
                                    <div className="w-12 h-12 bg-[#911b1e] text-[#fcf7dc] rounded-full flex items-center justify-center 
                                                  flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                        <span className={`text-lg font-medium ${raleway.className}`}>{step.step}</span>
                                    </div>
                                    <div className="pt-2">
                                        <h3 className={`text-[#911b1e] text-xl mb-2 ${brunoAce.className}`}>
                                            {step.title}
                                        </h3>
                                        <p className={`text-[#911b1e]/70 leading-relaxed ${raleway.className}`}>
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 
                                          border border-[#911b1e]/10 shadow-lg">
                                <h2 className={`text-[#911b1e] text-2xl md:text-3xl mb-6 ${brunoAce.className}`}>
                                    READY TO BEGIN YOUR JOURNEY?
                                </h2>
                                
                                <p className={`text-[#911b1e]/80 text-lg mb-8 leading-relaxed ${raleway.className}`}>
                                    We invite you to visit us, experience our community firsthand, and see if LKJ feels like home to you. 
                                    Every great membership story begins with a simple conversation.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`inline-flex items-center gap-2 bg-[#911b1e] text-[#fcf7dc] 
                                                  px-8 py-4 rounded-lg font-medium text-base
                                                  hover:bg-[#911b1e]/90 transition-all duration-300 
                                                  shadow-lg hover:shadow-xl ${raleway.className}`}
                                    >
                                        Schedule a Visit
                                        <Heart className="w-4 h-4" />
                                    </motion.button>
                                    
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`inline-flex items-center gap-2 bg-transparent border-2 border-[#911b1e] 
                                                  text-[#911b1e] px-8 py-4 rounded-lg font-medium text-base
                                                  hover:bg-[#911b1e] hover:text-[#fcf7dc] transition-all duration-300 ${raleway.className}`}
                                    >
                                        Call Us
                                        <Phone className="w-4 h-4" />
                                    </motion.button>
                                </div>

                                {/* Contact Information */}
                                <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-[#911b1e]/70">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        <span className={`text-sm ${raleway.className}`}>LKJ Gardens, Igando</span>
                                    </div>
                                    <div className="hidden sm:block w-1 h-1 bg-[#911b1e]/40 rounded-full"></div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4" />
                                        <span className={`text-sm ${raleway.className}`}>+234 806 123 0727</span>
                                    </div>
                                    <div className="hidden sm:block w-1 h-1 bg-[#911b1e]/40 rounded-full"></div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        <span className={`text-sm ${raleway.className}`}>membership@lkjtennis.com</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* FAQs Section */}
                <section className="py-20 bg-white/30">
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className={`text-[#911b1e] text-3xl md:text-4xl mb-6 tracking-wider ${brunoAce.className}`}>
                                QUESTIONS & ANSWERS
                            </h2>
                        </motion.div>

                        <div className="max-w-4xl mx-auto space-y-8">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={faq.question}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-[#911b1e]/10 
                                             hover:bg-white/70 hover:border-[#911b1e]/20 transition-all duration-300"
                                >
                                    <h3 className={`text-[#911b1e] text-lg mb-3 ${brunoAce.className}`}>
                                        {faq.question}
                                    </h3>
                                    <p className={`text-[#911b1e]/70 leading-relaxed ${raleway.className}`}>
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default MembershipPage; 