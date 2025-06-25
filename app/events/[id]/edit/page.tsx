import { getEvent } from '@/app/lib/data';
import { updateEvent } from '@/app/_actions/eventActions';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import DeleteButton from '@/app/components/DeleteButton';

interface EditEventPageProps {
  params: { id: string };
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const event = await getEvent(params.id);
  if (!event) return notFound();

  const updateEventWithId = updateEvent.bind(null, params.id);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Event</h1>

      {/* Update Form */}
      <form action={updateEventWithId} className="space-y-4">
        <input
          type="text"
          name="title"
          defaultValue={event.title}
          required
          className="w-full p-2 border"
        />
        <textarea
          name="description"
          defaultValue={event.description}
          className="w-full p-2 border"
        />
        <input
          type="text"
          name="category"
          defaultValue={event.category}
          className="w-full p-2 border"
        />
        <input
          type="date"
          name="date"
          defaultValue={event.date?.substring(0, 10)}
          required
          className="w-full p-2 border"
        />
        <input
          type="text"
          name="location"
          defaultValue={event.location}
          className="w-full p-2 border"
        />

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update Event
          </button>
          <Link
            href="/events"
            className="text-blue-500 underline self-center"
          >
            Cancel
          </Link>
        </div>
      </form>

      {/* Delete Button */}
      <div className="mt-6">
        <DeleteButton eventId={event._id.toString()} />
      </div>
    </div>
  );
}
