import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { generateMemberQRCodeBuffer } from '@/lib/qrcode'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ membershipId: string }> }
) {
  try {
    const { membershipId } = await context.params
    
    // Find the member
    const member = await prisma.member.findUnique({
      where: {
        membershipId: membershipId
      }
    })

    if (!member) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      )
    }

    // Generate QR code buffer
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const qrCodeBuffer = await generateMemberQRCodeBuffer(membershipId, baseUrl)

    // Return the QR code as a downloadable PNG
    return new NextResponse(qrCodeBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="${member.firstName}_${member.lastName}_QR_${membershipId}.png"`,
        'Cache-Control': 'public, max-age=31536000',
      },
    })

  } catch (error) {
    console.error('Error generating QR code download:', error)
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    )
  }
}