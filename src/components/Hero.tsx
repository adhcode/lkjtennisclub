'use client';

import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
    return (
        <div className="relative h-screen w-full">
            {/* Base image */}
            <div className="absolute inset-0">
                <Image
                    src="/hero3.jpg"
                    alt="Tennis Player"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="left"
                    className="absolute z-0 filter brightness-[0.85] contrast-[1.1] saturate-[1.05]"
                    priority
                />
            </div>

            {/* Gradient overlays for depth and text legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 z-[1]" />

            {/* Content */}
            <div className="relative z-[2] h-full flex flex-col justify-start text-left px-4 pt-40 md:px-16">
                <h1 className={`text-[#fcf7dc] text-4xl md:text-6xl mb-3 tracking-wider drop-shadow-sm max-w-[400px]`}>
                    LKJ TENNIS CLUB
                </h1>
                <p className={`text-[#fcf7dc]/90 text-sm md:text-base font-extralight tracking-wide italic mb-24 drop-shadow-sm max-w-[220px]`}>
                    where tennis brings people together at LKJ Gardens Igando, enriching lives through sport and community.
                </p>
                <div className="flex flex-col space-y-2">
                    <button className={`bg-[#911b1e]/20 text-[#fcf7dc] px-4 py-4 text-sm md:text-base font-extralight border border-[#fcf7dc] w-40`}>
                        About
                    </button>
                    <Link href="/join" className={`bg-[#911b1e] text-[#fcf7dc] px-4 py-4 text-sm md:text-base font-extralight w-40 text-center`}>
                        Join Us
                    </Link>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-8 left-4 md:left-6 flex items-center space-x-4">
                    <div className="w-12 h-[1px] bg-[#fcf7dc]/40" />
                    <span className={`text-[#fcf7dc]/40 text-sm`}>Est. 2024</span>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
