import { Iadmin } from '@/types/types';
import { Schema, model ,models } from 'mongoose';



const adminSchema = new Schema<Iadmin>({
    name : {
        type : String,
        required: true},
    password : {
        type : String,
        required : true
    }
})

const Admin = models.admin || model<Iadmin>('admin',adminSchema)

export default Admin;