'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Raleway } from 'next/font/google';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import ImageUpload from '@/components/ImageUpload';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditEventPage({ params }: PageProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [eventId, setEventId] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    startDate: '',
    endDate: '',
    location: '',
    price: 0,
    maxParticipants: undefined as number | undefined,
    featuredImage: '',
    status: 'draft',
    featured: false,
    requiresRegistration: false,
    registrationDeadline: '',
    metaTitle: '',
    metaDescription: '',
  });

  useEffect(() => {
    params.then(p => {
      setEventId(p.id);
    });
  }, [params]);

  useEffect(() => {
    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}`);
      if (response.ok) {
        const event = await response.json();
        
        // Format dates for datetime-local input
        const formatDateForInput = (dateString: string) => {
          if (!dateString) return '';
          const date = new Date(dateString);
          return date.toISOString().slice(0, 16);
        };

        setFormData({
          title: event.title || '',
          slug: event.slug || '',
          description: event.description || '',
          content: event.content || '',
          startDate: formatDateForInput(event.startDate),
          endDate: event.endDate ? formatDateForInput(event.endDate) : '',
          location: event.location || '',
          price: event.price || 0,
          maxParticipants: event.maxParticipants || undefined,
          featuredImage: event.featuredImage || '',
          status: event.status || 'draft',
          featured: event.featured || false,
          requiresRegistration: event.requiresRegistration || false,
          registrationDeadline: event.registrationDeadline ? formatDateForInput(event.registrationDeadline) : '',
          metaTitle: event.metaTitle || '',
          metaDescription: event.metaDescription || '',
        });
      } else {
        alert('Event not found');
        router.push('/admin/events');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Failed to load event');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: value === '' ? undefined : Number(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/events');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to update event');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to update event');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto border-4 border-[#911b1e] border-t-transparent rounded-full animate-spin"></div>
          <p className={`mt-4 text-gray-600 ${raleway.className}`}>Loading event...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <Link href="/admin/events" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft size={20} />
          <span className={raleway.className}>Back to Events</span>
        </Link>
        <h1 className="text-3xl font-agrandir text-gray-900">Edit Event</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-agrandir text-gray-900 mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1 ${raleway.className}`}>
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#911b1e] focus:border-transparent ${raleway.className}`}
                  placeholder="e.g., Summer Tennis Tournament"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1 ${raleway.className}`}>
                  URL Slug *
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#911b1e] focus:border-transparent ${raleway.className}`}
                  placeholder="summer-tennis-tournament"
                />
                <p className={`text-xs text-gray-500 mt-1 ${raleway.className}`}>
                  URL: /events/{formData.slug || 'your-event-slug'}
                </p>
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1 ${raleway.className}`}>
                  Short Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#911b1e] focus:border-transparent ${raleway.className}`}
                  placeholder="Brief description for event cards"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1 ${raleway.className}`}>
                  Full Content
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={8}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#911b1e] focus:border-transparent ${raleway.className}`}
                  placeholder="Full event details (HTML supported)"
                />
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div>
            <h2 className="text-xl font-agrandir text-gray-900 mb-4">Event Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1 ${raleway.className}`}>
                  Start Date & Time *
                </label>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#911b1e] focus:border-transparent ${raleway.className}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1 ${raleway.className}`}>
                  End Date & Time
                </label>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#911b1e] focus:border-transparent ${raleway.className}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1 ${raleway.className}`}>
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#911b1e] focus:border-transparent ${raleway.className}`}
                  placeholder="e.g., LKJ Tennis Club Courts"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1 ${raleway.className}`}>
                  Price (₦)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#911b1e] focus:border-transparent ${raleway.className}`}
                  placeholder="0 for free events"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1 ${raleway.className}`}>
                  Max Participants
                </label>
                <input
                  type="number"
                  name="maxParticipants"
                  value={formData.maxParticipants || ''}
                  onChange={handleChange}
                  min="1"
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#911b1e] focus:border-transparent ${raleway.className}`}
                  placeholder="Leave empty for unlimited"
                />
              </div>
            </div>
          </div>

          {/* Registration */}
          <div>
            <h2 className="text-xl font-agrandir text-gray-900 mb-4">Registration</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="requiresRegistration"
                  checked={formData.requiresRegistration}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#911b1e] border-gray-300 rounded focus:ring-[#911b1e]"
                />
                <label className={`text-sm font-medium text-gray-700 ${raleway.className}`}>
                  Requires Registration
                </label>
              </div>

              {formData.requiresRegistration && (
                <div>
                  <label className={`block text-sm font-medium text-gray-700 mb-1 ${raleway.className}`}>
                    Registration Deadline
                  </label>
                  <input
                    type="datetime-local"
                    name="registrationDeadline"
                    value={formData.registrationDeadline}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#911b1e] focus:border-transparent ${raleway.className}`}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Media */}
          <div>
            <h2 className="text-xl font-agrandir text-gray-900 mb-4">Featured Image</h2>
            <ImageUpload
              currentImage={formData.featuredImage}
              onImageUploaded={(url) => setFormData(prev => ({ ...prev, featuredImage: url }))}
              folder="events"
            />
          </div>

          {/* Status */}
          <div>
            <h2 className="text-xl font-agrandir text-gray-900 mb-4">Status & Visibility</h2>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1 ${raleway.className}`}>
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#911b1e] focus:border-transparent ${raleway.className}`}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#911b1e] border-gray-300 rounded focus:ring-[#911b1e]"
                />
                <label className={`text-sm font-medium text-gray-700 ${raleway.className}`}>
                  Featured Event (Show on homepage)
                </label>
              </div>
            </div>
          </div>

          {/* SEO */}
          <div>
            <h2 className="text-xl font-agrandir text-gray-900 mb-4">SEO (Optional)</h2>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1 ${raleway.className}`}>
                  Meta Title
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#911b1e] focus:border-transparent ${raleway.className}`}
                  placeholder="Leave empty to use event title"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium text-gray-700 mb-1 ${raleway.className}`}>
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  rows={2}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#911b1e] focus:border-transparent ${raleway.className}`}
                  placeholder="Leave empty to use short description"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4 border-t">
            <button
              type="submit"
              disabled={saving}
              className={`flex items-center gap-2 bg-[#911b1e] text-white px-6 py-3 rounded-lg hover:bg-[#911b1e]/90 transition-colors disabled:opacity-50 ${raleway.className}`}
            >
              <Save size={20} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <Link href="/admin/events">
              <button
                type="button"
                className={`px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors ${raleway.className}`}
              >
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
