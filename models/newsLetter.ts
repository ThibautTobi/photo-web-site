import { Inewsletter } from '@/types/types';
import { Schema, model, models } from 'mongoose'

// Schema pour les emails NewsLetter

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

// Vérifiez si le modèle a déjà été existant sinon créé le models dans la DB
const NewsLetter = models.Subscriber || model<Inewsletter>('Subscriber', subscriberSchema);

export default NewsLetter;