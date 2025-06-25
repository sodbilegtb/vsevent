// app/events/new/page.tsx
import { createEvent } from '@/app/_actions/eventActions';

export default function NewEventPage() {
  return (
    <form action={createEvent} className="p-4 space-y-4">
      <input name="title" placeholder="Title" required className="border p-2 w-full" />
      <textarea name="description" placeholder="Description" className="border p-2 w-full" />
      <input name="category" placeholder="Category" className="border p-2 w-full" />
      <input type="date" name="date" required className="border p-2 w-full" />
      <input name="location" placeholder="Location" className="border p-2 w-full" />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Create Event
      </button>
    </form>
  );
}
