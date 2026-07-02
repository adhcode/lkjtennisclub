'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductImageUpload from '@/components/ProductImageUpload';
import { motion } from 'framer-motion';
import { Raleway } from 'next/font/google';
import { X, Plus } from 'lucide-react';
import { PRODUCT_CATEGORIES, COMMON_SIZES, COMMON_COLORS, getCategoryOptions } from '@/lib/productCategories';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'rackets',
    brand: '',
    stock: '',
    featured: false,
  });
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [customSize, setCustomSize] = useState('');
  const [customColor, setCustomColor] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageUpload = (url: string) => {
    setImages(prev => [...prev, url]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addSize = (size: string) => {
    if (size && !sizes.includes(size)) {
      setSizes(prev => [...prev, size]);
      setCustomSize('');
    }
  };

  const removeSize = (size: string) => {
    setSizes(prev => prev.filter(s => s !== size));
  };

  const addColor = (color: string) => {
    if (color && !colors.includes(color)) {
      setColors(prev => [...prev, color]);
      setCustomColor('');
    }
  };

  const removeColor = (color: string) => {
    setColors(prev => prev.filter(c => c !== color));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          slug,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          images,
          sizes: sizes.length > 0 ? sizes : undefined,
          colors: colors.length > 0 ? colors : undefined,
        }),
      });

      if (response.ok) {
        router.push('/admin/products');
      } else {
        alert('Failed to create product');
      }
    } catch (error) {
      console.error('Product creation error:', error);
      alert('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const categoryConfig = PRODUCT_CATEGORIES[formData.category as keyof typeof PRODUCT_CATEGORIES];
  const showSizes = categoryConfig.fields.includes('sizes');
  const showColors = categoryConfig.fields.includes('colors');

  return (
    <main className="min-h-screen bg-[#fcf7dc]">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#911b1e] text-3xl md:text-4xl font-agrandir mb-8"
          >
            Add New Product
          </motion.h1>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-[#911b1e] text-xl font-agrandir mb-4">
                Basic Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className={`block text-[#911b1e] mb-2 ${raleway.className}`}>
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                    placeholder="e.g., Wilson Pro Staff RF97"
                  />
                </div>

                <div>
                  <label className={`block text-[#911b1e] mb-2 ${raleway.className}`}>
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                    placeholder="Detailed product description..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-[#911b1e] mb-2 ${raleway.className}`}>
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                    >
                      {getCategoryOptions().map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-[#911b1e] mb-2 ${raleway.className}`}>
                      Brand
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                      placeholder="e.g., Wilson, Nike"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-[#911b1e] mb-2 ${raleway.className}`}>
                      Price (₦) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className={`block text-[#911b1e] mb-2 ${raleway.className}`}>
                      Stock Quantity *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full px-4 py-3 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="featured"
                    id="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <label htmlFor="featured" className={`text-[#911b1e] ${raleway.className}`}>
                    Featured Product
                  </label>
                </div>
              </div>
            </div>

            {/* Images */}
            <div>
              <h2 className="text-[#911b1e] text-xl font-agrandir mb-4">
                Product Images
              </h2>
              
              <div className="space-y-4">
                <ProductImageUpload onUploadSuccess={handleImageUpload} />
                
                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {images.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Product ${index + 1}`}
                          className="w-full h-32 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sizes */}
            {showSizes && (
              <div>
                <h2 className="text-[#911b1e] text-xl font-agrandir mb-4">
                  Available Sizes
                </h2>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {(formData.category === 'mens-apparel' || formData.category === 'womens-apparel' 
                      ? COMMON_SIZES[formData.category as keyof typeof COMMON_SIZES] 
                      : COMMON_SIZES.shoes).map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => addSize(size)}
                        className={`px-4 py-2 border transition-all ${raleway.className}
                          ${sizes.includes(size)
                            ? 'bg-[#911b1e] text-[#fcf7dc] border-[#911b1e]'
                            : 'bg-white text-[#911b1e] border-[#911b1e]/20 hover:border-[#911b1e]'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customSize}
                      onChange={(e) => setCustomSize(e.target.value)}
                      placeholder="Custom size"
                      className="flex-1 px-4 py-2 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                    />
                    <button
                      type="button"
                      onClick={() => addSize(customSize)}
                      className="bg-[#911b1e] text-[#fcf7dc] px-4 py-2 rounded hover:bg-[#911b1e]/90"
                    >
                      <Plus size={20} />
                    </button>
                  </div>

                  {sizes.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {sizes.map(size => (
                        <span
                          key={size}
                          className="bg-[#911b1e] text-[#fcf7dc] px-3 py-1 rounded-full flex items-center gap-2"
                        >
                          {size}
                          <button type="button" onClick={() => removeSize(size)}>
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Colors */}
            {showColors && (
              <div>
                <h2 className="text-[#911b1e] text-xl font-agrandir mb-4">
                  Available Colors
                </h2>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {COMMON_COLORS.map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => addColor(color)}
                        className={`px-4 py-2 border transition-all ${raleway.className}
                          ${colors.includes(color)
                            ? 'bg-[#911b1e] text-[#fcf7dc] border-[#911b1e]'
                            : 'bg-white text-[#911b1e] border-[#911b1e]/20 hover:border-[#911b1e]'
                          }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      placeholder="Custom color"
                      className="flex-1 px-4 py-2 border border-[#911b1e]/20 rounded focus:outline-none focus:border-[#911b1e]"
                    />
                    <button
                      type="button"
                      onClick={() => addColor(customColor)}
                      className="bg-[#911b1e] text-[#fcf7dc] px-4 py-2 rounded hover:bg-[#911b1e]/90"
                    >
                      <Plus size={20} />
                    </button>
                  </div>

                  {colors.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {colors.map(color => (
                        <span
                          key={color}
                          className="bg-[#911b1e] text-[#fcf7dc] px-3 py-1 rounded-full flex items-center gap-2"
                        >
                          {color}
                          <button type="button" onClick={() => removeColor(color)}>
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Submit */}
            <div className="flex gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading || images.length === 0}
                className={`flex-1 bg-[#911b1e] text-[#fcf7dc] py-4 hover:bg-[#911b1e]/90 
                  transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${raleway.className} font-medium`}
              >
                {loading ? 'Creating Product...' : 'Create Product'}
              </motion.button>

              <button
                type="button"
                onClick={() => router.back()}
                className={`px-8 py-4 border border-[#911b1e]/20 text-[#911b1e] hover:bg-[#911b1e]/10 
                  transition-colors ${raleway.className}`}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}
