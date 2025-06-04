// app/events/page.tsx
import Link from 'next/link';
import { loadEvents, Event } from '@/lib/data';
import { deleteEventAction } from '@/app/_actions/eventActions'; // Correct path to actions

export default async function EventsPage() {
  const events = loadEvents();

  return (
    <div>
      <h1>Upcoming Events</h1>
      {events.length === 0 ? (
        <p>No events scheduled. <Link href="/events/create">Create one!</Link></p>
      ) : (
        <ul>
          {events.map((event, index) => (
            <li key={index}> {/* Using index as key is okay if list isn't reordered, but unique ID is better */}
              <strong>{event.title}</strong> - {event.category} ({event.date}) at {event.location}
              <p>{event.description}</p>
              <div style={{ marginTop: '0.5rem' }}>
                {/* Server Action for delete */}
                <form action={deleteEventAction.bind(null, index)} style={{ display: 'inline', marginRight: '0.5rem' }}>
                  <button type="submit">Delete</button>
                </form>
                <Link href={`/events/${index}/edit`}>
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
      <br />
      <Link href="/events/create">
        <button>Create New Event</button>
      </Link>
    </div>
  );
}