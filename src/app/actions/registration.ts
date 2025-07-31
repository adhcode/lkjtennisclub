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

// Helper function to simulate database save
async function saveRegistrationToDatabase(data: RegistrationData) {
    // This would typically connect to your database
    // For demo purposes, we'll simulate saving to a local file or database
    
    const registrationRecord = {
        id: `reg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...data,
        registrationDate: new Date().toISOString(),
        status: 'pending',
        paymentStatus: 'pending',
        campSession: 'Summer 2025',
        totalAmount: 25000 // ₦25,000
    };
    
    console.log('Saving registration to database:', registrationRecord);
    
    // In a real application, you would save to your database here:
    /*
    const db = await connectToDatabase();
    await db.collection('registrations').insertOne(registrationRecord);
    */
    
    return registrationRecord;
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