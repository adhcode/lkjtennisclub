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
        <div className="bg-white border-b border-[#911b1e]/10 py-2 sm:py-3 px-3 sm:px-4 fixed top-20 left-0 right-0 z-40 shadow-sm backdrop-blur-sm">
            <div className="container mx-auto">
                <div className="flex items-center justify-between gap-2 sm:gap-4">
                    {/* Event Image & Info */}
                    <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                                src="/dsenergy2.jpg"
                                alt="DS Energy Tennis Tournament"
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="flex flex-col gap-1 min-w-0 flex-1">
                            <h3 className="text-[#911b1e] text-xs sm:text-sm font-medium leading-tight font-agrandir truncate">
                                DS ENERGY TENNIS TOURNAMENT
                            </h3>
                            <div className={`flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-[#911b1e]/70 ${raleway.className} flex-wrap`}>
                                <span className="whitespace-nowrap">Sep 6-20, 2025</span>
                                <span className="hidden sm:inline">•</span>
                                <span className="whitespace-nowrap">Ongoing</span>
                                <span className="hidden sm:inline">•</span>
                                <span className="whitespace-nowrap">3 Weekends</span>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <Link
                        href="/events/ds-energy-tournament"
                        className={`inline-flex items-center gap-1 sm:gap-2 bg-[#911b1e] text-white 
                                  px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium
                                  hover:bg-[#911b1e]/90 transition-all duration-300 
                                  hover:shadow-md flex-shrink-0 ${raleway.className}`}
                    >
                        <span className="hidden sm:inline">View Tournament</span>
                        <span className="sm:hidden">View</span>
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UpcomingEventBanner;