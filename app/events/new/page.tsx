// app/events/new/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewEventPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, category, date, location }),
    });

    if (res.ok) {
      router.push('/events');
    } else {
      alert('Failed to create event.');
    }
  }

  return (
    <div>
      <h1>Create New Event</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        /><br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        /><br />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
        /><br />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
        /><br />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}
