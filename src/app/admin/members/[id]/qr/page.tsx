import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { generateMemberQRCode } from '@/lib/qrcode'
import Link from 'next/link'
import { ArrowLeft, Download, Eye, QrCode, ExternalLink } from 'lucide-react'
import QRCodeDisplay from '@/components/QRCodeDisplay'
import CopyButton from '@/components/CopyButton'
import { encodeMemberIdForUrl, formatMemberIdForDisplay } from '@/lib/memberUtils'

interface QRCodePageProps {
  params: Promise<{ id: string }>
}

export default async function MemberQRCode(props: QRCodePageProps) {
  const { id } = await props.params
  const member = await prisma.member.findUnique({
    where: {
      id: id
    }
  })

  if (!member) {
    notFound()
  }

  // Generate fresh QR code
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const qrCodeDataUrl = await generateMemberQRCode(member.membershipId, baseUrl)
  const encodedId = encodeMemberIdForUrl(member.membershipId)
  const profileUrl = `${baseUrl}/member/${encodedId}`
  const downloadUrl = `${baseUrl}/api/qr-download/${member.membershipId}`

  // Update member with QR code URL if not exists
  if (!member.qrCodeUrl) {
    await prisma.member.update({
      where: { id: member.id },
      data: { qrCodeUrl: qrCodeDataUrl }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fcf7dc] via-[#fcf7dc]/90 to-[#fcf7dc]/80">
      {/* Header */}
      <div className="bg-[#911b1e] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/admin/members"
            className="flex items-center space-x-2 text-[#fcf7dc]/80 hover:text-[#fcf7dc] mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-raleway">Back to Members</span>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-16 h-16 bg-[#fcf7dc]/10 rounded-full">
              <QrCode className="w-8 h-8 text-[#fcf7dc]" />
            </div>
            <div>
              <h1 className="font-bruno text-[#fcf7dc] text-3xl md:text-4xl tracking-wide">
                Member QR Code
              </h1>
              <p className="font-raleway text-[#fcf7dc]/80 text-lg mt-1">
                {member.firstName} {member.lastName} • {formatMemberIdForDisplay(member.membershipId)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* QR Code Display */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#911b1e] to-[#911b1e]/90 px-8 py-6">
              <h2 className="font-bruno text-[#fcf7dc] text-2xl tracking-wide text-center">
                Member Verification QR Code
              </h2>
            </div>

            <div className="p-8">
              <QRCodeDisplay
                qrCodeDataUrl={qrCodeDataUrl}
                memberName={`${member.firstName} ${member.lastName}`}
                membershipId={formatMemberIdForDisplay(member.membershipId)}
              />

              <div className="mt-8 space-y-4">
                <a
                  href={downloadUrl}
                  className="w-full bg-[#911b1e] text-[#fcf7dc] px-6 py-4 rounded-lg hover:bg-[#911b1e]/90 transition-colors flex items-center justify-center space-x-3 font-raleway font-medium"
                >
                  <Download className="w-5 h-5" />
                  <span>Download High-Quality QR Code</span>
                </a>

                <Link
                  href={profileUrl}
                  target="_blank"
                  className="w-full bg-[#fcf7dc] text-[#911b1e] border-2 border-[#911b1e] px-6 py-4 rounded-lg hover:bg-[#911b1e] hover:text-[#fcf7dc] transition-colors flex items-center justify-center space-x-3 font-raleway font-medium"
                >
                  <Eye className="w-5 h-5" />
                  <span>Preview Member Profile</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Member Information & Instructions */}
          <div className="space-y-8">
            {/* Member Info Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-[#911b1e] to-[#911b1e]/90 px-8 py-6">
                <h2 className="font-bruno text-[#fcf7dc] text-2xl tracking-wide">
                  Member Information
                </h2>
              </div>

              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[#911b1e]/60 text-sm font-raleway font-medium">Full Name</label>
                    <p className="text-[#911b1e] font-raleway font-semibold text-lg">
                      {member.firstName} {member.lastName}
                    </p>
                  </div>

                  <div>
                    <label className="text-[#911b1e]/60 text-sm font-raleway font-medium">Member ID</label>
                    <p className="text-[#911b1e] font-mono font-bold text-lg">{member.membershipId}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[#911b1e]/60 text-sm font-raleway font-medium">Email</label>
                    <p className="text-[#911b1e] font-raleway">{member.email}</p>
                  </div>

                  <div>
                    <label className="text-[#911b1e]/60 text-sm font-raleway font-medium">Phone</label>
                    <p className="text-[#911b1e] font-raleway">{member.phone}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[#911b1e]/60 text-sm font-raleway font-medium">Membership Type</label>
                    <p className="text-[#911b1e] font-raleway capitalize font-semibold">
                      {member.membershipType}
                    </p>
                  </div>

                  <div>
                    <label className="text-[#911b1e]/60 text-sm font-raleway font-medium">Status</label>
                    <span className={`inline-block px-3 py-1 text-sm font-raleway font-medium rounded-full ${member.membershipStatus === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                      }`}>
                      {member.membershipStatus}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-[#911b1e]/60 text-sm font-raleway font-medium mb-2 block">
                    Profile URL
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={profileUrl}
                      readOnly
                      className="flex-1 px-4 py-3 bg-[#fcf7dc]/30 border border-[#911b1e]/20 rounded-lg text-[#911b1e] font-raleway text-sm"
                    />
                    <CopyButton text={profileUrl} />
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions Card */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-6">
                <h3 className="font-bruno text-white text-xl tracking-wide">
                  Usage Instructions
                </h3>
              </div>

              <div className="p-8">
                <ul className="space-y-4 text-[#911b1e]/80 font-raleway">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#911b1e] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Download and print the QR code for the member's ID card</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#911b1e] rounded-full mt-2 flex-shrink-0"></div>
                    <span>When scanned, it displays the member's verification profile</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#911b1e] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Profile shows membership status and contact information</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#911b1e] rounded-full mt-2 flex-shrink-0"></div>
                    <span>Use for verifying active membership at club facilities</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#911b1e] rounded-full mt-2 flex-shrink-0"></div>
                    <span>QR code works on any smartphone camera or QR scanner app</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}