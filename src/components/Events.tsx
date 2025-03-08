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
        <section className="relative py-24 bg-[#fcf7dc] overflow-hidden">
            {/* Background decorative elements */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 0.05, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#911b1e] rounded-full translate-x-1/3 -translate-y-1/3"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 0.05, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#911b1e] rounded-full -translate-x-1/3 translate-y-1/3"
            />

            <div className="container mx-auto px-4 md:px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className={`inline-block px-4 py-1 bg-[#911b1e]/10 text-[#911b1e] 
                                  rounded-full text-sm mb-4 ${raleway.className}`}
                    >
                        Club Events
                    </motion.span>
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
                            className="mb-16 group"
                        >
                            <div className="grid md:grid-cols-2 gap-8 items-center bg-[#911b1e] rounded-lg overflow-hidden
                                          shadow-lg shadow-[#911b1e]/10 hover:shadow-xl hover:shadow-[#911b1e]/20
                                          transition-all duration-500">
                                <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.6 }}
                                        className="relative h-full"
                                    >
                                        <Image
                                            src={event.image}
                                            alt={event.title}
                                            fill
                                            className="object-cover filter brightness-[0.85] contrast-[1.1] saturate-[0.95]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
                                    </motion.div>
                                </div>

                                <div className="p-8 md:p-12">
                                    <motion.span
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className={`inline-block px-4 py-2 bg-[#fcf7dc] text-[#911b1e] 
                                                  text-xs uppercase tracking-wider mb-6 ${raleway.className}`}
                                    >
                                        Featured Event
                                    </motion.span>

                                    <motion.h3
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className={`text-[#fcf7dc] text-2xl md:text-3xl mb-4 ${brunoAce.className}`}
                                    >
                                        {event.title}
                                    </motion.h3>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 0.6 }}
                                        viewport={{ once: true }}
                                        className={`text-[#fcf7dc] text-sm mb-6 ${raleway.className}`}
                                    >
                                        {event.date}
                                    </motion.p>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 0.8 }}
                                        viewport={{ once: true }}
                                        className={`text-[#fcf7dc] text-sm md:text-base leading-relaxed mb-8 ${raleway.className}`}
                                    >
                                        {event.description}
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                    >
                                        <Link
                                            href="/events"
                                            className={`inline-block relative overflow-hidden bg-transparent 
                                                      border border-[#fcf7dc] text-[#fcf7dc] 
                                                      px-8 py-3 text-sm ${raleway.className} group`}
                                        >
                                            <span className="relative z-10 group-hover:text-[#911b1e] transition-colors duration-300">
                                                Learn More
                                            </span>
                                            <motion.div
                                                initial={{ x: "-100%" }}
                                                whileHover={{ x: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="absolute inset-0 bg-[#fcf7dc]"
                                            />
                                        </Link>
                                    </motion.div>
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
                                className="group bg-white/50 backdrop-blur-sm rounded-lg overflow-hidden 
                                         border border-[#911b1e]/10 hover:border-[#911b1e]/30
                                         shadow-md shadow-[#911b1e]/5 hover:shadow-lg hover:shadow-[#911b1e]/10
                                         transition-all duration-500"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.6 }}
                                        className="relative h-full"
                                    >
                                        <Image
                                            src={event.image}
                                            alt={event.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                            className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                                        />
                                    </motion.div>
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
                                        className={`inline-flex items-center text-[#911b1e] text-sm 
                                                  group-hover:text-[#911b1e]/80 transition-colors ${raleway.className}`}
                                    >
                                        <span>View Details</span>
                                        <motion.span
                                            initial={{ x: 0 }}
                                            whileHover={{ x: 5 }}
                                            transition={{ duration: 0.3 }}
                                            className="ml-2"
                                        >
                                            →
                                        </motion.span>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <Link
                            href="/events"
                            className={`inline-block relative overflow-hidden bg-[#911b1e] text-[#fcf7dc] 
                                      px-8 py-3 rounded-lg text-sm ${raleway.className} group
                                      hover:shadow-lg hover:shadow-[#911b1e]/20 transition-all duration-300`}
                        >
                            <span className="relative z-10">View All Events</span>
                            <motion.div
                                initial={{ scale: 0 }}
                                whileHover={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-[#911b1e]/80 rounded-lg"
                            />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Events; 