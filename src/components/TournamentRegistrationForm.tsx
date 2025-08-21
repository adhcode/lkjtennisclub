'use client';

import { Raleway } from 'next/font/google';
import { motion } from 'framer-motion';
import { useState, useTransition, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Phone, Trophy, AlertCircle, Loader2 } from 'lucide-react';
import { submitTournamentRegistration } from '@/app/actions/registration';
import CustomSelect from './CustomSelect';

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400'],
});

interface FormData {
    participantName: string;
    participantEmail: string;
    participantPhone: string;
    category: string;
    emergencyContact: string;
    emergencyPhone: string;
    medicalConditions: string;
    specialRequests: string;
}

const FieldError = ({ error }: { error?: string }) => {
    if (!error) return null;

    return (
        <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-red-600 text-sm mt-1 flex items-center gap-1 ${raleway.className}`}
        >
            <AlertCircle className="w-4 h-4" />
            {error}
        </motion.p>
    );
};

interface CapacityData {
    men: { registered: number; capacity: number; remaining: number; isFull: boolean };
    women: { registered: number; capacity: number; remaining: number; isFull: boolean };
    kids: { registered: number; capacity: number; remaining: number; isFull: boolean };
}

const TournamentRegistrationForm = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoadingCapacity, setIsLoadingCapacity] = useState(true);
    const [capacityData, setCapacityData] = useState<CapacityData | null>(null);
    const [formData, setFormData] = useState<FormData>({
        participantName: '',
        participantEmail: '',
        participantPhone: '',
        category: '',
        emergencyContact: '',
        emergencyPhone: '',
        medicalConditions: '',
        specialRequests: '',
    });

    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    // Fetch current capacity data
    const fetchCapacity = async () => {
        try {
            setIsLoadingCapacity(true);
            const response = await fetch('/api/tournament-capacity');
            if (response.ok) {
                const data = await response.json();
                setCapacityData(data);
            } else {
                console.error('Failed to fetch capacity data');
            }
        } catch (error) {
            console.error('Error fetching capacity:', error);
        } finally {
            setIsLoadingCapacity(false);
        }
    };

    // Fetch capacity on mount and set up refresh
    useEffect(() => {
        fetchCapacity();
        // Refresh capacity data every 30 seconds
        const interval = setInterval(fetchCapacity, 30000);
        return () => clearInterval(interval);
    }, []);

    // Generate category options based on real-time data
    const categoryOptions = capacityData ? [
        {
            value: 'men',
            label: `Men (${capacityData.men.remaining} of ${capacityData.men.capacity} spots left)`,
            disabled: capacityData.men.isFull
        },
        {
            value: 'women',
            label: `Women (${capacityData.women.remaining} of ${capacityData.women.capacity} spots left)`,
            disabled: capacityData.women.isFull
        },
        {
            value: 'kids',
            label: `Kids (${capacityData.kids.remaining} of ${capacityData.kids.capacity} spots left)`,
            disabled: capacityData.kids.isFull
        }
    ] : [
        { value: 'men', label: 'Men (Loading...)', disabled: true },
        { value: 'women', label: 'Women (Loading...)', disabled: true },
        { value: 'kids', label: 'Kids (Loading...)', disabled: true }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear field error when user starts typing
        if (fieldErrors[name]) {
            setFieldErrors((prev: Record<string, string>) => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        // Participant validation
        if (!formData.participantName.trim()) {
            errors.participantName = 'Participant name is required';
        }
        if (!formData.participantEmail.trim()) {
            errors.participantEmail = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.participantEmail)) {
            errors.participantEmail = 'Please enter a valid email address';
        }
        if (!formData.participantPhone.trim()) {
            errors.participantPhone = 'Phone number is required';
        } else if (!/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.participantPhone)) {
            errors.participantPhone = 'Please enter a valid phone number';
        }
        if (!formData.category.trim()) {
            errors.category = 'Category is required';
        } else if (capacityData && capacityData[formData.category as keyof CapacityData]?.isFull) {
            errors.category = `Sorry, the ${formData.category} category is full`;
        }
        if (!formData.emergencyContact.trim()) {
            errors.emergencyContact = 'Emergency contact is required';
        }
        if (!formData.emergencyPhone.trim()) {
            errors.emergencyPhone = 'Emergency phone is required';
        } else if (!/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.emergencyPhone)) {
            errors.emergencyPhone = 'Please enter a valid phone number';
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            // Scroll to first error
            const firstError = document.querySelector('.text-red-600');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        startTransition(async () => {
            setErrorMessage('');

            try {
                const tournamentFormData = new FormData();
                Object.entries(formData).forEach(([key, value]) => {
                    tournamentFormData.append(key, value);
                });

                const result = await submitTournamentRegistration(tournamentFormData);

                if (result.success) {
                    router.push(`/events/ds-energy-tournament/confirmation?category=${formData.category}`);
                } else {
                    setErrorMessage(result.message);
                }
            } catch (error) {
                console.error('Submission error:', error);
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-[#911b1e]/10"
        >
            {errorMessage && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
                >
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <div>
                        <h3 className={`text-red-800 font-medium ${raleway.className}`}>
                            Registration Error
                        </h3>
                        <p className={`text-red-700 text-sm ${raleway.className}`}>
                            {errorMessage}
                        </p>
                    </div>
                </motion.div>
            )}

            <form onSubmit={handleSubmit} id="tournament-registration-form" className="space-y-8">
                {/* Participant Information */}
                <div>
                    <h3 className={`text-[#911b1e] text-xl mb-4 flex items-center gap-2 ${raleway.className}`}>
                        <User className="w-5 h-5" />
                        Participant Information
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className={`block text-[#911b1e]/80 text-sm mb-2 ${raleway.className}`}>
                                Full Name *
                            </label>
                            <input
                                type="text"
                                name="participantName"
                                value={formData.participantName}
                                onChange={handleInputChange}
                                required
                                className={`w-full px-4 py-3 border ${fieldErrors.participantName ? 'border-red-500' : 'border-[#911b1e]/20'} rounded-lg 
                                          focus:border-[#911b1e] focus:outline-none transition-all duration-300
                                          bg-white/50 backdrop-blur-sm hover:bg-white/70 focus:bg-white/80
                                          focus:ring-2 focus:ring-[#911b1e]/20 ${raleway.className}`}
                                placeholder="Enter participant's full name"
                            />
                            <FieldError error={fieldErrors.participantName} />
                        </div>

                        <div>
                            <label className={`block text-[#911b1e]/80 text-sm mb-2 ${raleway.className}`}>
                                Email Address *
                            </label>
                            <input
                                type="email"
                                name="participantEmail"
                                value={formData.participantEmail}
                                onChange={handleInputChange}
                                required
                                className={`w-full px-4 py-3 border ${fieldErrors.participantEmail ? 'border-red-500' : 'border-[#911b1e]/20'} rounded-lg 
                                          focus:border-[#911b1e] focus:outline-none transition-all duration-300
                                          bg-white/50 backdrop-blur-sm hover:bg-white/70 focus:bg-white/80
                                          focus:ring-2 focus:ring-[#911b1e]/20 ${raleway.className}`}
                                placeholder="participant@example.com"
                            />
                            <FieldError error={fieldErrors.participantEmail} />
                        </div>

                        <div>
                            <label className={`block text-[#911b1e]/80 text-sm mb-2 ${raleway.className}`}>
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                name="participantPhone"
                                value={formData.participantPhone}
                                onChange={handleInputChange}
                                required
                                className={`w-full px-4 py-3 border ${fieldErrors.participantPhone ? 'border-red-500' : 'border-[#911b1e]/20'} rounded-lg 
                                          focus:border-[#911b1e] focus:outline-none transition-all duration-300
                                          bg-white/50 backdrop-blur-sm hover:bg-white/70 focus:bg-white/80
                                          focus:ring-2 focus:ring-[#911b1e]/20 ${raleway.className}`}
                                placeholder="+234 xxx xxx xxxx"
                            />
                            <FieldError error={fieldErrors.participantPhone} />
                        </div>


                    </div>
                </div>

                {/* Tournament Category */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className={`text-[#911b1e] text-xl flex items-center gap-2 ${raleway.className}`}>
                            <Trophy className="w-5 h-5" />
                            Tournament Category
                        </h3>

                    </div>

                    <div>
                        <label className={`block text-[#911b1e]/80 text-sm mb-2 ${raleway.className}`}>
                            Category *
                        </label>
                        <CustomSelect
                            options={categoryOptions}
                            value={formData.category}
                            onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                            placeholder={isLoadingCapacity ? "Loading categories..." : "Select tournament category"}
                            name="category"
                            required
                            error={!!fieldErrors.category}
                            disabled={isLoadingCapacity}
                        />
                        <FieldError error={fieldErrors.category} />



                        <p className={`text-[#911b1e]/60 text-sm mt-2 ${raleway.className}`}>
                            ⚠️ Registration closes automatically when categories are full.
                        </p>
                    </div>
                </div>

                {/* Emergency Contact */}
                <div>
                    <h3 className={`text-[#911b1e] text-xl mb-4 flex items-center gap-2 ${raleway.className}`}>
                        <Phone className="w-5 h-5" />
                        Emergency Contact
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className={`block text-[#911b1e]/80 text-sm mb-2 ${raleway.className}`}>
                                Emergency Contact Name *
                            </label>
                            <input
                                type="text"
                                name="emergencyContact"
                                value={formData.emergencyContact}
                                onChange={handleInputChange}
                                required
                                className={`w-full px-4 py-3 border ${fieldErrors.emergencyContact ? 'border-red-500' : 'border-[#911b1e]/20'} rounded-lg 
                                          focus:border-[#911b1e] focus:outline-none transition-all duration-300
                                          bg-white/50 backdrop-blur-sm hover:bg-white/70 focus:bg-white/80
                                          focus:ring-2 focus:ring-[#911b1e]/20 ${raleway.className}`}
                                placeholder="Emergency contact full name"
                            />
                            <FieldError error={fieldErrors.emergencyContact} />
                        </div>

                        <div>
                            <label className={`block text-[#911b1e]/80 text-sm mb-2 ${raleway.className}`}>
                                Emergency Contact Phone *
                            </label>
                            <input
                                type="tel"
                                name="emergencyPhone"
                                value={formData.emergencyPhone}
                                onChange={handleInputChange}
                                required
                                className={`w-full px-4 py-3 border ${fieldErrors.emergencyPhone ? 'border-red-500' : 'border-[#911b1e]/20'} rounded-lg 
                                          focus:border-[#911b1e] focus:outline-none transition-all duration-300
                                          bg-white/50 backdrop-blur-sm hover:bg-white/70 focus:bg-white/80
                                          focus:ring-2 focus:ring-[#911b1e]/20 ${raleway.className}`}
                                placeholder="+234 xxx xxx xxxx"
                            />
                            <FieldError error={fieldErrors.emergencyPhone} />
                        </div>
                    </div>
                </div>

                {/* Additional Information */}
                <div>
                    <h3 className={`text-[#911b1e] text-xl mb-4 flex items-center gap-2 ${raleway.className}`}>
                        <AlertCircle className="w-5 h-5" />
                        Additional Information
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className={`block text-[#911b1e]/80 text-sm mb-2 ${raleway.className}`}>
                                Medical Conditions or Allergies
                            </label>
                            <textarea
                                name="medicalConditions"
                                value={formData.medicalConditions}
                                onChange={handleInputChange}
                                rows={3}
                                className={`w-full px-4 py-3 border border-[#911b1e]/20 rounded-lg 
                                          focus:border-[#911b1e] focus:outline-none transition-all duration-300
                                          bg-white/50 backdrop-blur-sm hover:bg-white/70 focus:bg-white/80
                                          focus:ring-2 focus:ring-[#911b1e]/20 resize-none ${raleway.className}`}
                                placeholder="Any medical conditions or allergies..."
                            />
                        </div>

                        <div>
                            <label className={`block text-[#911b1e]/80 text-sm mb-2 ${raleway.className}`}>
                                Special Requests
                            </label>
                            <textarea
                                name="specialRequests"
                                value={formData.specialRequests}
                                onChange={handleInputChange}
                                rows={3}
                                className={`w-full px-4 py-3 border border-[#911b1e]/20 rounded-lg 
                                          focus:border-[#911b1e] focus:outline-none transition-all duration-300
                                          bg-white/50 backdrop-blur-sm hover:bg-white/70 focus:bg-white/80
                                          focus:ring-2 focus:ring-[#911b1e]/20 resize-none ${raleway.className}`}
                                placeholder="Any special requests..."
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    disabled={isPending}
                    whileHover={{ scale: isPending ? 1 : 1.02 }}
                    whileTap={{ scale: isPending ? 1 : 0.98 }}
                    className={`w-full bg-[#911b1e] text-[#fcf7dc] py-4 rounded-lg text-lg
                              hover:bg-[#911b1e]/90 transition-all duration-300
                              disabled:opacity-50 disabled:cursor-not-allowed
                              flex items-center justify-center gap-2 ${raleway.className}`}
                >
                    {isPending ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Registering for Tournament...
                        </>
                    ) : (
                        <>
                            <Trophy className="w-5 h-5" />
                            Register for DS Energy Tournament
                        </>
                    )}
                </motion.button>

                <p className={`text-[#911b1e]/60 text-sm text-center ${raleway.className}`}>
                    By submitting this form, you agree to our terms and conditions.
                    We'll contact you within 24 hours to confirm your registration.
                </p>
            </form>
        </motion.div>
    );
};

export default TournamentRegistrationForm; 