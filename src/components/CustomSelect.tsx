'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Raleway } from 'next/font/google';

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400'],
});

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    name: string;
    required?: boolean;
}

const CustomSelect = ({ options, value, onChange, placeholder, name, required }: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState('');
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const option = options.find(opt => opt.value === value);
        setSelectedLabel(option ? option.label : placeholder || '');
    }, [value, options, placeholder]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={selectRef} className="relative">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-4 py-3 bg-[#911b1e]/5 border border-[#911b1e]/20 
                           text-[#911b1e] rounded-md cursor-pointer
                           flex items-center justify-between
                           ${raleway.className}`}
            >
                <span className={value ? '' : 'text-[#911b1e]/50'}>
                    {selectedLabel}
                </span>
                <svg
                    className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-50 w-full mt-1 bg-[#fcf7dc] border border-[#911b1e]/20 
                                 rounded-md shadow-lg overflow-hidden"
                    >
                        {options.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={`px-4 py-3 cursor-pointer transition-colors
                                          hover:bg-[#911b1e]/10 
                                          ${option.value === value ? 'bg-[#911b1e]/5' : ''}
                                          ${raleway.className}`}
                            >
                                {option.label}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hidden select for form submission */}
            <select
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                className="sr-only"
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CustomSelect; 