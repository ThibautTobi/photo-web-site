import { Schema, model, models } from 'mongoose';
import { Ilogin } from '@/types/types';

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
    enum: ['user', 'admin'],
    default: 'user',
  },
});

// Validation personnalisée pour s'assurer qu'au moins un des champs est fourni
loginSchema.pre('validate', function (next) {
  if (!this.email && !this.name) {
    this.invalidate('email', 'Email or Username is required.');
  }
  next();
});

const Login = models.login || model<Ilogin>('login', loginSchema);

export default Login;
