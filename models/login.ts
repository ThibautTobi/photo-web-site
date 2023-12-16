import { Schema, model, models } from 'mongoose';
import { Ilogin } from '@/types/types';

// Schema login pour les connexions 

const loginSchema = new Schema<Ilogin>({
  email: {
    type: String,
    unique: true,
    sparse: true, // Permet les valeurs `null` dans l'index unique
  },
  name: {
    type: String,
    unique: true,
    sparse: true, // Permet les valeurs `null` dans l'index unique
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],// soit user ou admin 
    default: 'user',// par default a l'inscription 
  },
});

// Validation personnalisée pour s'assurer qu'au moins un des champs est fourni
loginSchema.pre('validate', function (next) {
  if (!this.email && !this.name) {
    this.invalidate('email', 'Email or Username is required.');
  }
  next();
});

// Vérifiez si le modèle a déjà été existant sinon créé le models dans la DB
const Login = models.login || model<Ilogin>('login', loginSchema);

export default Login;
