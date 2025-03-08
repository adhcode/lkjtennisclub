'use client';

import { Bruno_Ace_SC, Raleway } from 'next/font/google';
import Image from 'next/image';
import { motion } from 'framer-motion';

const brunoAce = Bruno_Ace_SC({
    weight: '400',
    subsets: ['latin'],
});

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400'],
});

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
                <div className="absolute inset-0 bg-gradient-to-b from-[#911b1e]/50 via-transparent to-[#911b1e]/50" />
            </motion.div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className={`text-[#fcf7dc] text-3xl md:text-4xl mb-6 tracking-wider font-medium ${brunoAce.className}`}>
                            JOIN OUR CLUB
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <p className={`text-[#fcf7dc]/80 text-sm md:text-base ${raleway.className}`}>
                            Become a member of our vibrant tennis community. All new members are required to pay a one-time registration fee of ₦10,000.
                        </p>
                    </motion.div>
                </motion.div>

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
                            <motion.div
                                whileHover={{ y: -5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="bg-[#fcf7dc]/10 backdrop-blur-sm rounded-lg p-8 h-full 
                                          border border-[#fcf7dc]/20 hover:border-[#fcf7dc]/40 
                                          shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10
                                          transition-all duration-300"
                            >
                                <motion.h3
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    className={`text-[#fcf7dc] text-xl mb-2 ${brunoAce.className}`}
                                >
                                    {plan.name}
                                </motion.h3>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="flex items-baseline mb-6"
                                >
                                    <span className={`text-[#fcf7dc] text-3xl font-medium ${raleway.className}`}>
                                        {plan.price}
                                    </span>
                                    <span className={`text-[#fcf7dc]/60 text-sm ml-2 ${raleway.className}`}>
                                        {plan.period}
                                    </span>
                                </motion.div>
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 + (i * 0.1) }}
                                            className={`text-[#fcf7dc]/80 text-sm flex items-center group/item ${raleway.className}`}
                                        >
                                            <motion.svg
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ type: "spring", stiffness: 300, delay: 0.3 + (i * 0.1) }}
                                                className="w-4 h-4 mr-3 text-[#fcf7dc]/60 group-hover/item:text-[#fcf7dc] transition-colors"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </motion.svg>
                                            <span className="group-hover/item:text-[#fcf7dc] transition-colors">
                                                {feature}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <button
                                        className={`w-full relative overflow-hidden bg-transparent border border-[#fcf7dc] 
                                                  text-[#fcf7dc] px-6 py-3 text-sm ${raleway.className} group/btn`}
                                    >
                                        <span className="relative z-10 group-hover/btn:text-[#911b1e] transition-colors duration-300">
                                            Join Now
                                        </span>
                                        <motion.div
                                            initial={{ x: "-100%" }}
                                            whileHover={{ x: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="absolute inset-0 bg-[#fcf7dc]"
                                        />
                                    </button>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-16"
                >
                    <p className={`text-[#fcf7dc]/60 text-sm ${raleway.className}`}>
                        Have questions? Contact us at{' '}
                        <motion.span
                            whileHover={{ color: "#fcf7dc" }}
                            className="text-[#fcf7dc]/80 hover:underline cursor-pointer"
                        >
                            membership@lkjtennis.com
                        </motion.span>
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-4"
                >
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="w-12 h-[1px] bg-[#fcf7dc]/40 origin-right"
                    />
                    <span className={`text-[#fcf7dc]/40 text-sm ${raleway.className}`}>
                        Join Our Community
                    </span>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="w-12 h-[1px] bg-[#fcf7dc]/40 origin-left"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default JoinUs; 