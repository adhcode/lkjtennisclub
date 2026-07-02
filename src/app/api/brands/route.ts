import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const brands = await db.brand.findMany({
      where: { active: true },
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: { products: true }
        }
      }
    });

    return NextResponse.json(brands);
  } catch (error) {
    console.error('Failed to fetch brands:', error);
    return NextResponse.json(
      { error: 'Failed to fetch brands' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, logo, website } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const brand = await db.brand.create({
      data: {
        name,
        slug,
        description,
        logo,
        website,
      },
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.error('Failed to create brand:', error);
    return NextResponse.json(
      { error: 'Failed to create brand' },
      { status: 500 }
    );
  }
}
