import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/db';
import Event from '@/models/Event';
import mongoose from 'mongoose';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();

  try {
    console.log('🔍 Requested DELETE for ID:', params.id);

    const allEvents = await Event.find();
    console.log('📦 Aktuelle Event-IDs:', allEvents.map(e => e._id.toString()));

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      console.log('❌ Ungültige ObjectId:', params.id);
      return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
    }

    const deletedEvent = await Event.findByIdAndDelete(new mongoose.Types.ObjectId(params.id));

    if (!deletedEvent) {
      console.log('❌ Event not found with ID:', params.id);
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    console.log('✅ Event deleted:', deletedEvent._id.toString());
    return NextResponse.json({ message: 'Event deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error('🔥 Fehler beim Löschen:', error);
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}

