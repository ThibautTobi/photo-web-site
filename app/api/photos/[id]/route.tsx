import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import Photo from '@/models/photo';

/**
 * Gère la requête GET pour récupérer une image spécifique par ID.
 * @param {NextRequest} req - La requête entrante.
 * @returns {NextResponse} La réponse à envoyer.
 */
// export async function GET(req: NextRequest) {
//     try {
//         // Vérification REQ Methode GET
//         if (req.method !== 'GET') {
//             return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
//         }

//         // Récupération de l'ID de l'image depuis les paramètres de la requête
//         const { id } = req.query;

//         if (!id) {
//             return NextResponse.json({ error: 'ID manquant' }, { status: 400 });
//         }

//         // Connexion à la base de données
//         await connectToDB();

//         // Récupération de la photo spécifique par ID
//         const photo = await Photo.findById(id);

//         if (!photo) {
//             return NextResponse.json({ error: 'Photo non trouvée' }, { status: 404 });
//         }

//         // Renvoyer la photo au client
//         return NextResponse.json(photo);
//     } catch (error) {
//         console.error("Erreur lors de la récupération de la photo:", error);
//         return NextResponse.json({ error: `Erreur lors de la récupération de la photo` }, { status: 500 });
//     }
// }




/**
 * Gère la requête GET pour récupérer les photos.
 * @param {NextRequest} req - La requête entrante.
 * @returns {NextResponse} La réponse à envoyer.
 */

/*

export async function GET(req: NextRequest) {
    try {
        // Vérification REQ Methode GET
        if (req.method !== 'GET') {
            return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
        }

        // Connexion à la base de données
        await connectToDB();

        // Récupération de toutes les photos depuis la base de données
        const photos = await Photo.find();

        // Retourner les photos en réponse
        return NextResponse.json({ photos }, { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la récupération des photos:", error);
        return NextResponse.json({ error: `Erreur lors de la récupération des photos` }, { status: 500 });
    }
}


*/