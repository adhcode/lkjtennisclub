'use client';

import { Raleway } from 'next/font/google';
import { motion } from 'framer-motion';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { User, Phone, Users, AlertCircle, Plus, Minus, Loader2 } from 'lucide-react';
import { submitRegistration } from '@/app/actions/registration';
import CustomSelect from './CustomSelect';

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['400'],
});

interface ChildData {
    childName: string;
    childAge: string;
    childGender: string;
    experienceLevel: string;
    medicalConditions: string;
    specialRequests: string;
}

interface FormData {
    parentName: string;
    parentEmail: string;
    parentPhone: string;
    emergencyContact: string;
    emergencyPhone: string;
    children: ChildData[];
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

const RegistrationForm = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [formData, setFormData] = useState<FormData>({
        parentName: '',
        parentEmail: '',
        parentPhone: '',
        emergencyContact: '',
        emergencyPhone: '',
        children: [{
            childName: '',
            childAge: '',
            childGender: '',
            experienceLevel: '',
            medicalConditions: '',
            specialRequests: '',
        }]
    });

    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    // Options for select fields
    const ageOptions = Array.from({ length: 14 }, (_, i) => ({
        value: (i + 4).toString(),
        label: `${i + 4} years old`
    }));

    const genderOptions = [
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
    ];

    const experienceOptions = [
        { value: 'beginner', label: 'Beginner (Never played)' },
        { value: 'novice', label: 'Novice (Some experience)' },
        { value: 'intermediate', label: 'Intermediate (Regular player)' },
        { value: 'advanced', label: 'Advanced (Competitive player)' }
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

    const handleChildInputChange = (childIndex: number, field: keyof ChildData, value: string) => {
        setFormData(prev => ({
            ...prev,
            children: prev.children.map((child, index) =>
                index === childIndex ? { ...child, [field]: value } : child
            )
        }));

        // Clear field error
        const errorKey = `children.${childIndex}.${field}`;
        if (fieldErrors[errorKey]) {
            setFieldErrors((prev: Record<string, string>) => ({
                ...prev,
                [errorKey]: ''
            }));
        }
    };

    const addChild = () => {
        setFormData(prev => ({
            ...prev,
            children: [...prev.children, {
                childName: '',
                childAge: '',
                childGender: '',
                experienceLevel: '',
                medicalConditions: '',
                specialRequests: '',
            }]
        }));
    };

    const removeChild = (index: number) => {
        if (formData.children.length > 1) {
            setFormData(prev => ({
                ...prev,
                children: prev.children.filter((_, i) => i !== index)
            }));
        }
    };

    const validateForm = (): boolean => {
        const errors: Record<string, string> = {};

        // Parent validation
        if (!formData.parentName.trim()) {
            errors.parentName = 'Parent name is required';
        }
        if (!formData.parentEmail.trim()) {
            errors.parentEmail = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail)) {
            errors.parentEmail = 'Please enter a valid email address';
        }
        if (!formData.parentPhone.trim()) {
            errors.parentPhone = 'Phone number is required';
        } else if (!/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.parentPhone)) {
            errors.parentPhone = 'Please enter a valid phone number';
        }
        if (!formData.emergencyContact.trim()) {
            errors.emergencyContact = 'Emergency contact is required';
        }
        if (!formData.emergencyPhone.trim()) {
            errors.emergencyPhone = 'Emergency phone is required';
        } else if (!/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.emergencyPhone)) {
            errors.emergencyPhone = 'Please enter a valid phone number';
        }

        // Children validation
        formData.children.forEach((child, index) => {
            if (!child.childName.trim()) {
                errors[`children.${index}.childName`] = 'Child name is required';
            }
            if (!child.childAge.trim()) {
                errors[`children.${index}.childAge`] = 'Age is required';
            }
            if (!child.childGender.trim()) {
                errors[`children.${index}.childGender`] = 'Gender is required';
            }
            if (!child.experienceLevel.trim()) {
                errors[`children.${index}.experienceLevel`] = 'Experience level is required';
            }
        });

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
                // Submit each child separately
                const results = await Promise.all(
                    formData.children.map(async (child) => {
                        const childFormData = new FormData();
                        childFormData.append('parentName', formData.parentName);
                        childFormData.append('parentEmail', formData.parentEmail);
                        childFormData.append('parentPhone', formData.parentPhone);
                        childFormData.append('emergencyContact', formData.emergencyContact);
                        childFormData.append('emergencyPhone', formData.emergencyPhone);
                        childFormData.append('childName', child.childName);
                        childFormData.append('childAge', child.childAge);
                        childFormData.append('childGender', child.childGender);
                        childFormData.append('experienceLevel', child.experienceLevel);
                        childFormData.append('medicalConditions', child.medicalConditions);
                        childFormData.append('specialRequests', child.specialRequests);

                        return await submitRegistration(childFormData);
                    })
                );

                const failedRegistrations = results.filter(result => !result.success);

                if (failedRegistrations.length === 0) {
                    // All successful - redirect immediately
                    router.push(`/events/summer-camp-registration/confirmation?children=${formData.children.length}`);
                } else {
                    setErrorMessage(`Failed to register ${failedRegistrations.length} child(ren). Please try again.`);
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

            <form onSubmit={handleSubmit} id="registration-form" className="space-y-8">
                {/* Parent Information */}
                <div>
                    <h3 className={`text-[#911b1e] text-xl mb-4 flex items-center gap-2 ${raleway.className}`}>
                        <User className="w-5 h-5" />
                        Parent/Guardian Information
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className={`block text-[#911b1e]/80 text-sm mb-2 ${raleway.className}`}>
                                Full Name *
                            </label>
                            <input
                                type="text"
                                name="parentName"
                                value={formData.parentName}
                                onChange={handleInputChange}
                                required
                                className={`w-full px-4 py-3 border ${fieldErrors.parentName ? 'border-red-500' : 'border-[#911b1e]/20'} rounded-lg 
                                          focus:border-[#911b1e] focus:outline-none transition-all duration-300
                                          bg-white/50 backdrop-blur-sm hover:bg-white/70 focus:bg-white/80
                                          focus:ring-2 focus:ring-[#911b1e]/20 ${raleway.className}`}
                                placeholder="Enter your full name"
                            />
                            <FieldError error={fieldErrors.parentName} />
                        </div>

                        <div>
                            <label className={`block text-[#911b1e]/80 text-sm mb-2 ${raleway.className}`}>
                                Email Address *
                            </label>
                            <input
                                type="email"
                                name="parentEmail"
                                value={formData.parentEmail}
                                onChange={handleInputChange}
                                required
                                className={`w-full px-4 py-3 border ${fieldErrors.parentEmail ? 'border-red-500' : 'border-[#911b1e]/20'} rounded-lg 
                                          focus:border-[#911b1e] focus:outline-none transition-all duration-300
                                          bg-white/50 backdrop-blur-sm hover:bg-white/70 focus:bg-white/80
                                          focus:ring-2 focus:ring-[#911b1e]/20 ${raleway.className}`}
                                placeholder="your.email@example.com"
                            />
                            <FieldError error={fieldErrors.parentEmail} />
                        </div>

                        <div>
                            <label className={`block text-[#911b1e]/80 text-sm mb-2 ${raleway.className}`}>
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                name="parentPhone"
                                value={formData.parentPhone}
                                onChange={handleInputChange}
                                required
                                className={`w-full px-4 py-3 border ${fieldErrors.parentPhone ? 'border-red-500' : 'border-[#911b1e]/20'} rounded-lg 
                                          focus:border-[#911b1e] focus:outline-none transition-all duration-300
                                          bg-white/50 backdrop-blur-sm hover:bg-white/70 focus:bg-white/80
                                          focus:ring-2 focus:ring-[#911b1e]/20 ${raleway.className}`}
                                placeholder="+234 xxx xxx xxxx"
                            />
                            <FieldError error={fieldErrors.parentPhone} />
                        </div>
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

                {/* Children Information */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`text-[#911b1e] text-xl flex items-center gap-2 ${raleway.className}`}>
                            <Users className="w-5 h-5" />
                            Children Information
                        </h3>
                        <motion.button
                            type="button"
                            onClick={addChild}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center gap-2 px-4 py-2 bg-[#911b1e]/10 text-[#911b1e] 
                                      rounded-lg hover:bg-[#911b1e]/20 transition-colors ${raleway.className}`}
                        >
                            <Plus className="w-4 h-4" />
                            Add Another Child
                        </motion.button>
                    </div>

                    {formData.children.map((child, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-8 p-6 bg-white/50 rounded-xl border border-[#911b1e]/10"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h4 className={`text-[#911b1e] text-lg ${raleway.className}`}>
                                    Child {index + 1}
                                </h4>
                                {formData.children.length > 1 && (
                                    <motion.button
                                        type="button"
                                        onClick={() => removeChild(index)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 px-3 py-1 text-red-600 hover:bg-red-50 
                                                 rounded-lg transition-colors text-sm"
                                    >
                                        <Minus className="w-4 h-4" />
                                        Remove
                                    </motion.button>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className={`block text-[#911b1e]/80 text-sm mb-2 ${raleway.className}`}>
                                        Child's Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={child.childName}
                                        onChange={(e) => handleChildInputChange(index, 'childName', e.target.value)}
                                        required
                                        className={`w-full px-4 py-3 border ${fieldErrors[`children.${index}.childName`] ? 'border-red-500' : 'border-[#911b1e]/20'} rounded-lg 
                                                  focus:border-[#911b1e] focus:outline-none transition-all duration-300
                                                  bg-white/50 backdrop-blur-sm hover:bg-white/70 focus:bg-white/80
                                                  focus:ring-2 focus:ring-[#911b1e]/20 ${raleway.className}`}
                                        placeholder="Enter child's full name"
                                    />
                                    <FieldError error={fieldErrors[`children.${index}.childName`]} />
                                </div>

                                <div>
                                    <label className={`block text-[#911b1e]/80 text-sm mb-2 ${raleway.className}`}>
                                        Age *
                                    </label>
                                    <CustomSelect
                                        options={ageOptions}
                                        value={child.childAge}
                                        onChange={(value) => handleChildInputChange(index, 'childAge', value)}
                                        placeholder="Select age"
                                        name={`childAge_${index}`}
                                        required
                                        error={!!fieldErrors[`children.${index}.childAge`]}
                                    />
                                    <FieldError error={fieldErrors[`children.${index}.childAge`]} />
                                </div>

                                <div>
                                    <label className={`block text-[#911b1e]/80 text-sm mb-2 ${raleway.className}`}>
                                        Gender *
                                    </label>
                                    <CustomSelect
                                        options={genderOptions}
                                        value={child.childGender}
                                        onChange={(value) => handleChildInputChange(index, 'childGender', value)}
                                        placeholder="Select gender"
                                        name={`childGender_${index}`}
                                        required
                                        error={!!fieldErrors[`children.${index}.childGender`]}
                                    />
                                    <FieldError error={fieldErrors[`children.${index}.childGender`]} />
                                </div>

                                <div>
                                    <label className={`block text-[#911b1e]/80 text-sm mb-2 ${raleway.className}`}>
                                        Tennis Experience Level *
                                    </label>
                                    <CustomSelect
                                        options={experienceOptions}
                                        value={child.experienceLevel}
                                        onChange={(value) => handleChildInputChange(index, 'experienceLevel', value)}
                                        placeholder="Select experience level"
                                        name={`experienceLevel_${index}`}
                                        required
                                        error={!!fieldErrors[`children.${index}.experienceLevel`]}
                                    />
                                    <FieldError error={fieldErrors[`children.${index}.experienceLevel`]} />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label className={`block text-[#911b1e]/80 text-sm mb-2 ${raleway.className}`}>
                                        Medical Conditions or Allergies
                                    </label>
                                    <textarea
                                        value={child.medicalConditions}
                                        onChange={(e) => handleChildInputChange(index, 'medicalConditions', e.target.value)}
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
                                        value={child.specialRequests}
                                        onChange={(e) => handleChildInputChange(index, 'specialRequests', e.target.value)}
                                        rows={3}
                                        className={`w-full px-4 py-3 border border-[#911b1e]/20 rounded-lg 
                                                  focus:border-[#911b1e] focus:outline-none transition-all duration-300
                                                  bg-white/50 backdrop-blur-sm hover:bg-white/70 focus:bg-white/80
                                                  focus:ring-2 focus:ring-[#911b1e]/20 resize-none ${raleway.className}`}
                                        placeholder="Any special requests for this child..."
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
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
                            Registering {formData.children.length} Child{formData.children.length > 1 ? 'ren' : ''}...
                        </>
                    ) : (
                        `Register ${formData.children.length} Child${formData.children.length > 1 ? 'ren' : ''} for Summer Camp`
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

export default RegistrationForm;