'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { Raleway } from 'next/font/google';

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400'],
});

interface Option {
    value: string;
    label: string;
    disabled?: boolean;
}

interface CustomSelectProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    name: string;
    required?: boolean;
    error?: boolean;
    disabled?: boolean;
}

const CustomSelect = ({ options, value, onChange, placeholder, name, required, error, disabled }: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(option => option.value === value);

    return (
        <div ref={selectRef} className="relative">
            <motion.div
                whileTap={disabled ? {} : { scale: 0.98 }}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                className={`w-full px-4 py-3 border ${error ? 'border-red-500' : 'border-[#911b1e]/20'} rounded-lg 
                          focus:border-[#911b1e] transition-colors
                          bg-white/50 backdrop-blur-sm hover:bg-white/70
                          flex items-center justify-between ${raleway.className}
                          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
                <span className={selectedOption ? 'text-[#911b1e]' : 'text-[#911b1e]/50'}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-5 h-5 text-[#911b1e]/60" />
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md 
                                 border border-[#911b1e]/20 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto"
                    >
                        {options.map((option, index) => (
                            <motion.div
                                key={option.value}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => {
                                    if (!option.disabled) {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }
                                }}
                                className={`px-4 py-3 transition-colors flex items-center justify-between
                                          ${option.disabled
                                        ? 'cursor-not-allowed opacity-50'
                                        : `cursor-pointer hover:bg-[#911b1e]/10 ${value === option.value ? 'bg-[#911b1e]/5' : ''}`}
                                          ${raleway.className}`}
                            >
                                <span className={`${value === option.value ? 'text-[#911b1e] font-medium' : 'text-[#911b1e]/80'}`}>
                                    {option.label}
                                </span>
                                {value === option.value && (
                                    <Check className="w-4 h-4 text-[#911b1e]" />
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hidden input for form submission */}
            <input
                type="hidden"
                name={name}
                value={value}
                required={required}
            />
        </div>
    );
};

export default CustomSelect;