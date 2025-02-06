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
        <section className="relative py-24 bg-[#911b1e]">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/DSC_1873.jpg"
                    alt="Tennis Club"
                    fill
                    className="object-cover filter brightness-[0.15] contrast-[1.1] saturate-[0.95]"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mb-16">
                    <h2 className={`text-[#fcf7dc] text-3xl md:text-4xl mb-6 tracking-wider font-medium ${brunoAce.className}`}>
                        JOIN OUR CLUB
                    </h2>
                    <p className={`text-[#fcf7dc]/80 text-sm md:text-base ${raleway.className}`}>
                        Become a member of our vibrant tennis community. All new members are required to pay a one-time registration fee of ₦10,000.
                    </p>
                </div>

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
                                <h3 className={`text-[#fcf7dc] text-xl mb-2 ${brunoAce.className}`}>
                                    {plan.name}
                                </h3>
                                <div className="flex items-baseline mb-6">
                                    <span className={`text-[#fcf7dc] text-3xl font-medium ${raleway.className}`}>
                                        {plan.price}
                                    </span>
                                    <span className={`text-[#fcf7dc]/60 text-sm ml-2 ${raleway.className}`}>
                                        {plan.period}
                                    </span>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className={`text-[#fcf7dc]/80 text-sm flex items-center ${raleway.className}`}>
                                            <svg className="w-4 h-4 mr-3 text-[#fcf7dc]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className={`w-full bg-transparent border border-[#fcf7dc] text-[#fcf7dc] 
                                              px-6 py-3 text-sm transition-colors duration-300
                                              hover:bg-[#fcf7dc] hover:text-[#911b1e] ${raleway.className}`}
                                >
                                    Join Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <p className={`text-[#fcf7dc]/60 text-sm ${raleway.className}`}>
                        Have questions? Contact us at <span className="text-[#fcf7dc]">membership@lkjtennis.com</span>
                    </p>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-4">
                    <div className="w-12 h-[1px] bg-[#fcf7dc]/40" />
                    <span className={`text-[#fcf7dc]/40 text-sm ${raleway.className}`}>Join Our Community</span>
                    <div className="w-12 h-[1px] bg-[#fcf7dc]/40" />
                </div>
            </div>
        </section>
    );
};

export default JoinUs; 