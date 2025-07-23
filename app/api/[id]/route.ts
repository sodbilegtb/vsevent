// app/api/events/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/db';
import Event from '@/models/Event';
import { z } from 'zod'; // Import Zod for validation
import { Types } from 'mongoose'; // Import Types from mongoose

// Define a schema for event validation for updates
const EventUpdateSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }).optional(),
  description: z.string().optional(),
  category: z.string().min(2, { message: 'Category is required.' }).optional(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format.' }).optional(),
  location: z.string().min(2, { message: 'Location is required.' }).optional(),
}).partial(); // All fields are optional for PATCH, as it's a partial update

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const { id } = params;

  try {
    const event = await Event.findById(id).lean();

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Ensure _id is a string
    return NextResponse.json({ ...event, _id: event._id.toString() }, { status: 200 });
  } catch (error) {
    console.error(`API GET /api/events/${id} Error:`, error);
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const { id } = params;

  try {
    const body = await request.json();
    const validatedFields = EventUpdateSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { errors: validatedFields.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      validatedFields.data,
      { new: true, runValidators: true } // `new: true` returns the updated doc, `runValidators` ensures Mongoose schema validators run on update
    ).lean(); // Use .lean() for plain JS objects

    if (!updatedEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Ensure _id is a string
    return NextResponse.json({ ...updatedEvent, _id: updatedEvent._id.toString() }, { status: 200 });
  } catch (error) {
    console.error(`API PATCH /api/events/${id} Error:`, error);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await connectToDatabase();
  const { id } = params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id).lean();

    if (!deletedEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Event deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(`API DELETE /api/events/${id} Error:`, error);
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}
