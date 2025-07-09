// models/Event.ts
import mongoose, { Document, Model, model, models, Schema, Types } from 'mongoose';

// This is the base interface. Note it does NOT include `_id`.
// This represents the shape of the data for a new event before it's saved.
export interface IEventBase {
  title: string;
  description?: string;
  category?: string;
  date: string;
  location?: string;
}

// This is your application-level interface, used in components and API routes.
// It extends the base and defines `_id` as a string, which is what you'll use
// after converting the Mongoose ObjectId.
export interface IEvent extends IEventBase {
  _id: string;
}

// This is the Mongoose document interface. It extends the base interface
// and the Mongoose Document type. Mongoose itself will add the `_id`
// property as an ObjectId.
// Explicitly defining _id here as Types.ObjectId helps TypeScript inference.
export interface IEventDocument extends IEventBase, Document {
  _id: Types.ObjectId; // Explicitly define _id as Mongoose's ObjectId type
}

// The schema is defined based on the base properties.
const eventSchema = new Schema<IEventDocument>({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  date: { type: String, required: true },
  location: { type: String },
});

// The model uses the IEventDocument interface.
const EventModel: Model<IEventDocument> = models.Event || model<IEventDocument>('Event', eventSchema);

export default EventModel;
