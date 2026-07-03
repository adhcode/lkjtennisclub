import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/db';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function POST(request: NextRequest) {
  try {
    // Get the signature from headers
    const signature = request.headers.get('x-paystack-signature');
    
    if (!signature || !PAYSTACK_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Get the raw body
    const body = await request.text();
    
    // Verify the signature
    const hash = crypto
      .createHmac('sha512', PAYSTACK_SECRET_KEY)
      .update(body)
      .digest('hex');

    if (hash !== signature) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Parse the event
    const event = JSON.parse(body);

    // Handle different event types
    switch (event.event) {
      case 'charge.success':
        await handleSuccessfulCharge(event.data);
        break;
      
      case 'charge.failed':
        await handleFailedCharge(event.data);
        break;
      
      default:
        console.log('Unhandled event type:', event.event);
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

interface ChargeData {
  reference: string;
  amount: number;
  customer: {
    email: string;
  };
  [key: string]: unknown;
}

async function handleSuccessfulCharge(data: ChargeData) {
  try {
    const reference = data.reference;
    const amount = data.amount / 100; // Convert from kobo to naira
    const customerEmail = data.customer.email;

    console.log('✅ Payment successful:', reference);

    // Find order by payment reference
    const order = await db.order.findFirst({
      where: { paymentReference: reference },
    });

    if (order) {
      // Update existing order
      await db.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: 'paid',
          paymentMethod: 'paystack',
        },
      });
      console.log('✅ Order updated:', order.orderNumber);
    } else {
      // Order might not exist yet (race condition)
      // This is fine - the frontend will create it
      console.log('⚠️ Order not found for reference:', reference);
    }
  } catch (error) {
    console.error('Error handling successful charge:', error);
  }
}

async function handleFailedCharge(data: ChargeData) {
  try {
    const reference = data.reference;
    
    console.log('❌ Payment failed:', reference);

    // Find and update order
    const order = await db.order.findFirst({
      where: { paymentReference: reference },
    });

    if (order) {
      await db.order.update({
        where: { id: order.id },
        data: {
          paymentStatus: 'failed',
        },
      });
      console.log('❌ Order marked as failed:', order.orderNumber);
    }
  } catch (error) {
    console.error('Error handling failed charge:', error);
  }
}
