import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Only admins can view requests
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const requests = await db.productRequest.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(requests);
  } catch (error) {
    console.error('Failed to fetch product requests:', error);
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, productName, description } = body;

    // Save to database
    const productRequest = await db.productRequest.create({
      data: {
        customerName: name,
        customerEmail: email,
        customerPhone: phone || null,
        productName,
        description: description || null,
        status: 'pending',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Product request submitted successfully',
      request: productRequest,
    });
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : 'Unknown error';
    console.log('Product request error:', errorMessage);
    return NextResponse.json(
      { error: 'Failed to submit request' },
      { status: 500 }
    );
  }
}
