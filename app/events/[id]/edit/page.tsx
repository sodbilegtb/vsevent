// app/events/[id]/edit/page.tsx
// This is now a Server Component
import { getEvent } from '@/app/lib/data'; // Server-side data fetching
import { notFound } from 'next/navigation';
import EditEventForm from './EditEventForm'; // Import the new Client Component
import { IEvent } from '@/app/lib/definitions';

interface EditEventPageProps {
  params: { id: string };
}

// This component remains a Server Component, responsible for fetching data
// and passing it to the client component.
export default async function EditEventPage(props: EditEventPageProps) {
  // Await params as suggested by the Next.js error message.
  // In a Server Component, params will be resolved here.
  const { id } = await props.params;

  // Fetch the event data on the server
  const event = await getEvent(id);

  // If no event is found for the ID, show a 404 page.
  if (!event) {
    return notFound();
  }

  // Pass the fetched event data to the Client Component
  return <EditEventForm initialEvent={event} />;
}
