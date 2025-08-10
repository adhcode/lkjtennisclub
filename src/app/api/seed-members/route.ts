import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { generateMemberQRCode } from '@/lib/qrcode'
import { headers } from 'next/headers'

export async function POST() {
  try {
    const hdrs = await headers()
    const host = hdrs.get('x-forwarded-host') || hdrs.get('host')
    const proto = hdrs.get('x-forwarded-proto') || 'http'
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (host ? `${proto}://${host}` : 'http://localhost:3000')
    
    // Sample members data
    const sampleMembers = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+234-801-234-5678',
        membershipType: 'regular',
        skillLevel: 'intermediate',
        playingHand: 'right',
        bio: 'Passionate tennis player with 5 years of experience. Love playing doubles matches.',
        address: '123 Tennis Street, Lagos, Nigeria',
        emergencyContact: 'Jane Doe',
        emergencyPhone: '+234-802-345-6789',
        expiryDate: new Date('2025-12-31'),
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
      },
      {
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@example.com',
        phone: '+234-803-456-7890',
        membershipType: 'regular',
        skillLevel: 'beginner',
        playingHand: 'left',
        bio: 'New to tennis but very enthusiastic about learning. Looking forward to improving my game.',
        address: '456 Court Avenue, Abuja, Nigeria',
        emergencyContact: 'Mike Johnson',
        emergencyPhone: '+234-804-567-8901',
        expiryDate: new Date('2025-06-30'),
        profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'
      },
      {
        firstName: 'David',
        lastName: 'Williams',
        email: 'david.williams@example.com',
        phone: '+234-805-678-9012',
        membershipType: 'student',
        skillLevel: 'advanced',
        playingHand: 'right',
        bio: 'University student and competitive tennis player. Member of the university tennis team.',
        address: '789 University Road, Ibadan, Nigeria',
        emergencyContact: 'Mary Williams',
        emergencyPhone: '+234-806-789-0123',
        expiryDate: new Date('2025-08-31'),
        profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
      },
      {
        firstName: 'Lisa',
        lastName: 'Brown',
        email: 'lisa.brown@example.com',
        phone: '+234-807-890-1234',
        membershipType: 'family',
        skillLevel: 'intermediate',
        playingHand: 'right',
        bio: 'Family membership holder. Enjoys playing tennis with my children on weekends.',
        address: '321 Family Close, Port Harcourt, Nigeria',
        emergencyContact: 'Robert Brown',
        emergencyPhone: '+234-808-901-2345',
        expiryDate: new Date('2026-01-31'),
        profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
      },
      {
        firstName: 'Ahmed',
        lastName: 'Ibrahim',
        email: 'ahmed.ibrahim@example.com',
        phone: '+234-809-012-3456',
        membershipType: 'corporate',
        skillLevel: 'advanced',
        playingHand: 'left',
        bio: 'Corporate member representing ABC Company. Plays in inter-company tournaments.',
        address: '456 Business District, Lagos, Nigeria',
        emergencyContact: 'Fatima Ibrahim',
        emergencyPhone: '+234-810-123-4567',
        expiryDate: new Date('2025-09-30'),
        profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face'
      }
    ]

    const createdMembers = []

    for (const memberData of sampleMembers) {
      // Generate unique membership ID in format LTC-YY-XXX-XX
      const year = new Date().getFullYear().toString().slice(-2)
      const sequence = (Date.now() + Math.random() * 1000).toString().slice(-3)
      const suffix = Math.random().toString(36).substring(2, 4).toUpperCase()
      const membershipId = `LTC-${year}-${sequence}-${suffix}`
      
      // Create member
      const member = await prisma.member.create({
        data: {
          ...memberData,
          membershipId,
          dateOfBirth: new Date('1990-01-01'), // Sample date
          gender: memberData.firstName === 'Sarah' || memberData.firstName === 'Lisa' ? 'female' : 'male' // Sample gender
        }
      })

      // Generate QR code
      const qrCodeUrl = await generateMemberQRCode(membershipId, baseUrl)

      // Update member with QR code
      const updatedMember = await prisma.member.update({
        where: { id: member.id },
        data: { qrCodeUrl }
      })

      createdMembers.push(updatedMember)
    }

    return NextResponse.json({
      success: true,
      message: `Successfully created ${createdMembers.length} sample members`,
      members: createdMembers.map(m => ({
        id: m.id,
        name: `${m.firstName} ${m.lastName}`,
        membershipId: m.membershipId,
        profileUrl: `${baseUrl}/member/${m.membershipId}`
      }))
    })

  } catch (error) {
    console.error('Error seeding members:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create sample members' },
      { status: 500 }
    )
  }
}