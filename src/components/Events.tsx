'use client';

import { Bruno_Ace_SC, Raleway } from 'next/font/google';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

const brunoAce = Bruno_Ace_SC({
    weight: '400',
    subsets: ['latin'],
});

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400'],
});

const events = [
    {
        title: "LKJ Tennis Club vs OTA Tennis Club",
        date: "Saturday, 8th January 2025",
        description: "Join us for an exciting friendly competition between LKJ Tennis Club and OTA Tennis Club. Come support our players and enjoy a day of great tennis!",
        image: "/hero2.jpg",
        status: "upcoming"
    },
    {
        title: "Professional Tennis Workshop",
        date: "January 2025",
        description: "An insightful session with current Lagos state and Southwest champion, Abayomi Philips who shared valuable tips and techniques to improve our game.",
        image: "/events/pro-workshop.jpg",
        status: "past"
    },
    {
        title: "New Court Launch Celebration",
        date: "December 2024",
        description: "The grand opening of our newly constructed tennis court, marking a significant milestone for our club.",
        image: "/events/court-launch.jpg",
        status: "past"
    },
    {
        title: "Health & Wellness Event",
        date: "September 2024",
        description: "A comprehensive health awareness event focusing on fitness and well-being for tennis players.",
        image: "/events/health-event.jpg",
        status: "past"
    },
    {
        title: "Junior Tennis Clinic & Competition",
        date: "March 2024",
        description: "Special tennis clinic and competition organized for young tennis enthusiasts, nurturing the next generation of players.",
        image: "/events/junior-clinic.jpg",
        status: "past"
    }
];

const Events = () => {
    return (
        <section className="relative py-24 bg-[#fcf7dc]">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className={`inline-block px-4 py-1 bg-[#911b1e]/10 text-[#911b1e] 
                                    rounded-full text-sm mb-4 ${raleway.className}`}>
                        Club Events
                    </span>
                    <h2 className={`text-[#911b1e] text-3xl md:text-4xl tracking-wider ${brunoAce.className}`}>
                        UPCOMING & PAST EVENTS
                    </h2>
                </motion.div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Featured Upcoming Event */}
                    {events.filter(event => event.status === 'upcoming').map((event) => (
                        <motion.div
                            key={event.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-16"
                        >
                            <div className="grid md:grid-cols-2 gap-8 items-center bg-[#911b1e] rounded-lg overflow-hidden">
                                <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover filter brightness-[0.85] contrast-[1.1] saturate-[0.95]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
                                </div>

                                <div className="p-8 md:p-12">
                                    <span className={`inline-block px-4 py-2 bg-[#fcf7dc] text-[#911b1e] 
                                                    text-xs uppercase tracking-wider mb-6 ${raleway.className}`}>
                                        Featured Event
                                    </span>

                                    <h3 className={`text-[#fcf7dc] text-2xl md:text-3xl mb-4 ${brunoAce.className}`}>
                                        {event.title}
                                    </h3>

                                    <p className={`text-[#fcf7dc]/60 text-sm mb-6 ${raleway.className}`}>
                                        {event.date}
                                    </p>

                                    <p className={`text-[#fcf7dc]/80 text-sm md:text-base leading-relaxed mb-8 ${raleway.className}`}>
                                        {event.description}
                                    </p>

                                    <Link
                                        href="/events"
                                        className={`inline-block bg-transparent border border-[#fcf7dc] text-[#fcf7dc] 
                                                  px-8 py-3 text-sm transition-colors duration-300
                                                  hover:bg-[#fcf7dc] hover:text-[#911b1e] ${raleway.className}`}
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Past Events Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {events.filter(event => event.status === 'past').slice(0, 2).map((event, index) => (
                            <motion.div
                                key={event.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-white/50 backdrop-blur-sm rounded-lg overflow-hidden 
                                         border border-[#911b1e]/10 hover:border-[#911b1e]/30
                                         transition-all duration-300"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover transition-transform duration-500 
                                                 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6">
                                    <p className={`text-[#911b1e]/60 text-sm mb-2 ${raleway.className}`}>
                                        {event.date}
                                    </p>
                                    <h3 className={`text-[#911b1e] text-xl mb-3 ${brunoAce.className}`}>
                                        {event.title}
                                    </h3>
                                    <p className={`text-[#911b1e]/70 text-sm mb-4 line-clamp-2 ${raleway.className}`}>
                                        {event.description}
                                    </p>
                                    <Link
                                        href="/events"
                                        className={`text-[#911b1e] text-sm hover:text-[#911b1e]/80 
                                                  transition-colors ${raleway.className}`}
                                    >
                                        View Details →
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="/events"
                            className={`inline-block bg-[#911b1e] text-[#fcf7dc] px-8 py-3 
                                      rounded-lg text-sm transition-colors duration-300
                                      hover:bg-[#911b1e]/90 ${raleway.className}`}
                        >
                            View All Events
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Events; 