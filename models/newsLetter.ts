import { Inewsletter } from '@/types/types';
import { Schema, model, models } from 'mongoose'

const subscriberSchema = new Schema<Inewsletter>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dateSubscribed: {
    type: Date,
    default: Date.now,
  },
});

const NewsLetter = models.Subscriber || model<Inewsletter>('Subscriber', subscriberSchema);

export default NewsLetter;