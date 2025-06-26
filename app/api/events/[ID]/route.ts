import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/db';
import Event from '@/models/Event';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();

  try {
    console.log('🔍 Requested DELETE for ID:', params.id);

    // Debug: Zeige alle Events
    const allEvents = await Event.find();
    console.log('📦 Aktuelle Event-IDs:', allEvents.map(e => e._id.toString()));

    const deletedEvent = await Event.findByIdAndDelete(params.id);

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
