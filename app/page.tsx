// app/page.tsx
import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/events');
  // return null; // Or some loading state if redirect takes time, though usually it's instant
}