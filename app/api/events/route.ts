// app/api/events/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/db';
import Event from '@/models/Event';
import { z } from 'zod'; // Import Zod for validation
import { Types } from 'mongoose'; // Import Types from mongoose

// Define a schema for event validation
const EventSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }),
  description: z.string().optional(),
  category: z.string().min(2, { message: 'Category is required.' }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format.' }),
  location: z.string().min(2, { message: 'Location is required.' }),
});

export async function GET() {
  await connectToDatabase();

  try {
    const events = await Event.find({}).lean(); // Use .lean() for plain JS objects
    // Map over events to ensure _id is a string for consistent API response
    const formattedEvents = events.map(event => ({
      ...event,
      _id: event._id.toString(), // _id from .lean() is usually ObjectId, convert to string
    }));
    return NextResponse.json(formattedEvents, { status: 200 });
  } catch (error) {
    console.error('API GET /api/events Error:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await connectToDatabase();

  try {
    const body = await request.json();
    const validatedFields = EventSchema.safeParse(body);

    if (!validatedFields.success) {
      // Return validation errors to the client
      return NextResponse.json(
        { errors: validatedFields.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const newEvent = new Event(validatedFields.data);
    await newEvent.save();

    // Ensure _id is a string in the response.
    // By explicitly typing _id in IEventDocument, newEvent._id is now Types.ObjectId.
    return NextResponse.json({ ...newEvent.toObject(), _id: newEvent._id.toString() }, { status: 201 });
  } catch (error) {
    console.error('API POST /api/events Error:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
