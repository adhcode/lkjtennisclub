import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const members = await db.member.findMany({
      orderBy: {
        createdAt: 'desc'
      },
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
        createdAt: true,
      }
    });

    return NextResponse.json({
      success: true,
      count: members.length,
      members
    });
  } catch (error) {
    console.error('Error fetching members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 }
    );
  }
}
