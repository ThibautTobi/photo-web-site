import { Ishooting } from '@/types/types';
import { Schema, model, models } from 'mongoose';

const ShootingSchema = new Schema<Ishooting>({
     // _id: ObjectID,
    title : {
        type : String ,
        required : true
    },
    imagePath : [{
        type : String,
        required :true
    }]
}
)
const Shooting = models.Shooting || model<Ishooting>('Shooting', ShootingSchema);

export default Shooting;


