// app/lib/data.ts
import { connectToDatabase } from '@/app/lib/db'; 
import Event from '@/models/Event'; 

export async function getEvent(id: string) {
  await connectToDatabase(); // 
  const event = await Event.findById(id).lean();
  return event as {
    _id: string;
    title: string;
    description: string;
    category: string;
    date: string;
    location: string;
  } | null;
}

export async function loadEvents() {
  await connectToDatabase(); 
  return await Event.find().lean();
}
