import Link from 'next/link'
import Image from 'next/image'
import { User, Mail, Phone, Calendar, Eye, Edit, QrCode, Shield, Clock } from 'lucide-react'
import { encodeMemberIdForUrl, formatMemberIdForDisplay } from '@/lib/memberUtils'

interface Member {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  membershipId: string
  membershipType: string
  membershipStatus: string
  joinDate: Date
  expiryDate: Date | null
  profileImage: string | null
  skillLevel: string | null
}

interface MemberCardProps {
  member: Member
}

export default function MemberCard({ member }: MemberCardProps) {
  const isActive = member.membershipStatus === 'active'
  const isExpired = member.expiryDate && new Date(member.expiryDate) < new Date()
  
  const getStatusConfig = () => {
    if (isActive && !isExpired) {
      return {
        color: 'bg-green-500',
        textColor: 'text-green-800',
        bgColor: 'bg-green-50',
        label: 'Active',
        icon: Shield
      }
    } else if (isExpired) {
      return {
        color: 'bg-red-500',
        textColor: 'text-red-800',
        bgColor: 'bg-red-50',
        label: 'Expired',
        icon: Clock
      }
    } else {
      return {
        color: 'bg-gray-500',
        textColor: 'text-gray-800',
        bgColor: 'bg-gray-50',
        label: 'Inactive',
        icon: User
      }
    }
  }

  const statusConfig = getStatusConfig()
  const StatusIcon = statusConfig.icon

  return (
    <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {/* Status Header */}
      <div className={`${statusConfig.color} px-6 py-4`}>
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <StatusIcon className="w-5 h-5" />
            <span className="font-raleway font-semibold">{statusConfig.label}</span>
          </div>
          <span className="font-mono text-sm opacity-90">{formatMemberIdForDisplay(member.membershipId)}</span>
        </div>
      </div>

      <div className="p-6">
        {/* Profile Section */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative w-16 h-16 flex-shrink-0">
            {member.profileImage ? (
              <Image
                src={member.profileImage}
                alt={`${member.firstName} ${member.lastName}`}
                fill
                className="rounded-full object-cover border-3 border-[#911b1e]/20"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#911b1e]/10 to-[#911b1e]/20 rounded-full flex items-center justify-center border-3 border-[#911b1e]/20">
                <User className="w-8 h-8 text-[#911b1e]/60" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bruno text-[#911b1e] text-xl tracking-wide truncate">
              {member.firstName} {member.lastName}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="inline-block w-2 h-2 bg-[#911b1e]/40 rounded-full"></span>
              <p className="text-[#911b1e]/70 font-raleway capitalize text-sm">
                {member.membershipType} Member
              </p>
            </div>
            {member.skillLevel && (
              <p className="text-[#911b1e]/50 font-raleway text-xs mt-1 capitalize">
                {member.skillLevel} Level
              </p>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-3 p-3 bg-[#fcf7dc]/30 rounded-lg">
            <Mail className="w-4 h-4 text-[#911b1e]/60 flex-shrink-0" />
            <span className="text-[#911b1e]/80 font-raleway text-sm truncate">{member.email}</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-[#fcf7dc]/30 rounded-lg">
            <Phone className="w-4 h-4 text-[#911b1e]/60 flex-shrink-0" />
            <span className="text-[#911b1e]/80 font-raleway text-sm">{member.phone}</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-[#fcf7dc]/30 rounded-lg">
            <Calendar className="w-4 h-4 text-[#911b1e]/60 flex-shrink-0" />
            <span className="text-[#911b1e]/80 font-raleway text-sm">
              Joined {new Date(member.joinDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>

        {/* Expiry Date if exists */}
        {member.expiryDate && (
          <div className={`p-3 rounded-lg mb-6 ${
            isExpired ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'
          }`}>
            <p className="text-xs font-raleway font-medium mb-1 text-gray-600">
              Membership {isExpired ? 'Expired' : 'Expires'}
            </p>
            <p className={`font-raleway text-sm font-semibold ${
              isExpired ? 'text-red-700' : 'text-blue-700'
            }`}>
              {new Date(member.expiryDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <Link
            href={`/member/${encodeMemberIdForUrl(member.membershipId)}`}
            className="bg-[#fcf7dc] text-[#911b1e] border border-[#911b1e]/20 px-4 py-3 rounded-lg text-sm font-raleway font-medium hover:bg-[#911b1e] hover:text-[#fcf7dc] transition-colors flex items-center justify-center space-x-2 group"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">View</span>
          </Link>
          
          <Link
            href={`/admin/members/${member.id}/edit`}
            className="bg-blue-50 text-blue-700 border border-blue-200 px-4 py-3 rounded-lg text-sm font-raleway font-medium hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center space-x-2"
          >
            <Edit className="w-4 h-4" />
            <span className="hidden sm:inline">Edit</span>
          </Link>
          
          <Link
            href={`/admin/members/${member.id}/qr`}
            className="bg-purple-50 text-purple-700 border border-purple-200 px-4 py-3 rounded-lg text-sm font-raleway font-medium hover:bg-purple-600 hover:text-white transition-colors flex items-center justify-center"
          >
            <QrCode className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}