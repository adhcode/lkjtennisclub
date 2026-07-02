import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { sendVerificationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user (not verified yet)
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'member',
        emailVerified: null, // Not verified yet
      },
    });

    // Create verification token in database
    await db.verificationToken.create({
      data: {
        identifier: email,
        token: verificationToken,
        expires: tokenExpiry,
      },
    });

    // Send verification email
    try {
      const emailResult = await sendVerificationEmail(email, verificationToken);
      console.log('Email send result:', emailResult);
      
      if (!emailResult.success) {
        console.error('Failed to send verification email:', emailResult.error);
        // Still return success - user is created, they can try again later
      }
    } catch (emailError) {
      console.error('Error sending verification email:', emailError);
      // Still return success - user is created
    }

    return NextResponse.json(
      { 
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        message: 'Please check your email to verify your account'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
