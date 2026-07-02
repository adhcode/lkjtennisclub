import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { phone, address, city, state, postalCode } = body;

    const user = session.user as { id: string; email: string };

    // Check if user exists first
    const existingUser = await db.user.findUnique({
      where: { id: user.id },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          error: 'User not found',
          message: 'Please sign out and sign back in to refresh your session',
        },
        { status: 404 }
      );
    }

    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: {
        phone,
        address,
        city,
        state,
        postalCode,
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        phone: updatedUser.phone,
        address: updatedUser.address,
        city: updatedUser.city,
        state: updatedUser.state,
        postalCode: updatedUser.postalCode,
      },
    });
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    console.log('Address update error:', errorMessage);
    return NextResponse.json(
      { error: 'Failed to update address', details: errorMessage },
      { status: 500 }
    );
  }
}
