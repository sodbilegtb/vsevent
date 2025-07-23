// app/_actions/eventActions.ts
'use server';

import { connectToDatabase } from '@/app/lib/db';
import Event from '@/models/Event';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod'; // Using Zod for validation

// Define a schema for event validation
const EventSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }),
  description: z.string().optional(),
  category: z.string().min(2, { message: 'Category is required.' }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format.' }),
  location: z.string().min(2, { message: 'Location is required.' }),
});


export async function createEvent(formData: FormData) {
  // Extract and validate data
  const validatedFields = EventSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    category: formData.get('category'),
    date: formData.get('date'),
    location: formData.get('location'),
  });

  if (!validatedFields.success) {
    // In a real app, you'd return these errors to the form
    console.error('Validation Errors:', validatedFields.error.flatten().fieldErrors);
    throw new Error('Invalid event data provided.');
  }

  await connectToDatabase();
  await Event.create(validatedFields.data);

  // Revalidate the cache for the events page
  revalidatePath('/events');
  // Redirect user back to the events list
  redirect('/events');
}

export async function updateEvent(id: string, formData: FormData) {
    const validatedFields = EventSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        date: formData.get('date'),
        location: formData.get('location'),
      });

    if (!validatedFields.success) {
        console.error('Validation Errors:', validatedFields.error.flatten().fieldErrors);
        throw new Error('Invalid event data provided for update.');
    }

  await connectToDatabase();
  await Event.findByIdAndUpdate(id, validatedFields.data);

  // Revalidate multiple paths where this data might be shown
  revalidatePath('/events');
  revalidatePath(`/events/${id}`);
  revalidatePath(`/events/${id}/edit`);

  // Redirect user to the event details page
  redirect(`/events/${id}`);
}

export async function deleteEvent(id: string) {
  try {
    await connectToDatabase();
    await Event.findByIdAndDelete(id);
    
    // Revalidate the main events page cache
    revalidatePath('/events');
    // Redirect is handled on the client in this case, but you could redirect here too
    // if the action wasn't called from a component that handles routing.
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete event.');
  }
}
