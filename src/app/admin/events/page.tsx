'use client';

import { useState, useEffect } from 'react';
import { Raleway } from 'next/font/google';
import { Plus, Edit, Trash2, Calendar, Users, MapPin, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const raleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600'] });

interface Event {
  id: string;
  title: string;
  slug: string;
  description?: string;
  startDate: string;
  endDate?: string;
  location?: string;
  price?: number;
  maxParticipants?: number;
  featuredImage?: string;
  status: string;
  featured: boolean;
  showInHeroBanner: boolean;
  requiresRegistration: boolean;
  _count: {
    registrations: number;
  };
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  const fetchEvents = async () => {
    try {
      console.log('Fetching events with filter:', filter);
      const response = await fetch(`/api/events?status=${filter}`);
      console.log('Response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Events fetched:', data.length, 'events');
        setEvents(data);
      } else {
        console.error('Failed to fetch events, status:', response.status);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEvents(events.filter(e => e.id !== id));
      } else {
        alert('Failed to delete event');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete event');
    }
  };

  const toggleHeroBanner = async (id: string, currentValue: boolean) => {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ showInHeroBanner: !currentValue }),
      });

      if (response.ok) {
        // Update the local state
        setEvents(events.map(e => 
          e.id === id ? { ...e, showInHeroBanner: !currentValue } : e
        ));
      } else {
        alert('Failed to update hero banner setting');
      }
    } catch (error) {
      console.error('Toggle error:', error);
      alert('Failed to update hero banner setting');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatPrice = (price?: number) => {
    if (!price || price === 0) return 'Free';
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-agrandir text-gray-900 mb-2">
            Events
          </h1>
          <p className={`text-gray-600 ${raleway.className}`}>
            Manage club events and registrations
          </p>
        </div>
        <Link href="/admin/events/new">
          <button
            className={`bg-[#911b1e] text-white px-6 py-3 rounded-lg hover:bg-[#911b1e]/90 transition-colors flex items-center gap-2 ${raleway.className}`}
          >
            <Plus size={20} />
            Add Event
          </button>
        </Link>
      </div>

      <div className="mb-6">
        <div className="flex gap-2">
          {[
            { value: 'all', label: 'All Events' },
            { value: 'published', label: 'Published' },
            { value: 'draft', label: 'Draft' },
            { value: 'cancelled', label: 'Cancelled' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${raleway.className} ${
                filter === option.value
                  ? 'bg-[#911b1e] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto border-4 border-[#911b1e] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : events.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <Calendar className="mx-auto text-gray-400 mb-4" size={48} />
          <p className={`text-gray-600 mb-4 ${raleway.className}`}>
            No events found
          </p>
          <Link href="/admin/events/new">
            <button className={`bg-[#911b1e] text-white px-6 py-3 rounded-lg hover:bg-[#911b1e]/90 transition-colors ${raleway.className}`}>
              Create Your First Event
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-4 flex-1">
                  {event.featuredImage && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      {event.featuredImage.startsWith('http') ? (
                        <Image
                          src={event.featuredImage}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <img
                          src={event.featuredImage}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-semibold text-lg text-gray-900 ${raleway.className}`}>
                        {event.title}
                      </h3>
                      {event.showInHeroBanner && (
                        <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                          </svg>
                          Hero Banner
                        </span>
                      )}
                      {event.featured && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(event.status)} ${raleway.className}`}>
                        {event.status}
                      </span>
                    </div>
                    {event.description && (
                      <p className={`text-sm text-gray-600 mb-3 ${raleway.className}`}>
                        {event.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span className={raleway.className}>{formatDate(event.startDate)}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <MapPin size={14} />
                          <span className={raleway.className}>{event.location}</span>
                        </div>
                      )}
                      <div className={raleway.className}>
                        {formatPrice(event.price)}
                      </div>
                      {event.requiresRegistration && (
                        <div className="flex items-center gap-1">
                          <Users size={14} />
                          <span className={raleway.className}>
                            {event._count.registrations}
                            {event.maxParticipants && `/${event.maxParticipants}`}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="mt-3">
                      <button
                        onClick={() => toggleHeroBanner(event.id, event.showInHeroBanner)}
                        className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${raleway.className} ${
                          event.showInHeroBanner
                            ? 'bg-purple-100 text-purple-800 hover:bg-purple-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {event.showInHeroBanner ? '✓ Showing in Hero Banner' : 'Show in Hero Banner'}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Link href={`/events/${event.slug}`} target="_blank">
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="View Event">
                      <Eye size={20} />
                    </button>
                  </Link>
                  <Link href={`/admin/events/${event.id}/edit`}>
                    <button className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors" title="Edit Event">
                      <Edit size={20} />
                    </button>
                  </Link>
                  <button 
                    className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors" 
                    title="Delete Event"
                    onClick={() => handleDelete(event.id, event.title)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
