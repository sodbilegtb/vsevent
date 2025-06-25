// models/Event.ts
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  date: { type: String, required: true },
  location: String,
});

export default mongoose.models.Event || mongoose.model('Event', eventSchema);
