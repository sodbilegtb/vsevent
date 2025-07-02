
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/db';
import Event from '@/models/Event';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();

  const id = params.id.trim();
  console.log('🔍 Requested DELETE for ID:', id);
  console.log('Is valid ObjectId:', mongoose.Types.ObjectId.isValid(id));
  console.log('Params:', params);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      console.log('❌ Event not found with ID:', id);
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    console.log('✅ Event deleted:', deletedEvent._id.toString());
    return NextResponse.json({ message: 'Event deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error('🔥 Fehler beim Löschen:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to delete event' }, { status: 500 });
  }
}
