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
        title: "Alimosho Summer Tennis Clinic & Tournament",
        date: "August 4-23, 2025",
        description: "Join our comprehensive 2-week summer program featuring tennis clinic, tournament, plus self-defense, basketball, and badminton activities. Daily sessions at 9AM for ages 4-17 years.",
        image: "/summerprogram.jpg",
        status: "upcoming",
        link: "/events/summer-camp-registration",
        featured: true
    },
    {
        title: "Celebrating Prof. Tayo Ajayi's Inaugural Lecture",
        date: "July 29, 2025",
        description: "We proudly celebrated our esteemed club member, Professor Tayo Julius Ajayi, as he delivered his 109th inaugural lecture at Lagos State University. A proud moment for the LKJ Tennis Club family.",
        image: "/proftayo.JPG",
        status: "upcoming",
        link: "/events/prof-tayo-inaugural-lecture",
        featured: true
    },
    {
        title: "LKJ Tennis Club vs OTA Tennis Club",
        date: "Saturday, 8th January 2025",
        description: "Join us for an exciting friendly competition between LKJ Tennis Club and OTA Tennis Club. Come support our players and enjoy a day of great tennis!",
        image: "/hero2.jpg",
        status: "past"
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
        <section className="relative py-16 sm:py-20 md:py-24 bg-[#fcf7dc] overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className={`inline-block px-3 sm:px-4 py-1 bg-[#911b1e]/10 text-[#911b1e] 
                                  rounded-full text-xs sm:text-sm mb-3 sm:mb-4 ${raleway.className}`}
                    >
                        Club Events
                    </motion.span>
                    <h2 className={`text-[#911b1e] text-2xl sm:text-3xl md:text-4xl tracking-wider ${brunoAce.className}`}>
                        UPCOMING & PAST EVENTS
                    </h2>
                </motion.div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Featured Events */}
                    {events.filter(event => event.status === 'upcoming' && event.featured).map((event, index) => (
                        <motion.div
                            key={event.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="mb-8 sm:mb-16 group"
                        >
                            <div className="grid md:grid-cols-2 gap-4 sm:gap-8 items-center bg-[#911b1e] rounded-lg overflow-hidden
                                          shadow-lg shadow-[#911b1e]/10 hover:shadow-xl hover:shadow-[#911b1e]/20
                                          transition-all duration-500">
                                <div className="relative h-48 sm:h-64 md:h-full">
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-4 sm:p-6 md:p-8">
                                    <span className={`inline-block px-3 py-1 bg-[#fcf7dc] text-[#911b1e] 
                                                    rounded-full text-xs mb-3 ${raleway.className}`}>
                                        {event.title.includes("Prof. Tayo") ? "Club Pride" : "Featured Event"}
                                    </span>
                                    <h3 className={`text-[#fcf7dc] text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3 ${brunoAce.className}`}>
                                        {event.title}
                                    </h3>
                                    <p className={`text-[#fcf7dc]/80 text-sm sm:text-base mb-3 sm:mb-4 ${raleway.className}`}>
                                        {event.date}
                                    </p>
                                    <p className={`text-[#fcf7dc]/90 text-sm sm:text-base mb-6 sm:mb-8 ${raleway.className}`}>
                                        {event.description}
                                    </p>
                                    {event.link ? (
                                        <Link
                                            href={event.link}
                                            className={`inline-block bg-[#fcf7dc] text-[#911b1e] px-4 sm:px-6 py-2 sm:py-3 
                                                      text-sm sm:text-base transition-all duration-300 
                                                      hover:bg-[#fcf7dc]/90 ${raleway.className}`}
                                        >
                                            {event.title.includes("Prof. Tayo") ? "View Details" : "Register Now"}
                                        </Link>
                                    ) : (
                                        <button className={`bg-[#fcf7dc] text-[#911b1e] px-4 sm:px-6 py-2 sm:py-3 
                                                          text-sm sm:text-base transition-all duration-300 
                                                          hover:bg-[#fcf7dc]/90 ${raleway.className}`}>
                                            Learn More
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Other Events Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                        {events.filter(event => event.status === 'past' || (event.status === 'upcoming' && !event.featured)).map((event, index) => (
                            <motion.div
                                key={event.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
                            >
                                <div className="relative h-40 sm:h-48">
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="p-4 sm:p-6">
                                    <h3 className={`text-[#911b1e] text-lg sm:text-xl md:text-2xl mb-2 ${brunoAce.className}`}>
                                        {event.title}
                                    </h3>
                                    <p className={`text-[#911b1e]/70 text-xs sm:text-sm mb-2 ${raleway.className}`}>
                                        {event.date}
                                    </p>
                                    <p className={`text-[#911b1e]/80 text-sm line-clamp-2 ${raleway.className}`}>
                                        {event.description}
                                    </p>
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