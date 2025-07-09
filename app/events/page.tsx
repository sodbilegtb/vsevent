// app/events/page.tsx
import Link from 'next/link';
import { loadEvents } from '@/app/lib/data';
import { IEvent } from '@/app/lib/definitions';

export default async function EventsPage() {
  // Fetch all events using our server-side data function
  const events = await loadEvents();

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Events</h1>
        <Link 
          href="/events/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
        >
          Create Event
        </Link>
      </div>

      {events.length > 0 ? (
        <ul className="mt-6 space-y-4">
          {events.map((event: IEvent) => (
            <li key={event._id} className="border p-4 rounded-lg shadow-sm bg-white">
              <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>
              <p className="text-gray-600 mt-1">{event.description}</p>
              <div className="text-sm text-gray-500 mt-2">
                <span>{new Date(event.date).toLocaleDateString()}</span> | <span>{event.location}</span> | <span>{event.category}</span>
              </div>
              <div className="mt-4 flex gap-4">
                <Link
                  href={`/events/${event._id}`}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  View Details
                </Link>
                <Link
                  href={`/events/${event._id}/edit`}
                  className="text-sm font-medium text-green-600 hover:underline"
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 mt-10">No events found. Why not create one?</p>
      )}
    </div>
  );
}
