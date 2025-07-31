'use client';

import { Bruno_Ace_SC, Raleway } from 'next/font/google';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const brunoAce = Bruno_Ace_SC({
    weight: '400',
    subsets: ['latin'],
});

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400'],
});

const facilities = [
    {
        title: "Professional Tennis Court",
        description: "Our pride and joy - meticulously maintained court that have witnessed countless matches, victories, and friendships formed."
    },
    {
        title: "Evening Play Under the Stars",
        description: "State-of-the-art lighting that turns evening sessions into magical moments, extending the joy of tennis beyond daylight hours."
    },
    {
        title: "Courtside Community Space",
        description: "Comfortable viewing areas where friends and family gather, cheer, and share in the excitement of every game."
    },
    {
        title: "Practice Paradise",
        description: "Dedicated practice areas where beginners find their footing and seasoned players perfect their craft."
    }
];

const AboutPage = () => {
    return (
        <>
            <Navbar />
            <main className="bg-[#fcf7dc]">
                {/* Hero Section */}
                <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src="/about_us.jpg"
                            alt="Tennis Club"
                            fill
                            className="object-cover filter brightness-[0.85]"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />
                    </div>
                    <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl mx-auto"
                        >
                            <h1 className={`text-[#fcf7dc] text-4xl md:text-6xl mb-6 tracking-wider ${brunoAce.className}`}>
                                ABOUT US
                            </h1>
                            <p className={`text-[#fcf7dc]/80 text-lg md:text-xl max-w-2xl mx-auto ${raleway.className}`}>
                                A Club Built on Passion and Community
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-24 px-4 md:px-6">
                    <div className="container mx-auto max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-16"
                        >
                            <div className="space-y-8">
                                <h2 className={`text-[#911b1e] text-3xl md:text-4xl tracking-wider ${brunoAce.className}`}>
                                    Our Story
                                </h2>
                                <h3 className={`text-[#911b1e]/90 text-2xl md:text-3xl ${brunoAce.className}`}>
                                    How It All Began…
                                </h3>
                                <div className={`space-y-6 text-[#911b1e]/70 text-lg leading-relaxed ${raleway.className}`}>
                                    <p>
                                        It started with a shared love for tennis and a dream to build a space where everyone—regardless of background, age or skill level—could come together to enjoy the sport. What began as a small group of passionate players has grown into a thriving club that welcomes members from all walks of life.
                                    </p>
                                    <p>
                                        From casual weekend games to structured training sessions, our journey has been one of continuous growth, fueled by the commitment of our members and the love of the game. As we look to the future, our goal remains the same: to build a strong tennis culture, nurture talent, and create a lasting impact in our community.
                                    </p>
                                </div>
                            </div>

                            {/* Image Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg"
                                >
                                    <Image
                                        src="/about_us2.jpg"
                                        alt="Tennis Club Facilities"
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg"
                                >
                                    <Image
                                        src="/about_us3.jpg"
                                        alt="Tennis Club Community"
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                            </div>

                            {/* Facilities Section */}
                            <div className="space-y-8">
                                <h3 className={`text-[#911b1e] text-2xl md:text-3xl tracking-wider ${brunoAce.className}`}>
                                    Our Court
                                </h3>
                                <div className="grid md:grid-cols-2 gap-12">
                                    <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
                                        <video
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="absolute inset-0 w-full h-full object-cover"
                                        >
                                            <source src="/hero.mp4" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                    </div>
                                    <div className={`space-y-8 ${raleway.className}`}>
                                        <p className="text-[#911b1e]/80 text-lg leading-relaxed">
                                            As our community grew, so did our vision for creating the perfect tennis environment. Today, our facilities stand as a testament to that dream, offering not just court, but spaces where tennis becomes a way of life.
                                        </p>
                                        <div className="space-y-6">
                                            {facilities.map((facility, index) => (
                                                <motion.div
                                                    key={facility.title}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="space-y-2"
                                                >
                                                    <h4 className="text-[#911b1e] font-medium flex items-center space-x-3">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#911b1e]/40" />
                                                        <span>{facility.title}</span>
                                                    </h4>
                                                    <p className="text-[#911b1e]/70 pl-4">
                                                        {facility.description}
                                                    </p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default AboutPage; 