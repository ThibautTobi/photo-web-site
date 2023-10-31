import { NextRequest, NextResponse } from 'next/server';
import Photo from '@/models/photo';
import { connectToDB } from "@/utils/database";
//import upload from '@/utils/multerConfig';
// import multer from 'multer';
// import { Readable } from 'stream';

// import * as formidable from 'formidable';
// import fs from 'fs';
// import path from 'path';


// export async function POST(req: NextRequest, res: NextResponse) {
//     if (req.method !== 'POST') {
//         return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
//     }

//     await connectToDB();

//     // Utilisation de multer pour gérer l'upload du fichier
//     upload.single('image')(req as any, {} as any, async (err: any) => {
//         if (err) {
//             return NextResponse.json({ error: 'Erreur lors de l\'upload du fichier' }, { status: 501 }),
//             console.log("test erreur")
//         }

//         const { title, description } = (req as any).body;

//         // Validation des données
//         if (!title || !description || !(req as any).file) {
//             return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
//         }

//         // Création d'une nouvelle photo
//         const newPhoto = new Photo({
//             title,
//             description,
//             imagePath: (req as any).file.path
//         });

//         try {
//             await newPhoto.save();
//             return NextResponse.json(newPhoto, { status: 201 });
//         } catch (error) {
//             return NextResponse.json({ error: 'Erreur lors de l\'enregistrement de la photo' }, { status: 500 }),
//             console.log("probleme")
//         }
//     });
// }

// export async function POST(req: NextRequest, res: NextResponse) {
//     console.log("Début de la fonction POST");

//     if (req.method !== 'POST') {
//         console.log("Méthode non autorisée");
//         return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
//     }

//     await connectToDB();
//     console.log("Connecté à la base de données");
//     console.log("Body avant traitement multer:", req.body);

//     // Utilisation de multer pour gérer l'upload du fichier
//     upload.single('image')(req as any, res as any, async (err: any) => {
//         if (err) {
//             console.log("Erreur multer:", err);
//             return NextResponse.json({ error: `Erreur lors de l'upload du fichier` }, { status: 500 });
//         }

//         console.log("Après traitement multer");

//         const { title, description } = (req as any).body;
//         console.log("Données reçues:", title, description);

//         // Validation des données
//         if (!title || !description || !(req as any).file) {
//             console.log("Données manquantes");
//             return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
//         }

//         // Création d'une nouvelle photo
//         const newPhoto = new Photo({
//             title,
//             description,
//             imagePath: (req as any).file.path
//         });

//         try {
//             await newPhoto.save();
//             console.log("Photo enregistrée avec succès");
//             return NextResponse.json({ newPhoto }, { status: 201 });
//         } catch (error) {
//             console.log("Erreur lors de l'enregistrement:", error);
//             return NextResponse.json({ error: `Erreur lors de l'enregistrement de la photo` }, { status: 500 });
//         }
//     });

//     console.log("Fin de la fonction POST sans réponse");
//     // Réponse par défaut pour gérer les cas non pris en compte
//     return NextResponse.json({ error: 'Aucune action effectuée' }, { status: 500 });
// }






/////////////////////////////////////////// avant


// const upload = multer({ dest: './uploads/' });

// export async function POST(req: NextRequest, res: NextResponse) {
//     console.log("Début de la fonction POST");
//     // console.log("Contenu de la requête:", req);
//     // console.log("Contenu du body:", (req as any).body);

//     // console.log("Content-Type de la requête:", req.headers as any ['content-type']);

//     if (req.method !== 'POST') {
//         console.log("Méthode non POST détectée");
//         return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
//     }

//     await connectToDB();
//     console.log("Connecté à la base de données");

//     // Utilisation de multer pour gérer l'upload du fichier
//     upload.single('image')(req as any, res as any, async (err: any) => {
//         console.log("Après traitement multer");

//         if (err) {
//             console.log("Erreur lors de l'upload:", err);
//             return NextResponse.json({ error: `Erreur lors de l'upload du fichier` }, { status: 500 });
//         }

//         const { title, description } = (req as any).body;
//         console.log("Données reçues:", title, description);

//         // Validation des données
//         if (!title || !description || !(req as any).file) {
//             console.log("Données manquantes");
//             return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
//         }

//         // Création d'une nouvelle photo
//         const newPhoto = new Photo({
//             title,
//             description,
//             imagePath: (req as any).file.path
//         });

//         try {
//             await newPhoto.save();
//             console.log("Photo enregistrée avec succès");
//             return NextResponse.json({ newPhoto }, { status: 201 });
//         } catch (error) {
//             console.log("Erreur lors de l'enregistrement:", error);
//             return NextResponse.json({ error: `Erreur lors de l'enregistrement de la photo` }, { status: 500 });
//         }
//     });

//     console.log("Fin de la fonction POST sans réponse");
//     // Réponse par défaut pour gérer les cas non pris en compte
//     return NextResponse.json({ error: 'Aucune action effectuée' }, { status: 500 });
// }



// export async function POST(req: NextRequest) {

//     return new Promise(async (resolve, reject) => {

//         const form = new formidable.IncomingForm();

// /*
// form.uploadDir = "/my/dir";  // répertoire de téléchargement
// form.keepExtensions = true;  // conserver les extensions de fichier
// form.maxFieldsSize = 2 * 1024 * 1024;  // taille maximale du champ
// form.maxFileSize = 200 * 1024 * 1024;  // taille maximale du fichier
// form.maxFields = 1000;  // nombre maximal de champs de formulaire

// form.on('fileBegin', (name, file) => {
//     // exécuté lorsque le téléchargement de fichier commence
// });

// form.on('fileBegin', (name, file) => {
//     const ext = file.name.split('.').pop();
//     file.path = form.uploadDir + '/' + 'newFileName' + '.' + ext;  // remplacez 'newFileName' par le nom que vous souhaitez
// });

// form.parse(req, (err, fields, files) => {
//     const uploadedFilePath = files.upload.path;
//     // Ici, envoyez `uploadedFilePath` à votre base de données
// });


// form.on('progress', (bytesReceived, bytesExpected) => {
//     // exécuté lorsque des données sont reçues
// });

// form.on('end', () => {
//     // exécuté lorsque tous les fichiers ont été téléchargés
// });

// form.on('error', (err) => {
//     console.error('Une erreur est survenue:', err);
//     req.resume();
// });

// ////////// utilisation de sharp pour redimensionner l'image

// npm install sharp

// import sharp from

// sharp(uploadedFilePath)
//     .resize(200, 200)  // redimensionne à 200x200 pixels
//     .toFile('pathToSaveResizedImage', (err, info) => { 
//         // gérer les erreurs ou continuer le traitement
//     });

// //////// recupération par route get version react / nodeJs
// const express = require('express');
// const app = express();

// app.get('/pathToImage/:imageName', (req, res) => {
//     res.sendFile(__dirname + '/uploads/' + req.params.imageName);
// });

// */

//     // Spécifiez le dossier où vous souhaitez stocker les fichiers téléchargés
//     form.uploadDir = path.join(process.cwd(), 'uploads');

// // const uploadedFilePath = files.upload[0].path;

//     // Assurez-vous que le dossier existe
//     if (!fs.existsSync(form.uploadDir)) {
//         fs.mkdirSync(form.uploadDir, { recursive: true });
//       }

//        // Parsez la requête pour extraire le fichier
//         form.parse(req as any, async (err, fields, files) => {
//             if (err) {
//                 // Si une erreur se produit lors du traitement du fichier, renvoyez une erreur 500
//                 resolve(NextResponse.json({ error: 'Erreur lors du traitement du formulaire' }, { status: 500 }));
//                 return;
//             }


//       // `file` est le nom du champ de formulaire que vous avez utilisé pour télécharger le fichier.
//       const uploadedFilePath = files.file.path;

//             const { title, description } = fields;
//             // const image = files.image;

//             console.log("Title:", title);
//             console.log("Description:", description);
//             //console.log("Image:", image);
//             console.log(uploadedFilePath);

//             await connectToDB();

//             if (!title || !description || !uploadedFilePath) {
//             // if (!title || !description || !image) {
//                 resolve(NextResponse.json({ error: 'Données manquantes' }, { status: 400 }));
//                 return;
//             }


//       // Ici, `file` est le nom du champ de formulaire que vous avez utilisé pour télécharger le fichier.
//     //   const uploadedFilePath = files.file.path;


//       // Renvoyez le chemin du fichier pour l'enregistrer dans la base de données ou pour d'autres utilisations.
//     //   res.status(200).json({ path: uploadedFilePath });
      



//             const newPhoto = new Photo({
//                 title,
//                 description,
//                 imagePath: image.path
//             });

//             try {
//                 await newPhoto.save();
//                 resolve(NextResponse.json(newPhoto, { status: 201 }));
//             } catch (error) {
//                 resolve(NextResponse.json({ error: 'erreur 2' }, { status: 500 }));
//             }
//         });
//     });
// }





// export async function POST(req: NextRequest) {

//     return new Promise(async (resolve, reject) => {

//         const form = new formidable.IncomingForm();

//     // Spécifiez le dossier où vous souhaitez stocker les fichiers téléchargés
//     form.uploadDir = path.join(process.cwd(), 'uploads');

// // const uploadedFilePath = files.upload[0].path;

//     // Assurez-vous que le dossier existe
//     if (!fs.existsSync(form.uploadDir)) {
//         fs.mkdirSync(form.uploadDir, { recursive: true });
//       }

//        // Parsez la requête pour extraire le fichier
//         form.parse(req as any, async (err, fields, files) => {
//             if (err) {
//                 // Si une erreur se produit lors du traitement du fichier, renvoyez une erreur 500
//                 resolve(NextResponse.json({ error: 'Erreur lors du traitement du formulaire' }, { status: 500 }));
//                 return;
//             }


//       // `file` est le nom du champ de formulaire que vous avez utilisé pour télécharger le fichier.
//       const uploadedFilePath = files.file.path;

//             const { title, description } = fields;
//             // const image = files.image;

//             console.log("Title:", title);
//             console.log("Description:", description);
//             //console.log("Image:", image);
//             console.log(uploadedFilePath);

//             await connectToDB();

//             if (!title || !description || !uploadedFilePath) {
//             // if (!title || !description || !image) {
//                 resolve(NextResponse.json({ error: 'Données manquantes' }, { status: 400 }));
//                 return;
//             }

//             const newPhoto = new Photo({
//                 title,
//                 description,
//                 imagePath: uploadedFilePath
//             });

//             try {
//                 await newPhoto.save();
//                 resolve(NextResponse.json(newPhoto, { status: 201 }));
//             } catch (error) {
//                 resolve(NextResponse.json({ error: 'erreur 2' }, { status: 500 }));
//             }
//         });
//     });
// }





// export async function POST(req: NextRequest): Promise<NextResponse> {
//     return new Promise(async (resolve) => {
//         const form = new formidable.IncomingForm();

//         // Spécifiez le dossier où vous souhaitez stocker les fichiers téléchargés
//         (form as any).uploadDir = path.join(process.cwd(), 'uploads');


//         /* solution contournement message d'erreur type uploadDir */
//          //form.uploadDir = '/my/upload/dir';


//         // Assurez-vous que le dossier existe
//         if (!fs.existsSync((form as any).uploadDir)) {
//             fs.mkdirSync((form as any).uploadDir, { recursive: true });
//         }

//         // Parsez la requête pour extraire le fichier
//         form.parse(req as any, async (err, fields, files: formidable.Files) => {
//             if (err) {
//                 resolve(NextResponse.json({ error: 'Erreur lors du traitement du formulaire' }, { status: 500 }));
//                 return;
//             }

//             // Assurez-vous que le fichier a été correctement téléchargé
//             if (!files.file) {
//                 resolve(NextResponse.json({ error: 'Fichier non reçu' }, { status: 400 }));
//                 return;
//             }
//             let uploadedFilePath : null | string = null;
//             //const uploadedFilePath = (files.file as any).path;
//                 if (files.file && files.file.length > 0) {
//                     uploadedFilePath = files.file[0].filepath;

//                     //const uploadedFilePath = (files.file as any).path;

//                 } else {
//                     // Gérer l'erreur ou définir une valeur par défaut pour uploadedFilePath
//                     console.log(uploadedFilePath)
//                 }


//             //const uploadedFilePath = files.file.path;
//             const { title, description } = fields;

//             console.log("Title:", title);
//             console.log("Description:", description);
//             console.log(uploadedFilePath);

//             await connectToDB();

//             if (!title || !description || !uploadedFilePath) {
//                 resolve(NextResponse.json({ error: 'Données manquantes' }, { status: 400 }));
//                 return;
//             }

//             const newPhoto = new Photo({
//                 title: title,
//                 description: description,
//                 imagePath: uploadedFilePath
//             });

//             try {
//                 await newPhoto.save();
//                 resolve(NextResponse.json(newPhoto, { status: 201 }));
//             } catch (error) {
//                 resolve(NextResponse.json({ error: 'erreur 2' }, { status: 500 }));
//             }
//         });
//     });
// }


// export const config = {
//     api: {
//       bodyParser: false,
//     },
//   };
  


// export async function POST(req: NextRequest): Promise<NextResponse> {
//     return new Promise(async (resolve) => {

//         // Convertissez l'objet de requête Next.js en un objet de requête standard de Node.js
//         // const reqStream = new Readable();
//         // reqStream.push(req.body);
//         // reqStream.push(null);


//         const form = new formidable.IncomingForm();


//         // Spécifiez le dossier où vous souhaitez stocker les fichiers téléchargés
//         (form as any).uploadDir = path.join(process.cwd(), 'uploads');


//         /* solution contournement message d'erreur type uploadDir */
//          //form.uploadDir = '/my/upload/dir';


//         // Assurez-vous que le dossier existe
//         if (!fs.existsSync((form as any).uploadDir)) {
//             fs.mkdirSync((form as any).uploadDir, { recursive: true });
//         }

//         // Parsez la requête pour extraire le fichier
//         // form.parse(reqStream, async (err, fields, files) => {
//             form.parse(req as any, async (err, fields, files) => {

//             if (err) {
//                 resolve(NextResponse.json({ error: 'Erreur lors du traitement du formulaire' }, { status: 500 }));
//                 return;
//             }

//             // Assurez-vous que le fichier a été correctement téléchargé
//             if (!files.file) {
//                 resolve(NextResponse.json({ error: 'Fichier non reçu' }, { status: 400 }));
//                 return;
//             }
//             let uploadedFilePath : null | string = null;
//             //const uploadedFilePath = (files.file as any).path;
//                 if (files.file && files.file.length > 0) {
//                     uploadedFilePath = files.file[0].filepath;

//                     //const uploadedFilePath = (files.file as any).path;

//                 } else {
//                     // Gérer l'erreur ou définir une valeur par défaut pour uploadedFilePath
//                     console.log(uploadedFilePath)
//                 }


//             //const uploadedFilePath = files.file.path;
//             const { title, description } = fields;

//             console.log("Title:", title);
//             console.log("Description:", description);
//             console.log(uploadedFilePath);

//             await connectToDB();

//             if (!title || !description || !uploadedFilePath) {
//                 resolve(NextResponse.json({ error: 'Données manquantes' }, { status: 400 }));
//                 return;
//             }

//             const newPhoto = new Photo({
//                 title: title,
//                 description: description,
//                 imagePath: uploadedFilePath
//             });

//             try {
//                 await newPhoto.save();
//                 resolve(NextResponse.json(newPhoto, { status: 201 }));
//             } catch (error) {
//                 resolve(NextResponse.json({ error: 'erreur 2' }, { status: 500 }));
//             }
//         });
//     });
// }




////////////////////////////////////////////////////////////////////////////////********** */

// import multer from 'multer';

// Configuration de Multer (à ajuster selon vos besoins)
// const storageConfig = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads'); // Remplacez par votre chemin
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// });
// const upload = multer({ storage: storageConfig });

// export async function POST(req: NextRequest) {


// // console.log(req.body)
// // console.log(req.files)

//     return new Promise(async (resolve, reject) => {

//         const formData = await req.formData(); // Utilisez formData() pour obtenir les données du formulaire
//         const title = formData.get('title'); // Extrait 'name' de formData
//         const description = formData.get('description');
//         const image = formData.get('file');
//         // const image2 = 

//             console.log("Title:", title);
//             console.log("Description:", description);
//             console.log("image:", image);
  

//         await connectToDB();
//         upload.single('image')(req as any, {} as any, async (err: any) => {
//             if (err instanceof Error) {
//                 resolve(NextResponse.json({ error: 'erreur 1' }, { status: 500 }));
//                 return;
//             }

//             // const { title, description } = (req as any).body;

//             // Afficher les valeurs de title, description et file
//             // console.log("Title:", title);
//             // console.log("Description:", description);
//             // // console.log("File:", (req as any).file);
//             // console.log("title:", title);
//             // console.log("description:", description);
//             // // console.log("image:", (req as any).file);
//             // console.log("image:", image);
//             // console.log((req as any).file);
//             const { title, description } = (req as any).body;
//             if (!title || !description || !(req as any).file) {
//                 resolve(NextResponse.json({ error: 'Données manquantes' }, { status: 400 }));
//                 return;
//             }
//             // Vérifiez si le fichier existe avant d'accéder à son chemin
//             const imagePath = (req as any).file ? (req as any).file.path : null;

//             if (!(req as any).file) {
//                 resolve(NextResponse.json({ error: 'Fichier non reçu' }, { status: 400 }));
//                 return;
//             }

//             const newPhoto = new Photo({
//                 title,
//                 description,
//                 imagePath: (req as any).file.path
//             });

//             try {
//                 await newPhoto.save();
//                 resolve(NextResponse.json(newPhoto, { status: 201 }));
//             } catch (error) {
//                 resolve(NextResponse.json({ error: 'erreur 2' }, { status: 500 }));
//             }
//         });
//     });
// }


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







// import { IncomingForm } from 'formidable';
// import fs from 'fs';
// import path from 'path';

// export async function POST(req: NextRequest, res: NextResponse) {
//     console.log("POST route called");

//     if (req.method !== 'POST') {
//         console.log("Method is not POST");
//         return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
//     }

//     const form = new formidable.IncomingForm();
//     (form as any).uploadDir = "./uploads"; // Utilisez une assertion de type pour bypasser l'erreur TypeScript

//     form.parse(req as any, async (err, fields, files) => {
//         if (err) {
//             console.log("Error during file parsing:", err);
//             return NextResponse.json({ error: 'Erreur lors de l\'analyse du formulaire' }, { status: 500 });
//         }

//         const { title, description } = fields;

//         console.log(title,description)

//         const image = files.image as any; // Utilisez une assertion de type ici aussi

//         console.log(image)

//         console.log("Received data:", { title, description, image });

//         if (!title || !description || !image) {
//             console.log("Missing data");
//             return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
//         }

//         const newPath = path.join((form as any).uploadDir, image.name); // Utilisez une assertion de type ici aussi
//         fs.rename(image.path, newPath, async (err) => {
//             if (err) {
//                 console.log("Error renaming file:", err);
//                 return NextResponse.json({ error: 'Erreur lors du renommage du fichier' }, { status: 500 });
//             }

//             await connectToDB();

//             const newPhoto = new Photo({
//                 title,
//                 description,
//                 imagePath: newPath
//             });

//             try {
//                 await newPhoto.save();
//                 console.log("Photo saved successfully");
//                 return NextResponse.json(newPhoto, { status: 201 });
//             } catch (error) {
//                 console.log("Error saving photo:", error);
//                 return NextResponse.json({ error: 'Erreur lors de l\'enregistrement de la photo' }, { status: 500 });
//             }
//         });
//     });
// }






//import { writeFile } from 'fs/promises'
//import { NextRequest, NextResponse } from 'next/server'

// export async function POST(req: NextRequest) {


//         // const formData = await req.formData(); // Utilisez formData() pour obtenir les données du formulaire
//         // const title = formData.get('title'); // Extrait 'name' de formData
//         // const description = formData.get('description');
//         // const image = formData.get('file');
//         // // const image2 = 

//         //     console.log("Title:", title);
//         //     console.log("Description:", description);
//         //     console.log("image:", image);


//   const data = await req.formData()
//   // const data1 = data.get('image') 
//   //console.log(data)
// //   console.log(data1)

//   const file: File | null = data.get('image') as unknown as File
// console.log(file)

//   if (!file) {
//     return NextResponse.json({ success: false })
//   }

//   const bytes = await file.arrayBuffer()
//   console.log(bytes)

//   const buffer = Buffer.from(bytes)

 
//   console.log(buffer)
// //   With the file data in the buffer, you can do whatever you want with it.
// //   For this, we'll just write it to the filesystem in a new location
//   const path = `/uploads/${file.name}`

//   console.log(path)

//   await writeFile(path, buffer)

//   console.log(`open ${path} to see the uploaded file`)

//   return NextResponse.json({ success: true })
// }




/***************************************************** sa marche ************************************************************/



import { writeFile } from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
//import sharp from 'sharp';

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
        const directory = './uploads';
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