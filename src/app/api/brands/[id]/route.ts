import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, description, logo, website, active } = body;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const brand = await db.brand.update({
      where: { id: params.id },
      data: {
        name,
        slug,
        description,
        logo,
        website,
        active,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.error('Failed to update brand:', error);
    return NextResponse.json(
      { error: 'Failed to update brand' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.brand.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete brand:', error);
    return NextResponse.json(
      { error: 'Failed to delete brand' },
      { status: 500 }
    );
  }
}
