import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from 'next/server';
import Test from "@/models/test";

/***************************************************************************test base de donnée */
export async function POST (req: NextRequest) {
    
    if (req.method === 'POST') {

        const formData = await req.formData(); // Utilisez formData() pour obtenir les données du formulaire
        const name = formData.get('name'); // Extrait 'name' de formData

        // console.log(formData)
        // console.log(name)

        await connectToDB();
        
             console.log(name)

            if (!name) {
                return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
            }

            const newTest = new Test({
                name,
            });

            try {
                await newTest.save();
                return NextResponse.json(newTest, { status: 201 });
            } catch (error) {
                if (error instanceof Error) {
                    return NextResponse.json({ error: 'Erreur sauvegarge DB' }, { status: 500 });
                }
            }
        }
     else {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
};



// code client

// const handleSubmit = async (e: FormEvent ) => {
//     e.preventDefault();

//     const formData = new FormData();
//         formData.append('name', name);        

//     try {
//         const response = await fetch('/api/test', {
//             method: 'POST',
//             body: formData
//         });

//         if (!response.ok) {
//             throw new Error(`Erreur lors de l'envoi de la photo  la blague`);
//         }
// //             // Reset le formulaire après l'envoi réussi
//         setTitle('');
// //             setDescription('');
// //             setFile(null);
//     } catch (err) {
//         if (err instanceof Error) {
//             setError(err.message);
//         } else {
//             setError('Une erreur inconnue est survenue.');
//         }
//     }
    
// };