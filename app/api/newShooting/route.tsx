// import { existsSync, mkdirSync, writeFile } from 'fs';
// import { NextRequest, NextResponse } from 'next/server';
// import Photo from '@/models/photo';
// import { connectToDB } from "@/utils/database";

// // Fonction pour générer un horodatage
// function generateTimestamp() {
//     const now = new Date();
//     return `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}${now.getMilliseconds().toString().padStart(3, '0')}`;
// }

// export async function POST(req: NextRequest) {
//     try {
//         if (req.method !== 'POST') {
//             return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
//         }

//         const data = await req.formData();
//         const title = data.get('title');
//         const description = data.get('description');
//         const files: File[] = data.getAll('file') as unknown as File[]; // Récupérer tous les fichiers

//         const savedPhotos = [];

//         for (const file of files) {
//             const bytes = await file.arrayBuffer();
//             const buffer = Buffer.from(bytes);

//             const directory = './uploads';
//             if (!existsSync(directory)) {
//                 mkdirSync(directory);
//             }
//                         // création pour chaque shooting création d'un nouveau dossier dans un dossier deja créé .

//             const filename = `${file.name.split('.').slice(0, -1).join('.')}_${generateTimestamp()}.${file.name.split('.').pop()}`;
//             const path = `${directory}/${filename}`;

//             await writeFile(path, buffer);

//             const newPhoto = new Photo({
//                 title,
//                 description,
//                 imagePath: path
//             });

//             await newPhoto.save();
//             savedPhotos.push(newPhoto);
//         }

//         console.log("Photos enregistrées avec succès");
//         return NextResponse.json({ savedPhotos }, { status: 201 });
//     } catch (error) {
//         console.error("Erreur lors de l'enregistrement:", error);
//         return NextResponse.json({ error: `Erreur lors de l'enregistrement des photos` }, { status: 500 });
//     }
// }
