// app/events/create/page.tsx
import { createEventAction } from '@/app/_actions/eventActions';

export default function CreateEventPage() {
  return (
    <div>
      <h1>Create a New Event</h1>
      {/* @ts-ignore */}
      <form action={createEventAction}>
        <input type="text" name="title" placeholder="Title" required /><br />
        <textarea name="description" placeholder="Description"></textarea><br />
        <input type="text" name="category" placeholder="Category" /><br />
        <input type="date" name="date" required /><br />
        <input type="text" name="location" placeholder="Location" /><br />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}