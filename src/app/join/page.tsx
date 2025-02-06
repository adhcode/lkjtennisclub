'use client';

import { Bruno_Ace_SC, Raleway } from 'next/font/google';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomSelect from '@/components/CustomSelect';

const brunoAce = Bruno_Ace_SC({
    weight: '400',
    subsets: ['latin'],
});

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400'],
});

type FormData = {
    fullName: string;
    email: string;
    phone: string;
    residency: 'estate_resident' | 'non_resident';
    gender: 'male' | 'female';
    playingExperience: string;
    message: string;
};

const JoinUsPage = () => {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        phone: '',
        residency: 'estate_resident',
        gender: 'male',
        playingExperience: '',
        message: ''
    });
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | CustomChangeEvent
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowConfirmation(true);
        setTimeout(() => {
            setShowConfirmation(false);
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                residency: 'estate_resident',
                gender: 'male',
                playingExperience: '',
                message: ''
            });
        }, 3000);
    };

    const inputClasses = `w-full px-4 py-3 bg-[#911b1e]/5 border border-[#911b1e]/20 
                         text-[#911b1e] rounded-md focus:outline-none focus:ring-1 
                         focus:ring-[#911b1e]/40 focus:border-[#911b1e]/40
                         placeholder-[#911b1e]/30 ${raleway.className}`;

    const labelClasses = `block text-sm text-[#911b1e]/70 mb-2 ${raleway.className}`;

    type CustomChangeEvent = {
        target: { name: string; value: string };
    };

    return (
        <>
            <Navbar />
            <main>
                <section className="relative min-h-screen bg-[#fcf7dc] pt-32 pb-24">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/DSC_1873.jpg"
                            alt="Tennis Court"
                            fill
                            className="object-cover opacity-5"
                        />
                    </div>

                    <div className="container relative z-10 mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-3xl mx-auto mb-12"
                        >
                            <h1 className={`text-[#911b1e] text-3xl md:text-4xl mb-4 tracking-wider ${brunoAce.className}`}>
                                JOIN LKJ TENNIS CLUB
                            </h1>
                            <p className={`text-[#911b1e]/70 text-sm md:text-base ${raleway.className}`}>
                                Take the first step towards becoming a member of our vibrant tennis community.
                                Fill out the form below to express your interest.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="max-w-2xl mx-auto"
                        >
                            <div className="flex items-center space-x-4 mb-12">
                                <div className="w-12 h-[1px] bg-[#911b1e]/40" />
                                <span className={`text-[#911b1e]/40 text-sm ${raleway.className}`}>Membership Interest Form</span>
                                <div className="w-12 h-[1px] bg-[#911b1e]/40" />
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="fullName" className={labelClasses}>Full Name</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        className={inputClasses}
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="email" className={labelClasses}>Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className={inputClasses}
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className={labelClasses}>Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className={inputClasses}
                                            placeholder="Enter your phone number"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="residency" className={labelClasses}>Residency Status</label>
                                        <CustomSelect
                                            name="residency"
                                            value={formData.residency}
                                            onChange={(value: string) => handleChange({
                                                target: { name: 'residency', value }
                                            } as CustomChangeEvent)}
                                            options={[
                                                { value: 'estate_resident', label: 'Estate Resident' },
                                                { value: 'non_resident', label: 'Non-Resident' }
                                            ]}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="gender" className={labelClasses}>Gender</label>
                                        <CustomSelect
                                            name="gender"
                                            value={formData.gender}
                                            onChange={(value: string) => handleChange({
                                                target: { name: 'gender', value }
                                            } as CustomChangeEvent)}
                                            options={[
                                                { value: 'male', label: 'Male' },
                                                { value: 'female', label: 'Female' }
                                            ]}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="playingExperience" className={labelClasses}>Playing Experience</label>
                                    <CustomSelect
                                        name="playingExperience"
                                        value={formData.playingExperience}
                                        onChange={(value: string) => handleChange({
                                            target: { name: 'playingExperience', value }
                                        } as CustomChangeEvent)}
                                        options={[
                                            { value: 'beginner', label: 'Beginner' },
                                            { value: 'intermediate', label: 'Intermediate' },
                                            { value: 'advanced', label: 'Advanced' },
                                            { value: 'professional', label: 'Professional' }
                                        ]}
                                        placeholder="Select your level"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className={labelClasses}>Additional Information</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={4}
                                        className={`${inputClasses} resize-none`}
                                        placeholder="Tell us a bit more about yourself and why you&apos;d like to join the club"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className={`w-full bg-[#911b1e] text-[#fcf7dc] py-3 rounded-md
                                              hover:bg-[#911b1e]/90 transition-colors ${raleway.className}`}
                                >
                                    Submit Application
                                </button>
                            </form>

                            {showConfirmation && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                                >
                                    <div className="bg-[#fcf7dc] p-8 rounded-lg text-center max-w-md mx-4">
                                        <svg
                                            className="w-16 h-16 text-green-500 mx-auto mb-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <h3 className={`text-[#911b1e] text-xl mb-2 ${brunoAce.className}`}>
                                            Application Received!
                                        </h3>
                                        <p className={`text-[#911b1e]/70 ${raleway.className}`}>
                                            Thank you for your interest. We&apos;ll review your application and get back to you soon.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default JoinUsPage; 