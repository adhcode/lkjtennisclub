'use client';

import { Raleway } from 'next/font/google';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, MapPin, Clock, Users, ArrowRight, Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
});

const upcomingEvents = [
    {
        title: "DS Energy Tennis Tournament",
        type: "Tournament - Ongoing",
        date: "September 6-20, 2025",
        time: "Weekends Only",
        location: "LKJ Tennis Club",
        description: "The prestigious DS Energy Tennis Tournament is currently underway! This exciting 3-weekend event features three categories: Men, Women, and Kids. Follow the action and cheer on our participants as they compete for the championship!",
        image: "/DSC_1852.jpg",
        registrationLink: "/events/ds-energy-tournament",
        price: "Tournament in Progress",
        ageRange: "All Ages",
        spotlight: true,
        sponsor: "DS Energy",
        status: "ongoing"
    },
    {
        title: "LKJ Tennis Club vs OTA Tennis Club",
        type: "Friendly Competition",
        date: "Saturday",
        time: "8:00 AM",
        location: "LKJ Gardens Tennis Court, Igando",
        description: "Join us for an exciting friendly competition between LKJ Tennis Club and OTA Tennis Club. Come support our players and enjoy a day of great tennis!",
        image: "/hero2.jpg"
    }
];

const pastEvents = [
    {
        title: "Alimosho Summer Tennis Clinic & Tournament",
        date: "August 2025",
        description: "Our comprehensive 2-week summer program concluded successfully! The program featured tennis clinic, tournament, plus self-defense, basketball, and badminton activities. Thank you to all participants who made it a memorable experience.",
        image: "/summerprogram.jpg",
        highlight: "Successful completion with 50+ young participants",
        gallery: [
            "/summerprogram.jpg"
        ]
    },
    {
        title: "Celebrating Prof. Tayo Ajayi's 109th Inaugural Lecture",
        date: "July 2025",
        description: "We proudly celebrated our esteemed club member, Professor Tayo Julius Ajayi, as he delivered his inaugural lecture on 'Interlinguistic Interactions and Resultant Phenomena' at Lagos State University. The LKJ Tennis Club family was there to support and honor this remarkable achievement.",
        image: "/proftayo.JPG",
        highlight: "Proud moment for our club member and academic excellence",
        gallery: [
            "/proftayo.JPG",
            "/proftayo2.JPG"
        ]
    },
    {
        title: "Professional Tennis Workshop",
        date: "March 2024",
        description: "An insightful session with current Lagos state and Southwest players who shared valuable tips and techniques to improve our game.",
        image: "/events/pro-workshop.jpg",
        highlight: "Featured professional players from Lagos and Southwest",
        gallery: [
            "/events/pro-workshop/1.jpg",
            "/events/pro-workshop/2.jpg",
            "/events/pro-workshop/3.jpg",
            "/events/pro-workshop/4.jpg"
        ]
    },
    {
        title: "New Court Launch Celebration",
        date: "February 2024",
        description: "The grand opening of our newly constructed tennis court, marking a significant milestone for our club.",
        image: "/events/court-launch.jpg",
        highlight: "State-of-the-art facilities unveiled",
        gallery: [
            "/events/court-launch/1.jpg",
            "/events/court-launch/2.jpg",
            "/events/court-launch/3.jpg",
            "/events/court-launch/4.jpg"
        ]
    },
    {
        title: "Health & Wellness Event",
        date: "January 2024",
        description: "A comprehensive health awareness event focusing on fitness and well-being for tennis players.",
        image: "/events/health-event.jpg",
        highlight: "Expert health tips and fitness guidance",
        gallery: [
            "/events/health-event/1.jpg",
            "/events/health-event/2.jpg",
            "/events/health-event/3.jpg",
            "/events/health-event/4.jpg"
        ]
    },
    {
        title: "Junior Tennis Clinic & Competition",
        date: "December 2023",
        description: "Special tennis clinic and competition organized for young tennis enthusiasts, nurturing the next generation of players.",
        image: "/events/junior-clinic.jpg",
        highlight: "Inspiring young talents",
        gallery: [
            "/events/junior-clinic/1.jpg",
            "/events/junior-clinic/2.jpg",
            "/events/junior-clinic/3.jpg",
            "/events/junior-clinic/4.jpg"
        ]
    }
];

const EventsPage = () => {
    const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
    const [selectedImage, setSelectedImage] = useState<number>(0);

    const closeGallery = () => {
        setSelectedEvent(null);
        setSelectedImage(0);
    };

    const nextImage = () => {
        if (selectedEvent !== null) {
            setSelectedImage((prev) =>
                prev === pastEvents[selectedEvent].gallery.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = () => {
        if (selectedEvent !== null) {
            setSelectedImage((prev) =>
                prev === 0 ? pastEvents[selectedEvent].gallery.length - 1 : prev - 1
            );
        }
    };

    return (
        <>
            <Navbar />
            <main className="bg-[#fcf7dc]">
                {/* Upcoming Events Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-16"
                        >
                            <span className={`inline-block px-4 py-1 bg-[#911b1e]/10 text-[#911b1e] 
                                           rounded-full text-sm mb-4 ${raleway.className}`}>
                                Upcoming Events
                            </span>
                            <h1 className="text-[#911b1e] text-4xl md:text-6xl mb-6 font-agrandir">
                                JOIN OUR EVENTS
                            </h1>
                            <p className={`text-[#911b1e]/70 text-lg max-w-2xl mx-auto ${raleway.className}`}>
                                Don't miss out on our exciting upcoming events. From competitions to camps,
                                there's something for every tennis enthusiast.
                            </p>
                        </motion.div>

                        <div className="max-w-6xl mx-auto grid gap-8">
                            {upcomingEvents.map((event, index) => (
                                <motion.div
                                    key={event.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2 }}
                                    className="group relative bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden
                                             border border-[#911b1e]/10 hover:border-[#911b1e]/30
                                             transition-all duration-300 hover:shadow-xl"
                                >
                                    <div className="grid md:grid-cols-2 gap-0">
                                        <div className="relative h-64 md:h-80">
                                            <Image
                                                src={event.image}
                                                alt={event.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                            <div className="absolute top-4 left-4">
                                                <span className={`px-3 py-1 bg-[#fcf7dc] text-[#911b1e] 
                                                               rounded-full text-sm font-medium ${raleway.className}`}>
                                                    {event.type}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-8 flex flex-col justify-center">
                                            <h2 className={`text-[#911b1e] text-2xl md:text-3xl mb-4 font-agrandir`}>
                                                {event.title}
                                            </h2>
                                            <p className={`text-[#911b1e]/70 mb-6 ${raleway.className}`}>
                                                {event.description}
                                            </p>

                                            <div className="space-y-3 mb-6">
                                                <div className="flex items-center gap-3 text-[#911b1e]/80">
                                                    <Calendar className="w-5 h-5" />
                                                    <span className={raleway.className}>{event.date}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-[#911b1e]/80">
                                                    <Clock className="w-5 h-5" />
                                                    <span className={raleway.className}>{event.time}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-[#911b1e]/80">
                                                    <MapPin className="w-5 h-5" />
                                                    <span className={raleway.className}>{event.location}</span>
                                                </div>
                                                {event.ageRange && (
                                                    <div className="flex items-center gap-3 text-[#911b1e]/80">
                                                        <Users className="w-5 h-5" />
                                                        <span className={raleway.className}>{event.ageRange}</span>
                                                    </div>
                                                )}
                                                {event.price && (
                                                    <div className="flex items-center gap-3 text-[#911b1e]/80">
                                                        <span className="w-5 h-5 text-lg">₦</span>
                                                        <span className={raleway.className}>{event.price}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {event.registrationLink && (
                                                <motion.a
                                                    href={event.registrationLink}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className={`inline-flex items-center gap-2 bg-[#911b1e] text-[#fcf7dc] 
                                                              px-6 py-3 rounded-lg font-medium
                                                              hover:bg-[#911b1e]/90 transition-colors duration-300
                                                              w-fit ${raleway.className}`}
                                                >
                                                    {event.status === "ongoing" ? "View Tournament" : "Register Now"}
                                                    <ArrowRight className="w-4 h-4" />
                                                </motion.a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Past Events Section with Gallery */}
                <section className="relative py-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <span className={`inline-block px-4 py-1 bg-[#911b1e]/10 text-[#911b1e] 
                                           rounded-full text-sm mb-4 ${raleway.className}`}>
                                Past Events
                            </span>
                            <h2 className="text-[#911b1e] text-3xl md:text-4xl mb-6 font-agrandir">
                                EVENT HIGHLIGHTS
                            </h2>
                        </motion.div>

                        <div className="max-w-5xl mx-auto">
                            {pastEvents.map((event, index) => (
                                <motion.div
                                    key={event.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className={`group relative bg-white/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8
                                             border border-[#911b1e]/10 hover:border-[#911b1e]/30
                                             transition-all duration-300 ${event.title.includes("Prof. Tayo") ? "cursor-pointer" : ""}`}
                                    onClick={() => {
                                        if (event.title.includes("Prof. Tayo")) {
                                            window.location.href = "/events/prof-tayo-inaugural-lecture";
                                        }
                                    }}
                                >
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="relative h-64 rounded-xl overflow-hidden">
                                            <Image
                                                src={event.image}
                                                alt={event.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {event.title.includes("Prof. Tayo") && (
                                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                    <span className="text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                                                        View Details
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <span className={`text-[#911b1e]/60 text-sm mb-2 ${raleway.className}`}>
                                                {event.date}
                                            </span>
                                            <h3 className={`text-[#911b1e] text-2xl mb-4 font-agrandir`}>
                                                {event.title}
                                            </h3>
                                            <p className={`text-[#911b1e]/70 mb-4 ${raleway.className}`}>
                                                {event.description}
                                            </p>
                                            <div className={`inline-flex items-center space-x-2 
                                                           text-[#911b1e]/60 text-sm ${raleway.className}`}>
                                                <Users className="w-4 h-4" />
                                                <span>{event.highlight}</span>
                                            </div>
                                        </div>

                                        {/* Gallery Preview */}
                                        {event.gallery?.length > 0 && (
                                            <div className="mt-4">
                                                <button
                                                    onClick={() => setSelectedEvent(index)}
                                                    className={`inline-flex items-center space-x-2 text-[#911b1e] 
                                                              hover:text-[#911b1e]/80 transition-colors ${raleway.className}`}
                                                >
                                                    <Camera className="w-4 h-4" />
                                                    <span>View Gallery</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Gallery Modal */}
            {selectedEvent !== null && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center">
                        {/* Close Button */}
                        <button
                            onClick={closeGallery}
                            className="absolute top-4 right-4 text-white/80 hover:text-white
                                     transition-colors z-10"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            onClick={prevImage}
                            className="absolute left-4 text-white/80 hover:text-white
                                     transition-colors z-10"
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 text-white/80 hover:text-white
                                     transition-colors z-10"
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>

                        {/* Image */}
                        <div className="relative w-full h-full max-w-6xl max-h-[80vh] mx-4">
                            <Image
                                src={pastEvents[selectedEvent].gallery[selectedImage]}
                                alt={`${pastEvents[selectedEvent].title} - Image ${selectedImage + 1}`}
                                fill
                                className="object-contain"
                            />

                            {/* Image Counter */}
                            <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 
                                          bg-black/50 text-white px-4 py-2 rounded-full
                                          text-sm ${raleway.className}`}>
                                {selectedImage + 1} / {pastEvents[selectedEvent].gallery.length}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};

export default EventsPage; 