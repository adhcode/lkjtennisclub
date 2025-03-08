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
    },
    {
        name: "Estate Resident (Male)",
        price: "₦30,000",
        period: "per year",
    },
    {
        name: "Estate Resident (Female)",
        price: "₦20,000",
        period: "per year",
    }
];

const commonBenefits = [
    "Full access to club facilities",
    "Participation in club events",
    "Optional professional coaching",
    "₦10,000 one-time registration fee"
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

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const MembershipPage = () => {
    return (
        <>
            <Navbar />
            <main className="bg-[#fcf7dc]">
                {/* Hero Section */}
                <section className="relative h-screen">
                    <Image
                        src="/DSC_1873.jpg"
                        alt="Tennis Club Membership"
                        fill
                        className="object-cover filter brightness-[0.85]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />

                    <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeInUp}
                            transition={{ duration: 0.6 }}
                            className="max-w-3xl mx-auto"
                        >
                            <h1 className="font-bruno text-[#fcf7dc] text-5xl md:text-7xl mb-6 tracking-wider">
                                JOIN OUR CLUB
                            </h1>
                            <p className="font-raleway text-[#fcf7dc]/90 text-lg md:text-xl font-light tracking-wider max-w-2xl mx-auto">
                                Become part of our vibrant tennis community at LKJ Gardens Igando
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Membership Plans Section */}
                <section className="py-32 px-4">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="text-center mb-24"
                        >
                            <h2 className="font-bruno text-[#911b1e] text-4xl md:text-5xl tracking-wider">
                                MEMBERSHIP PLANS
                            </h2>
                        </motion.div>

                        {/* Common Benefits */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="mb-24 max-w-2xl mx-auto bg-white/20 backdrop-blur-sm p-12 rounded-sm"
                        >
                            <h3 className="font-bruno text-[#911b1e] text-2xl mb-8 text-center">
                                All Plans Include
                            </h3>
                            <div className="space-y-6">
                                {commonBenefits.map((benefit, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center space-x-4 group"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#911b1e]/40 group-hover:bg-[#911b1e] transition-colors" />
                                        <span className="font-raleway text-[#911b1e]/80 text-lg group-hover:text-[#911b1e] transition-colors">
                                            {benefit}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {membershipPlans.map((plan, index) => (
                                <motion.div
                                    key={plan.name}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeInUp}
                                    transition={{ delay: index * 0.2 }}
                                    className="group"
                                >
                                    <div className="bg-white/30 backdrop-blur-sm p-12 hover:bg-white/40 
                                                  transition-all duration-500 ease-out relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent 
                                                      via-transparent to-white/5 opacity-0 group-hover:opacity-100 
                                                      transition-opacity duration-500" />

                                        <h3 className="font-bruno text-[#911b1e] text-2xl mb-6 relative">
                                            {plan.name}
                                        </h3>
                                        <div className="flex items-baseline mb-8 relative">
                                            <span className="font-bruno text-[#911b1e] text-4xl">
                                                {plan.price}
                                            </span>
                                            <span className="font-raleway text-[#911b1e]/60 text-sm ml-2">
                                                {plan.period}
                                            </span>
                                        </div>
                                        <Link
                                            href="/join"
                                            className="inline-block bg-[#911b1e] text-[#fcf7dc] px-8 py-4 
                                                     font-raleway relative
                                                     hover:bg-[#911b1e]/90 
                                                     transition-all duration-300"
                                        >
                                            Join Now
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQs Section */}
                <section className="py-32 px-4 bg-white/30">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="text-center mb-24"
                        >
                            <h2 className="font-bruno text-[#911b1e] text-4xl md:text-5xl tracking-wider">
                                COMMON QUESTIONS
                            </h2>
                        </motion.div>

                        <div className="space-y-12">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={faq.question}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeInUp}
                                    transition={{ delay: index * 0.1 }}
                                    className="group"
                                >
                                    <h3 className="font-bruno text-[#911b1e] text-xl mb-3 
                                                 group-hover:text-[#911b1e]/90 transition-colors">
                                        {faq.question}
                                    </h3>
                                    <p className="font-raleway text-[#911b1e]/70 text-lg leading-relaxed 
                                                pl-6 border-l-2 border-[#911b1e]/20 
                                                group-hover:border-[#911b1e]/40 transition-colors">
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="text-center mt-24"
                        >
                            <p className="font-raleway text-[#911b1e]/60 text-lg">
                                Have more questions? Email us at{' '}
                                <a href="mailto:membership@lkjtennis.com"
                                    className="text-[#911b1e] hover:text-[#911b1e]/80 
                                             transition-colors border-b border-[#911b1e]/20 
                                             hover:border-[#911b1e]">
                                    membership@lkjtennis.com
                                </a>
                            </p>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default MembershipPage; 