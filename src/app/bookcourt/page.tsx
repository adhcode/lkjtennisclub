'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BookCourtPage = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState('');

    const guestSchedule = {
        Monday: ['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'],
        Tuesday: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'],
        Wednesday: ['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'],
        Thursday: ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'],
        Friday: ['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'],
        Saturday: ['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'],
        Sunday: ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']
    };

    const handleDateChange = (date: Date | null) => {
        setStartDate(date);
        setSelectedTime('');
    };

    const getSelectedDay = () => {
        if (!startDate) return '';
        return startDate.toLocaleDateString('en-US', { weekday: 'long' });
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#fcf7dc]">
                {/* Hero Section */}
                <section className="relative h-screen w-full">
                    <div className="absolute inset-0">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute z-0 w-full h-full object-cover filter brightness-[0.85]"
                        >
                            <source src="/hero.mp4" type="video/mp4" />
                        </video>
                    </div>

                    {/* Gradient overlays for depth and text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent z-[1]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 z-[1]" />

                    {/* Content */}
                    <div className="relative z-[2] h-full flex flex-col justify-start text-left px-4 pt-40 md:px-16">
                        <h1 className="font-bruno text-[#fcf7dc] text-4xl md:text-6xl mb-3 tracking-wider drop-shadow-sm max-w-[400px]">
                            BOOK A COURT
                        </h1>
                        <p className="font-raleway text-[#fcf7dc]/90 text-sm md:text-base font-extralight tracking-wide italic mb-24 drop-shadow-sm max-w-[220px]">
                            Guest playing hours available daily
                        </p>
                    </div>
                </section>

                {/* Guest Hours Section */}
                <section className="py-20 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="font-bruno text-[#911b1e] text-4xl mb-4">GUEST HOURS</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                                {Object.entries(guestSchedule).map(([day, times]) => (
                                    <div key={day} className="text-left">
                                        <h3 className="font-bruno text-[#911b1e] text-xl mb-2">{day}</h3>
                                        <p className="font-raleway text-[#911b1e]/70 text-sm tracking-wide">
                                            {times[0]} - {times[times.length - 1]}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Booking Form */}
                        <div className="mt-20">
                            <form className="space-y-8">
                                {/* Your existing form fields */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder=" "
                                        className="peer w-full bg-transparent border-b-2 border-[#911b1e]/20 
                                                 px-0 py-2.5 text-[#911b1e] placeholder-transparent
                                                 focus:border-[#911b1e] focus:outline-none focus:ring-0
                                                 transition-all duration-300 font-raleway"
                                        required
                                    />
                                    <label className="absolute left-0 -top-3.5 text-[#911b1e]/60 text-sm 
                                                   transition-all duration-300 font-raleway
                                                   peer-placeholder-shown:text-base 
                                                   peer-placeholder-shown:text-[#911b1e]/40
                                                   peer-placeholder-shown:top-2.5
                                                   peer-focus:-top-3.5
                                                   peer-focus:text-[#911b1e]
                                                   peer-focus:text-sm">
                                        Full Name
                                    </label>
                                </div>

                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder=" "
                                        className="peer w-full bg-transparent border-b-2 border-[#911b1e]/20 
                                                 px-0 py-2.5 text-[#911b1e] placeholder-transparent
                                                 focus:border-[#911b1e] focus:outline-none focus:ring-0
                                                 transition-all duration-300 font-raleway"
                                        required
                                    />
                                    <label className="absolute left-0 -top-3.5 text-[#911b1e]/60 text-sm 
                                                       transition-all duration-300 font-raleway
                                                       peer-placeholder-shown:text-base 
                                                       peer-placeholder-shown:text-[#911b1e]/40
                                                       peer-placeholder-shown:top-2.5
                                                       peer-focus:-top-3.5
                                                       peer-focus:text-[#911b1e]
                                                       peer-focus:text-sm">
                                        Email Address
                                    </label>
                                </div>

                                <div className="relative">
                                    <input
                                        type="tel"
                                        placeholder=" "
                                        className="peer w-full bg-transparent border-b-2 border-[#911b1e]/20 
                                                 px-0 py-2.5 text-[#911b1e] placeholder-transparent
                                                 focus:border-[#911b1e] focus:outline-none focus:ring-0
                                                 transition-all duration-300 font-raleway"
                                        required
                                    />
                                    <label className="absolute left-0 -top-3.5 text-[#911b1e]/60 text-sm 
                                                       transition-all duration-300 font-raleway
                                                       peer-placeholder-shown:text-base 
                                                       peer-placeholder-shown:text-[#911b1e]/40
                                                       peer-placeholder-shown:top-2.5
                                                       peer-focus:-top-3.5
                                                       peer-focus:text-[#911b1e]
                                                       peer-focus:text-sm">
                                        Phone Number
                                    </label>
                                </div>

                                {/* Date Picker */}
                                <div className="relative">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={handleDateChange}
                                        minDate={new Date()}
                                        placeholderText=" "
                                        className="peer w-full bg-transparent border-b-2 border-[#911b1e]/20 
                                                 px-0 py-2.5 text-[#911b1e] placeholder-transparent
                                                 focus:border-[#911b1e] focus:outline-none focus:ring-0
                                                 transition-all duration-300 font-raleway"
                                        dateFormat="MMMM d, yyyy"
                                        required
                                    />
                                    <label className="absolute left-0 -top-3.5 text-[#911b1e]/60 text-sm 
                                                   transition-all duration-300 font-raleway
                                                   peer-placeholder-shown:text-base 
                                                   peer-placeholder-shown:text-[#911b1e]/40
                                                   peer-placeholder-shown:top-2.5
                                                   peer-focus:-top-3.5
                                                   peer-focus:text-[#911b1e]
                                                   peer-focus:text-sm">
                                        Select Date
                                    </label>
                                </div>

                                {/* Time Select */}
                                {getSelectedDay() && (
                                    <div className="relative">
                                        <select
                                            value={selectedTime}
                                            onChange={(e) => setSelectedTime(e.target.value)}
                                            className="peer w-full bg-transparent border-b-2 border-[#911b1e]/20 
                                                     px-0 py-2.5 text-[#911b1e] placeholder-transparent
                                                     focus:border-[#911b1e] focus:outline-none focus:ring-0
                                                     transition-all duration-300 font-raleway appearance-none"
                                            required
                                        >
                                            <option value="" disabled>Select Time</option>
                                            {guestSchedule[getSelectedDay() as keyof typeof guestSchedule].map((time) => (
                                                <option key={time} value={time}>{time}</option>
                                            ))}
                                        </select>
                                        <label className="absolute left-0 -top-3.5 text-[#911b1e]/60 text-sm 
                                                       transition-all duration-300 font-raleway
                                                       peer-placeholder-shown:text-base 
                                                       peer-placeholder-shown:text-[#911b1e]/40
                                                       peer-placeholder-shown:top-2.5
                                                       peer-focus:-top-3.5
                                                       peer-focus:text-[#911b1e]
                                                       peer-focus:text-sm">
                                            Select Time
                                        </label>
                                    </div>
                                )}

                                <div className="pt-8">
                                    <button
                                        type="submit"
                                        className="bg-[#911b1e]/20 text-[#911b1e] px-8 py-4 
                                                 font-raleway border border-[#911b1e] w-40
                                                 hover:bg-[#911b1e] hover:text-[#fcf7dc] 
                                                 transition-all duration-300"
                                    >
                                        Book Court
                                    </button>
                                </div>
                            </form>

                            {/* Guest Fee */}
                            <div className="mt-16">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-[1px] bg-[#911b1e]/40" />
                                    <span className="font-raleway text-[#911b1e]/70 text-sm">Guest Fee: ₦1,000 per hour</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default BookCourtPage; 