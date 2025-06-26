// app/api/events/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/db';
import Event from '@/models/Event';

export async function GET() {
  await connectToDatabase();

  try {
    const events = await Event.find({});
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { title, description, category, date, location } = await request.json();

  await connectToDatabase();

  try {
    const newEvent = new Event({ title, description, category, date, location });
    await newEvent.save();

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const { id, title, description, category, date, location } = await request.json();

  if (!id) {
    return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
  }

  await connectToDatabase();

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, description, category, date, location },
      { new: true }
    );

    if (!updatedEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}
