// app/api/events/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/db';
import Event from '@/models/Event';

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
