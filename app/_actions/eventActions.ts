// app/_actions/eventActions.ts
'use server'; // Marks all exports in this file as Server Actions

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { loadEvents, saveEvents, Event } from '@/lib/data'; // Assuming @ refers to src/ or root

// Define a type for form data, excluding the index for creation
export type EventFormData = Omit<Event, ''>; // Or specify fields: { title: string, ... }

export async function createEventAction(formData: FormData) {
  const events = loadEvents();
  const newEvent: Event = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    category: formData.get('category') as string,
    date: formData.get('date') as string,
    location: formData.get('location') as string,
  };

  // Basic validation (consider using a library like Zod for robust validation)
  if (!newEvent.title || !newEvent.date) {
    return { error: 'Title and Date are required.' };
  }

  events.push(newEvent);
  saveEvents(events);

  revalidatePath('/events'); // Tells Next.js to re-fetch data for this path
  redirect('/events');     // Redirect to the events list
}

export async function updateEventAction(index: number, formData: FormData) {
  const events = loadEvents();

  if (index < 0 || index >= events.length) {
    // Handle not found - though the page should already do this
    console.error("Event not found for update");
    redirect('/events?error=notfound'); // Or throw an error
    return;
  }

  const updatedEvent: Event = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    category: formData.get('category') as string,
    date: formData.get('date') as string,
    location: formData.get('location') as string,
  };

  if (!updatedEvent.title || !updatedEvent.date) {
    return { error: 'Title and Date are required.' };
  }

  events[index] = updatedEvent;
  saveEvents(events);

  revalidatePath('/events');
  revalidatePath(`/events/${index}/edit`); // Revalidate the edit page too
  redirect('/events');
}

export async function deleteEventAction(index: number) {
  let events = loadEvents();

  if (index < 0 || index >= events.length) {
    console.error("Event not found for deletion");
    redirect('/events?error=notfound');
    return;
  }

  events.splice(index, 1);
  saveEvents(events);

  revalidatePath('/events');
  // No redirect needed if called from the list page, as revalidatePath updates it.
  // If called from a dedicated delete confirmation page, you might redirect.
}