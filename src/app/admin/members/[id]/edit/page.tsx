import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { generateMemberQRCode } from '@/lib/qrcode'
import MemberForm from '@/components/MemberForm'

interface EditMemberProps {
  params: Promise<{ id: string }>
}

function updateMember(memberId: string) {
  return async function action(formData: FormData): Promise<void> {
    'use server'

    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const membershipType = formData.get('membershipType') as string
    const expiryDate = formData.get('expiryDate') as string
    const profileImage = formData.get('profileImage') as string

    try {
      const member = await prisma.member.update({
        where: { id: memberId },
        data: {
          firstName,
          lastName,
          membershipType,
          expiryDate: expiryDate ? new Date(expiryDate) : null,
          profileImage: profileImage || null,
        }
      })

      if (!member.qrCodeUrl) {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        const qrCodeUrl = await generateMemberQRCode(member.membershipId, baseUrl)

        await prisma.member.update({
          where: { id: member.id },
          data: { qrCodeUrl }
        })
      }

      redirect('/admin/members')
    } catch (error) {
      console.error('Error updating member:', error)
      throw new Error('Failed to update member')
    }
  }
}

export default async function EditMember(props: EditMemberProps) {
  const { id } = await props.params
  const member = await prisma.member.findUnique({
    where: {
      id: id
    }
  })

  if (!member) {
    notFound()
  }

  return <MemberForm action={updateMember(id)} member={member} isEdit={true} />
}