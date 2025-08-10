'use client'

import { useState } from 'react'
import { ArrowLeft, Save, User, Users, Trophy, Phone } from 'lucide-react'
import Link from 'next/link'
import ImageUpload from './ImageUpload'
import type { Member } from '@prisma/client'

interface MemberFormProps {
  action: (formData: FormData) => Promise<void>
  member?: Member
  isEdit?: boolean
}

export default function MemberForm({ action, member, isEdit = false }: MemberFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(member?.profileImage || null)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      // Add profile image to form data
      if (profileImage) {
        formData.append('profileImage', profileImage)
      }
      await action(formData)
    } catch (error) {
      console.error('Form submission error:', error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fcf7dc] via-[#fcf7dc]/90 to-[#fcf7dc]/80">
      {/* Header */}
      <div className="bg-[#911b1e] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/admin/members"
            className="inline-flex items-center space-x-2 text-[#fcf7dc]/80 hover:text-[#fcf7dc] mb-6 transition-colors font-raleway"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Members</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center justify-center w-16 h-16 bg-[#fcf7dc]/10 rounded-full flex-shrink-0">
              <User className="w-8 h-8 text-[#fcf7dc]" />
            </div>
            <div>
              <h1 className="font-bruno text-[#fcf7dc] text-3xl md:text-4xl tracking-wide">
                {isEdit ? 'EDIT MEMBER' : 'ADD NEW MEMBER'}
              </h1>
              <p className="font-raleway text-[#fcf7dc]/80 text-base md:text-lg mt-1">
                {isEdit ? 'Update member information and settings' : 'Create a new tennis club member profile'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form action={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-[#911b1e] to-[#911b1e]/90 px-8 py-6">
                <div className="flex items-center space-x-3">
                  <User className="w-6 h-6 text-[#fcf7dc]" />
                  <h2 className="font-bruno text-[#fcf7dc] text-2xl tracking-wide">
                    Personal Information
                  </h2>
                </div>
              </div>

              <div className="p-8 space-y-6">
                {/* Profile Image Upload */}
                <div className="flex justify-center pb-6 border-b border-[#911b1e]/10">
                  <ImageUpload
                    currentImage={profileImage}
                    onImageChange={setProfileImage}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#911b1e]/60 text-sm font-raleway font-medium mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      defaultValue={member?.firstName || ''}
                      required
                      className="w-full px-4 py-3 bg-[#fcf7dc]/30 border border-[#911b1e]/20 rounded-lg focus:ring-2 focus:ring-[#911b1e]/20 focus:border-[#911b1e]/40 text-[#911b1e] font-raleway transition-colors"
                      placeholder="Enter first name"
                    />
                  </div>

                  <div>
                    <label className="block text-[#911b1e]/60 text-sm font-raleway font-medium mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      defaultValue={member?.lastName || ''}
                      required
                      className="w-full px-4 py-3 bg-[#fcf7dc]/30 border border-[#911b1e]/20 rounded-lg focus:ring-2 focus:ring-[#911b1e]/20 focus:border-[#911b1e]/40 text-[#911b1e] font-raleway transition-colors"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#911b1e]/60 text-sm font-raleway font-medium mb-2">
                    Member ID {!isEdit && '(Optional)'}
                  </label>
                  <input
                    type="text"
                    name="membershipId"
                    defaultValue={member?.membershipId || ''}
                    readOnly={isEdit}
                    className={`w-full px-4 py-3 bg-[#fcf7dc]/30 border border-[#911b1e]/20 rounded-lg focus:ring-2 focus:ring-[#911b1e]/20 focus:border-[#911b1e]/40 text-[#911b1e] font-raleway transition-colors ${isEdit ? 'cursor-not-allowed opacity-60' : ''
                      }`}
                    placeholder={isEdit ? 'Member ID cannot be changed' : 'Enter custom ID or leave blank for auto-generation (e.g., 23/004/RE)'}
                  />
                  {!isEdit && (
                    <p className="text-[#911b1e]/50 text-xs font-raleway mt-1">
                      Leave blank to auto-generate a unique ID, or enter a custom ID (e.g., 23/004/RE). Will be formatted as LTC-XX-XXX-XX
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#911b1e]/60 text-sm font-raleway font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={member?.email || ''}
                    required
                    className="w-full px-4 py-3 bg-[#fcf7dc]/30 border border-[#911b1e]/20 rounded-lg focus:ring-2 focus:ring-[#911b1e]/20 focus:border-[#911b1e]/40 text-[#911b1e] font-raleway"
                    placeholder="member@example.com"
                  />
                </div>

                <div>
                  <label className="block text-[#911b1e]/60 text-sm font-raleway font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    defaultValue={member?.phone || ''}
                    required
                    className="w-full px-4 py-3 bg-[#fcf7dc]/30 border border-[#911b1e]/20 rounded-lg focus:ring-2 focus:ring-[#911b1e]/20 focus:border-[#911b1e]/40 text-[#911b1e] font-raleway"
                    placeholder="+234-xxx-xxx-xxxx"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#911b1e]/60 text-sm font-raleway font-medium mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      defaultValue={member?.dateOfBirth ? new Date(member.dateOfBirth).toISOString().split('T')[0] : ''}
                      className="w-full px-4 py-3 bg-[#fcf7dc]/30 border border-[#911b1e]/20 rounded-lg focus:ring-2 focus:ring-[#911b1e]/20 focus:border-[#911b1e]/40 text-[#911b1e] font-raleway transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#911b1e]/60 text-sm font-raleway font-medium mb-2">
                      Gender
                    </label>
                    <select
                      name="gender"
                      defaultValue={member?.gender || ''}
                      className="w-full px-4 py-3 bg-[#fcf7dc]/30 border border-[#911b1e]/20 rounded-lg focus:ring-2 focus:ring-[#911b1e]/20 focus:border-[#911b1e]/40 text-[#911b1e] font-raleway transition-colors"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#911b1e]/60 text-sm font-raleway font-medium mb-2">
                    Address
                  </label>
                  <textarea
                    name="address"
                    defaultValue={member?.address || ''}
                    rows={3}
                    className="w-full px-4 py-3 bg-[#fcf7dc]/30 border border-[#911b1e]/20 rounded-lg focus:ring-2 focus:ring-[#911b1e]/20 focus:border-[#911b1e]/40 text-[#911b1e] font-raleway resize-none"
                    placeholder="Enter full address..."
                  />
                </div>

                <div>
                  <label className="block text-[#911b1e]/60 text-sm font-raleway font-medium mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    defaultValue={member?.bio || ''}
                    rows={3}
                    placeholder="Brief description about the member..."
                    className="w-full px-4 py-3 bg-[#fcf7dc]/30 border border-[#911b1e]/20 rounded-lg focus:ring-2 focus:ring-[#911b1e]/20 focus:border-[#911b1e]/40 text-[#911b1e] font-raleway resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Membership & Tennis Information */}
            <div className="space-y-8">
              {/* Membership Info */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-6">
                  <div className="flex items-center space-x-3">
                    <Users className="w-6 h-6 text-white" />
                    <h2 className="font-bruno text-white text-2xl tracking-wide">
                      Membership Information
                    </h2>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#911b1e]/60 text-sm font-raleway font-medium mb-2">
                        Membership Type *
                      </label>
                      <select
                        name="membershipType"
                        defaultValue={member?.membershipType || 'regular'}
                        required
                        className="w-full px-4 py-3 bg-[#fcf7dc]/30 border border-[#911b1e]/20 rounded-lg focus:ring-2 focus:ring-[#911b1e]/20 focus:border-[#911b1e]/40 text-[#911b1e] font-raleway transition-colors"
                      >
                        <option value="regular">Regular Membership</option>
                        <option value="student">Student Membership</option>
                        <option value="family">Family Membership</option>
                        <option value="corporate">Corporate Membership</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#911b1e]/60 text-sm font-raleway font-medium mb-2">
                        Membership Expiry Date
                      </label>
                      <input
                        type="date"
                        name="expiryDate"
                        defaultValue={member?.expiryDate ? new Date(member.expiryDate).toISOString().split('T')[0] : ''}
                        className="w-full px-4 py-3 bg-[#fcf7dc]/30 border border-[#911b1e]/20 rounded-lg focus:ring-2 focus:ring-[#911b1e]/20 focus:border-[#911b1e]/40 text-[#911b1e] font-raleway transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tennis Information */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-green-500 px-8 py-6">
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-6 h-6 text-white" />
                    <h2 className="font-bruno text-white text-2xl tracking-wide">
                      Tennis Information
                    </h2>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#911b1e]/60 text-sm font-raleway font-medium mb-2">
                        Tennis Skill Level
                      </label>
                      <select
                        name="skillLevel"
                        defaultValue={member?.skillLevel || ''}
                        className="w-full px-4 py-3 bg-[#fcf7dc]/30 border border-[#911b1e]/20 rounded-lg focus:ring-2 focus:ring-[#911b1e]/20 focus:border-[#911b1e]/40 text-[#911b1e] font-raleway transition-colors"
                      >
                        <option value="">Select Skill Level</option>
                        <option value="beginner">Beginner Player</option>
                        <option value="intermediate">Intermediate Player</option>
                        <option value="advanced">Advanced Player</option>
                        <option value="professional">Professional Player</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#911b1e]/60 text-sm font-raleway font-medium mb-2">
                        Dominant Playing Hand
                      </label>
                      <select
                        name="playingHand"
                        defaultValue={member?.playingHand || ''}
                        className="w-full px-4 py-3 bg-[#fcf7dc]/30 border border-[#911b1e]/20 rounded-lg focus:ring-2 focus:ring-[#911b1e]/20 focus:border-[#911b1e]/40 text-[#911b1e] font-raleway transition-colors"
                      >
                        <option value="">Select Playing Hand</option>
                        <option value="right">Right-Handed</option>
                        <option value="left">Left-Handed</option>
                        <option value="both">Ambidextrous</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-orange-600 to-orange-500 px-8 py-6">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-6 h-6 text-white" />
                    <h2 className="font-bruno text-white text-2xl tracking-wide">
                      Emergency Contact
                    </h2>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div>
                    <label className="block text-[#911b1e]/60 text-sm font-raleway font-medium mb-2">
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      defaultValue={member?.emergencyContact || ''}
                      className="w-full px-4 py-3 bg-[#fcf7dc]/30 border border-[#911b1e]/20 rounded-lg focus:ring-2 focus:ring-[#911b1e]/20 focus:border-[#911b1e]/40 text-[#911b1e] font-raleway"
                      placeholder="Emergency contact full name"
                    />
                  </div>

                  <div>
                    <label className="block text-[#911b1e]/60 text-sm font-raleway font-medium mb-2">
                      Emergency Contact Phone
                    </label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      defaultValue={member?.emergencyPhone || ''}
                      className="w-full px-4 py-3 bg-[#fcf7dc]/30 border border-[#911b1e]/20 rounded-lg focus:ring-2 focus:ring-[#911b1e]/20 focus:border-[#911b1e]/40 text-[#911b1e] font-raleway"
                      placeholder="+234-xxx-xxx-xxxx"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mt-8">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <div>
                <h3 className="font-bruno text-[#911b1e] text-lg tracking-wide mb-2">
                  Important Information
                </h3>
                <ul className="text-[#911b1e]/70 font-raleway text-sm space-y-1">
                  <li>• Fields marked with * are required</li>
                  <li>• {isEdit ? 'Member ID cannot be changed after creation' : 'Enter a custom Member ID or leave blank for auto-generation'}</li>
                  <li>• QR code will be created automatically for member verification</li>
                  <li>• Emergency contact information is recommended for safety</li>
                  <li>• All member information can be updated later except the Member ID</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-12">
            <Link
              href="/admin/members"
              className="px-8 py-4 bg-white border-2 border-[#911b1e]/20 text-[#911b1e] rounded-lg hover:bg-[#fcf7dc]/50 transition-colors font-raleway font-medium text-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#911b1e] text-[#fcf7dc] px-8 py-4 rounded-lg hover:bg-[#911b1e]/90 transition-colors flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed font-raleway font-medium"
            >
              <Save className="w-5 h-5" />
              <span>{isSubmitting ? 'Saving Member...' : isEdit ? 'Update Member' : 'Create Member'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}