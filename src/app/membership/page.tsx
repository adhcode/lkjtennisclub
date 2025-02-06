'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const membershipPlans = [
    {
        name: "Female Members",
        price: "₦30,000",
        period: "per year",
        features: [
            "Full club access",
            "Access to all facilities",
            "Club events participation",
            "₦10,000 registration fee",
            "Professional coaching available"
        ]
    },
    {
        name: "Estate Resident (Male)",
        price: "₦30,000",
        period: "per year",
        features: [
            "Full club access",
            "Access to all facilities",
            "Club events participation",
            "₦10,000 registration fee",
            "Professional coaching available"
        ]
    },
    {
        name: "Estate Resident (Female)",
        price: "₦20,000",
        period: "per year",
        features: [
            "Full club access",
            "Access to all facilities",
            "Club events participation",
            "₦10,000 registration fee",
            "Professional coaching available"
        ]
    }
];

const benefits = [
    {
        title: "Professional Courts",
        description: "Access to our well-maintained professional-grade tennis courts",
        icon: "🎾"
    },
    {
        title: "Expert Coaching",
        description: "Learn from experienced coaches with personalized training programs",
        icon: "👨‍🏫"
    },
    {
        title: "Regular Events",
        description: "Participate in tournaments, social events, and club activities",
        icon: "🏆"
    },
    {
        title: "Community",
        description: "Join a vibrant community of tennis enthusiasts and make lasting connections",
        icon: "🤝"
    }
];

const faqs = [
    {
        question: "What are the club's operating hours?",
        answer: "The club is open from 6:00 AM to 9:00 PM on weekdays, and 7:00 AM to 8:00 PM on weekends."
    },
    {
        question: "How do I book a court?",
        answer: "Members can book courts through our online booking system or by contacting the club office."
    },
    {
        question: "Are there coaching programs available?",
        answer: "Yes, we offer individual and group coaching sessions for all skill levels."
    },
    {
        question: "Can I bring guests?",
        answer: "Yes, members can bring guests for a nominal fee. Premium members get free guest passes monthly."
    }
];

const MembershipPage = () => {
    return (
        <>
            <Navbar />
            <main className="bg-[#fcf7dc]">
                {/* Hero Section */}
                <section className="relative h-[50vh] min-h-[400px]">
                    <Image
                        src="/DSC_1873.jpg"
                        alt="Tennis Club Membership"
                        fill
                        className="object-cover filter brightness-[0.85] contrast-[1.1]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center"
                        >
                            <h1 className={`text-[#fcf7dc] text-4xl md:text-6xl mb-6 tracking-wider`}>
                                JOIN OUR CLUB
                            </h1>
                            <p className={`text-[#fcf7dc]/80 max-w-xl mx-auto`}>
                                Become a member of our vibrant tennis community at LKJ Gardens Igando.
                                All new members are required to pay a one-time registration fee of ₦10,000.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Membership Plans Section */}
                <section className="relative py-20 bg-[#911b1e]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {membershipPlans.map((plan, index) => (
                                <motion.div
                                    key={plan.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="group"
                                >
                                    <div className="bg-[#fcf7dc]/10 backdrop-blur-sm rounded-lg p-8 h-full 
                                                  border border-[#fcf7dc]/20 hover:border-[#fcf7dc]/40 
                                                  transition-all duration-300">
                                        <h3 className={`text-[#fcf7dc] text-xl mb-2`}>
                                            {plan.name}
                                        </h3>
                                        <div className="flex items-baseline mb-6">
                                            <span className={`text-[#fcf7dc] text-3xl font-medium`}>
                                                {plan.price}
                                            </span>
                                            <span className={`text-[#fcf7dc]/60 text-sm ml-2`}>
                                                {plan.period}
                                            </span>
                                        </div>
                                        <ul className="space-y-4 mb-8">
                                            {plan.features.map((feature, i) => (
                                                <li key={i} className={`text-[#fcf7dc]/80 text-sm flex items-center`}>
                                                    <svg className="w-4 h-4 mr-3 text-[#fcf7dc]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <Link
                                            href="/join"
                                            className={`block w-full bg-transparent border border-[#fcf7dc] text-[#fcf7dc] 
                                                      px-6 py-3 text-sm text-center transition-colors duration-300
                                                      hover:bg-[#fcf7dc] hover:text-[#911b1e]`}
                                        >
                                            Join Now
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="text-center mt-16">
                            <p className={`text-[#fcf7dc]/60 text-sm`}>
                                Have questions? Contact us at <span className="text-[#fcf7dc]">membership@lkjtennis.com</span>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Benefits Section - Modern Design */}
                <section className="relative py-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-6xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center mb-16"
                            >
                                <span className={`inline-block px-4 py-1 bg-[#911b1e]/10 text-[#911b1e] 
                                                rounded-full text-sm mb-4`}>
                                    Why Join Us
                                </span>
                                <h2 className={`text-[#911b1e] text-3xl md:text-4xl mb-6`}>
                                    MEMBERSHIP BENEFITS
                                </h2>
                            </motion.div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {benefits.map((benefit, index) => (
                                    <motion.div
                                        key={benefit.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group relative bg-white/50 backdrop-blur-sm rounded-2xl p-8 
                                                 border border-[#911b1e]/10 hover:border-[#911b1e]/30
                                                 transition-all duration-300"
                                    >
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r 
                                                      from-[#911b1e]/0 via-[#911b1e]/20 to-[#911b1e]/0
                                                      transform scale-x-0 group-hover:scale-x-100
                                                      transition-transform duration-500" />
                                        <div className="mb-6">
                                            <div className="inline-block p-3 bg-[#911b1e]/10 rounded-xl
                                                          text-3xl transform group-hover:-rotate-12
                                                          transition-transform duration-300">
                                                {benefit.icon}
                                            </div>
                                        </div>
                                        <h3 className={`text-[#911b1e] text-xl mb-3`}>
                                            {benefit.title}
                                        </h3>
                                        <p className={`text-[#911b1e]/70 text-sm leading-relaxed`}>
                                            {benefit.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQs Section - Modern Design */}
                <section className="relative py-20 bg-[#911b1e]/5">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-4xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center mb-16"
                            >
                                <span className={`inline-block px-4 py-1 bg-[#911b1e]/10 text-[#911b1e] 
                                                rounded-full text-sm mb-4`}>
                                    Got Questions?
                                </span>
                                <h2 className={`text-[#911b1e] text-3xl md:text-4xl mb-6`}>
                                    FREQUENTLY ASKED QUESTIONS
                                </h2>
                            </motion.div>

                            <div className="grid gap-6">
                                {faqs.map((faq, index) => (
                                    <motion.div
                                        key={faq.question}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group bg-white/50 backdrop-blur-sm rounded-2xl p-8
                                                 border border-[#911b1e]/10 hover:border-[#911b1e]/30
                                                 transition-all duration-300"
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-8 h-8 rounded-full bg-[#911b1e]/10 flex items-center 
                                                              justify-center text-[#911b1e] font-medium">
                                                    Q
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className={`text-[#911b1e] text-lg mb-3`}>
                                                    {faq.question}
                                                </h3>
                                                <p className={`text-[#911b1e]/70 leading-relaxed`}>
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r 
                                                      from-[#911b1e]/0 via-[#911b1e]/20 to-[#911b1e]/0
                                                      transform scale-x-0 group-hover:scale-x-100
                                                      transition-transform duration-500" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default MembershipPage; 