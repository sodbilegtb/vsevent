// app/events/components/DeleteButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

interface Props {
  eventId: string;
}

export default function DeleteButton({ eventId }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setError(null); // Clear previous errors

    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch(`/api/events/${eventId}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          router.push('/events');
          router.refresh(); // Revalidate data on the events list page
        } else {
          const errorData = await res.json();
          setError(errorData.error || 'Failed to delete event.');
          setIsConfirming(false); // Reset confirmation on error
        }
      } catch (err) {
        console.error('Client-side delete error:', err);
        setError('An unexpected error occurred during deletion.');
        setIsConfirming(false); // Reset confirmation on error
      }
    });
  }

  // Reset confirmation state if the user navigates away or clicks elsewhere
  const handleBlur = () => {
    if (isConfirming) {
      setIsConfirming(false);
    }
  };

  return (
    <>
      <button
        onClick={handleDelete}
        onBlur={handleBlur} // Reset on blur for better UX
        className={`px-4 py-2 rounded-lg shadow transition-colors duration-200 ease-in-out ${
          isConfirming 
          ? 'bg-yellow-500 hover:bg-yellow-600 text-black' 
          : 'bg-red-600 hover:bg-red-700 text-white'
        } disabled:bg-gray-400`}
        disabled={isPending}
      >
        {isPending ? 'Deleting...' : isConfirming ? 'Are you sure? Click to confirm' : 'Delete Event'}
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </>
  );
}
