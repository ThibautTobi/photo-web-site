// Importation des modules nécessaires depuis la bibliothèque mongoose.
import mongoose, { ConnectOptions } from 'mongoose';

// Variable pour suivre l'état de la connexion à MongoDB.
// Initialement définie sur false, car la base de données n'est pas encore connectée.
let isConnected: boolean = false;

// Fonction asynchrone pour établir une connexion à MongoDB.
export const connectToDB = async () => {
    // Définit le mode strict pour les requêtes. En mode strict, les requêtes ne renverront que les champs présents dans le schéma.
    mongoose.set('strictQuery', true);

    // Vérifie si la base de données est déjà connectée.
    if(isConnected) {
        console.log('MongoDB is already connected');
        return; // Si c'est le cas, sortez de la fonction.
    }

    try {
        // Tentative de connexion à MongoDB en utilisant la chaîne de connexion fournie.
        await mongoose
            .connect(
                        process.env.DB_URL!, { // Utilise la variable d'environnement pour la chaîne de connexion.
                            dbName: "webPhoto", // Nom de la base de données à laquelle se connecter.
                            useNewUrlParser: true, // Utilise le nouveau parser d'URL pour éviter les avertissements dépréciés.
                            useUnifiedTopology: true, // Utilise le nouveau moteur de gestion des topologies pour éviter les avertissements dépréciés.
                        }  as ConnectOptions // Assure que les options sont du type ConnectOptions.
                    )

        // Si la connexion est réussie, mettez à jour l'état de la connexion.
        isConnected = true;

        // Affiche un message indiquant que la connexion a été établie avec succès.
        console.log('MongoDB connected')
    } catch (error) {
        // En cas d'erreur lors de la connexion, affichez l'erreur.
        console.log(error);
    }
};

// teste de connection
// async function testConnection() {
//     await connectToDB();
//     process.exit();
// }

// testConnection();



/***************************************************************************** autre facaons de faire exemple de next auth  */

// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
// import { MongoClient } from "mongodb"

// if (!process.env.MONGODB_URI) {
//   throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
// }

// const uri = process.env.MONGODB_URI
// const options = {}

// let client
// let clientPromise: Promise<MongoClient>

// if (process.env.NODE_ENV === "development") {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options)
//     global._mongoClientPromise = client.connect()
//   }
//   clientPromise = global._mongoClientPromise
// } else {
//   // In production mode, it's best to not use a global variable.
//   client = new MongoClient(uri, options)
//   clientPromise = client.connect()
// }

// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// export default clientPromise