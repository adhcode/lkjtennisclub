import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { generateMemberQRCode } from '@/lib/qrcode'
import MemberForm from '@/components/MemberForm'
import { headers } from 'next/headers'
import type { Prisma } from '@prisma/client'

async function createMember(formData: FormData) {
  'use server'

  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const membershipType = formData.get('membershipType') as string
  const expiryDate = formData.get('expiryDate') as string
  const joinedYearRaw = formData.get('joinedYear') as string
  const customMembershipId = formData.get('membershipId') as string
  const profileImage = formData.get('profileImage') as string

  // Use custom ID if provided, otherwise generate one
  let membershipId = customMembershipId?.trim()

  if (!membershipId) {
    const year = new Date().getFullYear().toString().slice(-2)
    const sequence = Date.now().toString().slice(-3)
    const suffix = Math.random().toString(36).substring(2, 4).toUpperCase()
    membershipId = `LTC-${year}-${sequence}-${suffix}`
  } else {
    if (!membershipId.startsWith('LTC')) {
      membershipId = `LTC-${membershipId}`
    }
    membershipId = membershipId.replace(/\//g, '-')
  }

  // Check if custom ID already exists
  const existingMember = await prisma.member.findUnique({
    where: { membershipId }
  })

  if (existingMember) {
    throw new Error(`Member ID ${membershipId} already exists. Please choose a different ID.`)
  }

  try {
    // Create member in database
    const member = await prisma.member.create({
      data: {
        firstName,
        lastName,
        membershipId,
        membershipType,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        joinedYear: joinedYearRaw ? parseInt(joinedYearRaw, 10) : null,
        profileImage: profileImage || null,
      } as Prisma.MemberUncheckedCreateInput
    })

    // Generate QR code
    const hdrs = await headers()
    const host = hdrs.get('x-forwarded-host') || hdrs.get('host')
    const proto = hdrs.get('x-forwarded-proto') || 'http'
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (host ? `${proto}://${host}` : 'http://localhost:3000')
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

    console.error('Error creating member:', { message: err.message, stack: err.stack })
    throw err
  }

  redirect('/admin/members')
}

export default function NewMember() {
  return <MemberForm action={createMember} />
}