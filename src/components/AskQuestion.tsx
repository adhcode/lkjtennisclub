'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const AskQuestion = () => {
    const [email, setEmail] = useState('');
    const [question, setQuestion] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
    };

    return (
        <section className="bg-[#fcf7dc] py-20">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="font-bruno text-[#911b1e] text-4xl md:text-5xl mb-4">
                        GOT A QUESTION?
                    </h2>
                    <p className="font-raleway text-[#911b1e]/70 text-lg">
                        We&apos;re here to help. Send us your questions and we&apos;ll get back to you soon.
                    </p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                >
                    <div className="relative">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            Your Email
                        </label>
                    </div>

                    <div className="relative">
                        <textarea
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder=" "
                            rows={4}
                            className="peer w-full bg-transparent border-b-2 border-[#911b1e]/20 
                                     px-0 py-2.5 text-[#911b1e] placeholder-transparent
                                     focus:border-[#911b1e] focus:outline-none focus:ring-0
                                     transition-all duration-300 font-raleway resize-none"
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
                            Your Question
                        </label>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="bg-[#911b1e]/20 text-[#911b1e] px-8 py-4 text-sm md:text-base 
                                     font-raleway border border-[#911b1e] w-full
                                     hover:bg-[#911b1e] hover:text-[#fcf7dc] 
                                     transition-all duration-300"
                        >
                            Send Message
                        </button>
                    </div>
                </motion.form>
            </div>
        </section>
    );
};

export default AskQuestion;