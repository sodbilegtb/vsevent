// scripts/seed.ts
import fs from 'fs';
import path from 'path';
import { connectToDatabase } from '../app/lib/db';
import Event from '../models/Event';

async function seed() {
  await connectToDatabase();

  const eventsPath = path.join(process.cwd(), 'events.json');
  const data = fs.readFileSync(eventsPath, 'utf-8');
  const events = JSON.parse(data);

  await Event.deleteMany({});
  await Event.insertMany(events);

  console.log('Database seeded successfully!');
  process.exit();
}

seed();
