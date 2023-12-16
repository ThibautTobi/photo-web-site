import mongoose from 'mongoose';

// Schema pour une Image seul (exemple : utiliser pour les photos ajouter en vitrine sur le site page Photos)

const photoSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    }
});

// Vérifiez si le modèle a déjà été existant sinon créé le models dans la DB
const Photo = mongoose.models['photo'] || mongoose.model('photo', photoSchema);


export default Photo;