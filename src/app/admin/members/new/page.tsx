import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { generateMemberQRCode } from '@/lib/qrcode'
import MemberForm from '@/components/MemberForm'

async function createMember(formData: FormData) {
  'use server'

  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const dateOfBirth = formData.get('dateOfBirth') as string
  const gender = formData.get('gender') as string
  const membershipType = formData.get('membershipType') as string
  const skillLevel = formData.get('skillLevel') as string
  const playingHand = formData.get('playingHand') as string
  const address = formData.get('address') as string
  const emergencyContact = formData.get('emergencyContact') as string
  const emergencyPhone = formData.get('emergencyPhone') as string
  const bio = formData.get('bio') as string
  const expiryDate = formData.get('expiryDate') as string
  const customMembershipId = formData.get('membershipId') as string
  const profileImage = formData.get('profileImage') as string

  // Use custom ID if provided, otherwise generate one
  let membershipId = customMembershipId?.trim()

  if (!membershipId) {
    // Auto-generate unique membership ID in format LTC/YY/XXX/XX
    const year = new Date().getFullYear().toString().slice(-2)
    const sequence = Date.now().toString().slice(-3)
    const suffix = Math.random().toString(36).substring(2, 4).toUpperCase()
    membershipId = `LTC-${year}-${sequence}-${suffix}`
  } else {
    // Ensure custom ID starts with LTC
    if (!membershipId.startsWith('LTC')) {
      membershipId = `LTC-${membershipId}`
    }
    // Replace slashes with hyphens for URL compatibility
    membershipId = membershipId.replace(/\//g, '-')
  }

  // Check if custom ID already exists
  const existingMember = await prisma.member.findUnique({
    where: { membershipId }
  })

  if (existingMember) {
    throw new Error(`Member ID ${membershipId} already exists. Please choose a different ID.`)
  }

  // Check if email already exists
  const existingByEmail = await prisma.member.findUnique({
    where: { email }
  })
  if (existingByEmail) {
    throw new Error(`Email ${email} already exists. Please use a different email.`)
  }

  try {
    // Create member in database
    const member = await prisma.member.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        gender: gender || null,
        membershipId,
        membershipType,
        skillLevel: skillLevel || null,
        playingHand: playingHand || null,
        address: address || null,
        emergencyContact: emergencyContact || null,
        emergencyPhone: emergencyPhone || null,
        bio: bio || null,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        profileImage: profileImage || null,
      }
    })

    // Generate QR code
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const qrCodeUrl = await generateMemberQRCode(membershipId, baseUrl)

    // Update member with QR code URL
    await prisma.member.update({
      where: { id: member.id },
      data: { qrCodeUrl }
    })
  } catch (unknownError) {
    const err = unknownError instanceof Error
      ? unknownError
      : new Error(String(unknownError ?? 'Unknown error'))

    // Optional: structured log without passing raw unknown payload
    console.error('Error creating member:', { message: err.message, stack: err.stack })

    if (err.message.includes('already exists')) {
      throw err
    }
    throw err
  }

  redirect('/admin/members')
}

export default function NewMember() {
  return <MemberForm action={createMember} />
}