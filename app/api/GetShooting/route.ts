import { NextRequest,NextResponse } from 'next/server';
import { connectToDB } from "@/utils/database";
import Shooting from '@/models/shooting';

/************************************************ récupération du shooting complet */
export async function GET(req: NextRequest) {
    // Vérification REQ Methode GET
    if (req.method !== 'GET') {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
        try {
        await connectToDB();
        const shootings = await Shooting.find();

    console.log(shootings)

        return NextResponse.json({ shootings }, { status: 200 });
        } catch (error) {
        
        return NextResponse.json({ error: "Erreur lors de la récupération des images"  }, { status: 500 });
        }
}