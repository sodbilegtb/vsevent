// app/lib/definitions.ts

/**
 * Defines the structure for an Event object.
 * Using a central interface ensures type consistency across the application,
 * from the database model to the client-side components.
 */
export interface IEvent {
    _id: string;
    title: string;
    description: string;
    category: string;
    date: string;
    location: string;
  }
  