'use client';

import { Raleway } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
});

const UpcomingEventBanner = () => {
    return (
        <div className="bg-white border-b border-[#911b1e]/10 py-3 px-4 fixed top-20 left-0 right-0 z-40 shadow-sm backdrop-blur-sm">
            <div className="container mx-auto">
                <div className="flex items-center justify-between gap-4">
                    {/* Event Image & Info */}
                    <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                                src="/ds.png"
                                alt="DS Energy Tennis Tournament"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                            <div>
                                <h3 className="text-[#911b1e] text-sm sm:text-base font-medium leading-tight font-agrandir">
                                    DS ENERGY TENNIS TOURNAMENT
                                </h3>
                                <div className={`flex items-center gap-3 text-xs text-[#911b1e]/70 ${raleway.className}`}>
                                    <span>Sep 6-20, 2025</span>
                                    <span>•</span>
                                    <span>3 Weekends</span>
                                    <span>•</span>
                                    <span>Sponsored Event</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <Link
                        href="/events/ds-energy-tournament"
                        className={`inline-flex items-center gap-2 bg-[#911b1e] text-white 
                                  px-4 py-2 rounded-lg text-sm font-medium
                                  hover:bg-[#911b1e]/90 transition-all duration-300 
                                  hover:shadow-md flex-shrink-0 ${raleway.className}`}
                    >
                        Register
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UpcomingEventBanner;