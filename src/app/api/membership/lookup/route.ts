import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { sendMembershipVerificationEmail } from '@/lib/email';
import crypto from 'crypto';

// Import shared verification codes from verify-link route
import { verificationCodes } from '../verify-link/route';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { membershipId } = body;

    if (!membershipId) {
      return NextResponse.json(
        { error: 'Membership ID is required' },
        { status: 400 }
      );
    }

    // Look up member
    const member = await db.member.findUnique({
      where: { membershipId: membershipId.toUpperCase() },
      select: {
        id: true,
        membershipId: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        userId: true,
      },
    });

    if (!member) {
      return NextResponse.json(
        { error: 'Membership ID not found' },
        { status: 404 }
      );
    }

    // Check if already linked to another user
    if (member.userId && member.userId !== (session.user as any).id) {
      return NextResponse.json(
        { error: 'This membership is already linked to another account' },
        { status: 400 }
      );
    }

    // Generate 6-digit verification code
    const code = crypto.randomInt(100000, 999999).toString();
    const expires = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store code
    verificationCodes.set(membershipId, { code, expires });

    // Send verification email
    const emailResult = await sendMembershipVerificationEmail(
      member.email,
      `${member.firstName} ${member.lastName}`,
      member.membershipId,
      code
    );

    if (!emailResult.success) {
      console.error('Failed to send verification email');
      return NextResponse.json(
        { error: 'Failed to send verification email. Please try again.' },
        { status: 500 }
      );
    }

    console.log(`Verification code sent to ${member.email} for ${membershipId}`);

    // In development, return the code (remove in production!)
    const isDevelopment = process.env.NODE_ENV === 'development';

    return NextResponse.json({
      member: {
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        phone: member.phone,
      },
      ...(isDevelopment && { devCode: code }),
      message: 'Verification code sent to your email'
    });
  } catch (error) {
    console.error('Membership lookup error:', error);
    return NextResponse.json(
      { error: 'Failed to lookup membership' },
      { status: 500 }
    );
  }
}
