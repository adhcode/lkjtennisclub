'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Users, Plus, ExternalLink } from 'lucide-react'

type SeedMemberItem = { id: string; name: string; membershipId: string; profileUrl: string }
type SeedMembersResponse =
  | { success: true; message: string; members: SeedMemberItem[] }
  | { success: false; error: string }

export default function TestMembers() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<SeedMembersResponse | null>(null)

  const createSampleMembers = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/seed-members', {
        method: 'POST',
      })
      const data: SeedMembersResponse = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error creating members:', error)
      setResult({ success: false, error: 'Failed to create members' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Test Member System
          </h1>
          <p className="text-gray-600">
            Create sample members to test the QR code verification system
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          {!result ? (
            <div className="text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-6" />
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Create Sample Members
              </h2>
              <p className="text-gray-600 mb-8">
                This will create 4 sample members with QR codes for testing the verification system.
              </p>
              <button
                onClick={createSampleMembers}
                disabled={isLoading}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" />
                <span>{isLoading ? 'Creating Members...' : 'Create Sample Members'}</span>
              </button>
            </div>
          ) : (
            <div>
              {result.success ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Members Created Successfully!
                  </h2>
                  <p className="text-gray-600 mb-8">
                    {result.message}
                  </p>

                  <div className="space-y-4 mb-8">
                    {result.members.map((member: SeedMemberItem) => (
                      <div key={member.id} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-900">{member.name}</h3>
                          <p className="text-sm text-gray-600 font-mono">{member.membershipId}</p>
                        </div>
                        <Link
                          href={member.profileUrl}
                          target="_blank"
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>View Profile</span>
                        </Link>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center space-x-4">
                    <Link
                      href="/admin/members"
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Go to Admin Panel
                    </Link>
                    <button
                      onClick={() => setResult(null)}
                      className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Create More Members
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-red-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Error Creating Members
                  </h2>
                  <p className="text-red-600 mb-8">
                    {result.error}
                  </p>
                  <button
                    onClick={() => setResult(null)}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-green-600 hover:text-green-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}