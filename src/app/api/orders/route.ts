import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { sendOrderConfirmationEmail } from '@/lib/email';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const orderNumber = searchParams.get('orderNumber');

        // If orderNumber is provided, fetch single order
        if (orderNumber) {
            const order = await db.order.findUnique({
                where: { orderNumber },
                include: {
                    orderItems: {
                        include: {
                            product: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                },
            });

            if (!order) {
                return NextResponse.json(
                    { error: 'Order not found' },
                    { status: 404 }
                );
            }

            return NextResponse.json(order);
        }

        // Otherwise fetch all orders
        const orders = await db.order.findMany({
            include: {
                orderItems: {
                    include: {
                        product: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(orders, {
            headers: {
                'Cache-Control': 'no-store',
            },
        });
    } catch (error) {
        console.error('Orders fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch orders' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        // Get session without using authOptions directly to avoid async API warnings
        let session = null;
        try {
            session = await getServerSession(authOptions);
        } catch (error) {
            // Session is optional, continue without it
            console.log('Session check skipped:', error);
        }

        const body = await request.json();
        const {
            customerName,
            customerEmail,
            customerPhone,
            shippingAddress,
            shippingCity,
            shippingState,
            paymentMethod,
            paymentReference,
            notes,
            items,
            subtotal,
            shipping,
            total,
        } = body;

        // Generate order number
        const orderNumber = `LKJ-${Date.now()}-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;

        // Create order with items
        const order = await db.order.create({
            data: {
                orderNumber,
                customerName,
                customerEmail,
                customerPhone,
                shippingAddress,
                shippingCity,
                shippingState,
                paymentMethod,
                paymentReference,
                notes,
                subtotal,
                shipping,
                total,
                status: 'pending',
                paymentStatus: paymentReference ? 'paid' : 'pending',
                // Link to user if authenticated
                ...(session?.user && { userId: (session.user as any).id }),
                orderItems: {
                    create: items.map((item: any) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price,
                        size: item.size,
                        color: item.color,
                    })),
                },
            },
            include: {
                orderItems: {
                    include: {
                        product: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        // Send order confirmation email (non-blocking)
        const emailItems = order.orderItems.map(item => ({
            name: item.product.name,
            quantity: item.quantity,
            price: item.price,
            size: item.size || undefined,
            color: item.color || undefined,
        }));

        // Send email asynchronously without blocking the response
        sendOrderConfirmationEmail(
            customerEmail,
            orderNumber,
            customerName,
            emailItems,
            subtotal,
            shipping,
            total,
            shippingAddress,
            shippingCity,
            shippingState
        ).then(result => {
            if (result.success) {
                console.log(`Order confirmation email sent to ${customerEmail}`);
            } else {
                console.error('Failed to send order confirmation email:', result.error);
            }
        }).catch(error => {
            console.error('Email sending error:', error);
        });

        return NextResponse.json(order, { status: 201 });
    } catch (error) {
        console.error('Order creation error:', error);
        return NextResponse.json(
            { error: 'Failed to create order' },
            { status: 500 }
        );
    }
}
