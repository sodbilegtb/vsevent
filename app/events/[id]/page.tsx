import { getEvent } from '@/app/lib/data';

interface Props {
  params: { id: string };
}

export default async function EventDetail({ params }: Props) {
  const { id } = params;

  if (id === 'new') {
    // Render a form or redirect to your create event page instead
    return (
      <div>
        <h1>Create New Event</h1>
        {/* Your create event form component here */}
      </div>
    );
  }

  const event = await getEvent(id);

  if (!event) return <p>Event not found.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <p>{event.description}</p>
      <p>{event.date}</p>
      <p>{event.location}</p>
      <p className="text-sm text-gray-500">Category: {event.category}</p>
    </div>
  );
}
