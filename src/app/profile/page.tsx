'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Raleway } from 'next/font/google';
import Link from 'next/link';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

interface MemberData {
  membershipId: string;
  firstName: string;
  lastName: string;
  membershipType: string;
  membershipStatus: string;
  joinDate: string;
  expiryDate: string | null;
  qrCodeUrl: string | null;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [memberData, setMemberData] = useState<MemberData | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?redirect=/profile');
    } else if (status === 'authenticated') {
      // Check if user has linked membership
      fetchMemberData();
    }
  }, [status, router]);

  const fetchMemberData = async () => {
    try {
      const response = await fetch('/api/user/member-data');
      if (response.ok) {
        const data = await response.json();
        setMemberData(data.member);
      }
    } catch (error) {
      console.error('Failed to fetch member data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || status === 'loading') {
    return (
      <main className="min-h-screen bg-[#fcf7dc]">
        <Navbar />
        <div className="pt-32 pb-16 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto border-4 border-[#911b1e] border-t-transparent rounded-full animate-spin"></div>
            <p className={`mt-4 text-[#911b1e] ${raleway.className}`}>Loading...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!session?.user) {
    return null;
  }

  const user = session.user as { name?: string; email?: string; role?: string };
  const isMember = !!memberData;

  return (
    <main className="min-h-screen bg-[#fcf7dc]">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-[#911b1e] text-4xl font-agrandir mb-2">
              My Profile
            </h1>
            <p className={`text-[#911b1e]/60 mb-8 ${raleway.className}`}>
              {isMember ? 'Club Member Account' : 'Customer Account'}
            </p>

            {/* Membership Status Banner */}
            {!isMember && (
              <div className="mb-6 bg-gradient-to-r from-[#911b1e] to-[#911b1e]/90 rounded-lg p-6 text-[#fcf7dc]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-agrandir text-xl mb-2">Are you a club member?</h3>
                    <p className={`${raleway.className} text-[#fcf7dc]/90`}>
                      Link your membership to access exclusive features
                    </p>
                  </div>
                  <Link
                    href="/profile/link-membership"
                    className={`bg-[#fcf7dc] text-[#911b1e] px-6 py-3 rounded hover:bg-white transition-colors ${raleway.className} font-medium whitespace-nowrap`}
                  >
                    Link Membership
                  </Link>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-6">
              {/* Profile Card */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-[#911b1e] rounded-full flex items-center justify-center">
                      <span className="text-[#fcf7dc] text-3xl font-agrandir">
                        {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <h2 className="text-[#911b1e] text-xl font-agrandir mb-1">
                      {user.name || 'User'}
                    </h2>
                    <p className={`text-[#911b1e]/60 text-sm mb-4 ${raleway.className}`}>
                      {user.email}
                    </p>
                    <div className="inline-block px-3 py-1 bg-[#fcf7dc] border border-[#911b1e]/20 rounded-full">
                      <span className={`text-[#911b1e] text-xs font-medium ${raleway.className}`}>
                        {isMember ? '🎾 Club Member' : '🛍️ Customer'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#911b1e]/10 space-y-3">
                    <Link
                      href="/profile/edit"
                      className={`block w-full text-center bg-[#911b1e] text-[#fcf7dc] py-3 rounded hover:bg-[#911b1e]/90 transition-colors ${raleway.className} font-medium`}
                    >
                      Edit Profile
                    </Link>
                    {!isMember && (
                      <Link
                        href="/profile/link-membership"
                        className={`block w-full text-center border-2 border-[#911b1e]/20 text-[#911b1e] py-3 rounded hover:border-[#911b1e] transition-colors ${raleway.className} font-medium`}
                      >
                        Link Membership
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Information Cards */}
              <div className="md:col-span-2 space-y-6">
                {/* Member-specific section */}
                {isMember && memberData && (
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h3 className="text-[#911b1e] text-xl font-agrandir mb-4">
                      Membership Information
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`text-[#911b1e]/60 text-sm ${raleway.className}`}>
                          Membership ID
                        </label>
                        <p className={`text-[#911b1e] font-mono font-bold ${raleway.className}`}>
                          {memberData.membershipId}
                        </p>
                      </div>
                      <div>
                        <label className={`text-[#911b1e]/60 text-sm ${raleway.className}`}>
                          Status
                        </label>
                        <p className={`text-[#911b1e] ${raleway.className} font-medium capitalize`}>
                          {memberData.membershipStatus}
                        </p>
                      </div>
                      <div>
                        <label className={`text-[#911b1e]/60 text-sm ${raleway.className}`}>
                          Member Since
                        </label>
                        <p className={`text-[#911b1e] ${raleway.className} font-medium`}>
                          {new Date(memberData.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <label className={`text-[#911b1e]/60 text-sm ${raleway.className}`}>
                          Type
                        </label>
                        <p className={`text-[#911b1e] ${raleway.className} font-medium capitalize`}>
                          {memberData.membershipType}
                        </p>
                      </div>
                    </div>
                    {memberData.qrCodeUrl && (
                      <div className="mt-6 pt-6 border-t border-[#911b1e]/10">
                        <Link
                          href={`/admin/members/${memberData.membershipId}/qr`}
                          className={`text-[#911b1e] hover:text-[#911b1e]/80 ${raleway.className} font-medium`}
                        >
                          View My QR Code →
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* Account Information */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-[#911b1e] text-xl font-agrandir mb-4">
                    Account Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className={`text-[#911b1e]/60 text-sm ${raleway.className}`}>
                        Full Name
                      </label>
                      <p className={`text-[#911b1e] ${raleway.className} font-medium`}>
                        {user.name || 'Not set'}
                      </p>
                    </div>
                    <div>
                      <label className={`text-[#911b1e]/60 text-sm ${raleway.className}`}>
                        Email Address
                      </label>
                      <p className={`text-[#911b1e] ${raleway.className} font-medium`}>
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[#911b1e] text-xl font-agrandir">
                      Shipping Address
                    </h3>
                    <Link
                      href="/profile/address"
                      className={`text-[#911b1e] hover:text-[#911b1e]/80 text-sm ${raleway.className} font-medium`}
                    >
                      {(user as any).address ? 'Edit' : 'Add'} →
                    </Link>
                  </div>
                  {(user as any).address ? (
                    <div className="space-y-2">
                      {(user as any).phone && (
                        <p className={`text-[#911b1e] ${raleway.className}`}>
                          {(user as any).phone}
                        </p>
                      )}
                      <p className={`text-[#911b1e] ${raleway.className}`}>
                        {(user as any).address}
                      </p>
                      <p className={`text-[#911b1e] ${raleway.className}`}>
                        {(user as any).city}, {(user as any).state}
                        {(user as any).postalCode && ` ${(user as any).postalCode}`}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-[#fcf7dc] border border-[#911b1e]/20 rounded-lg p-4">
                      <p className={`text-[#911b1e]/70 text-sm ${raleway.className}`}>
                        Add your shipping address for faster checkout when shopping!
                      </p>
                      <Link href="/profile/address">
                        <button className={`mt-3 bg-[#911b1e] text-[#fcf7dc] px-4 py-2 rounded hover:bg-[#911b1e]/90 transition-colors text-sm ${raleway.className} font-medium`}>
                          Add Address
                        </button>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-[#911b1e] text-xl font-agrandir mb-4">
                    Quick Actions
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Link
                      href="/shop"
                      className={`flex items-center gap-3 p-4 border-2 border-[#911b1e]/20 rounded hover:border-[#911b1e] transition-colors ${raleway.className}`}
                    >
                      <svg className="w-6 h-6 text-[#911b1e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <div>
                        <p className="text-[#911b1e] font-medium">Shop</p>
                        <p className="text-[#911b1e]/60 text-sm">Browse products</p>
                      </div>
                    </Link>

                    <Link
                      href="/profile/orders"
                      className={`flex items-center gap-3 p-4 border-2 border-[#911b1e]/20 rounded hover:border-[#911b1e] transition-colors ${raleway.className}`}
                    >
                      <svg className="w-6 h-6 text-[#911b1e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <div>
                        <p className="text-[#911b1e] font-medium">My Orders</p>
                        <p className="text-[#911b1e]/60 text-sm">Order history</p>
                      </div>
                    </Link>

                    {isMember && (
                      <Link
                        href="/events"
                        className={`flex items-center gap-3 p-4 border-2 border-[#911b1e]/20 rounded hover:border-[#911b1e] transition-colors ${raleway.className}`}
                      >
                        <svg className="w-6 h-6 text-[#911b1e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <p className="text-[#911b1e] font-medium">Events</p>
                          <p className="text-[#911b1e]/60 text-sm">Member events</p>
                        </div>
                      </Link>
                    )}

                    {!isMember && (
                      <Link
                        href="/membership"
                        className={`flex items-center gap-3 p-4 border-2 border-[#911b1e]/20 rounded hover:border-[#911b1e] transition-colors ${raleway.className}`}
                      >
                        <svg className="w-6 h-6 text-[#911b1e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <div>
                          <p className="text-[#911b1e] font-medium">Join Club</p>
                          <p className="text-[#911b1e]/60 text-sm">Become a member</p>
                        </div>
                      </Link>
                    )}

                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        className={`flex items-center gap-3 p-4 border-2 border-[#911b1e]/20 rounded hover:border-[#911b1e] transition-colors ${raleway.className}`}
                      >
                        <svg className="w-6 h-6 text-[#911b1e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <div>
                          <p className="text-[#911b1e] font-medium">Admin Panel</p>
                          <p className="text-[#911b1e]/60 text-sm">Manage site</p>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
