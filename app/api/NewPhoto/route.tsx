import { NextRequest, NextResponse } from 'next/server';
import Photo from '@/models/photos';
import { connectToDB } from "@/utils/database";
//import upload from '@/utils/multerConfig';
// import multer from 'multer';



//////////////////////////////////////////////////////// a ajouter verification token authorisation et role


// export const POST = async(req: NextRequest, res :NextResponse) => {
//     try {
//         await connectToDB();

        // Vérifiez le token fourni avec la requête
        // const token = req.headers.authorization;
        // const decodedToken = jwt.verify(token, 'yourSecretKey');

        // Si le token est invalide, renvoyez une erreur
        // if (!decodedToken) {
        //     return NextResponse.json("Token invalide", { status: 401 });
        // }

        // Vérifiez le rôle de l'utilisateur
//         if (decodedToken.role !== 'admin') {
//             return NextResponse.json("Accès non autorisé", { status: 403 });
//         }

//          ... (le reste de votre code pour traiter la requête)

//     } catch (error) {
//          Gestion des erreurs
//         return NextResponse.json("Une erreur est survenue.", { status: 500 });
//     }
// }






/////////////////////////// ajout de verification role Admin


        // //Vérifiez le token fourni avec la requête
        // const token = req.headers.authorization;
        // const decodedToken = jwt.verify(token, 'yourSecretKey');

        // //Si le token est invalide, renvoyez une erreur
        // if (!decodedToken) {
        //     return NextResponse.json("Token invalide", { status: 401 });
        // }

        // // Vérifiez le rôle de l'utilisateur
        // if (decodedToken.role !== 'admin') {
        //     return NextResponse.json("Accès non autorisé", { status: 403 });
        // }



import { writeFile } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
//import sharp from 'sharp';
import { Jwt } from 'jsonwebtoken';
import { adminAuth } from '@/middleware/AdminAuth';

/*********************************************************************** ajout d'une image pour portfolio site */
/**
 * Génère un horodatage basé sur la date et l'heure actuelles.
 * @returns {string} L'horodatage sous forme de chaîne de caractères.
 */

function generateTimestamp() {
    const now = new Date();
    return `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}${now.getMilliseconds().toString().padStart(3, '0')}`;
  }

/**
 * Gère la requête POST pour l'upload d'une image.
 * @param {NextRequest} req - La requête entrante.
 * @returns {NextResponse} La réponse à envoyer.
 */


export async function POST(req: NextRequest) {



    
    ///////////////////////////////////////////////////////// a debug pour import de middleware verif
    // const authResponse = await adminAuth(req);
    // if (authResponse.status === 403) {
    //   //return res.status(403).json(authResponse.body);
    //   return NextResponse.json({ message: `Vous n'avais pas l'accés` }, { status: 403 });
    // }



            // //Vérifiez le token fourni avec la requête
            // const token = req.headers.authorization;
            // console.log(token)
            // const decodedToken = jwt.verify(token, 'yourSecretKey');
    
            // //Si le token est invalide, renvoyez une erreur
            // if (!decodedToken) {
            //     return NextResponse.json("Token invalide", { status: 401 });
            // }
    
            // // Vérifiez le rôle de l'utilisateur
            // if (decodedToken.role !== 'admin') {
            //     return NextResponse.json("Accès non autorisé", { status: 403 });
            // }
    try{
        // Vérification REQ Methode POST
        if (req.method !== 'POST') {
            return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
        }

        // Récupération des données du formulaire
        const data = await req.formData();
        const title = data.get('title');
        const description = data.get('description');
        const file: File | null = data.get('image') as unknown as File;

        // Validation des données
        if (!title || !description || !file ) {
            return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
        }

        // Conversion du fichier en ArrayBuffer
        const bytes = await file.arrayBuffer();

        // Conversion de l'ArrayBuffer en Buffer
        const buffer = Buffer.from(bytes);

    /********************************* si redimention de l'image sharp ici ****************************************/

        // Vérification et création du répertoire d'upload si nécessaire.
        //const directory = './uploads';
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        const directory = './public/portfolio';
        // a modifier en prod final
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        if (!existsSync(directory)) {
            mkdirSync(directory);
        }

        // Ajout de l'horodatage à la fin du nom du fichier pour avoir un enregistrement unique.
        const filename = `${file.name.split('.').slice(0, -1).join('.')}_${generateTimestamp()}.${file.name.split('.').pop()}`;
        const path = `${directory}/${filename}`;

        // Écriture du fichier.
        await writeFile(path, buffer);

        //  Connexion base de donnée
        await connectToDB();

        // Création d'une nouvelle photo avec le model de schema mongoDb
        const newPhoto = new Photo({
            title,
            description,
            imagePath: path
        });

        // Sauvegarde de la nouvelle entrée dans la base de données
        await newPhoto.save();

            console.log("Photo enregistrée avec succès");
            return NextResponse.json({ newPhoto }, { status: 201 });
    } catch (error) {
            console.error("Erreur lors de l'enregistrement:", error);
            return NextResponse.json({ error: `Erreur lors de l'enregistrement de la photo` }, { status: 500 });
    }
}


/***************************************************** sa marche ************************************************************/



// import { writeFile } from 'fs/promises';
// import { existsSync, mkdirSync } from 'fs';
// //import sharp from 'sharp';

// /**
//  * Génère un horodatage basé sur la date et l'heure actuelles.
//  * @returns {string} L'horodatage sous forme de chaîne de caractères.
//  */

// function generateTimestamp() {
//     const now = new Date();
//     return `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}${now.getMilliseconds().toString().padStart(3, '0')}`;
//   }

// /**
//  * Gère la requête POST pour l'upload d'une image.
//  * @param {NextRequest} req - La requête entrante.
//  * @returns {NextResponse} La réponse à envoyer.
//  */

// export async function POST(req: NextRequest) {
//     try{
//         // Vérification REQ Methode POST
//         if (req.method !== 'POST') {
//             return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
//         }

//         // Récupération des données du formulaire
//         const data = await req.formData();
//         const title = data.get('title');
//         const description = data.get('description');
//         const file: File | null = data.get('image') as unknown as File;

//         // Validation des données
//         if (!title || !description || !file ) {
//             return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
//         }

//         // Conversion du fichier en ArrayBuffer
//         const bytes = await file.arrayBuffer();

//         // Conversion de l'ArrayBuffer en Buffer
//         const buffer = Buffer.from(bytes);

//     /********************************* si redimention de l'image sharp ici ****************************************/

//         // Vérification et création du répertoire d'upload si nécessaire.
//         const directory = './uploads';
//         if (!existsSync(directory)) {
//             mkdirSync(directory);
//         }

//         // Ajout de l'horodatage à la fin du nom du fichier pour avoir un enregistrement unique.
//         const filename = `${file.name.split('.').slice(0, -1).join('.')}_${generateTimestamp()}.${file.name.split('.').pop()}`;
//         const path = `${directory}/${filename}`;

//         // Écriture du fichier.
//         await writeFile(path, buffer);

//         //  Connexion base de donnée
//         await connectToDB();

//         // Création d'une nouvelle photo avec le model de schema mongoDb
//         const newPhoto = new Photo({
//             title,
//             description,
//             imagePath: path
//         });

//         // Sauvegarde de la nouvelle entrée dans la base de données
//         await newPhoto.save();

//             console.log("Photo enregistrée avec succès");
//             return NextResponse.json({ newPhoto }, { status: 201 });
//     } catch (error) {
//             console.error("Erreur lors de l'enregistrement:", error);
//             return NextResponse.json({ error: `Erreur lors de l'enregistrement de la photo` }, { status: 500 });
//     }
// }


/********************************* redimention sharp ****************************************/
    // const processedBuffer = await sharp(buffer)
    // .resize(800) // Largeur maximale de 800 pixels
    // .jpeg({ quality: 80 }) // Convertir en JPEG avec une qualité de 80%
    // .toBuffer(); // Convertir l'image traitée en Buffer

    //     await writeFile(path, processedBuffer);

//     const imageMetadata = await sharp(buffer).metadata();

// if (imageMetadata.width > 800 || imageMetadata.height > 800) {
//     // L'image est trop grande, vous pouvez choisir de la rejeter ou de la redimensionner
// }