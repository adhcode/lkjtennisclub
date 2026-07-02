import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const event = await db.event.findUnique({
      where: { id },
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
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error('Event fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
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

    const event = await db.event.update({
      where: { id },
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
        status,
        featured,
        requiresRegistration,
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

    return NextResponse.json(event);
  } catch (error) {
    console.error('Event update error:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await db.event.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Event deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Allow multiple events to be shown in hero banner
    const event = await db.event.update({
      where: { id },
      data: body,
      include: {
        _count: {
          select: {
            registrations: true
          }
        }
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error('Event patch error:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}
