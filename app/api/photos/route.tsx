import { NextResponse,NextRequest } from "next/server";
import { connectToDB } from "@/utils/database";
import Photo from "@/models/photo";
/**
 * Gère la requête GET pour récupérer toutes les images.
 * @param {NextRequest} req - La requête entrante.
 * @returns {NextResponse} La réponse à envoyer.
 */
export async function GET(req: NextRequest) {

    // const page = Number(req.query.page) || 1;
    // const limit = 6;
    // const skip = (page - 1) * limit;

    try {
        // Vérification REQ Methode GET
        if (req.method !== 'GET') {
            return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
        }

        // Connexion à la base de données
        await connectToDB();

        // Récupération de toutes les photos de la base de données
        const photos = await Photo.find();
        //const photos = await Photo.find().skip(skip).limit(limit);
        console.log(photos)
        //console.log()

        // Renvoyer les photos au client
        return NextResponse.json(photos);
    } catch (error) {
        console.error("Erreur lors de la récupération des photos:", error);
        return NextResponse.json({ error: `Erreur lors de la récupération des photos` }, { status: 500 });
    }
}