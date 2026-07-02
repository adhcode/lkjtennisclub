'use client';

import { useState, useEffect } from 'react';
import { Raleway } from 'next/font/google';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
});

interface Event {
  id: string;
  title: string;
  slug: string;
  description?: string;
  startDate: string;
  endDate?: string;
  location?: string;
  price?: number;
  maxParticipants?: number;
  featuredImage?: string;
  featured: boolean;
  requiresRegistration: boolean;
  status: string;
  _count: {
    registrations: number;
  };
}

const Events = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch('/api/events?status=published');
            if (response.ok) {
                const data = await response.json();
                setEvents(data);
            }
        } catch (error) {
            console.error('Failed to fetch events:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formatPrice = (price?: number) => {
        if (!price || price === 0) return 'Free';
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const getEventStatus = (event: Event) => {
        const now = new Date();
        const startDate = new Date(event.startDate);
        const endDate = event.endDate ? new Date(event.endDate) : startDate;

        if (now < startDate) return 'upcoming';
        if (now > endDate) return 'past';
        return 'ongoing';
    };

    const getStatusLabel = (event: Event) => {
        const status = getEventStatus(event);
        if (status === 'ongoing') return 'Event Ongoing';
        if (status === 'past') return 'Event Completed';
        return 'Featured Event';
    };

    if (loading) {
        return (
            <section className="relative py-16 sm:py-20 md:py-24 bg-[#fcf7dc] overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative">
                    <div className="text-center mb-12 md:mb-16">
                        <span className={`inline-block px-3 sm:px-4 py-1 bg-[#911b1e]/10 text-[#911b1e] 
                                      rounded-full text-xs sm:text-sm mb-3 sm:mb-4 ${raleway.className}`}>
                            Club Events
                        </span>
                        <h2 className="text-[#911b1e] text-2xl sm:text-3xl md:text-4xl tracking-wider font-agrandir">
                            UPCOMING & PAST EVENTS
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-gray-200 rounded-lg h-96 animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (events.length === 0) {
        return (
            <section className="relative py-16 sm:py-20 md:py-24 bg-[#fcf7dc] overflow-hidden">
                <div className="container mx-auto px-4 md:px-6 relative">
                    <div className="text-center">
                        <span className={`inline-block px-3 sm:px-4 py-1 bg-[#911b1e]/10 text-[#911b1e] 
                                      rounded-full text-xs sm:text-sm mb-3 sm:mb-4 ${raleway.className}`}>
                            Club Events
                        </span>
                        <h2 className="text-[#911b1e] text-2xl sm:text-3xl md:text-4xl tracking-wider font-agrandir mb-4">
                            UPCOMING & PAST EVENTS
                        </h2>
                        <p className={`text-[#911b1e]/70 text-lg ${raleway.className}`}>
                            No events available at the moment. Check back soon!
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    // Sort by date - latest first
    const sortedEvents = [...events].sort((a, b) => {
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });

    // Get featured and other events
    const featuredEvents = sortedEvents.filter(e => e.featured).slice(0, 3);
    const otherEvents = sortedEvents.filter(e => !e.featured);

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
                    <h2 className="text-[#911b1e] text-2xl sm:text-3xl md:text-4xl tracking-wider font-agrandir">
                        CLUB EVENTS
                    </h2>
                </motion.div>

                <div className="relative max-w-7xl mx-auto">
                    {/* Featured Events - Large horizontal cards */}
                    {featuredEvents.length > 0 && (
                        <div className="space-y-8 mb-12">
                            {featuredEvents.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 }}
                                    className="group"
                                >
                                    <Link href={`/events/${event.slug}`}>
                                        <div className="grid md:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                                            {/* Image on Left */}
                                            <div className="relative h-64 md:h-auto min-h-[300px] overflow-hidden">
                                                {event.featuredImage ? (
                                                    event.featuredImage.startsWith('http') ? (
                                                        <Image
                                                            src={event.featuredImage}
                                                            alt={event.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    ) : (
                                                        <img
                                                            src={event.featuredImage}
                                                            alt={event.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    )
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-[#911b1e] to-[#911b1e]/60 flex items-center justify-center">
                                                        <Calendar className="text-[#fcf7dc]" size={64} />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content on Right */}
                                            <div className="bg-[#911b1e] p-8 md:p-10 flex flex-col justify-center">
                                                <div className="mb-4">
                                                    <span className={`inline-block px-4 py-1.5 bg-[#fcf7dc] text-[#911b1e] 
                                                                    rounded-full text-xs font-semibold ${raleway.className}`}>
                                                        Tournament Ongoing
                                                    </span>
                                                </div>

                                                <h3 className="text-[#fcf7dc] text-2xl md:text-3xl lg:text-4xl font-agrandir mb-4 
                                                             group-hover:text-[#fcf7dc]/90 transition-colors">
                                                    {event.title}
                                                </h3>

                                                <p className={`text-[#fcf7dc]/90 text-base md:text-lg mb-6 ${raleway.className}`}>
                                                    {formatDate(event.startDate)}
                                                    {event.endDate && event.endDate !== event.startDate && 
                                                        ` - ${formatDate(event.endDate)}`}
                                                </p>

                                                {event.description && (
                                                    <p className={`text-[#fcf7dc]/90 text-sm md:text-base mb-8 leading-relaxed ${raleway.className}`}>
                                                        {event.description}
                                                    </p>
                                                )}

                                                <div>
                                                    <span className={`inline-block bg-[#fcf7dc] text-[#911b1e] px-6 py-3 
                                                                    rounded-lg font-medium ${raleway.className} 
                                                                    group-hover:bg-[#fcf7dc]/90 transition-colors`}>
                                                        View Tournament
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Other Events - 3 column grid */}
                    {otherEvents.length > 0 && (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {otherEvents.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl 
                                             transition-all duration-500 flex flex-col"
                                >
                                    <Link href={`/events/${event.slug}`} className="flex flex-col h-full">
                                        <div className="relative h-56 overflow-hidden">
                                            {event.featuredImage ? (
                                                event.featuredImage.startsWith('http') ? (
                                                    <Image
                                                        src={event.featuredImage}
                                                        alt={event.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <img
                                                        src={event.featuredImage}
                                                        alt={event.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                )
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-[#911b1e] to-[#911b1e]/60 flex items-center justify-center">
                                                    <Calendar className="text-[#fcf7dc]" size={48} />
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3 className="text-[#911b1e] text-xl font-agrandir mb-3 
                                                         group-hover:text-[#911b1e]/80 transition-colors">
                                                {event.title}
                                            </h3>

                                            <p className={`text-[#911b1e]/70 text-sm mb-3 ${raleway.className}`}>
                                                {formatDate(event.startDate)}
                                            </p>

                                            {event.description && (
                                                <p className={`text-[#911b1e]/70 text-sm line-clamp-3 ${raleway.className}`}>
                                                    {event.description}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}

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
