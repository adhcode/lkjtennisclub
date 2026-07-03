import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    const where: Record<string, string | boolean> = { status: 'active' };
    
    if (category && category !== 'all') {
      where.category = category;
    }
    
    if (featured === 'true') {
      where.featured = true;
    }

    const products = await db.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products || [], {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Products fetch error:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
    }
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      description,
      price,
      category,
      images,
      stock,
      featured,
      sizes,
      colors,
      brand,
    } = body;

    // Check if slug already exists
    const existing = await db.product.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Product with this name already exists' },
        { status: 400 }
      );
    }

    // Handle category - find or create
    let categoryId: string | undefined;
    if (category) {
      const categorySlug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      let categoryRecord = await db.category.findUnique({
        where: { slug: categorySlug },
      });
      
      if (!categoryRecord) {
        // Create category if it doesn't exist
        categoryRecord = await db.category.create({
          data: {
            name: category.charAt(0).toUpperCase() + category.slice(1),
            slug: categorySlug,
          },
        });
      }
      categoryId = categoryRecord.id;
    }

    // Handle brand - find or create
    let brandId: string | undefined;
    if (brand) {
      const brandSlug = brand.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      let brandRecord = await db.brand.findUnique({
        where: { slug: brandSlug },
      });
      
      if (!brandRecord) {
        // Create brand if it doesn't exist
        brandRecord = await db.brand.create({
          data: {
            name: brand,
            slug: brandSlug,
          },
        });
      }
      brandId = brandRecord.id;
    }

    const product = await db.product.create({
      data: {
        name,
        slug,
        description,
        price,
        ...(categoryId && { categoryId }),
        ...(brandId && { brandId }),
        images,
        stock,
        featured: featured || false,
        sizes: sizes || [],
        colors: colors || [],
        status: 'active',
      },
      include: {
        category: true,
        brand: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Product creation error:', error instanceof Error ? error.message : String(error));
    return NextResponse.json(
      { error: 'Failed to create product', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
