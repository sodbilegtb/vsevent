// app/events/[index]/edit/page.tsx
import { loadEvents, Event } from '@/lib/data';
import { updateEventAction } from '@/app/_actions/eventActions';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation'; // For handling not found

interface EditEventPageProps {
  params: {
    index: string; // Dynamic route parameters are always strings
  };
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const events = loadEvents();
  const eventIndex = parseInt(params.index, 10);

  if (isNaN(eventIndex) || eventIndex < 0 || eventIndex >= events.length) {
    notFound(); // This will render the nearest not-found.tsx or a default Next.js 404 page
    return; // Important to return after calling notFound or redirect
  }

  const event = events[eventIndex];

  // Bind the index to the server action
  const updateEventWithIndex = updateEventAction.bind(null, eventIndex);

  return (
    <div>
      <h1>Edit Event</h1>
      {/* @ts-ignore */}
      <form action={updateEventWithIndex}>
        <input type="text" name="title" defaultValue={event.title} placeholder="Title" required /><br />
        <textarea name="description" defaultValue={event.description} placeholder="Description"></textarea><br />
        <input type="text" name="category" defaultValue={event.category} placeholder="Category" /><br />
        <input type="date" name="date" defaultValue={event.date} required /><br />
        <input type="text" name="location" defaultValue={event.location} placeholder="Location" /><br />
        <button type="submit">Update Event</button>
      </form>
      <br />
      <Link href="/events">Cancel</Link>
    </div>
  );
}