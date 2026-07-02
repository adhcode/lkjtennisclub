import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: NextRequest) {
  try {
    console.log('Testing email with API key:', process.env.RESEND_API_KEY?.substring(0, 10) + '...');

    const result = await resend.emails.send({
      from: 'LKJ Tennis Club <hello@lkjtennisclub.com>',
      to: 'delivered@resend.dev', // Resend test email
      subject: 'Test Email from LKJ Tennis Club',
      html: '<h1>Test Email</h1><p>If you receive this, email is working!</p>',
    });

    console.log('Email send result:', result);

    return NextResponse.json({
      success: true,
      result,
      message: 'Email sent successfully! Check the logs.'
    });
  } catch (error) {
    console.error('Email test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      details: error
    }, { status: 500 });
  }
}
