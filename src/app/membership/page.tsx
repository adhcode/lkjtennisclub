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
        description: "Access to our well-maintained professional-grade tennis courts"
    },
    {
        title: "Expert Coaching",
        description: "Learn from experienced coaches with personalized training programs"
    },
    {
        title: "Regular Events",
        description: "Participate in tournaments, social events, and club activities"
    },
    {
        title: "Community",
        description: "Join a vibrant community of tennis enthusiasts and make lasting connections"
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
        answer: "Yes, you can bring guests. The guest fee is ₦1,000 per hour."
    }
];

const MembershipPage = () => {
    return (
        <>
            <Navbar />
            <main className="bg-[#fcf7dc]">
                {/* Hero Section */}
                <section className="relative h-[70vh] min-h-[500px]">
                    <Image
                        src="/DSC_1873.jpg"
                        alt="Tennis Club Membership"
                        fill
                        className="object-cover filter brightness-[0.85]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
                    <div className="relative h-full flex flex-col justify-start text-left px-4 pt-40 md:px-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h1 className="font-bruno text-[#fcf7dc] text-4xl md:text-6xl mb-6 tracking-wider">
                                JOIN OUR CLUB
                            </h1>
                            <p className="font-raleway text-[#fcf7dc]/90 text-sm md:text-base font-light tracking-wider max-w-md">
                                Become a member of our vibrant tennis community at LKJ Gardens Igando.
                                All new members are required to pay a one-time registration fee of ₦10,000.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Membership Plans Section */}
                <section className="py-24 px-4">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-20"
                        >
                            <span className="font-raleway text-[#911b1e]/60 text-sm tracking-wider uppercase">
                                Choose Your Plan
                            </span>
                            <h2 className="font-bruno text-[#911b1e] text-4xl mt-2">
                                MEMBERSHIP PLANS
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-12">
                            {membershipPlans.map((plan, index) => (
                                <motion.div
                                    key={plan.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                >
                                    <div className="border-b border-[#911b1e]/20 pb-8">
                                        <h3 className="font-bruno text-[#911b1e] text-2xl mb-4">
                                            {plan.name}
                                        </h3>
                                        <div className="flex items-baseline mb-8">
                                            <span className="font-bruno text-[#911b1e] text-3xl">
                                                {plan.price}
                                            </span>
                                            <span className="font-raleway text-[#911b1e]/60 text-sm ml-2">
                                                {plan.period}
                                            </span>
                                        </div>
                                        <ul className="space-y-4 mb-8">
                                            {plan.features.map((feature, i) => (
                                                <li key={i} className="font-raleway text-[#911b1e]/80 text-sm flex items-center">
                                                    <span className="w-4 h-[1px] bg-[#911b1e]/40 mr-3" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <Link
                                            href="/join"
                                            className="inline-block bg-[#911b1e]/20 text-[#911b1e] px-8 py-4 
                                                     font-raleway border border-[#911b1e]
                                                     hover:bg-[#911b1e] hover:text-[#fcf7dc] 
                                                     transition-all duration-300 tracking-wider"
                                        >
                                            Join Now
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="text-center mt-20">
                            <p className="font-raleway text-[#911b1e]/60 text-sm tracking-wider">
                                Have questions? Contact us at{' '}
                                <a href="mailto:membership@lkjtennis.com"
                                    className="text-[#911b1e] hover:text-[#911b1e]/80 
                                            transition-colors duration-300 border-b 
                                            border-[#911b1e]/20 hover:border-[#911b1e]">
                                    membership@lkjtennis.com
                                </a>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-24 px-4">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-20"
                        >
                            <span className="font-raleway text-[#911b1e]/60 text-sm tracking-wider uppercase">
                                Why Join Us
                            </span>
                            <h2 className="font-bruno text-[#911b1e] text-4xl mt-2">
                                MEMBERSHIP BENEFITS
                            </h2>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={benefit.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="border-b border-[#911b1e]/20 pb-8"
                                >
                                    <h3 className="font-bruno text-[#911b1e] text-xl mb-3">
                                        {benefit.title}
                                    </h3>
                                    <p className="font-raleway text-[#911b1e]/70 text-sm leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQs Section */}
                <section className="py-24 px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-20"
                        >
                            <span className="font-raleway text-[#911b1e]/60 text-sm tracking-wider uppercase">
                                Got Questions?
                            </span>
                            <h2 className="font-bruno text-[#911b1e] text-4xl mt-2">
                                FREQUENTLY ASKED QUESTIONS
                            </h2>
                        </motion.div>

                        <div className="space-y-8">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={faq.question}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="border-b border-[#911b1e]/20 pb-8"
                                >
                                    <h3 className="font-bruno text-[#911b1e] text-lg mb-3">
                                        {faq.question}
                                    </h3>
                                    <p className="font-raleway text-[#911b1e]/70 leading-relaxed">
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