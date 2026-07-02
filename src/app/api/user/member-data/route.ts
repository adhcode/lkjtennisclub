import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = session.user as { id: string };

    // Find member linked to this user
    const member = await db.member.findFirst({
      where: { userId: user.id },
      select: {
        id: true,
        membershipId: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        membershipType: true,
        membershipStatus: true,
        joinDate: true,
        expiryDate: true,
        qrCodeUrl: true,
      },
    });

    if (!member) {
      return NextResponse.json(
        { member: null },
        { status: 200 }
      );
    }

    return NextResponse.json({
      member: {
        membershipId: member.membershipId,
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        phone: member.phone,
        membershipType: member.membershipType,
        membershipStatus: member.membershipStatus,
        joinDate: member.joinDate,
        expiryDate: member.expiryDate,
        qrCodeUrl: member.qrCodeUrl,
      },
    });
  } catch (error) {
    console.error('Failed to fetch member data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch member data' },
      { status: 500 }
    );
  }
}
