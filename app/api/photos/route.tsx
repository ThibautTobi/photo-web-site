import { NextResponse,NextRequest } from "next/server";
import { connectToDB } from "@/utils/database";
import Photo from "@/models/photos";

/***********************************************************recuperation des images pour le portfolio du site avec pagination  */
/**
 * Gère la requête GET pour récupérer toutes les images.
 * @param {NextRequest} req - La requête entrante.
 * @returns {NextResponse} La réponse à envoyer.
 */

export async function GET(req: NextRequest) {

    const page = parseInt(req.nextUrl.searchParams.get('page') || '1', 10);
    const limit = 3;
    const skip = (page - 1) * limit;

    try {
        // Vérification REQ Methode GET
        if (req.method !== 'GET') {
            return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
        }

        // Connexion à la base de données
        await connectToDB();

        const totalPhotos = await Photo.countDocuments();

        let photos = await Photo.find().skip(skip).limit(limit);

                // Modifiez les données ici si nécessaire
                photos = photos.map(photo => {
                    // Par exemple, modifiez le chemin de l'image pour qu'il soit absolu
                    photo.imagePath = `${photo.imagePath.replace('./uploads', '')}`;
                    return photo;
                });

       const totalPages = Math.ceil(totalPhotos / limit)

        // Renvoyer les photos au client
        return NextResponse.json({photos,totalPhotos,
        totalPages,
        currentPage: page
    });
    } catch (error) {
        console.error("Erreur lors de la récupération des photos:", error);
        return NextResponse.json({ error: `Erreur lors de la récupération des photos` }, { status: 500 });
    }
}