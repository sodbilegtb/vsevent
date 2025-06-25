// app/_actions/eventActions.ts
'use server';

import { connectToDatabase } from '@/app/lib/db';
import Event from '@/models/Event';
import { revalidatePath } from 'next/cache';

export async function createEvent(formData: FormData) {
  await connectToDatabase();

  const newEvent = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    category: formData.get('category') as string,
    date: formData.get('date') as string,
    location: formData.get('location') as string,
  };

  await Event.create(newEvent);
  revalidatePath('/events');
}

export async function updateEvent(id: string, formData: FormData) {
  await connectToDatabase();

  const updatedEvent = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    category: formData.get('category') as string,
    date: formData.get('date') as string,
    location: formData.get('location') as string,
  };

  await Event.findByIdAndUpdate(id, updatedEvent);
  revalidatePath('/events');
}

export async function deleteEvent(id: string) {
  await connectToDatabase();
  await Event.findByIdAndDelete(id);
  revalidatePath('/events');
}
