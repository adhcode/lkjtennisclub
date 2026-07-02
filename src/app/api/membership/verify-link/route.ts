import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

// Import the shared verification codes map
// In production, use Redis or a database table
export const verificationCodes = new Map<string, { code: string; expires: number }>();

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
    const { membershipId, verificationCode } = body;

    if (!membershipId || !verificationCode) {
      return NextResponse.json(
        { error: 'Membership ID and verification code are required' },
        { status: 400 }
      );
    }

    // Check verification code
    const stored = verificationCodes.get(membershipId);

    if (!stored) {
      return NextResponse.json(
        { error: 'Verification code expired or invalid' },
        { status: 400 }
      );
    }

    if (stored.expires < Date.now()) {
      verificationCodes.delete(membershipId);
      return NextResponse.json(
        { error: 'Verification code expired' },
        { status: 400 }
      );
    }

    if (stored.code !== verificationCode) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // Code is valid, link the membership
    const user = session.user as { id: string; email: string };

    // First get the member to check current email
    const existingMember = await db.member.findUnique({
      where: { membershipId: membershipId.toUpperCase() },
    });

    if (!existingMember) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      );
    }

    // Update the member with userId and optionally update email if not set
    const member = await db.member.update({
      where: { membershipId: membershipId.toUpperCase() },
      data: {
        userId: user.id,
        email: existingMember.email || user.email,
      },
    });

    // Clean up verification code
    verificationCodes.delete(membershipId);

    return NextResponse.json({
      success: true,
      member: {
        membershipId: member.membershipId,
        firstName: member.firstName,
        lastName: member.lastName,
      },
      message: 'Membership linked successfully'
    });
  } catch (error) {
    console.error('Membership verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify and link membership' },
      { status: 500 }
    );
  }
}
