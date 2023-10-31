// import { NextRequest, NextResponse } from 'next/server';
// import { connectToDB } from '@/utils/database';
// import Photo from '@/models/photo';
// import { writeFile } from 'fs/promises';
// import { existsSync, mkdirSync } from 'fs';

// /**
//  * Génère un horodatage basé sur la date et l'heure actuelles.
//  * @returns {string} L'horodatage sous forme de chaîne de caractères.
//  */

// function generateTimestamp() {
//     const now = new Date();
//     return `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}${now.getMilliseconds().toString().padStart(3, '0')}`;
//   }

// /**
//  * Gère la requête PUT pour la modification d'une image.
//  * @param {NextRequest} req - La requête entrante.
//  * @returns {NextResponse} La réponse à envoyer.
//  */
// export async function PUT(req: NextRequest) {
//     try {
//         // Vérification REQ Methode PUT
//         if (req.method !== 'PUT') {
//             return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
//         }

//         // Récupération de l'ID de la photo et des données du formulaire
//         const photoId = req.query.id; // Supposons que l'ID est passé dans l'URL
//         const data = await req.formData();
//         const title = data.get('title');
//         const description = data.get('description');
//         const file: File | null = data.get('image') as unknown as File;

//         // Validation des données
//         if (!photoId) {
//             return NextResponse.json({ error: 'ID de la photo manquant' }, { status: 400 });
//         }

//         // Trouver la photo dans la base de données
//         const photoToUpdate = await Photo.findById(photoId);
//         if (!photoToUpdate) {
//             return NextResponse.json({ error: 'Photo non trouvée' }, { status: 404 });
//         }

//         // Mise à jour des données
//         if (title) photoToUpdate.title = title;
//         if (description) photoToUpdate.description = description;

//         if (file) {
//             // Conversion du fichier en ArrayBuffer
//             const bytes = await file.arrayBuffer();
//             // Conversion de l'ArrayBuffer en Buffer
//             const buffer = Buffer.from(bytes);

//             // Ajout de l'horodatage à la fin du nom du fichier pour avoir un enregistrement unique.
//             const filename = `${file.name.split('.').slice(0, -1).join('.')}_${generateTimestamp()}.${file.name.split('.').pop()}`;
//             const path = `./uploads/${filename}`;

//             // Écriture du fichier.
//             await writeFile(path, buffer);
//             photoToUpdate.imagePath = path;
//         }

//         // Sauvegarde des modifications dans la base de données
//         await photoToUpdate.save();

//         console.log("Photo mise à jour avec succès");
//         return NextResponse.json({ photoToUpdate }, { status: 200 });
//     } catch (error) {
//         console.error("Erreur lors de la mise à jour:", error);
//         return NextResponse.json({ error: `Erreur lors de la mise à jour de la photo` }, { status: 500 });
//     }
// }





// import { connectToDB } from "@/utils/database";
// import Photo from "@/models/photo";
// import { NextRequest, NextResponse } from "next";

// export async function PUT(req: NextRequest) {
//     try {
//         // Vérification REQ Methode PUT
//         if (req.method !== 'PUT') {
//             return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
//         }

//         const { id } = req.query; // Récupération de l'ID de la photo

//         // Connexion à la base de données
//         await connectToDB();

//         // Récupération des données du formulaire
//         const data = await req.formData();
//         const title = data.get('title');
//         const description = data.get('description');
//         const file: File | null = data.get('image') as unknown as File;

//         // Trouver la photo par ID
//         const photoToUpdate = await Photo.findById(id);
//         if (!photoToUpdate) {
//             return NextResponse.json({ error: 'Photo non trouvée' }, { status: 404 });
//         }

//         // Mise à jour des données
//         if (title) photoToUpdate.title = title;
//         if (description) photoToUpdate.description = description;
//         if (file) {
//             // Logique pour gérer la mise à jour de l'image...
//         }

//         // Sauvegarde des modifications
//         await photoToUpdate.save();

//         return NextResponse.json({ message: 'Photo mise à jour avec succès' });
//     } catch (error) {
//         console.error("Erreur lors de la mise à jour de la photo:", error);
//         return NextResponse.json({ error: `Erreur lors de la mise à jour de la photo` }, { status: 500 });
//     }
// }







// import { connectToDB } from "@/utils/database";
// import Photo from "@/models/photo";
// import { NextRequest, NextResponse } from "next";

// export async function PUT(req: NextRequest) {
//     try {
//         // Vérification REQ Methode PUT
//         if (req.method !== 'PUT') {
//             return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
//         }

//         const { id } = req.query; // Récupération de l'ID de la photo

//         // Connexion à la base de données
//         await connectToDB();

//         // Récupération des données du formulaire
//         const data = await req.formData();
//         const title = data.get('title');
//         const description = data.get('description');
//         const file: File | null = data.get('image') as unknown as File;

//         // Trouver la photo par ID
//         const photoToUpdate = await Photo.findById(id);
//         if (!photoToUpdate) {
//             return NextResponse.json({ error: 'Photo non trouvée' }, { status: 404 });
//         }

//         // Mise à jour des données
//         if (title) photoToUpdate.title = title;
//         if (description) photoToUpdate.description = description;
//         if (file) {
//             // Logique pour gérer la mise à jour de l'image...
//         }

//         // Sauvegarde des modifications
//         await photoToUpdate.save();

//         return NextResponse.json({ message: 'Photo mise à jour avec succès' });
//     } catch (error) {
//         console.error("Erreur lors de la mise à jour de la photo:", error);
//         return NextResponse.json({ error: `Erreur lors de la mise à jour de la photo` }, { status: 500 });
//     }
// }










// version multer


// import multer from 'multer';


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, new Date().toISOString() + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });

// export default async AddPhoto (req, res) => {
//     if (req.method === 'POST') {
//         const uploadSingle = upload.single('image');

//         uploadSingle(req, res, async (err) => {
//             if (err) {
//                 return res.status(500).json({ error: err.message });
//             }

//             const { title, description } = req.body;
//             const newPhoto = new Photo({
//                 title,
//                 description,
//                 imagePath: req.file.path
//             });

//             try {
//                 await newPhoto.save();
//                 res.status(201).json(newPhoto);
//             } catch (error) {
//                 res.status(500).json({ error: error.message });
//             }
//         });
//     } else {
//         res.status(405).json({ error: 'Method not allowed' });
//     }
// };