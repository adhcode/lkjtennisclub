'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Raleway } from 'next/font/google';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

interface Member {
  id: string;
  membershipId: string;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  membershipType: string;
  membershipStatus: string;
  joinDate: string;
  expiryDate: string | null;
  createdAt: string;
}

export default function MembersListPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/members/list')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMembers(data.members);
        } else {
          setError('Failed to load members');
        }
        setLoading(false);
      })
      .catch(err => {
        setError('An error occurred');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fcf7dc]">
        <Navbar />
        <div className="pt-32 pb-16 px-4 md:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto border-4 border-[#911b1e] border-t-transparent rounded-full animate-spin"></div>
            <p className={`mt-4 text-[#911b1e] ${raleway.className}`}>Loading members...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcf7dc]">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-[#911b1e] text-4xl font-agrandir mb-2">
            Members List
          </h1>
          <p className={`text-[#911b1e]/60 mb-8 ${raleway.className}`}>
            Total Members: {members.length}
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {members.length === 0 ? (
            <div className="bg-white rounded-lg p-8 shadow-sm text-center">
              <p className={`text-[#911b1e]/60 ${raleway.className}`}>
                No members found
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#911b1e] text-[#fcf7dc]">
                    <tr>
                      <th className={`px-6 py-3 text-left text-sm font-medium ${raleway.className}`}>
                        Membership ID
                      </th>
                      <th className={`px-6 py-3 text-left text-sm font-medium ${raleway.className}`}>
                        Name
                      </th>
                      <th className={`px-6 py-3 text-left text-sm font-medium ${raleway.className}`}>
                        Email
                      </th>
                      <th className={`px-6 py-3 text-left text-sm font-medium ${raleway.className}`}>
                        Phone
                      </th>
                      <th className={`px-6 py-3 text-left text-sm font-medium ${raleway.className}`}>
                        Type
                      </th>
                      <th className={`px-6 py-3 text-left text-sm font-medium ${raleway.className}`}>
                        Status
                      </th>
                      <th className={`px-6 py-3 text-left text-sm font-medium ${raleway.className}`}>
                        Join Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#911b1e]/10">
                    {members.map((member) => (
                      <tr key={member.id} className="hover:bg-[#fcf7dc]/50">
                        <td className={`px-6 py-4 text-sm text-[#911b1e] font-mono ${raleway.className}`}>
                          {member.membershipId}
                        </td>
                        <td className={`px-6 py-4 text-sm text-[#911b1e] ${raleway.className}`}>
                          {member.firstName} {member.lastName}
                        </td>
                        <td className={`px-6 py-4 text-sm text-[#911b1e] ${raleway.className}`}>
                          {member.email || '-'}
                        </td>
                        <td className={`px-6 py-4 text-sm text-[#911b1e] ${raleway.className}`}>
                          {member.phone || '-'}
                        </td>
                        <td className={`px-6 py-4 text-sm ${raleway.className}`}>
                          <span className="inline-block px-2 py-1 bg-[#fcf7dc] text-[#911b1e] rounded text-xs">
                            {member.membershipType}
                          </span>
                        </td>
                        <td className={`px-6 py-4 text-sm ${raleway.className}`}>
                          <span className={`inline-block px-2 py-1 rounded text-xs ${
                            member.membershipStatus === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {member.membershipStatus}
                          </span>
                        </td>
                        <td className={`px-6 py-4 text-sm text-[#911b1e] ${raleway.className}`}>
                          {new Date(member.joinDate).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-[#911b1e] text-lg font-agrandir mb-4">
              Quick Stats
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-[#fcf7dc] rounded">
                <p className="text-3xl font-agrandir text-[#911b1e]">{members.length}</p>
                <p className={`text-sm text-[#911b1e]/60 ${raleway.className}`}>Total Members</p>
              </div>
              <div className="text-center p-4 bg-[#fcf7dc] rounded">
                <p className="text-3xl font-agrandir text-[#911b1e]">
                  {members.filter(m => m.membershipStatus === 'active').length}
                </p>
                <p className={`text-sm text-[#911b1e]/60 ${raleway.className}`}>Active</p>
              </div>
              <div className="text-center p-4 bg-[#fcf7dc] rounded">
                <p className="text-3xl font-agrandir text-[#911b1e]">
                  {members.filter(m => m.membershipType === 'regular').length}
                </p>
                <p className={`text-sm text-[#911b1e]/60 ${raleway.className}`}>Regular</p>
              </div>
              <div className="text-center p-4 bg-[#fcf7dc] rounded">
                <p className="text-3xl font-agrandir text-[#911b1e]">
                  {new Date().getFullYear()}
                </p>
                <p className={`text-sm text-[#911b1e]/60 ${raleway.className}`}>Current Year</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
