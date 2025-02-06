'use client';

import { useState } from 'react';
import { Bruno_Ace_SC, Raleway } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';

const brunoAce = Bruno_Ace_SC({
    weight: '400',
    subsets: ['latin'],
});

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400'],
});

interface FormData {
    email: string;
    message: string;
}

const AskQuestion = () => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        message: ''
    });
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            setFormData({ email: '', message: '' });
        }, 3000);
    };

    const renderConfirmationMessage = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-[#fcf7dc] rounded-md"
        >
            <div className="text-center px-6">
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
                <p className={`text-[#911b1e] text-lg font-medium ${raleway.className}`}>
                    Message Sent!
                </p>
                <p className={`text-[#911b1e]/60 text-sm mt-1 ${raleway.className}`}>
                    We&apos;ll get back to you soon.
                </p>
            </div>
        </motion.div>
    );

    const inputClasses = `w-full px-4 py-3 bg-[#911b1e]/5 border border-[#911b1e]/20 
                         text-[#911b1e] rounded-md focus:outline-none focus:ring-1 
                         focus:ring-[#911b1e]/40 focus:border-[#911b1e]/40
                         placeholder-[#911b1e]/30 ${raleway.className}`;

    const labelClasses = `block text-sm text-[#911b1e]/70 mb-2 ${raleway.className}`;

    return (
        <section className="bg-[#fcf7dc] py-24">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mb-12"
                >
                    <h2 className={`text-[#911b1e] text-3xl md:text-4xl mb-4 tracking-wider ${brunoAce.className}`}>
                        GOT A QUESTION?
                    </h2>
                    <p className={`text-[#911b1e]/70 text-sm md:text-base ${raleway.className}`}>
                        We&apos;re here to help. Send us your questions and we&apos;ll get back to you soon.
                    </p>
                </motion.div>

                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="max-w-xl relative"
                >
                    <div className="flex items-center space-x-4 mb-12">
                        <div className="w-12 h-[1px] bg-[#911b1e]/40" />
                        <span className={`text-[#911b1e]/40 text-sm ${raleway.className}`}>Get in Touch</span>
                        <div className="w-12 h-[1px] bg-[#911b1e]/40" />
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className={labelClasses}>
                                Your Email
                            </label>
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
                            <label htmlFor="message" className={labelClasses}>
                                Your Question
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={4}
                                className={`${inputClasses} resize-none`}
                                placeholder="What would you like to know?"
                            />
                        </div>
                        <button
                            type="submit"
                            className={`w-full bg-[#911b1e] text-[#fcf7dc] py-3 rounded-md
                                      hover:bg-[#911b1e]/90 transition-colors ${raleway.className}`}
                        >
                            Send Message
                        </button>
                    </form>

                    {/* Confirmation Message */}
                    <AnimatePresence>
                        {showConfirmation && renderConfirmationMessage()}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default AskQuestion;