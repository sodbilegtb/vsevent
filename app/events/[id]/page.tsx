// app/events/[id]/page.tsx
import { getEvent } from '@/app/lib/data';
import { notFound } from 'next/navigation';
// Update import path for DeleteButton
import DeleteButton from '@/app/events/components/DeleteButton'; 
import Link from 'next/link';

interface Props {
  params: { id: string };
}

// This tells Next.js to generate metadata for this page
export async function generateMetadata(props: Props) {
  // Await params as suggested by the Next.js error message
  const { id } = await props.params;
  const event = await getEvent(id);
  return {
    title: event ? event.title : 'Event Not Found',
  };
}

export default async function EventDetailPage(props: Props) {
  // Await params as suggested by the Next.js error message
  const { id } = await props.params;
  const event = await getEvent(id);

  // If no event is found, render the 404 page
  if (!event) {
    return notFound();
  }

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
      <p className="text-md text-gray-600 mt-2">{event.description}</p>
      
      <div className="mt-4 space-y-2 border-t pt-4">
        <p><span className="font-semibold">Date:</span> {new Date(event.date).toLocaleDateString()}</p>
        <p><span className="font-semibold">Location:</span> {event.location}</p>
        <p><span className="font-semibold">Category:</span> <span className="text-sm bg-gray-200 text-gray-800 px-2 py-1 rounded-full">{event.category}</span></p>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <Link 
          href={`/events/${event._id}/edit`}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition-colors"
        >
          Edit Event
        </Link>
        {/* The DeleteButton is a Client Component that handles its own state */}
        <DeleteButton eventId={event._id} />
      </div>
    </div>
  );
}
