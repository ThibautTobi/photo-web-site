import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
    // _id: ObjectID,
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

// Vérifiez si le modèle a déjà été compilé
const Photo = mongoose.models['photo'] || mongoose.model('photo', photoSchema);


export default Photo;


