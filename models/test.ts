import { Schema, model, models } from 'mongoose'
import { Itest } from '@/types/types';

const testSchema = new Schema<Itest>({
  name :{
    type: String,
    required: true,
  }
})

const Test = models.test || model<Itest>('test', testSchema)

export default Test;