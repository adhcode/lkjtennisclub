'use client';

import { Bruno_Ace_SC, Raleway } from 'next/font/google';
import { motion } from 'framer-motion';
import Image from 'next/image';
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

const excoMembers = [
    {
        name: "Rafiu Olusegun",
        position: "President",
        image: "/exco/president.jpg",
        bio: "The boss man himself! Leading the pack with style and making sure everyone's having a great time on the court. 🎾",
        nickname: "Peruzzi"
    },
    {
        name: "Dr. Rukayat Ajibola-bakare",
        position: "Vice President",
        image: "/exco/vice-president.jpg",
        bio: "Our amazing VP keeping everything running smoothly while serving aces both on and off the court! 💪",
    },
    {
        name: "Olorode Dhikrullah Adekunle",
        position: "Secretary",
        image: "/exco/secretary.jpg",
        bio: "The guy making sure we don't forget anything important. Master of the minutes and keeper of the records! 📝",
        nickname: "ADH"
    },
    {
        name: "Adegoke Karima",
        position: "Assistant Secretary",
        image: "",
        bio: "Helping keep our paperwork in check and adding that extra spark to our admin game! ✨",
    },
    {
        name: "Adeyemi Shakiru",
        position: "Treasurer",
        image: "/exco/treasurer.jpg",
        bio: "Watching over our coins and making it rain when needed! 💰",
        nickname: "Big Shark"
    },
    {
        name: "Erhimedafe Romanus",
        position: "Welfare Officer",
        image: "/exco/welfare.jpg",
        bio: "Making sure everyone's happy and comfortable. The club's official vibe manager! 😎",
        nickname: "Daddy K"
    },
    {
        name: "Mrs Oyebolanle Akintola",
        position: "Assistant Welfare Officer",
        image: "/exco/asst-welfare.jpg",
        bio: "Spreading good vibes and keeping the club's spirit high! 🌟",
    },
    {
        name: "Olatunji Olajuwon",
        position: "Provost",
        image: "/exco/provost.jpg",
        bio: "Keeping everything in order while living up to the YOLO spirit! 🎉",
        nickname: "Yolo"
    },
    {
        name: "Lawal Musa",
        position: "PRO",
        image: "/exco/pro.jpg",
        bio: "Our voice to the world! Spreading the good news about LKJ Tennis Club. 📢",
        nickname: "Harbidex"
    },
    {
        name: "Oyawoye Oluwatobi",
        position: "Media",
        image: "/exco/media.jpg",
        bio: "Capturing all the amazing moments and keeping our social game strong! 📸",
    },
    {
        name: "Sam Omonile",
        position: "S Officio",
        image: "",
        bio: "The wise counsel keeping us all in check with that signature smile! 🎯",
    },
    {
        name: "Mrs Winnifred ",
        position: "Patron",
        image: "",
        bio: "Our amazing patron, blessing us with wisdom and grace! ✨",
    },
    {
        name: "Patrick Oche",
        position: "Head Coach",
        image: "",
        bio: "Professional tennis coach with years of experience. Transforming beginners into champions with dedication and expertise! 🎾👨‍🏫",
        nickname: "Coachee"
    }
];

// Add this SVG component for the avatar illustration
const ProfileIllustration = () => (
    <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full bg-[#911b1e]/5">
            {/* Tennis-themed illustration */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-48 h-48">
                    {/* Profile circle */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full bg-[#911b1e]/10 
                                      flex items-center justify-center">
                            <svg
                                className="w-20 h-20 text-[#911b1e]/30"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Tennis ball decoration */}
                    <div className="absolute -right-2 -bottom-2 w-12 h-12 
                                  bg-[#911b1e]/10 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full border-2 border-[#911b1e]/20
                                      relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full h-1 bg-[#911b1e]/20 rotate-45" />
                                <div className="w-full h-1 bg-[#911b1e]/20 -rotate-45" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const ExcoPage = () => {
    return (
        <>
            <Navbar />
            <main className="bg-[#fcf7dc]">
                {/* Hero Section - Improved mobile responsiveness */}
                <section className="relative min-h-[280px] md:h-[40vh] flex items-center justify-center 
                                  overflow-hidden py-12 md:py-0">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[#911b1e]/5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, #911b1e 1px, transparent 0)',
                            backgroundSize: '40px 40px',
                            opacity: 0.1
                        }} />
                    </div>

                    <div className="relative z-10 text-center px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-3xl mx-auto"
                        >
                            <h1 className={`text-[#911b1e] text-3xl sm:text-4xl md:text-6xl mb-4 md:mb-6 
                                          tracking-wider ${brunoAce.className}`}>
                                EXECUTIVE COMMITTEE
                            </h1>
                            <div className="flex items-center justify-center space-x-4 mb-4 md:mb-6">
                                <div className="w-8 md:w-12 h-[1px] bg-[#911b1e]/20" />
                                <span className={`text-[#911b1e]/60 text-xs sm:text-sm ${raleway.className}`}>
                                    2024 - 2026
                                </span>
                                <div className="w-8 md:w-12 h-[1px] bg-[#911b1e]/20" />
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Team Grid Section - Improved grid layout */}
                <section className="relative py-12 md:py-20">
                    <div className="container max-w-[1400px] mx-auto px-4 sm:px-6">
                        {/* Leadership - Top 4 positions */}
                        <div className="max-w-5xl mx-auto mb-12 md:mb-20">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                                {excoMembers.slice(0, 4).map((member, index) => (
                                    <TeamMemberCard
                                        key={member.name}
                                        member={member}
                                        index={index}
                                        className="sm:last:col-span-2 sm:last:mx-auto sm:last:max-w-md"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Core Team - Improved grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                                      gap-4 sm:gap-6 md:gap-8 mb-12 md:mb-20">
                            {excoMembers.slice(4, 8).map((member, index) => (
                                <TeamMemberCard key={member.name} member={member} index={index + 4} />
                            ))}
                        </div>

                        {/* Support Team - Responsive grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                                      gap-4 sm:gap-6 md:gap-8">
                            {excoMembers.slice(8).map((member, index) => (
                                <TeamMemberCard key={member.name} member={member} index={index + 8} />
                            ))}
                        </div>
                    </div>

                    {/* Decorative elements - Adjusted for mobile */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute right-0 top-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 
                                      translate-x-1/3 -translate-y-1/3
                                      bg-[#911b1e]/5 rounded-full blur-2xl" />
                        <div className="absolute left-0 bottom-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 
                                      -translate-x-1/3 translate-y-1/3
                                      bg-[#911b1e]/5 rounded-full blur-2xl" />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

// Update TeamMemberCard to accept className prop
const TeamMemberCard = ({
    member,
    index,
    className = ""
}: {
    member: typeof excoMembers[0],
    index: number,
    className?: string
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className={`h-[300px] xs:h-[350px] sm:h-[400px] ${className}`}
    >
        <div className="group relative h-full overflow-hidden rounded-2xl 
                      bg-white/50 backdrop-blur-sm border border-white/20
                      transition-all duration-500 ease-out
                      hover:bg-white/60 hover:backdrop-blur-lg">
            {/* Image Container */}
            <div className="relative h-full overflow-hidden bg-[#911b1e]/5">
                {member.image ? (
                    <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-center transition-transform duration-700 
                                 group-hover:scale-105 filter grayscale hover:grayscale-0
                                 contrast-125 brightness-90"
                    />
                ) : (
                    <ProfileIllustration />
                )}
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6
                          bg-gradient-to-t from-black/80 via-black/20 to-transparent
                          transition-all duration-500 ease-out
                          group-hover:from-[#911b1e]/90">
                <div>
                    {member.nickname && (
                        <span className="inline-block bg-white/10 backdrop-blur-sm 
                                       text-white/90 text-xs px-3 py-1 rounded-full
                                       mb-3 border border-white/10">
                            {member.nickname}
                        </span>
                    )}
                    <h3 className={`text-white text-lg sm:text-xl leading-tight mb-1 ${brunoAce.className}`}>
                        {member.name}
                    </h3>
                    <p className={`text-white/80 text-xs sm:text-sm mb-4 ${raleway.className}`}>
                        {member.position}
                    </p>
                    <p className={`text-white/0 text-sm leading-relaxed transform translate-y-4 
                                  opacity-0 transition-all duration-500 ease-out
                                  group-hover:text-white/90 group-hover:translate-y-0 
                                  group-hover:opacity-100 ${raleway.className}`}>
                        {member.bio}
                    </p>
                </div>
            </div>
        </div>
    </motion.div>
);

export default ExcoPage; 