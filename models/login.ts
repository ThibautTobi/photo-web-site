import { Schema, model, models } from 'mongoose'
import { Ilogin } from '@/types/types';

const loginSchema = new Schema<Ilogin>({
  name :{
    type: String,
    required: true
  },
  password: {
    type : String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],  // Seuls 'user' et 'admin' sont autorisés
    default: 'user'           // Par défaut, le rôle sera 'user'
  }
})

const Login = models.login || model<Ilogin>('login', loginSchema)

export default Login;