import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Plus, Users, Search, Filter, UserCheck, UserX, Clock } from 'lucide-react'
import MemberCard from '@/components/MemberCard'

export default async function MembersAdmin() {
  const members = await prisma.member.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  const activeMembers = members.filter(m => m.membershipStatus === 'active')
  const expiredMembers = members.filter(m =>
    m.expiryDate && new Date(m.expiryDate) < new Date()
  )
  const inactiveMembers = members.filter(m => m.membershipStatus === 'inactive')

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fcf7dc] via-[#fcf7dc]/90 to-[#fcf7dc]/80">
      {/* Header Section */}
      <div className="bg-[#911b1e] overflow-hidden">
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center space-x-6">
                <div className="flex items-center justify-center w-16 h-16 bg-[#fcf7dc]/10 rounded-full flex-shrink-0">
                  <Users className="w-8 h-8 text-[#fcf7dc]" />
                </div>
                <div>
                  <h1 className="font-bruno text-[#fcf7dc] text-3xl md:text-4xl tracking-wider">
                    MEMBERS MANAGEMENT
                  </h1>
                  <p className="font-raleway text-[#fcf7dc]/90 text-base md:text-lg font-light tracking-wide mt-1">
                    Manage tennis club members and their QR verification codes
                  </p>
                </div>
              </div>

              <Link
                href="/admin/members/new"
                className="group relative overflow-hidden"
              >
                <div className="relative z-10 bg-[#fcf7dc] px-6 py-3 text-[#911b1e] font-raleway font-medium transition-all duration-300 hover:bg-[#911b1e] hover:text-[#fcf7dc] border border-[#fcf7dc] rounded-lg flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add New Member</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#911b1e]/60 text-sm font-raleway font-medium">Total Members</p>
                  <p className="text-3xl font-bruno text-[#911b1e] tracking-wide">{members.length}</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-[#911b1e]/10 to-[#911b1e]/20 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-[#911b1e]" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600/60 text-sm font-raleway font-medium">Active Members</p>
                  <p className="text-3xl font-bruno text-green-600 tracking-wide">{activeMembers.length}</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center">
                  <UserCheck className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600/60 text-sm font-raleway font-medium">Expired</p>
                  <p className="text-3xl font-bruno text-red-600 tracking-wide">{expiredMembers.length}</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600/60 text-sm font-raleway font-medium">Inactive</p>
                  <p className="text-3xl font-bruno text-gray-600 tracking-wide">{inactiveMembers.length}</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                  <UserX className="w-8 h-8 text-gray-600" />
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-[#911b1e] to-[#911b1e]/90 px-6 py-4">
            <div className="flex items-center space-x-3">
              <Filter className="w-5 h-5 text-[#fcf7dc]" />
              <h2 className="font-bruno text-[#fcf7dc] text-lg tracking-wide">
                Search & Filter Members
              </h2>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label className="block text-[#911b1e]/60 text-sm font-raleway font-medium mb-2">
                  Search Members
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#911b1e]/40 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or ID..."
                    className="w-full pl-10 pr-4 py-3 bg-[#fcf7dc]/30 border border-[#911b1e]/20 rounded-lg focus:ring-2 focus:ring-[#911b1e]/20 focus:border-[#911b1e]/40 text-[#911b1e] font-raleway transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#911b1e]/60 text-sm font-raleway font-medium mb-2">
                  Membership Status
                </label>
                <select className="w-full px-4 py-3 bg-[#fcf7dc]/30 border border-[#911b1e]/20 rounded-lg focus:ring-2 focus:ring-[#911b1e]/20 focus:border-[#911b1e]/40 text-[#911b1e] font-raleway transition-colors">
                  <option value="">All Status</option>
                  <option value="active">Active Members</option>
                  <option value="inactive">Inactive Members</option>
                  <option value="suspended">Suspended Members</option>
                </select>
              </div>

              <div>
                <label className="block text-[#911b1e]/60 text-sm font-raleway font-medium mb-2">
                  Membership Type
                </label>
                <select className="w-full px-4 py-3 bg-[#fcf7dc]/30 border border-[#911b1e]/20 rounded-lg focus:ring-2 focus:ring-[#911b1e]/20 focus:border-[#911b1e]/40 text-[#911b1e] font-raleway transition-colors">
                  <option value="">All Types</option>
                  <option value="regular">Regular</option>
                  <option value="student">Student</option>
                  <option value="family">Family</option>
                  <option value="corporate">Corporate</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Members Grid */}
        {members.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-16 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-[#911b1e]/10 to-[#911b1e]/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Users className="w-12 h-12 text-[#911b1e]/60" />
              </div>
              <h3 className="font-bruno text-[#911b1e] text-2xl mb-4 tracking-wide">
                No Members Yet
              </h3>
              <p className="text-[#911b1e]/70 font-raleway text-lg mb-8 max-w-md mx-auto">
                Get started by adding your first tennis club member to the system.
              </p>
              <Link
                href="/admin/members/new"
                className="group relative overflow-hidden inline-block"
              >
                <div className="relative z-10 bg-[#911b1e] px-8 py-4 text-[#fcf7dc] font-raleway font-medium text-lg transition-all duration-300 hover:bg-[#fcf7dc] hover:text-[#911b1e] border border-[#911b1e] flex items-center space-x-3">
                  <Plus className="w-6 h-6" />
                  <span>Add First Member</span>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}