'use client';

import { useState, useEffect } from 'react';
import { Raleway } from 'next/font/google';
import { Plus, Edit, Trash2 } from 'lucide-react';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  active: boolean;
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch('/api/brands');
      if (response.ok) {
        const data = await response.json();
        setBrands(data);
      }
    } catch (error) {
      console.error('Failed to fetch brands:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: '', description: '' });
        setShowForm(false);
        fetchBrands();
      }
    } catch (error) {
      console.error('Failed to create brand:', error);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-agrandir text-gray-900 mb-2">
            Brands
          </h1>
          <p className={`text-gray-600 ${raleway.className}`}>
            Manage product brands
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`bg-[#911b1e] text-white px-6 py-3 rounded-lg hover:bg-[#911b1e]/90 transition-colors flex items-center gap-2 ${raleway.className}`}
        >
          <Plus size={20} />
          Add Brand
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-agrandir text-gray-900 mb-4">
            New Brand
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-gray-700 mb-2 ${raleway.className}`}>
                Brand Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#911b1e]"
              />
            </div>
            <div>
              <label className={`block text-gray-700 mb-2 ${raleway.className}`}>
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#911b1e]"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className={`bg-[#911b1e] text-white px-6 py-2 rounded-lg hover:bg-[#911b1e]/90 transition-colors ${raleway.className}`}
              >
                Create Brand
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className={`bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors ${raleway.className}`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto border-4 border-[#911b1e] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${raleway.className}`}>
                  Name
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${raleway.className}`}>
                  Description
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${raleway.className}`}>
                  Status
                </th>
                <th className={`px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider ${raleway.className}`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {brands.map((brand) => (
                <tr key={brand.id}>
                  <td className={`px-6 py-4 whitespace-nowrap ${raleway.className}`}>
                    {brand.name}
                  </td>
                  <td className={`px-6 py-4 text-gray-600 ${raleway.className}`}>
                    {brand.description || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${brand.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} ${raleway.className}`}>
                      {brand.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">
                      <Edit size={18} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 size={18} />
                    </button>
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
