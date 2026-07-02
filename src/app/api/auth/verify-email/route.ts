import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendWelcomeEmail } from '@/lib/email';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Missing verification token' },
        { status: 400 }
      );
    }

    // Find the verification token
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.json(
        { error: 'Invalid verification token' },
        { status: 400 }
      );
    }

    // Check if token has expired
    if (verificationToken.expires < new Date()) {
      // Delete expired token
      await db.verificationToken.delete({
        where: { token },
      });
      
      return NextResponse.json(
        { error: 'Verification token has expired' },
        { status: 400 }
      );
    }

    // Find the user
    const user = await db.user.findUnique({
      where: { email: verificationToken.identifier },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update user as verified
    await db.user.update({
      where: { email: verificationToken.identifier },
      data: { emailVerified: new Date() },
    });

    // Delete the used token
    await db.verificationToken.delete({
      where: { token },
    });

    // Send welcome email
    await sendWelcomeEmail(user.email!, user.name || 'Member');

    // Redirect to success page
    return NextResponse.redirect(
      new URL('/auth/verify-success', request.url)
    );
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    );
  }
}
