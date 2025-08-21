'use server';

import { prisma } from '@/lib/db';

export interface RegistrationData {
    parentName: string;
    parentEmail: string;
    parentPhone: string;
    childName: string;
    childAge: string;
    childGender: string;
    experienceLevel: string;
    medicalConditions: string;
    emergencyContact: string;
    emergencyPhone: string;
    specialRequests: string;
}

export interface TournamentRegistrationData {
    participantName: string;
    participantEmail: string;
    participantPhone: string;
    category: string;
    emergencyContact: string;
    emergencyPhone: string;
    medicalConditions: string;
    specialRequests: string;
}

// Tournament capacity limits
const TOURNAMENT_CAPACITY = {
    men: 16,
    women: 2,
    kids: 6
};

export async function submitRegistration(formData: FormData) {
    try {
        // Extract form data
        const registrationData: RegistrationData = {
            parentName: formData.get('parentName') as string,
            parentEmail: formData.get('parentEmail') as string,
            parentPhone: formData.get('parentPhone') as string,
            childName: formData.get('childName') as string,
            childAge: formData.get('childAge') as string,
            childGender: formData.get('childGender') as string,
            experienceLevel: formData.get('experienceLevel') as string,
            medicalConditions: formData.get('medicalConditions') as string,
            emergencyContact: formData.get('emergencyContact') as string,
            emergencyPhone: formData.get('emergencyPhone') as string,
            specialRequests: formData.get('specialRequests') as string,
        };

        // Validate required fields
        const requiredFields = [
            'parentName', 'parentEmail', 'parentPhone', 
            'childName', 'childAge', 'childGender', 
            'experienceLevel', 'emergencyContact', 'emergencyPhone'
        ];

        for (const field of requiredFields) {
            if (!registrationData[field as keyof RegistrationData]) {
                throw new Error(`${field} is required`);
            }
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(registrationData.parentEmail)) {
            throw new Error('Invalid email format');
        }

        // Save to database
        const registration = await prisma.registration.create({
            data: {
                parentName: registrationData.parentName,
                parentEmail: registrationData.parentEmail,
                parentPhone: registrationData.parentPhone,
                childName: registrationData.childName,
                childAge: parseInt(registrationData.childAge),
                childGender: registrationData.childGender,
                experienceLevel: registrationData.experienceLevel,
                emergencyContact: registrationData.emergencyContact,
                emergencyPhone: registrationData.emergencyPhone,
                medicalConditions: registrationData.medicalConditions || null,
                specialRequests: registrationData.specialRequests || null,
            }
        });

        console.log('Registration saved to database:', registration.id);

        // Send confirmation email (you can implement this later)
        await sendConfirmationEmail(registrationData);

        // Send admin notification (you can implement this later)
        await sendAdminNotification(registrationData);

        return {
            success: true,
            message: 'Registration submitted successfully! We will contact you soon.',
            data: {
                ...registrationData,
                id: registration.id
            }
        };

    } catch (error) {
        console.error('Registration error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Registration failed. Please try again.',
            data: null
        };
    }
}

export async function submitTournamentRegistration(formData: FormData) {
    try {
        // Extract form data
        const registrationData: TournamentRegistrationData = {
            participantName: formData.get('participantName') as string,
            participantEmail: formData.get('participantEmail') as string,
            participantPhone: formData.get('participantPhone') as string,
            category: formData.get('category') as string,
            emergencyContact: formData.get('emergencyContact') as string,
            emergencyPhone: formData.get('emergencyPhone') as string,
            medicalConditions: formData.get('medicalConditions') as string,
            specialRequests: formData.get('specialRequests') as string,
        };

        // Validate required fields
        const requiredFields = [
            'participantName', 'participantEmail', 'participantPhone',
            'category', 'emergencyContact', 'emergencyPhone'
        ];

        for (const field of requiredFields) {
            if (!registrationData[field as keyof TournamentRegistrationData]) {
                throw new Error(`${field} is required`);
            }
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(registrationData.participantEmail)) {
            throw new Error('Invalid email format');
        }

        // Validate category
        if (!['men', 'women', 'kids'].includes(registrationData.category)) {
            throw new Error('Invalid category selected');
        }

        // Check category capacity
        const currentCount = await prisma.tournamentRegistration.count({
            where: {
                category: registrationData.category,
                status: { not: 'cancelled' }
            }
        });

        const categoryLimit = TOURNAMENT_CAPACITY[registrationData.category as keyof typeof TOURNAMENT_CAPACITY];
        
        if (currentCount >= categoryLimit) {
            throw new Error(`Sorry, the ${registrationData.category} category is full. Maximum ${categoryLimit} participants allowed.`);
        }

        // Save to database
        const registration = await prisma.tournamentRegistration.create({
            data: {
                participantName: registrationData.participantName,
                participantEmail: registrationData.participantEmail,
                participantPhone: registrationData.participantPhone,
                category: registrationData.category,
                emergencyContact: registrationData.emergencyContact,
                emergencyPhone: registrationData.emergencyPhone,
                medicalConditions: registrationData.medicalConditions || null,
                specialRequests: registrationData.specialRequests || null,
            }
        });

        console.log('Tournament registration saved:', registration.id);

        // Send confirmation email (placeholder)
        await sendTournamentConfirmationEmail(registrationData);

        // Send admin notification (placeholder)
        await sendTournamentAdminNotification(registrationData);

        return {
            success: true,
            message: 'Tournament registration submitted successfully! We will contact you soon.',
            data: {
                ...registrationData,
                id: registration.id,
                remainingSpots: categoryLimit - (currentCount + 1)
            }
        };

    } catch (error) {
        console.error('Tournament registration error:', error);
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Registration failed. Please try again.',
            data: null
        };
    }
}


// Helper function to send confirmation email
async function sendConfirmationEmail(data: RegistrationData) {
    // This would typically use an email service like SendGrid, Nodemailer, etc.
    /*
    const emailService = new EmailService();
    await emailService.send({
        to: data.parentEmail,
        subject: 'Tennis Camp Registration Confirmation',
        template: 'registration-confirmation',
        data: data
    });
    */
    console.log('Sending confirmation email to:', data.parentEmail);
}

// Helper function to send admin notification
async function sendAdminNotification(data: RegistrationData) {
    // This would notify the admin about new registration
    /*
    const adminEmail = 'admin@lkjtennisclub.com';
    const emailService = new EmailService();
    await emailService.send({
        to: adminEmail,
        subject: 'New Tennis Camp Registration',
        template: 'admin-notification',
        data: data
    });
    */
    console.log('Sending admin notification for:', data.childName);
}

// Helper function to send tournament confirmation email
async function sendTournamentConfirmationEmail(data: TournamentRegistrationData) {
    // This would typically use an email service like SendGrid, Nodemailer, etc.
    /*
    const emailService = new EmailService();
    await emailService.send({
        to: data.participantEmail,
        subject: 'Tennis Camp Tournament Registration Confirmation',
        template: 'tournament-confirmation',
        data: data
    });
    */
    console.log('Sending tournament confirmation email to:', data.participantEmail);
}

// Helper function to send tournament admin notification
async function sendTournamentAdminNotification(data: TournamentRegistrationData) {
    // This would notify the admin about new tournament registration
    /*
    const adminEmail = 'admin@lkjtennisclub.com';
    const emailService = new EmailService();
    await emailService.send({
        to: adminEmail,
        subject: 'New Tennis Camp Tournament Registration',
        template: 'tournament-admin-notification',
        data: data
    });
    */
    console.log('Sending tournament admin notification for:', data.participantName);
}