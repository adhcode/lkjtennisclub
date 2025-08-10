import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import Image from 'next/image'
import { Calendar, Mail, Phone, MapPin, Trophy, User, Shield, Clock } from 'lucide-react'
import { decodeMemberIdFromUrl, formatMemberIdForDisplay } from '@/lib/memberUtils'

interface MemberProfileProps {
  params: Promise<{ id: string }>
}

export default async function MemberProfile(props: MemberProfileProps) {
  const { id } = await props.params
  const decodedId = decodeMemberIdFromUrl(id)

  const member = await prisma.member.findUnique({
    where: {
      membershipId: decodedId
    }
  })

  if (!member) {
    notFound()
  }

  const isActive = member.membershipStatus === 'active'
  const isExpired = member.expiryDate && new Date(member.expiryDate) < new Date()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fcf7dc] via-[#fcf7dc]/90 to-[#fcf7dc]/80">
      {/* Hero Section with Club Branding */}
      <div className="relative bg-[#911b1e] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#911b1e] via-[#911b1e]/95 to-[#911b1e]/90"></div>
        <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Image
                src="/logo.png"
                alt="LKJ Tennis Club"
                width={80}
                height={80}
                className="h-20 w-auto"
              />
            </div>
            <h1 className="font-bruno text-[#fcf7dc] text-4xl md:text-6xl mb-4 tracking-wider">
              LKJ TENNIS CLUB
            </h1>
            <p className="font-raleway text-[#fcf7dc]/90 text-lg md:text-xl font-light tracking-wide">
              Member Verification Profile
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        {/* Main Profile Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Elegant Status Header */}
          <div className="bg-gradient-to-r from-[#fcf7dc] to-[#fcf7dc]/80 px-8 py-6 border-b-2 border-[#911b1e]/10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isActive && !isExpired
                  ? 'bg-[#911b1e]/10 text-[#911b1e]'
                  : isExpired
                    ? 'bg-red-100 text-red-600'
                    : 'bg-gray-100 text-gray-600'
                  }`}>
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bruno text-[#911b1e] text-xl md:text-2xl tracking-wide">
                    {isActive && !isExpired
                      ? 'VERIFIED MEMBER'
                      : isExpired
                        ? 'MEMBERSHIP EXPIRED'
                        : 'INACTIVE MEMBER'
                    }
                  </h3>
                  <p className="font-raleway text-[#911b1e]/70 text-sm mt-1">
                    {isActive && !isExpired
                      ? 'Active membership in good standing'
                      : isExpired
                        ? 'Please renew your membership'
                        : 'Contact club administration'
                    }
                  </p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="font-raleway text-[#911b1e]/60 text-sm mb-1">Member ID</p>
                <div className="bg-white px-4 py-2 rounded-lg border border-[#911b1e]/20 shadow-sm">
                  <p className="font-mono font-bold text-[#911b1e] text-lg md:text-xl">
                    {formatMemberIdForDisplay(member.membershipId)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8 md:p-12">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Profile Section */}
              <div className="lg:col-span-1">
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    {member.profileImage ? (
                      <Image
                        src={member.profileImage}
                        alt={`${member.firstName} ${member.lastName}`}
                        fill
                        className="rounded-full object-cover border-4 border-[#911b1e]/20 shadow-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#fcf7dc] to-[#fcf7dc]/80 rounded-full flex items-center justify-center border-4 border-[#911b1e]/20 shadow-lg">
                        <User className="w-16 h-16 text-[#911b1e]/60" />
                      </div>
                    )}
                  </div>

                  <h2 className="font-bruno text-[#911b1e] text-2xl md:text-3xl mb-3 tracking-wide">
                    {member.firstName} {member.lastName}
                  </h2>

                  <div className="inline-flex items-center bg-gradient-to-r from-[#911b1e] to-[#911b1e]/90 px-6 py-2 rounded-full mb-6 shadow-lg">
                    <div className="w-2 h-2 bg-[#fcf7dc] rounded-full mr-3"></div>
                    <p className="text-[#fcf7dc] font-raleway font-medium capitalize text-sm">
                      {member.membershipType} Member
                    </p>
                  </div>

                  {member.bio && (
                    <div className="bg-gradient-to-br from-[#fcf7dc]/30 to-[#fcf7dc]/50 p-5 rounded-xl border border-[#911b1e]/10 shadow-sm">
                      <p className="text-[#911b1e]/80 font-raleway text-sm leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Details Section */}
              <div className="lg:col-span-2">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Contact Information */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-8 h-8 bg-[#911b1e]/10 rounded-full flex items-center justify-center">
                        <Mail className="w-4 h-4 text-[#911b1e]" />
                      </div>
                      <h3 className="font-bruno text-[#911b1e] text-lg tracking-wide">
                        Contact Information
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="group hover:bg-[#fcf7dc]/20 transition-colors duration-200 p-4 rounded-xl border border-[#911b1e]/10">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-4 h-4 text-[#911b1e]/60" />
                          <div>
                            <p className="text-[#911b1e]/50 text-xs font-raleway uppercase tracking-wide">Email</p>
                            <p className="text-[#911b1e] font-raleway font-medium">{member.email}</p>
                          </div>
                        </div>
                      </div>

                      <div className="group hover:bg-[#fcf7dc]/20 transition-colors duration-200 p-4 rounded-xl border border-[#911b1e]/10">
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-[#911b1e]/60" />
                          <div>
                            <p className="text-[#911b1e]/50 text-xs font-raleway uppercase tracking-wide">Phone</p>
                            <p className="text-[#911b1e] font-raleway font-medium">{member.phone}</p>
                          </div>
                        </div>
                      </div>

                      {member.address && (
                        <div className="group hover:bg-[#fcf7dc]/20 transition-colors duration-200 p-4 rounded-xl border border-[#911b1e]/10">
                          <div className="flex items-start space-x-3">
                            <MapPin className="w-4 h-4 text-[#911b1e]/60 mt-1" />
                            <div>
                              <p className="text-[#911b1e]/50 text-xs font-raleway uppercase tracking-wide">Address</p>
                              <p className="text-[#911b1e] font-raleway font-medium">{member.address}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Membership Information */}
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-8 h-8 bg-[#911b1e]/10 rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-[#911b1e]" />
                      </div>
                      <h3 className="font-bruno text-[#911b1e] text-lg tracking-wide">
                        Membership Details
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="group hover:bg-[#fcf7dc]/20 transition-colors duration-200 p-4 rounded-xl border border-[#911b1e]/10">
                        <div className="flex items-center space-x-3">
                          <Calendar className="w-4 h-4 text-[#911b1e]/60" />
                          <div>
                            <p className="text-[#911b1e]/50 text-xs font-raleway uppercase tracking-wide">Joined</p>
                            <p className="text-[#911b1e] font-raleway font-medium">
                              {new Date(member.joinDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>

                      {member.expiryDate && (
                        <div className="group hover:bg-[#fcf7dc]/20 transition-colors duration-200 p-4 rounded-xl border border-[#911b1e]/10">
                          <div className="flex items-center space-x-3">
                            <Clock className="w-4 h-4 text-[#911b1e]/60" />
                            <div>
                              <p className="text-[#911b1e]/50 text-xs font-raleway uppercase tracking-wide">
                                {isExpired ? 'Expired' : 'Expires'}
                              </p>
                              <p className={`font-raleway font-medium ${isExpired ? 'text-red-600' : 'text-[#911b1e]'
                                }`}>
                                {new Date(member.expiryDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {member.skillLevel && (
                        <div className="group hover:bg-[#fcf7dc]/20 transition-colors duration-200 p-4 rounded-xl border border-[#911b1e]/10">
                          <div className="flex items-center space-x-3">
                            <Trophy className="w-4 h-4 text-[#911b1e]/60" />
                            <div>
                              <p className="text-[#911b1e]/50 text-xs font-raleway uppercase tracking-wide">Skill Level</p>
                              <p className="text-[#911b1e] font-raleway font-medium capitalize">
                                {member.skillLevel}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                {member.emergencyContact && (
                  <div className="mt-8 p-6 bg-gradient-to-br from-[#fcf7dc]/30 to-[#fcf7dc]/50 rounded-xl border border-[#911b1e]/10 shadow-sm">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Phone className="w-4 h-4 text-orange-600" />
                      </div>
                      <h4 className="font-bruno text-[#911b1e] text-lg tracking-wide">
                        Emergency Contact
                      </h4>
                    </div>
                    <div className="space-y-2 ml-11">
                      <p className="text-[#911b1e] font-raleway font-medium">{member.emergencyContact}</p>
                      {member.emergencyPhone && (
                        <p className="text-[#911b1e]/70 font-raleway text-sm">{member.emergencyPhone}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pb-12">
          <div className="inline-block bg-gradient-to-r from-[#fcf7dc] to-[#fcf7dc]/80 px-8 py-4 rounded-2xl shadow-lg border border-[#911b1e]/10">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Shield className="w-4 h-4 text-[#911b1e]" />
              <p className="text-[#911b1e] font-bruno text-sm tracking-wide">
                VERIFIED BY LKJ TENNIS CLUB
              </p>
            </div>
            <p className="text-[#911b1e]/60 font-raleway text-xs">
              Last updated: {new Date(member.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}