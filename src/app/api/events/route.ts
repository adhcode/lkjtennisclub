import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'published';
    const featured = searchParams.get('featured');
    const heroBanner = searchParams.get('heroBanner');
    
    const where: any = {};
    
    if (status !== 'all') {
      where.status = status;
    }
    
    if (featured === 'true') {
      where.featured = true;
    }

    if (heroBanner === 'true') {
      where.showInHeroBanner = true;
      where.status = 'published';
    }

    const events = await db.event.findMany({
      where,
      include: {
        _count: {
          select: {
            registrations: {
              where: {
                status: 'confirmed'
              }
            }
          }
        }
      },
      orderBy: {
        startDate: 'desc',
      },
      take: heroBanner === 'true' ? 10 : undefined, // Return up to 10 events for hero banner
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Events fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      slug,
      description,
      content,
      startDate,
      endDate,
      location,
      price,
      maxParticipants,
      featuredImage,
      images,
      status,
      featured,
      requiresRegistration,
      registrationDeadline,
      metaTitle,
      metaDescription,
    } = body;

    const existing = await db.event.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Event with this slug already exists' },
        { status: 400 }
      );
    }

    const event = await db.event.create({
      data: {
        title,
        slug,
        description,
        content,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        location,
        price: price || 0,
        maxParticipants,
        featuredImage,
        images: images || [],
        status: status || 'draft',
        featured: featured || false,
        requiresRegistration: requiresRegistration || false,
        registrationDeadline: registrationDeadline ? new Date(registrationDeadline) : null,
        metaTitle,
        metaDescription,
      },
      include: {
        _count: {
          select: {
            registrations: true
          }
        }
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Event creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
