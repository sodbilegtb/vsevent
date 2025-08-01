// app/events/new/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export default function NewEventPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // State for form fields
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    location: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null); // Clear previous errors

    startTransition(async () => {
      try {
        const res = await fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          router.push('/events');
          router.refresh(); // Revalidate the events list
        } else {
          const errorData = await res.json();
          // Display validation errors or a general error
          if (errorData.errors) {
            const fieldErrors = Object.values(errorData.errors).flat().join(', ');
            setError(`Validation failed: ${fieldErrors}`);
          } else {
            setError(errorData.error || 'Failed to create event.');
          }
        }
      } catch (err) {
        console.error('Client-side create error:', err);
        setError('An unexpected error occurred during event creation.');
      }
    });
  }

  return (
    <div className="p-4 md:p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Event</h1>
      <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white rounded-lg shadow">
        
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input 
            id="title" 
            name="title" 
            value={formData.title}
            onChange={handleChange}
            required 
            className="mt-1 border p-2 w-full rounded-md shadow-sm" 
            disabled={isPending}
          />
        </div>

        {/* Description Textarea */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            id="description" 
            name="description" 
            value={formData.description}
            onChange={handleChange}
            className="mt-1 border p-2 w-full rounded-md shadow-sm" 
            rows={4} 
            disabled={isPending}
          />
        </div>

        {/* Category Input */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <input 
            id="category" 
            name="category" 
            value={formData.category}
            onChange={handleChange}
            className="mt-1 border p-2 w-full rounded-md shadow-sm" 
            disabled={isPending}
          />
        </div>

        {/* Date Input */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input 
            id="date" 
            type="date" 
            name="date" 
            value={formData.date}
            onChange={handleChange}
            required 
            className="mt-1 border p-2 w-full rounded-md shadow-sm" 
            disabled={isPending}
          />
        </div>

        {/* Location Input */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input 
            id="location" 
            name="location" 
            value={formData.location}
            onChange={handleChange}
            className="mt-1 border p-2 w-full rounded-md shadow-sm" 
            disabled={isPending}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Action Buttons */}
        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-400"
            disabled={isPending}
          >
            {isPending ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </form>
    </div>
  );
}
