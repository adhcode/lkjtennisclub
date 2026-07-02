'use client';

import { useState, useEffect } from 'react';
import { Raleway } from 'next/font/google';
import { Check, X } from 'lucide-react';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

interface ProductRequest {
  id: string;
  productName: string;
  description?: string;
  customerName: string;
  customerEmail: string;
  status: string;
  createdAt: string;
}

export default function ProductRequestsPage() {
  const [requests, setRequests] = useState<ProductRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/product-requests');
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/product-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchRequests();
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-agrandir text-gray-900 mb-2">
          Product Requests
        </h1>
        <p className={`text-gray-600 ${raleway.className}`}>
          Customer product requests
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto border-4 border-[#911b1e] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : requests.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className={`text-gray-600 ${raleway.className}`}>
            No product requests yet
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${raleway.className}`}>
                  Product
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${raleway.className}`}>
                  Customer
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${raleway.className}`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${raleway.className}`}>
                  Date
                </th>
                <th className={`px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider ${raleway.className}`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4">
                    <div className={`font-medium text-gray-900 ${raleway.className}`}>
                      {request.productName}
                    </div>
                    {request.description && (
                      <div className={`text-sm text-gray-600 ${raleway.className}`}>
                        {request.description}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className={`text-gray-900 ${raleway.className}`}>
                      {request.customerName}
                    </div>
                    <div className={`text-sm text-gray-600 ${raleway.className}`}>
                      {request.customerEmail}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    } ${raleway.className}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-600 ${raleway.className}`}>
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {request.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateStatus(request.id, 'approved')}
                          className="text-green-600 hover:text-green-900 mr-4"
                          title="Approve"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={() => updateStatus(request.id, 'rejected')}
                          className="text-red-600 hover:text-red-900"
                          title="Reject"
                        >
                          <X size={18} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
