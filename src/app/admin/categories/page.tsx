'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';
import { Raleway } from 'next/font/google';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order: number;
  active: boolean;
  _count: {
    products: number;
  };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '🎾',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingId ? `/api/categories/${editingId}` : '/api/categories';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchCategories();
        setShowForm(false);
        setEditingId(null);
        setFormData({ name: '', description: '', icon: '🎾' });
      }
    } catch (error) {
      console.error('Failed to save category:', error);
      alert('Failed to save category');
    }
  };

  const handleEdit = (category: Category) => {
    setFormData({
      name: category.name,
      description: category.description || '',
      icon: category.icon || '🎾',
    });
    setEditingId(category.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCategories(prev => prev.filter(c => c.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
      alert('Failed to delete category');
    }
  };

  return (
    <main className="min-h-screen bg-[#fcf7dc]">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-[#911b1e] text-3xl md:text-4xl font-agrandir">
                Categories
              </h1>
              <p className={`text-[#911b1e]/60 mt-2 ${raleway.className}`}>
                {categories.length} categories
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowForm(true);
                setEditingId(null);
                setFormData({ name: '', description: '', icon: '🎾' });
              }}
              className={`bg-[#911b1e] text-[#fcf7dc] px-6 py-3 flex items-center gap-2 
                hover:bg-[#911b1e]/90 transition-colors ${raleway.className}`}
            >
              <Plus size={20} />
              Add Category
            </motion.button>
          </div>

          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg p-6 mb-6"
            >
              <h2 className="text-[#911b1e] text-xl font-agrandir mb-4">
                {editingId ? 'Edit Category' : 'New Category'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-[#911b1e] mb-2 ${raleway.className}`}>
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                    placeholder="e.g., Tennis Rackets"
                  />
                </div>

                <div>
                  <label className={`block text-[#911b1e] mb-2 ${raleway.className}`}>
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                    placeholder="Brief description..."
                  />
                </div>

                <div>
                  <label className={`block text-[#911b1e] mb-2 ${raleway.className}`}>
                    Icon (Emoji)
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                    placeholder="🎾"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className={`flex-1 bg-[#911b1e] text-[#fcf7dc] py-3 hover:bg-[#911b1e]/90 
                      transition-colors ${raleway.className} font-medium`}
                  >
                    {editingId ? 'Update' : 'Create'} Category
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                    }}
                    className={`px-8 py-3 border border-[#911b1e]/20 text-[#911b1e] hover:bg-[#911b1e]/10 
                      transition-colors ${raleway.className}`}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {loading ? (
            <div className="bg-white rounded-lg p-12 text-center">
              <p className={`text-[#911b1e]/60 ${raleway.className}`}>Loading categories...</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center">
              <Tag size={64} className="text-[#911b1e]/30 mx-auto mb-4" />
              <p className={`text-[#911b1e]/60 mb-4 ${raleway.className}`}>
                No categories yet. Add your first category to get started.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {categories.map((category) => (
                <div key={category.id} className="bg-white rounded-lg p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{category.icon || '🎾'}</div>
                    <div>
                      <h3 className="text-[#911b1e] text-lg font-agrandir">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className={`text-[#911b1e]/60 text-sm ${raleway.className}`}>
                          {category.description}
                        </p>
                      )}
                      <p className={`text-[#911b1e]/40 text-sm mt-1 ${raleway.className}`}>
                        {category._count.products} products
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="text-[#911b1e] hover:bg-[#911b1e]/10 p-2 rounded transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:bg-red-50 p-2 rounded transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
