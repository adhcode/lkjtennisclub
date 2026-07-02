import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Check all tables
    const [
      members,
      users,
      registrations,
      tournamentRegistrations,
      products,
      orders
    ] = await Promise.all([
      db.member.count(),
      db.user.count(),
      db.registration.count(),
      db.tournamentRegistration.count(),
      db.product.count(),
      db.order.count(),
    ]);

    // Get sample data if exists
    const sampleMember = await db.member.findFirst({
      orderBy: { createdAt: 'desc' }
    });

    const sampleUser = await db.user.findFirst({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      counts: {
        members,
        users,
        registrations,
        tournamentRegistrations,
        products,
        orders
      },
      samples: {
        member: sampleMember,
        user: sampleUser
      }
    });
  } catch (error) {
    console.error('Error checking data:', error);
    return NextResponse.json(
      { error: 'Failed to check data', details: error },
      { status: 500 }
    );
  }
}
