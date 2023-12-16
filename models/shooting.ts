import { Ishooting } from '@/types/types';
import { Schema, model, models } from 'mongoose';

// Schema pour un Shooting (exemple : utiliser pour la selection des photos ajouter dans l'espace admin pour le client )

const ShootingSchema = new Schema<Ishooting>({

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

// Vérifiez si le modèle a déjà été existant sinon créé le models dans la DB
const Shooting = models.Shooting || model<Ishooting>('Shooting', ShootingSchema);

export default Shooting;