// app/events/page.tsx
import Link from 'next/link';
import { loadEvents } from '@/app/lib/data';

export default async function EventsPage() {
  const events = await loadEvents();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Events</h1>

      <Link href="/events/new" className="text-blue-500 underline">
        Create Event
      </Link>

      <ul className="mt-6 space-y-4">
        {events.map((event: any, index: number) => (
          <li key={event._id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p>{event.description}</p>

            <div className="mt-2 flex gap-4">
              <Link
                href={`/events/${event._id}`}
                className="text-sm text-blue-600 underline"
              >
                View
              </Link>


              <Link
                href={`/events/${event._id}/edit`}
                className="text-sm text-green-600 underline"
              >
                Edit
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
