// lib/data.ts
import fs from 'fs';
import path from 'path';

// Define the Event type
export interface Event {
  title: string;
  description: string;
  category: string;
  date: string;
  location: string;
  // Consider adding a unique ID in the future: id?: string;
}

const dataPath = path.join(process.cwd(), 'events.json'); // process.cwd() gives the project root

export function loadEvents(): Event[] {
  try {
    if (!fs.existsSync(dataPath)) {
      return [];
    }
    const jsonData = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(jsonData) as Event[];
  } catch (error) {
    console.error("Error loading events:", error);
    return []; // Return empty array on error to prevent crashes
  }
}

export function saveEvents(events: Event[]): void {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(events, null, 2));
  } catch (error) {
    console.error("Error saving events:", error);
    // Handle error appropriately in a real app (e.g., throw, log to service)
  }
}