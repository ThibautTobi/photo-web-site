import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import Photo from '@/models/photos';
import { ObjectId } from 'mongodb';

/************************************************************** récupération image par l'id des images portfolio */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  console.log(searchParams)
    // Vérification REQ Methode GET
    if (req.method !== 'GET') {
      return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
    console.log('verification get passé')
    const id = req.nextUrl.searchParams.get('id');
    console.log(id)
  
    if (!id) {
      return NextResponse.json({ error: 'pas de photo avec  ette ID' },{status: 400 });
    }
  
    try {
      // Remplacez par votre propre logique de connexion à la base de données
       await connectToDB();
       console.log('connection db')
      const photoId = await Photo.findOne({ _id: new ObjectId(id as string) });
      const photo = await Photo.findById(new ObjectId(id as string));
      console.log(photoId)
      console.log(photo)
  
      if (!photoId) {
        return NextResponse.json({ error: 'Photo not found' },{status: 404});
      }
  
      // Modifiez l'URL de l'image si nécessaire
      // photoId.imagePath = `${photoId.imagePath.replace('./uploads', '')}`;
  
      return NextResponse.json({photoId},{status: 200});
    } catch (error) {
      return new NextResponse(JSON.stringify({ error: 'Server error' }), {
        status: 500,
        // headers: {
        //   'Content-Type': 'application/json',
        // },
      });
    }
  }