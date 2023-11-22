import { existsSync, mkdirSync} from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from "@/utils/database";
import Shooting from '@/models/shooting';
import { writeFile } from 'fs/promises';

/******************************************************************* ajout shooting verification admin  */
// Fonction pour générer un horodatage
function generateTimestamp() {
    const now = new Date();
    return `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}${now.getMilliseconds().toString().padStart(3, '0')}`;
}

export async function POST(req: NextRequest) {

    try {
        if (req.method !== 'POST') {
            return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
        }
    
        await connectToDB();
    
        const data = await req.formData();
        const title = data.get('title');
        const files: File[] = data.getAll('files') as unknown as File[]; // Assurez-vous que le nom correspond à celui du formulaire
    
        const imagePaths = []; // Tableau pour stocker les chemins d'image
        const directory = `./public/shooting/${title}`;
    
        if (!existsSync(directory)) {
            mkdirSync(directory, { recursive: true });
        }

        for (const file of files) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
    
            const filename = `${file.name.split('.').slice(0, -1).join('.')}_${generateTimestamp()}.${file.name.split('.').pop()}`;
            const path = `${directory}/${filename}`;
    
            await writeFile(path, buffer);
    
            imagePaths.push(path); // Ajouter le chemin de l'image au tableau
        }
        
        const newShooting = new Shooting({
            title,
            imagePath : imagePaths
        });
    
        await newShooting.save();
    
        return NextResponse.json({ newShooting }, { status: 201 });
    } catch (error) {
        console.error("Erreur lors de l'enregistrement:", error);
        return NextResponse.json({ error: `Erreur lors de l'enregistrement des photos` }, { status: 500 });
    }
}


