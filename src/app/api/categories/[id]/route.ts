import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, description, icon, active, order } = body;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const category = await db.category.update({
      where: { id: params.id },
      data: {
        name,
        slug,
        description,
        icon,
        active,
        order,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error('Failed to update category:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.category.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
