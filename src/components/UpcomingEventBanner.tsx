'use client';

import { useEffect, useState } from 'react';
import { Raleway } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
});

interface Event {
    id: string;
    title: string;
    slug: string;
    startDate: string;
    endDate?: string;
    location?: string;
    featuredImage?: string;
    status: string;
}

const UpcomingEventBanner = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        fetchHeroEvents();
    }, []);

    useEffect(() => {
        if (events.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % events.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [events.length]);

    const fetchHeroEvents = async () => {
        try {
            const response = await fetch('/api/events?heroBanner=true');
            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    setEvents(data);
                }
            }
        } catch (error) {
            console.error('Failed to fetch hero events:', error);
        }
    };

    const formatDateRange = (startDate: string, endDate?: string) => {
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : null;
        
        const formatOptions: Intl.DateTimeFormatOptions = { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        };
        
        if (end && start.getTime() !== end.getTime()) {
            return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', formatOptions)}`;
        }
        return start.toLocaleDateString('en-US', formatOptions);
    };

    const getEventStatus = (startDate: string, endDate?: string) => {
        const now = new Date();
        const start = new Date(startDate);
        const end = endDate ? new Date(endDate) : start;
        
        if (now < start) return 'Upcoming';
        if (now > end) return 'Ended';
        return 'Ongoing';
    };

    const getDuration = (startDate: string, endDate?: string) => {
        if (!endDate) return '1 Day';
        
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        
        if (days === 1) return '1 Day';
        if (days <= 7) return `${days} Days`;
        
        const weeks = Math.ceil(days / 7);
        return `${weeks} Week${weeks > 1 ? 's' : ''}`;
    };

    if (events.length === 0 || !isVisible) return null;

    const currentEvent = events[currentIndex];
    const status = getEventStatus(currentEvent.startDate, currentEvent.endDate);

    return (
        <div className="bg-white border-b border-[#911b1e]/10 py-2 sm:py-3 px-3 sm:px-4 fixed top-20 left-0 right-0 z-40 shadow-sm backdrop-blur-sm">
            <div className="container mx-auto">
                <div className="flex items-center justify-between gap-2 sm:gap-4">
                    {/* Event Image & Info */}
                    <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentEvent.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden flex-shrink-0"
                            >
                                <Image
                                    src={currentEvent.featuredImage || '/dsenergy2.jpg'}
                                    alt={currentEvent.title}
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex flex-col gap-1 min-w-0 flex-1 overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.h3
                                    key={`title-${currentEvent.id}`}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-[#911b1e] text-xs sm:text-sm font-medium leading-tight font-agrandir truncate uppercase"
                                >
                                    {currentEvent.title}
                                </motion.h3>
                            </AnimatePresence>
                            
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`info-${currentEvent.id}`}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                    className={`flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-[#911b1e]/70 ${raleway.className} flex-wrap`}
                                >
                                    <span className="whitespace-nowrap">{formatDateRange(currentEvent.startDate, currentEvent.endDate)}</span>
                                    <span className="hidden sm:inline">•</span>
                                    <span className={`whitespace-nowrap ${
                                        status === 'Ongoing' ? 'text-green-600 font-medium' : 
                                        status === 'Upcoming' ? 'text-blue-600 font-medium' : 
                                        'text-gray-500'
                                    }`}>
                                        {status}
                                    </span>
                                    <span className="hidden sm:inline">•</span>
                                    <span className="whitespace-nowrap">{getDuration(currentEvent.startDate, currentEvent.endDate)}</span>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* CTA Button, Indicators & Close */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`link-${currentEvent.id}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Link
                                    href={`/events/${currentEvent.slug}`}
                                    className={`inline-flex items-center gap-1 sm:gap-2 bg-[#911b1e] text-white 
                                              px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium
                                              hover:bg-[#911b1e]/90 transition-all duration-300 
                                              hover:shadow-md flex-shrink-0 ${raleway.className}`}
                                >
                                    <span className="hidden sm:inline">View Event</span>
                                    <span className="sm:hidden">View</span>
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </motion.div>
                        </AnimatePresence>
                        
                        {/* Pagination Dots */}
                        {events.length > 1 && (
                            <div className="hidden sm:flex items-center gap-1.5">
                                {events.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`transition-all duration-300 rounded-full ${
                                            index === currentIndex
                                                ? 'w-6 h-2 bg-[#911b1e]'
                                                : 'w-2 h-2 bg-[#911b1e]/30 hover:bg-[#911b1e]/50'
                                        }`}
                                        aria-label={`Go to event ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                        
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-[#911b1e]/40 hover:text-[#911b1e] transition-colors p-1"
                            aria-label="Close banner"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpcomingEventBanner;