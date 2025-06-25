'use client';

import { deleteEvent } from '@/app/_actions/eventActions';
import { useRouter } from 'next/navigation';

interface Props {
  eventId: string;
}

export default function DeleteButton({ eventId }: Props) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm('Are you sure you want to delete this event?');
    if (!confirmed) return;

    await deleteEvent(eventId);
    router.push('/events');
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-4 py-2 rounded mt-4"
    >
      Delete Event
    </button>
  );
}
