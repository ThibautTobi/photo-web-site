import { NextRequest, NextResponse } from 'next/server';
 import { connectToDB } from '@/utils/database';
// import Photo from '@/models/photo';
// import { ObjectId } from 'mongodb';

/**************************************************************************recuperation d'image par id  */
import type { NextApiRequest, NextApiResponse } from 'next';
import Photo from '@/models/photos';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
console.log(id)
  if (!id || typeof id !== 'string') {
    res.status(400).json({ message: 'ID manquant ou invalide' });
    return;
  }

          await connectToDB();
  const photo = await Photo.findOne({ _id: id });
//     const photoId = await Photo.findOne({ _id: new ObjectId(id as string) });
//     const photo = await Photo.findById(new ObjectId(id as string));
console.log(photo)
  if (!photo) {
    res.status(404).json({ message: 'Photo non trouvée' });
    return;
  }

  res.status(200).json(photo);
}



// export async function GET(req: NextRequest) {
//   // Vérification REQ Methode GET
//   if (req.method !== 'GET') {
//     return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
//   }
//   console.log('verification get passé')
//   const id = req.nextUrl.searchParams.get('id');
//   console.log(id)

//   if (!id) {
//     return NextResponse.json({ error: 'pas de photo avec  ette ID' },{status: 400 });
//   }

//   try {
//     // Remplacez par votre propre logique de connexion à la base de données
//      await connectToDB();
//      console.log('connection db')
//     const photoId = await Photo.findOne({ _id: new ObjectId(id as string) });
//     const photo = await Photo.findById(new ObjectId(id as string));
//     console.log(photoId)
//     console.log(photo)

//     if (!photoId) {
//       return NextResponse.json({ error: 'Photo not found' },{status: 404});
//     }

//     // Modifiez l'URL de l'image si nécessaire
//     // photoId.imagePath = `${photoId.imagePath.replace('./uploads', '')}`;

//     return NextResponse.json({photoId},{status: 200});
//   } catch (error) {
//     return new NextResponse(JSON.stringify({ error: 'Server error' }), {
//       status: 500,
//       // headers: {
//       //   'Content-Type': 'application/json',
//       // },
//     });
//   }
// }





// import { NextRequest, NextResponse } from 'next/server';
// import { connectToDB } from '@/utils/database';
// import Photo from '@/models/photo';
// import { ObjectId } from 'mongodb';


// export async function GET(req: NextRequest) {
//   // const { searchParams } = new URL(req.url);
//   // console.log(searchParams)
//     // Vérification REQ Methode GET
//     if (req.method !== 'GET') {
//       return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
//     }
//     console.log('verification get passé')
//     //const id = req.nextUrl.searchParams.get('id');
//     // console.log(id)
  
//     // if (!id) {
//     //   return NextResponse.json({ error: 'pas de photo avec  ette ID' },{status: 400 });
//     // }

//     try {
//       const {id} = req.query;

//       console.log(id)
//       // Remplacez par votre propre logique de connexion à la base de données
//        await connectToDB();
//        console.log('connection db')

//       //const photoId = await Photo.findOne({ _id: new ObjectId(id as string) });
//       const photo = await Photo.findById(new ObjectId(id as string));
//       //console.log(photoId)
//       console.log(photo)
  
//       if (!photo) {
//         return NextResponse.json({ error: 'Photo not found' },{status: 404});
//       }
  
//       // Modifiez l'URL de l'image si nécessaire
//       // photoId.imagePath = `${photoId.imagePath.replace('./uploads', '')}`;
  
//       return NextResponse.json({photo},{status: 200});
//     } catch (error) {
//       return new NextResponse(JSON.stringify({ error: 'Server error' }), {
//         status: 500,
//         // headers: {
//         //   'Content-Type': 'application/json',
//         // },
//       });
//     }
//   }


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