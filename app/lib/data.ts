// app/lib/data.ts
import 'server-only'; // Ensures this code only runs on the server
import { connectToDatabase } from '@/app/lib/db';
import Event from '@/models/Event';
import { IEvent } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

/**
 * Fetches a single event by its ID from the database.
 * @param id The ID of the event to fetch.
 * @returns A promise that resolves to the event object or null if not found.
 */
export async function getEvent(id: string): Promise<IEvent | null> {
  noStore(); // Opt out of caching for this dynamic data
  try {
    await connectToDatabase();
    // .lean() returns a plain JavaScript object, not a Mongoose document.
    // This is faster and prevents issues with serialization.
    const event = await Event.findById(id).lean();

    if (!event) {
      return null;
    }

    // Ensure the _id is a string for component props
    return { ...event, _id: event._id.toString() } as IEvent;
  } catch (error) {
    console.error('Database Error:', error);
    // In a real app, you might want to handle this more gracefully
    throw new Error('Failed to fetch event.');
  }
}

/**
 * Fetches all events from the database.
 * @returns A promise that resolves to an array of event objects.
 */
export async function loadEvents(): Promise<IEvent[]> {
  noStore(); // Opt out of caching for this dynamic data
  try {
    await connectToDatabase();
    const events = await Event.find({}).sort({ date: -1 }).lean();

    // Map over the events to ensure each one is a plain object with a string ID
    return events.map(event => ({
      ...event,
      _id: event._id.toString(),
    })) as IEvent[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch events.');
  }
}
