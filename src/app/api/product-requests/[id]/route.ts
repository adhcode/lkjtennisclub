import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    // Only admins can update status
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { status } = body;

    const productRequest = await db.productRequest.update({
      where: { id: params.id },
      data: { status },
    });

    return NextResponse.json(productRequest);
  } catch (error) {
    console.error('Product request update error:', error);
    return NextResponse.json(
      { error: 'Failed to update product request' },
      { status: 500 }
    );
  }
}
